import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Phone, MapPin, Users, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NearbyFacilities from '../components/emergency/NearbyFacilities';
import HealthcareProfessionals from '../components/emergency/HealthcareProfessionals';
import PersonalContacts from '../components/emergency/PersonalContacts';
import RiskAlerts from '../components/emergency/RiskAlerts';
import EmergencyActions from '../components/emergency/EmergencyActions';
import HealthChatbot from '@/components/HealthChatbot';

const EmergencyContacts = () => {
  const [activeTab, setActiveTab] = useState('facilities');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-red-500">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Emergency Contacts & Care</h1>
                  <p className="text-xs text-gray-600">Your safety network at your fingertips</p>
                </div>
              </div>
            </Link>
            <EmergencyActions />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'facilities'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Nearby Facilities
          </button>
          <button
            onClick={() => setActiveTab('professionals')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'professionals'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🩺 Healthcare Team
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Personal Contacts
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 min-w-max py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Risk Alerts
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'facilities' && <NearbyFacilities />}
          {activeTab === 'professionals' && <HealthcareProfessionals />}
          {activeTab === 'contacts' && <PersonalContacts />}
          {activeTab === 'alerts' && <RiskAlerts />}
        </div>
      </div>

      {/* Add the Health Chatbot */}
      <HealthChatbot />
    </div>
  );
};

export default EmergencyContacts;
