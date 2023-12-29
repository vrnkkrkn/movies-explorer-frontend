import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

export default function Register() {
  return (
    <section className='register'>
      <Link to="/">
        <img className='register__logo' alt='Логотип' src={logo} />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <p className="register__name-input">Имя</p>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          className="register__input"
          minLength="2"
          maxLength="30"
          defaultValue={'Виталий'}
          required
        />
        <p className="register__name-input">E-mail</p>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="register__input"
          minLength="2"
          maxLength="30"
          defaultValue={'pochta@yandex.ru'}
          required
        />
        <p className="register__name-input">Пароль</p>
        <input
          id="password"
          name="password"
          placeholder="Пароль"
          className="register__input"
          minLength="2"
          maxLength="30"
          defaultValue={'••••••••••••••'}
          required
        />
        <button type="submit" className="register__button">Зарегистрироваться</button>
        <p className="register__text">Уже зарегистрированы?<Link to="/signin" className="login__link">Войти</Link></p>
      </form>
    </section >
  )
}