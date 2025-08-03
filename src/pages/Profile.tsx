
import React, { useState } from 'react';
import { User, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Profile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile, university } = useUniversity();
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
                <p className="text-white/80">Your account information</p>
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

        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {userProfile?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{userProfile?.full_name || 'User'}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="mt-2">
                  {university?.name}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-medium">Games Joined</h4>
                <p className="text-2xl font-bold text-primary">0</p>
              </div>
              <div>
                <h4 className="font-medium">Games Created</h4>
                <p className="text-2xl font-bold text-primary">0</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => navigate('/settings')}>
                Edit Profile
              </Button>
              <Button variant="outline" onClick={() => navigate('/my-games')}>
                View My Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
