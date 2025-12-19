import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, Calendar, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface TourSession {
  id: string;
  date: string;
  duration: string;
  artifactsViewed: number;
  totalArtifacts: number;
  completionRate: number;
  floor: number;
  pointsEarned: number;
}

export function MyTours() {
  const tourSessions: TourSession[] = [
    {
      id: "TOUR-001",
      date: "Dec 18, 2025",
      duration: "45 min",
      artifactsViewed: 8,
      totalArtifacts: 8,
      completionRate: 100,
      floor: 1,
      pointsEarned: 120,
    },
    {
      id: "TOUR-002",
      date: "Dec 15, 2025",
      duration: "30 min",
      artifactsViewed: 5,
      totalArtifacts: 8,
      completionRate: 63,
      floor: 2,
      pointsEarned: 75,
    },
    {
      id: "TOUR-003",
      date: "Dec 10, 2025",
      duration: "52 min",
      artifactsViewed: 8,
      totalArtifacts: 8,
      completionRate: 100,
      floor: 1,
      pointsEarned: 150,
    },
  ];

  const totalStats = {
    totalTours: tourSessions.length,
    totalTime: "2h 7min",
    totalArtifacts: tourSessions.reduce(
      (acc, tour) => acc + tour.artifactsViewed,
      0
    ),
    totalPoints: tourSessions.reduce((acc, tour) => acc + tour.pointsEarned, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Tours
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalStats.totalTours}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalStats.totalTime}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Artifacts Viewed
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalStats.totalArtifacts}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Points Earned
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalStats.totalPoints}
                </p>
              </div>
              <Award className="w-8 h-8 text-gold" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tour History */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Tour History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourSessions.length > 0 ? (
            tourSessions.map((tour) => (
              <Card
                key={tour.id}
                className="glass-card hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          Floor {tour.floor} Virtual Tour
                        </h3>
                        {tour.completionRate === 100 && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        <Badge className="bg-gold/20 text-gold border-gold/30">
                          +{tour.pointsEarned} XP
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{tour.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {tour.artifactsViewed}/{tour.totalArtifacts}{" "}
                            Artifacts
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-foreground font-semibold">
                            {tour.completionRate}%
                          </span>
                        </div>
                        <Progress value={tour.completionRate} className="h-2" />
                      </div>
                    </div>

                    {tour.completionRate < 100 && (
                      <Link to="/tour">
                        <Button size="sm" variant="outline">
                          Continue Tour
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No tours yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start your first virtual tour and explore the museum
              </p>
              <Link to="/tour">
                <Button>Start Virtual Tour</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
