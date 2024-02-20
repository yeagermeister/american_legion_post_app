import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Collapsible from "react-collapsible";

import { updateGallery } from "../../utils/API";

const UpdateGallery = ({ id, onGalleryUpdate }) => {
    const [galleryItems, setGalleryItems] = useState({
        id: id,
        title: "",
        summary: "",
    });
    
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedGalleryItems = { ...galleryItems };
            console.log(updatedGalleryItems);
            const response = await updateGallery(updatedGalleryItems);
            onGalleryUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGalleryItems({ ...galleryItems, [name]: value });
    };

    return (
        <>
            <Collapsible trigger="Edit Article" className="h2" triggerOpenedClassName="h2">
                <Form onSubmit={handleSubmit}>
                    <Alert
                        diismissible
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                        variant="danger"
                    >
                        Something went wroing
                    </Alert>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
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
                            name="summary"
                            onChange={handleInputChange}
                            placeholder="Enter Summary"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a summary.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Collapsible>
        </>
    );
};

export default UpdateGallery;