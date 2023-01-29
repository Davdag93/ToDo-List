import React from 'react';
import './App.css';
import TodosPage from './pages/todosPage';
import LoginPage from './pages/loginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectIsLoggedIn } from './features/login/userLoginSlice';
import NavbarComp from './features/navbar/NavbarComp';
import Signup from './pages/Signup';

function App() {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    
      <BrowserRouter>
           <NavbarComp/>
          
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/todos' element={isLoggedIn ? <TodosPage /> : <Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </BrowserRouter>
     
  );
}

export default App;
