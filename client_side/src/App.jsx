import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Context from './contexts/Context';
import CreateExpense from './components/CreateExpense';

const App = () => {
  return (
    <Context>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/create-expense' element={<CreateExpense/>}/>
      </Routes> 
    </BrowserRouter>
    </Context>
  )
}

export default App
