import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <form className="flex justify-center">
      <input
        id="search"
        type="text"
        placeholder="Search for a recipe..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 w-64 rounded-lg outline-none"
      />
    </form>
  );
}
