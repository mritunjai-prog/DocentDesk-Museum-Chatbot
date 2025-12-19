import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ticket,
  Download,
  Calendar,
  MapPin,
  Clock,
  QrCode,
} from "lucide-react";
import { useState } from "react";

interface TicketData {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  quantity: number;
  price: string;
  qrCode: string;
  status: "upcoming" | "past" | "cancelled";
}

export function MyTickets() {
  const [tickets] = useState<TicketData[]>([
    {
      id: "TKT-001",
      eventName: "Renaissance Art Exhibition",
      date: "Dec 25, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "West Wing, Gallery 3",
      ticketType: "VIP Access",
      quantity: 2,
      price: "$45.00",
      qrCode: "QR-CODE-DATA-001",
      status: "upcoming",
    },
    {
      id: "TKT-002",
      eventName: "Ancient Egypt Workshop",
      date: "Dec 28, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Education Center",
      ticketType: "Standard",
      quantity: 1,
      price: "$25.00",
      qrCode: "QR-CODE-DATA-002",
      status: "upcoming",
    },
    {
      id: "TKT-003",
      eventName: "Greek Sculpture Tour",
      date: "Dec 10, 2025",
      time: "3:00 PM - 4:30 PM",
      location: "Main Hall",
      ticketType: "Standard",
      quantity: 1,
      price: "$15.00",
      qrCode: "QR-CODE-DATA-003",
      status: "past",
    },
  ]);

  const upcomingTickets = tickets.filter((t) => t.status === "upcoming");
  const pastTickets = tickets.filter((t) => t.status === "past");

  const TicketCard = ({ ticket }: { ticket: TicketData }) => (
    <Card className="glass-card hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* QR Code Section */}
          <div className="lg:w-40 flex-shrink-0">
            <div className="aspect-square bg-white rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-24 h-24 text-gray-800 mx-auto mb-2" />
                <p className="text-xs text-gray-600">{ticket.id}</p>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {ticket.eventName}
                </h3>
                <Badge
                  className={
                    ticket.ticketType === "VIP Access"
                      ? "bg-gold"
                      : "bg-primary"
                  }
                >
                  {ticket.ticketType}
                </Badge>
              </div>
              <Badge
                variant={ticket.status === "upcoming" ? "default" : "secondary"}
              >
                {ticket.status === "upcoming" ? "Upcoming" : "Past Event"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{ticket.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{ticket.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{ticket.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  {ticket.quantity}{" "}
                  {ticket.quantity === 1 ? "Ticket" : "Tickets"} •{" "}
                  {ticket.price}
                </span>
              </div>
            </div>

            {ticket.status === "upcoming" && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Ticket
                </Button>
                <Button size="sm" variant="outline">
                  Add to Calendar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            My Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingTickets.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Events ({pastTickets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTickets.length > 0 ? (
                upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No upcoming tickets
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Browse our events and book your next visit
                  </p>
                  <Button>Browse Events</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastTickets.length > 0 ? (
                pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No past tickets
                  </h3>
                  <p className="text-muted-foreground">
                    Your ticket history will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
