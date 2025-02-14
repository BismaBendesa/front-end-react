import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Home = () => {
  // store all the tasks
  const [tasks, setTasks] = useState([])
  // store task name for input
  const [taskName, setTaskName] = useState('')


  // create new task
  const createTask = (e) => {
    e.preventDefault()
    // check if the input is empty
    if (taskName.trim() === "") return;
    const newTask = { id: Date.now(), name : taskName, status: false};
    setTasks([...tasks, newTask]);
    setTaskName('')
  }

  const toggleCheckedTask = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? {...task, status: !task.status} : task)
    setTasks(updatedTasks);
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }


  // Load all tasks from localstorage
  useEffect(() => {
    // parse strings into JSON
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, [])

  // Update Localstorage
  useEffect(() => {
    // Only update if tasks exist
    if (tasks.length > 0) { 
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } 
  }, [tasks])



  return (
    <div>
      <Navbar />
      <h1>To do List</h1>
      {/* search bar */}
      <input type="text" className='border border-[#cacaca] px-1 py-2 block' placeholder='Search To Do List'/>
      
      <button className='bg-blue-200 text-blue-800 cursor-pointer'>Add New List</button>

      {/* add new todolist */}
      <input type="text" className='border border-[#cacaca] px-1 py-2 block' placeholder='Add New todo List' onChange={e => setTaskName(e.target.value)}/>
      <button className='bg-blue-600 text-blue-50 cursor-pointer' onClick={createTask}>Confirm</button>
      <div className='todos flex flex-col gap-2'>
        {tasks.length == 0 ? (<p>No Task Found</p>) : (
          tasks.map(task => (
            <div className='todo' key={task.id}>
              <input id={task.id} type="checkbox" checked={task.status} onChange={() => toggleCheckedTask(task.id)}/>
              <label htmlFor={task.id} >{task.name}</label>
              <div className='inline-block ml-5 px-2 py-0.5 bg-red-100 cursor-pointer' onClick={() => deleteTask(task.id)}>x</div>
            </div>
          ))
        )}
        {/* <div className='todo'>
          <input type="checkbox" />
          <label htmlFor="checkbox-1 mr-5 inline-block">Todo List 1</label>
          <div className='inline-block ml-5 px-2 py-0.5 bg-red-100'>x</div>
        </div>
        <div className='todo'>
          <input type="checkbox" />
          <label htmlFor="checkbox-1 mr-5 inline-block">Todo List 1</label>
          <div className='inline-block ml-5 px-2 py-0.5 bg-red-100'>x</div>
        </div> */}
      </div>
    </div>
  )
}

export default Home