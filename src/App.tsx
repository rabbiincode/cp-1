import React from 'react';
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/home/Home';
import { Route, Routes } from 'react-router';
import Application from './components/application/Application';
import './_app.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className='body'>
        <Header/>
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Application/>} path='/application'/>
        </Routes>
      </div>
    </div>
  );
}

export default App;