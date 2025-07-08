import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useFields } from '@/hooks/useFields';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, MapPin, Users, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getMascotForDomain } from '@/utils/universityMascots';

interface Field {
  id: string;
  name: string;
  location: string;
  university_id: string;
}

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
}

const FieldSchedule = () => {
  const { signOut } = useAuth();
  const { university, userProfile } = useUniversity();
  const { data: fields, isLoading: fieldsLoading } = useFields();

  const { data: games, isLoading: gamesLoading } = useQuery({
    queryKey: ['fieldGames', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];

      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          participants (user_id, status)
        `)
        .eq('university_id', university.id)
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true });

      if (error) throw error;
      return data as Game[];
    },
    enabled: !!university?.id,
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
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/teams" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Teams
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Field Schedule</h2>

        {fieldsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : fields && fields.length > 0 ? (
          fields.map((field) => (
            <Card key={field.id} className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{field.name}</CardTitle>
                <p className="text-sm text-gray-500">{field.location}</p>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-3">Upcoming Games</h3>
                {gamesLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : games && games.filter(game => game.location === field.name).length > 0 ? (
                  <div className="space-y-4">
                    {games
                      .filter(game => game.location === field.name)
                      .map((game) => (
                        <div key={game.id} className="p-4 border rounded-md">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{game.title}</h4>
                            <Badge variant="secondary">{game.sport}</Badge>
                          </div>
                          <div className="flex items-center text-gray-600 mt-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {format(new Date(game.date_time), 'MMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {format(new Date(game.date_time), 'h:mm a')} • {game.duration} min
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Users className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No upcoming games at this field.</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 text-lg mb-4">
                No fields available.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FieldSchedule;
