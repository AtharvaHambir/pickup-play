
import React, { useState } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppSidebar from '@/components/AppSidebar';

export default function PrivacyPolicyPage() {
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
              <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
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
          <h2 className="text-2xl font-bold mb-2">Privacy Policy</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: July 31, 2025 — For questions, email <a href="mailto:support@pickupplay.app" className="underline">support@pickupplay.app</a>.
          </p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
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
            By using Pickup Play, you agree to this Privacy Policy.
          </p>
        </section>
      </main>
    </div>
  );
}
