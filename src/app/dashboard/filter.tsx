'use client'
import React from 'react';
import { Input } from '@/components/ui/input';

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder="Filter by title, description, or tags..."
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
