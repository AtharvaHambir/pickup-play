
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, Clock, MapPin, Users, BookOpen } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { format, isSameDay, addDays } from 'date-fns';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

const Calendar = () => {
  const { user } = useAuth();
  const { university } = useUniversity();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  const selectedDateGames = games?.filter(game => 
    isSameDay(new Date(game.date_time), selectedDate)
  ) || [];

  const datesWithGames = games?.map(game => new Date(game.date_time)) || [];
  const maxDate = addDays(new Date(), 14); // 2-week limit

  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

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

  const bookingGuidelines = [
    {
      icon: BookOpen,
      title: '2-Week Window',
      description: 'Book games up to 14 days in advance',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Fair Access',
      description: 'Equal opportunity for all students',
      color: 'text-green-muted',
      bgColor: 'bg-green-muted/10'
    },
    {
      icon: Clock,
      title: 'Smart Reminders',
      description: 'Get notified before your games',
      color: 'text-navy',
      bgColor: 'bg-navy/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Game Calendar</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {universityAbbreviation}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                Game Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border-0"
                disabled={(date) => date > maxDate || date < new Date()}
                modifiers={{
                  booked: datesWithGames
                }}
                modifiersStyles={{
                  booked: { 
                    backgroundColor: 'hsl(var(--green-muted))', 
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
              />
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-green-muted mr-2"></div>
                Days with games
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Games */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateGames.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateGames.map((game) => (
                    <div key={game.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getSportEmoji(game.sport)}</span>
                          <h3 className="font-semibold text-foreground">{game.sport}</h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants} players
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {format(new Date(game.date_time), 'h:mm a')} • {game.duration} min
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-2" />
                          {game.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No games scheduled for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Guidelines */}
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Booking Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookingGuidelines.map((guideline, index) => (
                <div key={index} className="text-center">
                  <div className={`${guideline.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <guideline.icon className={`h-8 w-8 ${guideline.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{guideline.title}</h3>
                  <p className="text-sm text-muted-foreground">{guideline.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Calendar;
