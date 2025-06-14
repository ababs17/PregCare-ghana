import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bell, Phone, FileText, Hospital, Heart, Baby, Users, Shield, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const dashboardCards = [
    {
      title: "Cycle Tracking",
      description: "Monitor your menstrual cycle and fertility naturally",
      icon: Calendar,
      color: "bg-rose-100 text-rose-700",
      status: "Day 12 of cycle",
      culturalNote: "Traditional wisdom meets modern tracking"
    },
    {
      title: "Pregnancy Journey",
      description: "Support throughout your sacred journey",
      icon: Baby,
      color: "bg-purple-100 text-purple-700",
      status: "Not tracking",
      culturalNote: "Blessed journey ahead"
    },
    {
      title: "Health Monitoring",
      description: "Track vital signs and wellness indicators",
      icon: Heart,
      color: "bg-green-100 text-green-700",
      status: "All good",
      culturalNote: "Your health, our priority"
    },
    {
      title: "Emergency Contacts",
      description: "Your healthcare providers and family",
      icon: Phone,
      color: "bg-blue-100 text-blue-700",
      status: "3 contacts",
      culturalNote: "Community support system"
    },
    {
      title: "Educational Content",
      description: "Learn about maternal health in Twi and English",
      icon: FileText,
      color: "bg-orange-100 text-orange-700",
      status: "New articles",
      culturalNote: "Knowledge is power"
    },
    {
      title: "Community Support",
      description: "Connect with other mothers in your region",
      icon: Users,
      color: "bg-teal-100 text-teal-700",
      status: "Active groups",
      culturalNote: "Together we are stronger"
    }
  ];

  const culturalGreetings = [
    "Akwaaba, Sister!", // Welcome in Twi
    "Maakye, Mama!", // Good morning in Twi
    "Yaa agya!", // Greetings in Twi
  ];

  const [greeting] = useState(culturalGreetings[Math.floor(Math.random() * culturalGreetings.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-400"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-red-400"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-green-400"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 rounded-full bg-blue-400"></div>
      </div>

      {/* Header with Cultural Elements */}
      <header className="bg-white shadow-sm border-b-4 border-yellow-400 relative">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  Akwaaba Maternal
                  <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Ghana
                  </span>
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">🇬🇭</span>
                  Your trusted health companion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/signup">
                <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                  <User className="w-4 h-4 mr-1" />
                  Join Us
                </Button>
              </Link>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 font-medium">
                <Shield className="w-3 h-3 mr-1" />
                Protected
              </Badge>
              <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-50">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {/* Cultural Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-3 flex items-center">
                {greeting}
                <span className="ml-3 text-2xl">🤱🏿</span>
              </h2>
              <p className="text-yellow-100 mb-4 text-lg leading-relaxed">
                Your maternal health journey is sacred and important to us. We're here to support you 
                with wisdom from our ancestors and modern healthcare knowledge.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="secondary" 
                  className="bg-white text-red-600 hover:bg-yellow-50 font-medium"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Today's Health Check
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid with Cultural Enhancements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-yellow-100 hover:border-yellow-300 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  <Badge variant="outline" className="text-xs font-medium bg-yellow-50 border-yellow-200">
                    {card.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-1 text-gray-800">{card.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2">
                  {card.description}
                </CardDescription>
                <p className="text-xs text-yellow-700 italic font-medium">
                  {card.culturalNote}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cycle Tracking */}
          <Link to="/cycle-tracking" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cycle Tracking</h3>
              <p className="text-gray-600 mb-4">
                Track your menstrual cycle, ovulation, and fertility with WHO-supported insights
              </p>
              <div className="flex items-center text-pink-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Pregnancy Journey */}
          <Link to="/pregnancy-journey" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pregnancy Journey</h3>
              <p className="text-gray-600 mb-4">
                Support throughout your sacred journey
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Health Monitoring */}
          <Link to="/health-monitoring" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Health Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Track vital signs and wellness indicators
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Emergency Contacts */}
          <Link to="/emergency-contacts" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Emergency Contacts</h3>
              <p className="text-gray-600 mb-4">
                Your healthcare providers and family
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Educational Content */}
          <Link to="/educational-content" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Educational Content</h3>
              <p className="text-gray-600 mb-4">
                Learn about maternal health in Twi and English
              </p>
              <div className="flex items-center text-orange-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Community Support */}
          <Link to="/community-support" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100 hover:border-teal-300 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Support</h3>
              <p className="text-gray-600 mb-4">
                Connect with other mothers in your region
              </p>
              <div className="flex items-center text-teal-600 font-medium">
                <span>Start tracking</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Quick Actions with Cultural Context */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-yellow-100 p-8 mb-6">
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mr-3">Quick Actions</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 border-2 border-rose-200 hover:bg-rose-50 group"
            >
              <Calendar className="w-6 h-6 text-rose-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Log Symptoms</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 border-2 border-purple-200 hover:bg-purple-50 group"
            >
              <Baby className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Baby Progress</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 border-2 border-green-200 hover:bg-green-50 group"
            >
              <Phone className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Call Healthcare</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 border-2 border-blue-200 hover:bg-blue-50 group"
            >
              <FileText className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Learn (Twi)</span>
            </Button>
          </div>
        </div>

        {/* Cultural Reminders Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-yellow-100 p-8">
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mr-3">Today's Reminders</h3>
            <span className="text-2xl">🌅</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 flex items-center">
                  Take your prenatal vitamins
                  <span className="ml-2">💊</span>
                </p>
                <p className="text-xs text-gray-600">Morning ritual - 8:00 AM</p>
              </div>
              <Button size="sm" variant="ghost" className="text-yellow-700 hover:bg-yellow-100">
                ✓ Done
              </Button>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 flex items-center">
                  Drink plenty of water
                  <span className="ml-2">💧</span>
                </p>
                <p className="text-xs text-gray-600">Progress: 4/8 glasses today</p>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-700 hover:bg-blue-100">
                Update
              </Button>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 flex items-center">
                  Evening prayer and meditation
                  <span className="ml-2">🙏🏿</span>
                </p>
                <p className="text-xs text-gray-600">Traditional wellness practice</p>
              </div>
              <Button size="sm" variant="ghost" className="text-green-700 hover:bg-green-100">
                Remind Later
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-4 border-yellow-400 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-yellow-600 bg-yellow-50">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">Cycle</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50">
              <Baby className="w-5 h-5" />
              <span className="text-xs font-medium">Pregnancy</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-medium">Learn</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50">
              <Hospital className="w-5 h-5" />
              <span className="text-xs font-medium">Care</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50">
              <Bell className="w-5 h-5" />
              <span className="text-xs font-medium">Alerts</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
