import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useAppDispatch } from '../app/hooks';
import { getUserLogin } from '../features/login/userLoginSlice';

export default function LoginPage() {

  const inputEmail =  useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = () => {
    if(inputEmail.current?.value !== undefined && inputPassword.current?.value !== undefined) {
        let obj = {
            email: inputEmail.current?.value,
            password: inputPassword.current?.value
        }
        console.log(obj)
        dispatch(getUserLogin(obj))
        navigate('/todos'); 
    }
}

  return (
    <div className='sfondoLog'>
    <Container className='d-flex justify-content-center'>
    <Col xs={6}>
    <Card className='my-5 pb-4 myFormLog'>
        <Card.Body className='text-center'>
            <h1 className='my-3 text-center'>Login</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" ref={inputEmail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" ref={inputPassword} />
            </Form.Group> 
            <Col xs={6} className="buttonLog">
            <Button variant="primary" className='form-control' onClick={loginUser}>Login</Button>
            </Col>
            </Form>
        </Card.Body>
    </Card>
    </Col>
    </Container>
    </div>
  )
}
