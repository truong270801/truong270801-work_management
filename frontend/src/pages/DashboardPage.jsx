import React from 'react';
import TaskList from '../components/Tasks/TaskList';
import Header from '../components/Layout/Header';
import TaskFormAdd from '../components/Tasks/TaskFormAdd';


const DashboardPage = () => {

  return (
    <div>
      <Header />

      <div className='absolute top-12 w-[100%] h-[100%] bg-white p-8'>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">TASK LIST</h1>
        </div>
        <div className='px-8'>
          <TaskFormAdd />
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default DashboardPage;
