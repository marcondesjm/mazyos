import { useState } from 'react';
import './FeaturesShowcase.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  category: string;
}

const features: Feature[] = [
  {
    id: 'salvar',
    title: 'Salvar no GitHub',
    description: 'Versionamento automático do seu trabalho',
    icon: '💾',
    details: 'Commit e push automáticos para o GitHub com histórico organizado. Nunca perca seu trabalho.',
    category: 'Núcleo'
  },
  {
    id: 'carrossel',
    title: 'Criar Carrosséis',
    description: 'Conteúdo visual profissional em segundos',
    icon: '🎨',
    details: 'Gere carrosséis 1080×1350 com identidade visual consistente, com ou sem fotos IA.',
    category: 'Conteúdo'
  },
  {
    id: 'publicar-tema',
    title: 'Publicar Temas',
    description: 'Blog + carrossel + legendas integrados',
    icon: '📝',
    details: 'Transforme um tema em artigo de blog completo, carrossel e legendas alinhadas.',
    category: 'Conteúdo'
  },
  {
    id: 'seo',
    title: 'SEO Completo',
    description: 'Otimização de presença digital',
    icon: '🔍',
    details: 'Fluxo completo de 8 passos: demanda, concorrência, GMB, on-page, conteúdo, ads, monitoramento.',
    category: 'Conteúdo'
  },
  {
    id: 'anuncio-google',
    title: 'Anúncios Google',
    description: 'Campanhas prontas para importar',
    icon: '📢',
    details: 'Monte campanhas completas em CSV prontas para importar no Google Ads Editor.',
    category: 'Anúncios'
  },
  {
    id: 'relatorio-ads',
    title: 'Relatórios de Ads',
    description: 'Análise inteligente de campanhas',
    icon: '📊',
    details: 'Analisa exports do Google e Meta e gera relatórios com alertas e recomendações.',
    category: 'Anúncios'
  },
  {
    id: 'analisar-dados',
    title: 'Análise de Dados',
    description: 'Insights executivos de qualquer dado',
    icon: '📈',
    details: 'Leia CSV/XLSX/PDF e gere resumos executivos com insights acionáveis.',
    category: 'Produção'
  },
  {
    id: 'email-profissional',
    title: 'Emails Profissionais',
    description: 'Comunicação eficaz em segundos',
    icon: '✉️',
    details: 'Rascunhe emails profissionais a partir de contexto livre e tom personalizado.',
    category: 'Produção'
  }
];

function FeaturesShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', 'Núcleo', 'Conteúdo', 'Anúncios', 'Produção'];

  const filteredFeatures = activeCategory === 'Todas'
    ? features
    : features.filter(feature => feature.category === activeCategory);

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
  };

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <h2 className="features-title">O que o MazyOS faz por você</h2>
        <p className="features-description">
          Transforme sua empresa com inteligência artificial. 15 skills prontas para marketing, SEO,
          anúncios e operação do dia a dia.
        </p>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="features-grid">
          {filteredFeatures.map(feature => (
            <div
              key={feature.id}
              className="feature-card"
              onClick={() => handleFeatureClick(feature)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFeatureClick(feature);
                }
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-category">{feature.category}</div>
            </div>
          ))}
        </div>

        {selectedFeature && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleCloseModal} aria-label="Fechar">
                ×
              </button>
              <div className="modal-content">
                <div className="modal-icon">{selectedFeature.icon}</div>
                <h3 className="modal-title">{selectedFeature.title}</h3>
                <div className="modal-category">{selectedFeature.category}</div>
                <p className="modal-description">{selectedFeature.description}</p>
                <p className="modal-details">{selectedFeature.details}</p>
                <div className="modal-cta">
                  <button className="modal-action-button">
                    Experimentar /{selectedFeature.id}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturesShowcase;