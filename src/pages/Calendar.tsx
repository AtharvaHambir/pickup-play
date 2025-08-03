
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Calendar: React.FC = () => {
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
              <CalendarIcon className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Calendar</h1>
                <p className="text-white/80">View your upcoming games</p>
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
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span>Your Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No games scheduled</h3>
              <p className="text-muted-foreground mb-4">Join some games to see them here!</p>
              <Button onClick={() => navigate('/')}>
                Browse Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
