import './Profile.css'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Profile() {
  return (
    <section className='profile'>
      <Navigation />
      <div className='profile__info'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
            <div className='profile__item'>
              <p className='profile__input-title'>Имя</p>
              <input className='profile__input'
                type='text'
                id='name'
                name='name'
                placeholder='Имя'
                defaultValue={'Виталий'}
                required />
            </div>
            <div className='profile__item'>
              <p className='profile__input-title'>E-mail</p>
              <input className='profile__input'
                type='email'
                name='email'
                id='email'
                placeholder='E-mail'
                defaultValue={'pochta@yandex.ru'}
                required />
            </div>
            <button className='profile__button-edit' type='submit'>Редактировать</button>
        </form>
        <Link className='profile__button-exit' to='/signin'>Выйти из аккаунта</Link>
      </div>
    </section>
  )
}