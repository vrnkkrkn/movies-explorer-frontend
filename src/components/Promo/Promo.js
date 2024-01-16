import './Promo.css'
import image from '../../images/promoImage.svg';

export default function Promo(props) {
    return (
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__landing-logo' alt='Логотип' src={image} />
        </section>
    )
}