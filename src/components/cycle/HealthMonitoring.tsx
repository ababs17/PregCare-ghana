
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Pill, Calendar, Thermometer, Heart, Scale, Activity, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  taken: boolean;
}

interface VitalSigns {
  date: string;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  temperature: number;
  weight: number;
  notes?: string;
}

const HealthMonitoring = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Prenatal Vitamins',
      dosage: '1 tablet',
      frequency: 'Once daily',
      times: ['08:00'],
      startDate: '2024-01-01',
      notes: 'Take with food to avoid nausea',
      taken: true
    },
    {
      id: '2',
      name: 'Iron Supplement',
      dosage: '65mg',
      frequency: 'Twice daily',
      times: ['08:00', '18:00'],
      startDate: '2024-01-15',
      taken: false
    }
  ]);

  const [vitals, setVitals] = useState<VitalSigns[]>([
    {
      date: '2024-01-10',
      bloodPressure: { systolic: 120, diastolic: 80 },
      heartRate: 72,
      temperature: 98.6,
      weight: 65.5,
      notes: 'Feeling good today'
    },
    {
      date: '2024-01-09',
      bloodPressure: { systolic: 118, diastolic: 78 },
      heartRate: 75,
      temperature: 98.4,
      weight: 65.3
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [newVital, setNewVital] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    weight: '',
    notes: ''
  });

  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showAddVital, setShowAddVital] = useState(false);

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        times: newMedication.times.filter(time => time),
        startDate: newMedication.startDate,
        endDate: newMedication.endDate || undefined,
        notes: newMedication.notes || undefined,
        taken: false
      };
      setMedications([...medications, medication]);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        times: [''],
        startDate: '',
        endDate: '',
        notes: ''
      });
      setShowAddMedication(false);
    }
  };

  const handleAddVital = () => {
    if (newVital.date && newVital.systolic && newVital.diastolic) {
      const vital: VitalSigns = {
        date: newVital.date,
        bloodPressure: {
          systolic: parseInt(newVital.systolic),
          diastolic: parseInt(newVital.diastolic)
        },
        heartRate: parseInt(newVital.heartRate) || 0,
        temperature: parseFloat(newVital.temperature) || 0,
        weight: parseFloat(newVital.weight) || 0,
        notes: newVital.notes || undefined
      };
      setVitals([vital, ...vitals]);
      setNewVital({
        date: new Date().toISOString().split('T')[0],
        systolic: '',
        diastolic: '',
        heartRate: '',
        temperature: '',
        weight: '',
        notes: ''
      });
      setShowAddVital(false);
    }
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    const reminders = [];
    
    medications.forEach(med => {
      med.times.forEach(time => {
        const [hours, minutes] = time.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        if (reminderTime > now && !med.taken) {
          reminders.push({
            medication: med.name,
            time: time,
            dosage: med.dosage
          });
        }
      });
    });
    
    return reminders.sort((a, b) => a.time.localeCompare(b.time));
  };

  const getHealthScore = () => {
    let score = 100;
    const latestVital = vitals[0];
    
    if (latestVital) {
      // Check blood pressure
      if (latestVital.bloodPressure.systolic > 140 || latestVital.bloodPressure.diastolic > 90) {
        score -= 20;
      }
      // Check heart rate
      if (latestVital.heartRate > 100 || latestVital.heartRate < 60) {
        score -= 10;
      }
    }
    
    // Check medication adherence
    const takenToday = medications.filter(med => med.taken).length;
    const totalToday = medications.length;
    if (totalToday > 0) {
      const adherenceRate = takenToday / totalToday;
      if (adherenceRate < 0.8) {
        score -= 15;
      }
    }
    
    return Math.max(score, 0);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Health Overview Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">{getHealthScore()}/100</span>
                <Badge variant={getHealthScore() >= 80 ? "default" : "destructive"} className="text-xs">
                  {getHealthScore() >= 80 ? 'Good' : 'Needs Attention'}
                </Badge>
              </div>
              <Progress value={getHealthScore()} className="h-2" />
              <p className="text-xs text-gray-600">Based on vitals and medication adherence</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              Today's Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getUpcomingReminders().slice(0, 3).map((reminder, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{reminder.medication}</p>
                    <p className="text-xs text-gray-600">{reminder.dosage}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{reminder.time}</Badge>
                </div>
              ))}
              {getUpcomingReminders().length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No pending reminders</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Latest Vitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vitals[0] ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Blood Pressure:</span>
                  <span className="font-semibold">{vitals[0].bloodPressure.systolic}/{vitals[0].bloodPressure.diastolic}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Heart Rate:</span>
                  <span className="font-semibold">{vitals[0].heartRate} bpm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Weight:</span>
                  <span className="font-semibold">{vitals[0].weight} kg</span>
                </div>
                <p className="text-xs text-gray-500">Recorded on {vitals[0].date}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No vitals recorded</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Health Monitoring Tabs */}
      <Tabs defaultValue="medications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="medications" className="text-xs sm:text-sm py-2">
            <Pill className="w-4 h-4 mr-1 sm:mr-2" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="vitals" className="text-xs sm:text-sm py-2">
            <Thermometer className="w-4 h-4 mr-1 sm:mr-2" />
            Vitals
          </TabsTrigger>
          <TabsTrigger value="reminders" className="text-xs sm:text-sm py-2">
            <Bell className="w-4 h-4 mr-1 sm:mr-2" />
            Reminders
          </TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm py-2">
            <Activity className="w-4 h-4 mr-1 sm:mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-lg">My Medications</CardTitle>
                <Button 
                  onClick={() => setShowAddMedication(!showAddMedication)}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAddMedication && (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="med-name" className="text-sm">Medication Name</Label>
                        <Input
                          id="med-name"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                          placeholder="e.g., Prenatal Vitamins"
                        />
                      </div>
                      <div>
                        <Label htmlFor="med-dosage" className="text-sm">Dosage</Label>
                        <Input
                          id="med-dosage"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                          placeholder="e.g., 1 tablet, 500mg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="med-frequency" className="text-sm">Frequency</Label>
                        <Input
                          id="med-frequency"
                          value={newMedication.frequency}
                          onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                          placeholder="e.g., Once daily, Twice daily"
                        />
                      </div>
                      <div>
                        <Label htmlFor="med-time" className="text-sm">Time(s)</Label>
                        <Input
                          id="med-time"
                          type="time"
                          value={newMedication.times[0]}
                          onChange={(e) => setNewMedication({...newMedication, times: [e.target.value]})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="med-start" className="text-sm">Start Date</Label>
                        <Input
                          id="med-start"
                          type="date"
                          value={newMedication.startDate}
                          onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="med-end" className="text-sm">End Date (Optional)</Label>
                        <Input
                          id="med-end"
                          type="date"
                          value={newMedication.endDate}
                          onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="med-notes" className="text-sm">Notes (Optional)</Label>
                      <Input
                        id="med-notes"
                        value={newMedication.notes}
                        onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                        placeholder="e.g., Take with food"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddMedication} className="flex-1">Add Medication</Button>
                      <Button variant="outline" onClick={() => setShowAddMedication(false)} className="flex-1">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 gap-4">
                {medications.map((medication) => (
                  <Card key={medication.id} className={`${medication.taken ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-base">{medication.name}</h4>
                            <Badge variant={medication.taken ? "default" : "secondary"} className="text-xs">
                              {medication.taken ? 'Taken' : 'Pending'}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Dosage:</strong> {medication.dosage}</p>
                            <p><strong>Frequency:</strong> {medication.frequency}</p>
                            <p><strong>Times:</strong> {medication.times.join(', ')}</p>
                            {medication.notes && <p><strong>Notes:</strong> {medication.notes}</p>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={medication.taken ? "outline" : "default"}
                            onClick={() => toggleMedicationTaken(medication.id)}
                            className="text-xs"
                          >
                            {medication.taken ? 'Mark Pending' : 'Mark Taken'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMedication(medication.id)}
                            className="text-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {medications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Pill className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No medications added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-lg">Vital Signs</CardTitle>
                <Button 
                  onClick={() => setShowAddVital(!showAddVital)}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Record Vitals
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAddVital && (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="vital-date" className="text-sm">Date</Label>
                        <Input
                          id="vital-date"
                          type="date"
                          value={newVital.date}
                          onChange={(e) => setNewVital({...newVital, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="vital-systolic" className="text-sm">Systolic BP</Label>
                        <Input
                          id="vital-systolic"
                          type="number"
                          value={newVital.systolic}
                          onChange={(e) => setNewVital({...newVital, systolic: e.target.value})}
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vital-diastolic" className="text-sm">Diastolic BP</Label>
                        <Input
                          id="vital-diastolic"
                          type="number"
                          value={newVital.diastolic}
                          onChange={(e) => setNewVital({...newVital, diastolic: e.target.value})}
                          placeholder="80"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vital-heart" className="text-sm">Heart Rate (bpm)</Label>
                        <Input
                          id="vital-heart"
                          type="number"
                          value={newVital.heartRate}
                          onChange={(e) => setNewVital({...newVital, heartRate: e.target.value})}
                          placeholder="72"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vital-temp" className="text-sm">Temperature (°F)</Label>
                        <Input
                          id="vital-temp"
                          type="number"
                          step="0.1"
                          value={newVital.temperature}
                          onChange={(e) => setNewVital({...newVital, temperature: e.target.value})}
                          placeholder="98.6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vital-weight" className="text-sm">Weight (kg)</Label>
                        <Input
                          id="vital-weight"
                          type="number"
                          step="0.1"
                          value={newVital.weight}
                          onChange={(e) => setNewVital({...newVital, weight: e.target.value})}
                          placeholder="65.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vital-notes" className="text-sm">Notes (Optional)</Label>
                      <Input
                        id="vital-notes"
                        value={newVital.notes}
                        onChange={(e) => setNewVital({...newVital, notes: e.target.value})}
                        placeholder="How are you feeling today?"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddVital} className="flex-1">Record Vitals</Button>
                      <Button variant="outline" onClick={() => setShowAddVital(false)} className="flex-1">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 gap-4">
                {vitals.map((vital, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="font-semibold text-base">{vital.date}</h4>
                        <Badge variant="outline" className="text-xs w-fit">
                          {index === 0 ? 'Latest' : `${index + 1} days ago`}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Blood Pressure</p>
                          <p className="font-semibold">{vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Heart Rate</p>
                          <p className="font-semibold">{vital.heartRate} bpm</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Temperature</p>
                          <p className="font-semibold">{vital.temperature}°F</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Weight</p>
                          <p className="font-semibold">{vital.weight} kg</p>
                        </div>
                      </div>
                      {vital.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                          <p className="text-gray-600">Notes: {vital.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {vitals.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Thermometer className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No vital signs recorded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reminders Tab */}
        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medication Reminders</CardTitle>
              <CardDescription>Manage your medication schedule and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <Card key={medication.id} className="border-l-4 border-blue-400">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-semibold text-base mb-1">{medication.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{medication.dosage} - {medication.frequency}</p>
                          <div className="flex flex-wrap gap-2">
                            {medication.times.map((time, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                📅 {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <Badge variant={medication.taken ? "default" : "secondary"}>
                            {medication.taken ? '✅ Taken Today' : '⏰ Pending'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {medications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No medication reminders set</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blood Pressure Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vitals.slice(0, 5).map((vital, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{vital.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}</span>
                        <Badge variant={
                          vital.bloodPressure.systolic > 140 || vital.bloodPressure.diastolic > 90 
                            ? "destructive" 
                            : "default"
                        } className="text-xs">
                          {vital.bloodPressure.systolic > 140 || vital.bloodPressure.diastolic > 90 ? 'High' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vitals.slice(0, 5).map((vital, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{vital.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{vital.weight} kg</span>
                        {index < vitals.length - 1 && (
                          <Badge variant="outline" className="text-xs">
                            {vital.weight > vitals[index + 1].weight ? '↗️' : '↘️'}
                            {Math.abs(vital.weight - vitals[index + 1].weight).toFixed(1)}kg
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medication Adherence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today's Progress</span>
                  <span className="text-lg font-bold">
                    {medications.filter(med => med.taken).length}/{medications.length}
                  </span>
                </div>
                <Progress 
                  value={medications.length > 0 ? (medications.filter(med => med.taken).length / medications.length) * 100 : 0} 
                  className="h-3"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{medications.filter(med => med.taken).length}</p>
                    <p className="text-sm text-green-700">Medications Taken</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{medications.filter(med => !med.taken).length}</p>
                    <p className="text-sm text-orange-700">Medications Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;
