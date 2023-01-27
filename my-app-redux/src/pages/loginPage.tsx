import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Container, Form } from 'react-bootstrap'
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
    <Container style={{width: "600px"}}>
    <Card className='my-5'>
        <Card.Body className='text-center'>
            <h1 className='my-3 text-center'>Login</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" ref={inputEmail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" ref={inputPassword} />
            </Form.Group> 
            <Button variant="primary" onClick={loginUser}>Login</Button>
            </Form>
        </Card.Body>
    </Card>
    </Container>
  )
}
