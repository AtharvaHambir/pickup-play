
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { userProfile } = useUniversity();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(userProfile?.full_name || '');
  const [notifications, setNotifications] = useState({
    gameReminders: true,
    gameInvites: true,
    lastMinuteOpenings: false,
  });
  const [allowProfileView, setAllowProfileView] = useState(true);

  const handleUpdateProfile = () => {
    // TODO: Implement profile update
    toast.success('Profile updated successfully!');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
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
            <Button onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Game Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about your upcoming games</p>
              </div>
              <Switch
                checked={notifications.gameReminders}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, gameReminders: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Game Invites</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when friends invite you</p>
              </div>
              <Switch
                checked={notifications.gameInvites}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, gameInvites: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Last-minute Openings</Label>
                <p className="text-sm text-muted-foreground">Get alerts when spots open up in games</p>
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
            <CardTitle className="text-lg">Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Others to View My Profile</Label>
                <p className="text-sm text-muted-foreground">Let other students see your profile information</p>
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
              variant="destructive"
              onClick={handleSignOut}
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
