import search from '../../images/search1.svg';
import './SearchForm.css'

export default function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <img className='search__image' alt='Поиск' src={search} />
                <input className="search__input" type="text" placeholder="Фильм" required />
                <button className="search__button" type="submit">Найти</button>
            </form>
            < div className='search__filter-checkbox'>
                <label className="search__tumbler">
                    <input type="checkbox" className="search__checkbox" />
                    <span className="search__checkbox-slider"></span>
                </label>
                <p className='search__checkbox-text'>Короткометражки</p>
            </div>
        </section>
    )
}