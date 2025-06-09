
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import GameCard from "@/components/GameCard";
import CreateGameModal from "@/components/CreateGameModal";
import Header from "@/components/Header";
import SportCategories from "@/components/SportCategories";

const mockGames = [
  {
    id: 1,
    sport: "Basketball",
    title: "Pickup Basketball @ Cabot Gym",
    location: "Cabot Physical Education Center",
    time: "2:00 PM",
    duration: "1 hour",
    currentPlayers: 6,
    maxPlayers: 10,
    skillLevel: "Intermediate",
    description: "Casual pickup game. All skill levels welcome!",
    creator: "Mike Chen",
    createdTime: "30 min ago"
  },
  {
    id: 2,
    sport: "Soccer",
    title: "Soccer Match @ Parsons Field",
    location: "Parsons Field",
    time: "4:30 PM", 
    duration: "90 minutes",
    currentPlayers: 14,
    maxPlayers: 22,
    skillLevel: "All Levels",
    description: "Need players for a friendly match. Bring water!",
    creator: "Sarah Kim",
    createdTime: "1 hour ago"
  },
  {
    id: 3,
    sport: "Tennis",
    title: "Tennis Doubles @ Marino Center",
    location: "Marino Recreation Center",
    time: "6:00 PM",
    duration: "2 hours", 
    currentPlayers: 2,
    maxPlayers: 4,
    skillLevel: "Advanced",
    description: "Looking for experienced players for competitive doubles.",
    creator: "Alex Johnson",
    createdTime: "45 min ago"
  },
  {
    id: 4,
    sport: "Volleyball",
    title: "Beach Volleyball",
    location: "Volleyball Courts",
    time: "3:15 PM",
    duration: "1.5 hours",
    currentPlayers: 4,
    maxPlayers: 8,
    skillLevel: "Beginner",
    description: "Perfect for beginners! Come learn and have fun.",
    creator: "Emma Davis",
    createdTime: "2 hours ago"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [games, setGames] = useState(mockGames);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === "All" || game.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleCreateGame = (gameData: any) => {
    const newGame = {
      id: games.length + 1,
      ...gameData,
      currentPlayers: 1,
      creator: "You",
      createdTime: "Just now"
    };
    setGames([newGame, ...games]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-northeastern-gray-light via-white to-northeastern-gray-light">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Find Your Game
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Join pickup sports at Northeastern University
          </p>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            size="lg" 
            className="bg-white text-northeastern-red hover:bg-gray-100 text-lg px-8 py-6 animate-slide-up"
          >
            <Plus className="mr-2 h-6 w-6" />
            Create Game
          </Button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search games, locations, or sports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button variant="outline" size="lg" className="h-12">
              <Filter className="mr-2 h-5 w-5" />
              Filter
            </Button>
          </div>

          <SportCategories 
            selectedSport={selectedSport}
            onSportSelect={setSelectedSport}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <Card className="glass-effect border-0 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-northeastern-red mb-2">
                {games.length}
              </div>
              <div className="text-gray-600">Active Games</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-0 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-northeastern-red mb-2">
                {games.reduce((sum, game) => sum + game.currentPlayers, 0)}
              </div>
              <div className="text-gray-600">Players Online</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-0 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-northeastern-red mb-2">
                8
              </div>
              <div className="text-gray-600">Sports Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Games List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              Available Games
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredGames.length} games
            </Badge>
          </div>

          {filteredGames.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-500 text-lg mb-4">
                  No games found matching your criteria
                </div>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-northeastern-red hover:bg-northeastern-red-dark"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create the First Game
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  className={`animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateGameModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGame={handleCreateGame}
      />
    </div>
  );
};

export default Index;
