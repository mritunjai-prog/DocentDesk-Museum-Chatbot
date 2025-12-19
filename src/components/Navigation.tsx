import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Landmark, Menu, X, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { CartButton } from './CartButton';
import { UserMenu } from './UserMenu';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Virtual Tours', href: '/tour' },
  { label: 'Events & Tickets', href: '/events' },
  { label: 'Exhibits', href: '/exhibits' },
  { label: 'About', href: '/about' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-gold">
              <Landmark className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground hidden sm:block">
              DocentDesk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors relative py-2',
                  location.pathname === item.href
                    ? 'text-gold'
                    : 'text-muted-foreground hover:text-foreground',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300',
                  location.pathname === item.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <LanguageSelector />
              <ThemeToggle />
              <CartButton />
              <UserMenu />
            </div>

            <Link to="/events" className="hidden md:block">
              <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold glow-gold">
                <Ticket className="w-4 h-4 mr-2" />
                Get Tickets
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block py-3 text-lg font-medium transition-colors border-b border-border/50',
                location.pathname === item.href
                  ? 'text-gold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-4 pt-4">
            <LanguageSelector />
            <ThemeToggle />
            <CartButton />
            <UserMenu />
          </div>

          <Link to="/events" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold mt-4">
              <Ticket className="w-4 h-4 mr-2" />
              Get Tickets
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
