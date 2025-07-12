
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    sport: string;
    location: string;
    date_time: string;
    duration: number;
    max_participants: number;
    description: string | null;
    participants: { user_id: string; status: string }[];
    creator: { full_name: string | null };
  };
  onJoin: (gameId: string) => void;
  onViewDetails: (game: any) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onJoin, onViewDetails }) => {
  const currentParticipants = game.participants.filter(p => p.status === 'joined').length;
  const isFull = currentParticipants >= game.max_participants;
  
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
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1" onClick={() => onViewDetails(game)}>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{getSportEmoji(game.sport)}</span>
              <div>
                <h4 className="text-lg font-semibold text-foreground">{game.sport}</h4>
                <Badge 
                  variant={isFull ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {currentParticipants}/{game.max_participants} players
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">{game.location}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  {format(new Date(game.date_time), 'MMM d, yyyy')} • {format(new Date(game.date_time), 'h:mm a')}
                </span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">{game.duration} minutes</span>
              </div>
            </div>

            {game.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {game.description}
              </p>
            )}
            
            <p className="text-xs text-muted-foreground">
              Created by {game.creator.full_name || 'Anonymous'}
            </p>
          </div>

          <div className="ml-4 flex flex-col space-y-2">
            {isFull ? (
              <Button variant="outline" disabled className="text-sm">
                Full
              </Button>
            ) : (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onJoin(game.id);
                }}
                className="text-sm bg-primary hover:bg-primary/90"
              >
                Join Game
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(game);
              }}
              className="text-xs"
            >
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
