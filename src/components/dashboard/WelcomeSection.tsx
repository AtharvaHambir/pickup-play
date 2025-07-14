
import React from 'react';

interface WelcomeSectionProps {
  userName?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Welcome back, {userName || 'Student'}! 👋
      </h2>
      <p className="text-muted-foreground">
        Ready to play? Join a game or create your own pickup session.
      </p>
    </div>
  );
};

export default WelcomeSection;
