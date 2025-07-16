
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HamburgerButtonProps {
  onClick: () => void;
}

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-10 w-10"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default HamburgerButton;
