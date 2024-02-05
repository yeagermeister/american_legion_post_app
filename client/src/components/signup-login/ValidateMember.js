import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { getMemberId } from "../../utils/API";


const ValidateMember = (props) => {
    const [isMember, setIsMember] = useState(false);
    
    // const [member, setMember] = useState(null);


    // useEffect(() => {
    //   const checkMember = async () => {
    //     const response = await getMemberId();
    //     if (response) {
    //       setIsMember(true);
    //     } else {
    //       setIsMember(false);
    //     }
    //   };
    //   checkMember();
    // },  []);


    // set initial form state
    const [userFormData, setUserFormData] = useState({ memberID: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const response = await getMemberId(userFormData.memberID);
  
      if (response.ok) {
        setIsMember(true);
        setShowAlert(false);
        //Pass the member data back up to the signup page
        const memberData = response;
        props.onMemberData(memberData);
      } else {
        setIsMember(false);
        setShowAlert(true);
      }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    return (
        <>
          {/* This is needed for the validation functionality above */}
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Please enter a valid Member ID number!
            </Alert>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor='memberID'>Member ID#</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Your Member ID #'
                    name='memberID'
                    onChange={handleInputChange}
                    value={userFormData.memberID}
                    required
                />
                <Form.Control.Feedback type='invalid'>Member ID number is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!(userFormData.memberID)}
                type='submit'
                variant='success'>
                Submit
            </Button>
        </Form>
        </>
    )
};

export default ValidateMember;
