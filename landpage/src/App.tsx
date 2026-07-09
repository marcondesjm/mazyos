import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ContactForm from './ContactForm'
import FeaturesShowcase from './FeaturesShowcase'
import TerminalDemo from './TerminalDemo'
import Testimonials from './Testimonials'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>MazyOS</h1>
          <p>
            O sistema operacional do seu negócio dentro do Claude Code
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Contador: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <FeaturesShowcase />

      <div className="ticks"></div>

      <TerminalDemo />

      <div className="ticks"></div>

      <Testimonials />

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentação</h2>
          <p>Sua empresa com inteligência artificial</p>
          <ul>
            <li>
              <a href="https://github.com/mazzeoia/MazyOS" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                GitHub MazyOS
              </a>
            </li>
            <li>
              <a href="https://mazzeoia.com.br" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Site oficial
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Conecte-se</h2>
          <p>Faça parte da comunidade MazyOS</p>
          <ul>
            <li>
              <a href="https://github.com/mazzeoia/MazyOS" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:contato@mazzeoia.com.br">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#social-icon"></use>
                </svg>
                Email
              </a>
            </li>
          </ul>
        </div>
      </section>

      <ContactForm />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
