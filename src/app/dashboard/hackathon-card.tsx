
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HackathonCardProps {
  title: string;
  description: string;
  tags: string[];
  photo: string;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ title, description, tags, photo }) => {
  return (
    <Card>
      <CardHeader>
        <Image src={photo} alt={title} width={400} height={200} className="rounded-t-lg object-cover" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <div className="mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="mr-2">
              {tag}
            </Badge>
          ))}
        </div>
        <Button className="mt-4">Join</Button>
      </CardContent>
    </Card>
  );
};
