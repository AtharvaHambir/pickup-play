
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Medal, BarChart3 } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Competitions = () => {
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

      {/* Competitions Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-foreground">Competitions</h2>
          </div>
          <p className="text-muted-foreground text-lg">Inter-university matches coming soon!</p>
        </div>

        {/* Features */}
        <div className="space-y-4 max-w-md mx-auto">
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm">
            <div className="bg-red-100 text-red-600 rounded-full p-2">
              <Target className="h-4 w-4" />
            </div>
            <span className="text-foreground">Challenge other universities</span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm">
            <div className="bg-blue-100 text-blue-600 rounded-full p-2">
              <Medal className="h-4 w-4" />
            </div>
            <span className="text-foreground">Tournament brackets</span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm">
            <div className="bg-purple-100 text-purple-600 rounded-full p-2">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="text-foreground">University leaderboards</span>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Competitions;
