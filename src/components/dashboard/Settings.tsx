import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Settings2, User, Bell, Shield, Globe } from "lucide-react";

export function Settings() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: profile?.full_name || "",
    email: user?.email || "",
    bio: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    tourReminders: true,
    eventUpdates: true,
    newsletter: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData({ ...profileData, fullName: e.target.value })
              }
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              placeholder="Tell us about yourself"
            />
          </div>

          <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Manage how you receive updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications" className="text-base">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, emailNotifications: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="tourReminders" className="text-base">
                Tour Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Get reminders before virtual tours
              </p>
            </div>
            <Switch
              id="tourReminders"
              checked={preferences.tourReminders}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, tourReminders: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="eventUpdates" className="text-base">
                Event Updates
              </Label>
              <p className="text-sm text-muted-foreground">
                Stay updated on upcoming events
              </p>
            </div>
            <Switch
              id="eventUpdates"
              checked={preferences.eventUpdates}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, eventUpdates: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter" className="text-base">
                Newsletter
              </Label>
              <p className="text-sm text-muted-foreground">
                Subscribe to monthly newsletter
              </p>
            </div>
            <Switch
              id="newsletter"
              checked={preferences.newsletter}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, newsletter: checked })
              }
            />
          </div>

          <Button onClick={handleSavePreferences} className="w-full sm:w-auto">
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <select
              id="language"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <Button className="w-full sm:w-auto">Save Settings</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border border-destructive/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-destructive" />
            Account Security
          </CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Change Password
          </Button>
          <Separator />
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
