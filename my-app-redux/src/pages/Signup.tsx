import { Formik, Form, Field} from 'formik';
import React, { useEffect } from "react";
import { Alert, Button, Card, Col, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLoggedIn } from "../features/login/userLoginSlice";
import { saveUser } from "../features/register/userRegisterSlice";


const regexPassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().matches(
    regexPassword,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ).required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required"),
  acceptTerms: Yup.boolean().required().oneOf([true], 'Accept terms is required')
});


interface MyFormValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  acceptTerms: boolean,
  role: string
}

export const Signup: React.FC<{}> = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const initialValues: MyFormValues = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role: 'user'
   };

 
  useEffect(() => {
    if (isLoggedIn){
          navigate("/todos");
    }}, [isLoggedIn, navigate])
  
  return (
    <div className="sfondoLog">
      
    <Container className='d-flex justify-content-center'>
      <Col md={4}>
        <Col >
      <Card className=' pb-4 myFormLog'>
      <p className="my-3 text-center txtLogReg">Register</p>


      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(saveUser({ ...values }));
            setSubmitting(false);
            resetForm();
            navigate('/todos');
        }}
      >

        {({ isSubmitting, errors, touched }) => (
        <Form className=" px-3">
        <Field
                name="firstName"
                className="form-control mb-3"
                placeholder="Firstname..."
              />
              {errors.firstName && touched.firstName ? (
                <Alert className="alertCustom" variant={"danger"}> {errors.firstName} </Alert>
              ) : null}

              <Field
                name="lastName"
                className="form-control mb-3"
                placeholder="Lastname..."
              />
              {errors.lastName && touched.lastName ? (
               <Alert className="alertCustom" variant={"danger"}> {errors.lastName} </Alert>
              ) : null}  
              <Field
                name="email"
                type="email"
                className="form-control mb-3"
                placeholder="Email..."
              />
              {errors.email && touched.email ? (
                <Alert className="alertCustom" variant={"danger"}> {errors.email} </Alert>
              ) : null}
              <Field
                name="password"
                type="password"
                className="form-control mb-3"
                placeholder="Password..."
              />
              {errors.password && touched.password ? (
                <Alert className="alertCustom" variant={"danger"}> {errors.password} </Alert>
              ) : null}
              <Field
                name="confirmPassword"
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password..."
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Alert className="alertCustom" variant={"danger"}> {errors.confirmPassword} </Alert>
              ) : null}
              <label>
                <Field 
                type="checkbox" 
                name="acceptTerms" 
                className="form-check-input mx-2 mb-3"
                />
                Accept <a className="privacy" href="#:void" target="_black">terms and conditions</a>
              </label>
              {errors.acceptTerms && touched.acceptTerms ? (
                <Alert className="alertCustom mb-3" variant={"danger"}> {errors.acceptTerms} </Alert>
              ) : null}
              <Col xs={6} className="buttonLog">
                <Button variant="success" type="submit" disabled={isSubmitting} className='form-control'>Sign up</Button>
              </Col>
        </Form>
        )}
        
      </Formik>
      </Card>
        </Col>
        </Col>
      </Container>
      </div>
  );
};

export default Signup;
