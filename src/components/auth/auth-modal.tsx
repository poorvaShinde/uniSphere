
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginForm from './login-form';
import SignupForm from './signup-form';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'signup';
}

export default function AuthModal({
  isOpen,
  onClose,
  initialTab,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'login' ? 'Log In' : 'Sign Up'}
          </DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-full">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-full">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onClose={onClose} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
