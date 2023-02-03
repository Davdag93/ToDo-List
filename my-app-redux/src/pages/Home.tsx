import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import bosco from '../img/sfondopage.jpeg'

export default function Home() {
  return (
    <div className=' sfondoHome text-center'>
      <Container>
        <Row>
        <Col md={7}>
            <Container>
              <div>
              <img src={bosco} className="mt-5" alt="img home" style={{width: "90%", height: "420px",borderRadius:"30px", backgroundColor:"rgba(255,255,255,0.1)"}}/>
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
