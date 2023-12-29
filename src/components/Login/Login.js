import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

export default function Login() {
  return (
    <section className='login'>
      <Link to="/">
        <img className='login__logo' alt='Логотип' src={logo} />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <p className="login__name-input">E-mail</p>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="login__input"
          minLength="2"
          maxLength="30"
          required
        />
        <p className="login__name-input">Пароль</p>
        <input
          id="password"
          name="password"
          placeholder="Пароль"
          className="login__input"
          minLength="2"
          maxLength="30"
          required
        />
        <button type="submit" className="login__button">Войти</button>
        <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
      </form>
    </section >
  )
}