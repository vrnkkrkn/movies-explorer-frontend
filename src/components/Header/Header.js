import './Header.css';
import Navigation from '../Navigation/Navigation';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header({loggedIn}) {

  return (
    <>
      {!loggedIn ? (
    <header className='header'>
      <Link to="/">
        <img className='header__logo' alt='Логотип' src={logo} />
      </Link>
      <div className="header__links">
        <NavLink className="header__registration" to='/signup'>Регистрация</NavLink>
        <NavLink className="header__login" to='/signin'>Войти</NavLink>
      </div>
    </header>
   ) : ( <Navigation />)}
   </>
  )
}