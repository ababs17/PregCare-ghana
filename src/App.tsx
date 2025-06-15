import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CycleTracking from "./pages/CycleTracking";
import HealthMonitoring from "./pages/HealthMonitoring";
import PregnancyCare from "./pages/PregnancyCare";
import EmergencyContacts from "./pages/EmergencyContacts";
import Communities from "./pages/Communities";
import NotFound from "./pages/NotFound";
import LoadingManager from "@/components/LoadingManager";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cycle-tracking" element={<CycleTracking />} />
              <Route path="/health-monitoring" element={<HealthMonitoring />} />
              <Route path="/pregnancy-care" element={<PregnancyCare />} />
              <Route path="/emergency-contacts" element={<EmergencyContacts />} />
              <Route path="/communities" element={<Communities />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
