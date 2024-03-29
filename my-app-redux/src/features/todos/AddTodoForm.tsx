import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {  Button, Col, Row } from 'react-bootstrap';
import { addTodo, getAllTodos, Todo } from './todosSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserLogin } from '../login/userLoginSlice';

const TodosSchema = Yup.object().shape({
    txt: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
  });

export default function AddTodoForm() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserLogin); 
  const id_user = users?.user?._id || ""; 

  return (
    <Formik
       initialValues={{
        txt: '',
       }}
       validationSchema={TodosSchema}
       onSubmit={(values, {resetForm}) => {
         // same shape as initial values
         const data = new Date();
         let obj: Todo = {
            _id: "",
            id_user: id_user,
            txt: values.txt,
            completed: "",
            data: data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear()
          };
          dispatch(addTodo(obj)).then(() => {
            dispatch(getAllTodos(id_user));
            resetForm();
          });
       }}
     >
       {({ errors, touched }) => (
         <Form >
            <Row className='p-3'>
                <Col xs={9}>
                    <Field name="txt" className="form-control" placeholder="Enter Todo..." /> 
                </Col>
                <Col xs={3}>
                <Button variant='dark' type="submit" className="form-control">Add</Button>
                </Col>
            </Row>
         </Form>
       )}
     </Formik>
  )
}
