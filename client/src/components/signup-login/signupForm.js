import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from "../../utils/API";
import { AuthContext } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
    const { member } = props;
     // set initial form state
     const [userFormData, setUserFormData] = useState({ username: '', email: member.email, password: '',name: member.name, org: member.org, memberID: member.memberID });
     // set state for form validation
     const [validated] = useState(false);
     // set state for alert
     const [showAlert, setShowAlert] = useState(false);

     const { login } = useContext(AuthContext);
     const navigate = useNavigate();

     const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
   
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
           
          const response = await createUser(userFormData);
          if (!response.statusText==="OK") {
      
            const update = await response.text; // Get the response body as text
            throw new Error(`Something went wrong: ${update}`);
          }
    
          const { token, user } = await response.data;

          login(token);
          navigate('/');
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };

      return (
        <>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
          </Alert>
  
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
            <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>

          </Form.Group>          
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='name'>Please enter your full name: (Make any corrections you would like)</Form.Label>
            <Form.Control
              type='text'
              name='name'
              onChange={handleInputChange}
              value={userFormData.name}
              required
            />
            <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
          </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password (must be at least 8 characters)</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>
        </>
      )
};

export default SignupForm;