import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import LogoText from '../../components/assets/brand/logo-text.png';
import { httpLoginPOST } from '@/utils/http';

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { loginError, setLoginError } = useState(false);

  const onSubmit = (data) => {
    try {
      httpLoginPOST('token/', JSON.stringify(data), (response) => {
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          window.location.href = '/';
        } else {
          setLoginError(true);
        }
      }, (error) => {
        setLoginError(true);
        throw error;
      });
    } catch (error) {
      setLoginError(true);
      throw error;
    }
  };

  
  function handleGoogleLogin() {
    // Redirect to the backend endpoint that starts the OAuth flow
    window.location.href = "https://ingenius-api-f948e80544f9.herokuapp.com/accounts/google/login/";
  };


  return (
    <div className="authContainer">
      <aside className="authAsideWelcome">
        <Image src={LogoText} alt="InGenius Studio Logo" width={185} />
        <h1 className="authWelcomeTitle">Welcome to InGenius Studio</h1>
        <h2 className="authWelcomeSubtitle">
          Your journey to innovative and creative solutions starts here. Let's unlock new possibilities together.
        </h2>
        <div className="authCircle" />
      </aside>
      <aside className="authFormContainer">
        <h4 className="authFormTitle">Nice to see you!</h4>
        <form action="POST" className="authForm" onSubmit={handleSubmit(onSubmit)}>
          <label className="authLabel" htmlFor="username">
            Username
          </label>
          <input className="authInput" type="text" name="username" id="username" placeholder="Username" {...register("username", {
            required: 'Username is required',
          })} />
          <label className="authLabel" htmlFor="password">
            Password
          </label>
          <input className="authInput" type="password" name="password" id="password" {...register("password", {
            required: 'Password is required',
          })} />
          <button className="authButton" type="submit">
            Login
          </button>
        </form>
        <button className="gsi-material-button" onClick={handleGoogleLogin}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
            <svg version="1.1" viewBox="0 0 48 48" style={{ display: 'block' }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">Sign in with Google</span>
            <span style={{
              display: "none"
            }}>Sign in with Google</span>
          </div>
        </button>
      </aside>
    </div>
  );
}

