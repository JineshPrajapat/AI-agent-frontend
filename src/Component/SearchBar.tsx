// src/components/Search/SearchBar.tsx
import { SearchBarProps } from "@/utils/types/searchTypes";
import React from "react";
// import { SearchBarProps } from "../../utils/types/searchTypes";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  loading = false,
  className = "",
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <div className="search-input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for research papers..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <svg /* search icon */></svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
