import React, { useState, useEffect } from "react";
import { getTides } from "../../utils/API";
import { Card, Container } from "react-bootstrap";

const Tides = () => {

    const [tides, setTides] = useState([]);

    useEffect(() => {
        const fetchTides = async () => {
            try {
                const response = await getTides();

             const formattedTides = response.data.predictions.map(tide => {
                const date = new Date(tide.t);
                const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
                const trimmedV = parseFloat(tide.v).toFixed(1);
                const type = tide.type === 'H' ? 'high' : 'low';
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                return { ...tide, t: formattedTime, v: trimmedV, type: type, date: formattedDate};
            });
    
            setTides(formattedTides);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTides();
    }, []);

    return (
        <>
            <Container className="blueContainer">
            <Card className="myContainer">
                <Card.Header className="redContainer">
                    <h1>Tides</h1>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <table>
                            <tbody>
                            {tides.map((tide, i) => (
                                <tr key = {i}>
                                    <td>{tide.t}</td>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;{tide.v}</td>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;{tide.type}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="redContainer text-center">
                    {tides[0] && tides[0].date}
                </Card.Footer>
            </Card>
            </Container>
        </>
    );
}

export default Tides;