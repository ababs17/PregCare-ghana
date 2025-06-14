
-- Create table for healthcare facilities
CREATE TABLE public.healthcare_facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'hospital', 'clinic', 'pharmacy', 'maternity_center'
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  emergency_phone TEXT,
  services TEXT[], -- array of services offered
  operating_hours JSONB, -- operating hours by day
  rating DECIMAL(2, 1) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for healthcare professionals
CREATE TABLE public.healthcare_professionals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  license_number TEXT,
  facility_id UUID REFERENCES public.healthcare_facilities(id),
  phone TEXT NOT NULL,
  email TEXT,
  emergency_phone TEXT,
  notes TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for emergency contacts (personal)
CREATE TABLE public.emergency_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  is_primary BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 1, -- 1 = highest priority
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for risk alerts and notifications
CREATE TABLE public.risk_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  alert_type TEXT NOT NULL, -- 'blood_pressure', 'heart_rate', 'temperature', 'medication', 'emergency'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  title TEXT NOT NULL,
  description TEXT,
  data JSONB, -- additional alert data
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  notifications_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for notification logs
CREATE TABLE public.notification_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_id UUID REFERENCES public.risk_alerts(id) NOT NULL,
  recipient_type TEXT NOT NULL, -- 'healthcare_professional', 'emergency_contact', 'facility'
  recipient_id UUID NOT NULL, -- references the specific recipient
  method TEXT NOT NULL, -- 'sms', 'email', 'push', 'call'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.healthcare_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcare_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for healthcare_facilities (public read access for proximity search)
CREATE POLICY "Anyone can view healthcare facilities" 
  ON public.healthcare_facilities 
  FOR SELECT 
  USING (true);

-- RLS Policies for healthcare_professionals
CREATE POLICY "Users can view their own healthcare professionals" 
  ON public.healthcare_professionals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own healthcare professionals" 
  ON public.healthcare_professionals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own healthcare professionals" 
  ON public.healthcare_professionals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own healthcare professionals" 
  ON public.healthcare_professionals 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for emergency_contacts
CREATE POLICY "Users can view their own emergency contacts" 
  ON public.emergency_contacts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emergency contacts" 
  ON public.emergency_contacts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency contacts" 
  ON public.emergency_contacts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency contacts" 
  ON public.emergency_contacts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for risk_alerts
CREATE POLICY "Users can view their own risk alerts" 
  ON public.risk_alerts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own risk alerts" 
  ON public.risk_alerts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own risk alerts" 
  ON public.risk_alerts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for notification_logs
CREATE POLICY "Users can view notification logs for their alerts" 
  ON public.notification_logs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.risk_alerts 
      WHERE risk_alerts.id = notification_logs.alert_id 
      AND risk_alerts.user_id = auth.uid()
    )
  );

-- Insert some sample healthcare facilities in Ghana
INSERT INTO public.healthcare_facilities (name, type, address, latitude, longitude, phone, emergency_phone, services, operating_hours, verified) VALUES
('Korle Bu Teaching Hospital', 'hospital', 'Guggisberg Ave, Korle Bu, Accra', 5.5474, -0.2316, '+233302665401', '+233302665401', ARRAY['emergency', 'maternity', 'surgery', 'cardiology'], '{"monday": "24/7", "tuesday": "24/7", "wednesday": "24/7", "thursday": "24/7", "friday": "24/7", "saturday": "24/7", "sunday": "24/7"}', true),
('37 Military Hospital', 'hospital', '37 Station, Accra', 5.5701, -0.1870, '+233302776111', '+233302776111', ARRAY['emergency', 'maternity', 'surgery'], '{"monday": "24/7", "tuesday": "24/7", "wednesday": "24/7", "thursday": "24/7", "friday": "24/7", "saturday": "24/7", "sunday": "24/7"}', true),
('Legon Hospital', 'hospital', 'University of Ghana, Legon', 5.6508, -0.1870, '+233302500381', '+233302500381', ARRAY['emergency', 'maternity', 'outpatient'], '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "8:00-20:00", "sunday": "8:00-20:00"}', true),
('Ridge Hospital', 'hospital', 'Castle Rd, Ridge, Accra', 5.5701, -0.1957, '+233302776111', '+233302776111', ARRAY['emergency', 'maternity', 'pediatrics'], '{"monday": "24/7", "tuesday": "24/7", "wednesday": "24/7", "thursday": "24/7", "friday": "24/7", "saturday": "24/7", "sunday": "24/7"}', true),
('Marie Stopes Clinic', 'clinic', 'Osu, Accra', 5.5515, -0.1774, '+233302761641', '+233302761641', ARRAY['maternity', 'family_planning', 'reproductive_health'], '{"monday": "8:00-17:00", "tuesday": "8:00-17:00", "wednesday": "8:00-17:00", "thursday": "8:00-17:00", "friday": "8:00-17:00", "saturday": "8:00-14:00", "sunday": "closed"}', true);

-- Create function to calculate distance between two points
CREATE OR REPLACE FUNCTION public.calculate_distance(lat1 decimal, lon1 decimal, lat2 decimal, lon2 decimal)
RETURNS decimal
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT (
    6371 * acos(
      cos(radians(lat1)) * cos(radians(lat2)) * cos(radians(lon2) - radians(lon1)) +
      sin(radians(lat1)) * sin(radians(lat2))
    )
  )::decimal(10,2);
$$;

-- Create function to get nearby healthcare facilities
CREATE OR REPLACE FUNCTION public.get_nearby_facilities(user_lat decimal, user_lon decimal, radius_km decimal DEFAULT 10)
RETURNS TABLE (
  id uuid,
  name text,
  type text,
  address text,
  phone text,
  emergency_phone text,
  services text[],
  distance_km decimal
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    f.id,
    f.name,
    f.type,
    f.address,
    f.phone,
    f.emergency_phone,
    f.services,
    public.calculate_distance(user_lat, user_lon, f.latitude, f.longitude) as distance_km
  FROM public.healthcare_facilities f
  WHERE f.latitude IS NOT NULL AND f.longitude IS NOT NULL
    AND public.calculate_distance(user_lat, user_lon, f.latitude, f.longitude) <= radius_km
  ORDER BY distance_km ASC;
$$;
