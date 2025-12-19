import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="relative overflow-hidden text-muted-foreground hover:text-foreground"
    >
      <Sun
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      />
      <Moon
        className={`w-5 h-5 transition-all duration-500 ${
          isDark ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      />
    </Button>
  );
}
