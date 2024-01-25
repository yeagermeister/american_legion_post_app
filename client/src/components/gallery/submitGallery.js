import {Form, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';
import {createGallery} from '../../utils/API';
import auth from '../../utils/auth';

function SubmitGallery( {createdGallery}) {
    const [galleryFormData, setGalleryFormData] = useState({
        title: '',
        date: '',
        summary: '',
        pics: [],
    });

    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(galleryFormData).forEach((key) => {
            if (key === 'pics') {
                Array.from(galleryFormData[key]).forEach((file, index) => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, galleryFormData[key]);
            }
        });

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log(data);
    
            setGalleryFormData({
                title: '',
                date: '',
                summary: '',
                pics: [],
            });
            window.location.reload();
        } catch (err) {
            console.error('Error adding the gallery item', err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'pics') {
            setGalleryFormData({ ...galleryFormData, [name]: files });
        } else {
            setGalleryFormData({ ...galleryFormData, [name]: value });
        }
    };

    return (
        <>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} encType='multipart/form-data'>
            <Alert diismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wroing
            </Alert>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Title'
                    name='title'
                    value={galleryFormData.title}
                    onChange={handleInputChange}
                    required
                />
                <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type='date'
                    placeholder='Date'
                    name='date'
                    value={galleryFormData.date}
                    onChange={handleInputChange}
                    required
                />
                <Form.Control.Feedback type='invalid'>Date is required!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Summary'
                    name='summary'
                    value={galleryFormData.summary}
                    onChange={handleInputChange}
                    required
                />
                <Form.Control.Feedback type='invalid'>Summary is required!</Form.Control.Feedback> 
            </Form.Group>
            <Form.Group>
                <Form.Label>Pics</Form.Label>
                <Form.Control
                    type='file'
                    accept='image/*'
                    multiple
                    name='pics'
                    onChange={handleInputChange}
                    required
                />
                <Form.Control.Feedback type='invalid'>Pics are required!</Form.Control.Feedback> 
            </Form.Group>      
            <Button
                disabled={!(galleryFormData.title && galleryFormData.date && galleryFormData.summary && galleryFormData.pics)}
                type='submit'
                variant='success'>
                Submit
            </Button>
        </Form>
        </>
    )
};

export default SubmitGallery;
