
'use client';

import { useState } from 'react';
import ProfileForm from './profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, Users, CheckCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const steps = [
  {
    title: 'Welcome to Unihub!',
    content: (
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        We're thrilled to have you join our community. Unihub is your gateway to a world of opportunity, designed to help you connect, collaborate, and create. Let's get your profile set up so you can start exploring.
      </p>
    ),
  },
  {
    title: 'What You Can Do',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="flex items-start space-x-3">
          <Award className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Discover Opportunities</h3>
            <p className="text-sm text-muted-foreground">Find hackathons, conferences, and exclusive events.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Users className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Find Collaborators</h3>
            <p className="text-sm text-muted-foreground">Connect with students and communities to build projects.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Briefcase className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Share Your Projects</h3>
            <p className="text-sm text-muted-foreground">Showcase your work and get valuable feedback.</p>
          </div>
        </div>
         <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Personalize Your Feed</h3>
            <p className="text-sm text-muted-foreground">Tailor your dashboard to your interests and skills.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Set Up Your Profile',
    content: <ProfileForm />,
  },
];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-16 ${currentStep > index ? 'bg-primary' : 'bg-muted'}`}></div>
                  )}
                </div>
              ))}
            </div>
            <CardTitle className="text-3xl font-bold">{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-between w-full max-w-2xl">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="flex-grow"></div>
          {currentStep < steps.length - 1 && (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
