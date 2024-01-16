import successImage from '../../images/success.svg';
import failImage from '../../images/success.svg';
import './PopupInfo.css'


export default function PopupInfo({ status, isOpen, onClose }) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={onClose} />
                <img className="popup__image-status" src={`${status ? successImage : failImage}`} alt="Сообщение о статусе редактирования профиля" />
                <h2 className="popup__text-status">{`${status ? "Успешно :)" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </section>
    )
}