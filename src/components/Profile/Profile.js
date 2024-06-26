import './Profile.css'
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { emailRegex } from '../../utils/constants'

export default function Profile({ onUpdateUser, signOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, isValidForm, resetForm,} = useFormValidation();
  const [isChangedValue, setIsChangedValue] = useState(false);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    resetForm({ 
      name: currentUser.name, 
      email: currentUser.email })
  }, [resetForm, currentUser])
  
  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsChangedValue(true);
    } else {
      setIsChangedValue(false);
    }
  }, [values])

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      email: values.email,
      token: localStorage.getItem('jwt')
    });
  }

  return (
    <section className='profile'>
      <div className='profile__info'>
        <h2 className='profile__title'>Привет, {currentUser.name} !</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__item'>
            <p className='profile__input-title'>Имя</p>
            <input className='profile__input'
              type='text'
              id='name'
              name='name'
              placeholder='Имя'
              value={values.name || ''}
                onChange={handleChange}
              required />
              <span className="profile__input-error">{errors.name}</span>
          </div>
          <div className='profile__item'>
            <p className='profile__input-title'>E-mail</p>
            <input className='profile__input'
              type='email'
              pattern={emailRegex}
              name='email'
              id='email'
              placeholder='E-mail'
              value={values.email || ''}
                onChange={handleChange}
              required />
              <span className="profile__input-error">{errors.email}</span>
          </div>
          <button  type='submit' disabled={!isValidForm || isChangedValue ? true : false } className={!isValidForm || isChangedValue ? "profile__button-edit profile__button-edit_inactive" : "profile__button-edit"}>Редактировать</button>
        </form>
        <Link className='profile__button-exit' to='/' onClick={signOut}>Выйти из аккаунта</Link>
      </div>
    </section>
  )
}