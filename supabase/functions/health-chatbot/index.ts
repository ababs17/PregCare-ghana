
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'english' } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const systemPrompt = language === 'twi' 
      ? `You are Nyinsen Boafo, a helpful maternal health assistant for Ghanaian women. You provide accurate, culturally sensitive health information in Twi (Akan language). Always respond in Twi and provide helpful, supportive advice about pregnancy, maternal health, and general women's health concerns. If you're unsure about medical advice, always recommend consulting with a healthcare professional. Keep responses warm, supportive, and culturally appropriate for Ghanaian women.`
      : `You are Nyinsen Boafo, a helpful maternal health assistant for Ghanaian women. You provide accurate, culturally sensitive health information in English. Focus on pregnancy care, maternal health, family planning, and general women's health concerns relevant to Ghana. Always recommend consulting with healthcare professionals for serious concerns. Keep responses supportive, informative, and culturally appropriate.`;

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
            content: `${systemPrompt}\n\nUser question: ${message}` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in health-chatbot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
