import React, {useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import auth from "../../utils/auth";
import { createCalendar } from "../../utils/API";
// import "flatpickr/dist/themes/material_green.css";
// import Flatpickr from "react-flatpickr";


const CreateCalendar = () => {
    const [calendarItems, setCalendarItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedCalendarItems = { ...calendarItems};
            console.log(updatedCalendarItems);
            const response = await createCalendar(updatedCalendarItems);
            const data = await response.json();
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCalendarItems({ ...calendarItems, [name]: value });
    };  

    return (
        <>
        {auth.isAdmin() ? (
            <>
            <Form onSubmit={handleSubmit} className="blueContainer">
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wroing
                </Alert>
                    <Form.Group>
                        <Form.Label>What is title of the event?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                onChange={handleInputChange}
                                // value={specialFormData.menuText}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Title is required!
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter a summary for the event</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Summary"
                                name="summary"
                                onChange={handleInputChange}
                                // value={specialFormData.cost}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Summary is required!
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>What date will this event occur?</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date"
                        name="date"
                        onChange={handleInputChange}
                        // value={specialFormData.serveDate}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Date is required!
                    </Form.Control.Feedback>
                    <Form.Label>What time will this event occur?</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Time"
                        name="time"
                        onChange={handleInputChange}
                        // value={specialFormData.serveDate}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Time is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button type="submit" variant="success" className="redButton">
                        Submit
                    </Button>
                </div>
            </Form>
            </>
    ) : null } 
    </>

    )
};

export default CreateCalendar;
