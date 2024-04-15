import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import DataTable from "react-data-table-component";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalError from '../Modal/ModalError';
import ModalSuccess from '../Modal/ModalSuccess';
import ModalConfirm from '../Modal/ModalConfirm';

function Home() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // modal de ver endereço
  const handleOpenModal = (person) => {
    setSelectedPerson(person);
    setOpenModal(true);
  };

  // modal de editar
  const handleOpenEditModal = (person) => {
    setSelectedPerson(person);
    setOriginalData(person);
    setOpenEditModal(true);
  };

  // pega o token para autorização
  const token = localStorage.getItem('authToken');
  const headers = {
    'Authorization': `${token}`
  };

  // comunicação com o backend para listar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API}/protected/list`, { headers });

        if (response.ok) {
          const data = await response.json();

          if (data.Status && Array.isArray(data.Pessoas)) {
            setData(data.Pessoas);
            
          } else {
            console.error('Os dados recebidos não são um array:', data);
          }
        } else if (response.status === 401) {
          console.error('Acesso não autorizado, redirecionando para login...');
          window.location.href ='/adminlogin';
        } else {
          console.error('Erro ao buscar dados:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  },[]);

  const filteredData = data.filter(
    item => item?.nome?.toLowerCase().includes(filterText.toLowerCase())
  );

  // comunicação com o backend para editar
  const handleSaveChanges = async () => {

    const isValid = Object.values(selectedPerson).every(value => value !== '');
    
    // verifica se tem algum campo vazio
    if (!isValid) {
      setModalMessage('Por favor, preencha todos os campos.');
      setIsModalOpen(true);
      return;
    }

    // verifica se os dados permaneceram os mesmos
    if (JSON.stringify(selectedPerson) === JSON.stringify(originalData)) {
      setModalMessage('Nenhuma alteração foi feita.');
      setIsModalOpen(true);
      return;
    }

    const url = `${import.meta.env.VITE_REACT_APP_API}/protected/update/${selectedPerson.id}`;

    try {
      const response = await fetch(url, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(selectedPerson),
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const data = await response.json();

      if (data.Status) {

        setData(prevData => prevData.map(person => 
          person.id === selectedPerson.id ? selectedPerson : person
        ));

        setModalMessage('Cliente atualizado com sucesso!');
        setOriginalData(selectedPerson);
        setIsModalSuccessOpen(true);
      } else {
        setModalMessage('Erro ao salvar as alterações.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('Erro ao salvar as alterações.');
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirmDialog(true);
  };

  // comunicação com o backend para deletar
  const handleDeleteConfirm = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API}/protected/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar a pessoa');
      }
  
      const data = await response.json();
  
      if (data.Status) {
        setData(prevData => prevData.filter(person => person.id !== id));

        setModalMessage('Pessoa deletada com sucesso!');
        setIsModalSuccessOpen(true);
      } else {
        setModalMessage('Erro ao deletar a pessoa.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('Erro ao deletar a pessoa.');
      setIsModalOpen(true);
    }
  };

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
    },
    {
      name: 'Editar',
      cell: row => (
        <EditIcon className='text-yellow-500 border-none' onClick={() => handleOpenEditModal(row)} />
      ),
    },
    {
      name: 'Deletar',
      cell: row => (
        <DeleteForeverIcon className='text-red-500 border-none' onClick={() => handleDelete(row.id)} />
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
        className="fixed inset-0 flex items-center justify-center z-50 mt-[-100px] ml-[200px] mr-[200px]"
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

      <Modal 
        show={openEditModal} 
        onClose={() => setOpenEditModal(false)} 
        className="fixed inset-0 flex items-center justify-center z-50 mt-[-50px] ml-[200px] mr-[200px]"
        >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
          <div className="bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-center">Editar Informações do Cliente</h2>
          </div>

          <Modal.Body className="p-4">
            {selectedPerson && (
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">Nome</label>
                    <input 
                      type="text" 
                      value={selectedPerson.nome} 
                      onChange={e => setSelectedPerson({...selectedPerson, nome: e.target.value})} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
              
                  <div className="w-full md:w-1/2 px-3 mt-[5px]">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sexo">Sexo</label>
                    <select 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="sexo" 
                      name='sexo' 
                      value={selectedPerson.sexo}
                      onChange={e => setSelectedPerson({...selectedPerson, sexo: e.target.value})}
                    >
                      <option>Selecione o sexo</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  </div>
              
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data_nascimento">
                      Data de Nascimento
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="data_nascimento" 
                      type="date" 
                      name='data_nascimento'
                      value={selectedPerson.data_nascimento}
                      onChange={e => setSelectedPerson({...selectedPerson, data_nascimento: e.target.value})}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado_civil">
                      Estado Civil
                    </label>
                    <select 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="estado_civil" 
                      name='estado_civil' 
                      value={selectedPerson.estado_civil} 
                      onChange={e => setSelectedPerson({...selectedPerson, estado_civil: e.target.value})}
                    >
                      <option>Selecione o estado civil</option>
                      <option value="solteiro">Solteiro(a)</option>
                      <option value="casado">Casado(a)</option>
                      <option value="divorciado">Divorciado(a)</option>
                      <option value="viuvo">Viúvo(a)</option>
                    </select>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
                      CEP
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="cep" 
                      type="text" 
                      placeholder="CEP" 
                      name='cep' 
                      value={selectedPerson.cep} 
                      onChange={e => setSelectedPerson({...selectedPerson, cep: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
                      Endereço
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="endereco" 
                      type="text" 
                      placeholder="Endereço" 
                      name='endereco' 
                      value={selectedPerson.endereco} 
                      onChange={e => setSelectedPerson({...selectedPerson, endereco: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
                      Número
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="numero" 
                      type="text" 
                      placeholder="Número" 
                      name='numero' 
                      value={selectedPerson.numero} 
                      onChange={e => setSelectedPerson({...selectedPerson, numero: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complemento">
                      Complemento
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="complemento" 
                      type="text" 
                      placeholder="Complemento" 
                      name='complemento' 
                      value={selectedPerson.complemento} 
                      onChange={e => setSelectedPerson({...selectedPerson, complemento: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bairro">
                      Bairro
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="bairro" 
                      type="text" 
                      placeholder="Bairro" 
                      name='bairro' 
                      value={selectedPerson.bairro} 
                      onChange={e => setSelectedPerson({...selectedPerson, bairro: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                      Estado
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="estado" 
                      type="text" 
                      placeholder="Estado" 
                      name='estado' 
                      value={selectedPerson.estado} 
                      onChange={e => setSelectedPerson({...selectedPerson, estado: e.target.value})} 
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[5px]">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                      Cidade
                    </label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="cidade" 
                      type="text" 
                      placeholder="Cidade" 
                      name='cidade' 
                      value={selectedPerson.cidade} 
                      onChange={e => setSelectedPerson({...selectedPerson, cidade: e.target.value})} 
                    />
                  </div>
                </div>
              </form>
              )}
            </Modal.Body>

            <Modal.Footer className="bg-gray-50 p-4">
              <Button 
                onClick={() => setOpenEditModal(false)} 
                className="bg-blue-500 text-white rounded py-1"
              >Fechar</Button>
              <Button 
                onClick={handleSaveChanges} 
                className="bg-green-500 text-white rounded py-1 ml-2"
              >Salvar</Button>
            </Modal.Footer>

            <ModalError isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
            <ModalSuccess isOpen={isModalSuccessOpen} message="Cliente atualizado com sucesso!" onClose={() => setIsModalSuccessOpen(false)} />
        </div>
      </Modal>

      <ModalConfirm
        show={showConfirmDialog}
        onConfirm={() => {
          handleDeleteConfirm(pendingDeleteId);
          setShowConfirmDialog(false);
        }}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  );
}

export default Home;