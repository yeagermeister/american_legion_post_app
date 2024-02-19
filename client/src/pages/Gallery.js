import auth from '../utils/auth';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import SubmitGallery from '../components/gallery/submitGallery';
import { deleteGallery, updateGallery, getGallery } from '../utils/API';
import GalleryComment from '../components/gallery/galleryComment';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentItem, setCommentItem] = useState(null);
  

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    date: '',
  });


  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery();
        setGalleryItems(response.data.galleries);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteGallery(id);
      if (!response.ok) {
        throw new Error('Failed to delete gallery');
      }
      // Refresh the gallery list after a gallery is deleted
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };
  
  const handleClose = () => setShowModal(false);
  const handleCommentClose = () => setShowCommentModal(false);

  // const handleComment = (item) => {
  //   setCommentItem(item);
  //   setShowCommentModal(true);
  // };

  const handleSave = async () => {
    // Gather data from the form
    const title = formData.title;
    const summary = formData.summary;
    const date = formData.date;

    // This will be needed wehn the delete picture functionality is added - although, i might just make a button next to each picture to deelete it specifically.  That might be more intuitive.
    // const pics = Array.from(document.getElementsByClassName('pics')).map(input => input.value);
  
    // Create the gallery data object
    const galleryData = {
      _id: editItem._id, // Include the ID to know which gallery item to update
      title: formData.title ? formData.title : editItem.title,
      summary: formData.summary ? formData.summary : editItem.summary,
      date: formData.date ? formData.date : editItem.date,
      // pics,
    };
  
    try {
      // Call the updateGallery API
      const response = await updateGallery(galleryData);
  
      // Check if the API call was successful
      if (!response.ok) {
        throw new Error('Failed to update gallery');
      }
  
      // Hide the modal and refresh the gallery list
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  const handleCommentInputChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setCommentItem(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleInputChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <>
    <div>
        <h1 className="text-center">Gallery</h1>
    </div>
    {auth.loggedIn() ? (
      <>
      <Collapsible trigger="Submit a new Gallery" className="h2" triggerOpenedCLassName="h2">
        <SubmitGallery />
      </Collapsible>
      <Row className="w-100">
        <Col md={6}>
        {galleryItems && galleryItems.length > 0 ? ([...galleryItems].reverse().map((galleryItem, index) => (
          <div key={index}>
            <Card>
              <Link to={`/gallery/${galleryItem._id}`}>
                <Card.Img variant="top" src={galleryItem.pics[0]} />
                <Card.Body>
                  <Card.Title>{new Date(galleryItem.date).toLocaleDateString("en-US")}&nbsp;{galleryItem.title}</Card.Title>
                  <Card.Text>{galleryItem.summary}</Card.Text>
                  {galleryItem && galleryItem.reactions && galleryItem.reactions.map((reaction, reactionIndex) => (
                    <Card.Text key={reactionIndex}>{reaction.name}&nbsp;&nbsp;"{reaction.reactionBody}"</Card.Text>
                  ))}
                </Card.Body>
              </Link>
              <Card.Footer>
                <GalleryComment id={galleryItem._id}/>
              </Card.Footer>
              {auth.isAdmin() ? (
                <div>
                  <Button variant="primary" onClick={() => handleEdit(galleryItem)}>Edit</Button>
                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Gallery</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group>
                              <Form.Label>Title</Form.Label>
                              <Form.Control 
                                type="text" 
                                defaultValue={editItem?.title} 
                                onChange={handleInputChange}
                                name='title' />
                              <Form.Label>Date</Form.Label>
                              <Form.Control 
                                type="text" 
                                defaultValue={editItem?.date}
                                onChange={handleInputChange}
                                name="date"/>
                              <Form.Label>Summary</Form.Label>
                              <Form.Control 
                                as="textarea" 
                                defaultValue={editItem?.summary} 
                                onChange={handleInputChange}
                                name="summary"/>
                              {/* For future releases - give the admin the ability to delete pictures */}
                              {/* <Form.Label>Pics</Form.Label>
                                {editItem?.pics.map((pic, index) => (
                                  <Form.Control key={index} type="text" defaultValue={pic} className='pics'/>
                                ))} */}
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>Close</Button>
                          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                        </Modal.Footer>
                      </Modal>

                  <Button variant="danger" onClick={() => handleDelete(galleryItem._id)}>Delete</Button>
                </div>
              ) : null}
            </Card>
          </div>
        ))) : (<h4>No gallery items to display</h4>)}        
        </Col>
      </Row>
      </>
    ) : (<Link to="/">Login to see the gallery</Link>)}
    </>
  );
};

export default Gallery;