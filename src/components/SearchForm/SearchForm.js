import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import search from '../../images/search1.svg';
import './SearchForm.css'

function SearchForm({movieSearch, handleCheckbox, shortMovies}) {    
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    function handleSubmit(evt) {
        evt.preventDefault();
        movieSearch(searchQuery);
        localStorage.setItem('searchQuery', localStorage.getItem('searchQuery'))     
    }

    function handleChangeQuerySearch(evt) {
        setSearchQuery(evt.target.value);
        if (location.pathname === '/movies') {
            localStorage.setItem('searchQuery', searchQuery)
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            setSearchQuery(localStorage.getItem('searchQuery'));
        }
    }, []);

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <img className='search__image' alt='Поиск' src={search} />
                <input className="search__input" name="query"
                    onChange={handleChangeQuerySearch} type="text" 
                    value={searchQuery || ''}
                    placeholder="Фильм" required onInvalid={e => e.target.setCustomValidity("Нужно ввести ключевое слово")}
                    onInput={e => e.target.setCustomValidity('')}
                />
                <button className="search__button" type="submit">Найти</button>
            </form>
            < div className='search__filter-checkbox'>
                <label className="search__tumbler">
                    <input type="checkbox" className="search__checkbox" onChange={handleCheckbox} checked={shortMovies}/>
                    <span className="search__checkbox-slider"></span>
                </label>
                <p className='search__checkbox-text'>Короткометражки</p>
            </div>
        </section>
    )
}

export default SearchForm;