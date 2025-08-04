
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, Trophy, User, Settings, LogOut, X, Users, HelpCircle, FileText, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const { signOut } = useAuth();
  const { university } = useUniversity();

  const menuItems = [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Calendar', url: '/calendar', icon: Calendar },
    { title: 'My Games', url: '/my-games', icon: Trophy },
    { title: 'Friends', url: '/friends', icon: Users },
    { title: 'Profile', url: '/profile', icon: User },
    { title: 'Settings', url: '/settings', icon: Settings },
    { title: 'Help & Support', url: '/help-support', icon: HelpCircle },
    { title: 'Terms of Use', url: '/terms-of-use', icon: FileText },
    { title: 'Privacy Policy', url: '/privacy-policy', icon: Shield },
  ];

  const universityAbbreviation = university ? getUniversityAbbreviation(university.domain) : '';

  const handleNavClick = () => {
    onClose();
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-background border-l shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">PickupPlay</h2>
                <p className="text-white/80 text-sm">{university?.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{universityAbbreviation}</span>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.url}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[hsl(var(--university-primary))]/10 text-[hsl(var(--university-primary))] border border-[hsl(var(--university-primary))]/20'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t">
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
