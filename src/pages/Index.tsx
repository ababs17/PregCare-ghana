
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bell, Phone, FileText, Hospital } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const dashboardCards = [
    {
      title: "Cycle Tracking",
      description: "Track your menstrual cycle and fertility",
      icon: Calendar,
      color: "bg-rose-100 text-rose-600",
      status: "Day 12 of cycle"
    },
    {
      title: "Pregnancy Journey",
      description: "Monitor your pregnancy progress",
      icon: User,
      color: "bg-purple-100 text-purple-600",
      status: "Not tracking"
    },
    {
      title: "Health Alerts",
      description: "Important health notifications",
      icon: Bell,
      color: "bg-orange-100 text-orange-600",
      status: "2 reminders"
    },
    {
      title: "Emergency Contacts",
      description: "Your healthcare providers",
      icon: Phone,
      color: "bg-green-100 text-green-600",
      status: "3 contacts"
    },
    {
      title: "Educational Content",
      description: "Learn about maternal health",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      status: "New articles"
    },
    {
      title: "Healthcare Providers",
      description: "Connect with professionals",
      icon: Hospital,
      color: "bg-teal-100 text-teal-600",
      status: "Find nearby"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Akwaaba Maternal</h1>
                <p className="text-sm text-gray-600">Your health companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Safe
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Sister!</h2>
            <p className="text-orange-100 mb-4">
              Your maternal health journey is important to us. Let's take care of you and your family.
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              Today's Health Check
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-orange-100 hover:border-orange-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {card.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">{card.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2 border-orange-200 hover:bg-orange-50"
            >
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="text-xs">Log Symptoms</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2 border-purple-200 hover:bg-purple-50"
            >
              <User className="w-5 h-5 text-purple-600" />
              <span className="text-xs">Baby Progress</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2 border-green-200 hover:bg-green-50"
            >
              <Phone className="w-5 h-5 text-green-600" />
              <span className="text-xs">Call Doctor</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2 border-blue-200 hover:bg-blue-50"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-xs">Learn More</span>
            </Button>
          </div>
        </div>

        {/* Today's Reminders */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Reminders</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Take your prenatal vitamins</p>
                <p className="text-xs text-gray-600">Daily at 8:00 AM</p>
              </div>
              <Button size="sm" variant="ghost" className="text-orange-600">
                Done
              </Button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Drink 8 glasses of water</p>
                <p className="text-xs text-gray-600">Progress: 4/8 glasses</p>
              </div>
              <Button size="sm" variant="ghost" className="text-purple-600">
                Update
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-orange-600">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Cycle</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-xs">Pregnancy</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Learn</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600">
              <Hospital className="w-5 h-5" />
              <span className="text-xs">Care</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 py-2 text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="text-xs">Alerts</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
