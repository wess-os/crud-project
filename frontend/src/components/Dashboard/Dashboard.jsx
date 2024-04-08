import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='bg-[rgba(250,250,250,.3)] text-[rgb(45,45,45)] font-sans'>
      <header className='h-12 px-8 shadow-md flex items-center justify-evenly gap-2'>
        <h2 className='ml-12 text-xl font-bold'>CONTROLE DE CLIENTES</h2>
      </header>
      <Sidebar/>
      <main className='flex items-center justify-center mt-20'>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard