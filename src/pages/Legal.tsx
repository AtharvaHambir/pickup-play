
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LegalPage = 'terms' | 'privacy' | 'safety' | null;

const Legal = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<LegalPage>(null);

  const legalPages = [
    { id: 'terms' as const, title: 'Terms of Use', icon: '📋' },
    { id: 'privacy' as const, title: 'Privacy Policy', icon: '🔒' },
    { id: 'safety' as const, title: 'Licensing & Safety', icon: '⚖️' },
  ];

  const renderLegalContent = (page: LegalPage) => {
    switch (page) {
      case 'terms':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Terms of Use</h1>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PickupPlay, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily use PickupPlay for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, 
                and under this license you may not modify or copy the materials.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users agree to use the platform respectfully and responsibly. Harassment, inappropriate 
                behavior, or misuse of the platform is strictly prohibited and may result in account 
                suspension or termination.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Game Participation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users participate in games at their own risk. PickupPlay is not liable for injuries, 
                accidents, or disputes that may occur during game participation. Users are encouraged 
                to follow safety guidelines and respect fellow participants.
              </p>
            </section>

            <footer className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: January 15, 2024 | 
                <span className="ml-2">Contact: legal@pickupplay.app</span>
              </p>
            </footer>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                join games, or contact us for support. This includes your name, university email address, 
                and game participation history.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                including facilitating game organization, sending notifications about games you've 
                joined, and providing customer support.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. Your 
                information is only shared with other users within your university community to 
                facilitate game organization and participation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <footer className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: January 15, 2024 | 
                <span className="ml-2">Contact: privacy@pickupplay.app</span>
              </p>
            </footer>
          </div>
        );

      case 'safety':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Licensing & Safety</h1>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Platform Licensing</h2>
              <p className="text-muted-foreground leading-relaxed">
                PickupPlay is licensed software designed specifically for university communities. 
                Our platform complies with educational technology standards and university partnership 
                requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Safety Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed">
                All users are expected to follow basic safety protocols during game participation. 
                This includes wearing appropriate gear, respecting facility rules, and playing 
                responsibly to minimize injury risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Emergency Procedures</h2>
              <p className="text-muted-foreground leading-relaxed">
                In case of emergency during a game, immediately contact campus security or emergency 
                services. Game organizers should be familiar with facility emergency procedures and 
                first aid protocols.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Liability Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                PickupPlay serves as a platform to connect students for recreational activities. 
                Participation in any sporting activity carries inherent risks. Users participate 
                voluntarily and at their own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Reporting System</h2>
              <p className="text-muted-foreground leading-relaxed">
                We maintain a robust reporting system for safety concerns, inappropriate behavior, 
                or platform misuse. All reports are reviewed promptly and appropriate action is taken 
                to maintain a safe community environment.
              </p>
            </section>

            <footer className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: January 15, 2024 | 
                <span className="ml-2">Contact: safety@pickupplay.app</span>
              </p>
            </footer>
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedPage) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPage(null)}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Legal Documents</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8">
              {renderLegalContent(selectedPage)}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Legal</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-1">
          {legalPages.map((page) => (
            <Card key={page.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader onClick={() => setSelectedPage(page.id)}>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">{page.icon}</span>
                  <span>{page.title}</span>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legal;
