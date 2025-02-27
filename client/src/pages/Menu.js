import { getTodaysMenu } from "../utils/API"; 
import { useState, useEffect, useContext } from "react";
import React from "react";
import Collapsible from "react-collapsible";
import Specials from "../components/menu/specials";
import CreateSpecial from "../components/menu/createSpecial";
import { entrees, sides, dinner } from "../utils/vars";
import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Col } from 'react-bootstrap'; 
import { AuthContext } from "../utils/authContext";

const Menu = () => {
  const [special, setSpecial] = useState(null);
  // const [menu, setMenu] = useState([]);
  const [specials, setSpecials] = useState([]);
  const addSpecial = (newSpecial) => {
    setSpecials(prevSpecials => [...prevSpecials, newSpecial]);
};
  const { isAdmin }= useContext(AuthContext);
  useEffect(() => {
    (async () => {
      try {
        const response = await getTodaysMenu();
        setSpecial(response.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-center">Lunch Menu</h1>
      <h3 className="text-center">Lunch available Monday through Friday  11:00am - 1:45pm</h3>
      <div className="text-center">
        <h3>Todays Specials</h3>
        {special && special[0] ? (
        <>
          <h4>{special[0].menuText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${special[0].cost}</h4>
        </>
      ) : (
        <h4>No Special Today</h4>
      )}
      </div>
      <Row className="w-100">
        <Col md={6}>
            <ListGroup horizontal="md" className="my-3">
              <ListGroup.Item as="li" className="w-50 w-md-auto">Item</ListGroup.Item>
              <ListGroup.Item as="li" className="w-50 w-md-auto">Price</ListGroup.Item>
            </ListGroup>
            {entrees.map((entree, index) => (
            <ListGroup key={index} horizontal="md" className="my-1">
             <ListGroup.Item as="li" className="w-50 w-md-auto">{entree.name}</ListGroup.Item>
              <ListGroup.Item as="li" className="w-50 w-md-auto">{entree.price.toFixed(2)}</ListGroup.Item>
            </ListGroup>
            ))}
        </Col>
        <Col md={6}>
            <ListGroup horizontal="md" className="my-3">
              <ListGroup.Item as="li" className="w-50 w-md-auto">Item</ListGroup.Item>
              <ListGroup.Item as="li" className="w-50 w-md-auto">Price</ListGroup.Item>
            </ListGroup>
            {sides.map((side, index) => (
            <ListGroup key={index} horizontal="md" className="my-1">
             <ListGroup.Item as="li" className="w-50 w-md-auto">{side.name}</ListGroup.Item>
              <ListGroup.Item as="li" className="w-50 w-md-auto">{side.price.toFixed(2)}</ListGroup.Item>
            </ListGroup>
            ))}
        </Col>
      </Row>

        {isAdmin && (
          <Col md={6}>
            <Collapsible trigger="Submit a new special" className="h2" triggerOpenedClassName="h2">
              <CreateSpecial addSpecial={addSpecial} />
            </Collapsible>
          </Col>
        )}
      <Specials specials={specials} />
        </div>
  );
};

export default Menu;