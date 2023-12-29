import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveFilmButton from '../../images/saveFilmButton.svg';
import dislikeFilmButton from '../../images/dislikeFilmButton.svg';

export default function MoviesCard({ movie }) {
  const location = useLocation();
  const [select, setSelect] = useState(false);

  function handleClick() {
    setSelect(!select);
  }

  return (
    <div className='movie'>
      <img className='movie__image' src={movie.image} alt='Изображение фильма' />
      <div className='movie__element'>
        <h2 className='movie__title'>{movie.name}</h2>
        {location.pathname === '/movies' &&
          <button type='button' className={select ? 'movie__button' : 'movie__button'} onClick={handleClick}>
            {select ? <img className='movie__click' alt='Фильм сохранён' src={saveFilmButton} /> :
              <img className='movie__button-dislike' alt='Убрать лайк' src={dislikeFilmButton} />}
          </button>}
        {location.pathname === '/saved-movies' &&
          <button type='button' className='movie__button' onClick={handleClick}>
            <img className='movie__button-delete' alt='Удалить фильм' src={deleteFilmButton} />
          </button>}
      </div>
      <p className='movie__duration'>{movie.time}</p>
    </div>
  );
};
