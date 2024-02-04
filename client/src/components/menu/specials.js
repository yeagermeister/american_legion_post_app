import { getSpecials } from "../../utils/API";
import { deleteSpecial } from "../../utils/API";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import auth from "../../utils/auth";

function Specials(props) {
    // const authService = new AuthService();
    const userRole = auth.isAdmin() ? "admin" : "user";

    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const fetchSpecials = async () => {
            try {
                const response = await getSpecials();
                const now = new Date();
                const futureSpecials = response.data.menus.filter((menu) => new Date(menu.serveDate) > now);
                setMenus(futureSpecials);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSpecials();
    }, []);
  
    const handleDelete = async (event, id) => {
        event.preventDefault();
        try {
            const response = await deleteSpecial(id);
            setMenus(prevMenus => prevMenus.filter((menu) => menu._id !== id));
        } catch (err) {
            console.error("Error deleting the menu item", err);
        };
    };

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Future Specials</h1>

                    {menus && menus.length > 0  ? (menus.map((special, index) => (
                    <Card key={index} className='myContainer'>
                        <Card.Header className='blueContainer'>{special.serveDate}</Card.Header>
                        <Card.Body>
                            <Card.Title>{special.menuText}</Card.Title>
                            <Card.Text>{special.cost.toFixed(2)}</Card.Text>
                            {userRole === "admin" ? (
                            <>
                                <Button onClick={(event) => handleDelete(event, special._id)} variant="danger">Delete</Button>
                            </>
                            ) : null}
                        </Card.Body>
                    </Card>
                    )))
                    : (
                        <h3>No specials to display</h3>
                    )}
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default Specials;
