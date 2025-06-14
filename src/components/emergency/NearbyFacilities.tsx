
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Navigation, Hospital } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HealthcareFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string | null;
  emergency_phone: string | null;
  services: string[] | null;
  distance_km: number;
}

const NearbyFacilities = () => {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [radius, setRadius] = useState(10);
  const { toast } = useToast();

  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchNearbyFacilities(location.lat, location.lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Using default location (Accra).",
            variant: "destructive",
          });
          // Default to Accra coordinates
          const defaultLocation = { lat: 5.5574, lng: -0.1976 };
          setUserLocation(defaultLocation);
          fetchNearbyFacilities(defaultLocation.lat, defaultLocation.lng);
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Using default location (Accra).",
      });
      const defaultLocation = { lat: 5.5574, lng: -0.1976 };
      setUserLocation(defaultLocation);
      fetchNearbyFacilities(defaultLocation.lat, defaultLocation.lng);
    }
  };

  const fetchNearbyFacilities = async (lat: number, lng: number) => {
    try {
      const { data, error } = await supabase.rpc('get_nearby_facilities', {
        user_lat: lat,
        user_lon: lng,
        radius_km: radius
      });

      if (error) throw error;
      setFacilities(data || []);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch nearby healthcare facilities.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [radius]);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return '🏥';
      case 'clinic':
        return '🏥';
      case 'pharmacy':
        return '💊';
      case 'maternity_center':
        return '🤱';
      default:
        return '🏥';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'bg-red-100 text-red-800';
      case 'clinic':
        return 'bg-blue-100 text-blue-800';
      case 'pharmacy':
        return 'bg-green-100 text-green-800';
      case 'maternity_center':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>Find Nearby Healthcare Facilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Search Radius (km)
              </label>
              <Input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full"
              />
            </div>
            <Button 
              onClick={getUserLocation} 
              disabled={loading}
              className="bg-red-500 hover:bg-red-600"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {loading ? 'Locating...' : 'Find Facilities'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Facilities List */}
      <div className="grid gap-4">
        {facilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{getTypeIcon(facility.type)}</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{facility.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeColor(facility.type)}>
                          {facility.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {facility.distance_km} km away
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    {facility.address}
                  </p>

                  {facility.services && facility.services.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                  {facility.phone && (
                    <Button 
                      onClick={() => handleCall(facility.phone!)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  )}
                  {facility.emergency_phone && facility.emergency_phone !== facility.phone && (
                    <Button 
                      onClick={() => handleCall(facility.emergency_phone!)}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleDirections(facility.address)}
                    variant="default"
                    size="sm"
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {facilities.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <Hospital className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No healthcare facilities found in your area.</p>
            <p className="text-sm text-gray-400 mt-2">Try increasing the search radius.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NearbyFacilities;
