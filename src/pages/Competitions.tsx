
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Medal, BarChart3, Users, Calendar, Sparkles } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Competitions = () => {
  const upcomingFeatures = [
    {
      title: 'Inter-University Matches',
      description: 'Challenge students from other universities',
      icon: Target,
      color: 'bg-red-50 text-red-600',
      comingSoon: true
    },
    {
      title: 'Tournament Brackets',
      description: 'Organized competitive tournaments',
      icon: Medal,
      color: 'bg-blue-50 text-blue-600',
      comingSoon: true
    },
    {
      title: 'University Leaderboards',
      description: 'See how your university ranks',
      icon: BarChart3,
      color: 'bg-purple-50 text-purple-600',
      comingSoon: true
    },
    {
      title: 'Team Championships',
      description: 'Form teams and compete for glory',
      icon: Users,
      color: 'bg-green-50 text-green-600',
      comingSoon: true
    },
    {
      title: 'Seasonal Leagues',
      description: 'Long-term competitive seasons',
      icon: Calendar,
      color: 'bg-orange-50 text-orange-600',
      comingSoon: true
    },
    {
      title: 'Special Events',
      description: 'Unique competitive challenges',
      icon: Sparkles,
      color: 'bg-pink-50 text-pink-600',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Competitions Hub</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              Coming Soon
            </Badge>
          </div>
        </div>
      </header>

      {/* Competitions Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-12 w-12" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Competitive Gaming is Coming! 🏆
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get ready for inter-university competitions, tournaments, and leaderboards. 
            The ultimate way to showcase your skills and represent your university!
          </p>
        </div>

        {/* Upcoming Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${feature.color} rounded-full p-3 w-fit mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Get Ready Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              🚀 Get Ready for Competition Mode!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-muted-foreground">
              While we're building these amazing competitive features, keep playing and improving your skills!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl mb-2">🏃‍♂️</div>
                <h4 className="font-semibold text-foreground mb-1">Stay Active</h4>
                <p className="text-sm text-muted-foreground">Keep playing pickup games to build your stats</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl mb-2">👥</div>
                <h4 className="font-semibold text-foreground mb-1">Build Teams</h4>
                <p className="text-sm text-muted-foreground">Form connections with other players</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-semibold text-foreground mb-1">Track Progress</h4>
                <p className="text-sm text-muted-foreground">Monitor your game history and achievements</p>
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Trophy className="h-5 w-5 mr-2" />
                Notify Me When Ready
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Competition Roadmap
          </h3>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Tournament System</h4>
                  <p className="text-sm text-muted-foreground">Single and double elimination brackets</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Inter-University Play</h4>
                  <p className="text-sm text-muted-foreground">Connect and compete with other universities</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Leaderboards & Rankings</h4>
                  <p className="text-sm text-muted-foreground">Global and local competitive rankings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Competitions;
