
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Settings, Users, HelpCircle, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const navigationItems = [
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings'
    },
    {
      icon: Users,
      label: 'Friends',
      path: '/friends'
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/help'
    },
    {
      icon: FileText,
      label: 'Legal',
      path: '/legal'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          <div className="py-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Menu</h2>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarNavigation;
