import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { Button, Modal } from 'flowbite-react';

function List() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // modal de ver endereço
  const handleOpenModal = (person) => {
    setSelectedPerson(person);
    setOpenModal(true);
  };

  // comunicação com o backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API}/auth/list`)
      .then(response => response.json())
      .then(data => {
        if (data.Status && Array.isArray(data.Pessoas)) {
          setData(data.Pessoas);
        } else {
          console.error('Os dados recebidos não são um array:', data);
        }
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  },[]);

  const filteredData = data.filter(
    item => item?.nome?.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: 'Nome', selector: row => row.nome, sortable: true },
    { name: 'Sexo', selector: row => row.sexo, sortable: true },
    { name: 'Data Nasc.', selector: row => row.data_nascimento, sortable: true },
    { name: 'Estado Civil', selector: row => row.estado_civil, sortable: true },
    {
      name: 'Endereço',
      cell: row => (
        <Button onClick={() => handleOpenModal(row)} className='text-green-500 border-none ml-[-16px]'>Ver Endereço</Button>
      ),
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <label htmlFor="filter" className="block font-medium text-gray-700">
          Pesquisar:
        </label>
        <input
          type="text"
          id="filter"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-[50px]"
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        pointerOnHover
        className="rounded-lg shadow-md"
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#f3f4f6',
            },
          },
          headCells: {
            style: {
              color: '#4b5563',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            },
          },
          rows: {
            style: {
              '&:nth-of-type(even)': {
                backgroundColor: '#f9fafb',
              },
            },
          },
          cells: {
            style: {
              color: '#374151',
              fontSize: '0.875rem',
            },
          },
        }}
      />
      <Modal 
        show={openModal} 
        onClose={() => setOpenModal(false)} 
        className="fixed inset-0 flex items-center justify-center z-50 mt-[100px] ml-[200px] mr-[200px]"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            <div className="bg-gray-50 p-4">
              <h2 className="text-lg font-semibold text-center">Endereço do Cliente</h2>
            </div>
            <Modal.Body className="p-4 text-center">
            {selectedPerson && (
              <>
                <p>CEP: <strong className='text-gray-700'>{selectedPerson.cep}</strong></p>
                <p>Endereço: <strong className='text-gray-700'>{selectedPerson.endereco}</strong></p>
                <p>Número: <strong className='text-gray-700'>{selectedPerson.numero}</strong></p>
                <p>Complemento: <strong className='text-gray-700'>{selectedPerson.complemento}</strong></p>
                <p>Bairro: <strong className='text-gray-700'>{selectedPerson.bairro}</strong></p>
                <p>Estado: <strong className='text-gray-700'>{selectedPerson.estado}</strong></p>
                <p>Cidade: <strong className='text-gray-700'>{selectedPerson.cidade}</strong></p>
              </>
            )}
            </Modal.Body>
            <Modal.Footer className="bg-gray-50 p-4">
              <Button 
                onClick={() => setOpenModal(false)} 
                className="bg-blue-500 text-white rounded py-1"
              >Fechar</Button>
            </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default List;