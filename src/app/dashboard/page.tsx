
'use client';
import React, { useState } from 'react';
import { HackathonCard } from './hackathon-card';
import { Filter } from './filter';
import { dummyHackathons } from '@/lib/dummy-data';

const DashboardPage = () => {
  const [filter, setFilter] = useState('');

  const filteredHackathons = dummyHackathons.filter((hackathon) => {
    const searchTerm = filter.toLowerCase();
    return (
      hackathon.title.toLowerCase().includes(searchTerm) ||
      hackathon.description.toLowerCase().includes(searchTerm) ||
      hackathon.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Filter value={filter} onChange={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHackathons.map((hackathon) => (
          <HackathonCard
            key={hackathon.id}
            title={hackathon.title}
            description={hackathon.description}
            tags={hackathon.tags}
            photo={hackathon.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
