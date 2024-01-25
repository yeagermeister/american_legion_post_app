import React from 'react';
import { Link } from 'react-router-dom'
const Profile = () => {
 
  return (
    <>
            <li className="nav-item">
              <Link to={`/Profile`} className="nav-link active">Profile</Link>
            </li>
        </>
  );
};

export default Profile;