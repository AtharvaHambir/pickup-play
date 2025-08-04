import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import UniversityDashboard from "@/pages/UniversityDashboard";
import Calendar from "@/pages/Calendar";
import Competitions from "@/pages/Competitions";
import Profile from "@/pages/Profile";
import Create from "@/pages/Create";
import MyGames from "@/pages/MyGames";
import Settings from "@/pages/Settings";
import Friends from "@/pages/Friends";
import HelpSupport from "@/pages/HelpSupport";
import TermsOfUse from "@/pages/TermsOfUse";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LicensingAndSafety from "@/pages/LicensingAndSafety";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen w-full overflow-x-hidden">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <UniversityDashboard />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              } />
              <Route path="/my-games" element={
                <ProtectedRoute>
                  <MyGames />
                </ProtectedRoute>
              } />
              <Route path="/compete" element={
                <ProtectedRoute>
                  <Competitions />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/friends" element={
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
              } />
              <Route path="/help-support" element={
                <ProtectedRoute>
                  <HelpSupport />
                </ProtectedRoute>
              } />
              <Route path="/terms-of-use" element={
                <ProtectedRoute>
                  <TermsOfUse />
                </ProtectedRoute>
              } />
              <Route path="/privacy-policy" element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              } />
              <Route path="/licensing-and-safety" element={
                <ProtectedRoute>
                  <LicensingAndSafety />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
