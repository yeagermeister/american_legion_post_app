import React from "react";
import { Button } from "react-bootstrap";
import { deleteNews } from "../../utils/API";

const DeleteNews = ( { id, onNewsUpdate } ) => {
    
    const handleDelete = async (event) => {
        console.log(id);
        event.preventDefault();
        try {
            const response = await deleteNews(id);
            onNewsUpdate();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="d-flex justify-content-center redContainer">
            <Button 
                className='blueButton'
                variant="primary" 
                type="submit" 
                onClick={handleDelete}>
                Delete Article
            </Button>
        </div>
    )
};

export default DeleteNews;