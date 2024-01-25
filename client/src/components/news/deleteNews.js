import React from "react";
import { Button } from "react-bootstrap";
import { deleteNews } from "../../utils/API";

const DeleteNews = ( { id } ) => {
    
    const handleDelete = async (event) => {
        console.log(id);
        event.preventDefault();
        try {
            const response = await deleteNews(id);
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
                <Button variant="primary" type="submit" onClick={handleDelete}>
                    Delete Article
                </Button>
        </>
    )
};

export default DeleteNews;