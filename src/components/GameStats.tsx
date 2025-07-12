
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Users, Calendar } from 'lucide-react';

interface GameStatsProps {
  totalGames: number;
  gamesWon: number;
  favoriteSport: string;
  upcomingGames: number;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  totalGames, 
  gamesWon, 
  favoriteSport, 
  upcomingGames 
}) => {
  const winRate = totalGames > 0 ? Math.round((gamesWon / totalGames) * 100) : 0;

  const stats = [
    {
      title: 'Games Played',
      value: totalGames,
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Games Won',
      value: gamesWon,
      icon: Trophy,
      color: 'text-green-muted',
      bgColor: 'bg-green-muted/10'
    },
    {
      title: 'Win Rate',
      value: `${winRate}%`,
      icon: Target,
      color: 'text-charcoal',
      bgColor: 'bg-charcoal/10'
    },
    {
      title: 'Upcoming',
      value: upcomingGames,
      icon: Users,
      color: 'text-navy',
      bgColor: 'bg-navy/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <CardContent className="p-4">
            <div className={`${stat.bgColor} ${stat.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameStats;
