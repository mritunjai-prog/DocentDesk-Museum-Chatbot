import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EventImage } from "@/components/EventImage";
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BookingWizard } from "@/components/booking/BookingWizard";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  price: number;
  availableSeats: number;
  image: string;
  duration: string;
}

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showBooking, setShowBooking] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: "1",
      title: "Renaissance Art Exhibition",
      description:
        "Explore masterpieces from the Renaissance period featuring works by Leonardo da Vinci, Michelangelo, and Raphael.",
      date: new Date("2025-12-25"),
      time: "2:00 PM",
      location: "West Wing, Gallery 3",
      category: "Exhibition",
      price: 25,
      availableSeats: 50,
      image:
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&auto=format&fit=crop",
      duration: "3 hours",
    },
    {
      id: "2",
      title: "Ancient Egypt Workshop",
      description:
        "Interactive workshop on ancient Egyptian culture, hieroglyphics, and mummification processes.",
      date: new Date("2025-12-28"),
      time: "10:00 AM",
      location: "Education Center",
      category: "Workshop",
      price: 35,
      availableSeats: 30,
      image:
        "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&auto=format&fit=crop",
      duration: "2 hours",
    },
    {
      id: "3",
      title: "Greek Mythology Lecture",
      description:
        "Fascinating lecture on Greek gods, heroes, and myths illustrated through our artifact collection.",
      date: new Date("2025-12-30"),
      time: "6:00 PM",
      location: "Auditorium",
      category: "Lecture",
      price: 15,
      availableSeats: 100,
      image:
        "https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&auto=format&fit=crop",
      duration: "90 minutes",
    },
    {
      id: "4",
      title: "Modern Art Symposium",
      description:
        "Panel discussion with contemporary artists exploring the intersection of tradition and innovation.",
      date: new Date("2026-01-05"),
      time: "4:00 PM",
      location: "Conference Hall",
      category: "Symposium",
      price: 20,
      availableSeats: 75,
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop",
      duration: "2.5 hours",
    },
    {
      id: "5",
      title: "Family Discovery Day",
      description:
        "Interactive activities and guided tours designed for families with children ages 5-12.",
      date: new Date("2026-01-10"),
      time: "11:00 AM",
      location: "Main Galleries",
      category: "Family",
      price: 10,
      availableSeats: 60,
      image:
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&auto=format&fit=crop",
      duration: "4 hours",
    },
    {
      id: "6",
      title: "Photography Exhibition Opening",
      description:
        'Opening reception for "Captured History" - stunning photographs of archaeological discoveries.',
      date: new Date("2026-01-15"),
      time: "7:00 PM",
      location: "Photography Gallery",
      category: "Exhibition",
      price: 30,
      availableSeats: 80,
      image:
        "https://images.unsplash.com/photo-1554009186-2bb4d7b29fe0?w=800&auto=format&fit=crop",
      duration: "2 hours",
    },
  ];

  const categories = [
    "all",
    "Exhibition",
    "Workshop",
    "Lecture",
    "Symposium",
    "Family",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesDate =
      !selectedDate ||
      format(event.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    return matchesSearch && matchesCategory && matchesDate;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Exhibition":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Workshop":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Lecture":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Symposium":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Family":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      default:
        return "bg-teal-500/20 text-teal-300 border-teal-500/30";
    }
  };

  const handleBookEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowBooking(true);
  };

  if (showBooking && selectedEvent) {
    return (
      <BookingWizard
        event={selectedEvent}
        onClose={() => {
          setShowBooking(false);
          setSelectedEvent(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Events & Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for exhibitions, workshops, lectures, and special events
            </p>
          </div>

          {/* Filters */}
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Date Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                    {selectedDate && (
                      <div className="p-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDate(undefined)}
                          className="w-full"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="glass-card hover:border-primary/30 transition-all duration-500 group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: "perspective(1000px)",
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateY(5deg) rotateX(-2deg) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
                  }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                      <EventImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 pointer-events-none" />
                    <Badge
                      className={`absolute top-3 right-3 ${getCategoryColor(
                        event.category
                      )}`}
                    >
                      {event.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(event.date, "MMMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {event.time} • {event.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.availableSeats} seats available</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-gold" />
                        <span className="text-2xl font-bold text-foreground">
                          {event.price}
                        </span>
                      </div>
                      <Button
                        className="bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold"
                        onClick={() => handleBookEvent(event)}
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedDate(undefined);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
