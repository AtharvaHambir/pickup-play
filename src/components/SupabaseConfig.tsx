
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Database, Key, Globe } from 'lucide-react';

interface SupabaseConfigProps {
  onConfigSave: (config: {
    projectId: string;
    anonKey: string;
    serviceRoleKey?: string;
  }) => void;
}

const SupabaseConfig: React.FC<SupabaseConfigProps> = ({ onConfigSave }) => {
  const [projectId, setProjectId] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [serviceRoleKey, setServiceRoleKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectId && anonKey) {
      onConfigSave({
        projectId,
        anonKey,
        serviceRoleKey: serviceRoleKey || undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Database className="mr-2 h-6 w-6 text-primary" />
            Configure Supabase Project
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your Supabase project details to set up the database
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectId" className="text-sm font-medium flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Project ID *
              </Label>
              <Input
                id="projectId"
                placeholder="e.g., abcdefghijklmnopqrstuvwx"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Find this in your Supabase dashboard URL: https://supabase.com/dashboard/project/[PROJECT_ID]
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="anonKey" className="text-sm font-medium flex items-center">
                <Key className="mr-2 h-4 w-4" />
                Anon Key (Public) *
              </Label>
              <Textarea
                id="anonKey"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Find this in: Project Settings → API → Project API keys → anon public
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceRoleKey" className="text-sm font-medium flex items-center">
                <Key className="mr-2 h-4 w-4" />
                Service Role Key (Optional)
              </Label>
              <Textarea
                id="serviceRoleKey"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={serviceRoleKey}
                onChange={(e) => setServiceRoleKey(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Find this in: Project Settings → API → Project API keys → service_role secret
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">What happens next:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Update your Supabase client configuration</li>
                <li>• Create all necessary database tables</li>
                <li>• Set up Row Level Security policies</li>
                <li>• Insert university data</li>
                <li>• Configure user authentication triggers</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!projectId || !anonKey}
            >
              Configure Project & Set Up Database
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseConfig;
