
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import GameCard from '@/components/GameCard';
import SportFilter from '@/components/SportFilter';

interface GamesSectionProps {
  filteredGames: any[];
  selectedSports: string[];
  showFilters: boolean;
  availableSports: string[];
  isLoading: boolean;
  onSportToggle: (sport: string) => void;
  onToggleFilters: () => void;
  onCreateGame: () => void;
  onJoinGame: (gameId: string) => void;
  onViewDetails: (game: any) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({
  filteredGames,
  selectedSports,
  showFilters,
  availableSports,
  isLoading,
  onSportToggle,
  onToggleFilters,
  onCreateGame,
  onJoinGame,
  onViewDetails
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Available Games</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onToggleFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <Card className="p-4 bg-muted/30">
          <SportFilter
            selectedSports={selectedSports}
            onSportToggle={onSportToggle}
            availableSports={availableSports}
            gameCount={filteredGames.length}
          />
        </Card>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="space-y-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onJoin={onJoinGame}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 bg-muted/20">
          <CardContent>
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <div className="text-xl font-semibold text-foreground mb-2">
              {selectedSports.length > 0 ? 'No games found for selected sports' : 'No upcoming games yet'}
            </div>
            <p className="text-muted-foreground mb-6">
              {selectedSports.length > 0 
                ? 'Try adjusting your filters or create a new game' 
                : 'Be the first to create a pickup game for your university!'
              }
            </p>
            <Button onClick={onCreateGame} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create the First Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GamesSection;
