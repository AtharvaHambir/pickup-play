
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupabaseConfig from '@/components/SupabaseConfig';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Setup: React.FC = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConfigSave = async (config: {
    projectId: string;
    anonKey: string;
    serviceRoleKey?: string;
  }) => {
    setIsLoading(true);
    
    try {
      // Here we would normally update the Supabase client configuration
      // For now, we'll just show the SQL that needs to be run
      console.log('Supabase Configuration:', {
        url: `https://${config.projectId}.supabase.co`,
        anonKey: config.anonKey,
        serviceRoleKey: config.serviceRoleKey
      });

      setIsConfigured(true);
      
      toast({
        title: "Configuration Saved",
        description: "Now run the SQL queries in your Supabase SQL editor",
      });
      
    } catch (error) {
      toast({
        title: "Configuration Error",
        description: "Failed to save configuration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Configuration Complete!</h2>
              <p className="text-muted-foreground">
                Your Supabase project details have been saved. Now you need to run the database setup queries.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-2">Next Steps:</h3>
                  <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                    <li>Go to your Supabase dashboard</li>
                    <li>Navigate to the SQL Editor</li>
                    <li>Copy and run the database setup queries that will be provided</li>
                    <li>Return here to start using PickupPlay</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue to App
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SupabaseConfig onConfigSave={handleConfigSave} />;
};

export default Setup;
