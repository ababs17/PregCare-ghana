
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const ProgressIndicator: React.FC = () => {
  const steps: ProgressStep[] = [
    {
      id: '1',
      title: 'Complete Profile',
      description: 'Add your personal and medical information',
      completed: true
    },
    {
      id: '2',
      title: 'Set Emergency Contacts',
      description: 'Add trusted contacts for emergencies',
      completed: false
    },
    {
      id: '3',
      title: 'Join Community',
      description: 'Connect with other mothers',
      completed: false
    },
    {
      id: '4',
      title: 'Track Health Data',
      description: 'Start monitoring your health metrics',
      completed: false
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-blue-800">
          <Target className="w-5 h-5 mr-2" />
          Getting Started Progress
          <Badge variant="secondary" className="ml-2">
            {completedSteps}/{steps.length}
          </Badge>
        </CardTitle>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${
                step.completed ? 'text-green-700 line-through' : 'text-gray-700'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;
