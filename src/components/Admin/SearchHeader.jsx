import React from 'react';
import { HiSearch, HiPlus } from 'react-icons/hi';

const SearchHeader = ({
  searchTerm,
  setSearchTerm,
  onAddClick,
  buttonText,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="input input-bordered w-64 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HiSearch className="text-gray-500" />
      </div>
      <button
        className="btn btn-primary flex items-center"
        onClick={onAddClick}
      >
        <HiPlus className="mr-1" /> {buttonText}
      </button>
    </div>
  );
};

export default SearchHeader;
