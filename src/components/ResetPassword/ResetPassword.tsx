import { useDispatch, useSelector } from 'react-redux';
import css from './ResetPassword.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import {
  selectEmailReset,
  selectIsError,
  selectIsLoading,
  selectRequestResetPassword,
} from '../../redux/auth/selectors';
import LoadingNotification from '../LoadingNotification/LoadingNotification';
import { useState } from 'react';
import { setError } from '../../redux/auth/slice';

const ResetPassword: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const tokenURL = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingServer = useSelector(selectIsLoading);
  const emailReset = useSelector(selectEmailReset);
  const isRequestResetPassword = useSelector(selectRequestResetPassword);
  const error = useSelector(selectIsError);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }
  };

  return (
    <div className={css.container}>
      <div className={css.form}>
        {isLoadingServer && <LoadingNotification />}
        {error && <div className={css.error}>{error}</div>}

        {isRequestResetPassword ? (
          <div className={css.successContainer}>
            <h2 className={css.title}>Success!</h2>
            <p className={css.text}>
              We have sent a link to <strong>{emailReset}</strong> to reset your password.
            </p>
          </div>
        ) : (
          <>
            <h2 className={css.title}>Reset Password</h2>
            <p className={css.text}>
              The password should be at least 8 characters long for your security.
            </p>
            <form onSubmit={handleSubmit} className={css.innerForm}>
              <input
                className={css.input}
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <input
                className={css.input}
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className={css.submitBtn}>
                Continue
              </button>
              <div className={css.divider} />
            </form>
          </>
        )}
        {/* <NavLink to="/auth/login">
          <button type="button" className={css.backBtn} onClick={() => handleBacktoLogin()}>
            Back to Log In
          </button>
        </NavLink> */}
      </div>
    </div>
  );
};

export default ResetPassword;
