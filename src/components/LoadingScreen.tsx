import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  duration?: number;
}

const LoadingScreen = ({
  onLoadingComplete,
  duration = 2000,
}: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 800);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, exit: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(222, 47%, 6%) 0%, hsl(222, 47%, 11%) 50%, hsl(222, 47%, 6%) 100%)",
          }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0px 0px", "50px 50px"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: `linear-gradient(hsl(43, 96%, 56%, 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(43, 96%, 56%, 0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `hsl(43, 96%, 56%, ${0.3 + Math.random() * 0.4})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative z-10 text-center space-y-8 px-4">
            {/* 3D Rotating Museum Cube */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="relative w-32 h-32"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: "translateZ(64px)",
                    background: "linear-gradient(135deg, hsl(43, 96%, 56%) 0%, hsl(43, 100%, 70%) 100%)",
                    borderRadius: "12px",
                    boxShadow: "0 0 40px hsl(43, 96%, 56%, 0.5)",
                  }}
                >
                  <svg className="w-16 h-16 text-blue-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.51-3.08 8.71-8 9.92V4.18z" />
                    <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
                  </svg>
                </motion.div>
                <motion.div className="absolute inset-0" style={{ transform: "translateZ(-64px) rotateY(180deg)", background: "linear-gradient(135deg, hsl(174, 72%, 40%) 0%, hsl(174, 60%, 55%) 100%)", borderRadius: "12px" }} />
                <motion.div className="absolute inset-0" style={{ transform: "rotateY(-90deg) translateZ(64px)", background: "linear-gradient(135deg, hsl(43, 90%, 45%) 0%, hsl(43, 96%, 56%) 100%)", borderRadius: "12px" }} />
                <motion.div className="absolute inset-0" style={{ transform: "rotateY(90deg) translateZ(64px)", background: "linear-gradient(135deg, hsl(43, 90%, 45%) 0%, hsl(43, 96%, 56%) 100%)", borderRadius: "12px" }} />
                <motion.div className="absolute inset-0" style={{ transform: "rotateX(90deg) translateZ(64px)", background: "linear-gradient(135deg, hsl(43, 100%, 70%) 0%, hsl(43, 96%, 56%) 100%)", borderRadius: "12px" }} />
                <motion.div className="absolute inset-0" style={{ transform: "rotateX(-90deg) translateZ(64px)", background: "linear-gradient(135deg, hsl(43, 90%, 45%) 0%, hsl(43, 96%, 56%) 100%)", borderRadius: "12px" }} />
              </motion.div>
            </div>

            {/* Animated Title */}
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <motion.h1
                className="text-6xl md:text-7xl font-bold mb-3"
                style={{
                  background: "linear-gradient(135deg, hsl(43, 96%, 56%) 0%, hsl(43, 100%, 70%) 50%, hsl(174, 72%, 40%) 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Playfair Display, serif",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                DocentDesk
              </motion.h1>
              <motion.p className="text-xl md:text-2xl" style={{ color: "hsl(43, 100%, 70%)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Your AI Museum Companion
              </motion.p>
            </motion.div>

            {/* 3D Progress Bar */}
            <motion.div className="relative w-full max-w-md mx-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
              <div className="h-2 rounded-full overflow-hidden relative" style={{ background: "hsl(222, 30%, 18%)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)" }}>
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: "linear-gradient(90deg, hsl(43, 96%, 56%) 0%, hsl(43, 100%, 70%) 50%, hsl(174, 72%, 40%) 100%)", boxShadow: "0 0 20px hsl(43, 96%, 56%, 0.6)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                  />
                </motion.div>
              </div>
              <motion.p className="text-center mt-4 text-sm font-medium" style={{ color: "hsl(43, 100%, 70%)" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                Loading your museum experience...
              </motion.p>
            </motion.div>

            {/* Orbiting Elements */}
            <div className="relative w-48 h-48 mx-auto">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                  style={{ transformOrigin: "0 0" }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: i === 0 ? "hsl(43, 96%, 56%)" : i === 1 ? "hsl(174, 72%, 40%)" : "hsl(43, 100%, 70%)",
                      boxShadow: `0 0 20px ${i === 0 ? "hsl(43, 96%, 56%)" : i === 1 ? "hsl(174, 72%, 40%)" : "hsl(43, 100%, 70%)"}`,
                      transform: `translate(${60 + i * 20}px, 0)`,
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vignette Effect */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
