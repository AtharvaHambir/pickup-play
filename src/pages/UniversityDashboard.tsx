import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, LogOut, MapPin, Clock, Users, Calendar } from 'lucide-react';
import CreateGameDialog from '@/components/CreateGameDialog';
import GameDetailsDialog from '@/components/GameDetailsDialog';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getMascotForDomain } from '@/utils/universityMascots';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Unsupported University</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Sorry, your university email domain is not supported yet.</p>
            <p className="text-sm text-gray-600">
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

  const mascot = getMascotForDomain(university.domain);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: university.primary_color }}
              >
                {university.short_name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">PickupPlay</h1>
                  <span className="text-2xl">{mascot}</span>
                </div>
                <p className="text-sm text-gray-600">{university.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/teams" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Teams
                </Link>
                <Link 
                  to="/field-schedule" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Fields
                </Link>
              </nav>
              <span className="text-sm text-gray-600">
                {userProfile?.full_name}
              </span>
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Find and join pickup games at {university.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {games?.length || 0}
              </div>
              <div className="text-gray-600">Upcoming Games</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {games?.reduce((sum, game) => sum + game.participants.filter(p => p.status === 'joined').length, 0) || 0}
              </div>
              <div className="text-gray-600">Total Players</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(games?.map(game => game.sport)).size || 0}
              </div>
              <div className="text-gray-600">Sports Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Games Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Upcoming Games</h3>
          <Button onClick={() => setCreateGameOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Game
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : games && games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader onClick={() => setSelectedGame(game)}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <Badge variant="secondary">{game.sport}</Badge>
                  </div>
                </CardHeader>
                <CardContent onClick={() => setSelectedGame(game)} className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{game.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {format(new Date(game.date_time), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {format(new Date(game.date_time), 'h:mm a')} • {game.duration}min
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants}
                      </span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ 
                          width: `${Math.min(100, (game.participants.filter(p => p.status === 'joined').length / game.max_participants) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 text-lg mb-4">
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
    </div>
  );
};

export default UniversityDashboard;
