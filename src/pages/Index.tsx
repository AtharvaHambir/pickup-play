
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Calendar, Plus, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Index = () => {
  // Mock data for demonstration
  const mockGames = [
    {
      id: "1",
      title: "Basketball Game",
      sport: "Basketball",
      location: "Main Gym Court A",
      date_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      duration: 90,
      max_participants: 10,
      description: "Competitive basketball game for intermediate players",
      participants: [
        { user_id: "user1", status: "joined" },
        { user_id: "user2", status: "joined" },
        { user_id: "user3", status: "joined" }
      ],
      creator: { full_name: "John Smith" }
    },
    {
      id: "2", 
      title: "Soccer Match",
      sport: "Soccer",
      location: "Soccer Field 1",
      date_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      duration: 120,
      max_participants: 22,
      description: "Friendly soccer match, all skill levels welcome",
      participants: [
        { user_id: "user1", status: "joined" },
        { user_id: "user2", status: "joined" },
        { user_id: "user3", status: "joined" },
        { user_id: "user4", status: "joined" },
        { user_id: "user5", status: "joined" }
      ],
      creator: { full_name: "Sarah Johnson" }
    },
    {
      id: "3",
      title: "Tennis Doubles",
      sport: "Tennis", 
      location: "Tennis Court 2",
      date_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      duration: 60,
      max_participants: 4,
      description: "Looking for doubles partners for a fun tennis match",
      participants: [
        { user_id: "user1", status: "joined" },
        { user_id: "user2", status: "joined" }
      ],
      creator: { full_name: "Mike Davis" }
    }
  ];

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      'Basketball': '🏀',
      'Soccer': '⚽',
      'Tennis': '🎾',
      'Volleyball': '🏐',
      'Football': '🏈',
      'Baseball': '⚾'
    };
    return sportEmojis[sport] || '🏃';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">PickupPlay</h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Connect with fellow university students for pickup games, sports, and activities. 
            Book fields, create teams, and never miss a game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground">
              From game creation to team management, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Create Games</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily create pickup games for any sport. Set the time, location, and invite others to join.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Join Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find and join games in your area. Connect with students who share your passion for sports.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Stay Organized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep track of your games with our built-in calendar and never miss an important match.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games Preview Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Games</h2>
            <p className="text-xl text-muted-foreground">
              Join these exciting games happening soon
            </p>
          </div>

          <div className="space-y-6">
            {mockGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{getSportEmoji(game.sport)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{game.sport}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {game.participants.length}/{game.max_participants} players
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{game.location}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">
                            {format(new Date(game.date_time), 'MMM d, yyyy')} • {format(new Date(game.date_time), 'h:mm a')}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{game.duration} minutes</span>
                        </div>
                      </div>

                      {game.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {game.description}
                        </p>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        Created by {game.creator.full_name}
                      </p>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <Button className="text-sm bg-primary hover:bg-primary/90">
                        Join Game
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All Games
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students already using PickupPlay to stay active and connected.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
            Sign Up with University Email
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
