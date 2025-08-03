
import React, { useState } from 'react';
import { ArrowLeft, Menu, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useUniversityTheme } from '@/hooks/useUniversityTheme';
import AppSidebar from '@/components/AppSidebar';

const HelpSupport: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useUniversityTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const faqs = [
    { question: "How do I join a game?", answer: "Click on any game card and select 'Join Game' to participate." },
    { question: "Can I invite non-university friends?", answer: "Currently, only students from your university can join games." },
    { question: "How do I report a no-show?", answer: "Use the 'Report Issue' button in the game details after the game time." },
    { question: "Is my information secure?", answer: "Yes, we use university email verification and secure data practices." },
    { question: "Can I host a private game?", answer: "Yes, you can set games to private when creating them." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Help & Support</h1>
                <p className="text-white/80">Get help with PickupPlay</p>
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

        {/* FAQs Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <h3 className="font-medium text-sm mb-1">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Your name" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an issue category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account">Account Issues</SelectItem>
                <SelectItem value="game">Game Related</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Describe your issue in detail..." />
            <Button className="bg-primary hover:bg-primary/90">
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Bug Report Section */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Report a Bug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Help us improve PickupPlay by reporting any bugs or issues you encounter.
            </p>
            <Input type="file" accept="image/*" />
            <Textarea placeholder="Describe what went wrong and steps to reproduce the bug..." />
            <Button variant="outline" className="w-full">
              Report Bug
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupport;
