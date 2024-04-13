import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {

  const logout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <div class="flex">
      <aside class="w-34 fixed left-0 top-0 h-screen bg-gray-800 text-white p-5 transition-all duration-300 ease-in-out">
        <ul class="list-none m-0 p-0">
          <li class="flex items-center space-x-2">
            <Link to="/dashboard">
              <DashboardIcon fontSize="large" className='cursor-pointer text-white' titleAccess='Admin Dashboard'/>
            </Link>
          </li>
          <li class="flex items-center space-x-2 mt-10">
            <Link to="/dashboard/create" className="flex items-center space-x-2">
              <PersonAddAltIcon fontSize="large" className='cursor-pointer text-white icon' titleAccess='Cadastrar uma nova pessoa'/>
            </Link>
          </li>
          <li class="flex items-center space-x-2 mt-10">
            <Link to="/adminlogin" className="flex items-center space-x-2">
              <LogoutIcon onClick={logout} fontSize="large" className='cursor-pointer text-decoration-none text-red-500' titleAccess='Sair'/>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar