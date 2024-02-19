import { Card, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import Collapsible from 'react-collapsible';

import SubmitGallery from '../components/gallery/submitGallery';
import GalleryComment from '../components/gallery/galleryComment';
import DeleteGallery from '../components/gallery/deleteGallery';
import UpdateGallery from '../components/gallery/updateGallery';

import { getGallery } from '../utils/API';
import { AuthContext } from '../utils/authContext';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [collapsibleKey, setCollapsibleKey] = useState(0);
  const { admin } = useContext(AuthContext);

  const fetchGalleries = async () => {
    try {
      const response = await getGallery();
      setGalleryItems(response.data.galleries);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryUpdate = () => {
    fetchGalleries();
    setCollapsibleKey(prevKey => prevKey + 1); // Increment key to force Collapsible to close 
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <Row>
      <h1>Gallery</h1>
      {admin && (
        <Col w="100" md={12} >
          <Collapsible
            key={collapsibleKey}
            trigger="Submit a new Gallery"
            className="h2"
            triggerOpenedClassName="h2"
          >
            <SubmitGallery onGalleryUpdate={handleGalleryUpdate}/>
          </Collapsible>
        </Col>
      )}
      <Col md={4} className="blueContainer">
        {galleryItems.length > 0 ? (
          galleryItems
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((galleryItem, index) => (
            <Card key={index} className="myContainer">
              <Card.Img variant="top" src={galleryItem.pics[0]} />
              <Card.Body>
                <Card.Title>{new Date(galleryItem.date).toLocaleDateString("en-US")}&nbsp;{galleryItem.title}</Card.Title>
                <Card.Text>{galleryItem.summary}</Card.Text>
                {galleryItem && galleryItem.reactions && galleryItem.reactions.map((reaction, reactionIndex) => (
                  <Card.Text key={reactionIndex}>{reaction.name}&nbsp;&nbsp;"{reaction.reactionBody}"</Card.Text>
                ))}
              </Card.Body>
              <Card.Footer>
                <GalleryComment id={galleryItem._id} onGalleryUpdate={handleGalleryUpdate}/>
              </Card.Footer>
              {admin && (
                <div>
                  <UpdateGallery id={galleryItem._id} onGalleryUpdate={handleGalleryUpdate}/>
                  <DeleteGallery id={galleryItem._id} onGalleryUpdate={handleGalleryUpdate}/>
                </div>
              )}
            </Card>
          ))
        ) : (
          <h4>No gallery items to display</h4>
        )}
      </Col>
    </Row>

  );
};

export default Gallery;

