import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Form} from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserLogin, selectIsLoggedIn } from '../features/login/userLoginSlice';

export default function LoginPage() {

  const inputEmail =  useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
        navigate('/todos');
        }
    }, [isLoggedIn, navigate]);

   const loginUser = () => {
    if(inputEmail.current?.value !== undefined && inputPassword.current?.value !== undefined) {
        let obj = {
            email: inputEmail.current?.value,
            password: inputPassword.current?.value
        }
        dispatch(getUserLogin(obj));
    }
} 


  return (
    <div className='sfondoLog'>
    <Container className='d-flex justify-content-center'>
    <Col md={4}>
    <Card className='my-5 pb-4 myFormLog'>
        <Card.Body className='text-center'>
            <p className='my-3 text-center txtLogReg'>Login</p>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" ref={inputEmail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" ref={inputPassword} />
            </Form.Group> 
            <Col xs={6} className="buttonLog">
            <Button variant="primary" className='form-control' onClick={loginUser}>Sign in</Button>
            </Col>
            </Form>
        </Card.Body>
    </Card>
    </Col>
    </Container>
    <Card.Footer className='fixed-bottom text-center'>
        <small className="text-muted">Website developed by <a className="link-ft" href="https://github.com/Davdag93" rel="noreferrer" target="_blank"> Davide D'Agostino</a> © 2023</small>
    </Card.Footer>
    </div>
  )
}
