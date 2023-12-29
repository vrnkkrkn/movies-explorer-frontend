import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movies';

export default function Movies() {
    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList movies={movies} />
        </section>
    );
}
