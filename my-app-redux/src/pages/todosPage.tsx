import React from 'react'
import { Card } from 'react-bootstrap'
import Todos from '../features/todos/Todos'

export default function TodosPage() {
  return (
    <div className='sfondoCard'>
      <Todos/>
      <Card.Footer className='fixed-bottom text-center'>
        <small className="text-muted">Website developed by <a className="link-ft" href="https://github.com/Davdag93" rel="noreferrer" target="_blank"> Davide D'Agostino</a> © 2023</small>
      </Card.Footer>
    </div>
  )
}
