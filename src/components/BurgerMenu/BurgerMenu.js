import './BurgerMenu.css'
import { Link } from "react-router-dom";
import profileLogo from '../../images/profileLogo.svg';

export default function BurgerMenu({ onClick, isOpen, onClose }) {

    const burgerMenuButton = `burger-menu__visible ${isOpen ? 'burger-menu__hidden' : 'burger-menu__visible'}`;
    const burgerMenuContent = `burger-menu ${isOpen ? 'burger-menu__open' : ' '}`;

    return (
        <>
            <button className={burgerMenuButton}
                onClick={onClick}
            />
            <div className={burgerMenuContent}>
                <div className="burger-menu__nav">
                    <Link className="burger-menu__link" to="/">Главная</Link>
                    <Link className="burger-menu__link burger-menu__link_underline" to="/movies">Фильмы</Link>
                    <Link className="burger-menu__link" to="/saved-movies">Сохранённые фильмы</Link>
                </div>
                <div className='burger-menu__login'>
                    <Link className="burger-menu__account" to="/profile">Аккаунт</Link>
                    <Link className="burger-menu__profile" to="/profile" src={profileLogo} alt='Лого профиля'></Link>
                </div>
                <button className="burger-menu__close" onClick={onClose} />
            </div>

        </>
    )
}