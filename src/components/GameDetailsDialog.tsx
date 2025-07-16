
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Users, Calendar, Trash2, Edit3, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { University } from '@/hooks/useUniversity';
import ModifyGameDialog from './ModifyGameDialog';

interface GameDetailsDialogProps {
  game: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university: University;
}

const GameDetailsDialog: React.FC<GameDetailsDialogProps> = ({
  game,
  open,
  onOpenChange,
  university
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modifyGameOpen, setModifyGameOpen] = useState(false);
  const [participantsWithNames, setParticipantsWithNames] = useState<any[]>([]);

  useEffect(() => {
    const fetchParticipantNames = async () => {
      if (!game?.participants) return;

      const participantIds = game.participants
        .filter((p: any) => p.status === 'joined')
        .map((p: any) => p.user_id);

      if (participantIds.length === 0) return;

      const { data: users, error } = await supabase
        .from('users')
        .select('id, full_name')
        .in('id', participantIds);

      if (error) {
        console.error('Error fetching participant names:', error);
        return;
      }

      const participantsWithUserNames = game.participants
        .filter((p: any) => p.status === 'joined')
        .map((participant: any) => {
          const userData = users?.find(u => u.id === participant.user_id);
          return {
            ...participant,
            full_name: userData?.full_name || 'Anonymous'
          };
        });

      setParticipantsWithNames(participantsWithUserNames);
    };

    if (open && game) {
      fetchParticipantNames();
    }
  }, [game, open]);

  if (!game) return null;

  const isCreator = user?.id === game.created_by;
  const currentParticipants = game.participants?.filter((p: any) => p.status === 'joined').length || 0;
  const isFull = currentParticipants >= game.max_participants;
  const isUserParticipant = game.participants?.some((p: any) => p.user_id === user?.id && p.status === 'joined');

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      'Basketball': '🏀',
      'Soccer': '⚽',
      'Tennis': '🎾',
      'Volleyball': '🏐',
      'Football': '🏈',
      'Cricket': '🏏',
      'Softball': '🥎',
      'Badminton': '🏸',
      'Spikeball': '⚪',
      'Cycling': '🚴',
      'Ultimate Frisbee': '🥏'
    };
    return sportEmojis[sport] || '🏃';
  };

  const handleDeleteGame = async () => {
    if (!isCreator) return;
    
    setDeleteLoading(true);
    try {
      // First delete all participants
      const { error: participantsError } = await supabase
        .from('participants')
        .delete()
        .eq('game_id', game.id);

      if (participantsError) throw participantsError;

      // Then delete the game
      const { error: gameError } = await supabase
        .from('games')
        .delete()
        .eq('id', game.id);

      if (gameError) throw gameError;

      toast({
        title: "Game Deleted",
        description: "The game has been successfully deleted."
      });

      queryClient.invalidateQueries({ queryKey: ['games'] });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!user || isFull || isUserParticipant) return;

    try {
      const { error } = await supabase
        .from('participants')
        .insert({
          game_id: game.id,
          user_id: user.id,
          status: 'joined'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've joined the game successfully!"
      });

      queryClient.invalidateQueries({ queryKey: ['games'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <span className="text-3xl">{getSportEmoji(game.sport)}</span>
              <div>
                <h2 className="text-2xl font-bold">{game.sport}</h2>
                <Badge 
                  variant={isFull ? "destructive" : "secondary"}
                  className="mt-1"
                >
                  {currentParticipants}/{game.max_participants} players
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Game Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span>{game.location}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span>
                    {format(new Date(game.date_time), 'EEEE, MMMM d, yyyy')} at {format(new Date(game.date_time), 'h:mm a')}
                  </span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span>{game.duration} minutes</span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-3 text-primary" />
                  <span>Created by {game.creator?.full_name || 'Anonymous'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {game.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Game Description</h3>
                  <p className="text-muted-foreground">{game.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Participants */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Participants ({currentParticipants})</h3>
                {participantsWithNames.length > 0 ? (
                  <div className="space-y-2">
                    {participantsWithNames.map((participant: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span>{participant.full_name}</span>
                        <Badge variant="outline" className="text-xs">Joined</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No participants yet</p>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              {!isCreator && (
                <>
                  {isUserParticipant ? (
                    <Button variant="outline" disabled className="w-full">
                      Already Joined
                    </Button>
                  ) : isFull ? (
                    <Button variant="outline" disabled className="w-full">
                      Game Full
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleJoinGame}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Join Game
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Game Chat
                  </Button>
                </>
              )}

              {isCreator && (
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setModifyGameOpen(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Modify Game
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteGame}
                    disabled={deleteLoading}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {deleteLoading ? 'Deleting...' : 'Delete Game'}
                  </Button>

                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Manage Game Chat
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ModifyGameDialog
        game={game}
        open={modifyGameOpen}
        onOpenChange={setModifyGameOpen}
      />
    </>
  );
};

export default GameDetailsDialog;
