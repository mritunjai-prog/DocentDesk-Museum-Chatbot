import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
    setIsHydrated(true);
  }, []);

  // Apply theme to DOM
  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!isHydrated) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="text-muted-foreground"
      >
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden text-muted-foreground hover:text-foreground transition-colors duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      <Sun
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`w-5 h-5 transition-all duration-500 ${
          isDark ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
        aria-hidden="true"
      />
    </Button>
  );
}
