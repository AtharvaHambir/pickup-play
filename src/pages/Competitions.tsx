
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, TrendingUp, Bell, Calendar, Target } from 'lucide-react';
import { useUniversity } from '@/hooks/useUniversity';
import BottomNavigation from '@/components/BottomNavigation';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

const Competitions = () => {
  const { university } = useUniversity();
  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

  const competitiveFeatures = [
    {
      icon: Users,
      title: 'Stay Active',
      description: 'Keep playing pickup games to build your stats',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Trophy,
      title: 'Build Teams',
      description: 'Form connections with other players',
      color: 'text-green-muted',
      bgColor: 'bg-green-muted/10'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your game history and achievements',
      color: 'text-navy',
      bgColor: 'bg-navy/10'
    }
  ];

  const roadmapItems = [
    {
      number: 1,
      title: 'Tournament System',
      description: 'Single and double elimination brackets',
      status: 'planned'
    },
    {
      number: 2,
      title: 'Inter-University Play',
      description: 'Connect and compete with other universities',
      status: 'planned'
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
              <p className="text-white/80">Competitions</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {universityAbbreviation}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Coming Soon Section */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Competitions Coming Soon! 🏆
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're building exciting competitive features to make your pickup games even more engaging. 
              Get ready for tournaments, leaderboards, and inter-university competitions!
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              <Bell className="h-5 w-5 mr-2" />
              Notify Me When Ready
            </Button>
          </CardContent>
        </Card>

        {/* What to Do Now */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
            While we're building these amazing competitive features, keep playing and improving your skills:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {competitiveFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competition Roadmap */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-center">Competition Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-green-muted text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
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

export default Competitions;
