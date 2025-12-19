import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Calendar, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";

interface StepConfirmationProps {
  event: any;
  bookingData: any;
  onClose: () => void;
}

export function StepConfirmation({
  event,
  bookingData,
  onClose,
}: StepConfirmationProps) {
  const bookingId = `BK-${Date.now().toString().slice(-8)}`;
  const qrData = JSON.stringify({
    bookingId,
    event: event.title,
    date: format(event.date, "yyyy-MM-dd"),
    name: bookingData.details.name,
  });

  const totalTickets = Object.values(bookingData.tickets).reduce(
    (sum: number, count: any) => sum + count,
    0
  );

  return (
    <div className="space-y-8 text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground">
          Your tickets have been sent to {bookingData.details.email}
        </p>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center p-8 rounded-lg bg-white">
        <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
        <p className="text-gray-700 font-semibold mt-4">
          Booking ID: {bookingId}
        </p>
      </div>

      {/* Booking Details */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-left space-y-3">
        <h3 className="font-semibold text-foreground text-center mb-4">
          Booking Summary
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Event</span>
            <span className="font-semibold text-foreground">{event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-semibold text-foreground">
              {format(event.date, "MMM dd, yyyy")} • {event.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-semibold text-foreground">
              {event.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tickets</span>
            <span className="font-semibold text-foreground">
              {String(totalTickets)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guest Name</span>
            <span className="font-semibold text-foreground">
              {bookingData.details.name}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Ticket
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Add to Calendar
        </Button>
        <Button variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Email Ticket
        </Button>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-left">
        <h4 className="font-semibold text-blue-300 mb-2">
          Important Information
        </h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Please arrive 15 minutes before your scheduled time</li>
          <li>• Present this QR code or your booking ID at the entrance</li>
          <li>• Your confirmation email contains additional details</li>
          <li>• Contact us if you need to modify your booking</li>
        </ul>
      </div>

      <Button
        onClick={onClose}
        className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold"
      >
        Return to Events
      </Button>
    </div>
  );
}
