import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, onClear }) => {
  return (
    <div className="px-4 py-3 bg-white">
      <div id="search-container" className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-maroon pointer-events-none" />
        <input
          id="search-input-field"
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search medicines, lab tests..."
          className="w-full bg-white text-neutral-900 text-sm font-medium py-3.5 pl-12 pr-10 rounded-[14px] border-[1.5px] border-maroon-mid hover:border-maroon focus:border-maroon focus:outline-hidden transition-all placeholder:text-neutral-400 shadow-2xs"
        />
        {query && (
          <button
            id="clear-search-btn"
            onClick={onClear}
            className="absolute right-4 p-1 rounded-full hover:bg-maroon-light text-maroon transition-colors"
            title="Clear search queries"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
