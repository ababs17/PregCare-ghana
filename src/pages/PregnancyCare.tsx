
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, ArrowLeft, Calendar, BookOpen, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import HealthChatbot from '@/components/HealthChatbot';

const PregnancyCare = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-pink-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                  <Baby className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Pregnancy Care</h1>
                  <p className="text-xs text-gray-600">Your journey to motherhood</p>
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
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Baby className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'weekly'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Weekly Guide
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Stethoscope className="w-4 h-4 inline mr-2" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'education'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Education
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Baby className="w-5 h-5 mr-2 text-pink-600" />
                    Pregnancy Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Current Week: Not Set</p>
                    <p className="text-sm text-gray-600">Due Date: Not Set</p>
                    <Button className="bg-pink-600 hover:bg-pink-700 mt-4">Update Pregnancy Info</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🤱🏿 Baby Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Track your baby's growth and development milestones</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 mt-4">View Development</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'weekly' && (
            <Card>
              <CardHeader>
                <CardTitle>Week-by-Week Guide</CardTitle>
                <CardDescription>Comprehensive pregnancy guidance for each week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Get personalized tips and information for your current pregnancy week.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">View Current Week</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appointments' && (
            <Card>
              <CardHeader>
                <CardTitle>Medical Appointments</CardTitle>
                <CardDescription>Track your prenatal appointments and checkups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Keep track of your doctor visits and important medical appointments.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Add Appointment</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'education' && (
            <Card>
              <CardHeader>
                <CardTitle>Pregnancy Education</CardTitle>
                <CardDescription>Learn about pregnancy, childbirth, and parenting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Access educational resources and preparation materials.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Explore Resources</Button>
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

export default PregnancyCare;
