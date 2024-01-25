import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <li className="nav-item">
            <Link to={`/Signup`} className="nav-link active">Signup</Link>
            </li>
        </>
    )
};

export default Signup;