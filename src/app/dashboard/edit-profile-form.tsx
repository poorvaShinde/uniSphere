
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  role: z.enum(['student', 'community']),
  interests: z.string().min(3, {
    message: 'Please enter at least one interest.',
  }),
  skills: z.string().min(3, {
    message: 'Please enter at least one skill.',
  }),
  bio: z.string().max(160, {
    message: 'Bio must not be longer than 160 characters.',
  }),
  profilePicture: z.any()
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 1MB.`),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileFormProps {
  userProfile: {
    name: string;
    email: string;
    role: string;
    interests: string[];
    skills: string[];
    bio: string;
    photoURL: string;
  };
  onSuccess: () => void;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export default function EditProfileForm({ userProfile, onSuccess }: EditProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile.name,
      role: userProfile.role as ProfileFormValues['role'],
      interests: userProfile.interests.join(', '),
      skills: userProfile.skills.join(', '),
      bio: userProfile.bio,
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated.');
      }
      
      let photoURL = userProfile.photoURL;
      if (data.profilePicture && data.profilePicture.length > 0) {
        const file = data.profilePicture[0];
        photoURL = await toBase64(file);
      }

      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: userProfile.email, // Keep original email
        role: data.role,
        interests: data.interests.split(',').map((interest) => interest.trim()),
        skills: data.skills.split(',').map((skill) => skill.trim()),
        bio: data.bio,
        photoURL,
      }, { merge: true });

      toast({
        title: 'Profile Updated!',
        description: 'Your profile has been successfully updated.',
      });
      onSuccess();

    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: error.message || 'There was an error updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...form.register('profilePicture')} />
              </FormControl>
               <FormDescription>
                Upload a new image to replace the current one (max 1MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input placeholder={userProfile.email} readOnly disabled />
            </FormControl>
            <FormDescription>
                Your email address cannot be changed.
            </FormDescription>
        </FormItem>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="community">Community/Club</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI, Web Dev, Design" {...field} />
              </FormControl>
               <FormDescription>
                Please provide a comma-separated list of your interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Python, Figma" {...field} />
              </FormControl>
              <FormDescription>
                Please provide a comma-separated list of your skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
