import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header(props) {

  return (
    <header className='header'>
      <Link to="/">
        <img className='header__logo' alt='Логотип' src={logo} />
      </Link>
      <div className="header__links">
        <Link className="header__registration" to='/signup'>Регистрация</Link>
        <Link className="header__login" to='/signin'>Войти</Link>
      </div>
    </header>
  )
}