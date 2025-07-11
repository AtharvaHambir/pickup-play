
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Target, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import BottomNavigation from '@/components/BottomNavigation';

const Profile = () => {
  const { userProfile } = useUniversity();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient */}
      <header className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">Your university here</p>
            </div>
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="bg-primary text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {userProfile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD'}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {userProfile?.full_name || 'John Doe'}
          </h2>
          <p className="text-muted-foreground">Computer Science • Senior</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">47</div>
              <div className="text-muted-foreground">Games Played</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">32</div>
              <div className="text-muted-foreground">Games Won</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">156</div>
              <div className="text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="flex justify-center space-x-4">
          <div className="bg-yellow-400 text-yellow-800 rounded-full p-3">
            <Trophy className="h-6 w-6" />
          </div>
          <div className="bg-yellow-400 text-yellow-800 rounded-full p-3">
            <Target className="h-6 w-6" />
          </div>
          <div className="bg-yellow-400 text-yellow-800 rounded-full p-3">
            <Star className="h-6 w-6" />
          </div>
          <div className="bg-yellow-400 text-yellow-800 rounded-full p-3">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
