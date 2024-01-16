import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { emailRegex } from '../../utils/constants'

export default function Register({onRegister}) {

  const { values, errors, isValidForm, handleChange} = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
  });
  }

  return (
    <section className='register'>
      <Link to="/">
        <img className='register__logo' alt='Логотип' src={logo} />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
      <label>
      <p className="register__form-input">Имя</p>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          className="register__input"
          minLength="2"
          maxLength="30"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="register__input-error">{errors.name}</span>
        </label>
        <label> 
          <p className="register__form-input">E-mail</p>
      
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="register__input"
          type="email"
          pattern={emailRegex}
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className="register__input-error">{errors.email}</span>
        </label>
        <label>
      <p className="register__form-input">Пароль</p>
        <input
          id="password"
          name="password"
          placeholder="Пароль"
          className="register__input"
          type="password"
          minLength="2"
          maxLength="30"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <span className="register__input-error">{errors.password}</span>
        </label>
        <button type="submit" disabled={!isValidForm ? true : false } className={!isValidForm ? "register__button register__button_inactive" : "register__button"}>Зарегистрироваться</button>
        <p className="register__text">Уже зарегистрированы?<Link to="/signin" className="register__login-link">Войти</Link></p>
      </form>
    </section >
  )
}