import React, { useState } from "react";
import SignupForm from "../components/signup-login/signupForm";
import ValidateMember from '../components/signup-login/ValidateMember'

const Signup = () => {

    const [member, setMember] = useState(null);


    // get the member data from the ValidateMember component
    const handleMemberData = (data) => {
      setMember(data);
    };

    return (
      <>
        {/* Displays the member validation bnefore a user can sign up */}
        <ValidateMember onMemberData={handleMemberData} />

        {/* Displays the Signup Form */}
        {member && <SignupForm member={member} />}
      </>
    );
  };
  
  export default Signup;