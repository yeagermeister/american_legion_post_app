import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Weather from "../components/externalApis/weather";
import Tides from "../components/externalApis/tides";


const home = () => {
    return (
        <>
        <Container>
            <Row>
                <Col xs={12} lg={4}>
                    <Weather />
                </Col>
                <Col xs={12} lg={4}>
                    <Tides />
                </Col>
                <Col xs={12} lg={4}>
                    <h1></h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={4}></Col>
                <Col xs={12} lg={4}>
                    <a href="https://post291.org/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </Col>
                <Col xs={12} lg={4}></Col>
            </Row>
                        <Row>
                <Col xs={12} lg={4}>
                  <a href="https://post291.org/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </Col>
                <Col xs={12} lg={4}>
                    <a href="https://post291.org/csae.html" target="_blank" rel="noopener noreferrer">CSAE Policy</a>
                </Col>
                <Col xs={12} lg={4}>
                    <p>Have a question or need support on the webpage or the post app?  Contact <a href="mailto:johnyeager75@gmail.com">John Yeager</a></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={4}></Col>
                <Col xs={12} lg={4}>
                    <p>Have a question or need support on the webpage or the post app?  Contact <a href="mailto:johnyeager75@gmail.com">John Yeager</a></p>
                </Col>
                <Col xs={12} lg={4}></Col>
            </Row>
        </Container>
        </>
    )
};

export default home;