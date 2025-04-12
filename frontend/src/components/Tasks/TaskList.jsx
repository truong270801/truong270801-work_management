// components/task/TaskList.js
import React, { useEffect, useState } from 'react';
import { listTask, deleteTask } from '../../services/ApiTasks';
import TaskItem from './TaskItem';
import SearchBar from '../search/SearchBar';
import TaskFilter from '../filter/TaskFilter';
import { useStateApi } from '../../store/useStateApi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({
    status: '',
    level: '',
    timeRange: '',
  });

  const shouldFetch = useStateApi((state) => state.shouldFetch);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskList = await listTask();
        setTasks(taskList);
        setError(null);
      } catch (error) {
        setError('Failed to fetch tasks. Please try again.');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [shouldFetch]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleSearchChange = (term) => setSearchTerm(term);
  const handleFilterChange = (filter) => setFilterData(filter);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      const deadlineMatch = filterData.timeRange
        ? new Date(task.deadline) <= new Date(filterData.timeRange)
        : true;

      return (
        (!filterData.status || task.status === filterData.status) &&
        (!filterData.level || task.level === filterData.level) &&
        deadlineMatch
      );
    });

  return (
    <div className="w-full p-4">
      <div className="flex justify-between gap-4 mb-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <TaskFilter onFilterChange={handleFilterChange} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Deadline</th>
            <th className="py-2 px-4 border-b">Level</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
