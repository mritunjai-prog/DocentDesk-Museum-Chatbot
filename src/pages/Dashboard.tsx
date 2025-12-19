import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { MyTickets } from "@/components/dashboard/MyTickets";
import { MyCollection } from "@/components/dashboard/MyCollection";
import { MyTours } from "@/components/dashboard/MyTours";
import { FeedbackHistory } from "@/components/dashboard/FeedbackHistory";
import { Settings } from "@/components/dashboard/Settings";
import {
  LayoutDashboard,
  Ticket,
  Heart,
  MapPin,
  MessageSquare,
  Settings2,
} from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get active tab from URL hash or default to overview
  const activeTab = location.hash ? location.hash.slice(1) : "overview";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleTabChange = (value: string) => {
    navigate(`#${value}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your museum experience, tickets, and preferences
            </p>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="glass-card p-1 mb-8 flex-wrap h-auto gap-2">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="gap-2">
                <Ticket className="w-4 h-4" />
                <span className="hidden sm:inline">My Tickets</span>
              </TabsTrigger>
              <TabsTrigger value="collection" className="gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Collection</span>
              </TabsTrigger>
              <TabsTrigger value="tours" className="gap-2">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">My Tours</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings2 className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="tickets">
              <MyTickets />
            </TabsContent>

            <TabsContent value="collection">
              <MyCollection />
            </TabsContent>

            <TabsContent value="tours">
              <MyTours />
            </TabsContent>

            <TabsContent value="feedback">
              <FeedbackHistory />
            </TabsContent>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
