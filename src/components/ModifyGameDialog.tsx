
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ModifyGameDialogProps {
  game: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModifyGameDialog: React.FC<ModifyGameDialogProps> = ({ game, open, onOpenChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: game?.location || '',
    date: game?.date_time ? format(new Date(game.date_time), 'yyyy-MM-dd') : '',
    time: game?.date_time ? format(new Date(game.date_time), 'HH:mm') : '',
    duration: game?.duration?.toString() || '60'
  });

  const locations = [
    'Campus Gym', 'Sports Complex', 'Basketball Courts',
    'Soccer Field', 'Tennis Courts', 'Swimming Pool',
    'Track Field', 'Recreation Center', 'Outdoor Courts',
    'Student Center Gym'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !game) return;
    
    setLoading(true);
    
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const { error } = await supabase
        .from('games')
        .update({
          location: formData.location,
          date_time: dateTime.toISOString(),
          duration: parseInt(formData.duration)
        })
        .eq('id', game.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Game updated successfully!"
      });

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ['games'] });
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modify Game</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
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
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              min="15"
              max="300"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            {loading ? 'Updating...' : 'Update Game'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyGameDialog;
