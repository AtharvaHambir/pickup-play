
import React, { useState } from 'react';
import { Search, UserPlus, Users, Calendar, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Friends: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useUniversityTheme();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Friends</h1>
                <p className="text-white/80">Connect with fellow students</p>
              </div>
            </div>
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              className="text-white hover:bg-white/20 lg:hidden"
            >
              ☰
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="ghost"
          className="flex items-center space-x-2 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Search Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Find Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Search Students
            </Button>
          </CardContent>
        </Card>

        {/* Your Friends Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Your Friends</span>
              </div>
              <Badge variant="secondary">0</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No friends yet. Start connecting!</p>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Find Friends
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Friends' Games Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Friends' Upcoming Games</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming games from friends yet.</p>
              <p className="text-xs text-muted-foreground">Games from your friends will appear here</p>
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
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Friend to Game
            </Button>
            <Button className="w-full justify-start" variant="outline" disabled>
              <Users className="h-4 w-4 mr-2" />
              Friend Requests (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Friends;
