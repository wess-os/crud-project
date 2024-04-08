import React from 'react'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='body'>
        <header className='header'>
        <Link to="/adminlogin">
          <LogoutIcon className='icon-logout' titleAccess='Logout'/>
        </Link>
        </header>
        <Sidebar/>
        <main className='main-container'></main>
    </div>
  )
}

export default Dashboard