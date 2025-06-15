
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Shield, ArrowLeft, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema, signInSchema } from '@/lib/validation';
import { z } from 'zod';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    try {
      if (isSignUp) {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse(formData);
      }
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message || "Failed to create account. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message || "Invalid email or password.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome to PregCareGh!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-400"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-red-400"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-green-400"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 rounded-full bg-blue-400"></div>
      </div>

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
                  <h1 className="text-xl font-bold text-gray-800">PregCareGh</h1>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="mr-1">🇬🇭</span>
                    Maternal Health Care
                  </p>
                </div>
              </div>
            </Link>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 font-medium">
              <Shield className="w-3 h-3 mr-1" />
              Secure Login
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-3 flex items-center justify-center">
                Welcome to PregCareGh
                <span className="ml-3 text-2xl">🤱🏿</span>
              </h2>
              <p className="text-yellow-100 mb-4 text-base leading-relaxed">
                Your trusted companion for maternal health and pregnancy care in Ghana
              </p>
            </div>
          </div>
        </div>

        <Card className="border-2 border-yellow-100 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center">
              {isSignUp ? <UserPlus className="w-6 h-6 mr-2" /> : <LogIn className="w-6 h-6 mr-2" />}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSignUp 
                ? 'Join our community of mothers across Ghana' 
                : 'Continue your maternal health journey with us'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-blue-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.email ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="your.email@example.com"
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-1 text-red-600" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.password ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                />
                {validationErrors.password && (
                  <p className="text-sm text-red-600">{validationErrors.password}</p>
                )}
                {isSignUp && (
                  <p className="text-xs text-gray-600">
                    Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                  </p>
                )}
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Lock className="w-4 h-4 mr-1 text-red-600" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`border-2 focus:border-yellow-400 rounded-xl ${
                      validationErrors.confirmPassword ? 'border-red-400' : 'border-yellow-200'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {validationErrors.confirmPassword && (
                    <p className="text-sm text-red-600">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 via-red-500 to-green-500 hover:from-yellow-600 hover:via-red-600 hover:to-green-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg transform transition hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                {isLoading 
                  ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                  : (isSignUp ? 'Create Account' : 'Sign In')
                }
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setValidationErrors({});
                    setFormData({ email: '', password: '', confirmPassword: '' });
                  }}
                  className="text-yellow-600 hover:text-yellow-700 font-semibold underline"
                >
                  {isSignUp ? 'Sign in here' : 'Create one here'}
                </button>
              </p>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>By continuing, you agree to our terms of service and privacy policy</p>
            </div>
          </CardContent>
        </Card>

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

export default Auth;
