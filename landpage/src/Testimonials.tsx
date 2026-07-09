import { useState, useEffect } from 'react';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'CEO',
    company: 'TechStart',
    content: 'O MazyOS transformou completamente a forma como gerenciamos nosso marketing digital. Em 30 dias, dobramos nossa taxa de conversão.',
    avatar: 'AS',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Diretor de Marketing',
    company: 'GrowthLab',
    content: 'Com as skills de SEO e criação de conteúdo, conseguimos posicionar nossa marca como referência no setor em apenas 3 meses.',
    avatar: 'CM',
    rating: 5
  },
  {
    id: 3,
    name: 'Juliana Costa',
    role: 'Empreendedora',
    company: 'Loja Online',
    content: 'Como solopreneur, o MazyOS é como ter um time inteiro. As automações me economizam 20 horas por semana.',
    avatar: 'JC',
    rating: 5
  },
  {
    id: 4,
    name: 'Roberto Alves',
    role: 'Gerente de Produtos',
    company: 'InovaCorp',
    content: 'A análise de dados automatizada nos ajudou a identificar oportunidades que estávamos perdendo. ROI aumentou 340%.',
    avatar: 'RA',
    rating: 5
  },
  {
    id: 5,
    name: 'Fernanda Oliveira',
    role: 'Diretora Comercial',
    company: 'VendaPro',
    content: 'O sistema de criação de anúncios é incrível. Nossas campanhas agora são 5x mais eficientes que antes.',
    avatar: 'FO',
    rating: 5
  },
  {
    id: 6,
    name: 'Marcos Pereira',
    role: 'Fundador',
    company: 'StartupX',
    content: 'O MazyOS não é só uma ferramenta, é um parceiro de negócios. Crescemos 300% no último ano graças a ele.',
    avatar: 'MP',
    rating: 5
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Get current, next and previous testimonials for carousel effect
  const getCurrentTestimonials = () => {
    const current = testimonials[currentIndex];
    const next = testimonials[(currentIndex + 1) % testimonials.length];
    const prev = testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length];
    return { current, next, prev };
  };

  const { current, next, prev } = getCurrentTestimonials();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">O que dizem sobre o MazyOS</h2>
        <p className="testimonials-description">
          Empresas de todos os tamanhos estão transformando seus negócios com inteligência artificial
        </p>

        <div className="testimonials-carousel">
          <button
            className="carousel-button prev"
            onClick={prevTestimonial}
            aria-label="Depoimento anterior"
          >
            ‹
          </button>

          <div
            className="testimonials-track"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="testimonial-card prev-card">
              <div className="testimonial-avatar secondary">{prev.avatar}</div>
              <h3 className="testimonial-name">{prev.name}</h3>
              <p className="testimonial-role">{prev.role} na {prev.company}</p>
              <div className="testimonial-rating">{renderStars(prev.rating)}</div>
              <p className="testimonial-content">"{prev.content}"</p>
            </div>

            <div className="testimonial-card current-card">
              <div className="testimonial-avatar primary">{current.avatar}</div>
              <h3 className="testimonial-name">{current.name}</h3>
              <p className="testimonial-role">{current.role} na {current.company}</p>
              <div className="testimonial-rating">{renderStars(current.rating)}</div>
              <p className="testimonial-content">"{current.content}"</p>
            </div>

            <div className="testimonial-card next-card">
              <div className="testimonial-avatar secondary">{next.avatar}</div>
              <h3 className="testimonial-name">{next.name}</h3>
              <p className="testimonial-role">{next.role} na {next.company}</p>
              <div className="testimonial-rating">{renderStars(next.rating)}</div>
              <p className="testimonial-content">"{next.content}"</p>
            </div>
          </div>

          <button
            className="carousel-button next"
            onClick={nextTestimonial}
            aria-label="Próximo depoimento"
          >
            ›
          </button>
        </div>

        <div className="testimonials-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>

        <div className="autoplay-control">
          <button
            className={`autoplay-button ${isAutoPlaying ? 'playing' : 'paused'}`}
            onClick={toggleAutoPlay}
            aria-label={isAutoPlaying ? "Pausar carrossel" : "Iniciar carrossel"}
          >
            {isAutoPlaying ? '❚❚' : '▶'}
          </button>
          <span className="autoplay-label">
            {isAutoPlaying ? 'Pausar' : 'Iniciar'} apresentação automática
          </span>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;