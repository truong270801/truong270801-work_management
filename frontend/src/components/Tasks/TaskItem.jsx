import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import TaskFormUpdate from './TaskFormUpdate';

const levelStyles = {
  low: 'bg-green-100 text-green-800 border border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  high: 'bg-red-100 text-red-800 border border-red-300',
};

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const levelStyle = levelStyles[task.level.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-300';

  const handleOpenUpdateForm = () => setIsUpdateFormOpen(true);
  const handleCloseUpdateForm = () => setIsUpdateFormOpen(false);

  const handleTaskUpdate = (updatedTask) => {
    onUpdate(updatedTask);
    handleCloseUpdateForm();
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition duration-300">
        <td className="text-left py-3 px-4 text-sm font-medium">{task.id}</td>
        <td className="text-left py-3 px-4 text-sm">{task.title}</td>
        <td className="text-left py-3 px-4 text-sm">{task.description}</td>
        <td className="text-left py-3 px-4 text-sm">{task.created_at}</td>
        <td className="text-left py-3 px-4 text-sm">{task.deadline}</td>
        <td className="text-left py-3 px-4">
          <div className={`inline-flex items-center ${levelStyle} rounded-full py-1 px-3 text-xs font-semibold`}>
            {task.level}
          </div>
        </td>
        <td className="text-left py-3 px-4 text-sm">{task.status}</td>
        <td className="text-left py-3 px-4">
          <div className="flex space-x-2">
            <IconButton onClick={handleOpenUpdateForm}>
              <Edit className='text-blue-600 hover:text-blue-800' />
            </IconButton>
            <IconButton onClick={() => onDelete(task.id)} aria-label={`Delete task ${task.title}`}>
              <Delete className='text-red-600 hover:text-red-800' />
            </IconButton>
          </div>
        </td>
      </tr>
      <TaskFormUpdate 
        open={isUpdateFormOpen}
        onClose={handleCloseUpdateForm}
        task={task}
        onTaskUpdate={handleTaskUpdate}
      />
    </>
  );
};

export default TaskItem;
