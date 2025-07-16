
import { useEffect } from 'react';
import { useUniversity } from './useUniversity';
import { getUniversityColors } from '@/utils/universityAbbreviations';

export const useUniversityTheme = () => {
  const { university } = useUniversity();

  useEffect(() => {
    if (university?.domain) {
      const colors = getUniversityColors(university.domain);
      const root = document.documentElement;

      // Apply university-specific colors as CSS variables
      root.style.setProperty('--university-primary', colors.primary);
      root.style.setProperty('--university-secondary', colors.secondary);
      root.style.setProperty('--university-accent', colors.accent);
      root.style.setProperty('--university-background', colors.background);

      // Update primary colors to match university theme
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--accent', colors.accent);

      // Update tab title based on university
      document.title = `PickupPlay | ${university.name}`;
    } else {
      // Default title for general pages
      document.title = 'PickupPlay';
    }

    return () => {
      // Reset to default colors and title when component unmounts
      const root = document.documentElement;
      root.style.removeProperty('--university-primary');
      root.style.removeProperty('--university-secondary');
      root.style.removeProperty('--university-accent');
      root.style.removeProperty('--university-background');
      document.title = 'PickupPlay';
    };
  }, [university?.domain, university?.name]);

  return university;
};
