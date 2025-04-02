import React, { useState } from 'react'
import projects from '../data'
const Projects = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  return (
    <div className='h-screen flex justify-center items-center'>
      <h1 className='text-9xl font-extrabold text-white'>Projects</h1>
      <nav></nav>
      <div className='w-[95vw] h-[95vh] grid '></div>
    </div>
  )
}

export default Projects
