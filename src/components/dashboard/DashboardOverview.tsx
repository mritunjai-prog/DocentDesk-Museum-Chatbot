import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  Ticket,
  Heart,
  MapPin,
  Trophy,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardOverview() {
  const { user, profile } = useAuth();

  const stats = [
    {
      label: "Tickets Purchased",
      value: "3",
      icon: Ticket,
      color: "text-blue-500",
    },
    {
      label: "Artifacts Saved",
      value: "12",
      icon: Heart,
      color: "text-red-500",
    },
    {
      label: "Tours Completed",
      value: "5",
      icon: MapPin,
      color: "text-green-500",
    },
    {
      label: "Achievement Points",
      value: profile?.points || "0",
      icon: Trophy,
      color: "text-gold",
    },
  ];

  const upcomingEvents = [
    {
      title: "Renaissance Art Exhibition",
      date: "Dec 25, 2025",
      time: "2:00 PM",
      tickets: 2,
    },
    {
      title: "Ancient Egypt Workshop",
      date: "Dec 28, 2025",
      time: "10:00 AM",
      tickets: 1,
    },
  ];

  const recentActivity = [
    {
      action: "Completed Virtual Tour",
      description: "Ancient Civilizations Gallery",
      time: "2 hours ago",
    },
    {
      action: "Added to Collection",
      description: "Venus de Milo",
      time: "1 day ago",
    },
    {
      action: "Left Feedback",
      description: "Greek Sculpture Exhibition",
      time: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Welcome back,{" "}
                {profile?.full_name || user?.email?.split("@")[0] || "Guest"}!
                👋
              </h2>
              <p className="text-muted-foreground">
                You're currently at{" "}
                <Badge className="ml-2 bg-gold text-primary-foreground">
                  Level {profile?.level || 1}
                </Badge>
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress to Level {(profile?.level || 1) + 1}
                  </span>
                  <span className="text-foreground font-semibold">
                    {profile?.points || 0}/1000 XP
                  </span>
                </div>
                <Progress value={(profile?.points || 0) / 10} className="h-2" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/tour">
                <Button className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold">
                  <MapPin className="w-4 h-4 mr-2" />
                  Start Virtual Tour
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="glass-card hover:border-primary/30 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {event.tickets}{" "}
                      {event.tickets === 1 ? "Ticket" : "Tickets"}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming events</p>
                <Link to="/events">
                  <Button variant="link" className="mt-2">
                    Browse Events
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
