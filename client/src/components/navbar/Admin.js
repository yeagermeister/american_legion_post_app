import React from 'react';

import { Link } from 'react-router-dom';

import Auth  from '../../utils/auth';

const Admin = () => {


  return (
    <>
    
        <li className="nav-item">
          <Link to={`/Admin`} className="nav-link active">Admin</Link>
        </li>
   
    </>
  );
};

export default Admin;

