
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { calculateCycleData } from '../../utils/cycleUtils';

const CycleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock cycle data - in a real app this would come from a database
  const lastPeriodStart = new Date('2024-06-01');
  const averageCycleLength = 28;
  
  const cycleData = calculateCycleData(lastPeriodStart, averageCycleLength);

  const getDayType = (date: Date) => {
    const today = new Date();
    const daysDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(daysDiff) <= 2) return 'period';
    if (Math.abs(daysDiff - 14) <= 2) return 'ovulation';
    if (Math.abs(daysDiff - 14) <= 5) return 'fertile';
    return 'normal';
  };

  const modifiers = {
    period: (date: Date) => getDayType(date) === 'period',
    fertile: (date: Date) => getDayType(date) === 'fertile',
    ovulation: (date: Date) => getDayType(date) === 'ovulation',
  };

  const modifiersClassNames = {
    period: 'bg-red-100 text-red-800 border-red-300',
    fertile: 'bg-green-100 text-green-800 border-green-300',
    ovulation: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">📅</span>
            Cycle Calendar
          </CardTitle>
          <CardDescription>
            Track your menstrual cycle, ovulation, and fertile window
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
          />
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-sm text-gray-600">Period</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-gray-600">Fertile Window</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span className="text-sm text-gray-600">Ovulation</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cycle Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Cycle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Cycle Day</p>
            <p className="text-2xl font-bold text-pink-600">{cycleData.currentDay}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Next Period</p>
            <p className="text-lg font-semibold">{cycleData.nextPeriod}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Cycle Length</p>
            <p className="text-lg">{averageCycleLength} days</p>
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="w-full justify-center py-2">
              {cycleData.phase}
            </Badge>
            
            {cycleData.daysToOvulation <= 5 && (
              <Badge variant="secondary" className="w-full justify-center py-2">
                🥚 {cycleData.daysToOvulation} days to ovulation
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleCalendar;
