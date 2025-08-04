
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';
import { Badge } from '@/components/ui/badge';
import AppSidebar from '@/components/AppSidebar';
import BottomNavigation from '@/components/BottomNavigation';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { university } = useUniversity();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Apply university-specific theming
  useUniversityTheme();

  const universityAbbreviation = getUniversityAbbreviation(university?.domain || '');

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PickupPlay</h1>
              <p className="text-white/80">{university?.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {universityAbbreviation}
              </Badge>
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
        {/* Page Header with Back Button */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="sm"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Privacy Policy</h2>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Last updated: July 31, 2025 — For questions, email <a href="mailto:support@pickupplay.app" className="text-primary hover:underline">support@pickupplay.app</a>.
          </p>

          <section className="space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              We collect your university email, name, and game activity to help connect you with local sports games. Your data helps us keep the platform safe and tailored to your campus.
            </p>
            <p>
              We never sell your data. Information is shared only within your university network and for internal analytics.
            </p>
            <p>
              We use Supabase for secure authentication and data storage. You may request data deletion by contacting us.
            </p>
            <p>
              We may use cookies or local storage for login sessions. No third-party tracking is used.
            </p>
            <p>
              By using PickupPlay, you agree to this Privacy Policy.
            </p>
          </section>
        </div>
      </div>

      <AppSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <BottomNavigation />
    </div>
  );
};

export default PrivacyPolicy;
