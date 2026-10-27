import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ChevronRight, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './RecomendacionesEmbalaje.css';

export default function RecomendacionesEmbalaje() {
  return (
    <div className="embalaje-page min-h-screen flex flex-col font-nunito bg-[#F8FAFC]">
      <main className="flex-grow">
        {/* =========================================================================
            BREADCRUMB & INTRO HERO
           ========================================================================= */}
        <section className="bg-white border-b border-gray-200/80 pt-6 pb-10 sm:pb-14 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Migas de pan oficiales */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-nunito" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#009D4E] transition-colors">
                Centro de ayuda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#009D4E] font-semibold">
                Recomendaciones de embalaje
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Textos principales */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <h1 className="text-[30px] font-bold font-din text-[#303030] leading-tight mb-3">
                  Aprende a embalar como un experto
                </h1>

                <p className="text-[14px] sm:text-[16px] text-[#303030] leading-relaxed mb-6 font-nunito">
                  Para proteger tu envío, por favor asegúrate de que esté correctamente embalado antes de enviarlo.
                </p>

                {/* Cápsula motivacional oficial */}
                <div className="w-full bg-[#E6F7EF] border border-[#009D4E]/25 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#009D4E] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#007A3D] leading-snug">
                    Nos encanta ser parte de tus sueños. Sigue estos pasos para realizar el embalaje de tus envíos.
                  </p>
                </div>
              </div>

              {/* Imagen oficial super-cajita (sin contorno, sin fondo distinto ni hover, integrado al fondo blanco) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="w-full max-w-[380px] flex flex-col items-center">
                  <img
                    src="/embalaje/super-cajita.webp?v=2"
                    alt="Línea de embalaje Starken"
                    className="w-full h-auto object-contain max-h-[230px] mx-auto block"
                  />
                  <span className="text-xs sm:text-[13px] text-[#303030] font-medium leading-relaxed block mt-3">
                    Usa preferentemente nuestra línea de embalaje para garantizar un envío adecuado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN 1: RECOMENDACIONES DE EMBALAJE
           ========================================================================= */}
        <section className="py-12 sm:py-16 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            {/* Grid unificada de 3 columnas (Columna izquierda: Arriba 'El éxito...', Abajo '¿Sabías qué?') */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              
              {/* FILA 1 - COLUMNA 1: El éxito de tu envío empieza... */}
              <div className="bg-white border border-gray-200 rounded-[20px] p-5 sm:p-7 flex flex-col justify-center items-center text-center shadow-xs h-full">
                <div className="connector-line-wrapper mb-6 max-w-[200px]">
                  <div className="connector-circle" />
                  <div className="connector-line" />
                  <div className="connector-circle" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-din text-[#303030] mb-3 leading-snug">
                  El éxito de tu envío empieza con un buen embalaje
                </h3>
                <p className="text-sm sm:text-base text-[#009D4E] font-bold font-nunito leading-relaxed">
                  ¡Puedes ir rápido solo, pero juntos llegamos más lejos!
                </p>
              </div>

              {/* FILA 1 - COLUMNA 2: Cajas selladas aptas (✔ Correcto) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-02.webp"
                    alt="Cajas selladas y en buen estado"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    Las encomiendas deben enviarse en cajas selladas (*), en buen estado y aptas para su transporte.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      (*) Excepto piezas de forma irregular que no puedan ir en caja, siempre y cuando estén cubiertas por cartón rígido y que cumpla con los demás requisitos.
                    </p>
                  </div>
                </div>
              </div>

              {/* FILA 1 - COLUMNA 3: Contenido oculto dentro de otra caja (✔ Correcto) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-03.webp"
                    alt="Cajas que indiquen el contenido dentro de otra caja"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    Las cajas que indiquen el contenido deben ir dentro de otra caja que lo oculte.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Los elementos pequeños (relojes, celulares, lápices, etc.) deben enviarse dentro de una caja más grande.
                    </p>
                  </div>
                </div>
              </div>

              {/* FILA 2 - COLUMNA 1: ¿Sabías qué? (En mobile al final debajo de la card roja; en desktop bajo 'El éxito...') */}
              <div className="bg-gradient-to-br from-[#009D4E] to-[#007A3D] text-white rounded-[20px] p-5 sm:p-7 flex flex-col justify-center shadow-md relative overflow-hidden h-full order-last md:order-none">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <h2 className="text-2xl sm:text-3xl font-bold font-din mb-4 leading-tight">
                  ¿Sabías qué?
                </h2>
                <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-nunito">
                  Nuestras cajas <strong className="text-white font-bold">están hechas con fibras 100% recicladas</strong>. Ayúdanos a cuidar el medio ambiente: usa materiales reciclables o compostables para tus envíos.
                </p>
              </div>

              {/* FILA 2 - COLUMNA 2: Envíos frágiles (✔ Correcto) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-04.webp"
                    alt="Envío frágil con material que absorba golpes"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    Si el envío es frágil, envuélvelo con material que absorba golpes antes de colocarlo en la caja
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Si envías varios elementos frágiles, recuerda colocar la etiqueta de “frágil” o de posición.
                    </p>
                  </div>
                </div>
              </div>

              {/* FILA 2 - COLUMNA 3: Relleno inadecuado (❌ Incorrecto) */}
              <div className="embalaje-card is-wrong">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-cross" title="Incorrecto">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-05.webp"
                    alt="Relleno de cajas con envíos frágiles no adecuado"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    El relleno de las cajas con envíos frágiles no debe ser realizado con papel arrugado, tiras de papel ni virutas de poliestireno.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Estos elementos no ofrecen la protección adecuada y es probable que tu envío no llegue en buenas condiciones.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN 2: CORRECTO ETIQUETADO DE ENVÍOS (CON BANNER TÍTULO)
           ========================================================================= */}
        <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            {/* Banner fotográfico que sirve como título visual de la sección (sin líneas divisorias inferiores) */}
            <div className="w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 mb-8 sm:mb-12">
              <img
                src="/embalaje/BannerCorrectoEtiquetado.webp?v=2"
                alt="Correcto etiquetado de envíos"
                className="w-full h-auto object-cover max-h-[220px] sm:max-h-[250px] block"
              />
            </div>

            {/* Fila 1: Mensaje guía + Par 1 (Cara más grande vs Esquinas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 items-stretch">
              {/* Mensaje lateral 1 */}
              <div className="bg-[#E6F7EF]/60 border border-[#009D4E]/20 rounded-[20px] p-5 sm:p-7 flex flex-col justify-center items-center text-center shadow-xs h-full">
                <div className="connector-line-wrapper mb-5 max-w-[180px]">
                  <div className="connector-circle" />
                  <div className="connector-line" />
                  <div className="connector-circle" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-din text-[#303030] mb-2 leading-snug">
                  Un envío bien etiquetado viaja más rápido
                </h3>
                <span className="text-sm sm:text-base font-extrabold text-[#009D4E] font-nunito">
                  ¡Hazlo fácil!
                </span>
              </div>

              {/* Tarjeta 1 (✔ Correcto: Cara más grande) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-06.webp"
                    alt="La etiqueta debe estar adosada a la cara mas grande"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    La etiqueta debe estar adosada a la cara mas grande de la misma.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Facilita su identificación y manejo para los transportistas, asegurando una correcta clasificación y llegada al destino.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2 (❌ Incorrecto: Esquinas) */}
              <div className="embalaje-card is-wrong">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-cross" title="Incorrecto">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-07.webp"
                    alt="No colocar la etiqueta en las esquinas"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    No colocar la etiqueta en las esquinas de los envíos.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      La etiqueta no debe colocarse en las esquinas de los envíos porque puede quedar parcialmente oculta o dañada, lo que dificulta su lectura y puede retrasar el proceso de entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fila 2: Mensaje lateral 2 en Columna 1 + Par 2 (Sobre envoltorio vs Cubrir con envoltorio) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 items-stretch">
              {/* Mensaje lateral 2 (Columna 1, debajo de 'Un envío bien etiquetado...') */}
              <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-5 sm:p-7 flex flex-col justify-center items-center text-center shadow-xs h-full">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-4">
                  !
                </div>
                <p className="text-sm sm:text-base text-[#303030] font-semibold leading-relaxed font-nunito">
                  No cubrir las etiquetas de las encomiendas y/o sobres bajo envoltorios que dificulten la visibilidad del código del envío.
                </p>
              </div>

              {/* Tarjeta 3 (✔ Correcto: Por sobre cualquier envoltorio) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-08.webp"
                    alt="La etiqueta debe ir por sobre cualquier envoltorio"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    La etiqueta debe ir por sobre cualquier envoltorio.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Colocar la etiqueta por encima de cualquier envoltorio asegura que sea claramente visible y legible durante el proceso de manejo y transporte.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta 4 (❌ Incorrecto: Cubrir con envoltorios) */}
              <div className="embalaje-card is-wrong">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-cross" title="Incorrecto">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-09.webp"
                    alt="No cubrir las etiquetas con envoltorios"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    No cubrir las etiquetas con envoltorios.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Impide que sea fácilmente visible y legible, lo que puede causar confusión, retrasos en la clasificación y entrega, e incluso pérdida del paquete.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fila 3: Mensaje lateral de códigos + Par 3 (Dos etiquetas lados distintos vs Mismo lado) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 items-stretch">
              {/* Mensaje lateral 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-5 sm:p-7 flex flex-col justify-center items-center text-center shadow-xs h-full">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-4">
                  !
                </div>
                <p className="text-sm sm:text-base text-[#303030] font-semibold leading-relaxed font-nunito">
                  No incorporar a las encomiendas y documentos otros códigos distintos de la etiqueta de Starken, o en caso de hacerlo, incorporar dichos códigos en otras caras del embalaje.
                </p>
              </div>

              {/* Tarjeta 5 (✔ Correcto: Lados distintos) */}
              <div className="embalaje-card is-correct">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-check" title="Correcto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-10.webp"
                    alt="Si se tienen dos etiquetas diferentes, colocarlas en lados distintos"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    Si se tienen dos etiquetas diferentes, es recomendable colocarlas en lados distintos del envío.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Así evitar confusiones y asegurar que ambas sean fácilmente visibles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta 6 (❌ Incorrecto: Mismo lado) */}
              <div className="embalaje-card is-wrong">
                <div className="embalaje-card-img-wrapper">
                  <div className="badge-status badge-cross" title="Incorrecto">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <img
                    src="/embalaje/EMBALAJE-11.webp"
                    alt="No se deben colocar dos etiquetas diferentes en el mismo lado"
                    className="embalaje-card-img"
                  />
                </div>
                <div className="embalaje-card-content">
                  <h3 className="embalaje-card-title font-nunito">
                    No se deben colocar dos etiquetas diferentes en el mismo lado del envío.
                  </h3>
                  <div className="embalaje-card-alert">
                    <div className="embalaje-card-alert-icon">!</div>
                    <p className="embalaje-card-alert-text">
                      Ya que esto puede generar confusión y dificultar su correcta identificación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de tamaño al pie */}
            <div className="max-w-xl mx-auto flex items-center justify-center gap-4 py-4 px-6 bg-slate-50 border border-slate-200 rounded-full shadow-xs">
              <div className="connector-circle" />
              <div className="connector-line" />
              <span className="text-sm sm:text-base font-bold text-[#303030] whitespace-nowrap font-nunito tracking-wide">
                El tamaño de la etiqueta debe ser de 10x10 cm.
              </span>
              <div className="connector-line" />
              <div className="connector-circle" />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN 3: CONSIDERACIONES (LEGALES & SERVICIO SAC)
           ========================================================================= */}
        <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 lg:pb-36 px-6 lg:px-8 bg-[#F8FAFC] border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="consideraciones-box">
              <h2 className="text-[24px] font-bold font-din text-white mb-4">
                Consideraciones
              </h2>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed mb-4 font-nunito">
                El remitente acepta que Starken podrá rechazar un envío, suspender o cancelar su transporte en caso de que este no se encuentre correctamente embalado o que presente problemas durante su trayecto producto del deficiente embalaje. Los gastos de reembalaje, reenvío o devolución serán de cargo del remitente, así como cualquier daño que con ocasión de su embalaje se genere.
              </p>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-nunito">
                La admisión o retiro de un envío por parte de Starken no constituye en ningun caso alguno la aceptación de la idoneidad de su embalaje.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <HomeChatbot />
    </div>
  );
}
