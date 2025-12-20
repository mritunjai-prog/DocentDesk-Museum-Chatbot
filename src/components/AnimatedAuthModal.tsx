import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedAuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
}

export const AnimatedAuthModal = ({
  open,
  onClose,
  defaultTab = "signin",
}: AnimatedAuthModalProps) => {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);

  // Sign In form
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up form
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  // Forgot Password
  const [resetEmail, setResetEmail] = useState("");

  // Floating particles animation
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(signInEmail, signInPassword);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpPassword !== signUpConfirmPassword) {
      return;
    }

    setLoading(true);
    try {
      await signUp(signUpEmail, signUpPassword, signUpName);
      onClose();
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      // Error handled in context
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
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl p-0 overflow-hidden border-0 bg-transparent">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Animated Background */}
          <div className="relative hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary via-blue-600 to-purple-600 overflow-hidden">
            {/* Animated particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-white/20 animate-float"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}

            {/* Gradient orbs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 glow-gold animate-bounce-slow">
                <Landmark className="w-12 h-12 text-white" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-white animate-fade-in-up">
                Welcome to DocentDesk
              </h2>
              <p
                className="text-white/90 text-lg animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Your AI-powered museum companion for immersive cultural
                exploration
              </p>
              <div className="flex flex-col gap-4 pt-6">
                {[
                  { icon: Building2, text: "Interactive 3D Virtual Tours" },
                  { icon: Sparkles, text: "AI-Powered Chatbot Guide" },
                  { icon: Landmark, text: "Multilingual Support" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-white/90 animate-slide-in-left"
                    style={{ animationDelay: `${0.4 + i * 0.2}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
            {showForgotPassword ? (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    Reset Password
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your email to receive a password reset link
                  </p>
                </div>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="pl-10 h-12 border-2 focus:border-gold transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform"
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
              <div className="space-y-6">
                <div className="md:hidden flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <Landmark className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in-up">
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    {activeTab === "signin"
                      ? "Welcome Back"
                      : "Join DocentDesk"}
                  </h3>
                  <p className="text-muted-foreground">
                    {activeTab === "signin"
                      ? "Sign in to continue your cultural journey"
                      : "Create an account to start exploring"}
                  </p>
                </div>

                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as "signin" | "signup")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-secondary/50">
                    <TabsTrigger
                      value="signin"
                      className="data-[state=active]:bg-gradient-gold data-[state=active]:text-white transition-all"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-gradient-gold data-[state=active]:text-white transition-all"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="signin"
                    className="space-y-4 mt-6 animate-fade-in"
                  >
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="••••••••"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm text-gold p-0 hover:underline"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
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
                  </TabsContent>

                  <TabsContent
                    value="signup"
                    className="space-y-4 mt-6 animate-fade-in"
                  >
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            value={signUpConfirmPassword}
                            onChange={(e) =>
                              setSignUpConfirmPassword(e.target.value)
                            }
                            className="pl-10 h-12 border-2 focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-gold text-white font-semibold hover:scale-105 transition-transform"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
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
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimatedAuthModal;
