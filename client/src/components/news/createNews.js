import React , { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import auth from '../../utils/auth';
import { createNews } from '../../utils/API';

const CreateNews = () => {

    const [newsItems, setNewsItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedNewsItems = { ...newsItems, date: new Date() };
            const response = await createNews(updatedNewsItems);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewsItems({ ...newsItems, [name]: value });
    }
    
    return (
        <>
        {auth.isAdmin() ? (
            <Form onSubmit={handleSubmit} className="blueContainer" >
                <Alert diismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wroing
                </Alert>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='title'
                        onChange={handleInputChange} 
                        placeholder="Enter Title" 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a title.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Summary</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='summary'
                        onChange={handleInputChange} 
                        placeholder="Enter Summary" 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a summary.
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button className='redButton' variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        ) : null}
            </>   
    )
}

export default CreateNews;