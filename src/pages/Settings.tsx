
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Settings = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { university, userProfile } = useUniversity();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [gameReminders, setGameReminders] = useState(true);
  const [gameInvites, setGameInvites] = useState(true);
  const [lastMinuteOpenings, setLastMinuteOpenings] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ full_name: fullName })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-white/80">Manage your preferences</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {universityAbbreviation}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">University Email</Label>
              <Input 
                id="email" 
                value={userProfile?.email || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <Button onClick={handleUpdateProfile} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gameReminders">Game Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified before your games start</p>
              </div>
              <Switch 
                id="gameReminders"
                checked={gameReminders}
                onCheckedChange={setGameReminders}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gameInvites">Game Invites</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when invited to games</p>
              </div>
              <Switch 
                id="gameInvites"
                checked={gameInvites}
                onCheckedChange={setGameInvites}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lastMinute">Last-minute Openings</Label>
                <p className="text-sm text-muted-foreground">Get notified about last-minute game spots</p>
              </div>
              <Switch 
                id="lastMinute"
                checked={lastMinuteOpenings}
                onCheckedChange={setLastMinuteOpenings}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profileVisible">Allow others to view my profile</Label>
                <p className="text-sm text-muted-foreground">Other students can see your profile and invite you to games</p>
              </div>
              <Switch 
                id="profileVisible"
                checked={profileVisible}
                onCheckedChange={setProfileVisible}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              variant="destructive" 
              onClick={signOut}
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
