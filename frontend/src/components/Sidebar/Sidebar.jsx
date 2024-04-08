import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
            {isOpen && <h3 className="text-white text-xl">Dashboard</h3>}
          </li>

          <li className="flex items-center space-x-2 mt-10">
            <Link to="#" className="flex items-center space-x-2">
              <PersonAddAltIcon fontSize="large" className='cursor-pointer text-white icon' titleAccess='Cadastrar uma nova pessoa'/>
              {isOpen && <span className="text-white text-lg">Cadastrar</span>}
            </Link>
          </li>
          
          <li className="flex items-center space-x-2 mt-5">
            <Link to="#" className="flex items-center space-x-2">
              <PersonSearchIcon fontSize="large" className='cursor-pointer text-white' titleAccess='Listar pessoas cadastradas'/>
              {isOpen && <span className="text-white text-lg">Listar</span>}
            </Link>
          </li>

          <li className="flex items-center space-x-2 mt-5">
            <Link to="#" className="flex items-center space-x-2">
              <EditIcon fontSize="large" className='cursor-pointer text-white' titleAccess='Editar pessoas cadastradas'/>
              {isOpen && <span className="text-white text-lg">Editar</span>}
            </Link>
          </li>

          <li className="flex items-center space-x-2 mt-5">
            <Link to="#" className="flex items-center space-x-2">
              <DeleteOutlineIcon fontSize="large" className='cursor-pointer text-white' titleAccess='Deletar uma pessoa cadastrada'/>
              {isOpen && <span className="text-white text-lg">Deletar</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar