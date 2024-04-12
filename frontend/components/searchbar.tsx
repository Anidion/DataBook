import React from "react";

const SearchBar = () => {
  return (
    <div className="mx-auto flex w-full max-w-xl p-2 text-xl">
      <input
        type="text"
        className="w-full p-4 text-gray-900 placeholder-gray-400"
        placeholder="Search"
      />
      <button className="bg-white p-4">🔍</button>
    </div>
  );
};

export default SearchBar;
