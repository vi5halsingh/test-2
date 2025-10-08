import React, { useEffect, useState } from 'react';

interface Props {
  value: string | null;
  onChange: (category: string | null) => void;
}

const DEFAULTS = ['All', 'Technology', 'Business', 'Sports', 'Entertainment'];

const CategoryFilter = ({ value, onChange }: Props) => {
  const [cats, setCats] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) setCats(JSON.parse(stored));
    else {
      setCats(DEFAULTS);
      localStorage.setItem('categories', JSON.stringify(DEFAULTS));
    }
  }, []);

  return (
    <div className="flex items-center gap-3 flex-wrap mb-4">
      {cats.map(c => (
        <button key={c} onClick={() => onChange(c === 'All' ? null : c)} className={`px-3 py-1 rounded ${value === (c==='All'?null:c) ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-200'}`}>
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
