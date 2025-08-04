
import React from 'react';
import { Header } from '@/components/Header';

export default function LicensingAndSafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-2">Licensing & Safety</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: July 31, 2025 — For questions, email <a href="mailto:support@pickupplay.app" className="underline">support@pickupplay.app</a>.
        </p>

        <section className="space-y-3 text-sm leading-relaxed">
          <p>
            Pickup Play is a platform to help students organize informal sports games. We do not operate or supervise games ourselves.
          </p>
          <p>
            By using the app, you accept full responsibility for your participation and conduct during events.
          </p>
          <p>
            We encourage safe and inclusive play. Users violating our guidelines may be suspended or banned.
          </p>
          <p>
            All content, branding, and features of Pickup Play are protected under copyright and may not be copied or reused without permission.
          </p>
          <p>
            University logos and names are used solely to indicate school affiliation and do not imply endorsement.
          </p>
        </section>
      </div>
    </div>
  );
}
