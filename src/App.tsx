
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient } from './contexts/QueryClient';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Calendar from './pages/Calendar';
import MyGames from './pages/MyGames';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Friends from './pages/Friends';
import Create from './pages/Create';
import Competitions from './pages/Competitions';
import UniversityDashboard from './pages/UniversityDashboard';
import HelpSupport from './pages/HelpSupport';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import LicensingAndSafety from './pages/LicensingAndSafety';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <Router>
          <TooltipProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Toaster />
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                <Route path="/my-games" element={<ProtectedRoute><MyGames /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
                <Route path="/competitions" element={<ProtectedRoute><Competitions /></ProtectedRoute>} />
                <Route path="/university-dashboard" element={<ProtectedRoute><UniversityDashboard /></ProtectedRoute>} />
                <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
                <Route path="/terms-of-use" element={<ProtectedRoute><TermsOfUse /></ProtectedRoute>} />
                <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
                <Route path="/licensing-and-safety" element={<ProtectedRoute><LicensingAndSafety /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TooltipProvider>
        </Router>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
