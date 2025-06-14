
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Baby, Calendar, Shield, ArrowLeft, Phone, User, Mail, Lock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dueDate: '',
    isPregnant: false
  });

  const culturalGreetings = [
    "Akwaaba! Join our sisterhood", // Welcome in Twi
    "Yɛ bɛhyia wo!", // We will meet you in Twi
    "Begin your sacred journey", 
  ];

  const [greeting] = useState(culturalGreetings[Math.floor(Math.random() * culturalGreetings.length)]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Akwaaba Maternal</h1>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="mr-1">🇬🇭</span>
                    Join our community
                  </p>
                </div>
              </div>
            </Link>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 font-medium">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* Cultural Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-3 flex items-center justify-center">
                {greeting}
                <span className="ml-3 text-2xl">🤱🏿</span>
              </h2>
              <p className="text-yellow-100 mb-4 text-lg leading-relaxed">
                Join thousands of mothers across Ghana who trust us with their sacred journey. 
                Your health and wellness are our priority.
              </p>
              <div className="flex justify-center space-x-2 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">✨ Cultural wisdom</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">🔒 Private & secure</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">🌍 Twi support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <Card className="border-2 border-yellow-100 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center">
              <Baby className="w-6 h-6 mr-2 text-purple-600" />
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Start your personalized maternal health journey today
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-1 text-yellow-600" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="Your first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-1 text-yellow-600" />
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-blue-600" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-green-600" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Lock className="w-4 h-4 mr-1 text-red-600" />
                    Password *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="Create a strong password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Lock className="w-4 h-4 mr-1 text-red-600" />
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-2 border-yellow-200 focus:border-yellow-400 rounded-xl"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {/* Pregnancy Status */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <Label className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                  <Baby className="w-5 h-5 mr-2 text-purple-600" />
                  Pregnancy Information
                </Label>
                
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="isPregnant"
                    name="isPregnant"
                    checked={formData.isPregnant}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500"
                  />
                  <Label htmlFor="isPregnant" className="text-gray-700 font-medium">
                    I am currently pregnant
                  </Label>
                  <span className="text-purple-600">🤰🏿</span>
                </div>

                {formData.isPregnant && (
                  <div className="space-y-2">
                    <Label htmlFor="dueDate" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                      Expected Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 via-red-500 to-green-500 hover:from-yellow-600 hover:via-red-600 hover:to-green-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg transform transition hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                Begin My Journey
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-yellow-600 hover:text-yellow-700 font-semibold underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1 text-green-600" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-red-600" />
              <span>Healthcare Approved</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🇬🇭</span>
              <span>Made for Ghana</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
