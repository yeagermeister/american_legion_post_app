import auth from "../utils/auth";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { getGalleryItem } from "../utils/API";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteGallery } from '../utils/API';
import { updateGallery } from '../utils/API';
import GalleryComment from '../components/gallery/galleryComment';


const Event = () => {
    const galleryID = useParams();
    console.log(galleryID);
    const [event, setEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const userRole = auth.isAdmin() ? "admin" : "user";

    const handleDelete = async (event, id) => {
        event.preventDefault();
        try {
            const response = await deleteGallery(id);
            const data = await response.json();
            // setGalleryItems(prevGallery => prevGallery.filter((gallery) => gallery._id !== id));
        } catch (err) {
            console.error("Error deleting the gallery item", err);
        };
    }

    useEffect(() => {
        const fetchGallery = async () => {
            const response = await getGalleryItem(galleryID.id);
            const result = await response.json();
            setEvent(result);
        };

        fetchGallery();
    }, [galleryID]);

    console.log(event);
    return (
        event ? (
            <Row >
                <Col className="w-100" md={6}>
                    <Card>
                        <Card.Header>
                            {event.gallery.title} {new Date(event.gallery.date).toLocaleDateString("en-US")}
                            <Button onClick={() => handleDelete(event.gallery._id)}>Delete Event</Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{event.gallery.summary}</Card.Text>
                            {event && event.gallery.reactions && event.gallery.reactions.map((reaction, index) => (
                                <Card.Text>{reaction.name}&nbsp;&nbsp;"{reaction.reactionBody}"</Card.Text>
                            ))}
                        </Card.Body>

                        {event && event.gallery.pics && event.gallery.pics.map((pic, index) => (
                            <>
                                <Card.Img key={index} src={pic} alt={`Gallery pic ${index + 1}`}/>
                                {userRole === "admin" ? (
                                    <Button onClick={() => handleDelete(pic)}>Delete Pic</Button>
                                ) : null}
                            </>
                        ))}
                    </Card>
                    </Col>
                </Row>

    )  :

    (
        <div>
            <h1>No Gallery Selected!</h1>
        </div>
    )

    )
}

export default Event;

{/* <Card key={index}>
<Card.Header>{special.serveDate}</Card.Header>
<Card.Body>
    <Card.Title>{special.menuText}</Card.Title>
    <Card.Text>{special.cost.toFixed(2)}</Card.Text>
    {console.log(userRole)}
    {userRole === "admin" ? (
    <>
        <Button onClick={(event) => handleDelete(event, special._id)} variant="danger">Delete</Button>
    </>
    ) : null}
</Card.Body>
</Card> */}