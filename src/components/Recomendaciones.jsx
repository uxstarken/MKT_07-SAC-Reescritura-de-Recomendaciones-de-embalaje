import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Recomendaciones.css';

const Recomendaciones = () => {
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      id: 1,
      title: 'Recomendaciones de embalaje',
      desc: 'Aprende a proteger tus envíos y garantizar que lleguen en perfectas condiciones a destino.'
    },
    {
      id: 2,
      title: 'Carga prohibida',
      desc: 'Conoce los artículos y sustancias que por seguridad y normativa legal no pueden ser transportados.'
    },
    {
      id: 3,
      title: 'Condiciones generales de servicio',
      desc: 'Consulta los términos, coberturas y directrices de transporte y entrega de Starken.'
    }
  ];

  return (
    <section className="recom-section" ref={sectionRef}>
      {/* Caja verde que contiene las tarjetas y el fondo */}
      <div className="recom-green-box">
        {/* Fondo con la mascota y las flechas */}
        <div className="recom-bg-image"></div>
        
        {/* Contenido (tarjetas y título) */}
        <div className={`recom-content-container ${isVisible ? 'animate-fade-left' : ''}`}>
          <h2 className="recom-title font-din">RECOMENDACIONES</h2>
          
          <div className="recom-list">
            {items.map((item, idx) => (
              <div 
                key={item.id} 
                className="recom-card"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="recom-card-text">
                  <h3 className="font-din">{item.title}</h3>
                  <p className="font-nunito">{item.desc}</p>
                </div>
                {item.id === 1 ? (
                  <Link 
                    to="/recomendaciones-embalaje" 
                    className="recom-btn font-nunito inline-flex items-center justify-center text-center no-underline"
                  >
                    Conocer más
                  </Link>
                ) : (
                  <button 
                    type="button" 
                    onClick={(e) => e.preventDefault()} 
                    className="recom-btn font-nunito"
                  >
                    Conocer más
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recomendaciones;
