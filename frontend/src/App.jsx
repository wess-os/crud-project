import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Home from './components/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/Create/Create.jsx';
import List from './components/List/List.jsx';
import Edit from './components/Edit/Edit.jsx';
import Delete from './components/Delete/Delete.jsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/create' element={<Create />}></Route>
        <Route path='/dashboard/list' element={<List />}></Route>
        <Route path='/dashboard/edit' element={<Edit />}></Route>
        <Route path='/dashboard/delete' element={<Delete />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
