import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LogOut } from 'lucide-react';
import CreateGameDialog from '@/components/CreateGameDialog';
import GameDetailsDialog from '@/components/GameDetailsDialog';
import BottomNavigation from '@/components/BottomNavigation';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import QuickActions from '@/components/dashboard/QuickActions';
import GamesSection from '@/components/dashboard/GamesSection';
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
  
  // Apply university-specific theming
  useUniversityTheme();

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
      {/* Header with university-specific gradient */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">{university?.name}</p>
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
        <WelcomeSection userName={userProfile?.full_name?.split(' ')[0]} />
        
        <QuickActions onCreateGame={() => setCreateGameOpen(true)} />
        
        <GamesSection
          filteredGames={filteredGames}
          selectedSports={selectedSports}
          showFilters={showFilters}
          availableSports={availableSports}
          isLoading={isLoading}
          onSportToggle={handleSportToggle}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onCreateGame={() => setCreateGameOpen(true)}
          onJoinGame={handleJoinGame}
          onViewDetails={setSelectedGame}
        />
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
