import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, Clock, MapPin, Mail, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-primary/30">
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Preserving <span className="text-gradient">Ancient Wonders</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DocentDesk Museum is dedicated to bringing the marvels of ancient
              Egyptian civilization to the modern world through cutting-edge
              technology and immersive experiences.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-20 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2020, DocentDesk Museum has become a leading
                  institution in digital archaeology and museum innovation. We
                  believe that ancient history should be accessible to everyone,
                  anywhere in the world.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Through AI-powered guides, 3D virtual tours, and interactive
                  exhibits, we're revolutionizing how people experience and
                  learn about ancient Egyptian civilization.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our collection features carefully curated artifacts spanning
                  over 3,000 years of pharaonic history, from the Old Kingdom
                  through the Ptolemaic period.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566127444979-b3d2b654e3a0?w=800"
                  alt="Museum interior"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    500K+
                  </div>
                  <div className="text-muted-foreground">Annual Visitors</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-gold mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    15+
                  </div>
                  <div className="text-muted-foreground">Awards Won</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <Globe className="w-12 h-12 text-gold mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    180+
                  </div>
                  <div className="text-muted-foreground">Countries Reached</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    3000+
                  </div>
                  <div className="text-muted-foreground">Years Preserved</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 py-20 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">
                Meet Our Experts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our team of world-renowned egyptologists and museum curators
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Mitchell",
                  role: "Chief Curator",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
                  bio: "PhD in Egyptology from Oxford University, 20+ years experience",
                },
                {
                  name: "Prof. Ahmed Hassan",
                  role: "Head of Conservation",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                  bio: "Expert in artifact preservation, former Cairo Museum director",
                },
                {
                  name: "Dr. Emily Chen",
                  role: "Digital Innovation Director",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
                  bio: "Pioneer in AI-guided museum experiences and 3D reconstruction",
                },
              ].map((member) => (
                <Card
                  key={member.name}
                  className="overflow-hidden border-primary/20"
                >
                  <div className="relative h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Visit Info Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">
                  Plan Your Visit
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gold" />
                      Opening Hours
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday - Sunday: 10:00 AM - 8:00 PM</p>
                      <p className="text-sm italic">Closed on major holidays</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold" />
                      Location
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>123 Museum Avenue</p>
                      <p>Art District, Cultural Quarter</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gold" />
                      Contact
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>+1 (555) 123-4567</p>
                      <p>General Inquiries: Mon-Fri 9AM-5PM</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gold" />
                      Email
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>info@docentdesk.museum</p>
                      <p>tours@docentdesk.museum</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default About;
