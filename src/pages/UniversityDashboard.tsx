
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, LogOut, MapPin, Clock, Users, Calendar, Basketball, Search } from 'lucide-react';
import CreateGameDialog from '@/components/CreateGameDialog';
import GameDetailsDialog from '@/components/GameDetailsDialog';
import BottomNavigation from '@/components/BottomNavigation';
import { format } from 'date-fns';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

interface Game {
  id: string;
  title: string;
  sport: string;
  location: string;
  date_time: string;
  duration: number;
  max_participants: number;
  description: string | null;
  created_by: string;
  participants: { user_id: string; status: string }[];
  creator: { full_name: string | null };
}

const UniversityDashboard = () => {
  const { signOut } = useAuth();
  const { university, userProfile } = useUniversity();
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const { data: games, isLoading } = useQuery({
    queryKey: ['games', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];
      
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          participants (user_id, status),
          creator:created_by (full_name)
        `)
        .eq('university_id', university.id)
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true });

      if (error) throw error;
      return data as Game[];
    },
    enabled: !!university?.id
  });

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Unsupported University</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Sorry, your university email domain is not supported yet.</p>
            <p className="text-sm text-muted-foreground">
              Contact us to add support for your university!
            </p>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const universityAbbreviation = getUniversityAbbreviation(university.domain);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">{university.name}</p>
            </div>
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card 
            className="bg-gradient-to-br from-orange-400 to-orange-500 text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setCreateGameOpen(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Basketball className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Create Game</h3>
                  <p className="text-white/80">Start a new pickup game</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">My Games</h3>
                  <p className="text-white/80">View upcoming games</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Games Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Available Games</h3>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : games && games.length > 0 ? (
          <div className="space-y-4">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary"
                onClick={() => setSelectedGame(game)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-2xl">🏀</div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{game.sport}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs">
                              {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants} players
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{game.location}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {format(new Date(game.date_time), 'MMM d')} • {format(new Date(game.date_time), 'h:mm a')}
                          </span>
                        </div>
                      </div>

                      {game.description && (
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                          {game.description}
                        </p>
                      )}
                    </div>

                    {game.participants.filter(p => p.status === 'joined').length >= game.max_participants ? (
                      <Badge variant="destructive" className="ml-4">Full</Badge>
                    ) : (
                      <Button className="ml-4">Join Game</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground text-lg mb-4">
                No upcoming games yet
              </div>
              <Button onClick={() => setCreateGameOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create the First Game
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateGameDialog 
        open={createGameOpen}
        onOpenChange={setCreateGameOpen}
        university={university}
      />

      <GameDetailsDialog
        game={selectedGame}
        open={!!selectedGame}
        onOpenChange={(open) => !open && setSelectedGame(null)}
        university={university}
      />

      <BottomNavigation />
    </div>
  );
};

export default UniversityDashboard;
