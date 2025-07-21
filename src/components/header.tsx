
'use client';

import { GraduationCap, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/auth-modal';
import { useState } from 'react';

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'signup'>('login');

  const openModal = (tab: 'login' | 'signup') => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
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
              {loading ? (
                <div className="w-20 h-8 bg-muted rounded-md animate-pulse" />
              ) : user ? (
                <>
                   <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                     <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => openModal('login')}>
                    Log In
                  </Button>
                  <Button onClick={() => openModal('signup')}>Sign Up</Button>
                </>
              )}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
       <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={initialTab}
      />
    </>
  );
}
