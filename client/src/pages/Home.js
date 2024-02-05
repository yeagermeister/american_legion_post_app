import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Weather from "../components/externalApis/weather";
import Tides from "../components/externalApis/tides";

// import HomeCarousel from "../components/carousel";

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
                    <h1>Home</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={4}>
                    <h1>Home</h1>
                </Col>
                <Col xs={12} lg={4}>
                    <h1>Home</h1>
                </Col>
                <Col xs={12} lg={4}>
                    <h1>Home</h1>
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default home;