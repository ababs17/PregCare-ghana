
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, MapPin, Users, Clock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const EmergencyActions = () => {
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const triggerEmergency = async () => {
    if (!user) return;

    try {
      // Create emergency alert
      const { error: alertError } = await supabase
        .from('risk_alerts')
        .insert([{
          user_id: user.id,
          alert_type: 'emergency',
          severity: 'critical',
          title: 'Emergency Alert Activated',
          description: 'Emergency button was pressed. Immediate assistance may be needed.',
          data: {
            trigger_method: 'manual',
            timestamp: new Date().toISOString(),
            location: 'User location'
          }
        }]);

      if (alertError) throw alertError;

      setEmergencyTriggered(true);
      toast({
        title: "Emergency Alert Sent",
        description: "Your emergency contacts and healthcare providers are being notified.",
        variant: "destructive",
      });

      // Auto-close dialog after 3 seconds
      setTimeout(() => {
        setIsEmergencyDialogOpen(false);
        setEmergencyTriggered(false);
      }, 3000);

    } catch (error) {
      console.error('Error triggering emergency:', error);
      toast({
        title: "Error",
        description: "Failed to send emergency alert. Please call emergency services directly.",
        variant: "destructive",
      });
    }
  };

  const callEmergencyServices = () => {
    // Ghana emergency number
    window.open('tel:999');
  };

  const quickActions = [
    {
      name: 'Call Emergency',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      action: callEmergencyServices,
      description: 'Call 999 (Ghana Emergency Services)'
    },
    {
      name: 'Find Nearest Hospital',
      icon: MapPin,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open('https://maps.google.com/search/hospital+near+me'),
      description: 'Open Google Maps to find nearest hospital'
    },
    {
      name: 'Alert Contacts',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: triggerEmergency,
      description: 'Notify emergency contacts and healthcare team'
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Quick Action Buttons */}
      {quickActions.map((action) => (
        <Button
          key={action.name}
          onClick={action.action}
          className={`${action.color} text-white`}
          size="sm"
          title={action.description}
        >
          <action.icon className="w-4 h-4" />
        </Button>
      ))}

      {/* Emergency Dialog */}
      <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="destructive" 
            size="lg"
            className="bg-red-600 hover:bg-red-700 animate-pulse"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            EMERGENCY
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Emergency Actions
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!emergencyTriggered ? (
              <>
                <p className="text-gray-700">
                  Choose the appropriate emergency action:
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={callEmergencyServices}
                    className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call 999 - Emergency Services
                  </Button>
                  <Button 
                    onClick={triggerEmergency}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Alert My Emergency Contacts
                  </Button>
                  <Button 
                    onClick={() => window.open('https://maps.google.com/search/hospital+near+me')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Nearest Hospital
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  In case of immediate danger, call 999 first
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  Emergency Alert Sent!
                </h3>
                <p className="text-gray-600">
                  Your emergency contacts and healthcare providers are being notified.
                </p>
                <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Closing in 3 seconds...
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyActions;
