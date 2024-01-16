import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveFilmButton from '../../images/saveFilmButton.svg';
import dislikeFilmButton from '../../images/dislikeFilmButton.svg';

export default function MoviesCard({ movie, isSavedMovie, handleMovieLike, isLikedCard, handleMovieDelete }) {
  const location = useLocation();

  function handleClick() {
    if (isLikedCard) {
      handleMovieDelete(movie, isSavedMovie);
    } else {
      handleMovieLike(movie);
    }
  }

  function deleteLikedMovie() {
    handleMovieDelete(movie, isSavedMovie);
  }

  function durationFormat(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours > 0) {
        return `${hours}ч ${minutes}м`;
      } else {
        return `${minutes}м`;
      }
  }

  return (
    <div className='movie'>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movie__image"
          alt={movie.nameRU}
          src={isSavedMovie ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
        />
      </a>
      <div className='movie__element'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        {location.pathname === '/movies' &&
          <button type='button' className={isLikedCard ? 'movie__button' : 'movie__button'} onClick={handleClick}>
            {isLikedCard ? <img className='movie__click' alt='Фильм сохранён' src={saveFilmButton} /> :
              <img className='movie__button-dislike' alt='Убрать лайк' src={dislikeFilmButton} />}
          </button>}
        {location.pathname === '/saved-movies' &&
          <button type='button' className='movie__button' onClick={deleteLikedMovie}>
            <img className='movie__button-delete' alt='Удалить фильм' src={deleteFilmButton} />
          </button>}
      </div>
      <p className='movie__duration'>{durationFormat(movie.duration)}</p>
    </div>
  );
};
