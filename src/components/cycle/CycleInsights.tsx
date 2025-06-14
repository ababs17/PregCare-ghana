
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { whoPregnancyGuidelines } from '../../utils/whoGuidelines';

const CycleInsights = () => {
  // Mock data - in real app this would come from user's cycle history
  const cycleStats = {
    averageLength: 28,
    lastThreeCycles: [27, 28, 29],
    periodLength: 5,
    symptoms: ['cramps', 'mood_changes', 'bloating'],
    fertilityScore: 85
  };

  const guidelines = whoPregnancyGuidelines.preconception;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cycle Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Cycle Statistics</CardTitle>
          <CardDescription>Based on your last 3 cycles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Cycle Regularity</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Fertility Health</span>
              <span className="text-sm font-medium">{cycleStats.fertilityScore}%</span>
            </div>
            <Progress value={cycleStats.fertilityScore} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{cycleStats.averageLength}</p>
              <p className="text-sm text-gray-600">Avg Cycle Length</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{cycleStats.periodLength}</p>
              <p className="text-sm text-gray-600">Period Length</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Recent Cycles</p>
            <div className="flex space-x-2">
              {cycleStats.lastThreeCycles.map((length, index) => (
                <div key={index} className="flex-1 bg-gray-100 rounded p-2 text-center">
                  <span className="text-sm font-medium">{length} days</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WHO Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>🌍 WHO Health Guidelines</CardTitle>
          <CardDescription>Preconception health recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {guidelines.map((guideline, index) => (
            <div key={index} className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-gray-800">{guideline.category}</h4>
              <p className="text-sm text-gray-600 mt-1">{guideline.recommendation}</p>
              {guideline.importance && (
                <p className="text-xs text-blue-600 mt-1">💡 {guideline.importance}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Symptom Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Symptom Patterns</CardTitle>
          <CardDescription>Common symptoms this cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cycleStats.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="capitalize text-gray-700">{symptom.replace('_', ' ')}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((intensity) => (
                    <div
                      key={intensity}
                      className={`w-3 h-3 rounded-full ${
                        intensity <= 3 ? 'bg-pink-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fertility Window */}
      <Card>
        <CardHeader>
          <CardTitle>🌸 Fertility Insights</CardTitle>
          <CardDescription>Based on your cycle pattern</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Peak Fertility</h4>
            <p className="text-sm text-green-600 mt-1">
              Days 12-16 of your cycle typically show highest fertility
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Cycle Prediction</h4>
            <p className="text-sm text-blue-600 mt-1">
              92% accuracy based on your 3-month history
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Health Tips</h4>
            <p className="text-sm text-purple-600 mt-1">
              Maintain regular sleep and nutrition for optimal cycle health
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleInsights;
