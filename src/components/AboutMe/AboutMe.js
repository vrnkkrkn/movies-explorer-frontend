import './AboutMe.css';
import photo from '../../images/MyPhoto.svg';

export default function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__info'>
                    <h3 className='about-me__name'>Виталий</h3>
                    <p className='about-me__description'>Фронтенд-разработчик, 30 лет</p>
                    <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <p className='about-me__link' href='https://github.com/vrnkkrkn' target='_blank' rel="noreferrer" >Github</p>
                </div>
                <img className='about-me__photo' src={photo} alt='Фотография' />
            </div>
        </section>
    )
}
