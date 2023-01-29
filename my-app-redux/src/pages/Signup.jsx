import React from "react";
import { Alert, Button, Card, Col, Container } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
});

export default function Signup() {

  const navigate = useNavigate();


  const saveUser = (obj) => {
    axios.post('http://localhost:3000/register', obj).then(response => {
        console.log(response.statusText).then(
        navigate("/todos"));
    });
  }

  return (
    <div className="sfondoLog bene">
      
      <Container className='d-flex justify-content-center'>
        <Col md={4}>
          <Col >
        <Card className=' pb-4 myFormLog'>
        <p className="my-3 text-center txtLogReg">Register</p>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            saveUser(values);
          }}
        >
          {({ errors, touched }) => (
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
              <Col xs={6} className="buttonLog">
                <Button variant="success" className='form-control'>Sign up</Button>
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
}
