import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

interface StepPaymentProps {
  event: any;
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPayment({
  event,
  bookingData,
  updateBookingData,
  onNext,
  onBack,
}: StepPaymentProps) {
  const handleChange = (field: string, value: string) => {
    updateBookingData({
      payment: { ...bookingData.payment, [field]: value },
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const ticketTypes = [
    { type: "adult", label: "Adult", price: event.price },
    { type: "student", label: "Student", price: event.price * 0.8 },
    { type: "senior", label: "Senior", price: event.price * 0.7 },
    { type: "child", label: "Child", price: event.price * 0.5 },
  ];

  const addons = [
    { id: "audioguide", label: "Audio Guide", price: 5 },
    { id: "photography", label: "Photography Pass", price: 10 },
    { id: "refreshments", label: "Refreshments Package", price: 15 },
    { id: "guidebook", label: "Collector's Guidebook", price: 20 },
  ];

  const ticketsTotal = ticketTypes.reduce(
    (sum, ticket) => sum + bookingData.tickets[ticket.type] * ticket.price,
    0
  );

  const addonsTotal = addons
    .filter((addon) => bookingData.addons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  const total = ticketsTotal + addonsTotal;

  const isValid =
    bookingData.payment.cardNumber.replace(/\s/g, "").length === 16 &&
    bookingData.payment.expiry.length === 5 &&
    bookingData.payment.cvv.length === 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Payment Details
        </h2>
        <p className="text-muted-foreground">
          Enter your payment information to complete the booking
        </p>
      </div>

      {/* Order Summary */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 space-y-3">
        <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>

        {Object.entries(bookingData.tickets).map(
          ([type, count]: [string, any]) => {
            if (count > 0) {
              const ticket = ticketTypes.find((t) => t.type === type);
              return (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {count}x {ticket?.label}
                  </span>
                  <span className="font-semibold">
                    ${(count * (ticket?.price || 0)).toFixed(2)}
                  </span>
                </div>
              );
            }
            return null;
          }
        )}

        {bookingData.addons.map((addonId: string) => {
          const addon = addons.find((a) => a.id === addonId);
          return addon ? (
            <div key={addonId} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{addon.label}</span>
              <span className="font-semibold">${addon.price.toFixed(2)}</span>
            </div>
          ) : null;
        })}

        <div className="border-t border-border pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-gold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Card Number *
          </Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={bookingData.payment.cardNumber}
            onChange={(e) =>
              handleChange("cardNumber", formatCardNumber(e.target.value))
            }
            maxLength={19}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date *</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={bookingData.payment.expiry}
              onChange={(e) =>
                handleChange("expiry", formatExpiry(e.target.value))
              }
              maxLength={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              value={bookingData.payment.cvv}
              onChange={(e) =>
                handleChange("cvv", e.target.value.replace(/\D/g, ""))
              }
              maxLength={3}
              required
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
        <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-green-300">
          <strong>Secure Payment:</strong> Your payment information is encrypted
          and secure. This is a demo - no actual charges will be made.
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold"
        >
          Complete Booking
        </Button>
      </div>
    </div>
  );
}
