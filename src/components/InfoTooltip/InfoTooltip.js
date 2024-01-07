import { Link } from 'react-router-dom';
import './InfoTooltip.css';

export default function InfoTooltip() {
  return (
    <section className='page-notfound'>
      <h2 className='page-notfound__title'>404</h2>
      <p className='page-notfound__subtitle'>Страница не найдена</p>
      <Link to='/' className='page-notfound__link' >Назад</Link>
    </section>
  )
}
