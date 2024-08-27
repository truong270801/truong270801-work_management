import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Button, TextField, NativeSelect, InputLabel, DialogActions } from '@mui/material';
import { updateTask } from '../../services/ApiTasks';

const TaskFormUpdate = ({ open, onClose, task, onTaskUpdate }) => {
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
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        user_id: userId || '',
        title: task.title || '',
        description: task.description || '',
        level: task.level || '',
        status: task.status || '',
        deadline: task.deadline ? task.deadline.slice(0, 16) : '',
        created_at: task.created_at || '',
      });
    }
  }, [task, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await updateTask(task.id, formData);
      onTaskUpdate(updatedTask);
      onClose();
    } catch (error) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit} className="w-full p-4">
        <div className="flex flex-col gap-4 w-full">
          <TextField 
            name="title"
            label="Task Title" 
            variant="standard" 
            value={formData.title}
            onChange={handleChange}
            className="w-full"
            required
          />
          <TextField 
            name="description"
            label="Task Description" 
            variant="standard" 
            value={formData.description}
            onChange={handleChange}
            className="w-full"
            required
          />
          <div className="w-full">
            <InputLabel variant="standard" htmlFor="level">Level</InputLabel>
            <NativeSelect
              name="level"
              value={formData.level}
              onChange={handleChange}
              inputProps={{ id: 'level' }}
              className="w-full"
              required
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </NativeSelect>
          </div>
          <div className="w-full">
            <InputLabel variant="standard" htmlFor="status">Status</InputLabel>
            <NativeSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              inputProps={{ id: 'status' }}
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
            InputLabelProps={{ shrink: true }}
            className="w-full"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskFormUpdate;
