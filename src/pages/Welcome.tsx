import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Zap, Globe, Shield, Sparkles } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSkipping, setIsSkipping] = useState(false);

  const handleSkipLogin = () => {
    setIsSkipping(true);
    localStorage.setItem("docentdesk_user_skipped_login", "true");
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Guidance",
      description: "Intelligent chatbot with voice input/output in 8 languages",
    },
    {
      icon: Globe,
      title: "Global Experience",
      description: "Explore Egyptian artifacts with 3D virtual tours",
    },
    {
      icon: Zap,
      title: "Smart Bookings",
      description: "Book museum events with unique QR code tickets",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Google OAuth + JWT authentication with Supabase",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"
    >
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="px-6 py-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif">
            🏛️ DocentDesk
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your AI-Powered Museum Companion
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        >
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* 3D Cube Animation */}
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-32 h-32 mx-auto"
            >
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🎨</span>
              </div>
            </motion.div>

            {/* Main Description */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white mb-4">
                Experience Culture Reimagined
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Explore ancient Egyptian artifacts with immersive 3D virtual
                tours, intelligent AI chatbot assistance, and seamless event
                bookings. All in 8 languages with premium accessibility.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-blue-100">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleSignIn}
                className="px-8 py-6 text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-slate-950 font-bold rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Sign In / Register
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleSkipLogin}
                disabled={isSkipping}
                variant="outline"
                className="px-8 py-6 text-lg border-2 border-blue-300 text-blue-100 hover:bg-blue-400/10 font-semibold rounded-lg transition-all duration-300"
              >
                {isSkipping ? "Loading..." : "Continue as Guest"}
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-sm text-blue-200 mb-4">
                Trusted by Cultural Institutions
              </p>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">12</div>
                  <div className="text-xs text-blue-100">Artifacts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">8</div>
                  <div className="text-xs text-blue-100">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">100%</div>
                  <div className="text-xs text-blue-100">Accessible</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="px-6 py-6 text-center border-t border-white/10"
        >
          <p className="text-sm text-blue-200">
            Version 1.0.0 • Powered by React, AI & Supabase
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
