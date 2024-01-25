import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <li className="nav-item">
            <Link to={`/Login`} className="nav-link active">Login/Signup</Link>
            </li>
        </>
    )
};

export default Login;