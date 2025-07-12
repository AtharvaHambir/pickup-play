
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SportFilterProps {
  selectedSports: string[];
  onSportToggle: (sport: string) => void;
  availableSports: string[];
  gameCount: number;
}

const SportFilter: React.FC<SportFilterProps> = ({ 
  selectedSports, 
  onSportToggle, 
  availableSports, 
  gameCount 
}) => {
  const allSports = [
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 
    'Football', 'Baseball', 'Softball', 'Swimming', 
    'Running', 'Cycling', 'Ultimate Frisbee', 'Badminton'
  ];

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      'Basketball': '🏀',
      'Soccer': '⚽',
      'Tennis': '🎾',
      'Volleyball': '🏐',
      'Football': '🏈',
      'Baseball': '⚾',
      'Softball': '🥎',
      'Swimming': '🏊',
      'Running': '🏃',
      'Cycling': '🚴',
      'Ultimate Frisbee': '🥏',
      'Badminton': '🏸'
    };
    return sportEmojis[sport] || '🏃';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filter by Sport</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {gameCount} games
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedSports.length === 0 ? "default" : "outline"}
          size="sm"
          onClick={() => {
            // Clear all filters
            selectedSports.forEach(sport => onSportToggle(sport));
          }}
          className="text-sm"
        >
          All Sports
        </Button>
        
        {allSports.map((sport) => {
          const isSelected = selectedSports.includes(sport);
          const isAvailable = availableSports.includes(sport);
          
          return (
            <Button
              key={sport}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSportToggle(sport)}
              disabled={!isAvailable && !isSelected}
              className={`text-sm ${
                isSelected 
                  ? 'bg-primary hover:bg-primary/90' 
                  : isAvailable 
                    ? 'hover:bg-primary/10' 
                    : 'opacity-50'
              }`}
            >
              <span className="mr-1">{getSportEmoji(sport)}</span>
              {sport}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SportFilter;
