import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import HomePage from './components/home';
import LoginPage from './components/auth/login';
import RegistrPage from './components/auth/register';
import AddPage from './components/auth/add';
import DefaultLayout from './components/Containers/default';

function App() {
  return (
    //Система маршрутів
    <>
    <Routes>
        <Route path="/" element ={<DefaultLayout/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path="login" element={<LoginPage/>}></Route>
          <Route path="register" element={<RegistrPage/>}></Route>
          <Route path="add" element={<AddPage/>}></Route>
        </Route>
    </Routes>
    </>
  );
}

export default App;
