import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import searchFormStyles from '../SearchForm/SearchFormMain.module.css';
import clsx from 'clsx';
import { memo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import { FaFilm, FaTv, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/selectors';
import { logoutUserOP } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';

const makeLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Navigation = memo(function Navigation() {
  const isLogged = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logoutUserOP());
    console.log('User logged out');
  };

  return (
    <nav className={css.nav}>
      <div className={css.menu}>
        <NavLink to="/">
          <img
            alt="The Movie Database (TMDB)"
            className={css.headerLogo}
            src="https://files.readme.io/29c6fee-blue_short.svg"
          />
        </NavLink>
        <NavLink to="/movies" className={makeLinkClass}>
          <FaFilm className={css.icon} /> Movies
        </NavLink>
        <NavLink to="/tv" className={makeLinkClass}>
          <FaTv className={css.icon} /> TV Shows
        </NavLink>
      </div>
      <div className={css.menu}>
        <div className={css.searchField}>
          <SearchForm styleModule={searchFormStyles} />
        </div>
        {!isLogged && (
          <div>
            <NavLink to="/auth/login" className={css.link}>
              Log In
            </NavLink>
            <NavLink to="/auth/signup" className={css.link}>
              Sign Up
            </NavLink>
          </div>
        )}
        {isLogged && (
          <div>
            {/* <NavLink to="/favorite" className={css.link}>
              {userName}
            </NavLink> */}
            {/* <NavLink to="/favorite" className={css.profileButton}>
              <FaUser className={css.userIcon} />
              {userName}
            </NavLink>

            <NavLink onClick={handleLogout} to="/" className={css.link}>
              Log Out
            </NavLink> */}

            <div className={css.profileContainer}>
              <NavLink to="/favorite" className={css.profileButton}>
                <FaUser className={css.userIcon} />
                {userName}
              </NavLink>

              <div className={css.dropdownMenu}>
                <NavLink to="/auth/my-profile" className={css.dropdownItem}>
                  Settings
                </NavLink>
                <button onClick={handleLogout} className={css.dropdownItem}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});
export default Navigation;
