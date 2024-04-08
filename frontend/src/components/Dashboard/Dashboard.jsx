import React from 'react'
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='bg-[rgba(250,250,250,.3)] text-[rgb(45,45,45)] font-sans'>
      <header className='h-12 px-8 shadow-md flex items-center justify-evenly gap-2'>
        <h2 className='ml-12 text-xl font-bold'>CONTROLE DE CLIENTES</h2>
      </header>

      <Sidebar/>

      <main className='flex items-center justify-center mt-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 justify-center items-center'>
          <div className='bg-blue-500 rounded-lg p-12'>
            <h2 className='text-center text-xl'>Quantidade de Clientes</h2>
            <h2 className='text-center font-bold'>0</h2>
          </div>
          <div className='bg-green-500 rounded-lg p-12'>
            <h2 className='text-center text-xl'>Clientes Ativos</h2>
            <h2 className='text-center font-bold'>0</h2>
          </div>
          <div className='bg-red-500 rounded-lg p-12'>
            <h2 className='text-center text-xl'>Clientes Desativados</h2>
            <h2 className='text-center font-bold'>0</h2>
          </div>
          <div className='bg-yellow-500 rounded-lg p-12'>
            <h2 className='text-center text-xl'>Clientes Bloqueados</h2>
            <h2 className='text-center font-bold'>0</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard