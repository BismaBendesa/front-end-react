import React, { use, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'


const Home = () => {
  // store all the tasks
  const [tasks, setTasks] = useState([])
  // store task name for input
  const [taskName, setTaskName] = useState('');
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 5;
  // Search 
  const [searchQuery, setSearchQuery] = useState('')

  // Add Todo Overlay
  const [overlay, setOverlay] = useState(false)

  // flash messages
  const [flashMessage, setFlashMessage] = useState('')

  

  // first and last task for slice pagination
  const lastTask = currentPage * taskPerPage;
  const firstTask = lastTask - taskPerPage;
  // const currentTasks = tasks.slice(firstTask, lastTask);

  // change pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // create new task
  const createTask = (e) => {
    e.preventDefault()
    // check if the input is empty
    if (taskName.trim() === "") return;
    const newTask = { id: Date.now(), name : taskName, status: false};
    setTasks([...tasks, newTask]);
    setTaskName('')

    // Show success message
    setFlashMessage('Task successfully created!');
    
    // Hide message after 3 seconds
    setTimeout(() => setFlashMessage(''), 3000);
  }

  // Toggle Checklist
  const toggleCheckedTask = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? {...task, status: !task.status} : task)
    setTasks(updatedTasks);

    // Show success message
    setFlashMessage('Task Successfully Updated!');
    
    // Hide message after 3 seconds
    setTimeout(() => setFlashMessage(''), 3000);
  }

  // Delete Todo
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

     // Show success message
    setFlashMessage('Task Successfully Deleted!');
    
     // Hide message after 3 seconds
    setTimeout(() => setFlashMessage(''), 3000);
  }

  // Toggle Overlay
  const toggleOverlay = () => {
    setOverlay(prevOverlay => !prevOverlay)
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

  // Search tasks
  const filteredTasks = tasks.filter((task) => 
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <Navbar />
      {/* Flash Message */}
      {flashMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-90">
          {flashMessage}
        </div>
      )}
      <div className='m-auto w-full max-w-[600px] px-8 md:px-0'>
        {/* search bar */}
        <label htmlFor='search-bar' className='text-xs text-gray-500 mb-1 inline-block'>Search</label>
        <input type="text" className='w-full rounded-md border border-[#cacaca] px-4 py-1.5 block text-sm' id='search-bar' placeholder='Search To Do List' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
        {/* add new todolist */}
        {/* <input type="text" className='border border-[#cacaca] px-1 py-2 block' placeholder='Add New todo List' onChange={e => setTaskName(e.target.value)}/>
        <button className='bg-blue-600 text-blue-50 cursor-pointer' onClick={createTask}>Confirm</button> */}
        {/* Todo List */}
        <div className='todos flex flex-col gap-2 my-8'>
          {/* can be refactor using reusable component */}
          {filteredTasks.length === 0 ? (<p className='text-center text-gray-600'>No Task Found</p>) : (
            filteredTasks.map(task => (
              <div className='todo cursor-pointer flex justify-between items-center bg-white hover:bg-gray-200' key={task.id}>
                <div className='flex gap-4 grow'>
                  <input className='scale-125 cursor-pointer' id={task.id} type="checkbox" checked={task.status} onChange={() => toggleCheckedTask(task.id)}/>
                  <label className='w-full block grow text-sm md:text-base cursor-pointer' htmlFor={task.id} >{task.name}</label>
                </div>
                <div className='inline-block ml-5 px-2 py-0.5 text-red-500 cursor-pointer hover:bg-red-200' onClick={() => deleteTask(task.id)}>x</div>
              </div>
            ))
          )}
        </div>
        <button className='bg-blue-600 font-bold text-blue-50 cursor-pointer w-full p-2 rounded-full shadow-md hover:bg-blue-400 hover:text-blue-50' onClick={toggleOverlay}>Add New Task +</button>
      </div>
      
      {
        overlay && ( 
        <div className='overlay-wrapper fixed inset-0 bg-neutral-900/65' onClick={toggleOverlay}>
          <div className="add-task-overlay w-full max-w-[400px] p-8 flex flex-col gap-4 bg-white border border-[#dadada] rounded-md mx-auto shadow-lg mt-12" onClick={(e) => e.stopPropagation()}> 
            <div className='flex justify-between items-center'>
              <h2 className='font-bold md:text-xl text-base'>Add New Task</h2>
              <span className='text-2xl px-2 text-red-500 cursor-pointer hover:bg-red-200' onClick={toggleOverlay}>x</span>
            </div>
            <hr />
            <input type="text" placeholder='Add New Task' className='w-full rounded-md border border-[#dadada] py-1.5 px-4 md:text-base text-sm' onChange={e => setTaskName(e.target.value)} />
            <button type='submit' className='bg-blue-600 font-bold text-blue-50 cursor-pointer w-full p-2 rounded-full shadow-md hover:bg-blue-400 hover:text-blue-50' onClick={createTask}>Add New Task</button>
          </div>
        </div>
        )
      }

      
      
      {/* Pagination Component */}
      {/* <Pagination 
        tasks={tasks}
        taskPerPage={taskPerPage}
        paginate={paginate}
        currentPage={currentPage}
      /> */}
    </div>
  )
}

export default Home