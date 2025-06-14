
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Heart, Calendar } from 'lucide-react';
import UserFeedback from './UserFeedback';

interface WeeklyTipsProps {
  currentWeek: number;
  trimester: number;
}

const WeeklyTips: React.FC<WeeklyTipsProps> = ({ currentWeek, trimester }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  // Cultural icons and WHO tips data
  const weeklyTipsData = {
    24: {
      culturalIcon: '🌸',
      culturalMessage: 'In many cultures, week 24 marks the beginning of feeling more connected to your baby',
      whoTips: [
        {
          category: 'Nutrition',
          tip: 'Increase iron intake to 30mg daily to prevent anemia',
          icon: '🥬',
          priority: 'high'
        },
        {
          category: 'Movement',
          tip: 'Your baby can now hear sounds from outside the womb',
          icon: '🎵',
          priority: 'medium'
        },
        {
          category: 'Health Check',
          tip: 'Schedule glucose screening test between 24-28 weeks',
          icon: '🩺',
          priority: 'high'
        },
        {
          category: 'Physical Activity',
          tip: 'Continue moderate exercise, avoid lying flat on back',
          icon: '🚶‍♀️',
          priority: 'medium'
        }
      ],
      development: {
        babySize: 'papaya',
        weight: '1.3 lbs',
        length: '12 inches',
        milestone: 'Baby\'s hearing is developing rapidly'
      },
      symptoms: ['Heartburn', 'Back pain', 'Frequent urination', 'Leg cramps'],
      culturalTraditions: [
        {
          culture: 'Indian',
          tradition: 'Garbhadhana ceremony for blessing the pregnancy',
          icon: '🕉️'
        },
        {
          culture: 'Chinese',
          tradition: 'Focus on maintaining emotional balance',
          icon: '☯️'
        },
        {
          culture: 'African',
          tradition: 'Community support and shared wisdom',
          icon: '🌍'
        }
      ]
    }
  };

  const currentTips = weeklyTipsData[currentWeek] || weeklyTipsData[24];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Weekly Overview */}
      <Card className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <span className="text-2xl sm:text-3xl mr-3">{currentTips.culturalIcon}</span>
            Week {currentWeek} Journey
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">{currentTips.culturalMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-2">👶</div>
              <p className="font-semibold text-sm">Baby Size</p>
              <p className="text-xs text-gray-600">{currentTips.development.babySize}</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-2">⚖️</div>
              <p className="font-semibold text-sm">Weight</p>
              <p className="text-xs text-gray-600">{currentTips.development.weight}</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-2">📏</div>
              <p className="font-semibold text-sm">Length</p>
              <p className="text-xs text-gray-600">{currentTips.development.length}</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl mb-2">🧠</div>
              <p className="font-semibold text-sm">Milestone</p>
              <p className="text-xs text-gray-600">{currentTips.development.milestone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WHO Guidelines for This Week */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <span className="text-xl mr-2">🌍</span>
            WHO Guidelines for Week {currentWeek}
          </CardTitle>
          <CardDescription>Personalized recommendations based on your pregnancy stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTips.whoTips.map((tip, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 ${
                  tip.priority === 'high' 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-blue-400 bg-blue-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{tip.category}</h4>
                      <Badge 
                        variant={tip.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {tip.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-700">{tip.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Traditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <span className="text-xl mr-2">🌺</span>
            Cultural Wisdom & Traditions
          </CardTitle>
          <CardDescription>Global perspectives on pregnancy care</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentTips.culturalTraditions.map((tradition, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg">
                <div className="text-center mb-2">
                  <span className="text-2xl">{tradition.icon}</span>
                </div>
                <h4 className="font-semibold text-sm text-center mb-1">{tradition.culture}</h4>
                <p className="text-xs text-gray-600 text-center">{tradition.tradition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <span className="text-xl mr-2">💭</span>
            What to Expect This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">Common Symptoms:</h4>
              <div className="flex flex-wrap gap-2">
                {currentTips.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="font-semibold text-green-800 mb-1 text-sm">💡 This Week's Focus</h4>
              <p className="text-xs text-green-700">
                Continue taking prenatal vitamins, stay hydrated, and practice gentle exercises. 
                Your baby is developing rapidly, so maintain a healthy diet rich in protein and calcium.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
            Share Your Experience
          </CardTitle>
          <CardDescription>Help other mothers with your insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              How are you feeling this week? Your feedback helps us improve recommendations for other mothers.
            </p>
            <Button 
              onClick={() => setShowFeedback(!showFeedback)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Star className="w-4 h-4 mr-2" />
              Share Feedback
            </Button>
            
            {showFeedback && <UserFeedback currentWeek={currentWeek} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyTips;
