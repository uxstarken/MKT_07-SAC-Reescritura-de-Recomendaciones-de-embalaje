import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const location = useLocation();
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(124);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsNavbarVisible(true);
      return;
    }

    let lastScrollYVal = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYVal;
      lastScrollYVal = currentScrollY;

      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      if (currentScrollY <= 80) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      if (accumulatedDelta > 15) {
        setIsNavbarVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen, location.pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isHome = location.pathname === '/';

  return (
    <div className="navbar-wrapper" style={{ minHeight: `${navbarHeight}px` }}>
      <div 
        ref={navbarRef}
        className={`navbar-container ${!isHome ? 'navbar-static' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''} ${isHome && !isNavbarVisible ? 'navbar-hidden' : ''}`}
      >
        {/* Top Navigation Row */}
        <div className="top-nav">
          <div className="top-nav-segments">
            <a href="#" onClick={(e) => e.preventDefault()} className="segment-link active font-nunito">Personas</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="segment-link font-nunito">Emprendedores</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="segment-link font-nunito">Empresas</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="segment-link font-nunito">Internacional</a>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="top-nav-help font-nunito">
            Centro de ayuda 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </a>
        </div>

        {/* Main Navigation Row */}
        <nav className="main-nav">
          <div className="main-nav-left">
            <Link to="/" className="nav-brand-link">
              <img src="/logo.png" alt="Starken Logo" className="nav-logo" />
            </Link>
          </div>
          
          <div className="main-links">
            <a href="#" onClick={(e) => e.preventDefault()} className="main-link font-nunito">
              Envíos
              <svg className="chevron-down" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            
            <a href="#" onClick={(e) => e.preventDefault()} className="main-link font-nunito">
              Puntos red Starken
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="main-link font-nunito">
              Servicios
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="main-link font-nunito">
              Tarifas
            </a>
          </div>

          <div className="main-nav-right">
            <div className="nav-actions">
              <button 
                type="button" 
                onClick={(e) => e.preventDefault()} 
                className="btn-ingresar font-nunito"
              >
                Ingresar
              </button>
            </div>

            {/* Hamburger Button (Visible only on mobile) */}
            <button 
              type="button"
              className="hamburger-btn" 
              onClick={() => setIsMobileMenuOpen(true)} 
              aria-label="Abrir menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <img src="/logo.png" alt="Starken Logo" className="mobile-menu-logo" />
              <button 
                type="button"
                className="mobile-menu-close-btn" 
                onClick={() => setIsMobileMenuOpen(false)} 
                aria-label="Cerrar menú"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="mobile-menu-content">
              <div className="mobile-menu-links">
                <a href="#" className="mobile-menu-link font-nunito" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                  <span>Envíos</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a href="#" className="mobile-menu-link font-nunito" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                  <span>Puntos red Starken</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a href="#" className="mobile-menu-link font-nunito" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                  <span>Servicios</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a href="#" className="mobile-menu-link font-nunito" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                  <span>Tarifas</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </div>
              
              <div className="mobile-menu-divider"></div>
              
              <a href="#" className="mobile-menu-help font-nunito" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Centro de ayuda</span>
              </a>
              
              <div className="mobile-menu-actions">
                <button 
                  type="button" 
                  className="mobile-btn-ingresar font-nunito" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
