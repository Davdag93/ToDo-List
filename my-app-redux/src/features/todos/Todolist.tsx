import { useEffect } from 'react'
import { Card, Alert, ListGroup, Button, Col } from 'react-bootstrap';
import { TrashFill, CheckSquareFill } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { completeTodo, deleteTodo, getAllTodos, selectError, selectLoading, selectTodolist, Todo } from './todosSlice';

/* const selectLoading = (state: RootState) => state.todos.loading; */

export default function Todolist() {

    /* const loading = useAppSelector((state: RootState) => state.todos.loading) */
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const todos = useAppSelector(selectTodolist)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [])

  return (
    <Card.Body className='text-center'>
        {loading && <Spinner animation="grow" />}
        {error && <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! {error}</Alert.Heading>
          </Alert>}
        <ListGroup variant="flush">
          {todos.map((t: Todo, i: number) => (
            <ListGroup.Item key={i} className={'d-flex justify-content-between '}>
              <span className='date'>{t.data}</span>
            <Col xs={7}>
              <span className={t.completed}>{t.txt}</span>
            </Col>
              <span>
                <Button variant='success' className='btn-sm mx-1' onClick={() => dispatch(completeTodo(t))}><CheckSquareFill /></Button>
                <Button variant='danger' className='btn-sm mx-1'  onClick={() => t.id ? dispatch(deleteTodo(t.id)) : false}><TrashFill /></Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
  )
}
