import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
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
    
    axios.post('http://localhost:3000/auth/adminlogin', values)
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
    <div className='mainDiv'>
        <div className='subDiv'>
            <h2 className='titulo'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                      name='email' 
                      autoComplete='off' 
                      placeholder='Informe o email' 
                      onChange={(e) => setValues({...values, email : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="email">Senha</label>
                    <input type="password" 
                      name='email' 
                      autoComplete='off' 
                      placeholder='Informe a senha' 
                      onChange={(e) => setValues({...values, password : e.target.value})}
                    />
                </div>
                <button className='entrar'>Entrar</button>
                <div className='error'>
                  {error && error}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login