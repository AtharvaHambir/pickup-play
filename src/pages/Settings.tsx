
import React, { useState } from 'react';
import { Settings as SettingsIcon, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Settings: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile, university } = useUniversity();
  useUniversityTheme();

  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [gameReminders, setGameReminders] = useState(true);
  const [gameInvites, setGameInvites] = useState(true);
  const [lastMinuteOpenings, setLastMinuteOpenings] = useState(true);
  const [allowProfileView, setAllowProfileView] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    console.log('Saving profile:', { fullName });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SettingsIcon className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-white/80">Manage your account preferences</p>
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

        {/* Profile Information */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed as it's linked to your university account
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={university?.name || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gameReminders" className="font-medium">Game Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified before your games start</p>
              </div>
              <Switch
                id="gameReminders"
                checked={gameReminders}
                onCheckedChange={setGameReminders}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gameInvites" className="font-medium">Game Invites</Label>
                <p className="text-sm text-muted-foreground">Receive invitations to games</p>
              </div>
              <Switch
                id="gameInvites"
                checked={gameInvites}
                onCheckedChange={setGameInvites}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lastMinute" className="font-medium">Last-minute Openings</Label>
                <p className="text-sm text-muted-foreground">Get notified of last-minute game openings</p>
              </div>
              <Switch
                id="lastMinute"
                checked={lastMinuteOpenings}
                onCheckedChange={setLastMinuteOpenings}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profileView" className="font-medium">Allow others to view my profile</Label>
                <p className="text-sm text-muted-foreground">Other students can see your basic profile information</p>
              </div>
              <Switch
                id="profileView"
                checked={allowProfileView}
                onCheckedChange={setAllowProfileView}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
