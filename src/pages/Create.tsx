
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { Plus, Trophy, Users, Calendar, MapPin } from 'lucide-react';
import CreateGameDialog from '@/components/CreateGameDialog';
import BottomNavigation from '@/components/BottomNavigation';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

const Create = () => {
  const { user } = useAuth();
  const { university, userProfile } = useUniversity();
  const [createGameOpen, setCreateGameOpen] = useState(false);

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Unsupported University</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Sorry, your university email domain is not supported yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const universityAbbreviation = getUniversityAbbreviation(university.domain);

  const creationTips = [
    {
      icon: Users,
      title: 'Set the Right Size',
      description: 'Consider the sport and venue when setting participant limits',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Calendar,
      title: 'Plan Ahead',
      description: 'Schedule games at least 24 hours in advance for better turnout',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: MapPin,
      title: 'Choose Accessible Locations',
      description: 'Pick venues that are easy to find and accessible to all students',
      color: 'text-navy',
      bgColor: 'bg-navy/10'
    },
    {
      icon: Trophy,
      title: 'Add Details',
      description: 'Include game expectations and any equipment requirements',
      color: 'text-green-muted',
      bgColor: 'bg-green-muted/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with clean gradient */}
      <header className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Create Your Game</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {universityAbbreviation}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Ready to Start a Game? ⚽
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create pickup games for your university community. Set the details, invite players, and let the fun begin!
          </p>
        </div>

        {/* Main Create Game Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Plus className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Create Your Pickup Game
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Choose your sport, set the time and location, and invite fellow students to join your game.
            </p>
            <Button 
              size="lg" 
              onClick={() => setCreateGameOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Game
            </Button>
          </CardContent>
        </Card>

        {/* Tips for Creating Games */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Tips for Creating Great Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creationTips.map((tip, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${tip.bgColor} rounded-full p-3 flex-shrink-0`}>
                      <tip.icon className={`h-6 w-6 ${tip.color}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Sports */}
        <Card className="bg-muted/20 border-border">
          <CardHeader>
            <CardTitle className="text-center">Popular Sports at {university.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Basketball', emoji: '🏀' },
                { name: 'Soccer', emoji: '⚽' },
                { name: 'Tennis', emoji: '🎾' },
                { name: 'Volleyball', emoji: '🏐' },
                { name: 'Football', emoji: '🏈' },
                { name: 'Cricket', emoji: '🏏' },
                { name: 'Badminton', emoji: '🏸' },
                { name: 'Spikeball', emoji: '⚪' }
              ].map((sport, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-3xl mb-2">{sport.emoji}</div>
                  <p className="text-sm font-medium text-foreground">{sport.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateGameDialog
        open={createGameOpen}
        onOpenChange={setCreateGameOpen}
        university={university}
      />

      <BottomNavigation />
    </div>
  );
};

export default Create;
