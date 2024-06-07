'use client'
import { useState } from 'react';
import TaskList from './components/TaskList';


export default function Home() {

  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState('')

  const handleAddTask = () => {
    if(newTask.length === 0) return;

    const newText = {
      id: tasks.length+1,
      text: newTask,
      completed:false
    };

    setTasks([ ...tasks, newText]);
    setNewTask('');

  };

  const handleToggleTask = (id) => {
    [...tasks].map((task) => {
      if(task.id === id){
        task.completed = !task.completed
      }
    })

    setTasks([...tasks])
  };

  const handleDeleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterTasks = tasks.filter((task) => {
    if(filter === 'all') return true;
    if(filter === 'active') return !task.completed;
    if(filter === 'completed') return task.completed;
    return true;
  })

  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-bold">TODO</h1>
    </div>
    <div className="mb-4 flex items-center">
      <input
        type="text"
        className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
        placeholder="What to do ?"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-4 rounded ml-4"
      >
        Add Task
      </button>
    </div>
    <div className="bg-gray-800 rounded p-4">
      <TaskList tasks={filterTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
      <span>{tasks.filter(task => !task.completed).length} items left</span>
      <div>
          <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
          <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
          <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
        </div>
        <button
          onClick={() => setTasks(tasks.filter(task => !task.completed))}
          className="text-gray-400 hover:text-white"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
);
}