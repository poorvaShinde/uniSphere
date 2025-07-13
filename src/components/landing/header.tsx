import { GraduationCap } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Unihub</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost">Log In</Button>
            <Button>Sign Up</Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
