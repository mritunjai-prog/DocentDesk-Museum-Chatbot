import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  full_name: string | null;
  points: number;
  level: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for backend JWT token first
    checkBackendAuth();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!user) {
        // Only use Supabase if no backend user exists
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          loadProfile(session.user.id);
        }
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!localStorage.getItem("token")) {
        // Only use Supabase if no backend token
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      // TODO: Uncomment after running database migration
      // const { data, error } = await supabase
      //   .from('user_profiles')
      //   .select('id, full_name, points, level')
      //   .eq('id', userId)
      //   .single();

      // if (error && error.code !== 'PGRST116') {
      //   console.error('Error loading profile:', error);
      // }

      // if (data) {
      //   setProfile(data);
      // }

      // Mock profile data for now
      setProfile({
        id: userId,
        full_name: null,
        points: 0,
        level: 1,
      });
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const checkBackendAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL ||
        "https://docentdesk-backend-api.vercel.app";

      const response = await fetch(`${backendUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Convert backend user to Supabase User format
          const backendUser = data.data;
          const mockUser: any = {
            id: backendUser._id,
            email: backendUser.email,
            user_metadata: {
              name: backendUser.name,
              avatar_url: backendUser.avatar,
            },
            app_metadata: {},
            aud: "authenticated",
            created_at: backendUser.createdAt,
          };
          setUser(mockUser);
          setProfile({
            id: backendUser._id,
            full_name: backendUser.name,
            points: backendUser.gamification?.points || 0,
            level: backendUser.gamification?.level || 1,
          });
        }
      } else {
        // Token invalid, remove it
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error checking backend auth:", error);
      localStorage.removeItem("token");
    }
  };

  const refreshAuth = async () => {
    await checkBackendAuth();
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Welcome to DocentDesk!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Redirect to backend Google OAuth endpoint
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL ||
        "https://docentdesk-backend-api.vercel.app";
      window.location.href = `${backendUrl}/api/auth/google`;
    } catch (error: any) {
      toast({
        title: "Google Sign In Failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clear backend token
      localStorage.removeItem("token");

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear user state
      setUser(null);
      setProfile(null);

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    refreshAuth,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
