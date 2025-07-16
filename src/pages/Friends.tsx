
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, UserMinus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const friends = [
    { id: '1', name: 'Alex Johnson', email: 'alex.johnson@university.edu' },
    { id: '2', name: 'Sarah Chen', email: 'sarah.chen@university.edu' },
    { id: '3', name: 'Mike Rodriguez', email: 'mike.rodriguez@university.edu' },
  ];

  const friendsGames = [
    {
      id: '1',
      title: 'Basketball Pickup',
      sport: 'Basketball',
      location: 'Main Gym',
      date: '2024-01-20',
      time: '3:00 PM',
      organizer: 'Alex Johnson'
    },
    {
      id: '2',
      title: 'Soccer Match',
      sport: 'Soccer',
      location: 'Field A',
      date: '2024-01-21',
      time: '5:30 PM',
      organizer: 'Sarah Chen'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Friends</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Friends List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Friends ({friends.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground">{friend.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <UserMinus className="h-4 w-4 mr-2" />
                    Unfollow
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friends' Games */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Friends' Upcoming Games</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Friend to Game
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {friendsGames.map((game) => (
                <div key={game.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{game.title}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {game.sport}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">📍 {game.location}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    🗓 {game.date} at {game.time}
                  </p>
                  <p className="text-sm">Organized by {game.organizer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friend Requests Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Friend Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Friend requests feature coming soon! 🚀
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Friends;
