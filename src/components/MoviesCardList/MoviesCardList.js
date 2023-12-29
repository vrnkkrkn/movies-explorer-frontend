import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


export default function MoviesCardList({ movies }) {
    return (
        <section className='movies'>
            <div className='movies__list'>
                {movies.map((movie) => (
                    <MoviesCard key={movie.id} movie={movie} />
                ))}
            </div>
            <button className='movies__button' type='button'>Ещё</button>
        </section>
    );
};