import React from 'react'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__item'><a className="portfolio__link" href="https://github.com/vrnkkrkn/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт </a></li>
        <li className='portfolio__item'><a className="portfolio__link" href="https://github.com/vrnkkrkn/russian-travel" target="_blank" rel="noreferrer"> Адаптивный сайт</a></li>
        <li className='portfolio__item'><a className="portfolio__link" href="https://github.com/vrnkkrkn/react-mesto-api-full-gha" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
      </ul>
    </section>
  )
}