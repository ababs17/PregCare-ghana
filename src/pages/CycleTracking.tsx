
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CycleCalendar from '../components/cycle/CycleCalendar';
import CycleInsights from '../components/cycle/CycleInsights';
import LogCycleData from '../components/cycle/LogCycleData';
import PregnancyTracking from '../components/cycle/PregnancyTracking';

const CycleTracking = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-pink-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Cycle & Pregnancy Tracking</h1>
                  <p className="text-xs text-gray-600">WHO guidelines supported</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'insights'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📊 Insights
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'log'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Log Data
          </button>
          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pregnancy'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🤱 Pregnancy
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'calendar' && <CycleCalendar />}
          {activeTab === 'insights' && <CycleInsights />}
          {activeTab === 'log' && <LogCycleData />}
          {activeTab === 'pregnancy' && <PregnancyTracking />}
        </div>
      </div>
    </div>
  );
};

export default CycleTracking;
