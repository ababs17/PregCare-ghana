
-- Security Fix: Add missing WITH CHECK clauses to RLS policies for user-owned data

-- Fix profiles table policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Add RLS policies for emergency_contacts table
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own emergency contacts" ON public.emergency_contacts;
CREATE POLICY "Users can view their own emergency contacts" ON public.emergency_contacts
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own emergency contacts" ON public.emergency_contacts;
CREATE POLICY "Users can insert their own emergency contacts" ON public.emergency_contacts
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own emergency contacts" ON public.emergency_contacts;
CREATE POLICY "Users can update their own emergency contacts" ON public.emergency_contacts
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own emergency contacts" ON public.emergency_contacts;
CREATE POLICY "Users can delete their own emergency contacts" ON public.emergency_contacts
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for healthcare_professionals table
ALTER TABLE public.healthcare_professionals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Users can view their own healthcare professionals" ON public.healthcare_professionals
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Users can insert their own healthcare professionals" ON public.healthcare_professionals
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Users can update their own healthcare professionals" ON public.healthcare_professionals
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Users can delete their own healthcare professionals" ON public.healthcare_professionals
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for risk_alerts table
ALTER TABLE public.risk_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own risk alerts" ON public.risk_alerts;
CREATE POLICY "Users can view their own risk alerts" ON public.risk_alerts
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own risk alerts" ON public.risk_alerts;
CREATE POLICY "Users can insert their own risk alerts" ON public.risk_alerts
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own risk alerts" ON public.risk_alerts;
CREATE POLICY "Users can update their own risk alerts" ON public.risk_alerts
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for notification_logs table
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notification logs" ON public.notification_logs;
CREATE POLICY "Users can view their own notification logs" ON public.notification_logs
  FOR SELECT 
  USING (auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can insert their own notification logs" ON public.notification_logs;
CREATE POLICY "Users can insert their own notification logs" ON public.notification_logs
  FOR INSERT 
  WITH CHECK (auth.uid() = recipient_id);

-- Make healthcare_facilities publicly readable (no user restrictions needed)
ALTER TABLE public.healthcare_facilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view healthcare facilities" ON public.healthcare_facilities;
CREATE POLICY "Anyone can view healthcare facilities" ON public.healthcare_facilities
  FOR SELECT 
  USING (true);
