'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Wand2, Lightbulb, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getSmartMatchResult } from '@/app/actions';

const formSchema = z.object({
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
});

type SmartMatchResult = {
  projectName: string;
  collaborators: string[];
};

const SmartMatch = () => {
  const [result, setResult] = useState<SmartMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getSmartMatchResult(values.description);
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }

    setIsLoading(false);
  }

  return (
    <div className="container mx-auto max-w-3xl px-4">
      <div className="text-center">
        <Wand2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Spark Your Next Big Idea with SmartMatch
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Describe your project concept, and our AI will suggest a creative name and the ideal collaborators to bring it to life.
        </p>
      </div>

      <Card className="mt-12">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A mobile app that connects local musicians for jam sessions and gigs..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Ideas'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {error && (
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 text-center text-destructive"
          >
            <p>Error: {error}</p>
          </motion.div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className="mt-8 overflow-hidden">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your AI-Powered Project Blueprint</CardTitle>
                    <CardDescription>Here are some creative ideas to get you started.</CardDescription>
                </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-foreground">
                    <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                    Suggested Project Name
                  </h3>
                  <p className="mt-2 text-2xl font-bold font-headline text-primary">
                    {result.projectName}
                  </p>
                </div>
                <div className="border-t pt-6">
                  <h3 className="flex items-center text-lg font-semibold text-foreground">
                    <UserCheck className="mr-2 h-5 w-5 text-accent" />
                    Recommended Collaborators
                  </h3>
                  <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {result.collaborators.map((collaborator, index) => (
                      <li key={index} className="rounded-md bg-secondary p-3 text-secondary-foreground">
                        {collaborator}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartMatch;
