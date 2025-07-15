
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import AuthModal from '../auth/auth-modal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'signup'>('signup');

  const openModal = (tab: 'login' | 'signup') => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center md:text-left">
              <motion.h1
                className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
                variants={itemVariants}
              >
                Unlock Your Potential.
                <br />
                <span className="text-primary">Collaborate & Create.</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg leading-8 text-muted-foreground"
                variants={itemVariants}
              >
                Unihub is the ultimate platform for students to connect, share
                ideas, and build amazing projects together. Find your next
                collaborator and bring your vision to life.
              </motion.p>
              <motion.div
                className="mt-10 flex items-center justify-center gap-x-6 md:justify-start"
                variants={itemVariants}
              >
                <Button size="lg" onClick={() => openModal('signup')}>
                  Sign Up for Free
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#smart-match">Try SmartMatch &rarr;</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div className="relative" variants={itemVariants}>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Collaboration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="collaboration students"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialTab={initialTab}
      />
    </>
  );
};

export default HeroSection;
