
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { University } from '@/hooks/useUniversity';
import { addDays } from 'date-fns';

interface CreateGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university: University;
}

const CreateGameDialog: React.FC<CreateGameDialogProps> = ({ open, onOpenChange, university }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    location: '',
    date: '',
    time: '',
    duration: '60',
    maxParticipants: '10',
    description: '',
    autoDivideTeams: 'yes'
  });

  const sports = [
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 
    'Football', 'Cricket', 'Softball', 'Badminton', 
    'Spikeball', 'Cycling', 'Ultimate Frisbee'
  ];

  const locations = [
    'Campus Gym', 'Sports Complex', 'Basketball Courts',
    'Soccer Field', 'Tennis Courts', 'Swimming Pool',
    'Track Field', 'Recreation Center', 'Outdoor Courts',
    'Student Center Gym'
  ];

  const checkTimeSlotConflict = async (location: string, dateTime: Date, duration: number) => {
    const startTime = dateTime;
    const endTime = new Date(dateTime.getTime() + duration * 60000);

    const { data: conflictingGames, error } = await supabase
      .from('games')
      .select('id, date_time, duration')
      .eq('location', location)
      .eq('university_id', university.id)
      .gte('date_time', startTime.toISOString())
      .lt('date_time', endTime.toISOString());

    if (error) throw error;

    // Also check for games that start before but end during our time slot
    const { data: overlappingGames, error: overlapError } = await supabase
      .from('games')
      .select('id, date_time, duration')
      .eq('location', location)
      .eq('university_id', university.id)
      .lt('date_time', startTime.toISOString());

    if (overlapError) throw overlapError;

    const hasOverlap = overlappingGames?.some(game => {
      const gameEndTime = new Date(new Date(game.date_time).getTime() + (game.duration || 60) * 60000);
      return gameEndTime > startTime;
    });

    return conflictingGames.length > 0 || hasOverlap;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      // Check for time slot conflicts
      const hasConflict = await checkTimeSlotConflict(
        formData.location, 
        dateTime, 
        parseInt(formData.duration)
      );

      if (hasConflict) {
        toast({
          title: "Time Conflict",
          description: "This time slot at this location is already booked. Please choose a different time or location.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Create the game
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .insert({
          title: formData.title,
          sport: formData.sport,
          location: formData.location,
          date_time: dateTime.toISOString(),
          duration: parseInt(formData.duration),
          max_participants: parseInt(formData.maxParticipants),
          description: formData.description || null,
          university_id: university.id,
          created_by: user.id
        })
        .select()
        .single();

      if (gameError) throw gameError;

      // Automatically add the creator as a participant
      const { error: participantError } = await supabase
        .from('participants')
        .insert({
          game_id: gameData.id,
          user_id: user.id,
          status: 'joined'
        });

      if (participantError) throw participantError;

      toast({
        title: "Success!",
        description: "Game created successfully! You've been automatically added to the game."
      });

      // Reset form
      setFormData({
        title: '',
        sport: '',
        location: '',
        date: '',
        time: '',
        duration: '60',
        maxParticipants: '10',
        description: '',
        autoDivideTeams: 'yes'
      });

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ['games'] });
      queryClient.invalidateQueries({ queryKey: ['my-games'] });
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

  const maxDate = addDays(new Date(), 14).toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sport">Sport</Label>
            <Select value={formData.sport} onValueChange={(value) => setFormData(prev => ({ ...prev, sport: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Basketball" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="datetime">Date & Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                max={maxDate}
                required
              />
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Gym Court A" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maxParticipants">Max Players</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value }))}
              min="2"
              max="50"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Game expectations and equipment requirements</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Game expectations and equipment requirements"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="autoDivideTeams">Auto-divide teams?</Label>
            <Select 
              value={formData.autoDivideTeams} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, autoDivideTeams: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Yes, automatically" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, automatically</SelectItem>
                <SelectItem value="no">No, manual selection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            {loading ? 'Creating...' : 'Create Game & Send Invites'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameDialog;
