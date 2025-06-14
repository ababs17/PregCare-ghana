
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Phone, Bell, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface RiskAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string | null;
  data: any;
  triggered_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
  notifications_sent: boolean;
}

const RiskAlerts = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAlerts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('risk_alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('triggered_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch risk alerts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [user]);

  const acknowledgeAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('risk_alerts')
        .update({ acknowledged_at: new Date().toISOString() })
        .eq('id', alertId);

      if (error) throw error;
      toast({
        title: "Alert Acknowledged",
        description: "Alert has been marked as acknowledged.",
      });
      fetchAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      toast({
        title: "Error",
        description: "Failed to acknowledge alert.",
        variant: "destructive",
      });
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('risk_alerts')
        .update({ resolved_at: new Date().toISOString() })
        .eq('id', alertId);

      if (error) throw error;
      toast({
        title: "Alert Resolved",
        description: "Alert has been marked as resolved.",
      });
      fetchAlerts();
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast({
        title: "Error",
        description: "Failed to resolve alert.",
        variant: "destructive",
      });
    }
  };

  const createTestAlert = async (type: string, severity: string) => {
    if (!user) return;

    const alertData = {
      user_id: user.id,
      alert_type: type,
      severity: severity,
      title: getTestAlertTitle(type, severity),
      description: getTestAlertDescription(type, severity),
      data: getTestAlertData(type),
    };

    try {
      const { error } = await supabase
        .from('risk_alerts')
        .insert([alertData]);

      if (error) throw error;
      toast({
        title: "Test Alert Created",
        description: "A test alert has been generated.",
      });
      fetchAlerts();
    } catch (error) {
      console.error('Error creating test alert:', error);
      toast({
        title: "Error",
        description: "Failed to create test alert.",
        variant: "destructive",
      });
    }
  };

  const getTestAlertTitle = (type: string, severity: string) => {
    const titles = {
      blood_pressure: `${severity === 'high' ? 'High' : 'Low'} Blood Pressure Alert`,
      heart_rate: `${severity === 'high' ? 'Elevated' : 'Low'} Heart Rate Detected`,
      temperature: `${severity === 'high' ? 'Fever' : 'Low Temperature'} Alert`,
      medication: 'Medication Reminder',
      emergency: 'Emergency Alert Triggered'
    };
    return titles[type as keyof typeof titles] || 'Health Alert';
  };

  const getTestAlertDescription = (type: string, severity: string) => {
    const descriptions = {
      blood_pressure: severity === 'high' ? 
        'Your blood pressure reading (150/95) is higher than normal. Please contact your healthcare provider.' :
        'Your blood pressure reading (85/50) is lower than normal. Please rest and monitor.',
      heart_rate: severity === 'high' ? 
        'Your heart rate (120 bpm) is elevated while at rest. Consider contacting your healthcare provider.' :
        'Your heart rate (45 bpm) is lower than normal. Please monitor and contact healthcare provider if symptoms persist.',
      temperature: severity === 'high' ? 
        'Your temperature (38.5°C) indicates a fever. Monitor symptoms and consider seeking medical attention.' :
        'Your temperature (35.8°C) is below normal. Please warm up and monitor.',
      medication: 'It\'s time to take your prenatal vitamins. Don\'t forget your evening dose.',
      emergency: 'Emergency button was activated. Notifying emergency contacts and healthcare providers.'
    };
    return descriptions[type as keyof typeof descriptions] || 'Please check your health parameters.';
  };

  const getTestAlertData = (type: string) => {
    const data = {
      blood_pressure: { systolic: 150, diastolic: 95, timestamp: new Date().toISOString() },
      heart_rate: { bpm: 120, timestamp: new Date().toISOString() },
      temperature: { celsius: 38.5, timestamp: new Date().toISOString() },
      medication: { medication_name: 'Prenatal Vitamins', due_time: '20:00' },
      emergency: { trigger_method: 'manual', location: 'Home' }
    };
    return data[type as keyof typeof data] || {};
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'blood_pressure': return '🩸';
      case 'heart_rate': return '💓';
      case 'temperature': return '🌡️';
      case 'medication': return '💊';
      case 'emergency': return '🚨';
      default: return '⚠️';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged_at);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged_at);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk Alerts</h2>
          <p className="text-gray-600">Monitor and manage your health alerts</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => createTestAlert('medication', 'medium')}
            variant="outline"
            size="sm"
          >
            Test Medication Alert
          </Button>
          <Button 
            onClick={() => createTestAlert('blood_pressure', 'high')}
            variant="outline"
            size="sm"
          >
            Test BP Alert
          </Button>
          <Button 
            onClick={() => createTestAlert('emergency', 'critical')}
            variant="destructive"
            size="sm"
          >
            Test Emergency Alert
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unacknowledged</p>
                <p className="text-2xl font-bold text-red-600">{unacknowledgedAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
              <Bell className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.resolved_at).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unacknowledged Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-600 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Urgent Alerts Requiring Attention
          </h3>
          {unacknowledgedAlerts.map((alert) => (
            <Card key={alert.id} className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{getAlertIcon(alert.alert_type)}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900">{alert.title}</h3>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(alert.triggered_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                    <Button 
                      onClick={() => acknowledgeAlert(alert.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Acknowledge
                    </Button>
                    <Button 
                      onClick={() => resolveAlert(alert.id)}
                      variant="default"
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* All Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">All Alerts</h3>
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${
            alert.resolved_at ? 'opacity-60' : 
            alert.acknowledged_at ? 'border-green-200' : 'border-orange-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getAlertIcon(alert.alert_type)}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        {alert.resolved_at && (
                          <Badge className="bg-green-100 text-green-800">
                            Resolved
                          </Badge>
                        )}
                        {alert.acknowledged_at && !alert.resolved_at && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Acknowledged
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alert.description}</p>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Triggered: {formatDate(alert.triggered_at)}
                        </div>
                        {alert.acknowledged_at && (
                          <div>Acknowledged: {formatDate(alert.acknowledged_at)}</div>
                        )}
                        {alert.resolved_at && (
                          <div>Resolved: {formatDate(alert.resolved_at)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!alert.acknowledged_at && (
                  <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                    <Button 
                      onClick={() => acknowledgeAlert(alert.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Acknowledge
                    </Button>
                    <Button 
                      onClick={() => resolveAlert(alert.id)}
                      variant="default"
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {alerts.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <span className="text-6xl mb-4 block">📊</span>
            <p className="text-gray-500 mb-2">No alerts yet.</p>
            <p className="text-sm text-gray-400">Your health monitoring alerts will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskAlerts;
