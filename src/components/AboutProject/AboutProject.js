import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='project'>
      <h2 className='project__title'>О проекте</h2>
      <ul className='project__information'>
        <li className='project__info'>
          <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='project__info'>
          <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className='project__time'>
        <li className='project__week'>
          <div className='project__time-backend'>1 неделя</div>
          <p className='project__name'>Back-end</p>
        </li>
        <li className='project__week'>
          <div className='project__time-frontend'>4 недели</div>
          <p className='project__name'>Front-end</p>
        </li>
      </ul>
    </section>
  )
}