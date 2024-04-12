import React from 'react';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Home from './components/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/Create/Create.jsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/create' element={<Create />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
