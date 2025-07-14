
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, LogOut, Search, Filter } from 'lucide-react';
import CreateGameDialog from '@/components/CreateGameDialog';
import GameDetailsDialog from '@/components/GameDetailsDialog';
import BottomNavigation from '@/components/BottomNavigation';
import GameCard from '@/components/GameCard';
import SportFilter from '@/components/SportFilter';
import { format } from 'date-fns';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';
import { useToast } from '@/hooks/use-toast';

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
  const { signOut, user } = useAuth();
  const { university, userProfile } = useUniversity();
  const { toast } = useToast();
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: games, isLoading, refetch } = useQuery({
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

  const handleJoinGame = async (gameId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('participants')
        .insert({
          game_id: gameId,
          user_id: user.id,
          status: 'joined'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've joined the game successfully!"
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

  const handleSportToggle = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

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

  const filteredGames = games?.filter(game => 
    selectedSports.length === 0 || selectedSports.includes(game.sport)
  ) || [];

  const availableSports = [...new Set(games?.map(game => game.sport) || [])];
  const universityAbbreviation = getUniversityAbbreviation(university.domain);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">{university.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {universityAbbreviation}
              </Badge>
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h2>
          <p className="text-muted-foreground">
            Ready to play? Join a game or create your own pickup session.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card 
            className="bg-gradient-to-br from-primary to-accent text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setCreateGameOpen(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-3">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Create Game</h3>
                  <p className="text-white/80">Start a new pickup session</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-navy to-charcoal text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-3">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Browse Games</h3>
                  <p className="text-white/80">Find games to join</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Available Games</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-4 bg-muted/30">
              <SportFilter
                selectedSports={selectedSports}
                onSportToggle={handleSportToggle}
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
                  onJoin={handleJoinGame}
                  onViewDetails={setSelectedGame}
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
                <Button onClick={() => setCreateGameOpen(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create the First Game
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
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
