
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Menu, Users, Search, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';
import AppSidebar from '@/components/AppSidebar';
import BottomNavigation from '@/components/BottomNavigation';

const Friends = () => {
  const navigate = useNavigate();
  const { university } = useUniversity();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Apply university-specific theming
  useUniversityTheme();

  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">{university?.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {universityAbbreviation}
              </Badge>
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
        {/* Page Header with Back Button */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="sm"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Friends</h2>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search Section */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for students by name or email..." 
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Find Classmates
            </Button>
            <Button variant="outline">
              Invite to Game
            </Button>
          </div>

          {/* Your Friends Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Your Friends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No friends yet. Start connecting!</p>
                <Button className="mt-4">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find Friends
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Friends' Upcoming Games */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Friends' Upcoming Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming games from friends yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add friends to see their games here!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Future Features */}
          <Card className="bg-muted/30 border-dashed border-2 border-muted-foreground/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-muted-foreground mb-2">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Friend requests, mutual connections, and group invitations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AppSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <BottomNavigation />
    </div>
  );
};

export default Friends;
