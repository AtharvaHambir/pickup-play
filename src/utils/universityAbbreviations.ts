
// University domain to abbreviation mapping
const UNIVERSITY_ABBREVIATIONS: Record<string, string> = {
  'northeastern.edu': 'NEU',
  'mit.edu': 'MIT',
  'harvard.edu': 'H',
  'bu.edu': 'BU',
  'tufts.edu': 'TU'
};

export const getUniversityAbbreviation = (domain: string): string => {
  return UNIVERSITY_ABBREVIATIONS[domain] || domain.substring(0, 2).toUpperCase();
};
