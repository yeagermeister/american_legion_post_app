import React from "react";
import { Button } from "react-bootstrap";
import { deleteGallery } from "../../utils/API";

const DeleteGallery = ({ id, onGalleryUpdate }) => {
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await deleteGallery(id);
            onGalleryUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center redContainer">
            <Button
                className="blueButton"
                variant="primary"
                type="submit"
                onClick={handleDelete}
            >
                Delete Gallery
            </Button>
        </div>
    );
};

export default DeleteGallery;