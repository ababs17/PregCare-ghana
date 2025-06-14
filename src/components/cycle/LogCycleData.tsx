
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';

const LogCycleData = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [logType, setLogType] = useState('period');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [flow, setFlow] = useState('medium');
  const [mood, setMood] = useState('neutral');
  const [notes, setNotes] = useState('');

  const symptomOptions = [
    'cramps', 'headache', 'bloating', 'breast_tenderness', 
    'back_pain', 'fatigue', 'mood_swings', 'acne'
  ];

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging cycle data:', {
      date: selectedDate,
      type: logType,
      symptoms,
      flow,
      mood,
      notes
    });
    // In a real app, this would save to a database
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Log Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Log Cycle Data
          </CardTitle>
          <CardDescription>Track your daily cycle information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-2"
              />
            </div>

            {/* Log Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">What are you logging?</Label>
              <div className="grid grid-cols-2 gap-2">
                {['period', 'symptoms', 'mood', 'temperature'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLogType(type)}
                    className={`p-3 rounded-lg border-2 text-sm capitalize transition-colors ${
                      logType === type
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type === 'period' && '🩸'}
                    {type === 'symptoms' && '💊'}
                    {type === 'mood' && '😊'}
                    {type === 'temperature' && '🌡️'}
                    <span className="ml-2">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Period Flow */}
            {logType === 'period' && (
              <div>
                <Label className="text-sm font-medium mb-3 block">Flow Intensity</Label>
                <div className="flex space-x-2">
                  {['light', 'medium', 'heavy'].map((flowType) => (
                    <button
                      key={flowType}
                      type="button"
                      onClick={() => setFlow(flowType)}
                      className={`flex-1 p-2 rounded-lg border-2 text-sm capitalize ${
                        flow === flowType
                          ? 'border-red-400 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {flowType}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms */}
            {(logType === 'symptoms' || logType === 'period') && (
              <div>
                <Label className="text-sm font-medium mb-3 block">Symptoms</Label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-2 rounded-lg border text-xs capitalize transition-colors ${
                        symptoms.includes(symptom)
                          ? 'border-purple-400 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {symptom.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mood */}
            {(logType === 'mood' || logType === 'symptoms') && (
              <div>
                <Label className="text-sm font-medium mb-3 block">Mood</Label>
                <div className="flex space-x-2">
                  {[
                    { value: 'happy', emoji: '😊' },
                    { value: 'neutral', emoji: '😐' },
                    { value: 'sad', emoji: '😢' },
                    { value: 'irritable', emoji: '😤' }
                  ].map((moodOption) => (
                    <button
                      key={moodOption.value}
                      type="button"
                      onClick={() => setMood(moodOption.value)}
                      className={`flex-1 p-3 rounded-lg border-2 text-center ${
                        mood === moodOption.value
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl">{moodOption.emoji}</div>
                      <div className="text-xs capitalize mt-1">{moodOption.value}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Notes (optional)</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes..."
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              Save Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Recent Entries</CardTitle>
          <CardDescription>Your last cycle logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock recent entries */}
            {[
              { date: '2024-06-13', type: 'period', flow: 'medium', mood: 'happy' },
              { date: '2024-06-12', type: 'symptoms', symptoms: ['cramps', 'fatigue'] },
              { date: '2024-06-11', type: 'mood', mood: 'neutral' }
            ].map((entry, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{entry.date}</span>
                  <Badge variant="outline" className="capitalize">
                    {entry.type}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600">
                  {entry.type === 'period' && `Flow: ${entry.flow}`}
                  {entry.type === 'symptoms' && `Symptoms: ${entry.symptoms?.join(', ')}`}
                  {entry.type === 'mood' && `Mood: ${entry.mood}`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogCycleData;
