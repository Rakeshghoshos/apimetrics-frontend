import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`h-screen fixed inset-0 bg-gray-800 text-white transition-transform ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 lg:flex lg:flex-col`}>
      <div className="p-4 flex justify-between items-center">
        <span className="text-xl font-bold">MyApp</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link to="/dashboard/home" className="block p-4 hover:bg-gray-700">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/apimmetrics" className="block p-4 hover:bg-gray-700">Api-metrics</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm">© 2024 MyApp</p>
      </div>
    </div>
  );
};

export default SideBar;
