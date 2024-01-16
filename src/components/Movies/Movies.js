import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { shortMoviesDuration } from '../../utils/constants'

function Movies({handleMovieLike, handleMovieDelete, savedMovies}) {
    const [loadingFlag, setLoadingFlag] = useState(false); //статус прелоадера
    const [shortMovies, setShortMovies] = useState(false); //статус чекбокса короткометражек
    const [moviesFiltered, setMoviesFiltered] = useState([]); //отфильтрованные фильмы
    const [movieNotFound, setMovieNotFound] = useState(false); //фильмы по запросу не найдены
    const [requestError, setRequestError] = useState(false); //статус ошибки запроса
    

    function filterMoviesByName(movies, searchQuery) {
        const moviesBySearchQuery = movies.filter((movie) => {
          const movieRu = String(movie.nameRU).toLowerCase().trim();
          const movieEn = String(movie.nameEN).toLowerCase().trim();
          const lowerCaseQuery = searchQuery.toLowerCase().trim();
          return movieRu.indexOf(lowerCaseQuery) !== -1 || movieEn.indexOf(lowerCaseQuery) !== -1;
        });
        return moviesBySearchQuery;
    }

    function filterMoviesByDuration(movies) {
        return movies.filter((movie) => movie.duration <= shortMoviesDuration);
    }

    function filterMovies(movies, searchQuery) {
        const moviesFilteredBase = filterMoviesByName(movies, searchQuery);
        setMoviesFiltered(shortMovies ? filterMoviesByDuration(moviesFilteredBase) : moviesFilteredBase);
        localStorage.setItem('allMovies', JSON.stringify(movies));
        localStorage.setItem('searchQueryMovies', JSON.stringify(moviesFilteredBase));
    }

    function movieSearch(searchQuery) {
        localStorage.setItem('shortMovies', shortMovies);
        localStorage.setItem('searchQuery', searchQuery);
        if (localStorage.getItem('allMovies')) {
            const movies = JSON.parse(localStorage.getItem('allMovies'));
            filterMovies(movies, searchQuery)
            setRequestError(false);
        } else {
            setLoadingFlag(true);
            moviesApi
                .getMovies()
                .then((moviesData) => {
                    filterMovies(moviesData, searchQuery)
                    setRequestError(false);
                })
                .catch((error) => {
                    setRequestError(true);
                    console.log(error);
                })
                .finally(() => {
                    setLoadingFlag(false);
                });
        }
    }

    function handleCheckbox() {
        const movies = JSON.parse(localStorage.getItem('searchQueryMovies'));
        setShortMovies(!shortMovies);
        localStorage.setItem('shortMovies', !shortMovies);
        if (localStorage.getItem('searchQuery')) {
            setMoviesFiltered(!shortMovies ? filterMoviesByDuration(movies) : movies);
        }
        
    }

    useEffect(() => {
        if (localStorage.getItem('shortMovies') === 'true') {
            setShortMovies(true);
        } else {
            setShortMovies(false);
        }
      }, []);

    useEffect(() => {
        if (localStorage.getItem('searchQueryMovies')) {
            const movies = JSON.parse(localStorage.getItem('searchQueryMovies'));
            if (localStorage.getItem('shortMovies') === 'true') {
                setMoviesFiltered(filterMoviesByDuration(movies));
            } else {
                setMoviesFiltered(movies);
            }
        }
    }, []);
    
    useEffect(() => {
        if (localStorage.getItem('searchQueryMovies')) {
            if (moviesFiltered.length === 0) {
                setMovieNotFound(true);
            } else {
                setMovieNotFound(false);
            } 
        } else {
            setMovieNotFound(false);
        }
        
    }, [moviesFiltered]);

    return (
        <section className='movies'>
            <SearchForm 
                movieSearch={movieSearch}
                shortMovies={shortMovies}
                handleCheckbox={handleCheckbox}
            />
            <MoviesCardList 
                movies={moviesFiltered}
                savedMovies={savedMovies}
                loadingFlag={loadingFlag}
                movieNotFound={movieNotFound}
                requestError={requestError}
                handleMovieLike={handleMovieLike}
                handleMovieDelete={handleMovieDelete}
                isSavedMovie={false} />
        </section>
    );
}


export default Movies;
