import React, { useState, useMemo } from 'react'
import useLocalStorage from '../hooks/UseLocalStorage'
import Button from '../components/Button'
import Card from '../components/Card'

const FILTERS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
}

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState(FILTERS.ALL)

  const addTask = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTasks(prev => [{ id: Date.now(), text: text.trim(), done: false }, ...prev])
    setText('')
  }

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filtered = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE: return tasks.filter(t => !t.done)
      case FILTERS.COMPLETED: return tasks.filter(t => t.done)
      default: return tasks
    }
  }, [tasks, filter])

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 input px-3 py-2 rounded-md border bg-white dark:bg-slate-800"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex gap-2 mb-4">
        <Button variant={filter === FILTERS.ALL ? 'primary' : 'secondary'} onClick={() => setFilter(FILTERS.ALL)}>All</Button>
        <Button variant={filter === FILTERS.ACTIVE ? 'primary' : 'secondary'} onClick={() => setFilter(FILTERS.ACTIVE)}>Active</Button>
        <Button variant={filter === FILTERS.COMPLETED ? 'primary' : 'secondary'} onClick={() => setFilter(FILTERS.COMPLETED)}>Completed</Button>
        <div className="ml-auto text-sm text-slate-500 dark:text-slate-400">Total: {tasks.length}</div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <Card className="text-center">No tasks</Card>}
        {filtered.map(task => (
          <Card key={task.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={task.done} onChange={() => toggleComplete(task.id)} />
              <div className={task.done ? 'line-through text-slate-500' : ''}>{task.text}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => toggleComplete(task.id)}>{task.done ? 'Undo' : 'Done'}</Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}



// import React, { useState, useEffect } from 'react';
// import Button from '../components/Button';

// /**
//  * Custom hook for managing tasks with localStorage persistence
//  */
// const useLocalStorageTasks = () => {
//   // Initialize state from localStorage or with empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   // Update localStorage when tasks change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const addTask = (text) => {
//     if (text.trim()) {
//       setTasks([
//         ...tasks,
//         {
//           id: Date.now(),
//           text,
//           completed: false,
//           createdAt: new Date().toISOString(),
//         },
//       ]);
//     }
//   };

//   // Toggle task completion status
//   const toggleTask = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return { tasks, addTask, toggleTask, deleteTask };
// };

// /**
//  * TaskManager component for managing tasks
//  */
// const TaskManager = () => {
//   const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
//   const [newTaskText, setNewTaskText] = useState('');
//   const [filter, setFilter] = useState('all');

//   // Filter tasks based on selected filter
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'active') return !task.completed;
//     if (filter === 'completed') return task.completed;
//     return true; // 'all' filter
//   });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask(newTaskText);
//     setNewTaskText('');
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//       <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

//       {/* Task input form */}
//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newTaskText}
//             onChange={(e) => setNewTaskText(e.target.value)}
//             placeholder="Add a new task..."
//             className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
//           />
//           <Button type="submit" variant="primary">
//             Add Task
//           </Button>
//         </div>
//       </form>

//       {/* Filter buttons */}
//       <div className="flex gap-2 mb-4">
//         <Button
//           variant={filter === 'all' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('all')}
//         >
//           All
//         </Button>
//         <Button
//           variant={filter === 'active' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('active')}
//         >
//           Active
//         </Button>
//         <Button
//           variant={filter === 'completed' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('completed')}
//         >
//           Completed
//         </Button>
//       </div>

//       {/* Task list */}
//       <ul className="space-y-2">
//         {filteredTasks.length === 0 ? (
//           <li className="text-gray-500 dark:text-gray-400 text-center py-4">
//             No tasks found
//           </li>
//         ) : (
//           filteredTasks.map((task) => (
//             <li
//               key={task.id}
//               className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleTask(task.id)}
//                   className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <span
//                   className={`${
//                     task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
//                   }`}
//                 >
//                   {task.text}
//                 </span>
//               </div>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 onClick={() => deleteTask(task.id)}
//                 aria-label="Delete task"
//               >
//                 Delete
//               </Button>
//             </li>
//           ))
//         )}
//       </ul>

//       {/* Task stats */}
//       <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
//         <p>
//           {tasks.filter((task) => !task.completed).length} tasks remaining
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TaskManager; 