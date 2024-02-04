import { Form, Button, Alert } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { useState } from "react";
import authService from "../../utils/auth";
import { createSpecial } from "../../utils/API";

function CreateSpecial({ addSpecial }) {
    // const authService = new AuthService();
    const userRole = authService.isAdmin() ? "admin" : "user";

    const [menus, setMenus] = useState([]);
    
    const [specialFormData, setSpecialFormData] = useState({
        menuText: '',
        cost: '',
        serveDate: '',
        token: localStorage.getItem('id_token'),
    });

    const [validated, setValidated] = useState(false);

    const [showAlert, setShowAlert] = useState(false);


const handleFormSubmit = async (event) => { 
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
        const response = await createSpecial(specialFormData);
        setMenus(menus.filter((menu) => menu._id !== response.data.id));
        addSpecial(response.data);
        window.location.reload();
    } catch (err) {
        console.error("Error adding the special", err);
    };

    setSpecialFormData({
        menuText: '',
        cost: '',
        serveDate: '',
    });
};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSpecialFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
        {userRole === "admin" ? (
        <>
        <Form className='blueContainer' noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert diismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wroing
            </Alert>
            <Form.Group>
                <Form.Label>What is the name of the dish?</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Menu Text"
                    name="menuText"
                    onChange={handleInputChange}
                    value={specialFormData.menuText}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Menu Text is required!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>What is the cost?</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    onChange={handleInputChange}
                    value={specialFormData.cost}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Cost is required!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>What date will this special be served?</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Date"
                    name="serveDate"
                    onChange={handleInputChange}
                    value={specialFormData.serveDate}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Date is required!
                </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button className='redButton' type="submit" variant="success">
                    Submit
                </Button>
            </div>
        </Form>
        </>
        ) : null}

        </>
    )
};

export default CreateSpecial;