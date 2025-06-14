
-- Add the missing columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone TEXT,
ADD COLUMN age INTEGER,
ADD COLUMN location TEXT,
ADD COLUMN emergency_contact TEXT,
ADD COLUMN medical_conditions TEXT;
