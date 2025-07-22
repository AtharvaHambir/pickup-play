import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { signOut, user } = useAuth();
  const { userProfile } = useUniversity();
  const { toast } = useToast();
  
  // Apply university-specific theming
  useUniversityTheme();

  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [notifications, setNotifications] = useState({
    gameReminders: true,
    gameInvites: true,
    lastMinuteOpenings: false
  });
  const [allowProfileView, setAllowProfileView] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    if (!user || !fullName.trim()) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ full_name: fullName.trim() })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been updated."
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
      {/* Header with university-specific gradient */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <Button 
              onClick={handleUpdateProfile}
              disabled={isUpdating || !fullName.trim() || fullName === userProfile?.full_name}
              className="bg-[hsl(var(--university-primary))] hover:bg-[hsl(var(--university-primary))]/90"
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Game reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified before your scheduled games
                </p>
              </div>
              <Switch
                checked={notifications.gameReminders}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, gameReminders: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Game invites</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when invited to games
                </p>
              </div>
              <Switch
                checked={notifications.gameInvites}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, gameInvites: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Last-minute openings</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when spots open up in games you're interested in
                </p>
              </div>
              <Switch
                checked={notifications.lastMinuteOpenings}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, lastMinuteOpenings: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Allow others to view my profile</Label>
                <p className="text-sm text-muted-foreground">
                  Other users can see your basic profile information
                </p>
              </div>
              <Switch
                checked={allowProfileView}
                onCheckedChange={setAllowProfileView}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={signOut}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;