import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Play, MessageCircle } from 'lucide-react';
import { Museum3DScene } from './Museum3DScene';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* 3D Background */}
      <Museum3DScene />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/90 pointer-events-none" />
      
      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal rounded-full animate-float-delayed opacity-50" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-gold-light rounded-full animate-float opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-light rounded-full animate-float-delayed opacity-60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up opacity-0 glow-gold">
            <Sparkles className="w-4 h-4 text-gold animate-pulse-slow" />
            <span className="text-sm font-medium text-gold">AI-Powered Museum Experience</span>
          </div>

          {/* Animated Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-200">
            <span className="block">Experience Museums</span>
            <span className="block mt-2">
              <span className="text-gradient-gold animate-shimmer bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_100%]">
                Like Never Before
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0 animation-delay-400">
            Discover masterpieces through immersive 3D tours, guided by our intelligent AI docent. 
            Unlock the stories behind every artifact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-600">
            <Link to="/tour">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-gold group transition-all duration-300 hover:scale-105"
              >
                Start Virtual Tour
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold/50 px-8 py-6 text-lg group transition-all duration-300"
              onClick={() => {
                // Trigger chatbot open
                const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
                chatButton?.click();
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform text-gold" />
              Chat with AI Guide
            </Button>
          </div>

          {/* Watch Preview button */}
          <div className="mt-6 animate-fade-in-up opacity-0 animation-delay-600">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground group"
            >
              <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch Preview
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-in-up opacity-0 animation-delay-800">
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Artifacts</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-teal mb-1 group-hover:scale-110 transition-transform">
                15+
              </div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">AI Guide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
