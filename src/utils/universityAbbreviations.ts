
// University domain to abbreviation mapping
const UNIVERSITY_ABBREVIATIONS: Record<string, string> = {
  'northeastern.edu': 'NEU',
  'mit.edu': 'MIT',
  'harvard.edu': 'H',
  'bu.edu': 'BU',
  'tufts.edu': 'TU',
  'umass.edu': 'UMASS',
  'umb.edu': 'UMB',
  'uml.edu': 'UML',
  'umassd.edu': 'UMD'
};

// University color schemes
const UNIVERSITY_COLORS: Record<string, { primary: string; secondary: string; accent: string; background: string }> = {
  'northeastern.edu': {
    primary: '0 0% 0%', // Black
    secondary: '0 84% 47%', // Red
    accent: '30 25% 65%', // Warm Gray
    background: '0 0% 100%' // White
  },
  'mit.edu': {
    primary: '0 0% 0%', // Black
    secondary: '0 84% 47%', // Red
    accent: '0 0% 40%', // Steel Gray
    background: '0 0% 100%' // White
  },
  'bu.edu': {
    primary: '0 0% 100%', // White
    secondary: '0 84% 47%', // Scarlet Red
    accent: '0 84% 47%', // Red
    background: '0 0% 0%' // Black (inverted for contrast)
  },
  'harvard.edu': {
    primary: '0 0% 0%', // Black
    secondary: '348 83% 38%', // Crimson Red
    accent: '348 83% 38%', // Crimson Red
    background: '0 0% 100%' // White
  },
  'umass.edu': {
    primary: '0 0% 100%', // White
    secondary: '0 59% 28%', // Maroon
    accent: '0 0% 0%', // Black
    background: '0 0% 95%' // Light background
  },
  'umb.edu': {
    primary: '0 0% 100%', // White
    secondary: '0 59% 28%', // Maroon
    accent: '0 0% 0%', // Black
    background: '0 0% 95%' // Light background
  },
  'uml.edu': {
    primary: '0 0% 100%', // White
    secondary: '0 59% 28%', // Maroon
    accent: '0 0% 0%', // Black
    background: '0 0% 95%' // Light background
  },
  'umassd.edu': {
    primary: '0 0% 100%', // White
    secondary: '0 59% 28%', // Maroon
    accent: '0 0% 0%', // Black
    background: '0 0% 95%' // Light background
  }
};

export const getUniversityAbbreviation = (domain: string): string => {
  return UNIVERSITY_ABBREVIATIONS[domain] || domain.substring(0, 2).toUpperCase();
};

export const getUniversityColors = (domain: string) => {
  return UNIVERSITY_COLORS[domain] || {
    primary: '0 0% 20%', // Default dark
    secondary: '120 15% 48%', // Default green
    accent: '215 14% 44%', // Default gray
    background: '0 0% 100%' // Default white
  };
};
