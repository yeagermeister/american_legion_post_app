import React from "react";
import { Button } from "react-bootstrap";
import { deleteCalendar } from "../../utils/API";

const DeleteCalendar = ( { id, onCalendarUpdate } ) => {
    const handleDelete = async (event) => {
        console.log(id);
        event.preventDefault();
        try {
            const response = await deleteCalendar(id);
            onCalendarUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center redContainer">
            <Button 
                className="blueButton"
                variant="primary"
                type="submit"
                onClick={handleDelete}
            >
                Delete Event
            </Button>
        </div>
    );
};

export default DeleteCalendar;

