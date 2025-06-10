
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Home, University } from 'lucide-react';

const NotFound = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const supportedDomains = [
    'mit.edu - Massachusetts Institute of Technology',
    'harvard.edu - Harvard University', 
    'bu.edu - Boston University',
    'northeastern.edu - Northeastern University',
    'umb.edu - University of Massachusetts Boston',
    'umass.edu - University of Massachusetts Amherst',
    'umassd.edu - University of Massachusetts Dartmouth',
    'uml.edu - University of Massachusetts Lowell'
  ];

  const isUnsupportedUniversity = user && !supportedDomains.some(domain => 
    user.email?.includes(domain.split(' -')[0])
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <University className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">
            {isUnsupportedUniversity ? 'University Not Supported' : 'Page Not Found'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isUnsupportedUniversity ? (
            <>
              <p className="text-gray-600">
                Sorry, your university email domain is not currently supported.
              </p>
              <p className="text-sm text-gray-500">
                PickupPlay is currently available for Massachusetts universities only.
              </p>
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Supported Universities:</h4>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  {supportedDomains.map((domain, index) => (
                    <li key={index}>• {domain}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={signOut} variant="outline" className="flex-1">
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600">
                The page you're looking for doesn't exist.
              </p>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => navigate('/')} className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
