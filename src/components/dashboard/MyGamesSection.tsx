
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Calendar, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MyGamesSectionProps {
  games: any[];
  onRefetch: () => void;
}

const MyGamesSection: React.FC<MyGamesSectionProps> = ({ games, onRefetch }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const myJoinedGames = games.filter(game => 
    game.participants.some((p: any) => p.user_id === user?.id && p.status === 'joined')
  );

  const handleLeaveGame = async (gameId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('participants')
        .delete()
        .eq('game_id', gameId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Left Game",
        description: "You've successfully left the game."
      });

      onRefetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      'Basketball': '🏀',
      'Soccer': '⚽',
      'Tennis': '🎾',
      'Volleyball': '🏐',
      'Football': '🏈',
      'Cricket': '🏏',
      'Softball': '🥎',
      'Badminton': '🏸',
      'Spikeball': '⚪',
      'Cycling': '🚴',
      'Ultimate Frisbee': '🥏'
    };
    return sportEmojis[sport] || '🏃';
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          My Games ({myJoinedGames.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {myJoinedGames.length > 0 ? (
          <div className="space-y-4">
            {myJoinedGames.map((game) => (
              <div key={game.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getSportEmoji(game.sport)}</span>
                    <h3 className="font-semibold text-foreground">{game.sport}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {game.participants.filter((p: any) => p.status === 'joined').length}/{game.max_participants} players
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    {format(new Date(game.date_time), 'MMM d, yyyy • h:mm a')} • {game.duration} min
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {game.location}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleLeaveGame(game.id)}
                    className="text-xs"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Leave Game
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">You haven't joined any games yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyGamesSection;
