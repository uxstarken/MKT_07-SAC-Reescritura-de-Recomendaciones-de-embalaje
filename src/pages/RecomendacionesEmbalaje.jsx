import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Package,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Search,
  Wine,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Shapes,
  Droplets,
  Armchair,
  Wrench,
  Shirt,
  ArrowRight,
  Info,
  Recycle,
  Tv,
  Car,
  Palette,
  Bed,
  DoorClosed,
  Cog,
  Shield,
  Maximize2,
  Table
} from 'lucide-react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './RecomendacionesEmbalaje.css';

// Fotografías macro de estudio para texturas de materiales de embalaje (fondo blanco puro)
const MATERIAL_IMAGES = {
  espuma: '/material-espuma.jpg?v=macro',
  carton: '/material-carton.jpg?v=macro',
  film: '/material-film.jpg?v=macro',
  madera: '/material-madera.jpg?v=macro',
  etiqueta: '/material-etiqueta.jpg?v=macro'
};

// Categorías de productos y sus guías detalladas
const PRODUCT_CATEGORIES = [
  {
    id: 'fragil',
    name: 'Frágiles, vidrio y cerámica',
    icon: Wine,
    badge: 'Alta protección',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/fragil-embalaje.jpg',
    summary: 'Los objetos frágiles necesitan un material que absorba los golpes durante todo el trayecto.',
    steps: [
      'Envuelve cada pieza con material que absorba golpes antes de colocarla en la caja.',
      'Usa una caja sellada, en buen estado y apta para el transporte.',
      'Si envías varios elementos frágiles, coloca la etiqueta de “Frágil” o de posición.'
    ],
    materialsTitle: 'Materiales recomendados',
    materialsList: [
      { name: 'Caja Starken', status: 'Recomendado', isNeeded: true, type: 'carton' },
      { name: 'Material que absorba golpes', status: 'Recomendado', isNeeded: true, type: 'espuma' },
      { name: 'Etiqueta “Frágil” o de posición', status: 'Recomendado', isNeeded: true, type: 'etiqueta' }
    ],
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
    image: '/tecnologia-embalaje.jpg',
    summary: 'Relojes, celulares, lápices y otros elementos pequeños deben viajar dentro de una caja más grande.',
    steps: [
      'Guarda el objeto en su caja o empaque.',
      'Si esa caja indica lo que contiene, ponla dentro de otra caja que lo oculte.',
      'Sella la caja exterior y revisa que esté en buen estado.'
    ],
    materialsTitle: 'Materiales recomendados',
    materialsList: [
      { name: 'Caja exterior más grande', status: 'Recomendado', isNeeded: true, type: 'carton' },
      { name: 'Material que absorba golpes', status: 'Recomendado', isNeeded: true, type: 'espuma' },
      { name: 'Cinta o film de sellado', status: 'Recomendado', isNeeded: true, type: 'film' }
    ],
    materialsNote: 'Nuestras cajas están hechas con fibras 100% recicladas.',
    donts: 'No envíes la caja original del producto sin una caja exterior: deja a la vista lo que contiene.',
    sacTip: 'Declara siempre el valor real de tu equipo u objeto al momento de emitir tu orden para contar con cobertura total.'
  },
  {
    id: 'muebles',
    name: 'Muebles',
    icon: Armchair,
    badge: 'Sobredimensionada',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    hasSubcategories: true,
    subcategories: [
      {
        id: 'sofas',
        name: 'Sofás y sillones',
        shortName: 'Sofás',
        icon: Armchair,
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
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'comedores',
        name: 'Comedores, sitiales y poltronas',
        shortName: 'Comedores',
        title: 'Juegos de comedor, sitiales y poltronas',
        icon: Table,
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/comedor-sitiales.jpg',
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
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'colchones',
        name: 'Colchones y bases de cama',
        shortName: 'Camas',
        icon: Bed,
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
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      }
    ]
  },
  {
    id: 'electrodomesticos',
    name: 'Electrodomésticos',
    icon: Tv,
    badge: 'Sobredimensionada',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/electrodomesticos.jpg',
    summary: 'El embalaje depende de si el producto se puede desarmar o va armado.',
    steps: [
      'Si es armable, embálalo en cajas de cartón corrugado rígido.',
      'Si va armado, protege sus superficies con film.',
      'Luego cúbrelo por encima con cartón corrugado.'
    ],
    materialsList: [
      { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
      { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
      { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
      { name: 'Estructura de madera', status: 'Necesario', isNeeded: true, type: 'madera' }
    ],
    oversized: {
      title: 'Carga sobredimensionada',
      text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
      linkText: 'Ver condiciones de carga sobredimensionada →',
      linkUrl: '#'
    }
  },
  {
    id: 'vehiculos',
    name: 'Partes y repuestos de vehículos',
    icon: Car,
    badge: 'Sobredimensionada',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    hasSubcategories: true,
    subcategories: [
      {
        id: 'parachoques',
        name: 'Parachoques',
        shortName: 'Parachoques',
        icon: Shield,
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/repuestos-parachoques.jpg',
        summary: 'Por su tamaño y materiales, necesitan una envoltura que los proteja en todo su largo.',
        steps: [
          'Envuélvelo en plástico burbuja o espuma.',
          'Asegúralo con cartón corrugado.',
          'Cúbrelo con film.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
          { name: 'Estructura de madera', status: 'No aplica', isNeeded: false, type: 'madera' }
        ],
        oversized: {
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'puertas',
        name: 'Puertas',
        shortName: 'Puertas',
        icon: DoorClosed,
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/repuestos-puertas.jpg',
        summary: 'Protege las esquinas, bordes y manillas antes de recubrir la estructura completa.',
        steps: [
          'Protege los ángulos, bordes y manillas con cantoneras o espuma de alta densidad.',
          'Envuelve la pieza por completo en plástico burbuja o espuma.',
          'Refuerza con cartón corrugado rígido y sella con film de alta resistencia.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
          { name: 'Estructura de madera', status: 'Necesario', isNeeded: true, type: 'madera' }
        ],
        oversized: {
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'parabrisas',
        name: 'Parabrisas',
        shortName: 'Parabrisas',
        icon: Maximize2,
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/repuestos-parabrisas.jpg',
        summary: 'Los vidrios y parabrisas requieren estructura rígida tipo huacal para evitar torsiones e impactos.',
        steps: [
          'Envuelve el vidrio con abundante plástico burbuja o láminas de espuma.',
          'Fija placas rígidas de cartón corrugado en ambas caras.',
          'Asegúralo dentro de una estructura o jaula de madera (huacal).'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
          { name: 'Estructura de madera', status: 'Necesario', isNeeded: true, type: 'madera' }
        ],
        oversized: {
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      },
      {
        id: 'repuestos',
        name: 'Repuestos de volumen',
        shortName: 'Mecánica',
        icon: Cog,
        badge: 'Sobredimensionada',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        image: '/repuestos-volumen.jpg',
        summary: 'Motores, cajas y piezas pesadas deben viajar sin fluidos residuales y bien anclados.',
        steps: [
          'Drena completamente cualquier residuo de combustible o lubricantes.',
          'Protege conectores, sensores y roscas con film y cartón corrugado.',
          'Fija la pieza sobre un pallet o en una estructura de madera firme.'
        ],
        materialsList: [
          { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
          { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
          { name: 'Film', status: 'Necesario', isNeeded: true, type: 'film' },
          { name: 'Estructura de madera', status: 'Necesario', isNeeded: true, type: 'madera' }
        ],
        oversized: {
          title: 'Carga sobredimensionada',
          text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
          linkText: 'Ver condiciones de carga sobredimensionada →',
          linkUrl: '#'
        }
      }
    ]
  },
  {
    id: 'cuadros',
    name: 'Cuadros y pinturas',
    icon: Palette,
    badge: 'Sobredimensionada',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/cuadros-pinturas.jpg',
    summary: 'La parte frontal y los ángulos son lo más delicado: protégelos con un material rígido.',
    steps: [
      'Protege la parte frontal y los ángulos con material rígido, como cartón prensado o enchapado de madera.',
      'Envuelve con espuma y cartón corrugado.'
    ],
    materialsList: [
      { name: 'Espuma', status: 'Necesario', isNeeded: true, type: 'espuma' },
      { name: 'Cartón corrugado', status: 'Necesario', isNeeded: true, type: 'carton' },
      { name: 'Film', status: 'No aplica', isNeeded: false, type: 'film' },
      { name: 'Estructura de madera', status: 'Necesario', isNeeded: true, type: 'madera' }
    ],
    oversized: {
      title: 'Carga sobredimensionada',
      text: 'Asegúrala con estructuras fuertes (madera o metal) y envuélvela con materiales resistentes (plástico o lona). Márcala con etiquetas de "Frágil" o "Mantener en posición vertical".',
      linkText: 'Ver condiciones de carga sobredimensionada →',
      linkUrl: '#'
    }
  }
];

export default function RecomendacionesEmbalaje() {
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState('sofas');
  const tabsContainerRef = useRef(null);
  const subcategoriesRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  // Desplazamiento suave e intuitivo: solo ajusta si la pestaña sobrepasa los márgenes
  const ensureTabVisible = (btnElement) => {
    if (!btnElement || !tabsContainerRef.current) return;
    const container = tabsContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnElement.getBoundingClientRect();

    if (btnRect.right > containerRect.right - 40) {
      const scrollOffset = btnRect.right - containerRect.right + 90;
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    } else if (btnRect.left < containerRect.left + 40) {
      const scrollOffset = btnRect.left - containerRect.left - 90;
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const ensureSubcategoryVisible = (subBtnElement) => {
    if (!subBtnElement || !subcategoriesRef.current) return;
    const container = subcategoriesRef.current;
    const containerRect = container.getBoundingClientRect();
    const btnRect = subBtnElement.getBoundingClientRect();

    if (btnRect.right > containerRect.right - 20) {
      const scrollOffset = btnRect.right - containerRect.right + 50;
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    } else if (btnRect.left < containerRect.left + 20) {
      const scrollOffset = btnRect.left - containerRect.left - 50;
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId, e) => {
    setSelectedCategory(catId);
    const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
    if (cat?.hasSubcategories && cat.subcategories?.length > 0) {
      setSelectedSubcategory(cat.subcategories[0].id);
    }
    if (e?.currentTarget) {
      ensureTabVisible(e.currentTarget);
    }
  };

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        ensureTabVisible(activeBtn);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (subcategoriesRef.current) {
      const activeSubBtn = subcategoriesRef.current.querySelector('[data-sub-active="true"]');
      if (activeSubBtn) {
        ensureSubcategoryVisible(activeSubBtn);
      }
    }
  }, [selectedSubcategory, selectedCategory]);

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

  // Contenido de la columna lateral (Tarjeta de Carga Sobredimensionada / Fotografía + Tips)
  const renderCategorySideCard = () => (
    <div className="flex flex-col space-y-4">
      {activeCategoryData.oversized ? (
        /* Tarjeta unificada: Imagen + Información de Carga Sobredimensionada */
        <div className="bg-[#F8FAFC] rounded-[14px] border border-gray-200 shadow-xs p-[15px] flex flex-col">
          <img
            src={`${activeCategoryData.image}?v=18`}
            alt={activeCategoryData.name}
            className="w-full h-48 sm:h-52 object-cover rounded-[7px]"
          />

          <div className="mt-4 pt-4 border-t border-gray-200 flex items-start gap-0 sm:gap-3.5">
            <div className="hidden sm:flex w-11 h-14 shrink-0 items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22 L32 12 L52 22 L32 32 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                <path d="M12 22 L12 68 L32 78 L32 32 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
                <path d="M52 22 L52 68 L32 78 L32 32 Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5" />
                <rect x="16" y="32" width="12" height="16" rx="1" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1" />
                <path d="M22 36 L22 41 M20 37 L24 37" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="22" cy="44" rx="2" ry="1" fill="#DC2626" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-[18px] font-bold font-din text-[#9A3412] mb-1.5">
                Carga sobredimensionada
              </h4>
              <div className="space-y-2 text-[14px] text-[#505050] font-nunito leading-relaxed">
                <p>
                  Las cargas sobredimensionadas deben asegurarse con estructuras fuertes (como madera o metal) y envolverse con materiales resistentes (plástico o lona). Además, deben ser claramente señalizadas para garantizar su seguridad durante el transporte.
                </p>
                <p>
                  Además, se deben marcar claramente las cajas o estructuras de embalaje con etiquetas que indiquen el manejo especial del artículo, como 'frágil' o 'mantener en posición vertical'.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Fotografía de los elementos de la categoría */}
          <div
            style={{ borderRadius: '14px' }}
            className="bg-[#F8FAFC] rounded-[14px] border border-gray-200 shadow-xs p-[15px] flex items-center justify-center overflow-hidden"
          >
            <img
              src={`${activeCategoryData.image}?v=18`}
              alt={activeCategoryData.name}
              className="w-full h-48 sm:h-52 object-cover rounded-[7px]"
            />
          </div>

          {/* Alerta de error común (Lo que debes evitar) */}
          {activeCategoryData.donts && (
            <div
              style={{ borderRadius: '14px' }}
              className="bg-[#FFF5F5] border border-[#FED7D7] rounded-[14px] p-5 sm:p-6 shadow-xs"
            >
              <div className="flex items-center gap-2 text-rose-900 text-[16px] font-bold font-din mb-2">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Lo que debes evitar</span>
              </div>
              <p className="text-[14px] text-rose-800 font-nunito leading-relaxed">
                {activeCategoryData.donts}
              </p>
            </div>
          )}

          {/* Tip SAC */}
          {activeCategoryData.sacTip && (
            <div
              style={{ borderRadius: '14px' }}
              className="bg-gradient-to-br from-[#008D46] to-[#006633] text-white rounded-[14px] p-5 sm:p-6 shadow-sm border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-white text-[16px] font-bold font-din mb-2">
                <Info className="w-5 h-5 text-white shrink-0" />
                <span>Consejo de servicio al cliente</span>
              </div>
              <p className="text-[14px] text-white font-nunito leading-relaxed">
                {activeCategoryData.sacTip}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <main className="flex-grow">
        {/* =========================================================================
            1. BANNER PRINCIPAL CON IMAGEN DE FONDO (ESTILO OFICIAL STARKEN)
           ========================================================================= */}
        <div className="banner-header-section w-full relative overflow-hidden bg-[#009D4E] flex items-center justify-center h-[56px] sm:h-[64px] md:h-[70px] lg:h-[72px]">
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-[19px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-bold font-din tracking-tight text-white drop-shadow-sm leading-none">
              Recomendaciones de embalaje
            </h1>
          </div>
        </div>

        {/* =========================================================================
            3. CATÁLOGO INTERACTIVO POR TIPO DE PRODUCTO
           ========================================================================= */}
        <section className="py-8 sm:py-10 bg-[#F8FAFC] border-y border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Encabezado centrado sin badge */}
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
              <h2 className="text-[24px] sm:text-[30px] font-extrabold font-din text-[#303030]">
                ¿Cómo embalar según el <br className="sm:hidden" />tipo de producto?
              </h2>
              <p className="text-[#505050] font-nunito text-sm sm:text-base mt-2">
                Selecciona la categoría de tu artículo para ver las instrucciones específicas y materiales recomendados.
              </p>
            </div>

            {/* Selector de Categorías (Pills con flechas de desplazamiento Desktop) */}
            <div className="relative mb-3 md:mb-6 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-[#505050] shadow-xs hover:bg-[#E6F5EC] hover:text-[#009D4E] hover:border-[#009D4E]/30 transition-all shrink-0 cursor-pointer"
                aria-label="Desplazar categorías a la izquierda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={tabsContainerRef}
                className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none scroll-smooth max-w-full"
              >
                {PRODUCT_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      data-active={isSelected}
                      onClick={(e) => handleSelectCategory(cat.id, e)}
                      className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${isSelected
                        ? 'bg-[#009D4E] text-white shadow-md shadow-[#009D4E]/20 scale-[1.01]'
                        : 'bg-white text-[#505050] hover:bg-gray-100 border border-gray-200 shadow-2xs'
                        }`}
                    >
                      <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#505050]'}`} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollTabs('right')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-[#505050] shadow-xs hover:bg-[#E6F5EC] hover:text-[#009D4E] hover:border-[#009D4E]/30 transition-all shrink-0 cursor-pointer"
                aria-label="Desplazar categorías a la derecha"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indicador de puntitos (Mobile only) */}
            <div className="flex md:hidden items-center justify-center gap-1.5 -mt-1 mb-5">
              {PRODUCT_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={(e) => handleSelectCategory(cat.id, e)}
                    aria-label={`Ver categoría ${cat.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-0 p-0 ${isSelected
                      ? 'w-6 bg-[#009D4E]'
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                );
              })}
            </div>

            {/* Contenido de la Categoría Seleccionada */}
            <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm">
              {/* Sub-selector para categorías con subcategorías (Muebles, Partes de vehículos, etc.) */}
              {activeCategoryData.hasSubcategories && (
                <div className="mb-5 pb-4 border-b border-gray-200/80">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="hidden sm:inline-block text-xs sm:text-sm font-bold font-din text-[#505050] shrink-0 whitespace-nowrap">
                      Elige tu producto:
                    </span>
                    <div
                      ref={subcategoriesRef}
                      className="flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar scroll-smooth py-1 w-full sm:w-auto"
                    >
                      {PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.subcategories?.map((sub) => {
                        const isSubSelected = activeCategoryData.id === sub.id;
                        const SubIcon = sub.icon;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            data-sub-id={sub.id}
                            data-sub-active={isSubSelected}
                            onClick={(e) => {
                              setSelectedSubcategory(sub.id);
                              ensureSubcategoryVisible(e.currentTarget);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${isSubSelected
                              ? 'bg-white text-[#EA580C] border-2 border-[#EA580C] shadow-xs font-bold'
                              : 'bg-[#F8FAFC] text-[#505050] border border-gray-200 hover:border-gray-300 hover:text-[#303030]'
                              }`}
                          >
                            {SubIcon && <SubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#EA580C]" />}
                            <span>{sub.shortName || sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Indicador de puntos (dots) en mobile para indicar scroll horizontal */}
                  {(PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.subcategories?.length || 0) > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-2.5 sm:hidden">
                      {PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.subcategories?.map((sub) => {
                        const isSubSelected = activeCategoryData.id === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => setSelectedSubcategory(sub.id)}
                            aria-label={`Ver ${sub.name}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isSubSelected
                              ? 'w-5 bg-[#EA580C]'
                              : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                              }`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Izquierda: Pasos y Recomendaciones */}
                <div className="lg:col-span-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <span className={`order-1 sm:order-2 px-3 py-1 rounded-full text-xs font-bold font-nunito border ${activeCategoryData.badgeColor}`}>
                      {activeCategoryData.badge}
                    </span>
                    <h3 className="order-2 sm:order-1 text-[20px] sm:text-2xl font-extrabold font-din text-[#303030]">
                      {activeCategoryData.title || activeCategoryData.name}
                    </h3>
                  </div>

                  <p className="text-[#505050] font-nunito text-[14px] sm:text-base leading-relaxed mb-6 sm:mb-7">
                    {activeCategoryData.summary}
                  </p>

                  <h4 className="text-[18px] font-bold font-din text-[#009D4E] mb-2 sm:mb-2.5">
                    Instrucciones de embalaje
                  </h4>

                  <div className="space-y-2.5 mb-7 sm:mb-8">
                    {activeCategoryData.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#F8FAFC] p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-xs">
                        <div className="w-6 h-6 rounded-full bg-[#E6F5ED] text-[#009D4E] flex items-center justify-center font-din font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tarjeta lateral en mobile (va arriba de materiales necesarios/recomendados solo en mobile) */}
                  <div className="block lg:hidden mb-7 sm:mb-8">
                    {renderCategorySideCard()}
                  </div>

                  {/* Materiales necesarios / recomendados */}
                  {activeCategoryData.materialsList && (
                    <div className="mb-2">
                      <h4 className="text-[18px] font-bold font-din text-[#009D4E] mb-2 sm:mb-2.5">
                        {activeCategoryData.materialsTitle || 'Materiales necesarios'}
                      </h4>
                      <div className={`grid gap-2.5 sm:gap-3 ${activeCategoryData.materialsList.length === 3
                          ? 'grid-cols-1 sm:grid-cols-3'
                          : 'grid-cols-2 sm:grid-cols-4'
                        }`}>
                        {activeCategoryData.materialsList.map((item, idx) => (
                          <div
                            key={idx}
                            className={`rounded-[14px] p-2.5 sm:p-3 border flex flex-col justify-between shadow-xs ${item.isNeeded
                              ? 'bg-white border-emerald-300'
                              : 'bg-gray-50/70 border-gray-200 opacity-75'
                              }`}
                          >
                            {/* Mitad superior de la card: Fotografía con border radius de 7px */}
                            <div className="w-full h-20 sm:h-24 overflow-hidden rounded-[7px] bg-gray-100 mb-2 sm:mb-2.5">
                              <img
                                src={MATERIAL_IMAGES[item.type] || '/material-espuma.jpg'}
                                alt={item.name}
                                className={`w-full h-full object-cover rounded-[7px] transition-all ${item.isNeeded
                                  ? 'filter-none'
                                  : 'grayscale opacity-60 contrast-90'
                                  }`}
                              />
                            </div>

                            {/* Mitad inferior de la card: Texto y badge abajo con tipografía Nunito */}
                            <div className="flex flex-col items-start justify-between flex-1 gap-1.5 min-w-0">
                              <h5 className={`text-xs sm:text-sm font-bold font-din leading-tight line-clamp-2 ${item.isNeeded ? 'text-[#303030]' : 'text-gray-500'
                                }`}>
                                {item.name}
                              </h5>
                              <span
                                className={`inline-block text-[11px] sm:text-xs font-semibold font-nunito px-2 sm:px-2.5 py-0.5 rounded-full ${item.isNeeded
                                  ? 'bg-[#E6F5EC] text-[#009D4E]'
                                  : 'bg-gray-200/70 text-gray-500'
                                  }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {activeCategoryData.materialsNote && (
                        <p className="text-xs font-nunito text-[#505050] mt-3 leading-relaxed">
                          {activeCategoryData.materialsNote}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Columna Derecha (Desktop): Fotografía + Carga Sobredimensionada o Materiales Clave + Tip SAC */}
                <div className="hidden lg:block lg:col-span-4">
                  {renderCategorySideCard()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. DO'S & DON'TS: BUENAS VS. MALAS PRÁCTICAS VISUALES
           ========================================================================= */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-[24px] sm:text-[30px] font-extrabold font-din text-[#303030]">
              ¿Qué sí hacer y qué no hacer?
            </h2>
            <p className="text-[#505050] font-nunito text-sm sm:text-base mt-2">
              Identifica rápidamente los hábitos correctos que garantizan el transporte sin contratiempos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Tarjeta BUENAS PRÁCTICAS */}
            <div className="bg-white border border-gray-200 border-t-4 border-t-[#009D4E] rounded-2xl sm:rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col justify-start">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#009D4E] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <h3 className="text-[18px] sm:text-[24px] font-bold font-din text-[#008241]">
                  Buenas prácticas
                </h3>
              </div>

              <div className="space-y-5 flex-grow">
                {/* Item 1 */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[84px] h-[64px] sm:w-[92px] sm:h-[68px] shrink-0 flex items-center justify-center">
                    <img
                      src="/dos-donts/caja_sellada.png"
                      alt="Caja sellada y en buen estado"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold font-din text-[#303030] leading-snug mb-1">
                      Caja sellada y en buen estado
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                      Apta para el transporte. Solo las piezas irregulares pueden ir cubiertas con cartón rígido.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Item 2 */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[84px] h-[64px] sm:w-[92px] sm:h-[68px] shrink-0 flex items-center justify-center">
                    <img
                      src="/dos-donts/doble_caja.png"
                      alt="Doble caja para objetos pequeños"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold font-din text-[#303030] leading-snug mb-1">
                      Doble caja para objetos pequeños
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                      Relojes, celulares o lápices van dentro de una caja más grande que oculte el contenido.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Item 3 */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[84px] h-[64px] sm:w-[92px] sm:h-[68px] shrink-0 flex items-center justify-center">
                    <img
                      src="/dos-donts/fragiles.png"
                      alt="Frágiles bien amortiguados"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold font-din text-[#303030] leading-snug mb-1">
                      Frágiles bien amortiguados
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                      Envuélvelos con material que absorba golpes y usa la etiqueta de “Frágil” o de posición.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta ERRORES COMUNES */}
            <div className="bg-white border border-gray-200 border-t-4 border-t-[#DC2626] rounded-2xl sm:rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col justify-start">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <X className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <h3 className="text-[18px] sm:text-[24px] font-bold font-din text-[#DC2626]">
                  Errores comunes
                </h3>
              </div>

              <div className="space-y-5">
                {/* Item 1 */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[84px] h-[64px] sm:w-[92px] sm:h-[68px] shrink-0 flex items-center justify-center">
                    <img
                      src="/dos-donts/relleno_papel.png"
                      alt="Relleno de papel o virutas"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold font-din text-[#303030] leading-snug mb-1">
                      Relleno de papel o virutas
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                      El papel arrugado, las tiras de papel y las virutas de poliestireno no protegen bien tu envío.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Item 2 */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[84px] h-[64px] sm:w-[92px] sm:h-[68px] shrink-0 flex items-center justify-center">
                    <img
                      src="/dos-donts/enviar_sin_caja.png"
                      alt="Enviar sin caja"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold font-din text-[#303030] leading-snug mb-1">
                      Enviar sin caja
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#505050] font-nunito leading-relaxed">
                      Bolsas o envoltorios sueltos no son aptos para el transporte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. GUÍA VISUAL DE ETIQUETADO Y ROTULADO (PASO 3 · ROTULADO)
           ========================================================================= */}
        <section className="py-14 sm:py-16 bg-gradient-to-br from-[#009D4E] via-[#008241] to-[#00592C] text-white px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-6xl mx-auto">
            {/* Cabecera centrada */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-[24px] sm:text-[30px] font-extrabold font-din text-white">
                ¿Cómo pegar tu etiqueta?
              </h2>
              <p className="text-emerald-50/95 font-nunito text-sm sm:text-base leading-relaxed mt-2">
                Un envío bien etiquetado viaja más rápido. Facilita su identificación y manejo, y asegura una correcta clasificación y llegada al destino.
              </p>
            </div>

            {/* Grid con las 5 reglas a la izquierda y la card de Regla 2 a la derecha */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Columna Izquierda: 5 reglas de rotulado */}
              <div className="lg:col-span-7">
                <div className="space-y-2.5 sm:space-y-3 font-nunito">
                  {[
                    { num: 1, title: 'Medida estándar', desc: 'La etiqueta mide 10 × 10 cm.' },
                    { num: 2, title: 'En la cara más grande', desc: 'Nunca en las esquinas del envío.' },
                    { num: 3, title: 'Siempre sobre el envoltorio', desc: 'Nunca cubierta por un film o envoltorio.' },
                    { num: 4, title: 'Dos etiquetas, dos caras', desc: 'Si tienes etiquetas distintas, colócalas en lados diferentes.' },
                    { num: 5, title: 'Sin otros códigos a la vista', desc: 'Si reutilizas una caja, tapa o retira los códigos anteriores.' },
                  ].map((rule) => (
                    <div
                      key={rule.num}
                      className="flex items-center gap-3.5 bg-emerald-950/40 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border-2 border-[#00D069]/60 shadow-sm"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#00D069] text-emerald-950 flex items-center justify-center font-din font-bold text-xs shrink-0 shadow-xs">
                        {rule.num}
                      </div>
                      <div>
                        <h4 className="text-[14px] sm:text-[16px] font-bold font-din text-white leading-snug">
                          {rule.title}
                        </h4>
                        <p className="text-[14px] text-emerald-100/95 font-nunito leading-tight mt-0.5">
                          {rule.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Tarjeta Comparativa Regla 2 (Así sí / Así no) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-black/25 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-7 w-full max-w-lg shadow-xl">
                  {/* Comparativa Así sí vs Así no */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {/* Tarjeta Así sí */}
                    <div className="bg-white rounded-2xl border-2 border-[#009D4E] overflow-hidden shadow-md flex flex-col justify-between">
                      {/* Área superior: cabecera e imagen */}
                      <div className="p-3 sm:p-4 pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] sm:text-[14px] font-bold font-din text-[#009D4E]">
                            Así sí
                          </span>
                          <div className="w-5 h-5 rounded-full bg-[#009D4E] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        </div>

                        <div className="w-full h-24 sm:h-28 flex items-center justify-center my-1">
                          <img
                            src="/etiquetado/asi_si_etiqueta.png"
                            alt="Así sí: Etiqueta adosada a la cara más grande"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Compartimento inferior: franja de texto separada */}
                      <div className="border-t border-gray-100 bg-[#F8FAFC] px-3 py-2.5 sm:px-3.5 sm:py-3 flex items-center justify-center text-center">
                        <p className="text-[12px] sm:text-[13px] font-semibold font-nunito text-[#303030] leading-snug">
                          Etiqueta adosada a la cara más grande
                        </p>
                      </div>
                    </div>

                    {/* Tarjeta Así no */}
                    <div className="bg-white rounded-2xl border-2 border-[#DC2626] overflow-hidden shadow-md flex flex-col justify-between">
                      {/* Área superior: cabecera e imagen */}
                      <div className="p-3 sm:p-4 pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] sm:text-[14px] font-bold font-din text-[#DC2626]">
                            Así no
                          </span>
                          <div className="w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        </div>

                        <div className="w-full h-24 sm:h-28 flex items-center justify-center my-1">
                          <img
                            src="/etiquetado/asi_no_etiqueta.png"
                            alt="Así no: Etiqueta en una esquina"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Compartimento inferior: franja de texto separada */}
                      <div className="border-t border-gray-100 bg-[#F8FAFC] px-3 py-2.5 sm:px-3.5 sm:py-3 flex items-center justify-center text-center">
                        <p className="text-[12px] sm:text-[13px] font-semibold font-nunito text-[#303030] leading-snug">
                          Etiqueta en una esquina
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bajada explicativa (14px mobile, 16px desktop) */}
                  <p className="text-[14px] sm:text-[16px] text-emerald-100/90 font-nunito leading-relaxed">
                    En las esquinas la etiqueta puede quedar oculta o dañada, lo que dificulta su lectura y puede retrasar la entrega.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. ASISTENCIA DIRECTA & ENLACES RELACIONADOS
           ========================================================================= */}
        <section className="py-12 bg-emerald-50/50 border-t border-emerald-100 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#008241] to-[#009D4E] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 lg:col-span-8">
                {/* Badge ATENCIÓN PERSONALIZADA */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/25 backdrop-blur-xs text-white text-[11px] sm:text-xs font-bold font-din uppercase tracking-wider mb-3">
                  ATENCIÓN PERSONALIZADA
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-din text-white mb-2">
                  ¿Tienes dudas con un paquete especial?
                </h3>
                <p className="text-emerald-50 font-nunito text-sm sm:text-base leading-relaxed">
                  Puedes ir rápido solo, pero juntos llegamos más lejos. Si tu carga es muy pesada, tiene medidas atípicas o necesitas asesoría antes de despachar, nuestro equipo te orienta.
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-4 flex justify-start md:justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-starkin-chat'));
                    }
                  }}
                  className="flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#008241] font-bold rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg sm:hover:scale-[1.02] transition-all font-nunito text-sm sm:text-base cursor-pointer border-0"
                >
                  <span>Asistente en chat</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
