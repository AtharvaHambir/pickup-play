
import React, { useState } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppSidebar from '@/components/AppSidebar';

export default function TermsOfUsePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Terms of Use</h1>
            </div>
            
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Terms of Use</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: July 31, 2025 — For any questions, contact us at <a href="mailto:support@pickupplay.app" className="underline">support@pickupplay.app</a>.
          </p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <p>
            Welcome to Pickup Play. By using our app, you agree to follow these Terms of Use. Please read them carefully before participating in any games.
          </p>
          <p>
            Users must register using their university email. Participation in games is voluntary and users are expected to behave respectfully towards others.
          </p>
          <p>
            Pickup Play is not liable for injuries, conflicts, or disputes arising during events organized through our platform. Please prioritize safety at all times.
          </p>
          <p>
            Misuse of the platform — such as spam, harassment, or repeated no-shows — may result in suspension or removal from the platform.
          </p>
          <p>
            We may update these terms occasionally. Continued use of the app after updates means you accept the new terms.
          </p>
        </section>
      </main>
    </div>
  );
}
