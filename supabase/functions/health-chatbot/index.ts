
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting store (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function getRateLimitKey(request: Request): string {
  // Use client IP or user ID for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  entry.count++;
  return false;
}

function sanitizeInput(input: string): string {
  // Remove potential harmful content and limit length
  return input
    .trim()
    .slice(0, 1000) // Limit to 1000 characters
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

function validateInput(message: string, language: string): string | null {
  if (!message || typeof message !== 'string') {
    return 'Message is required and must be a string';
  }
  
  if (message.length < 1) {
    return 'Message cannot be empty';
  }
  
  if (message.length > 1000) {
    return 'Message is too long (maximum 1000 characters)';
  }
  
  if (language && !['english', 'twi'].includes(language.toLowerCase())) {
    return 'Language must be either "english" or "twi"';
  }
  
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60 
        }), 
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { message, language = 'english' } = await req.json();

    // Validate and sanitize input
    const validationError = validateInput(message, language);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const sanitizedMessage = sanitizeInput(message);

    const systemPrompt = language === 'twi' 
      ? `You are Nyinsen Boafo, a helpful maternal health assistant for Ghanaian women. You provide accurate, culturally sensitive health information in Twi (Akan language). Always respond in Twi and provide helpful, supportive advice about pregnancy, maternal health, and general women's health concerns. If you're unsure about medical advice, always recommend consulting with a healthcare professional. Keep responses warm, supportive, and culturally appropriate for Ghanaian women. Never provide emergency medical advice - always direct users to seek immediate medical attention for emergencies.`
      : `You are Nyinsen Boafo, a helpful maternal health assistant for Ghanaian women. You provide accurate, culturally sensitive health information in English. Focus on pregnancy care, maternal health, family planning, and general women's health concerns relevant to Ghana. Always recommend consulting with healthcare professionals for serious concerns. Keep responses supportive, informative, and culturally appropriate. Never provide emergency medical advice - always direct users to seek immediate medical attention for emergencies.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 500,
        messages: [
          { 
            role: 'user', 
            content: `${systemPrompt}\n\nUser question: ${sanitizedMessage}` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error('AI service temporarily unavailable');
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    // Sanitize AI response as well
    const sanitizedResponse = sanitizeInput(aiResponse);

    return new Response(JSON.stringify({ response: sanitizedResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in health-chatbot function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
