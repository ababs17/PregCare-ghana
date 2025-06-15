import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, User, Mail, Calendar, ArrowLeft, Save, Edit, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { profileSchema, sanitizeText } from '@/lib/validation';
import { z } from 'zod';

interface ProfileData {
  full_name: string;
  email: string;
  phone?: string;
  age?: number;
  location?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_conditions?: string;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    age: undefined,
    location: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    medical_conditions: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        // Parse emergency contact if it exists and contains both name and phone
        let emergencyContactName = '';
        let emergencyContactPhone = '';
        
        if (data.emergency_contact) {
          const parts = data.emergency_contact.split(' - ');
          if (parts.length >= 2) {
            emergencyContactName = parts[0];
            emergencyContactPhone = parts[1];
          } else {
            emergencyContactName = data.emergency_contact;
          }
        }

        setProfileData({
          full_name: data.full_name || '',
          email: data.email || user?.email || '',
          phone: data.phone || '',
          age: data.age || undefined,
          location: data.location || '',
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          medical_conditions: data.medical_conditions || ''
        });
      } else {
        setProfileData(prev => ({
          ...prev,
          email: user?.email || ''
        }));
      }
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: "Failed to load profile data.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setProfileData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value
    }));
  };

  const validateProfile = (data: ProfileData): boolean => {
    try {
      profileSchema.parse(data);
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

  const handleSaveProfile = async () => {
    if (!user) return;

    // Validate the profile data
    if (!validateProfile(profileData)) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      // Sanitize text inputs
      const sanitizedData = {
        ...profileData,
        full_name: sanitizeText(profileData.full_name),
        location: profileData.location ? sanitizeText(profileData.location) : '',
        emergency_contact_name: profileData.emergency_contact_name ? sanitizeText(profileData.emergency_contact_name) : '',
        medical_conditions: profileData.medical_conditions ? sanitizeText(profileData.medical_conditions) : ''
      };

      // Combine emergency contact name and phone for storage
      const emergencyContact = sanitizedData.emergency_contact_name && sanitizedData.emergency_contact_phone
        ? `${sanitizedData.emergency_contact_name} - ${sanitizedData.emergency_contact_phone}`
        : sanitizedData.emergency_contact_name || sanitizedData.emergency_contact_phone || '';

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: sanitizedData.full_name,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          age: sanitizedData.age,
          location: sanitizedData.location,
          emergency_contact: emergencyContact,
          medical_conditions: sanitizedData.medical_conditions,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-400"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-red-400"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-green-400"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 rounded-full bg-blue-400"></div>
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
                  <h1 className="text-xl font-bold text-gray-800">PregCareGh</h1>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="mr-1">🇬🇭</span>
                    Your Profile
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <Card className="border-2 border-yellow-100 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center">
              <span className="mr-3">👤</span>
              My Profile
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage your personal information and health details
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-end mb-4">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setValidationErrors({});
                      fetchProfile();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.full_name ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="Your full name"
                />
                {validationErrors.full_name && (
                  <p className="text-sm text-red-600">{validationErrors.full_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-blue-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="border-2 border-gray-200 bg-gray-50 rounded-xl"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.phone ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="+233XXXXXXXXX"
                />
                {validationErrors.phone && (
                  <p className="text-sm text-red-600">{validationErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                  Age
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={profileData.age || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.age ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="Your age"
                  min="13"
                  max="100"
                />
                {validationErrors.age && (
                  <p className="text-sm text-red-600">{validationErrors.age}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.location ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="City, Region (e.g., Accra, Greater Accra)"
                />
                {validationErrors.location && (
                  <p className="text-sm text-red-600">{validationErrors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name" className="text-sm font-semibold text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-1 text-red-600" />
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergency_contact_name"
                  name="emergency_contact_name"
                  value={profileData.emergency_contact_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.emergency_contact_name ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="Full name of emergency contact"
                />
                {validationErrors.emergency_contact_name && (
                  <p className="text-sm text-red-600">{validationErrors.emergency_contact_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-red-600" />
                  Emergency Contact Phone
                </Label>
                <Input
                  id="emergency_contact_phone"
                  name="emergency_contact_phone"
                  type="tel"
                  value={profileData.emergency_contact_phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`border-2 focus:border-yellow-400 rounded-xl ${
                    validationErrors.emergency_contact_phone ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="+233XXXXXXXXX"
                />
                {validationErrors.emergency_contact_phone && (
                  <p className="text-sm text-red-600">{validationErrors.emergency_contact_phone}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medical_conditions" className="text-sm font-semibold text-gray-700">
                  Medical Conditions / Allergies
                </Label>
                <textarea
                  id="medical_conditions"
                  name="medical_conditions"
                  rows={3}
                  value={profileData.medical_conditions}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`flex w-full rounded-xl border-2 focus:border-yellow-400 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                    validationErrors.medical_conditions ? 'border-red-400' : 'border-yellow-200'
                  }`}
                  placeholder="List any medical conditions, allergies, or medications..."
                />
                {validationErrors.medical_conditions && (
                  <p className="text-sm text-red-600">{validationErrors.medical_conditions}</p>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Privacy Note:</span> Your personal information is securely stored and only used to provide you with personalized healthcare recommendations and emergency assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
