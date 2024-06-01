
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './styles/GoogleLoginButton.css';

const GoogleLoginButton = () => {
  const navigate = useNavigate(); 

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/homepage'); 
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <div className="google-login-button">
      <GoogleOAuthProvider clientId="93320933652-eu0ldk89s3unhmgkd8v70r2cv24ha469.apps.googleusercontent.com">
        <GoogleLogin
         
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
