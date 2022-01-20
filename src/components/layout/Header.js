import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Button from '../common/Button';
import { ReactComponent as Icon } from '../../assets/nodepop.svg';
import { logout } from '../auth/service';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import { getIsLogged } from '../../store/selectors';
import { authLogout } from '../../store/action';

function Header({ className }) {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout().then(() => {
      dispatch(authLogout);
    });
  };

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          activeClassName="current"
          activeStyle={{ color: 'green' }}
        >
          Nuevo anuncio
        </NavLink>
        {isLogged ? (
          <Button
            className="header-button"
            onClick={handleLogout}
            as={Link}
            to="/login" >
            Log out
          </Button>
        ) : (
          <Button
            variant="primary"
            className="header-button"
            as={Link}
            to="/login" >
            Log in
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
