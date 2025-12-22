import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Chrome,
  Landmark,
  Sparkles,
  Building2,
  Home,
} from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(signInEmail, signInPassword);
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpPassword !== signUpConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signUp(signUpEmail, signUpPassword, signUpName);
      navigate("/");
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(resetEmail);
      setShowForgotPassword(false);
      setResetEmail("");
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-950/10 to-purple-950/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            DocentDesk
          </span>
        </Link>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="gap-2 border-2 hover:border-gold hover:text-gold transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6 items-stretch">
          {/* Left Side - 3D Museum Card with Info */}
          <div className="relative hidden md:flex items-center justify-center animate-fade-in">
            <div className="relative perspective-1000 w-full">
              <div className="w-full h-[520px] bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-3xl shadow-2xl transform hover:rotate-y-6 transition-transform duration-700 p-6 flex flex-col justify-between text-white relative overflow-hidden group">
                {/* Decorative Gradient Orbs */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />

                {/* Top Section - Icon */}
                <div className="flex justify-center pt-4">
                  <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl animate-float group-hover:scale-110 transition-transform duration-500">
                    <Landmark className="w-12 h-12 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Middle Section - Text */}
                <div className="text-center space-y-3 relative z-10 px-4">
                  <h1 className="font-serif text-3xl font-bold animate-fade-in-up leading-tight">
                    Welcome to DocentDesk
                  </h1>
                  <p className="text-base text-white/90 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
                    Your AI-powered museum companion for immersive cultural exploration
                  </p>
                </div>

                {/* Bottom Section - Features */}
                <div className="grid gap-2.5 pb-4 relative z-10">
                  {[
                    { icon: Building2, text: "Interactive 3D Virtual Tours", delay: "0.4s" },
                    { icon: Sparkles, text: "AI-Powered Chatbot Guide", delay: "0.6s" },
                    { icon: Landmark, text: "Multilingual Support", delay: "0.8s" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/95 animate-slide-in-left group/item px-4"
                      style={{ animationDelay: item.delay }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0 group-hover/item:bg-white/20 transition-all">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full animate-fade-in-up flex items-center" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-6 w-full h-[520px] flex flex-col">
              {showForgotPassword ? (
                <div className="space-y-5 flex-1 flex flex-col justify-center">
                  <div className="space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-3">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Reset Password
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your email to receive a password reset link
                    </p>
                  </div>
                  <form onSubmit={handleResetPassword} className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email" className="text-sm">Email Address</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="pl-11 h-12 border-2 focus:border-gold transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full h-12"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Back to Sign In
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Tab Switcher */}
                  <div className="flex gap-2 p-1 bg-muted/30 rounded-xl flex-shrink-0">
                    <button
                      onClick={() => setActiveTab("signin")}
                      className={`flex-1 py-2.5 px-5 rounded-lg font-semibold text-sm transition-all ${
                        activeTab === "signin"
                          ? "bg-gradient-gold text-white shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setActiveTab("signup")}
                      className={`flex-1 py-2.5 px-5 rounded-lg font-semibold text-sm transition-all ${
                        activeTab === "signup"
                          ? "bg-gradient-gold text-white shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Scrollable Form Container with Fixed Height */}
                  <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    {activeTab === "signin" ? (
                      <div className="space-y-5 animate-fade-in pt-3">
                      <div className="space-y-2 text-center">
                        <h2 className="font-serif text-2xl font-bold text-foreground">
                          Welcome Back
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Sign in to continue your journey
                        </p>
                      </div>

                      <form onSubmit={handleSignIn} className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className="text-sm">Email</Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signin-email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={signInEmail}
                              onChange={(e) => setSignInEmail(e.target.value)}
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="text-sm">Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signin-password"
                              type="password"
                              placeholder="••••••••"
                              value={signInPassword}
                              onChange={(e) => setSignInPassword(e.target.value)}
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="link"
                          className="text-gold p-0 hover:underline text-sm"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot password?
                        </Button>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Sign In"
                          )}
                        </Button>

                        <div className="relative py-3">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-card px-3 text-xs text-muted-foreground">
                              or continue with
                            </span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 border-2 hover:border-gold hover:bg-gold/5 transition-all"
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                        >
                          <Chrome className="w-5 h-5 mr-2" />
                          Sign in with Google
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-5 animate-fade-in pt-3">
                      <div className="space-y-2 text-center">
                        <h2 className="font-serif text-2xl font-bold text-foreground">
                          Join DocentDesk
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Create an account to explore
                        </p>
                      </div>

                      <form onSubmit={handleSignUp} className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-sm">Full Name</Label>
                          <div className="relative group">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="John Doe"
                              value={signUpName}
                              onChange={(e) => setSignUpName(e.target.value)}
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-sm">Email</Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={signUpEmail}
                              onChange={(e) => setSignUpEmail(e.target.value)}
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-sm">Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="••••••••"
                              value={signUpPassword}
                              onChange={(e) => setSignUpPassword(e.target.value)}
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm" className="text-sm">Confirm Password</Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                            <Input
                              id="signup-confirm"
                              type="password"
                              placeholder="••••••••"
                              value={signUpConfirmPassword}
                              onChange={(e) =>
                                setSignUpConfirmPassword(e.target.value)
                              }
                              className="pl-11 h-12 border-2 focus:border-gold transition-all"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Create Account"
                          )}
                        </Button>

                        <div className="relative py-3">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-card px-3 text-xs text-muted-foreground">
                              or continue with
                            </span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 border-2 hover:border-gold hover:bg-gold/5 transition-all"
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                        >
                          <Chrome className="w-5 h-5 mr-2" />
                          Sign up with Google
                        </Button>
                      </form>
                    </div>
                  )}
                  </div>

                  {/* Guest Button - Fixed at bottom */}
                  <div className="text-center pt-3 border-t border-border flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground text-sm"
                      onClick={() => navigate("/")}
                    >
                      Continue as Guest →
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
