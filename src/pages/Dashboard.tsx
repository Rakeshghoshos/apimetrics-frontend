import React,{useState} from 'react'
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className='flex flex-row'>
     <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
     <div>
      <Outlet />
     </div>
    </div>
  )
}

export default Dashboard