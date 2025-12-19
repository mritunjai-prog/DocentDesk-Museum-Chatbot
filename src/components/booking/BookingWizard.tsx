import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { StepTickets } from "./StepTickets";
import { StepAddons } from "./StepAddons";
import { StepDetails } from "./StepDetails";
import { StepPayment } from "./StepPayment";
import { StepConfirmation } from "./StepConfirmation";

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

interface BookingData {
  tickets: { adult: number; student: number; senior: number; child: number };
  addons: string[];
  details: { name: string; email: string; phone: string };
  payment: { cardNumber: string; expiry: string; cvv: string };
}

interface BookingWizardProps {
  event: Event;
  onClose: () => void;
}

export function BookingWizard({ event, onClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    tickets: { adult: 1, student: 0, senior: 0, child: 0 },
    addons: [],
    details: { name: "", email: "", phone: "" },
    payment: { cardNumber: "", expiry: "", cvv: "" },
  });

  const steps = [
    { number: 1, title: "Select Tickets", component: StepTickets },
    { number: 2, title: "Add-ons", component: StepAddons },
    { number: 3, title: "Your Details", component: StepDetails },
    { number: 4, title: "Payment", component: StepPayment },
    { number: 5, title: "Confirmation", component: StepConfirmation },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container px-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Book Your Experience
            </h1>
            <p className="text-muted-foreground">{event.title}</p>
          </div>

          {/* Progress Stepper */}
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium hidden sm:block ${
                          currentStep >= step.number
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 transition-all duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500"
                            : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress
                value={(currentStep / steps.length) * 100}
                className="h-2"
              />
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="glass-card mb-6">
            <CardContent className="p-8">
              <CurrentStepComponent
                event={event}
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={handleNext}
                onBack={handleBack}
                onClose={onClose}
                currentStep={currentStep}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
