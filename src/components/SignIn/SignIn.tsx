import React, { useState } from 'react';
import css from './SignIn.module.css';
import { NavLink } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getGoogleOAuthUrlOP, loginUserOP } from '../../redux/auth/operations';
import { selectIsError, selectIsLoading } from '../../redux/auth/selectors';
import LoadingNotification from '../LoadingNotification/LoadingNotification';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingServer = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUserOP({ email, password }));
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  const handleGoogleSignIn = () => {
    dispatch(getGoogleOAuthUrlOP());
  };
  return (
    <div className={css.container}>
      <div className={css.form}>
        {isLoadingServer && <LoadingNotification />}
        {error && <div className={css.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={css.innerForm}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className={css.input}
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <NavLink to="/auth/request-reset-email" className={css.forgotPassword}>
            Forgot password?
          </NavLink>
          <button type="submit" className={css.submitBtn}>
            Sign In
          </button>
          <div className={css.divider} />
        </form>
        <button type="button" onClick={handleGoogleSignIn} className={css.googleBtn}>
          <FcGoogle className={css.googleIcon} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
