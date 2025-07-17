
import React from 'react';
import { HackathonCard } from './hackathon-card';
import { Filter } from './filter';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Filter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* The hackathon cards will be rendered here */}
      </div>
    </div>
  );
};

export default DashboardPage;
