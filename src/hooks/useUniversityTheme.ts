
import { useEffect } from 'react';
import { useUniversity } from './useUniversity';
import { getUniversityColors, getUniversityAbbreviation } from '@/utils/universityAbbreviations';

export const useUniversityTheme = () => {
  const { university } = useUniversity();

  useEffect(() => {
    if (university?.domain) {
      const colors = getUniversityColors(university.domain);
      const abbreviation = getUniversityAbbreviation(university.domain);
      const root = document.documentElement;

      // Apply university-specific colors as CSS variables
      root.style.setProperty('--university-primary', colors.primary);
      root.style.setProperty('--university-secondary', colors.secondary);
      root.style.setProperty('--university-accent', colors.accent);
      root.style.setProperty('--university-background', colors.background);

      // Update primary colors to match university theme
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--accent', colors.accent);

      // Update tab title
      document.title = `${abbreviation} | pickup-play`;
    } else {
      // Reset to default colors and title when no university
      const root = document.documentElement;
      root.style.setProperty('--university-primary', '0 0% 20%');
      root.style.setProperty('--university-secondary', '0 84% 47%');
      root.style.setProperty('--university-accent', '215 14% 44%');
      root.style.setProperty('--university-background', '0 0% 100%');
      
      root.style.setProperty('--primary', '0 0% 20%');
      root.style.setProperty('--accent', '0 0% 40%');

      document.title = 'pickup-play';
    }

    return () => {
      // Reset to default colors and title when component unmounts
      const root = document.documentElement;
      root.style.removeProperty('--university-primary');
      root.style.removeProperty('--university-secondary');
      root.style.removeProperty('--university-accent');
      root.style.removeProperty('--university-background');
      
      document.title = 'pickup-play';
    };
  }, [university?.domain]);

  return university;
};
