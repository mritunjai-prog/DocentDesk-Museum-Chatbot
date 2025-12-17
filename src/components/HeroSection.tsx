import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Museum3DScene } from './Museum3DScene';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* 3D Background */}
      <Museum3DScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/90 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up opacity-0">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">AI-Powered Museum Experience</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-200">
            Experience Museums
            <span className="block mt-2">
              <span className="text-gradient-gold">Like Never Before</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0 animation-delay-400">
            Discover masterpieces through immersive 3D tours, guided by our intelligent AI docent. 
            Unlock the stories behind every artifact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-600">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-gold group"
            >
              Start Virtual Tour
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gold/30 text-foreground hover:bg-gold/10 px-8 py-6 text-lg group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Preview
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-in-up opacity-0 animation-delay-800">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Artifacts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-teal mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1">24/7</div>
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
