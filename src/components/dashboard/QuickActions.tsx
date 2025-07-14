
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onCreateGame: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onCreateGame }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card 
        className="bg-gradient-to-br from-primary to-accent text-white cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onCreateGame}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-3">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Create Game</h3>
              <p className="text-white/80">Start a new pickup session</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="bg-gradient-to-br from-navy to-charcoal text-white cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate('/my-games')}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-3">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">My Games</h3>
              <p className="text-white/80">View games you've joined</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
