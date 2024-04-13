import React, { useState } from 'react';
import axios from 'axios';
import ModalError from '../Modal/ModalError';
import ModalSuccess from '../Modal/ModalSuccess';

function Create() {
  // formdata com os dados do cliente
  const [formData, setFormData] = useState({
    nome: '',
    sexo: '',
    data_nascimento: '',
    estado_civil: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    estado: '',
    cidade: '',
  });

  const token = localStorage.getItem('authToken');
  const headers = {
    'Authorization': `${token}`
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  // verifica as mudanças nos valores dos campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // verifica se todos os campos foram preenchidos
    const isAnyFieldEmpty = Object.values(formData).some(field => field === '');
    if (isAnyFieldEmpty) {
      setModalMessage('Por favor, preencha todos os campos.');
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/protected/create`, formData, {headers});
      
      setModalMessage('Usuário criado com sucesso!');
      setIsModalSuccessOpen(true);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.Error.includes('Já existe uma pessoa com esse nome.')) {
        setModalMessage('Já existe uma pessoa com esse nome. Por favor, escolha um nome diferente.');

      } else {
        setModalMessage('An error occurred: ' + error.message);
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 max-w-[1300px] ml-[80px]">
      <h2 className='mt-3 font-bold text-xl'>Cadastrar Cliente</h2>
      <div className="w-full p-3">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                Nome
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="nome" 
                type="text" 
                placeholder="Nome" 
                name='nome' 
                value={formData.nome} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mt-[-5px]">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sexo">
                Sexo
              </label>
              <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="sexo" 
                name='sexo' 
                value={formData.sexo} 
                onChange={handleChange}
              >
                <option>Selecione o sexo</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data_nascimento">
                Data de Nascimento
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="data_nascimento" 
                type="date" 
                name='data_nascimento'
                value={formData.data_nascimento} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado_civil">
                Estado Civil
              </label>
              <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="estado_civil" 
                name='estado_civil' 
                value={formData.estado_civil} 
                onChange={handleChange}
              >
                <option>Selecione o estado civil</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
              </select>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
                CEP
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="cep" 
                type="text" 
                placeholder="CEP" 
                name='cep' 
                value={formData.cep} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
                Endereço
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="endereco" 
                type="text" 
                placeholder="Endereço" 
                name='endereco' 
                value={formData.endereco} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
                Número
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="numero" 
                type="text" 
                placeholder="Número" 
                name='numero' 
                value={formData.numero} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complemento">
                Complemento
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="complemento" 
                type="text" 
                placeholder="Complemento" 
                name='complemento' 
                value={formData.complemento} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bairro">
                Bairro
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="bairro" 
                type="text" 
                placeholder="Bairro" 
                name='bairro' 
                value={formData.bairro} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                Estado
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="estado" 
                type="text" 
                placeholder="Estado" 
                name='estado' 
                value={formData.estado} 
                onChange={handleChange} 
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                Cidade
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="cidade" 
                type="text" 
                placeholder="Cidade" 
                name='cidade' 
                value={formData.cidade} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <ModalError isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
          <ModalSuccess isOpen={isModalSuccessOpen} message="Cliente cadastrado com sucesso!" onClose={() => setIsModalSuccessOpen(false)} />

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 }

export default Create