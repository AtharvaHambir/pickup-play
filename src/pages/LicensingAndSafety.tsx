
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

const LicensingAndSafety = () => {
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
            <h2 className="text-2xl font-bold text-foreground">Licensing & Safety</h2>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Last updated: July 31, 2025 — For questions, email <a href="mailto:support@pickupplay.app" className="text-primary hover:underline">support@pickupplay.app</a>.
          </p>

          <section className="space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              PickupPlay is a platform to help students organize informal sports games. We do not operate or supervise games ourselves.
            </p>
            <p>
              By using the app, you accept full responsibility for your participation and conduct during events.
            </p>
            <p>
              We encourage safe and inclusive play. Users violating our guidelines may be suspended or banned.
            </p>
            <p>
              All content, branding, and features of PickupPlay are protected under copyright and may not be copied or reused without permission.
            </p>
            <p>
              University logos and names are used solely to indicate school affiliation and do not imply endorsement.
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

export default LicensingAndSafety;
