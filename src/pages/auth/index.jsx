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
      </aside>
    </div>
  );
}

