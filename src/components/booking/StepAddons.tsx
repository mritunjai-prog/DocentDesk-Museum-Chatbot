import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Camera, Headphones, Coffee, BookOpen } from "lucide-react";

interface StepAddonsProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepAddons({
  bookingData,
  updateBookingData,
  onNext,
  onBack,
}: StepAddonsProps) {
  const addons = [
    {
      id: "audioguide",
      label: "Audio Guide",
      price: 5,
      icon: Headphones,
      description: "Enhanced audio tour with expert commentary",
    },
    {
      id: "photography",
      label: "Photography Pass",
      price: 10,
      icon: Camera,
      description: "Permission to take photos in restricted areas",
    },
    {
      id: "refreshments",
      label: "Refreshments Package",
      price: 15,
      icon: Coffee,
      description: "Complimentary drinks and snacks",
    },
    {
      id: "guidebook",
      label: "Collector's Guidebook",
      price: 20,
      icon: BookOpen,
      description: "Beautifully illustrated souvenir guidebook",
    },
  ];

  const toggleAddon = (addonId: string) => {
    const newAddons = bookingData.addons.includes(addonId)
      ? bookingData.addons.filter((id: string) => id !== addonId)
      : [...bookingData.addons, addonId];
    updateBookingData({ addons: newAddons });
  };

  const totalAddonsPrice = addons
    .filter((addon) => bookingData.addons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Enhance Your Experience
        </h2>
        <p className="text-muted-foreground">
          Add optional services to make your visit more memorable
        </p>
      </div>

      <div className="space-y-4">
        {addons.map((addon) => {
          const Icon = addon.icon;
          const isSelected = bookingData.addons.includes(addon.id);

          return (
            <div
              key={addon.id}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
              onClick={() => toggleAddon(addon.id)}
            >
              <Checkbox
                id={addon.id}
                checked={isSelected}
                onCheckedChange={() => toggleAddon(addon.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-primary" />
                  <Label
                    htmlFor={addon.id}
                    className="text-base font-semibold text-foreground cursor-pointer"
                  >
                    {addon.label}
                  </Label>
                  <span className="text-gold font-semibold ml-auto">
                    +${addon.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {addon.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {totalAddonsPrice > 0 && (
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Add-ons Total</span>
            <span className="text-xl font-bold text-gold">
              +${totalAddonsPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-gold hover:opacity-90 text-primary-foreground glow-gold"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );
}
