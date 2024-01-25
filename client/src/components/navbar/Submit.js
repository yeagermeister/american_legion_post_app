import React from 'react';
import { Link } from 'react-router-dom';

const Submit = () => {
    return (
        <>
            <li className="nav-item">
              <Link to={`/Submit`} className="nav-link active">Submit a new site!</Link>
            </li>
        </>
    )
};

export default Submit;

