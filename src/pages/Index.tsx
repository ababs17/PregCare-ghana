
import { Heart, Baby, Calendar, Shield, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import HealthChatbot from '@/components/HealthChatbot';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Extract first name from user metadata
  const getFirstName = () => {
    if (!user) return '';
    const fullName = user.user_metadata?.full_name;
    if (fullName) {
      return fullName.split(' ')[0];
    }
    // Fallback to email prefix if no full name
    return user.email?.split('@')[0] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600">Loading PregCareGh...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-400"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-red-400"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-green-400"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 rounded-full bg-blue-400"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-purple-400"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-pink-400"></div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-yellow-400 relative">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PregCareGh</h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-1">🇬🇭</span>
                  Maternal Health & Pregnancy Care
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/profile">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Profile
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">
                      {getFirstName()}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 rounded-3xl p-12 text-white mb-8 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 translate-y-16"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6 flex items-center justify-center">
                <span className="mr-4 text-4xl">🤱🏿</span>
                Welcome to PregCareGh
                <span className="ml-4 text-4xl">👶🏿</span>
              </h2>
              <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your comprehensive maternal health companion, designed specifically for Ghanaian mothers. 
                Track your pregnancy journey, monitor your health, and connect with expert care.
              </p>
              <div className="flex justify-center space-x-3 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">🇬🇭 Made for Ghana</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🩺 Expert-backed</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🔒 Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Cycle Tracking */}
          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-purple-800">Cycle Tracking</CardTitle>
              <CardDescription>
                Monitor your menstrual cycle and fertile windows with intelligent predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/cycle-tracking">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full">
                  Start Tracking
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pregnancy Care */}
          <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-pink-800">Pregnancy Care</CardTitle>
              <CardDescription>
                Comprehensive pregnancy tracking with week-by-week guidance and tips
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/cycle-tracking">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full">
                  Track Pregnancy
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Health Monitoring */}
          <Card className="border-2 border-green-200 hover:border-green-400 transition-colors duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-green-800">Health Monitoring</CardTitle>
              <CardDescription>
                Track vital signs, symptoms, and overall wellness throughout your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/cycle-tracking">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full">
                  Monitor Health
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Cultural Values Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-yellow-200 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            <span className="mr-3">🌍</span>
            Built with Ghanaian Values
            <span className="ml-3">❤️</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <Link to="/communities">
                <h4 className="font-bold text-gray-800 mb-2 hover:text-yellow-600 transition-colors cursor-pointer">Community Support</h4>
              </Link>
              <p className="text-gray-600 text-sm">Connect with other mothers and share experiences in a supportive environment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <Link to="/emergency-contacts">
                <h4 className="font-bold text-gray-800 mb-2 hover:text-red-600 transition-colors cursor-pointer">Local Healthcare</h4>
              </Link>
              <p className="text-gray-600 text-sm">Find nearby hospitals and healthcare facilities with GPS location and direct contact</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Cultural Wisdom</h4>
              <p className="text-gray-600 text-sm">Combining traditional knowledge with modern medical science</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              <span>Healthcare Approved</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🇬🇭</span>
              <span>Made for Ghana</span>
            </div>
          </div>
        </div>
      </main>

      {/* Add the Health Chatbot */}
      <HealthChatbot />
    </div>
  );
};

export default Index;
