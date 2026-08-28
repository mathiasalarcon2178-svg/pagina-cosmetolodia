'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openBookingModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-sans selection:bg-[#e8c8c8] selection:text-[#2c2c2c]">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e6dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl sm:text-2xl font-serif tracking-wide text-[#4a3b32]">
              Cami Isla Studio
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-[#6b5b52]">
            <a href="#inicio" className="hover:text-[#b88686] transition-colors">Inicio</a>
            <a href="#sobre-mi" className="hover:text-[#b88686] transition-colors">Sobre Mí</a>
            <a href="#servicios" className="hover:text-[#b88686] transition-colors">Servicios</a>
            <a href="#precios" className="hover:text-[#b88686] transition-colors">Precios</a>
            <a href="#contacto" className="hover:text-[#b88686] transition-colors">Contacto</a>
          </nav>
          <div>
            <a
              href="https://wa.me/595981000000?text=Hola%20Cami,%20quiero%20agendar%20una%20cita."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4a373] hover:bg-[#bc8a5f] text-white px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all shadow-sm flex items-center space-x-2"
            >
              <span>Reservar Cita</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-20 lg:py-32 bg-gradient-to-b from-[#f4ece1] to-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block bg-[#e8ded1] text-[#6b5b52] text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                Estética Avanzada y Reparadora
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#4a3b32] leading-tight">
                Realza tu belleza natural y recupera la confianza en tu piel
              </h1>
              <p className="text-lg text-[#6b5b52] font-light max-w-xl mx-auto lg:mx-0">
                Especialista en camuflaje de estrías, cicatrices y eliminación estética de lesiones cutáneas con tecnología de vanguardia en Asunción.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#servicios"
                  className="bg-[#4a3b32] text-white hover:bg-[#352a23] px-8 py-3.5 rounded-full font-medium transition-all text-center"
                >
                  Ver Tratamientos
                </a>
                <a
                  href="https://maps.app.goo.gl/xMz8NTiREFEubY9c7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#b8a394] text-[#4a3b32] hover:bg-[#f0ebe3] px-8 py-3.5 rounded-full font-medium transition-all text-center flex items-center justify-center space-x-2"
                >
                  <span>Cómo Llegar (Overava 674)</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#e8ded1]">
                <img
                  src="/cami.jpg"
                  alt="Camila Isla - Cosmetóloga"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ SECTION */}
      <section id="sobre-mi" className="py-20 bg-white border-y border-[#f0ebe3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Sobre Cami Isla Studio</h2>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-[#6b5b52] leading-relaxed">
              <p className="text-lg font-medium text-[#4a3b32]">
                Hola, soy Camila Isla, Licenciada en Cosmetología.
              </p>
              <p>
                Me especializo en tratamientos estéticos avanzados con un enfoque altamente profesional, riguroso y personalizado para cada paciente. Mi objetivo principal es brindarte un espacio seguro donde puedas mejorar la salud y apariencia de tu piel.
              </p>
              <p>
                Cuento con especialización avanzada en camuflaje de estrías y cicatrices, así como en la eliminación estética y segura de lunares, verrugas y acrocordones mediante tecnología de punta.
              </p>
              <div className="pt-4">
                <span className="inline-block bg-[#f4ece1] text-[#4a3b32] px-4 py-2 rounded-lg text-sm font-medium">
                  ✨ Atención personalizada en Barrio Salvador del Mundo, Asunción.
                </span>
              </div>
            </div>
            <div className="bg-[#f9f6f0] p-8 rounded-2xl border border-[#e8ded1] space-y-6 shadow-sm">
              <h3 className="text-xl font-serif text-[#4a3b32]">¿Por qué elegirnos?</h3>
              <ul className="space-y-3 text-sm text-[#6b5b52]">
                <li className="flex items-start space-x-3">
                  <span className="text-[#d4a373] font-bold">✓</span>
                  <span>Profesional titulada y especializada en el área.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#d4a373] font-bold">✓</span>
                  <span>Estrictos protocolos de higiene, bioseguridad y confort.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#d4a373] font-bold">✓</span>
                  <span>Evaluación previa detallada para garantizar resultados óptimos.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#d4a373] font-bold">✓</span>
                  <span>Tecnología y pigmentos seguros para tu piel.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Nuestros Tratamientos Especializados</h2>
            <p className="text-[#6b5b52] max-w-2xl mx-auto">Soluciones profesionales diseñadas para cuidar, regenerar y embellecer tu piel.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Técnica Avanzada</span>
                <h3 className="text-2xl font-serif text-[#4a3b32]">Camuflaje de Estrías</h3>
                <p className="text-sm text-[#6b5b52] leading-relaxed">
                  Procedimiento estético que busca disimular visualmente las estrías mediante la aplicación de pigmentos seleccionados de acuerdo con el tono de piel del paciente.
                </p>
                <div className="space-y-2 pt-2 text-xs text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Duración:</strong> ~30 minutos</p>
                  <p><strong>Zonas:</strong> Abdomen, piernas, glúteos, caderas, busto.</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Camuflaje de Estrías')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-sm font-medium transition-all"
                >
                  Consultar / Reservar
                </button>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Regeneración Cutánea</span>
                <h3 className="text-2xl font-serif text-[#4a3b32]">Regeneración de Estrías con Colágeno</h3>
                <p className="text-sm text-[#6b5b52] leading-relaxed">
                  Tratamiento orientado a mejorar la textura y apariencia de las estrías estimulando el proceso natural de regeneración y producción de colágeno y elastina.
                </p>
                <div className="space-y-2 pt-2 text-xs text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Enfoque:</strong> Bioestimulación controlada</p>
                  <p><strong>Resultado:</strong> Textura uniforme sin pigmentos</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Regeneración de Estrías con Colágeno')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-sm font-medium transition-all"
                >
                  Consultar / Reservar
                </button>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Tecnología Plasma Pen</span>
                <h3 className="text-2xl font-serif text-[#4a3b32]">Eliminación de Lunares y Verrugas</h3>
                <p className="text-sm text-[#6b5b52] leading-relaxed">
                  Remoción estética de pequeñas lesiones cutáneas benignas y acrocordones mediante tecnología de plasma, con alta precisión y acción localizada.
                </p>
                <div className="space-y-2 pt-2 text-xs text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Duración:</strong> 10 a 15 min (según cantidad)</p>
                  <p><strong>Nota:</strong> Requiere evaluación previa obligatoria</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Eliminación de Lunares y Verrugas')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-sm font-medium transition-all"
                >
                  Consultar / Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANTES Y DESPUÉS SECTION */}
      <section className="py-20 bg-white border-y border-[#f0ebe3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-serif text-[#4a3b32]">Resultados Reales</h2>
            <p className="text-[#6b5b52]">Así se ve la evolución de nuestros tratamientos profesionales.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-xl rounded-2xl overflow-hidden shadow-lg border border-[#e6dfd5]">
              <img
                src="/antes-despues.jpg"
                alt="Antes y Después Camuflaje de Estrías"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[#faf8f5] text-center text-sm font-medium text-[#4a3b32]">
                Camuflaje de estrías — Resultado visible después de 2 sesiones.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS Y PAQUETES */}
      <section id="precios" className="py-20 bg-[#f9f6f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Inversión en tu Piel</h2>
            <p className="text-[#6b5b52]">Planes accesibles y paquetes diseñados para obtener los mejores resultados.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#e6dfd5] text-center space-y-4 shadow-sm">
              <h3 className="text-lg font-serif text-[#4a3b32]">1 Sesión</h3>
              <p className="text-3xl font-bold text-[#b88686]">350.000 Gs</p>
              <p className="text-xs text-[#777]">Ideal para una primera prueba o zona localizada.</p>
              <button
                onClick={() => openBookingModal('Paquete 1 Sesión')}
                className="w-full bg-[#f4ece1] hover:bg-[#e8ded1] text-[#4a3b32] py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Agendar
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#d4a373] text-center space-y-4 shadow-md relative">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#d4a373] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                Más Elegido
              </span>
              <h3 className="text-lg font-serif text-[#4a3b32]">2 Sesiones</h3>
              <p className="text-3xl font-bold text-[#b88686]">500.000 Gs</p>
              <p className="text-xs text-[#777]">Perfecto para continuidad y retoques iniciales.</p>
              <button
                onClick={() => openBookingModal('Paquete 2 Sesiones')}
                className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Agendar
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#e6dfd5] text-center space-y-4 shadow-sm">
              <h3 className="text-lg font-serif text-[#4a3b32]">3 Sesiones</h3>
              <p className="text-3xl font-bold text-[#b88686]">850.000 Gs</p>
              <p className="text-xs text-[#777]">Tratamiento completo recomendado para mayor cobertura.</p>
              <button
                onClick={() => openBookingModal('Paquete 3 Sesiones')}
                className="w-full bg-[#f4ece1] hover:bg-[#e8ded1] text-[#4a3b32] py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-serif text-[#4a3b32]">Lo que dicen nuestras clientas</h2>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>
          <div className="bg-[#faf8f5] p-8 sm:p-10 rounded-2xl border border-[#e6dfd5] shadow-sm relative">
            <p className="text-lg italic text-[#555] mb-6">
              &quot;Buenas Tardes. Quedó súper bien la eliminación que me habías hecho. A los 7 días ya estaba súper bien ya 😆😆😆&quot;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#d4a373] flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-[#4a3b32]">Clienta Verificada</p>
                <p className="text-xs text-[#777]">Reseña vía WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POLÍTICAS DE RESERVA */}
      <section className="py-16 bg-[#f4ece1] border-t border-[#e6dfd5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl font-serif text-[#4a3b32] text-center">Políticas de Reserva y Citas</h3>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6dfd5] text-sm text-[#6b5b52] space-y-3 leading-relaxed">
            <p>• Para confirmar la cita, se deberá abonar una <strong>reserva de Gs. 50.000</strong>.</p>
            <p>• El monto abonado en concepto de reserva <strong>no es reembolsable</strong>.</p>
            <p>• Si necesitás cancelar o reprogramar tu cita, solicitamos avisar <strong>con al menos 24 horas de anticipación</strong> para reagendar según disponibilidad.</p>
            <p>• Las cancelaciones con menos de 24 horas o inasistencia implican la pérdida de los Gs. 50.000.</p>
            <p>• Se establece un <strong>tiempo máximo de tolerancia de 15 minutos</strong> desde el horario reservado.</p>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACTO */}
      <footer id="contacto" className="bg-[#2c2c2c] text-[#d6d6d6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h4 className="text-xl font-serif text-white">Cami Isla Studio</h4>
            <p className="text-sm text-[#aaa]">
              Licenciada en Cosmetología especializada en estética reparadora y corporal en Asunción.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-serif text-white">Ubicación</h4>
            <p className="text-sm text-[#aaa]">
              Overava 674, Barrio Salvador del Mundo<br />
              Asunción, Paraguay
            </p>
            <p>
              <a
                href="https://maps.app.goo.gl/xMz8NTiREFEubY9c7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4a373] hover:underline text-sm font-medium"
              >
                Abrir en Google Maps →
              </a>
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-serif text-white">Contacto y Reservas</h4>
            <p className="text-sm text-[#aaa]">Escríbenos directamente por WhatsApp para coordinar turnos y consultas.</p>
            <a
              href="https://wa.me/595981000000?text=Hola%20Cami,%20quiero%20consultar%20sobre%20tus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#d4a373] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#bc8a5f] transition-all"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-[#444] text-center text-xs text-[#888]">
          © {new Date().getFullYear()} Cami Isla Studio. Todos los derechos reservados.
        </div>
      </footer>

      {/* MODAL DE RESERVA RÁPIDA */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-serif text-[#4a3b32]">Reservar Cita</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[#6b5b52]">
              Estás a un paso de agendar tu turno para <strong>{selectedService}</strong>. Para confirmar la cita se requiere una seña de <strong>50.000 Gs</strong>.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/595981000000?text=Hola%20Cami,%20quiero%20agendar%20turno%20para%20${encodeURIComponent(selectedService || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-center py-3 rounded-xl font-medium transition-all shadow-sm"
              >
                Continuar por WhatsApp
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="block w-full bg-gray-100 hover:bg-gray-200 text-[#4a3b32] text-center py-3 rounded-xl font-medium transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}