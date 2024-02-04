import { Card, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";

import CreateCalendar from "../components/calendar/createCalendar";
import DeleteCalendar from "../components/calendar/deleteCalendar";

import { getCalendar } from "../utils/API";
import { AuthContext } from "../utils/authContext";

const Calendar = () => {
    const [calendar, setCalendar] = useState([]);
    const { isAdmin }= useContext(AuthContext);

    useEffect(() => {
        const fetchCalendar = async () => {
            try {
                const response = await getCalendar();
                setCalendar(response.data.calendar);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCalendar();
    }, []);

    return (
        <Row>
            <h1>Calendar</h1>
            {isAdmin && (
                <Col w="100" md={12} >
                    <Collapsible
                        trigger="Submit a new event"
                        className="h2"
                        triggerOpenedClassName="h2"
                    >
                        <CreateCalendar />
                    </Collapsible>
                </Col>
            )}
            <Col md={4} className="blueContainer">
            {calendar.length > 0 ? (
                calendar.map((calendarItem, index) => (
                    <Card key={index} className="myContainer">
                        <Card.Header className="redContainer">
                            {new Date(calendarItem.date).toLocaleDateString(
                                "en-US"
                            )}
                            &nbsp;&nbsp;{new Date(`1970-01-01T${calendarItem.time}Z`).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                            &nbsp;&nbsp;{calendarItem.title}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{calendarItem.summary}</Card.Text>
                        </Card.Body>
                        {isAdmin ? (
                            <>
                                <DeleteCalendar id={calendarItem._id} />
                            </>
                        ) : null}
                    </Card>
                ))
            ) : (
                <h3>No Calendar Items Yet</h3>
            )}
            </Col>
        </Row>
    )
};

export default Calendar;

