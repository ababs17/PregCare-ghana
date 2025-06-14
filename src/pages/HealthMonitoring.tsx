
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Activity, Thermometer, Scale, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HealthChatbot from '@/components/HealthChatbot';

const HealthMonitoring = () => {
  const [activeTab, setActiveTab] = useState('vitals');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-green-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-blue-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Health Monitoring</h1>
                  <p className="text-xs text-gray-600">Track your vital signs and wellness</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vitals')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'vitals'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Vital Signs
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'symptoms'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🤒 Symptoms
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'metrics'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Health Metrics
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Blood Pressure</CardTitle>
                  <CardDescription>Monitor your blood pressure readings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Log Reading</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Thermometer className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Temperature</CardTitle>
                  <CardDescription>Track your body temperature</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Log Temperature</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Scale className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Weight</CardTitle>
                  <CardDescription>Monitor your weight changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Log Weight</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'symptoms' && (
            <Card>
              <CardHeader>
                <CardTitle>Symptom Tracker</CardTitle>
                <CardDescription>Record any symptoms you're experiencing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Track symptoms like nausea, headaches, fatigue, and more.</p>
                  <Button className="bg-green-600 hover:bg-green-700">Add Symptom</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'metrics' && (
            <Card>
              <CardHeader>
                <CardTitle>Health Analytics</CardTitle>
                <CardDescription>View trends and insights about your health data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Visualize your health trends over time.</p>
                  <Button className="bg-green-600 hover:bg-green-700">View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <HealthChatbot />
    </div>
  );
};

export default HealthMonitoring;
