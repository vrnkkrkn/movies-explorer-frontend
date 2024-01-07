import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movies';

export default function SavedMovies() {
    return (
        <section className='savedMovies'>
            <SearchForm />
            <MoviesCardList movies={movies} />
        </section>
    )
}
