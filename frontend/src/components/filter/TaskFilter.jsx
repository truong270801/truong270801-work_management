import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@mui/material';

function TaskFilter({ onFilterChange }) {
  const [filterData, setFilterData] = useState({
    status: '',
    level: '',
    timeRange: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFilter = () => {
    onFilterChange(filterData);
  };

  return (
      <div className="flex flex-row  items-end gap-4  rounded-lg">
      <div className="w-full md:w-1/3 ]">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          value={filterData.status}
          label="Status"
          onChange={handleChange}
          name="status"
          className="w-[100px] h-[40px]"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </div>
      <div className="w-full md:w-1/3">
        <InputLabel id="level-label">Level</InputLabel>
        <Select
          labelId="level-label"
          id="level-select"
          value={filterData.level}
          label="level"
          onChange={handleChange}
          name="level"
          className="w-[100px] h-[40px]"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </div>
      <div className="w-full md:w-1/3">
        <InputLabel id="time-label">Time Range</InputLabel>
        <Select
          labelId="time-label"
          id="time-select"
          value={filterData.timeRange}
          label="Time Range"
          onChange={handleChange}
          name="timeRange"
         className="w-[100px] h-[40px]"
        >
          <MenuItem value="">All Time</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="thisWeek">This Week</MenuItem>
          <MenuItem value="thisMonth">This Month</MenuItem>
        </Select>
      </div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleFilter}
        className="w-full md:w-auto mt-4 md:mt-0 h-[40px]"
      >
        Apply
      </Button>
    </div>
  );
}

export default TaskFilter;
