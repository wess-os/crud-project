import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post(`${import.meta.env.VITE_REACT_APP_API}/auth/adminlogin`, values)
      .then(result => {
        if(result.data.loginStatus) {
          navigate('/dashboard');
        } else {
          setError(result.data.Error);
        }
      }) .catch(
        err => console.log(err)
      );
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-200 font-sans'>
      <div className='bg-white p-10 rounded-lg shadow-md w-88'>
          <h2 className='text-center mb-5 mt-[-5px] text-2xl font-bold'>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className='ml-[-10px]'>Email</label>
              <input type="email" 
              name='email' 
              autoComplete='off' 
              placeholder='Informe o email' 
              onChange={(e) => setValues({...values, email : e.target.value})}
              className='w-full p-2 mb-5 border border-gray-300 rounded-md ml-[-10px]'
              />
            </div>
            <div>
              <label htmlFor="password" className='ml-[-10px]'>Senha</label>
              <input type="password" 
              name='password' 
              autoComplete='off' 
              placeholder='Informe a senha' 
              onChange={(e) => setValues({...values, password : e.target.value})}
              className='w-full p-2 mb-5 border border-gray-300 rounded-md ml-[-10px]'
              />
            </div>
            <button className='w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-700 mt-5'>Entrar</button>
            <div className='text-red-600 mt-2 text-center'>
              {error && error}
            </div>
          </form>
      </div>
    </div>
  )
}

export default Login