
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ThumbsUp } from 'lucide-react';

interface UserFeedbackProps {
  currentWeek: number;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ currentWeek }) => {
  const [rating, setRating] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [helpfulTips, setHelpfulTips] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const symptomOptions = [
    'Morning sickness', 'Fatigue', 'Heartburn', 'Back pain', 
    'Frequent urination', 'Mood swings', 'Food cravings', 'Insomnia'
  ];

  const tipCategories = [
    'WHO nutrition guidelines', 'Cultural traditions', 'Exercise tips', 
    'Symptom management', 'Appointment reminders'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleTipToggle = (tip: string) => {
    setHelpfulTips(prev => 
      prev.includes(tip) 
        ? prev.filter(t => t !== tip)
        : [...prev, tip]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would send data to backend
    console.log({
      week: currentWeek,
      rating,
      symptoms,
      comment,
      helpfulTips
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2">🙏</div>
          <h3 className="font-semibold text-green-800 mb-1">Thank You!</h3>
          <p className="text-sm text-green-700">
            Your feedback helps us provide better care recommendations for expectant mothers.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardContent className="p-4 space-y-4">
        {/* Rating */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            How would you rate your overall well-being this week?
          </Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-full h-full fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Which symptoms are you experiencing? (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {symptomOptions.map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSymptomToggle(symptom)}
                className={`p-2 text-xs rounded-lg border-2 transition-colors ${
                  symptoms.includes(symptom)
                    ? 'border-purple-300 bg-purple-100 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {symptoms.includes(symptom) && '✓ '}{symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Helpful Tips */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Which tips were most helpful to you?
          </Label>
          <div className="space-y-2">
            {tipCategories.map((tip) => (
              <button
                key={tip}
                onClick={() => handleTipToggle(tip)}
                className={`w-full p-2 text-xs text-left rounded-lg border-2 transition-colors ${
                  helpfulTips.includes(tip)
                    ? 'border-blue-300 bg-blue-100 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {helpfulTips.includes(tip) && <ThumbsUp className="w-3 h-3 inline mr-1" />}
                {tip}
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
            Any additional thoughts or suggestions?
          </Label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience or suggestions for other mothers..."
            className="w-full p-2 text-sm border rounded-lg resize-none h-20"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Heart className="w-4 h-4 mr-2" />
          Share My Experience
        </Button>

        <p className="text-xs text-gray-600 text-center">
          Your feedback is anonymous and helps improve care for all mothers
        </p>
      </CardContent>
    </Card>
  );
};

export default UserFeedback;
