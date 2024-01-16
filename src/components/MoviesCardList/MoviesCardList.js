import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


export default function MoviesCardList({ movies, isSavedMovie, savedMovies, loadingFlag, movieNotFound, requestError, handleMovieLike, handleMovieDelete }) {
    const [moviesCount, setMoviesCount] = useState(0);
    const [rowsCount, setRowsCount] = useState(4);
    const [rowsCountSolo, setRowsCountSolo] = useState(5);
    var timeout = false;
    
    function declareMoviesCount(incRowsCount, incRowsCountSolo) {
        const displayWidth = window.innerWidth;
        setRowsCount(incRowsCount);
        setRowsCountSolo(incRowsCountSolo);
        if (displayWidth > 1280) {
            setMoviesCount(incRowsCount*4);
        } else if (displayWidth > 850) {
            setMoviesCount(incRowsCount*3);
        } else if (displayWidth > 600) {
            setMoviesCount(incRowsCount*2);
        } else if (displayWidth < 600) {
            setMoviesCount(incRowsCountSolo);
        }
    }

    function loadMoreMovies() {
        const incRowsCount = rowsCount + 1;
        const incRowsCountSolo = rowsCountSolo + 2;
        declareMoviesCount(incRowsCount, incRowsCountSolo);
      }

    useEffect(() => {
        declareMoviesCount(rowsCount, rowsCountSolo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        declareMoviesCount(4, 5);
    }, [movies]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', function(){declareMoviesCount(rowsCount, rowsCountSolo)} && clearTimeout(timeout));
        }, 500);
    });
    return (
        <section className='movies-card'>
            {loadingFlag && <Preloader />}
            {movieNotFound && !requestError && !loadingFlag && <p className="movies-not-found">Ничего не найдено</p>}
            {requestError  && !loadingFlag && <p className="movies-not-found">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                </p>}
            <div className='movies__list'>
                {movies.slice(0, moviesCount).map((movie) => (
                    <MoviesCard key={movie.id} movie={movie} 
                    handleMovieLike={handleMovieLike} handleMovieDelete={handleMovieDelete} 
                    isSavedMovie={isSavedMovie}
                    isLikedCard={savedMovies.find((likedMovie) => likedMovie.movieId === movie.id)}/>
                ))}
            </div>
            {!movieNotFound && !requestError && !isSavedMovie && moviesCount < movies.length && <button className='movies__button' type='button' onClick={loadMoreMovies}>Ещё</button>}
        </section>
        
    );
};