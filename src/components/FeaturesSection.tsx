import { Sparkles, Globe, Ticket, Accessibility, Clock, MapPin } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Guide',
    description: 'Get personalized tours and answers from our intelligent museum docent.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Globe,
    title: '15+ Languages',
    description: 'Experience the museum in your preferred language with instant translation.',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
  {
    icon: Ticket,
    title: 'Easy Booking',
    description: 'Skip the lines with digital tickets and QR code entry.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Accessibility,
    title: 'Fully Accessible',
    description: 'Designed for everyone with comprehensive accessibility features.',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
  {
    icon: Clock,
    title: 'Real-Time Updates',
    description: 'See live crowd levels and best times to visit popular exhibits.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: MapPin,
    title: 'Indoor Navigation',
    description: 'Never get lost with interactive maps and wayfinding assistance.',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-deep-blue">
      <div className="container px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-gold text-sm font-medium mb-4">
            Why DocentDesk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            The Future of Museum Visits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining cutting-edge AI technology with centuries of art and history.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
