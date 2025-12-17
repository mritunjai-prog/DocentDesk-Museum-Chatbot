import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Landmark, User, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Virtual Tours', href: '#tours' },
  { label: 'Exhibits', href: '#exhibits' },
  { label: 'Events', href: '#events' },
  { label: 'About', href: '#about' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="glass rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center glow-gold group-hover:scale-110 transition-transform duration-300">
                  <Landmark className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-foreground">DocentDesk</span>
                <span className="hidden sm:block text-xs text-muted-foreground tracking-wider">MUSEUM AI</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-gold group-hover:w-3/4 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-muted-foreground hover:text-foreground"
              >
                <User className="w-5 h-5" />
              </Button>

              <Button className="hidden sm:flex bg-gradient-gold hover:opacity-90 text-primary-foreground font-medium glow-gold">
                Get Tickets
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              isOpen ? "max-h-96 mt-4 pt-4 border-t border-border" : "max-h-0"
            )}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="mt-2 bg-gradient-gold hover:opacity-90 text-primary-foreground font-medium">
                Get Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
