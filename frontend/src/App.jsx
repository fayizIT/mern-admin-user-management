import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet,useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';

const App = () => {
  const location = useLocation()
  const isAdminSide = location.pathname.startsWith("/admin" );
  return (
    <>
      {isAdminSide ? <AdminHeader/> : <Header/>}
      
      <ToastContainer/>
      <Container className='my-2'>
        <Outlet/> 
      </Container>
    </>
  )
}

export default App;