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

// Categorías de productos y sus guías detalladas
const PRODUCT_CATEGORIES = [
  {
    id: 'fragil',
    name: 'Frágiles, Vidrio y Cerámica',
    icon: Wine,
    badge: 'Alta protección',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/ceramica.png',
    summary: 'Requiere técnica de doble capa, amortiguación interna y señalización visible de fragilidad.',
    steps: [
      'Envuelve cada pieza individualmente con 3 a 4 capas de plástico de burbujas (mínimo 5 cm de grosor).',
      'Usa una caja de cartón corrugado rígido. Deja al menos 6 cm de distancia entre el objeto y las paredes de la caja.',
      'Rellena los espacios vacíos con cojines de aire o espuma moldeada para evitar cualquier desplazamiento.',
      'Sella en forma de "H" con cinta resistente y coloca la etiqueta de orientación "FRÁGIL / ESTE LADO ARRIBA".'
    ],
    materials: ['Plástico burbuja grueso', 'Caja de cartón rígido', 'Cojines de aire', 'Cinta 50mm', 'Etiqueta Frágil'],
    donts: 'No uses papel de diario arrugado ni virutas sueltas de plumavit; se aplastan con el peso y dejan el producto expuesto.',
    sacTip: 'Si envías más de un objeto de vidrio en la misma caja, asegúrate de que no choquen entre sí usando separadores de cartón.'
  },
  {
    id: 'tecnologia',
    name: 'Tecnología y Celulares',
    icon: Smartphone,
    badge: 'Alto valor',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    image: '/smartwatch.png',
    summary: 'Dispositivos pequeños (celulares, smartwatches, notebooks) deben viajar discretos y amortiguados.',
    steps: [
      'Si conservas el embalaje original del fabricante con sus molduras, colócalo dentro de una segunda caja neutral.',
      'Los artículos pequeños (relojes, celulares, audífonos) SIEMPRE deben ir dentro de una caja exterior más grande.',
      'Apaga completamente el dispositivo y protege la batería contra encendidos accidentales.',
      'Nunca dejes a la vista logotipos de marcas tecnológicas en la caja exterior para mayor seguridad.'
    ],
    materials: ['Segunda caja exterior', 'Plástico antiestático / burbuja', 'Relleno de espuma', 'Cinta reforzada'],
    donts: 'No envíes dispositivos tecnológicos en sobres acolchados simples ni muestres qué contiene el paquete en la caja exterior.',
    sacTip: 'Declara siempre el valor real de tu equipo tecnológico al momento de emitir tu orden para contar con cobertura total.'
  },
  {
    id: 'liquidos',
    name: 'Líquidos y Cosméticos',
    icon: Droplets,
    badge: 'Hermético',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    image: '/liquidos-cosmeticos.jpg',
    summary: 'Doble sellado hermético individual para evitar derrames y daños a otros envíos.',
    steps: [
      'Verifica que la tapa o dispensador esté firmemente cerrado y asegúralo con cinta aislante.',
      'Introduce cada botella o frasco dentro de una bolsa plástica hermética individual con cierre hermético (tipo ziploc).',
      'Coloca los envases en posición estrictamente vertical dentro de la caja con separadores de cartón.',
      'Añade material absorbente en el fondo por precaución y coloca la flecha "Hacia Arriba" en el exterior.'
    ],
    materials: ['Bolsas herméticas tipo Ziploc', 'Cinta para tapas', 'Separadores de cartón', 'Caja vertical rígida'],
    donts: 'No envíes líquidos en cajas blandas ni frascos sueltos que puedan chocar o recostarse.',
    sacTip: 'Recuerda que sustancias inflamables, corrosivas, tóxicas o pinturas con solvente son carga peligrosa no admitida.'
  },
  {
    id: 'muebles',
    name: 'Muebles, Sillones y Colchones',
    icon: Armchair,
    badge: 'Voluminoso',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    image: '/muebles-sillon.jpg',
    summary: 'Protección 100% de superficies, esquinas reforzadas y sellado con film stretch resistente.',
    steps: [
      'Sofás y sillones deben estar 100% cubiertos con cartón corrugado rígido y luego reforzados por film plástico.',
      'Colchones y bases de cama requieren funda de polietileno de alto micraje sin piquetes ni aberturas.',
      'Cuadros, espejos y pinturas necesitan protección frontal con cartón prensado o madera enchapada más esquineros.',
      'Desarma piezas desmontables (patas, manijas) y guárdalas en una bolsa rotulada adherida al mueble.'
    ],
    materials: ['Cartón corrugado en rollo', 'Esquineros de cartón prensado', 'Film stretch grueso', 'Funda polietileno'],
    donts: 'No dejes telas o cueros expuestos sin cartón. El film por sí solo no protege contra golpes o fricción.',
    sacTip: 'Para cargas sobre 50 kg o de grandes dimensiones, evalúa el servicio palletizado para facilitar el manejo mecánico.'
  },
  {
    id: 'repuestos',
    name: 'Repuestos Automotrices y Herramientas',
    icon: Wrench,
    badge: 'Piezas Pesadas',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    image: '/repuestos-auto.jpg',
    summary: 'Piezas mecánicas limpias, sin fluidos, con esquinas puntiagudas cubiertas y fijación firme.',
    steps: [
      'Drena completamente cualquier residuo de aceite, refrigerante o combustible antes de embalar.',
      'Cubre aristas, puntas y bordes metálicos filosos con cartón grueso o protectores de goma.',
      'Piezas de gran peso o volumen deben ir en cajón de madera o cartón prensado zunchado a pallet.',
      'Si la pieza tiene forma irregular que no cabe en caja, debe ir 100% envuelta en cartón rígido y film.'
    ],
    materials: ['Cartón corrugado rígido', 'Zunchos plásticos/metálicos', 'Cajón de madera o pallet', 'Film protector'],
    donts: 'No entregues repuestos grasosos o con fugas. Serán rechazados en sucursal por seguridad.',
    sacTip: 'Las baterías con ácido o líquidos reactivos son consideradas Carga Peligrosa y no pueden ser transportadas.'
  },
  {
    id: 'textil',
    name: 'Vestuario, Calzado y Estándar',
    icon: Shirt,
    badge: 'Estándar',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    image: '/parka.png',
    summary: 'El embalaje más sencillo: protección contra polvo y humedad con sellado firme.',
    steps: [
      'Dobla las prendas y guárdalas dentro de una bolsa plástica limpia para aislarla de humedad exterior.',
      'Colócalas dentro de una caja de cartón adecuada a su tamaño (ni muy apretada ni con exceso de aire).',
      'Si envías calzado, utiliza la caja de zapatos dentro de una caja exterior o bolsa de envío resistente.',
      'Cierra con cinta de embalaje en la solapa principal y coloca la etiqueta de envío visible.'
    ],
    materials: ['Caja de cartón estándar', 'Bolsa impermeable interna', 'Cinta de embalar de 50mm'],
    donts: 'No uses bolsas de supermercado delgadas o bolsas de basura; se rompen con facilidad en las cintas de distribución.',
    sacTip: 'Aprovecha las cajas recicladas de Starken disponibles en todas nuestras sucursales a lo largo del país.'
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
    return PRODUCT_CATEGORIES.find(c => c.id === selectedCategory) || PRODUCT_CATEGORIES[0];
  }, [selectedCategory]);

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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Izquierda: Pasos y Recomendaciones */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeCategoryData.badgeColor}`}>
                      {activeCategoryData.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold font-din text-gray-900">
                      {activeCategoryData.name}
                    </h3>
                  </div>

                  <p className="text-gray-700 font-nunito text-base mb-6 leading-relaxed">
                    {activeCategoryData.summary}
                  </p>

                  <h4 className="text-sm font-bold font-din uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651]" />
                    Instrucciones de embalaje recomendadas
                  </h4>

                  <div className="space-y-3 mb-8">
                    {activeCategoryData.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                        <div className="w-6 h-6 rounded-full bg-[#E6F5ED] text-[#00A651] flex items-center justify-center font-din font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-700 font-nunito leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Alerta de Error Común (Don't) */}
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold font-din text-rose-900 mb-1">
                        Lo que debes evitar:
                      </h5>
                      <p className="text-xs sm:text-sm text-rose-800 font-nunito leading-relaxed">
                        {activeCategoryData.donts}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Fotografía + Materiales Clave + Tip SAC */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  {/* Fotografía de los elementos de la categoría (Borde blanco con radio 14px exterior y 7px interior) */}
                  <div className="bg-white rounded-[14px] border border-gray-200 shadow-xs p-2.5 sm:p-3 overflow-hidden">
                    <div className="w-full aspect-square max-h-64 sm:max-h-72 rounded-[7px] overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={activeCategoryData.image} 
                        alt={activeCategoryData.name} 
                        className="w-full h-full object-cover rounded-[7px]"
                      />
                    </div>
                  </div>

                  {/* Materiales requeridos */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                    <h4 className="text-sm font-bold font-din uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                      <Box className="w-4 h-4 text-[#00A651]" />
                      Materiales indispensables
                    </h4>
                    <ul className="space-y-2.5">
                      {activeCategoryData.materials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-nunito text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00A651]"></div>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
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
