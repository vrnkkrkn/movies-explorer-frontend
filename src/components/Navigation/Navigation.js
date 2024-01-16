import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
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
      <div className='navigation__burger-menu'>
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
          <NavLink className='navigation__link-movies navigation__link-movies_active' to='/movies'>Фильмы</NavLink>
          <NavLink className='navigation__link-movies' to='/saved-movies'>Сохранённые фильмы</NavLink>
        </div>
        <div className='navigation__links-profile'>
          <Link className="navigation__account" to="/profile">Аккаунт</Link>
          <Link to="/profile">
            <img className='navigation__profile-logo' alt='Логотип профиля' src={profileLogo} />
          </Link>
        </div>
      </div>
    </section>
  )
}