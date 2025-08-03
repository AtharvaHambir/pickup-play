import React, { useState } from 'react';
import { ArrowLeft, Menu, User, Edit, Trophy, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Profile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
              <User className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Profile</h1>
                <p className="text-white/80">Manage your account and stats</p>
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
        {/* Profile Header */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
                <p className="text-muted-foreground">john.doe@northeastern.edu</p>
                <p className="text-sm text-muted-foreground mt-1">Computer Science • Class of 2025</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant="secondary">Active Player</Badge>
                  <Badge variant="outline">Basketball Enthusiast</Badge>
                </div>
              </div>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-sm text-muted-foreground">Games Played</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-sm text-muted-foreground">Upcoming Games</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-sm text-muted-foreground">Friends</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Trophy className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Played Basketball at Marino Center</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Joined Soccer Game</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Connected with Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Sports */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Favorite Sports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Basketball</Badge>
              <Badge variant="secondary">Soccer</Badge>
              <Badge variant="secondary">Tennis</Badge>
              <Badge variant="outline">Volleyball</Badge>
              <Badge variant="outline">Badminton</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
