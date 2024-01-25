import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const admin= () => {
    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h1>Edit Users</h1>
                    <Link to="/users">Admin</Link>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col>
                    <h1>Edit News</h1>
                    <Link to="/admin">Admin</Link>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col>
                    <h1>Edit Calendar</h1>
                    <Link to="/admin">Admin</Link>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col>
                    <h1>Edit Gallery</h1>
                    <Link to="/admin">Admin</Link>
                </Col>
            </Row>
        </Container>
        </>
    )
}
export default admin