import { Container, Card } from 'react-bootstrap'
import AddTodoForm from './AddTodoForm'
import Todolist from './Todolist'

export default function Todos() {

  return (
    <Container>
      <Card className='myForm'>
        <AddTodoForm />
      </Card>
      <Card className='mt-4'>
        <Todolist />
      </Card>
    </Container>
  )
}
