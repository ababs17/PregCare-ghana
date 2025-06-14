
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { whoPregnancyGuidelines } from '../../utils/whoGuidelines';

const PregnancyTracking = () => {
  const [isPregnant, setIsPregnant] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');

  // Mock pregnancy data
  const pregnancyData = {
    currentWeek: 24,
    totalWeeks: 40,
    trimester: 2,
    babySize: 'papaya',
    weight: '1.3 lbs',
    length: '12 inches'
  };

  const currentGuidelines = whoPregnancyGuidelines.pregnancy[pregnancyData.trimester - 1];

  return (
    <div className="space-y-6">
      {/* Pregnancy Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            🤱 Pregnancy Status
          </CardTitle>
          <CardDescription>Track your pregnancy journey with WHO guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="pregnant"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="w-4 h-4 text-pink-600 border-2 border-pink-300 rounded focus:ring-pink-500"
              />
              <Label htmlFor="pregnant" className="text-lg font-medium">
                I am currently pregnant
              </Label>
            </div>

            {isPregnant && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="lastPeriod">Last Menstrual Period</Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Expected Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isPregnant && (
        <>
          {/* Pregnancy Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📅 Pregnancy Progress</CardTitle>
                <CardDescription>Week {pregnancyData.currentWeek} of {pregnancyData.totalWeeks}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {Math.round((pregnancyData.currentWeek / pregnancyData.totalWeeks) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(pregnancyData.currentWeek / pregnancyData.totalWeeks) * 100} 
                    className="h-3"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-pink-600">{pregnancyData.currentWeek}</p>
                    <p className="text-xs text-gray-600">Weeks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{pregnancyData.trimester}</p>
                    <p className="text-xs text-gray-600">Trimester</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {pregnancyData.totalWeeks - pregnancyData.currentWeek}
                    </p>
                    <p className="text-xs text-gray-600">Weeks Left</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Baby Development</h4>
                  <p className="text-sm text-gray-600">
                    Your baby is about the size of a {pregnancyData.babySize}
                  </p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Weight: {pregnancyData.weight}</span>
                    <span>Length: {pregnancyData.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WHO Guidelines for Current Trimester */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 WHO Guidelines - Trimester {pregnancyData.trimester}</CardTitle>
                <CardDescription>Health recommendations for this stage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentGuidelines.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-gray-800">{rec.category}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.guidance}</p>
                    {rec.frequency && (
                      <Badge variant="outline" className="mt-2">
                        {rec.frequency}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Appointments & Checkups */}
          <Card>
            <CardHeader>
              <CardTitle>🏥 Recommended Checkups</CardTitle>
              <CardDescription>Based on WHO antenatal care guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentGuidelines.checkups.map((checkup, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{checkup.type}</h4>
                      <Badge variant={checkup.urgent ? "destructive" : "secondary"}>
                        {checkup.timing}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{checkup.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {checkup.tests.map((test, testIndex) => (
                        <li key={testIndex} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Pregnancy Symptoms</CardTitle>
              <CardDescription>Track common pregnancy symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'nausea', 'fatigue', 'heartburn', 'back_pain',
                  'swelling', 'frequent_urination', 'mood_changes', 'cravings'
                ].map((symptom, index) => (
                  <button
                    key={index}
                    className="p-3 text-sm border-2 border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors capitalize"
                  >
                    {symptom.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PregnancyTracking;
