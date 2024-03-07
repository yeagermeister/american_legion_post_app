import { Card, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";

import CreateCalendar from "../components/calendar/createCalendar";
import DeleteCalendar from "../components/calendar/deleteCalendar";

import { getCalendar } from "../utils/API";
import { AuthContext } from "../utils/authContext";

const Calendar = () => {
    const [calendar, setCalendar] = useState([]);
    const [collapsibleKey, setCollapsibleKey] = useState(0);
    const { admin }= useContext(AuthContext);

    const fetchCalendar = async () => {
        try {
            const response = await getCalendar();
            setCalendar(response.data.calendar);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCalendarUpdate = () => {
        fetchCalendar();
        setCollapsibleKey(prevKey => prevKey + 1); // Increment key to force Collapsible to close
    };

    useEffect(() => {
        fetchCalendar();
    }, []);

    console.log("Calendar: ", calendar);
    return (
        <Row>
            <h1>Calendar</h1>
            {admin && (
                <Col w="100" md={12} >
                    <Collapsible
                        key={collapsibleKey}
                        trigger="Submit a new event"
                        className="h2"
                        triggerOpenedClassName="h2"
                    >
                        <CreateCalendar onCalendarUpdate={handleCalendarUpdate}/>
                    </Collapsible>
                </Col>
            )}
            <Col md={4} className="blueContainer">
            {calendar.length > 0 ? (
                calendar
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((calendarItem, index) => (
                    <Card key={index} className="myContainer">
                        <Card.Header className="redContainer">
                            {new Date(calendarItem.date).toLocaleDateString(
                                "en-US",
                                {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit", 
                                }
                            )}
                            &nbsp;&nbsp;{calendarItem.title}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{calendarItem.summary}</Card.Text>
                        </Card.Body>
                        {admin ? (
                            <>
                                <DeleteCalendar id={calendarItem._id} onCalendarUpdate={handleCalendarUpdate}/>
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

