
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Calendar, LogOut, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

const MyGames = () => {
  const { user } = useAuth();
  const { university } = useUniversity();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: games, refetch } = useQuery({
    queryKey: ['my-games', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('participants')
        .select(`
          *,
          game:games (
            *,
            participants (user_id, status),
            creator:created_by (full_name)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'joined');

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

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

      refetch();
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

  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">PickupPlay</h1>
                <p className="text-white/80">My Games</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {universityAbbreviation}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              My Games ({games?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {games && games.length > 0 ? (
              <div className="space-y-4">
                {games.map((userGame) => (
                  <div key={userGame.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{getSportEmoji(userGame.game.sport)}</span>
                        <h3 className="font-semibold text-foreground">{userGame.game.sport}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {userGame.game.participants.filter((p: any) => p.status === 'joined').length}/{userGame.game.max_participants} players
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        {format(new Date(userGame.game.date_time), 'MMM d, yyyy • h:mm a')} • {userGame.game.duration} min
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {userGame.game.location}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Created by {userGame.game.creator?.full_name || 'Anonymous'}
                      </p>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleLeaveGame(userGame.game.id)}
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
                <Button 
                  onClick={() => navigate('/')}
                  className="mt-4"
                >
                  Find Games to Join
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyGames;
