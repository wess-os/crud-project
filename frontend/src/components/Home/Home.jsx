import React from 'react'

function Home() {
  return (
    <div>
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
    </div>
  )
}

export default Home