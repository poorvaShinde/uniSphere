
'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { ArrowRight, Edit } from 'lucide-react';
import EditProfileForm from './edit-profile-form';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  interests: string[];
  skills: string[];
  bio: string;
  photoURL: string;
}

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, let's listen for their profile document.
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserProfile(doc.data() as UserProfile);
          } else {
            // User is authenticated but has no profile document.
            setUserProfile(null);
          }
          setLoading(false);
        });
        return () => unsubscribeProfile(); // Cleanup the profile listener when auth state changes
      } else {
        // User is signed out.
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the auth listener on component unmount
  }, []);

  const handleUpdateSuccess = () => {
    setIsEditDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Skeleton className="h-28 w-28 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
               <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
               </div>
            </div>
             <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
               <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
               </div>
            </div>
          </CardContent>
           <CardFooter>
             <Skeleton className="h-10 w-48" />
           </CardFooter>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-muted-foreground">Could not load user profile. Please complete onboarding or try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40 p-6 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-6">
                <Avatar className="h-28 w-28 border-4 border-background">
                <AvatarImage src={userProfile.photoURL} alt={userProfile.name} />
                <AvatarFallback className="text-3xl">{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                <CardTitle className="text-3xl font-bold">{userProfile.name}</CardTitle>
                <p className="text-muted-foreground">{userProfile.email}</p>
                <Badge className="mt-2 capitalize" variant={userProfile.role === 'student' ? 'default' : 'secondary'}>{userProfile.role}</Badge>
                </div>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                     <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <EditProfileForm userProfile={userProfile} onSuccess={handleUpdateSuccess} />
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">About Me</h3>
            <p className="text-muted-foreground">{userProfile.bio}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
         <CardFooter className="bg-muted/40 p-6 flex justify-end">
           <Button onClick={() => router.push('/main')}>
             Explore Opportunities
             <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardPage;
