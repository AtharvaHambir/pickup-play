
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Target, Award, Calendar, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import BottomNavigation from '@/components/BottomNavigation';
import GameStats from '@/components/GameStats';
import { format } from 'date-fns';

const Profile = () => {
  const { user } = useAuth();
  const { userProfile, university } = useUniversity();
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const { data: userGames } = useQuery({
    queryKey: ['user-games', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('participants')
        .select(`
          *,
          game:games (
            id,
            sport,
            location,
            date_time,
            duration,
            max_participants,
            participants (user_id, status)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'joined');

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: createdGames } = useQuery({
    queryKey: ['created-games', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          participants (user_id, status)
        `)
        .eq('created_by', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

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

  const totalGames = (userGames?.length || 0) + (createdGames?.length || 0);
  const upcomingGames = userGames?.filter(ug => 
    new Date(ug.game.date_time) > new Date()
  ).length || 0;

  const sportStats = userGames?.reduce((acc, game) => {
    const sport = game.game.sport;
    acc[sport] = (acc[sport] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const favoriteSport = Object.entries(sportStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
  const availableSports = ['all', ...Object.keys(sportStats)];

  const filteredGames = selectedSport === 'all' 
    ? userGames 
    : userGames?.filter(ug => ug.game.sport === selectedSport);

  const achievements = [
    { name: 'First Game', icon: Trophy, unlocked: totalGames >= 1, color: 'text-primary' },
    { name: 'Team Player', icon: Users, unlocked: totalGames >= 5, color: 'text-accent' },
    { name: 'Regular', icon: Target, unlocked: totalGames >= 10, color: 'text-green-muted' },
    { name: 'All-Star', icon: Star, unlocked: totalGames >= 25, color: 'text-navy' },
    { name: 'Legend', icon: Award, unlocked: totalGames >= 50, color: 'text-charcoal' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Your Profile</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {university?.name}
            </Badge>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold">
                {userProfile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {userProfile?.full_name || 'Student'}
                </h2>
                <p className="text-muted-foreground text-lg mb-4">
                  {userProfile?.email} • {university?.name}
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="px-3 py-1">
                    Member since {format(new Date(), 'MMM yyyy')}
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1 bg-muted">
                    Favorite: {getSportEmoji(favoriteSport)} {favoriteSport}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Statistics */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Your Stats</h3>
          <GameStats
            totalGames={totalGames}
            gamesWon={Math.floor(totalGames * 0.65)} // Mock win rate
            favoriteSport={favoriteSport}
            upcomingGames={upcomingGames}
          />
        </div>

        {/* Achievements */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'border-primary bg-primary/5'
                      : 'border-muted bg-muted/20 opacity-60'
                  }`}
                >
                  <achievement.icon 
                    className={`h-8 w-8 mx-auto mb-2 ${
                      achievement.unlocked ? achievement.color : 'text-muted-foreground'
                    }`} 
                  />
                  <p className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Game History
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {availableSports.map((sport) => (
                  <Button
                    key={sport}
                    variant={selectedSport === sport ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSport(sport)}
                    className="text-xs"
                  >
                    {sport === 'all' ? 'All Sports' : `${getSportEmoji(sport)} ${sport}`}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredGames && filteredGames.length > 0 ? (
              <div className="space-y-4">
                {filteredGames.map((userGame) => (
                  <div key={userGame.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getSportEmoji(userGame.game.sport)}</span>
                        <div>
                          <h4 className="font-semibold text-foreground">{userGame.game.sport}</h4>
                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {userGame.game.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(userGame.game.date_time), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {userGame.game.participants.filter(p => p.status === 'joined').length} players
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={new Date(userGame.game.date_time) > new Date() ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {new Date(userGame.game.date_time) > new Date() ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {selectedSport === 'all' 
                    ? 'No games played yet. Join your first game!'
                    : `No ${selectedSport} games played yet.`
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
