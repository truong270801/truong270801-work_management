// src/components/SearchBar.js
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-[400px] border rounded-md w-100 "
    />
  );
};

export default SearchBar;
