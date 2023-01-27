import React from 'react';
import './App.css';
import TodosPage from './pages/todosPage';
import LoginPage from './pages/loginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectIsLoggedIn } from './features/login/userLoginSlice';
import NavbarComp from './features/navbar/NavbarComp';

function App() {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
      <BrowserRouter>
        <NavbarComp/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/todos' element={isLoggedIn ? <TodosPage /> : <Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      {/* <TodosPage /> */}
      {/* <LoginPage /> */}
    </BrowserRouter>
  );
}

export default App;
