import React from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '93320933652-eu0ldk89s3unhmgkd8v70r2cv24ha469.apps.googleusercontent.com';

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
      <GoogleOAuthProvider clientId={clientId}>
        <button onClick={handleLogout}>Logout</button>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLogoutButton;
