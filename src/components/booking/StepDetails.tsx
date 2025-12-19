import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

interface StepDetailsProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({
  bookingData,
  updateBookingData,
  onNext,
  onBack,
}: StepDetailsProps) {
  const handleChange = (field: string, value: string) => {
    updateBookingData({
      details: { ...bookingData.details, [field]: value },
    });
  };

  const isValid =
    bookingData.details.name &&
    bookingData.details.email &&
    bookingData.details.phone;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Your Information
        </h2>
        <p className="text-muted-foreground">
          We'll use this information to send your tickets and updates
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={bookingData.details.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={bookingData.details.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Your tickets will be sent to this email
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={bookingData.details.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <p className="text-sm text-blue-300">
          <strong>Note:</strong> Please ensure your contact information is
          correct. We'll send your tickets and important updates to the email
          address provided.
        </p>
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
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
