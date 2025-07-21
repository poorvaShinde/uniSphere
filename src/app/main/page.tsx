
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const opportunities = [
    {
    id: '1',
    title: 'Global AI Hackathon 2024',
    description: 'Join developers from around the world to solve real-world problems using artificial intelligence.',
    tags: ['AI', 'Machine Learning', 'Hackathon', 'Online'],
    },
    {
    id: '2',
    title: 'Web3 Innovators Conference',
    description: 'A deep dive into the future of decentralized technologies, blockchain, and the metaverse.',
    tags: ['Web3', 'Blockchain', 'Conference', 'Virtual'],
    },
    {
    id: '3',
    title: 'Open Source Community Project: EcoTracker',
    description: 'Contribute to an open-source project aimed at tracking and reducing carbon footprints.',
    tags: ['Open Source', 'Project', 'Sustainability', 'Collaboration'],
    },
    {
    id: '4',
    title: 'UX/UI Design Challenge',
    description: 'A week-long design challenge to create a mobile app for mental wellness.',
    tags: ['UX', 'UI', 'Design', 'Challenge'],
    },
     {
    id: '5',
    title: 'Student Startup Pitch Night',
    description: 'Pitch your startup idea to a panel of investors and experienced entrepreneurs.',
    tags: ['Startup', 'Pitching', 'Event', 'Networking'],
    },
     {
    id: '6',
    title: 'Game Devs Unite Meetup',
    description: 'A casual meetup for game developers to share their work, network, and discuss the latest trends.',
    tags: ['Game Dev', 'Event', 'Networking'],
    }
];

const MainPage = () => {
    const [filter, setFilter] = useState('');

    const filteredOpportunities = opportunities.filter((opportunity) => {
        const searchTerm = filter.toLowerCase();
        return (
          opportunity.title.toLowerCase().includes(searchTerm) ||
          opportunity.description.toLowerCase().includes(searchTerm) ||
          opportunity.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Discover Opportunities</h1>
      <p className="text-muted-foreground mb-6">Find the next big thing for your skills and passion.</p>
       <div className="mb-8 max-w-lg mx-auto">
        <Input
            type="text"
            placeholder="Filter by title, description, or tags..."
            className="w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id}>
            <CardHeader>
              <CardTitle>{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>
              <div className="flex flex-wrap gap-2">
                {opportunity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

