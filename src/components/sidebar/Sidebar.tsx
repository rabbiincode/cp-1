import React from 'react'
import './_sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src='./images/menu.png' alt='img' className='menu'/>
      <img src='./images/home.png' alt='img'/>
      <img src='./images/calendar.png' alt='img'/>
      <img src='./images/nt.png' alt='img' className='logo'/>
    </div>
  )
}

export default Sidebar