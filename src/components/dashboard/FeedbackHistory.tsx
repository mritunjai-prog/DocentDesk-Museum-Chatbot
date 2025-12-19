import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, Calendar } from "lucide-react";

interface Feedback {
  id: string;
  artifactName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

export function FeedbackHistory() {
  const feedbackList: Feedback[] = [
    {
      id: "FB-001",
      artifactName: "Venus de Milo",
      rating: 5,
      comment:
        "Absolutely stunning! The details are incredible and the AR feature made it feel so real.",
      date: "Dec 16, 2025",
      category: "Sculpture",
    },
    {
      id: "FB-002",
      artifactName: "Greek Sculpture Exhibition",
      rating: 4,
      comment:
        "Very informative tour. Would love to see more interactive elements.",
      date: "Dec 10, 2025",
      category: "Exhibition",
    },
    {
      id: "FB-003",
      artifactName: "Renaissance Workshop",
      rating: 5,
      comment:
        "The workshop was educational and engaging. The instructor was fantastic!",
      date: "Dec 5, 2025",
      category: "Event",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sculpture":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Exhibition":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Event":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-teal-500/20 text-teal-300 border-teal-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            My Feedback ({feedbackList.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <Card
                key={feedback.id}
                className="glass-card hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {feedback.artifactName}
                        </h3>
                        <Badge className={getCategoryColor(feedback.category)}>
                          {feedback.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating
                                ? "text-gold fill-gold"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {feedback.rating}/5
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {feedback.comment}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {feedback.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No feedback yet
              </h3>
              <p className="text-muted-foreground">
                Your feedback helps us improve the museum experience
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
