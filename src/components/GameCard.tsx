
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Clock, Users, Star } from "lucide-react";

interface Game {
  id: number;
  sport: string;
  title: string;
  location: string;
  time: string;
  duration: string;
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: string;
  description: string;
  creator: string;
  createdTime: string;
}

interface GameCardProps {
  game: Game;
  className?: string;
  style?: React.CSSProperties;
}

const GameCard = ({ game, className = "", style }: GameCardProps) => {
  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      "Basketball": "🏀",
      "Soccer": "⚽",
      "Tennis": "🎾", 
      "Volleyball": "🏐",
      "Football": "🏈",
      "Baseball": "⚾",
      "Swimming": "🏊",
      "Running": "🏃"
    };
    return sportEmojis[sport] || "🏃";
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const playersFull = game.currentPlayers >= game.maxPlayers;

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`} style={style}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getSportEmoji(game.sport)}</div>
            <div>
              <CardTitle className="text-xl text-gray-900">{game.title}</CardTitle>
              <div className="flex items-center text-gray-600 mt-1">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarFallback className="text-xs bg-northeastern-red text-white">
                    {game.creator.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{game.creator} • {game.createdTime}</span>
              </div>
            </div>
          </div>
          <Badge className={getSkillColor(game.skillLevel)}>
            {game.skillLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600">{game.description}</p>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-2 text-northeastern-red" />
            <span className="text-sm">{game.location}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-northeastern-red" />
            <span className="text-sm">{game.time} • {game.duration}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Users className="h-4 w-4 mr-2 text-northeastern-red" />
            <span className="text-sm">
              {game.currentPlayers}/{game.maxPlayers} players
            </span>
            <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-northeastern-red h-2 rounded-full transition-all duration-300"
                style={{ width: `${(game.currentPlayers / game.maxPlayers) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {playersFull ? (
            <Button variant="outline" disabled className="flex-1">
              Game Full
            </Button>
          ) : (
            <Button className="flex-1 bg-northeastern-red hover:bg-northeastern-red-dark">
              Join Game
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
