
-- First, clear existing universities and add the Massachusetts universities you specified
DELETE FROM public.universities;

-- Insert Massachusetts universities with correct domains
INSERT INTO public.universities (domain, name, short_name, primary_color) VALUES
('mit.edu', 'Massachusetts Institute of Technology', 'MIT', '#8a1538'),
('harvard.edu', 'Harvard University', 'Harvard', '#a51c30'),
('bu.edu', 'Boston University', 'BU', '#cc0000'),
('northeastern.edu', 'Northeastern University', 'Northeastern', '#c8102e'),
('umb.edu', 'University of Massachusetts Boston', 'UMass Boston', '#003da5'),
('umass.edu', 'University of Massachusetts Amherst', 'UMass Amherst', '#881c1c'),
('umassd.edu', 'University of Massachusetts Dartmouth', 'UMass Dartmouth', '#003f7f'),
('uml.edu', 'University of Massachusetts Lowell', 'UMass Lowell', '#004990');
