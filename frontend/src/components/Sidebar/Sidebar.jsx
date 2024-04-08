import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
        <ul>
          <li>
            <DashboardIcon onClick={toggleSidebar} className='icon' titleAccess='Admin Dashboard'/>
            {isOpen && <h3>Dashboard</h3>}
          </li>

          <li>
            <Link to="#"><PersonAddAltIcon className='icon' titleAccess='Cadastrar uma nova pessoa'/></Link>
            {isOpen && <span>Cadastrar</span>}
          </li>
          
          <li>
            <Link to="#"><PersonSearchIcon className='icon' titleAccess='Listar pessoas cadastradas'/></Link>
            {isOpen && <span>Listar</span>}
          </li>

          <li>
            <Link to="#"><EditIcon className='icon' titleAccess='Editar pessoas cadastradas'/></Link>
            {isOpen && <span>Editar</span>}
          </li>

          <li>
            <Link to="#"><DeleteOutlineIcon className='icon' titleAccess='Deletar uma pessoa cadastrada'/></Link>
            {isOpen && <span>Deletar</span>}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar