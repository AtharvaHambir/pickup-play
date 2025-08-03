
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Menu, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '@/hooks/useUniversity';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import { getUniversityAbbreviation } from '@/utils/universityAbbreviations';
import { Badge } from '@/components/ui/badge';
import AppSidebar from '@/components/AppSidebar';
import BottomNavigation from '@/components/BottomNavigation';

const HelpSupport = () => {
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

      <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
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
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Help & Support</h2>
          </div>
        </div>

        <div className="space-y-8">
          {/* FAQs */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Frequently Asked Questions</h3>
            <div className="bg-card border border-border rounded-lg p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-medium">•</span>
                  <span className="text-muted-foreground">How do I join a game?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-medium">•</span>
                  <span className="text-muted-foreground">Can I invite non-university friends?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-medium">•</span>
                  <span className="text-muted-foreground">How do I report a no-show?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-medium">•</span>
                  <span className="text-muted-foreground">Is my information secure?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-medium">•</span>
                  <span className="text-muted-foreground">Can I host a private game?</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Support */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Support</h3>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                <Input placeholder="Your name" className="bg-background" />
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select an issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="game">Game Related</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Describe your issue..." className="bg-background min-h-[100px]" />
                <Button className="w-full">Send Message</Button>
              </div>
            </div>
          </section>

          {/* Bug Report */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Report a Bug</h3>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Upload a screenshot and describe what went wrong to help us fix the issue.
              </p>
              <div className="space-y-4">
                <Input type="file" accept="image/*" className="bg-background" />
                <Textarea placeholder="Describe the bug in detail..." className="bg-background min-h-[100px]" />
                <Button variant="outline" className="w-full">Report Bug</Button>
              </div>
            </div>
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

export default HelpSupport;
