import React, { useState } from 'react';
import { ArrowLeft, Menu, Trophy, Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const MyGames: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useUniversityTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const games = [
    {
      id: 1,
      title: 'Basketball Game',
      date: 'October 28, 2023',
      time: '7:00 PM',
      location: 'Recreation Center Gym',
      players: 8,
    },
    {
      id: 2,
      title: 'Intramural Soccer',
      date: 'October 29, 2023',
      time: '2:00 PM',
      location: 'Sports Field 1',
      players: 15,
    },
    {
      id: 3,
      title: 'Tennis Doubles',
      date: 'October 30, 2023',
      time: '4:00 PM',
      location: 'Tennis Courts',
      players: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">My Games</h1>
                <p className="text-white/80">Track your gaming activity</p>
              </div>
            </div>
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              className="text-white hover:bg-white/20 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Back Button */}
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mt-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Upcoming Games Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Games</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {games.length > 0 ? (
              <ul className="space-y-4">
                {games.map((game) => (
                  <li key={game.id} className="border rounded-md p-4">
                    <div className="font-semibold">{game.title}</div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline-block mr-1" />
                      {game.date}, {game.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 inline-block mr-1" />
                      {game.location}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Users className="h-4 w-4 inline-block mr-1" />
                      {game.players} Players
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming games scheduled.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Stats Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Game Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xl font-semibold">Total Games Played</div>
                <div className="text-2xl font-bold text-primary">15</div>
              </div>
              <div>
                <div className="text-xl font-semibold">Average Players per Game</div>
                <div className="text-2xl font-bold text-primary">12</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule a New Game
            </Button>
            <Button className="w-full justify-start" variant="outline" disabled>
              <MapPin className="h-4 w-4 mr-2" />
              Find Game Locations (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyGames;
