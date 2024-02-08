import React, {useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { createCalendar } from "../../utils/API";

const CreateCalendar = (props) => {
    const [calendarItems, setCalendarItems] = useState({
        title: "",
        summary: "",
        date: new Date(),
        time: new Date()
    });
    
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedCalendarItems = { ...calendarItems};
            updatedCalendarItems.date = new Date(updatedCalendarItems.date + 'T' + updatedCalendarItems.time);
            const response = await createCalendar(updatedCalendarItems);
            props.onCalendarUpdate();
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
                            />
                </Form.Group>
                <Form.Group>
                    <Form.Label>What date will this event occur?</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date"
                        name="date"
                        onChange={handleInputChange}
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
    )
};

export default CreateCalendar;
