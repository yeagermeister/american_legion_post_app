import React, { useState, useEffect } from "react";
import { getWeather } from "../../utils/API";
import { Card, Container } from "react-bootstrap";

const Weather = () => {

    const [weather, setWeather] = useState({});

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await getWeather();
                setWeather(response.data.properties.periods[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchWeather();
    }, []);

    console.log(weather);

    return (
        <Container className="blueContainer">
            <Card className="myContainer">
                <Card.Header className="redContainer">
                    <h1>Weather</h1>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>Temperature: {weather.temperature} &deg;</p>
                        {/* <p>Humidity: {weather.relativeHumidity.value} %</p> */}
                        <p>Wind Direction: {weather.windDirection} @ {weather.windspeed}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="redContainer">
                    {weather.shortForecast}
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Weather;

