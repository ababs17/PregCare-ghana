
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Play, ExternalLink, Lightbulb, User, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TipData {
  title: string;
  content: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  videoSuggestion: {
    title: string;
    channel: string;
    searchQuery: string;
  };
  icon: string;
}

const PersonalizedTips: React.FC = () => {
  const { user } = useAuth();
  const [currentTip, setCurrentTip] = useState<TipData | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfileAndGenerateTip();
    }
  }, [user]);

  useEffect(() => {
    if (currentTip) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [currentTip]);

  const fetchProfileAndGenerateTip = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      setProfileData(profile);
      generatePersonalizedTip(profile);
    } catch (error) {
      console.log('Error fetching profile:', error);
      generateGenericTip();
    }
  };

  const generatePersonalizedTip = (profile: any) => {
    const tips: TipData[] = [
      {
        title: "Stay Hydrated for Healthy Pregnancy",
        content: "Drink at least 8-10 glasses of water daily. Proper hydration supports your baby's development and helps prevent common pregnancy discomforts.",
        category: "Nutrition",
        priority: "high",
        videoSuggestion: {
          title: "Pregnancy Hydration Tips",
          channel: "BabyCenter",
          searchQuery: "pregnancy hydration tips water intake"
        },
        icon: "💧"
      },
      {
        title: "Gentle Exercise for Expectant Mothers",
        content: "Take a 30-minute walk daily or try prenatal yoga. Regular, gentle exercise improves circulation and prepares your body for labor.",
        category: "Exercise",
        priority: "medium",
        videoSuggestion: {
          title: "Prenatal Yoga for Beginners",
          channel: "Yoga with Adriene",
          searchQuery: "prenatal yoga pregnancy exercise safe"
        },
        icon: "🚶‍♀️"
      },
      {
        title: "Iron-Rich Foods for Energy",
        content: "Include leafy greens, lean meats, and legumes in your diet. Iron prevents anemia and boosts energy levels during pregnancy.",
        category: "Nutrition",
        priority: "high",
        videoSuggestion: {
          title: "Iron Rich Foods During Pregnancy",
          channel: "Nutrition Stripped",
          searchQuery: "iron rich foods pregnancy anemia prevention"
        },
        icon: "🥬"
      },
      {
        title: "Stress Management Techniques",
        content: "Practice deep breathing or meditation for 10 minutes daily. Managing stress is crucial for both your well-being and your baby's development.",
        category: "Mental Health",
        priority: "medium",
        videoSuggestion: {
          title: "Pregnancy Meditation and Relaxation",
          channel: "The Honest Guys",
          searchQuery: "pregnancy meditation stress relief relaxation"
        },
        icon: "🧘‍♀️"
      }
    ];

    // Personalize based on profile data
    let selectedTip = tips[Math.floor(Math.random() * tips.length)];
    
    if (profile?.age && profile.age > 35) {
      selectedTip = tips.find(tip => tip.category === "Mental Health") || selectedTip;
    }
    
    if (profile?.medical_conditions?.toLowerCase().includes('anemia')) {
      selectedTip = tips.find(tip => tip.icon === "🥬") || selectedTip;
    }

    setCurrentTip(selectedTip);
  };

  const generateGenericTip = () => {
    const genericTip: TipData = {
      title: "Welcome to Your Pregnancy Journey",
      content: "Complete your profile to receive personalized daily tips based on your health information and preferences.",
      category: "Getting Started",
      priority: "medium",
      videoSuggestion: {
        title: "Pregnancy Week by Week Guide",
        channel: "What to Expect",
        searchQuery: "pregnancy guide first trimester tips"
      },
      icon: "🌟"
    };
    setCurrentTip(genericTip);
  };

  const openYouTubeSearch = () => {
    if (currentTip) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(currentTip.videoSuggestion.searchQuery)}`;
      window.open(searchUrl, '_blank');
    }
  };

  if (!currentTip) return null;

  return (
    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-purple-800">Daily Tip for You</span>
                <div className="flex items-center mt-1">
                  <span className="text-2xl mr-2 animate-bounce">{currentTip.icon}</span>
                  <Badge 
                    variant={currentTip.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {currentTip.priority} priority
                  </Badge>
                </div>
              </div>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {currentTip.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-purple-800 mb-2 text-base">
              {currentTip.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentTip.content}
            </p>
          </div>

          {/* Video Suggestion */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-red-800 mb-1 text-sm flex items-center">
                  <Play className="w-4 h-4 mr-2 text-red-600" />
                  Recommended Video
                </h4>
                <p className="text-red-700 text-sm font-medium">
                  "{currentTip.videoSuggestion.title}"
                </p>
                <p className="text-red-600 text-xs">
                  Suggested channel: {currentTip.videoSuggestion.channel}
                </p>
              </div>
              <Button
                onClick={openYouTubeSearch}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white ml-3"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Watch
              </Button>
            </div>
          </div>

          {/* Personalization Note */}
          <div className="text-center">
            <p className="text-xs text-gray-600">
              {profileData ? (
                <>
                  <User className="w-3 h-3 inline mr-1" />
                  Personalized based on your profile
                </>
              ) : (
                <>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Complete your profile for personalized tips
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedTips;
