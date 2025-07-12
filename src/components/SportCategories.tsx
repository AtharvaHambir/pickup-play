
import { Button } from "@/components/ui/button";

const sports = [
  { name: "All", emoji: "🏃", count: null },
  { name: "Basketball", emoji: "🏀", count: 3 },
  { name: "Soccer", emoji: "⚽", count: 2 },
  { name: "Tennis", emoji: "🎾", count: 1 },
  { name: "Volleyball", emoji: "🏐", count: 2 },
  { name: "Football", emoji: "🏈", count: 1 },
  { name: "Baseball", emoji: "⚾", count: 1 },
  { name: "Swimming", emoji: "🏊", count: 0 },
  { name: "Running", emoji: "🏃", count: 1 }
];

interface SportCategoriesProps {
  selectedSport: string;
  onSportSelect: (sport: string) => void;
}

const SportCategories = ({ selectedSport, onSportSelect }: SportCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {sports.map((sport) => (
        <Button
          key={sport.name}
          variant={selectedSport === sport.name ? "default" : "outline"}
          onClick={() => onSportSelect(sport.name)}
          className={`
            h-12 px-4 transition-all duration-200
            ${selectedSport === sport.name 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "hover:bg-primary/10 hover:text-primary"
            }
          `}
        >
          <span className="text-lg mr-2">{sport.emoji}</span>
          <span className="font-medium">{sport.name}</span>
          {sport.count !== null && (
            <span className={`
              ml-2 px-2 py-0.5 rounded-full text-xs
              ${selectedSport === sport.name 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted text-muted-foreground"
              }
            `}>
              {sport.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default SportCategories;
