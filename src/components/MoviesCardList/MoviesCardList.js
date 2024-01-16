import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { baseRowCount, baseRowCountSolo, baseIncRowCount, baseIncRowCountSolo } from '../../utils/constants'

export default function MoviesCardList({ movies, isSavedMovie, savedMovies, loadingFlag, movieNotFound, requestError, handleMovieLike, handleMovieDelete }) {
    const [moviesCount, setMoviesCount] = useState(0);
    const [rowsCount, setRowsCount] = useState(baseRowCount);
    const [rowsCountSolo, setRowsCountSolo] = useState(baseRowCountSolo);

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
        const incRowsCount = rowsCount + baseIncRowCount;
        const incRowsCountSolo = rowsCountSolo + baseIncRowCountSolo;
        declareMoviesCount(incRowsCount, incRowsCountSolo);
      }

    useEffect(() => {
        declareMoviesCount(rowsCount, rowsCountSolo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        declareMoviesCount(baseRowCount, baseRowCountSolo);
    }, [movies]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', function(){declareMoviesCount(rowsCount, rowsCountSolo)});
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
                {isSavedMovie 
                    ? (<>{movies.map((movie) => (
                        <MoviesCard key={movie.id} movie={movie} 
                        handleMovieLike={handleMovieLike} handleMovieDelete={handleMovieDelete} 
                        isSavedMovie={isSavedMovie}
                        isLikedCard={savedMovies.find((likedMovie) => likedMovie.movieId === movie.id)}/>
                    ))}</>)
                    : (<>{movies.slice(0, moviesCount).map((movie) => (
                        <MoviesCard key={movie.id} movie={movie} 
                        handleMovieLike={handleMovieLike} handleMovieDelete={handleMovieDelete} 
                        isSavedMovie={isSavedMovie}
                        isLikedCard={savedMovies.find((likedMovie) => likedMovie.movieId === movie.id)}/>
                    ))}</>)
                }
            </div>
            {!movieNotFound && !requestError && !isSavedMovie && moviesCount < movies.length && <button className='movies__button' type='button' onClick={loadMoreMovies}>Ещё</button>}
        </section>
        
    );
};