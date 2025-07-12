
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUniversity } from '@/hooks/useUniversity';
import { format, isSameDay } from 'date-fns';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { university } = useUniversity();

  const { data: games } = useQuery({
    queryKey: ['calendar-games', university?.id],
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
      return data;
    },
    enabled: !!university?.id
  });

  const gamesForSelectedDate = games?.filter(game => 
    selectedDate && isSameDay(new Date(game.date_time), selectedDate)
  ) || [];

  const gameDates = games?.map(game => new Date(game.date_time)) || [];

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
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Game Calendar</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {games?.length || 0} upcoming games
            </Badge>
          </div>
        </div>
      </header>

      {/* Calendar Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                Game Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  hasGame: gameDates
                }}
                modifiersStyles={{
                  hasGame: { 
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
                className="rounded-md border-0"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Days with games</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Games for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {gamesForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {gamesForSelectedDate.map((game) => (
                    <div key={game.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getSportEmoji(game.sport)}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{game.sport}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {format(new Date(game.date_time), 'h:mm a')}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {game.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants} players
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {game.duration} min
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {selectedDate 
                      ? 'No games scheduled for this date'
                      : 'Select a date to view games'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Rules */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📋 Booking Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">2-Week Window</p>
                  <p className="text-sm text-muted-foreground">Book games up to 14 days in advance</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Fair Access</p>
                  <p className="text-sm text-muted-foreground">Equal opportunity for all students</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-500 text-white rounded-full p-2">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Smart Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before your games</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Calendar;
