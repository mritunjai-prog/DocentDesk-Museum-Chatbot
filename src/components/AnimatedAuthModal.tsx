import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [resetEmail, setResetEmail] = useState("");

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
      onClose();
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
      onClose();
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl p-0 overflow-hidden border-0 bg-transparent">
        <div className="grid md:grid-cols-2 min-h-[650px]">
          {/* Left Side - Animated Background */}
          <div className="relative hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary via-blue-600 to-purple-600 overflow-hidden">
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

            <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

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

          {/* Right Side - Auth Cards and Guest Option */}
          <div className="bg-background p-6 md:p-8 flex flex-col justify-center overflow-y-auto max-h-[650px]">
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
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Sign In Card */}
                  <div className="md:col-span-1 space-y-4 bg-card/50 backdrop-blur border border-border/50 rounded-2xl pt-14 px-6 pb-6 animate-fade-in-up">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Welcome Back
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sign in to continue your journey
                      </p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="signin-email" className="text-sm">
                          Email
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="signin-password" className="text-sm">
                          Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="••••••••"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="link"
                        className="text-xs text-gold p-0 hover:underline"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>

                      <Button
                        type="submit"
                        className="w-full h-10 bg-gradient-gold text-white font-semibold text-sm hover:scale-105 transition-transform"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Sign In"
                        )}
                      </Button>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border/30" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card/50 px-1 text-xs text-muted-foreground">
                            or
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 border-2 text-sm hover:border-gold hover:bg-gold/5 transition-all"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <Chrome className="w-4 h-4 mr-2" />
                        Google
                      </Button>
                    </form>
                  </div>

                  {/* Sign Up Card */}
                  <div
                    className="md:col-span-1 space-y-4 bg-card/30 backdrop-blur border border-border/30 rounded-2xl pt-14 px-6 pb-6 animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        Join DocentDesk
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Create an account to explore
                      </p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="signup-name" className="text-sm">
                          Full Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="signup-email" className="text-sm">
                          Email
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="signup-password" className="text-sm">
                          Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="signup-confirm" className="text-sm">
                          Confirm Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                          <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            value={signUpConfirmPassword}
                            onChange={(e) =>
                              setSignUpConfirmPassword(e.target.value)
                            }
                            className="pl-9 h-10 border-2 text-sm focus:border-gold transition-all"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-10 bg-gradient-gold text-white font-semibold text-sm hover:scale-105 transition-transform"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border/30" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card/30 px-1 text-xs text-muted-foreground">
                            or
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 border-2 text-sm hover:border-gold hover:bg-gold/5 transition-all"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <Chrome className="w-4 h-4 mr-2" />
                        Google
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/30 text-center">
                  <p className="text-xs text-muted-foreground mb-3">
                    Want to explore first?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-2 text-sm hover:border-teal-500 hover:text-teal-500 hover:bg-teal-500/5 transition-all"
                    onClick={() => onClose()}
                  >
                    Continue as Guest
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimatedAuthModal;
