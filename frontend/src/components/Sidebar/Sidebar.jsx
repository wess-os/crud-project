import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-5 transition-all duration-300 ease-in-out transform ${isOpen ? 'w-[250px]' : 'w-[70px]'}`}>
        <ul className="list-none m-0 p-0">
          <li className="flex items-center space-x-2">
            <DashboardIcon fontSize="large" onClick={toggleSidebar} className='cursor-pointer text-white' titleAccess='Admin Dashboard'/>
            <Link to="">{isOpen && <h3 className="text-white text-xl">Dashboard</h3>}</Link>
          </li>

          <li className="flex items-center space-x-2 mt-10">
            <Link to="/dashboard/create" className="flex items-center space-x-2">
              <PersonAddAltIcon fontSize="large" className='cursor-pointer text-white icon' titleAccess='Cadastrar uma nova pessoa'/>
              {isOpen && <span className="text-white text-lg">Cadastrar</span>}
            </Link>
          </li>

          <li className="flex items-center space-x-2 mt-10">
            <Link to="/adminlogin" className="flex items-center space-x-2">
              <LogoutIcon fontSize="large" className='cursor-pointer text-decoration-none text-red-500' titleAccess='Sair'/>
              {isOpen && <span className="text-white text-lg">Sair</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar