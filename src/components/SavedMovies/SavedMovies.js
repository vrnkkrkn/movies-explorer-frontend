import './SavedMovies.css'
import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({movies, handleMovieDelete, handleMovieLike}) {
    const [shortMovies, setShortMovies] = useState(false); //статус чекбокса короткометражек
    const [moviesFiltered, setMoviesFiltered] = useState(movies); //отфильтрованные фильмы
    const [movieNotFound, setMovieNotFound] = useState(false); //фильмы по запросу не найдены
    const [searchQuerySaved, setSearchQuerySaved] = useState('');

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
        return movies.filter((movie) => movie.duration <= 40);
    }

    function filterMovies(movies, searchQuery) {
        const moviesFilteredBase = filterMoviesByName(movies, searchQuery);
        setMoviesFiltered(shortMovies ? filterMoviesByDuration(moviesFilteredBase) : moviesFilteredBase);
    }
    //submit
    function movieSearch(searchQuery) {
        setSearchQuerySaved(searchQuery);
        filterMovies(movies, searchQuery);
    }

    function handleCheckbox() {
        setShortMovies(!shortMovies);
        // setMoviesFiltered(!shortMovies ? filterMovies(movies, searchQuery) : movies);
        filterMovies(movies, searchQuerySaved);
    }

    useEffect(() => {
        filterMovies(movies, searchQuerySaved);
      }, [movies, shortMovies, searchQuerySaved]);

    useEffect(() => {
        if (moviesFiltered.length === 0) {
            setMovieNotFound(true);
        } else {
            setMovieNotFound(false);
        }
    }, [moviesFiltered]);

    

    return (
        <section className='savedMovies'>
            <SearchForm 
            movieSearch={movieSearch}
            shortMovies={shortMovies}
            handleCheckbox={handleCheckbox} />
            <MoviesCardList 
            movies={moviesFiltered}
            savedMovies={movies}
            movieNotFound={movieNotFound}
            handleMovieDelete={handleMovieDelete}
            handleMovieLike={handleMovieLike}
            isSavedMovie={true} />
        </section>
    )
}
