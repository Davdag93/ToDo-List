import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import todoimg from '../img/todo.png'

export default function Home() {
  return (
    <div className=' sfondoHome text-center'>
      <Container>
        <Row>
        <Col md={7}>
            <Container>
              <div className='my-4'>
              <img src={todoimg} className="mt-5 imgHome" alt="img home" />
              </div>
            </Container>
        </Col>
        <Col md={5}>
        <h1 className='mt-5 mb-5'  style={{paddingTop:"10%"}}>Tieni <b style={{color:"#f39c12"}}>tutto sotto controllo</b> con <b style={{color:"#f39c12"}}>TryList App</b>, crea la tua <b>lista To-do</b> e di addio alle dimenticanze!</h1>
        <h2>Registrati ora!</h2>
        </Col>
        
        </Row>
      </Container>
    </div>
  )
}
