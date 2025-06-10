
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
    description: ''
  });

  const sports = [
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 
    'Football', 'Baseball', 'Softball', 'Swimming', 
    'Running', 'Cycling', 'Ultimate Frisbee', 'Badminton'
  ];

  const locations = [
    'Campus Gym', 'Sports Complex', 'Basketball Courts',
    'Soccer Field', 'Tennis Courts', 'Swimming Pool',
    'Track Field', 'Recreation Center', 'Outdoor Courts',
    'Student Center Gym'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const { error } = await supabase
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
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Game created successfully!"
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
        description: ''
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Game Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Pickup Basketball"
              required
            />
          </div>

          <div>
            <Label htmlFor="sport">Sport</Label>
            <Select value={formData.sport} onValueChange={(value) => setFormData(prev => ({ ...prev, sport: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Any additional details about the game..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Game'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameDialog;
