import { useNavigate } from 'react-router-dom';
import './InfoTooltip.css';

export default function InfoTooltip() {
  const navigate = useNavigate();
  return (
    <section className='page-notfound'>
      <h2 className='page-notfound__title'>404</h2>
      <p className='page-notfound__subtitle'>Страница не найдена</p>
      <button onClick={() => navigate(-3)} className='page-notfound__link'>Назад</button>
    </section>
  )
}
