import React, { useState } from 'react';
import { ArrowLeft, Menu, Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const Settings: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useUniversityTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState(false);

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
                <p className="text-white/80">Customize your experience</p>
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
        {/* Account Settings */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Notifications</p>
                  <p className="text-sm text-muted-foreground">Enable push notifications</p>
                </div>
              </Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={(checked) => setNotificationsEnabled(checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark mode appearance</p>
                </div>
              </Label>
              <Switch
                id="dark-mode"
                checked={darkModeEnabled}
                onCheckedChange={(checked) => setDarkModeEnabled(checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-mode">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Privacy Mode</p>
                  <p className="text-sm text-muted-foreground">Hide your profile from public view</p>
                </div>
              </Label>
              <Switch
                id="privacy-mode"
                checked={privacyModeEnabled}
                onCheckedChange={(checked) => setPrivacyModeEnabled(checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Customize the look and feel of the app.
            </p>
            {/* Add color theme options here */}
            <Button variant="outline" disabled>
              Customize Theme (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences.
            </p>
            {/* Add notification options here */}
            <Button variant="outline" disabled>
              Edit Preferences (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
