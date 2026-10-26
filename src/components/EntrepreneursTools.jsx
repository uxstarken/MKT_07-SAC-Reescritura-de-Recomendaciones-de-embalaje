import React, { useState, useEffect, useRef } from 'react';
import './EntrepreneursTools.css';

const EntrepreneursTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' 
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="entrepreneurs-section" ref={sectionRef}>
      <h2 className="entrepreneurs-title font-din">
        Herramientas para <span>emprendedores</span>
      </h2>

      {/* Contenedor de Banners Horizontales */}
      <div className={`ep-banners-row ${isVisible ? 'animate-zoom-in' : ''}`}>
        {/* Banner 1: Somos Partner */}
        <div className="ep-banner ep-banner-sp">
          {/* First column: Logo */}
          <div className="ep-banner-logo-col">
            <img src="/logo-sp.png" alt="Somos Partner" className="ep-logo-large" />
          </div>

          {/* Second column: Text Content */}
          <div className="ep-banner-text-col">
            <h3 className="ep-banner-title font-din">
              Inscríbete y accede a<br />
              <strong><span>todos</span> nuestros <span>beneficios</span></strong>
            </h3>
            <p className="ep-banner-desc font-nunito">
              Integra plugins en tu e-commerce y mejora la experiencia de tus envíos.
            </p>
          </div>

          <div className="ep-banner-middle-action">
            <button 
              type="button" 
              onClick={(e) => e.preventDefault()} 
              className="ep-btn-orange font-nunito"
            >
              Inscríbete en Somos Partner
            </button>
          </div>

          <div className="ep-banner-right ep-sp-right">
            <img src="/mujer-sp.png" alt="Mujer en bean bag" className="ep-banner-img" />
          </div>
        </div>
      </div>

      {/* Tarjetas Secundarias */}
      <div className={`ep-cards-grid ${isVisible ? 'animate-cards' : ''}`}>
        {/* Card 1: Clientes Empresa */}
        <div className="ep-card-wrapper" style={{ animationDelay: '0.2s' }}>
          <div className="ep-card">
            <div className="ep-card-img-container">
              <img src="/clientes empresa.png" alt="Clientes Empresa" />
            </div>
            <div className="ep-card-content">
              <h4 className="ep-card-title font-din">Clientes Empresa</h4>
              <p className="ep-card-desc font-nunito">
                Te invitamos a formar parte de nuestro mundo empresas y disfrutar
                de los servicios que tenemos para ti.
              </p>
              <button 
                type="button" 
                onClick={(e) => e.preventDefault()} 
                className="ep-btn-green font-nunito"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Internacional */}
        <div className="ep-card-wrapper" style={{ animationDelay: '0.4s' }}>
          <div className="ep-card">
            <div className="ep-card-img-container">
              <img src="/mujer-internacional.png" alt="Internacional" />
            </div>
            <div className="ep-card-content">
              <h4 className="ep-card-title font-din">Internacional</h4>
              <p className="ep-card-desc font-nunito">
                Facilitamos la recepción de paquetes desde el extranjero con el respaldo de una red experta en logística.
              </p>
              <button 
                type="button" 
                onClick={(e) => e.preventDefault()} 
                className="ep-btn-green font-nunito"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneursTools;
