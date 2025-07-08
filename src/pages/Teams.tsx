import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/hooks/useUniversity';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, LogOut, Users, Crown, ArrowLeft } from 'lucide-react';
import CreateTeamDialog from '@/components/CreateTeamDialog';
import { Link } from 'react-router-dom';
import { getMascotForDomain } from '@/utils/universityMascots';

interface Team {
  id: string;
  name: string;
  description: string | null;
  university_id: string;
  created_by: string;
  members: { user_id: string; role: string }[];
}

interface Member {
  id: string;
  full_name: string;
  email: string;
}

const Teams = () => {
  const { signOut } = useAuth();
  const { university, userProfile } = useUniversity();
  const [createTeamOpen, setCreateTeamOpen] = useState(false);

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];
      
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          members (user_id, role)
        `)
        .eq('university_id', university.id);

      if (error) throw error;
      return data as Team[];
    },
    enabled: !!university?.id
  });

  const { data: teamMembers, isLoading: membersLoading } = useQuery({
    queryKey: ['teamMembers', teams?.map(team => team.id)],
    queryFn: async () => {
      if (!teams?.length) return [];
  
      const teamIds = teams.map(team => team.id);
  
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          user:user_id (full_name, email)
        `)
        .in('team_id', teamIds);
  
      if (error) throw error;
  
      // Structure the data to easily map members to their teams
      const membersByTeam: { [teamId: string]: any[] } = {};
      data.forEach(member => {
        if (!membersByTeam[member.team_id]) {
          membersByTeam[member.team_id] = [];
        }
        membersByTeam[member.team_id].push(member);
      });
  
      return membersByTeam;
    },
    enabled: !!teams?.length,
  });

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Unsupported University</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Sorry, your university email domain is not supported yet.</p>
            <p className="text-sm text-gray-600">
              Contact us to add support for your university!
            </p>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mascot = getMascotForDomain(university.domain);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: university.primary_color }}
              >
                {university.short_name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">PickupPlay</h1>
                  <span className="text-2xl">{mascot}</span>
                </div>
                <p className="text-sm text-gray-600">{university.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/field-schedule" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Fields
                </Link>
              </nav>
              <span className="text-sm text-gray-600">
                {userProfile?.full_name}
              </span>
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Teams at {university.name}
            </h2>
            <p className="text-gray-600">
              Manage and join sports teams at your university.
            </p>
          </div>
          <Button onClick={() => setCreateTeamOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        {/* Teams List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant="secondary">
                      {team.members.length} Members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    {team.description || 'No description provided.'}
                  </p>
                  <div>
                    <h4 className="font-medium mb-2">Members</h4>
                    {membersLoading ? (
                      <p className="text-gray-500 text-sm">Loading members...</p>
                    ) : (
                      <div className="space-y-2">
                        {teamMembers && teamMembers[team.id] ? (
                          teamMembers[team.id].map((member) => (
                            <div key={member.id} className="flex items-center space-x-2">
                              <Crown className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{member.user.full_name}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No members yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 text-lg mb-4">
                No teams created yet.
              </div>
              <Button onClick={() => setCreateTeamOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create the First Team
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Team Dialog */}
      <CreateTeamDialog
        open={createTeamOpen}
        onOpenChange={setCreateTeamOpen}
        university={university}
      />
    </div>
  );
};

export default Teams;
