import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import { Welcome } from "@/pages/Welcome";
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
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Check if user has visited before or skipped login
    const hasVisited = localStorage.getItem("docentdesk_visited");
    const skippedLogin = localStorage.getItem("docentdesk_user_skipped_login");

    if (!hasVisited && !isAuthenticated && !skippedLogin) {
      setShowWelcome(true);
      localStorage.setItem("docentdesk_visited", "true");
    }
  }, [isAuthenticated]);

  if (showLoading) {
    return (
      <LoadingScreen
        onLoadingComplete={() => setShowLoading(false)}
        duration={2000}
      />
    );
  }

  // Show welcome page for first-time users
  if (showWelcome && !isAuthenticated) {
    return <Welcome />;
  }

  return (
    <>
      {showAuthModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          />
          <div className="flex items-center justify-center min-h-screen">
            <AnimatedAuthModal onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}

      <Routes>
        {/* Welcome & Auth Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
                <AnimatedAuthModal
                  onClose={() => {
                    localStorage.setItem(
                      "docentdesk_user_skipped_login",
                      "true"
                    );
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
    </>
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
