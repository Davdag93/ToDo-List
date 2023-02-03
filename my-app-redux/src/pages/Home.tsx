import React from 'react'
import { Container, Col, Row, Card } from 'react-bootstrap'
import todoimg from '../img/todo.png'

export default function Home() {
  return (
    <div className=' sfondoHome text-center'>
      <Container>
        <Row>
        <Col md={5}>
          <h1 className='mt-5 mb-5 str-descriptionHome'>Tieni <b className='b-txt-Home'>tutto sotto controllo</b> <span className='b-txt-Home'>con</span> <b className='b-txt-Home'>TryList App</b>, crea la tua <b>lista To-do</b> e di addio alle dimenticanze!</h1>
          <h2 className='str-registerHome'><a href="/register">Registrati ora!</a></h2>
        </Col>
        <Col md={7}>
            <Container>
              <div className='my-4'>
                <img src={todoimg} className="mt-5 imgHome" alt="img home" />
              </div>
            </Container>
        </Col>
        </Row>
      </Container>
      <Card.Footer className='fixed-bottom'>
        <small className="text-muted">Website developed by Davide D'Agostino ©</small>
      </Card.Footer>
    </div>
  )
}
