import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css'
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logo from '../../images/logo.svg';
import profileLogo from '../../images/profileLogo.svg';

export default function Navigation() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openBurgerMenu = () => {
    setIsMenuOpen(true);
  }

  const closeBurgerMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <section className='navigation'>
      <div className='navigation__menu'>
        <Link to="/">
          <img className='navigation__logo' alt='Логотип' src={logo} />
        </Link>
        <BurgerMenu
          isOpen={isMenuOpen}
          onClick={openBurgerMenu}
          onClose={closeBurgerMenu}
        />
      </div>
      <div className='navigation__routes'>
        <div className='navigation__links-movies'>
          <Link className='navigation__link-movies navigation__link-movies_active' to='/movies'>Фильмы</Link>
          <Link className='navigation__link-movies' to='/saved-movies'>Сохранённые фильмы</Link>
        </div>
        <div className='navigation__links-profile'>
          <Link className="navigation__account" to="/profile">Аккаунт</Link>
          <Link className="navigation__profile-logo" to="/profile" src={profileLogo} alt='Логотип профиля'></Link>
        </div>
      </div>
    </section>
  )
}