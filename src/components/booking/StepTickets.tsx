import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Users } from "lucide-react";

interface StepTicketsProps {
  event: any;
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTickets({
  event,
  bookingData,
  updateBookingData,
  onNext,
}: StepTicketsProps) {
  const ticketTypes = [
    { type: "adult", label: "Adult", price: event.price },
    { type: "student", label: "Student", price: event.price * 0.8 },
    { type: "senior", label: "Senior (65+)", price: event.price * 0.7 },
    { type: "child", label: "Child (5-12)", price: event.price * 0.5 },
  ];

  const updateTicketCount = (type: string, delta: number) => {
    const newCount = Math.max(0, bookingData.tickets[type] + delta);
    updateBookingData({
      tickets: { ...bookingData.tickets, [type]: newCount },
    });
  };

  const totalTickets = Object.values(bookingData.tickets).reduce(
    (sum: number, count: any) => sum + count,
    0
  );
  const totalPrice = ticketTypes.reduce(
    (sum, ticket) => sum + bookingData.tickets[ticket.type] * ticket.price,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Select Tickets
        </h2>
        <p className="text-muted-foreground">
          Choose the number of tickets for each category
        </p>
      </div>

      <div className="space-y-4">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.type}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">
                {ticket.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                ${ticket.price.toFixed(2)} per ticket
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateTicketCount(ticket.type, -1)}
                disabled={bookingData.tickets[ticket.type] === 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-semibold text-lg">
                {bookingData.tickets[ticket.type]}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateTicketCount(ticket.type, 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>Total Tickets</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {String(totalTickets)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            Total Price
          </span>
          <span className="text-3xl font-bold text-gold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={totalTickets === 0}
          className="bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold"
        >
          Continue to Add-ons
        </Button>
      </div>
    </div>
  );
}
