
'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import AuthModal from '../auth/auth-modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'signup'>('login');

  const openModal = (tab: 'login' | 'signup') => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
              <Button variant="ghost" onClick={() => openModal('login')}>
                Log In
              </Button>
              <Button onClick={() => openModal('signup')}>Sign Up</Button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialTab={initialTab}
      />
    </>
  );
};

export default Header;
