import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");

      if (!token) {
        toast({
          title: "Authentication Failed",
          description: "No token received from authentication provider.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Fetch user profile with the token
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL ||
          "https://docentdesk-backend-api.vercel.app";

        const response = await fetch(`${backendUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid response from server");
        }

        const user = data.data;

        // Refresh auth context to update UI
        await refreshAuth();

        toast({
          title: "Welcome!",
          description: `Successfully signed in as ${user.name}`,
        });

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error: any) {
        console.error("Authentication callback error:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete authentication.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast, refreshAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
