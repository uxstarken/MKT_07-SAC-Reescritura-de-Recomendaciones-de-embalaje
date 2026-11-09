import React, { useState, useMemo, useRef } from 'react';
import { 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Wine,
  ChevronLeft,
  ChevronRight,
  ChevronDown, 
  ChevronUp, 
  Box, 
  Layers, 
  Tag, 
  Smartphone, 
  Shapes,
  Droplets, 
  Armchair, 
  Wrench, 
  Shirt, 
  ArrowRight,
  Info,
  Recycle
} from 'lucide-react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './RecomendacionesEmbalaje.css';

function MaterialIcon({ type }) {
  if (type === 'espuma') {
    return (
      <svg className="w-12 h-10 object-contain" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="24" rx="10" ry="15" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
        <ellipse cx="20" cy="24" rx="4" ry="6" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
        <path d="M20 9 L46 14 C52 15 56 19 56 24 C56 29 52 33 46 34 L20 39" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
        <ellipse cx="46" cy="24" rx="7" ry="10" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === 'carton') {
    return (
      <svg className="w-12 h-10 object-contain" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16 L32 8 L52 16 L32 24 Z" fill="#D97706" fillOpacity="0.85" stroke="#B45309" strokeWidth="1.5" />
        <path d="M12 16 L12 22 L32 30 L32 24 Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5" />
        <path d="M52 16 L52 22 L32 30 L32 24 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
        <path d="M12 25 L32 33 L52 25" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M12 27 L12 33 L32 41 L32 35 Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5" />
        <path d="M52 27 L52 33 L32 41 L32 35 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === 'film') {
    return (
      <svg className="w-12 h-10 object-contain" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="14" width="38" height="20" rx="3" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
        <ellipse cx="50" cy="24" rx="4" ry="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="16" y1="20" x2="46" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="22" width="6" height="4" rx="1" fill="#94A3B8" />
        <rect x="50" y="22" width="6" height="4" rx="1" fill="#94A3B8" />
      </svg>
    );
  }
  // madera
  return (
    <svg className="w-12 h-10 object-contain" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="28" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <line x1="32" y1="10" x2="32" y2="38" stroke="#D97706" strokeWidth="1.5" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="#D97706" strokeWidth="1.5" />
      <line x1="15" y1="12" x2="29" y2="22" stroke="#B45309" strokeWidth="1" />
      <line x1="35" y1="12" x2="49" y2="22" stroke="#B45309" strokeWidth="1" />
      <line x1="15" y1="26" x2="29" y2="36" stroke="#B45309" strokeWidth="1" />
      <line x1="35" y1="26" x2="49" y2="36" stroke="#B45309" strokeWidth="1" />
    </svg>
  );
}

// Categorías de productos y sus guías detalladas
const PRODUCT_CATEGORIES = [
  {
    id: 'fragil',
    name: 'Frágiles, vidrio y cerámica',
    icon: Wine,
    badge: 'Alta protección',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/embalaje/EMBALAJE-04.webp',
    summary: 'Los objetos frágiles necesitan un material que absorba los golpes durante todo el trayecto.',
    steps: [
      'Envuelve cada pieza con material que absorba golpes antes de colocarla en la caja.',
      'Usa una caja sellada, en buen estado y apta para el transporte.',
      'Si envías varios elementos frágiles, coloca la etiqueta de “Frágil” o de posición.'
    ],
    materials: ['Caja Starken', 'Material que absorba golpes', 'Etiqueta “Frágil” o de posición'],
    materialsNote: 'Nuestras cajas están hechas con fibras 100% recicladas.',
    donts: 'No rellenes con papel arrugado, tiras de papel ni virutas de poliestireno: no protegen bien y tu envío podría llegar dañado.',
    sacTip: 'Si envías más de un objeto de vidrio en la misma caja, asegúrate de que no choquen entre sí usando separadores de cartón.'
  },
  {
    id: 'tecnologia',
    name: 'Tecnología y objetos pequeños',
    icon: Smartphone,
    badge: 'Objetos pequeños',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/embalaje/EMBALAJE-03.webp',
    summary: 'Relojes, celulares, lápices y otros elementos pequeños deben viajar dentro de una caja más grande.',
    steps: [
      'Guarda el objeto en su caja o empaque.',
      'Si esa caja indica lo que contiene, ponla dentro de otra caja que lo oculte.',
      'Sella la caja exterior y revisa que esté en buen estado.'
    ],
    materials: ['Caja exterior más grande', 'Material que absorba golpes'],
    materialsNote: 'Nuestras cajas están hechas con fibras 100% recicladas.',
    donts: 'No envíes la caja original del producto sin una caja exterior: deja a la vista lo que contiene.',
    sacTip: 'Declara siempre el valor real de tu equipo u objeto al momento de emitir tu orden para contar con cobertura total.'
  },
  {
    id: 'muebles',
    name: 'Muebles y colchones',
    icon: Armchair,
    badge: 'Sobredimensionada',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    hasSubcategories: true,
    subcategories: [
      {
        id: 'sofas',
        name: 'Sofás y sillones',
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/muebles-sillon.jpg',
        summary: 'Deben ir completamente cubiertos de cartón corrugado rígido y reforzados con film.',
        steps: [
          'Cubre el mueble al 100% con cartón corrugado rígido.',
          'Refuerza la cobertura con film.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
          { name: 'Estructura de madera', status: 'No aplica', isNeeded: false, type: 'madera' }
        ],
        oversized: {
          title: 'CARGA SOBREDIMENSIONADA',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'comedores',
        name: 'Comedores, sitiales y poltronas',
        title: 'Juegos de comedor, sitiales y poltronas',
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/comedor-sitiales.jpg',
        summary: 'Envíalos con el embalaje original del fabricante o envueltos en polietileno sin daños.',
        opsNote: '[Texto igual al de Colchones en la página actual: validar con Operaciones]',
        steps: [
          'Usa el embalaje original del fabricante.',
          'Si no lo tienes, envuélvelo con polietileno.',
          'Revisa que el material no tenga piquetes ni aberturas.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'No aplica', isNeeded: false, type: 'film' },
          { name: 'Estructura de madera', status: 'No aplica', isNeeded: false, type: 'madera' }
        ],
        oversized: {
          title: 'CARGA SOBREDIMENSIONADA',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'colchones',
        name: 'Colchones y bases de cama',
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/colchon-cama.jpg',
        summary: 'Envíalos con el embalaje original del fabricante o envueltos en polietileno sin daños.',
        steps: [
          'Usa el embalaje original del fabricante.',
          'Si no lo tienes, envuélvelo con polietileno.',
          'Revisa que el material no tenga piquetes ni aberturas.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'No aplica', isNeeded: false, type: 'film' },
          { name: 'Estructura de madera', status: 'No aplica', isNeeded: false, type: 'madera' }
        ],
        oversized: {
          title: 'CARGA SOBREDIMENSIONADA',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      }
    ]
  }
];

// Preguntas frecuentes de SAC
const FAQ_SAC = [
  {
    q: '¿Por qué no puedo enviar mi encomienda en una bolsa de supermercado o bolsa plástica simple?',
    a: 'Las bolsas plásticas delgadas no soportan la fricción ni el apilamiento del transporte logístico. Se rasgan fácilmente, exponiendo y perdiendo tus productos. Para envíos textiles o flexibles se requieren bolsas de e-commerce de polietileno de alta resistencia o cajas de cartón corrugado.'
  },
  {
    q: '¿Puedo reutilizar una caja de cartón que ya tengo en mi casa o negocio?',
    a: '¡Sí, claro! Reutilizar cuida el planeta. Sin embargo, debes asegurarte de que la caja esté completamente rígida y sin roturas. Además, es obligatorio retirar, tachar o tapar con cinta cualquier código de barra, etiqueta o dirección antigua para que los lectores automáticos no desvíen tu encomienda.'
  },
  {
    q: '¿Dónde debe ir pegada exactamente la etiqueta de envío?',
    a: 'La etiqueta debe pegarse en la cara superior o más ancha de la caja, de forma completamente lisa y sin arrugas. Nunca la pegues sobre esquinas, aristas, ranuras de apertura ni cubierta por capas de film oscuro. Debe medir al menos 10x10 cm y ser 100% legible.'
  },
  {
    q: '¿Starken vende cajas y materiales de embalaje en sus sucursales?',
    a: 'Sí. En nuestros Puntos Starken y sucursales tradicionales encontrarás sobres acolchados y cajas de cartón corrugado en diversos tamaños (elaboradas con fibras 100% recicladas) listas para armar y proteger tu envío al instante.'
  },
  {
    q: '¿Qué sucede si envío un artículo con un embalaje deficiente?',
    a: 'Si el embalaje no cumple con las condiciones mínimas de protección y rigidez, el personal de recepción te orientará para reforzarlo antes de admitirlo. En caso de no corregirse, Starken no podrá hacerse responsable por daños derivados de una amortiguación inadecuada según las Condiciones Generales de Servicio.'
  }
];

export default function RecomendacionesEmbalaje() {
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState('sofas');
  const [openFaq, setOpenFaq] = useState(null);
  const tabsContainerRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const activeCategoryData = useMemo(() => {
    const cat = PRODUCT_CATEGORIES.find(c => c.id === selectedCategory) || PRODUCT_CATEGORIES[0];
    if (cat.hasSubcategories && cat.subcategories) {
      const sub = cat.subcategories.find(s => s.id === selectedSubcategory) || cat.subcategories[0];
      return {
        ...cat,
        ...sub,
        name: sub.name,
        title: sub.title || sub.name,
        badge: sub.badge,
        badgeColor: sub.badgeColor,
        isSubcategory: true
      };
    }
    return {
      ...cat,
      title: cat.name
    };
  }, [selectedCategory, selectedSubcategory]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <main className="flex-grow">
        {/* =========================================================================
            1. BANNER PRINCIPAL CON IMAGEN DE FONDO (ESTILO OFICIAL STARKEN)
           ========================================================================= */}
        <div className="banner-header-section w-full relative overflow-hidden bg-[#00853f] flex items-center justify-center h-[56px] sm:h-[64px] md:h-[70px] lg:h-[72px]">
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-[19px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-bold font-din tracking-tight text-white drop-shadow-sm leading-none">
              Recomendaciones de embalaje
            </h1>
          </div>
        </div>

        {/* =========================================================================
            3. CATÁLOGO INTERACTIVO POR TIPO DE PRODUCTO
           ========================================================================= */}
        <section className="py-12 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A651] bg-[#E6F5EC] px-3 py-1 rounded-full">
                  Guía personalizada
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-din text-gray-900 mt-2">
                  ¿Cómo embalar según el tipo de producto?
                </h2>
                <p className="text-gray-600 font-nunito text-sm sm:text-base mt-1">
                  Selecciona la categoría de tu artículo para ver las instrucciones específicas y materiales recomendados.
                </p>
              </div>
            </div>

            {/* Selector de Categorías (Pills con flechas de desplazamiento Desktop) */}
            <div className="relative mb-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 shadow-xs hover:bg-[#E6F5EC] hover:text-[#00A651] hover:border-[#00A651]/30 transition-all shrink-0 cursor-pointer"
                aria-label="Desplazar categorías a la izquierda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div 
                ref={tabsContainerRef}
                className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none scroll-smooth flex-grow"
              >
                {PRODUCT_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20 scale-[1.01]' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollTabs('right')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 shadow-xs hover:bg-[#E6F5EC] hover:text-[#00A651] hover:border-[#00A651]/30 transition-all shrink-0 cursor-pointer"
                aria-label="Desplazar categorías a la derecha"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido de la Categoría Seleccionada */}
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              {/* Sub-selector para Muebles y Colchones */}
              {activeCategoryData.hasSubcategories && (
                <div className="mb-8 pb-6 border-b border-gray-200/80">
                  <span className="text-[11px] font-bold font-din uppercase tracking-wider text-gray-500 mb-2.5 block">
                    ELIGE TU PRODUCTO
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {PRODUCT_CATEGORIES.find(c => c.id === 'muebles')?.subcategories.map((sub) => {
                      const isSubSelected = selectedSubcategory === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setSelectedSubcategory(sub.id)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            isSubSelected
                              ? 'bg-white text-[#00A651] border-2 border-[#00A651] shadow-xs'
                              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Izquierda: Pasos y Recomendaciones */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeCategoryData.badgeColor}`}>
                      {activeCategoryData.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold font-din text-gray-900">
                      {activeCategoryData.title || activeCategoryData.name}
                    </h3>
                  </div>

                  <p className="text-gray-700 font-nunito text-base mb-4 leading-relaxed">
                    {activeCategoryData.summary}
                  </p>

                  {/* Nota de validación con Operaciones si existe */}
                  {activeCategoryData.opsNote && (
                    <div className="mb-6">
                      <span className="inline-block border border-dashed border-amber-400 text-amber-800 bg-amber-50/70 rounded-md px-3 py-1.5 text-xs font-semibold font-nunito">
                        {activeCategoryData.opsNote}
                      </span>
                    </div>
                  )}

                  <h4 className="text-xs sm:text-sm font-bold font-din uppercase tracking-wider text-[#00853f] mb-4">
                    INSTRUCCIONES DE EMBALAJE
                  </h4>

                  <div className="space-y-3 mb-8">
                    {activeCategoryData.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-xs">
                        <div className="w-6 h-6 rounded-full bg-[#E6F5ED] text-[#00A651] flex items-center justify-center font-din font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-700 font-nunito leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Materiales Necesarios (en Muebles) o Alerta Lo que debes evitar (en otras categorías) */}
                  {activeCategoryData.materialsList ? (
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold font-din uppercase tracking-wider text-gray-900 mb-3">
                        MATERIALES NECESARIOS
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeCategoryData.materialsList.map((item, idx) => (
                          <div 
                            key={idx}
                            className={`bg-white rounded-2xl p-3.5 sm:p-4 border transition-all flex flex-col justify-between items-start gap-3 shadow-xs ${
                              item.isNeeded ? 'border-emerald-300 hover:border-[#00A651]' : 'border-gray-200 bg-gray-50/50'
                            }`}
                          >
                            <div className="w-full h-12 flex items-center justify-center">
                              <MaterialIcon type={item.type} />
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold font-din text-gray-900 leading-tight mb-1.5">
                                {item.name}
                              </h5>
                              <span className={`inline-block text-[11px] font-bold font-din px-2 py-0.5 rounded-full ${
                                item.isNeeded 
                                  ? 'bg-[#E6F5EC] text-[#00A651]' 
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Alerta de Error Común (Don't) */
                    <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-bold font-din text-rose-900 mb-1">
                          Lo que debes evitar
                        </h5>
                        <p className="text-xs sm:text-sm text-rose-800 font-nunito leading-relaxed">
                          {activeCategoryData.donts}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna Derecha: Fotografía + Carga Sobredimensionada o Materiales Clave + Tip SAC */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  {/* Fotografía de los elementos de la categoría */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-48 sm:h-56 flex items-center justify-center">
                      <img 
                        src={activeCategoryData.image} 
                        alt={activeCategoryData.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Si es sobredimensionada (muebles) mostrar tarjeta de Carga Sobredimensionada */}
                  {activeCategoryData.oversized ? (
                    <div className="bg-white border border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs flex items-start gap-4">
                      <div className="w-14 h-20 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22 L32 12 L52 22 L32 32 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
                          <path d="M12 22 L12 68 L32 78 L32 32 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
                          <path d="M52 22 L52 68 L32 78 L32 32 Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5"/>
                          <rect x="16" y="32" width="12" height="16" rx="1" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1"/>
                          <path d="M22 36 L22 41 M20 37 L24 37" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                          <ellipse cx="22" cy="44" rx="2" ry="1" fill="#DC2626"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-extrabold font-din uppercase tracking-wider text-[#9A3412] mb-1.5">
                          {activeCategoryData.oversized.title}
                        </h4>
                        <p className="text-xs text-gray-700 font-nunito leading-relaxed mb-3">
                          {activeCategoryData.oversized.text}
                        </p>
                        <a 
                          href={activeCategoryData.oversized.linkUrl} 
                          className="text-xs font-bold font-din text-[#00853f] hover:underline inline-flex items-center gap-1"
                        >
                          {activeCategoryData.oversized.linkText}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Materiales requeridos */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                        <h4 className="text-xs sm:text-sm font-bold font-din uppercase tracking-wider text-gray-900 mb-4">
                          MATERIALES RECOMENDADOS
                        </h4>
                        <ul className="space-y-2.5">
                          {activeCategoryData.materials?.map((mat, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-nunito text-gray-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00A651]"></div>
                              <span>{mat}</span>
                            </li>
                          ))}
                        </ul>
                        {activeCategoryData.materialsNote && (
                          <p className="text-xs font-nunito text-gray-500 mt-4 leading-relaxed">
                            {activeCategoryData.materialsNote}
                          </p>
                        )}
                      </div>

                      {/* Tip SAC */}
                      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                        <div className="flex items-center gap-2 text-[#00A651] text-xs font-bold uppercase tracking-wider mb-2">
                          <Info className="w-4 h-4" />
                          Consejo de Servicio al Cliente
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-100 font-nunito leading-relaxed">
                          "{activeCategoryData.sacTip}"
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. DO'S & DON'TS: BUENAS VS. MALAS PRÁCTICAS VISUALES
           ========================================================================= */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-din text-gray-900 mb-3">
              ¿Qué SÍ hacer y qué NO hacer?
            </h2>
            <p className="text-gray-600 font-nunito text-sm sm:text-base">
              Identifica rápidamente los hábitos correctos que garantizan el transporte sin contratiempos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tarjeta SÍ HACER */}
            <div className="bg-emerald-50/70 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-din text-emerald-950">
                    Buenas Prácticas
                  </h3>
                  <p className="text-xs text-emerald-800 font-nunito">Garantizan tu garantía y seguridad</p>
                </div>
              </div>

              <ul className="space-y-4 font-nunito text-sm text-emerald-950">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Caja rígida adecuada:</strong> Cajas de cartón corrugado intactas, limpias y proporcionales.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Doble caja para objetos pequeños:</strong> Relojes, celulares o joyas siempre dentro de una segunda caja mayor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cinta de 50mm en "H":</strong> Sellado firme de solapas centrales y bordes laterales.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Etiqueta plana y despejada:</strong> Pegada en la cara superior sobre fondo claro, visible a primera vista.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta NO HACER */}
            <div className="bg-rose-50/70 border-2 border-rose-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-din text-rose-950">
                    Errores Comunes
                  </h3>
                  <p className="text-xs text-rose-800 font-nunito">Causantes del 95% de las incidencias</p>
                </div>
              </div>

              <ul className="space-y-4 font-nunito text-sm text-rose-950">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Bolsas plásticas delgadas:</strong> Bolsas de supermercado o basura no son admitidas para transporte.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Papel de diario como amortiguador:</strong> El papel arrugado pierde volumen y no protege contra caídas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Etiqueta doblada en esquinas:</strong> Impide que los escáneres automáticos lean el código de barras.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Dejar códigos antiguos visibles:</strong> Si reutilizas cajas, tapa completamente etiquetas anteriores.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. GUÍA VISUAL DE ETIQUETADO Y ROTULADO (10x10 CM)
           ========================================================================= */}
        <section className="py-12 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A651] bg-[#00A651]/20 px-3 py-1 rounded-full">
                  Rotulado Óptimo
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-din text-white mt-3 mb-4">
                  ¿Cómo rotular y pegar tu etiqueta?
                </h2>
                <p className="text-gray-300 font-nunito text-sm sm:text-base leading-relaxed mb-6">
                  Una etiqueta correctamente instalada permite que las cintas transportadoras y lectores ópticos 
                  clasifiquen tu encomienda al instante, evitando retrasos o desvíos.
                </p>

                <div className="space-y-4 font-nunito">
                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Tag className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-300">
                      <strong className="text-white">Medida estándar:</strong> El tamaño mínimo recomendado de la etiqueta es de <strong>10 x 10 cm</strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Layers className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-300">
                      <strong className="text-white">Siempre por encima:</strong> La etiqueta debe ir pegada <em>por sobre</em> cualquier film o envoltorio protector.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Box className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-300">
                      <strong className="text-white">Dos etiquetas distintas:</strong> Si necesitas colocar dos rótulos diferentes, colócalos en caras separadas del paquete para evitar confusiones.
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagrama Visual de Etiquetado */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center">
                  <div className="w-48 h-36 mx-auto bg-gradient-to-tr from-amber-700/80 to-amber-600 rounded-xl border-2 border-amber-500 shadow-xl relative flex items-center justify-center mb-6">
                    {/* Simulación Caja 3D / Rótulo */}
                    <div className="absolute top-3 left-4 bg-white text-gray-900 rounded-md p-2 shadow-lg border border-gray-300 flex flex-col items-center">
                      <div className="w-16 h-2 bg-gray-800 mb-1 rounded-xs"></div>
                      <div className="w-12 h-1 bg-gray-400 mb-1"></div>
                      <div className="w-14 h-4 bg-black/90 flex items-center justify-center text-[7px] text-white font-mono">
                        ||||| ||| ||
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-200 mt-12 font-din tracking-wider">CARA SUPERIOR</span>
                  </div>

                  <h4 className="text-base font-bold font-din text-white mb-2">
                    Ubicación recomendada
                  </h4>
                  <p className="text-xs text-gray-300 font-nunito leading-relaxed">
                    Cara superior más ancha. Si creas tu envío online, puedes imprimirla en casa o solicitar su impresión <strong>completamente gratis</strong> en cualquier Punto Starken.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. PREGUNTAS FRECUENTES SAC (ACORDEÓN)
           ========================================================================= */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A651] bg-[#E6F5EC] px-3 py-1 rounded-full">
              Dudas frecuentes de usuarios
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-din text-gray-900 mt-3 mb-3">
              Preguntas frecuentes sobre embalaje
            </h2>
            <p className="text-gray-600 font-nunito text-sm sm:text-base">
              Resolvemos las consultas más recurrentes canalizadas a través de nuestro equipo de Servicio al Cliente.
            </p>
          </div>

          <div className="space-y-3 font-nunito">
            {FAQ_SAC.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isOpen ? 'border-[#00A651] bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900 font-din">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#E6F5ED] text-[#00A651]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            7. ASISTENCIA DIRECTA & ENLACES RELACIONADOS
           ========================================================================= */}
        <section className="py-12 bg-emerald-50/50 border-t border-emerald-100 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#1E7E45] to-[#00A651] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
                  Atención Personalizada SAC
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-din text-white mb-2">
                  ¿Tienes dudas con un paquete especial?
                </h3>
                <p className="text-emerald-100 font-nunito text-sm sm:text-base leading-relaxed">
                  Si tu carga es muy pesada, tiene medidas atípicas o necesitas asesoría antes de despachar, nuestro equipo de soporte está listo para orientarte.
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-4 flex justify-start md:justify-center items-center">
                <button 
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-starkin-chat'))}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#1E7E45] font-bold rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition-all font-nunito text-sm cursor-pointer"
                >
                  <span>Asistente en chat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <HomeChatbot />
    </div>
  );
}
