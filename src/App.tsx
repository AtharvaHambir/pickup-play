
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import MyGames from "./pages/MyGames";
import Calendar from "./pages/Calendar";
import Competitions from "./pages/Competitions";
import UniversityDashboard from "./pages/UniversityDashboard";
import Setup from "./pages/Setup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/setup" element={<Setup />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
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
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="/competitions" element={
                <ProtectedRoute>
                  <Competitions />
                </ProtectedRoute>
              } />
              <Route path="/university" element={
                <ProtectedRoute>
                  <UniversityDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
