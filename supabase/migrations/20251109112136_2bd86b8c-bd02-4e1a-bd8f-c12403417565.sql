-- Create enum for gig status
CREATE TYPE public.gig_status AS ENUM ('open', 'in_progress', 'completed', 'closed');

-- Create enum for gig categories
CREATE TYPE public.gig_category AS ENUM ('web_development', 'mobile_development', 'design', 'writing', 'marketing', 'video_editing', 'photography', 'consulting', 'other');

-- Create gigs table
CREATE TABLE public.gigs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  budget NUMERIC(10, 2),
  category public.gig_category NOT NULL,
  status public.gig_status NOT NULL DEFAULT 'open',
  provider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view open gigs
CREATE POLICY "Anyone can view open gigs"
ON public.gigs
FOR SELECT
USING (status = 'open' OR auth.uid() = provider_id);

-- Policy: Gig providers can create gigs (must be gig_provider role)
CREATE POLICY "Gig providers can create gigs"
ON public.gigs
FOR INSERT
WITH CHECK (
  auth.uid() = provider_id 
  AND public.has_role(auth.uid(), 'gig_provider')
);

-- Policy: Gig providers can update their own gigs
CREATE POLICY "Gig providers can update their own gigs"
ON public.gigs
FOR UPDATE
USING (
  auth.uid() = provider_id 
  AND public.has_role(auth.uid(), 'gig_provider')
);

-- Policy: Gig providers can delete their own gigs
CREATE POLICY "Gig providers can delete their own gigs"
ON public.gigs
FOR DELETE
USING (
  auth.uid() = provider_id 
  AND public.has_role(auth.uid(), 'gig_provider')
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gigs_updated_at
BEFORE UPDATE ON public.gigs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_gigs_provider_id ON public.gigs(provider_id);
CREATE INDEX idx_gigs_status ON public.gigs(status);
CREATE INDEX idx_gigs_category ON public.gigs(category);