
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { useState } from 'react'; // Import useState

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  userType: z.enum(['student', 'club']),
});

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast(); // Initialize toast
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'student',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Set loading to true on submission
    try {
      const { email, password, userType } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        role: userType,
      });

      toast({
        title: 'Sign Up Successful!',
        description: 'Welcome to Unihub!',
      });
      // Redirect to onboarding page after successful sign-up to complete profile
      router.push('/onboarding'); 
    } catch (error: any) { // Add ': any' for error type
      console.error('Error signing up:', error);
      let errorMessage = 'An unexpected error occurred.';

      // Specific error handling for Firebase email-already-in-use
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use. Please use a different email or log in.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I am a...</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="club">Club</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>Sign Up</Button> {/* Disable button when loading */}
      </form>
    </Form>
  );
}
