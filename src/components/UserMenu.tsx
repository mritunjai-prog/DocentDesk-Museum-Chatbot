import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogIn,
  Heart,
  Ticket,
  Settings,
  History,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {
  isAuthenticated?: boolean;
  user?: { name: string; email: string } | null;
  onSignOut?: () => void;
  onSignIn?: () => void;
}

export function UserMenu({
  isAuthenticated = false,
  user = null,
  onSignIn,
}: UserMenuProps) {
  const { signOut } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={onSignIn}
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-card">
        <div className="p-3 border-b border-border">
          <p className="font-medium text-foreground">{user?.name || "Guest"}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dashboard" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            My Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dashboard/tickets" className="flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            My Tickets
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dashboard/favorites" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dashboard/history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Visit History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dashboard/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
