import React, { useState } from 'react';
import { ArrowLeft, Menu, Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Calendar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useUniversityTheme();

  const handleBack = () => {
    navigate(-1);
  };

  // Mock data for upcoming games
  const upcomingGames = [
    {
      id: 1,
      sport: 'Basketball',
      date: '2024-01-15',
      time: '6:00 PM',
      location: 'Marino Center Court 1',
      players: '8/10',
      status: 'confirmed'
    },
    {
      id: 2,
      sport: 'Soccer',
      date: '2024-01-16',
      time: '4:00 PM',
      location: 'Parsons Field',
      players: '18/22',
      status: 'pending'
    },
    {
      id: 3,
      sport: 'Tennis',
      date: '2024-01-17',
      time: '2:00 PM',
      location: 'Cabot Center Courts',
      players: '3/4',
      status: 'confirmed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Calendar</h1>
                <p className="text-white/80">View and manage your games</p>
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
        {/* Quick Actions */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Game
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Events
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Games */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span>Upcoming Games</span>
              </div>
              <Badge variant="secondary">{upcomingGames.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingGames.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{game.sport}</h3>
                  <Badge 
                    variant={game.status === 'confirmed' ? 'default' : 'secondary'}
                    className={game.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {game.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Date:</strong> {game.date}</p>
                    <p><strong>Time:</strong> {game.time}</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong> {game.location}</p>
                    <p><strong>Players:</strong> {game.players}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar View Placeholder */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Interactive calendar view coming soon</p>
              <p className="text-xs text-muted-foreground">
                This will show a full calendar with all your games and events
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
