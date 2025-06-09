
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Clock, Users, Trophy, X } from "lucide-react";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGame: (gameData: any) => void;
}

const CreateGameModal = ({ isOpen, onClose, onCreateGame }: CreateGameModalProps) => {
  const [formData, setFormData] = useState({
    sport: "",
    title: "",
    location: "",
    time: "",
    duration: "",
    maxPlayers: "",
    skillLevel: "",
    description: ""
  });

  const locations = [
    "Cabot Physical Education Center",
    "Marino Recreation Center", 
    "Parsons Field",
    "Volleyball Courts",
    "Carter Playground",
    "Alumni Hall Gym",
    "SquashBusters Courts",
    "Matthews Arena"
  ];

  const sports = [
    "Basketball", "Soccer", "Tennis", "Volleyball", 
    "Football", "Baseball", "Swimming", "Running"
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  const durations = ["30 minutes", "1 hour", "1.5 hours", "2 hours", "3 hours"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sport || !formData.title || !formData.location || !formData.time || !formData.maxPlayers) {
      return;
    }

    onCreateGame(formData);
    setFormData({
      sport: "",
      title: "",
      location: "",
      time: "",
      duration: "",
      maxPlayers: "",
      skillLevel: "",
      description: ""
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-northeastern-red" />
            Create New Game
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sport" className="text-sm font-medium">Sport *</Label>
              <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
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

            <div className="space-y-2">
              <Label htmlFor="skillLevel" className="text-sm font-medium">Skill Level *</Label>
              <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange("skillLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Game Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Pickup Basketball @ Cabot Gym"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Location *
            </Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPlayers" className="text-sm font-medium flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Max Players *
              </Label>
              <Input
                id="maxPlayers"
                type="number"
                min="2"
                max="50"
                placeholder="e.g., 10"
                value={formData.maxPlayers}
                onChange={(e) => handleInputChange("maxPlayers", e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Add any additional details about the game..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-northeastern-red hover:bg-northeastern-red-dark"
            >
              Create Game
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameModal;
