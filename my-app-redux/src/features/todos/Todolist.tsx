import { useEffect } from 'react'
import { Card, ListGroup, Button, Col, Placeholder } from 'react-bootstrap';
import { TrashFill, CheckSquareFill } from 'react-bootstrap-icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserLogin } from '../login/userLoginSlice';
import { completeTodo, deleteTodo, getAllTodos, selectLoading, selectTodolist, Todo } from './todosSlice';


export default function Todolist() {

    /* const loading = useAppSelector((state: RootState) => state.todos.loading) */
  const loading = useAppSelector(selectLoading)
  const todos = useAppSelector(selectTodolist)
  
  const arr = todos;
  const dispatch = useAppDispatch();
  
  const users = useAppSelector(selectUserLogin); 
  const id_user:number = users?.user?._id || ""; 
  
  useEffect(() => {
    dispatch(getAllTodos(id_user));
  }, [dispatch, id_user]);



  return (
    <Card.Body className='text-center'>
        {loading &&   
        <>    
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        </>
        }
        <ListGroup variant="flush ">
          {id_user &&
          arr.map((t:Todo, i:number) => (
            <ListGroup.Item key={i} className={'d-flex justify-content-between myForm'}>
              <span className='date'>{t.data}</span>
            <Col xs={7}>
              <span className={t.completed}>{t.txt}</span>
            </Col>
              <span>
                <Button variant='success' className='btn-sm mx-1 mb-1' onClick={() => dispatch(completeTodo(t))}><CheckSquareFill /></Button>
                <Button variant='danger' className='btn-sm mx-1 mb-1'  onClick={() => t.id_user ? dispatch(deleteTodo(t.id_user)) : false}><TrashFill /></Button>
              </span>
          
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    )
}
