import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, Bell, Apple, Scale, Stethoscope, BookOpen, AlertTriangle, Star, MessageCircle } from 'lucide-react';
import { whoPregnancyGuidelines } from '../../utils/whoGuidelines';
import WeeklyTips from './WeeklyTips';
import UserFeedback from './UserFeedback';

const PregnancyTracking = () => {
  const [isPregnant, setIsPregnant] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('');

  // Mock pregnancy data - in real app this would come from user data
  const pregnancyData = {
    currentWeek: 24,
    totalWeeks: 40,
    trimester: 2,
    babySize: 'papaya',
    weight: '1.3 lbs',
    length: '12 inches'
  };

  const currentGuidelines = whoPregnancyGuidelines.pregnancy[pregnancyData.trimester - 1];

  // Mock data for tracking
  const [appointmentReminders, setAppointmentReminders] = useState([
    { type: 'Routine Checkup', date: '2024-01-15', completed: false },
    { type: 'Ultrasound Scan', date: '2024-01-20', completed: true },
    { type: 'Blood Test', date: '2024-01-25', completed: false }
  ]);

  const [nutritionLog, setNutritionLog] = useState([
    { date: '2024-01-10', folateIntake: true, ironIntake: true, calciumIntake: false },
    { date: '2024-01-09', folateIntake: true, ironIntake: false, calciumIntake: true }
  ]);

  const calculateWeightGain = (): string => {
    if (!currentWeight || !prePregnancyWeight) return '0.0';
    return (parseFloat(currentWeight) - parseFloat(prePregnancyWeight)).toFixed(1);
  };

  const getWeightGainStatus = () => {
    const gain = parseFloat(calculateWeightGain());
    const week = pregnancyData.currentWeek;
    
    // WHO guidelines for healthy weight gain
    const expectedGain = week * 0.4; // Rough estimate: ~0.4kg per week after first trimester
    
    if (gain < expectedGain * 0.8) return { status: 'low', color: 'text-orange-600' };
    if (gain > expectedGain * 1.2) return { status: 'high', color: 'text-red-600' };
    return { status: 'normal', color: 'text-green-600' };
  };

  const handleStartTracking = () => {
    if (isPregnant && (lastPeriod || dueDate)) {
      setIsTracking(true);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Pregnancy Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-pink-600" />
            Pregnancy Journey
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">Track your pregnancy with WHO-recommended care</CardDescription>
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
              <Label htmlFor="pregnant" className="text-base sm:text-lg font-medium">
                I am currently pregnant
              </Label>
            </div>

            {isPregnant && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lastPeriod" className="text-sm font-medium">Last Menstrual Period</Label>
                    <Input
                      id="lastPeriod"
                      type="date"
                      value={lastPeriod}
                      onChange={(e) => setLastPeriod(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="text-sm font-medium">Expected Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                {!isTracking && (
                  <Button 
                    onClick={handleStartTracking}
                    disabled={!lastPeriod && !dueDate}
                    className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Start Tracking Pregnancy
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isPregnant && isTracking && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="weekly-tips" className="text-xs sm:text-sm py-2">Weekly Tips</TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs sm:text-sm py-2">Appointments</TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs sm:text-sm py-2">Nutrition</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs sm:text-sm py-2">Monitoring</TabsTrigger>
            <TabsTrigger value="guidelines" className="text-xs sm:text-sm py-2">WHO Guide</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Pregnancy Progress
                  </CardTitle>
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
                      <p className="text-xl sm:text-2xl font-bold text-pink-600">{pregnancyData.currentWeek}</p>
                      <p className="text-xs text-gray-600">Weeks</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">{pregnancyData.trimester}</p>
                      <p className="text-xs text-gray-600">Trimester</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">
                        {pregnancyData.totalWeeks - pregnancyData.currentWeek}
                      </p>
                      <p className="text-xs text-gray-600">Weeks Left</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      👶 Baby Development
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Your baby is about the size of a {pregnancyData.babySize}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Weight: {pregnancyData.weight}</span>
                      <span>Length: {pregnancyData.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                    This Week's Focus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      🌍 WHO Recommendations
                    </h4>
                    {currentGuidelines.recommendations.slice(0, 2).map((rec, index) => (
                      <div key={index} className="mb-3">
                        <p className="font-medium text-blue-700 text-sm">{rec.category}</p>
                        <p className="text-xs text-blue-600">{rec.guidance}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      ⚠️ Warning Signs
                    </h4>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Severe headaches or vision changes</li>
                      <li>• Heavy bleeding or fluid leakage</li>
                      <li>• Severe abdominal pain</li>
                      <li>• Decreased fetal movement</li>
                    </ul>
                    <p className="text-xs text-yellow-600 mt-2">Contact your healthcare provider immediately if you experience any of these symptoms.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weekly Tips Tab */}
          <TabsContent value="weekly-tips" className="space-y-4 sm:space-y-6">
            <WeeklyTips currentWeek={pregnancyData.currentWeek} trimester={pregnancyData.trimester} />
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Bell className="w-5 h-5 mr-2 text-green-600" />
                  Appointment Schedule
                </CardTitle>
                <CardDescription>Based on WHO antenatal care guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentReminders.map((appointment, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      appointment.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          appointment.completed ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm">{appointment.type}</p>
                          <p className="text-xs text-gray-600">{appointment.date}</p>
                        </div>
                      </div>
                      <Badge variant={appointment.completed ? "default" : "secondary"} className="text-xs">
                        {appointment.completed ? 'Completed' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-sm">📅 Recommended Checkups for Trimester {pregnancyData.trimester}</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {currentGuidelines.checkups.map((checkup, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-800 text-sm">{checkup.type}</h5>
                          <Badge variant={checkup.urgent ? "destructive" : "secondary"} className="text-xs">
                            {checkup.timing}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{checkup.description}</p>
                        <div className="text-xs text-gray-500">
                          <p className="font-medium mb-1">Tests included:</p>
                          <ul className="space-y-1">
                            {checkup.tests.map((test, testIndex) => (
                              <li key={testIndex} className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                {test}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Apple className="w-5 h-5 mr-2 text-green-600" />
                    Daily Nutrition Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button className="p-3 text-sm border-2 border-green-200 bg-green-50 rounded-lg">
                        ✅ Folic Acid
                      </button>
                      <button className="p-3 text-sm border-2 border-gray-200 rounded-lg hover:border-orange-300">
                        Iron
                      </button>
                      <button className="p-3 text-sm border-2 border-blue-200 bg-blue-50 rounded-lg">
                        ✅ Calcium
                      </button>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2 text-sm">🌍 WHO Nutrition Guidelines</h4>
                      <div className="space-y-2 text-xs text-green-700">
                        <p><strong>Folic Acid:</strong> 400μg daily (prevents neural tube defects)</p>
                        <p><strong>Iron:</strong> 30-60mg daily (prevents anemia)</p>
                        <p><strong>Calcium:</strong> 1200mg daily (bone development)</p>
                        <p><strong>Protein:</strong> Additional 25g daily</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🍎 Recommended Foods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-green-700 mb-1 text-sm">Iron-Rich Foods</h5>
                      <p className="text-xs text-gray-600">Lean meat, spinach, beans, fortified cereals</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-700 mb-1 text-sm">Calcium Sources</h5>
                      <p className="text-xs text-gray-600">Dairy products, leafy greens, fortified plant milk</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-700 mb-1 text-sm">Folate Foods</h5>
                      <p className="text-xs text-gray-600">Citrus fruits, fortified grains, dark leafy greens</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h5 className="font-semibold text-red-700 mb-1 text-sm">⚠️ Foods to Avoid</h5>
                      <p className="text-xs text-red-600">Raw fish, high-mercury fish, alcohol, raw eggs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Scale className="w-5 h-5 mr-2 text-purple-600" />
                    Weight Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preWeight" className="text-sm">Pre-pregnancy Weight (kg)</Label>
                      <Input
                        id="preWeight"
                        type="number"
                        value={prePregnancyWeight}
                        onChange={(e) => setPrePregnancyWeight(e.target.value)}
                        placeholder="60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentWeight" className="text-sm">Current Weight (kg)</Label>
                      <Input
                        id="currentWeight"
                        type="number"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        placeholder="65"
                      />
                    </div>
                  </div>
                  
                  {currentWeight && prePregnancyWeight && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Weight Gain:</span>
                        <span className={`font-bold ${getWeightGainStatus().color}`}>
                          {calculateWeightGain()} kg
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>Status: <span className={getWeightGainStatus().color}>{getWeightGainStatus().status}</span></p>
                        <p className="text-xs mt-1">WHO recommends 11.5-16kg total gain for normal BMI</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Stethoscope className="w-5 h-5 mr-2 text-red-600" />
                    Symptom Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Morning Sickness', active: true },
                      { name: 'Fatigue', active: false },
                      { name: 'Heartburn', active: true },
                      { name: 'Back Pain', active: false },
                      { name: 'Swelling', active: false },
                      { name: 'Frequent Urination', active: true },
                      { name: 'Mood Changes', active: false },
                      { name: 'Food Cravings', active: true }
                    ].map((symptom, index) => (
                      <button
                        key={index}
                        className={`p-3 text-xs border-2 rounded-lg transition-colors ${
                          symptom.active 
                            ? 'border-pink-300 bg-pink-50 text-pink-700' 
                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                        }`}
                      >
                        {symptom.active && '✓ '}{symptom.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      <strong>💡 Tip:</strong> Track symptoms to discuss with your healthcare provider during appointments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* WHO Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  WHO Pregnancy Guidelines
                </CardTitle>
                <CardDescription>Evidence-based recommendations for healthy pregnancy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {whoPregnancyGuidelines.pregnancy.map((trimester, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${
                      index === pregnancyData.trimester - 1 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <h3 className="text-base sm:text-lg font-semibold mb-3">
                        Trimester {trimester.trimester} ({trimester.weeks} weeks)
                        {index === pregnancyData.trimester - 1 && (
                          <Badge className="ml-2 text-xs" variant="default">Current</Badge>
                        )}
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2 text-sm">📋 Key Recommendations</h4>
                          {trimester.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="mb-2 p-2 bg-white rounded border-l-4 border-green-400">
                              <p className="font-medium text-xs">{rec.category}</p>
                              <p className="text-xs text-gray-600">{rec.guidance}</p>
                              {rec.frequency && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {rec.frequency}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2 text-sm">🏥 Medical Checkups</h4>
                          {trimester.checkups.map((checkup, checkIndex) => (
                            <div key={checkIndex} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-400">
                              <div className="flex justify-between items-start mb-1">
                                <p className="font-medium text-xs">{checkup.type}</p>
                                <Badge variant={checkup.urgent ? "destructive" : "secondary"} className="text-xs">
                                  {checkup.timing}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{checkup.description}</p>
                              <div className="text-xs text-gray-500">
                                Tests: {checkup.tests.join(', ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PregnancyTracking;
