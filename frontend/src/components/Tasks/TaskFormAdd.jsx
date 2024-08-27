import React, { useState } from 'react';
import { TextField, Button, InputLabel, NativeSelect } from '@mui/material';
import { createTask } from '../../services/ApiTasks';

function TaskFormAdd() {
  const userId = localStorage.getItem('user_id'); 

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    status: '',
    deadline: '',
    user_id: userId || '', 
    created_at: '', 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const taskData = {
      ...formData,
      created_at: currentTimestamp, 
    };

    try {
      const response = await createTask(taskData);
      console.log('Task created successfully:', response);
      setFormData({
        title: '',
        description: '',
        level: '',
        status: '',
        deadline: '',
        user_id: userId || '',
        created_at: currentTimestamp, 
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-4 w-full">
        <TextField 
          name="title"
          label="Task Title" 
          variant="standard" 
          value={formData.title}
          onChange={handleChange}
          className="w-full md:flex-1"
          required
        />
        <TextField 
          name="description"
          label="Task Description" 
          variant="standard" 
          value={formData.description}
          onChange={handleChange}
          className="w-full md:flex-1"
          required
        />
        <div className="w-full md:w-auto">
          <InputLabel variant="standard" htmlFor="level">
            Level
          </InputLabel>
          <NativeSelect
            name="level"
            value={formData.level}
            onChange={handleChange}
            inputProps={{
              id: 'level',
            }}
            className="w-full"
            required
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </NativeSelect>
        </div>
        <div className="w-full md:w-auto">
          <InputLabel variant="standard" htmlFor="status">
            Status
          </InputLabel>
          <NativeSelect
            name="status"
            value={formData.status}
            onChange={handleChange}
            inputProps={{
              id: 'status',
            }}
            className="w-full"
            required
          >
            <option value="">Select</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </NativeSelect>
        </div>
        <TextField 
          name="deadline"
          label="Deadline" 
          variant="standard"  
          type="datetime-local"
          value={formData.deadline}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          className="w-full md:w-auto"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full md:w-auto h-[36.5px] mt-4 md:mt-0"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default TaskFormAdd;