import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import useFormValidation from '../../hooks/useFormValidation';

export default function Login({onLogin}) {
  const { values, errors, isValidForm, handleChange} = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
  });
  }

  return (
    <section className='login'>
      <Link to="/">
        <img className='login__logo' alt='Логотип' src={logo} />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label>
        <p className="login__name-input">E-mail</p>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="login__input"
          minLength="2"
          maxLength="30"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
         <span className="login__input-error">{errors.email}</span>
        </label>
        <label>
        <p className="login__name-input">Пароль</p>
        <input
          id="password"
          name="password"
          placeholder="Пароль"
          className="login__input"
          minLength="2"
          maxLength="30"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
         <span className="login__input-error">{errors.password}</span>
        </label>
        <button type="submit" disabled={!isValidForm ? true : false } className={!isValidForm ? "login__button login__button_inactive" : "login__button"}>Войти</button>
        <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
      </form>
    </section >
  )
}