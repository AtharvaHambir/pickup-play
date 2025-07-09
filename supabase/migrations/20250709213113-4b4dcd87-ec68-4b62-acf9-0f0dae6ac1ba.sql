
-- Keep only 5 universities and fix their data
DELETE FROM public.universities;

-- Insert the 5 specified universities with correct data
INSERT INTO public.universities (domain, name, short_name, primary_color) VALUES
('northeastern.edu', 'Northeastern University', 'NEU', '#c8102e'),
('mit.edu', 'Massachusetts Institute of Technology', 'MIT', '#8a1538'),
('harvard.edu', 'Harvard University', 'Harvard', '#a51c30'),
('bu.edu', 'Boston University', 'BU', '#cc0000'),
('tufts.edu', 'Tufts University', 'Tufts', '#3e8dcc');
