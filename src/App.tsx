import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import "@/i18n";
import Index from "./pages/Index";
import VirtualTour from "./pages/VirtualTour";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Exhibits from "./pages/Exhibits";
import About from "./pages/About";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import AnimatedAuthModal from "@/components/AnimatedAuthModal";

const queryClient = new QueryClient();

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

// Main app routes component
function AppRoutes() {
  const [showLoading, setShowLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  if (showLoading) {
    return (
      <LoadingScreen
        onLoadingComplete={() => setShowLoading(false)}
        duration={2000}
      />
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
              <AnimatedAuthModal
                open={true}
                onClose={() => {
                  localStorage.setItem("docentdesk_user_skipped_login", "true");
                  window.location.href = "/";
                }}
              />
            </div>
          )
        }
      />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/exhibits" element={<Exhibits />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/tour" element={<VirtualTour />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
