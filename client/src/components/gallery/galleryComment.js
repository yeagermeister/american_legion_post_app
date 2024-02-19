import auth from '../../utils/auth';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { addReaction } from '../../utils/API';

const GalleryComment = ({ id, onGalleryUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const [commentItem, setCommentItem] = useState(null);
    const [formData, setFormData] = useState(null);

    const name = auth.getProfile();
    const destructure = name.data.username;

    const handleComment = async () => {
        setShowModal(true);
        }

    const handleClose = () => {
      setShowModal(false);
      onGalleryUpdate();
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {

            const dbPackage = {...formData, name: destructure}
            console.log(dbPackage);
            const response = await addReaction(id, dbPackage);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const data = await response.json();
            console.log(data);
            setFormData({ comment: '' });
            setShowModal(false);
            } catch (err) {
                console.error(err);
            }
        onGalleryUpdate();
      }
      
    return (
        <>
        {auth.loggedIn() ? (
            <>
                <Button variant='secondary' onClick={() => handleComment(commentItem)}>Leave a comment</Button>
                  <Modal show={showModal} onHide={{handleClose}}>
                    <Modal.Header closeButton>
                      <Modal.Title>Leave a comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control 
                            type="text" 
                            // defaultValue={commentItem?.comment} 
                            onChange={handleInputChange}
                            name='reactionBody' />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleFormSubmit}>Submit</Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
              </>
            ) : null}
            </>
);
};

export default GalleryComment;