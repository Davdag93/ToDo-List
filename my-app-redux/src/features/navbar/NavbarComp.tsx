import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsLoggedIn, logout } from '../login/userLoginSlice';
import { selectUserLogin } from '../login/userLoginSlice';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NavbarComp() {
 
  const users = useAppSelector(selectUserLogin); 

  const name = users?.user?.firstName || "";  
 
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  function userLogout() {
    handleClose()
    dispatch(logout())
    navigate('/login')
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Navbar className="nav-cust" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className='nav-link logo fs-5'>TryList App</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/todos" className='nav-link page-todo-nav'>Todo</Link>
          </Nav>
          {!isLoggedIn ? 
            <Nav>
              <Link to="/login" className='nav-link'>Login</Link>
              <Link to="/register" className='nav-link'>Register</Link> 
            </Nav> 
            : 
            <Nav>
                <Link to="/profile" className='nav-link name-profile-nav'>Hello {name}</Link>
                <Nav.Link className="nav-link" onClick={handleShow}>Logout</Nav.Link>
            </Nav> 
          }  
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout TryList App</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo,te ne vai senza salutare? A presto!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Rimango
          </Button>
          <Button variant="primary" onClick={userLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarComp;
