import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const makeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={makeLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={makeLinkClass}>
        Movies
      </NavLink>
      <NavLink to="/tv" className={makeLinkClass}>
        TV Shows
      </NavLink>
    </nav>
  );
}
