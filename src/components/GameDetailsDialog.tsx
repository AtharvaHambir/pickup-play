
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { University } from '@/hooks/useUniversity';
import { MapPin, Clock, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Game {
  id: string;
  title: string;
  sport: string;
  location: string;
  date_time: string;
  duration: number;
  max_participants: number;
  description: string | null;
  created_by: string;
  participants: { user_id: string; status: string }[];
  creator: { full_name: string | null };
}

interface GameDetailsDialogProps {
  game: Game | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university: University;
}

const GameDetailsDialog: React.FC<GameDetailsDialogProps> = ({ game, open, onOpenChange, university }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: participants } = useQuery({
    queryKey: ['gameParticipants', game?.id],
    queryFn: async () => {
      if (!game?.id) return [];
      
      const { data, error } = await supabase
        .from('participants')
        .select(`
          *,
          user:users(full_name, email)
        `)
        .eq('game_id', game.id)
        .eq('status', 'joined');

      if (error) throw error;
      return data;
    },
    enabled: !!game?.id && open
  });

  const isParticipant = game?.participants.some(p => p.user_id === user?.id && p.status === 'joined');
  const isCreator = game?.created_by === user?.id;
  const isFull = game && game.participants.filter(p => p.status === 'joined').length >= game.max_participants;

  const handleJoinLeave = async () => {
    if (!game || !user) return;
    
    setLoading(true);
    
    try {
      if (isParticipant) {
        // Leave game
        const { error } = await supabase
          .from('participants')
          .delete()
          .eq('game_id', game.id)
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: "Left game",
          description: "You have left the game successfully."
        });
      } else {
        // Join game
        const { error } = await supabase
          .from('participants')
          .insert({
            game_id: game.id,
            user_id: user.id,
            status: 'joined'
          });

        if (error) throw error;

        toast({
          title: "Joined game!",
          description: "You have successfully joined the game."
        });
      }

      queryClient.invalidateQueries({ queryKey: ['games'] });
      queryClient.invalidateQueries({ queryKey: ['gameParticipants'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!game) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{game.title}</DialogTitle>
            <Badge variant="secondary" className="text-sm">{game.sport}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Details */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              <span>{game.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3" />
              <span>{format(new Date(game.date_time), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3" />
              <span>
                {format(new Date(game.date_time), 'h:mm a')} • {game.duration} minutes
              </span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-3" />
              <span>
                {game.participants.filter(p => p.status === 'joined').length}/{game.max_participants} players
              </span>
            </div>
          </div>

          {/* Description */}
          {game.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600 text-sm">{game.description}</p>
            </div>
          )}

          {/* Participants */}
          <div>
            <h4 className="font-medium mb-3">
              Participants ({participants?.length || 0})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {participants?.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {participant.user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{participant.user.full_name || 'Anonymous'}</p>
                    {participant.user_id === game.created_by && (
                      <Badge variant="outline" className="text-xs">Creator</Badge>
                    )}
                  </div>
                </div>
              ))}
              {(!participants || participants.length === 0) && (
                <p className="text-gray-500 text-sm">No participants yet</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
            {!isCreator && (
              <Button
                onClick={handleJoinLeave}
                disabled={loading || (!isParticipant && isFull)}
                className="flex-1"
                variant={isParticipant ? "destructive" : "default"}
              >
                {loading ? 'Please wait...' : 
                 isParticipant ? 'Leave Game' : 
                 isFull ? 'Game Full' : 'Join Game'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameDetailsDialog;
