import React from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLogoutButton = () => {
  const navigate = useNavigate(); 

  const onSuccess = () => {
    console.log('Logout Success');
    navigate('/'); 
  };

  const handleLogout = () => {
    googleLogout();
    onSuccess();
  };

  return (
    <div className="google-logout-button">
      <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_CLIENT_ID}>
        <button onClick={handleLogout}>Logout</button>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLogoutButton;
