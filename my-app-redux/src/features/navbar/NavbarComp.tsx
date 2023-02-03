import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsLoggedIn, logout } from '../login/userLoginSlice';

function NavbarComp() {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn)


function userLogout() {
  dispatch(logout())
  navigate('/login')
}


  return (
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
                <Nav.Link className="nav-link" onClick={userLogout}>Logout</Nav.Link>
            </Nav> 
          }  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
