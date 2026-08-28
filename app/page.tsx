\'use client\';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Cotizador states
  const [calcService, setCalcService] = useState('camuflaje-estrias');
  const [calcZone, setCalcZone] = useState('gluteos');

  // Pricing matrix estimation per body part
  const getEstimatedPrice = (service: string, zone: string) => {
    const prices: Record<string, Record<string, { price: string; desc: string }>> = {
      'camuflaje-estrias': {
        'gluteos': { price: '450.000 Gs', desc: 'Zona de Glúteos (por sesión)' },
        'caderas': { price: '450.000 Gs', desc: 'Zona de Caderas (por sesión)' },
        'abdomen': { price: '500.000 Gs', desc: 'Abdomen completo (por sesión)' },
        'piernas': { price: '550.000 Gs', desc: 'Piernas / Muslos (por sesión)' },
        'busto': { price: '400.000 Gs', desc: 'Zona de Busto (por sesión)' }
      },
      'camuflaje-cicatrices': {
        'pequeña': { price: '350.000 Gs', desc: 'Cicatriz localizada pequeña' },
        'mediana': { price: '500.000 Gs', desc: 'Cicatriz mediana (ej. quirúrgica estándar)' },
        'grande': { price: '700.000 Gs', desc: 'Cicatriz extensa / compleja' }
      },
      'regeneracion-colageno': {
        'localizada': { price: '300.000 Gs', desc: 'Zona localizada (ej. vientre bajo o cartucheras)' },
        'amplia': { price: '500.000 Gs', desc: 'Zona amplia (glúteos o piernas completas)' }
      },
      'eliminacion-lesiones': {
        '1-3': { price: '200.000 Gs', desc: 'De 1 a 3 lesiones (lunares / verrugas / acrocordones)' },
        '4-7': { price: '350.000 Gs', desc: 'De 4 a 7 lesiones' },
        'mas-7': { price: '500.000 Gs', desc: 'Más de 7 lesiones (paquete completo)' }
      }
    };

    return prices[service]?.[zone] || { price: 'A cotizar', desc: 'Evaluación previa requerida' };
  };

  const currentEstimate = getEstimatedPrice(calcService, calcZone);

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
            <a href="#cotizador" className="hover:text-[#b88686] transition-colors">Cotizador</a>
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
                <Image
                  src="/cami.jpg"
                  alt="Camila Isla - Cosmetóloga"
                  fill
                  className="object-cover"
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
                  <span>Tarifas personalizadas según la zona y el tipo de tratamiento.</span>
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

      {/* SERVICIOS SEPARADOS SECTION */}
      <section id="servicios" className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Nuestros Tratamientos</h2>
            <p className="text-[#6b5b52] max-w-2xl mx-auto">Servicios especializados por separado. Cada tarifa se calcula según la parte del cuerpo a tratar.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Camuflaje de Estrías */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#b88686] font-semibold">Técnica Avanzada</span>
                <h3 className="text-xl font-serif text-[#4a3b32]">Camuflaje de Estrías</h3>
                <p className="text-xs text-[#6b5b52] leading-relaxed">
                  Disimula visualmente las estrías aplicando pigmentos adaptados al tono exacto de tu piel.
                </p>
                <div className="space-y-1.5 pt-2 text-[11px] text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Duración:</strong> ~30 a 60 min</p>
                  <p><strong>Tarifa:</strong> Según zona corporal (Glúteos, caderas, abdomen, piernas)</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Camuflaje de Estrías')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  Consultar / Cotizar
                </button>
              </div>
            </div>

            {/* 2. Camuflaje de Cicatrices */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#b88686] font-semibold">Reparación Cutánea</span>
                <h3 className="text-xl font-serif text-[#4a3b32]">Camuflaje de Cicatrices</h3>
                <p className="text-xs text-[#6b5b52] leading-relaxed">
                  Técnica especializada para unificar el color y disimular cicatrices en diferentes partes del cuerpo.
                </p>
                <div className="space-y-1.5 pt-2 text-[11px] text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Enfoque:</strong> Corrección de discromías</p>
                  <p><strong>Tarifa:</strong> Según tamaño y extensión de la cicatriz</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Camuflaje de Cicatrices')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  Consultar / Cotizar
                </button>
              </div>
            </div>

            {/* 3. Regeneración de Estrías con Colágeno */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#b88686] font-semibold">Bioestimulación</span>
                <h3 className="text-xl font-serif text-[#4a3b32]">Regeneración con Colágeno</h3>
                <p className="text-xs text-[#6b5b52] leading-relaxed">
                  Tratamiento para mejorar la textura y elasticidad de la piel estimulando colágeno de forma natural.
                </p>
                <div className="space-y-1.5 pt-2 text-[11px] text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Resultado:</strong> Textura y firmeza uniforme</p>
                  <p><strong>Tarifa:</strong> Según zona a tratar</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Regeneración de Estrías con Colágeno')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  Consultar / Cotizar
                </button>
              </div>
            </div>

            {/* 4. Eliminación de Lunares y Verrugas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#b88686] font-semibold">Tecnología Plasma Pen</span>
                <h3 className="text-xl font-serif text-[#4a3b32]">Eliminación de Lunares y Verrugas</h3>
                <p className="text-xs text-[#6b5b52] leading-relaxed">
                  Remoción estética segura de pequeñas lesiones benignas y acrocordones por área o cantidad.
                </p>
                <div className="space-y-1.5 pt-2 text-[11px] text-[#555] bg-[#faf8f5] p-3 rounded-xl">
                  <p><strong>Duración:</strong> 10 a 15 min</p>
                  <p><strong>Tarifa:</strong> Según cantidad y zona corporal</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openBookingModal('Eliminación de Lunares y Verrugas')}
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  Consultar / Cotizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COTIZADOR INTERACTIVO POR PARTE DEL CUERPO */}
      <section id="cotizador" className="py-20 bg-white border-y border-[#f0ebe3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-serif text-[#4a3b32]">Cotizador Aproximado por Servicio y Zona</h2>
            <p className="text-[#6b5b52]">Selecciona el tratamiento y la parte del cuerpo para conocer la tarifa estimada.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="bg-[#f9f6f0] p-6 sm:p-10 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selector de Servicio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4a3b32]">1. Selecciona el Servicio:</label>
                <select
                  value={calcService}
                  onChange={(e) => {
                    const s = e.target.value;
                    setCalcService(s);
                    if (s === 'camuflaje-estrias') setCalcZone('gluteos');
                    else if (s === 'camuflaje-cicatrices') setCalcZone('pequeña');
                    else if (s === 'regeneracion-colageno') setCalcZone('localizada');
                    else if (s === 'eliminacion-lesiones') setCalcZone('1-3');
                  }}
                  className="w-full bg-white border border-[#d6ccbe] rounded-xl p-3 text-sm text-[#4a3b32] focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="camuflaje-estrias">Camuflaje de Estrías</option>
                  <option value="camuflaje-cicatrices">Camuflaje de Cicatrices</option>
                  <option value="regeneracion-colageno">Regeneración de Estrías con Colágeno</option>
                  <option value="eliminacion-lesiones">Eliminación de Lunares y Verrugas</option>
                </select>
              </div>

              {/* Selector de Parte / Zona */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4a3b32]">2. Selecciona la Parte del Cuerpo / Extensión:</label>
                <select
                  value={calcZone}
                  onChange={(e) => setCalcZone(e.target.value)}
                  className="w-full bg-white border border-[#d6ccbe] rounded-xl p-3 text-sm text-[#4a3b32] focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  {calcService === 'camuflaje-estrias' && (
                    <>
                      <option value="gluteos">Glúteos</option>
                      <option value="caderas">Caderas</option>
                      <option value="abdomen">Abdomen completo</option>
                      <option value="piernas">Piernas / Muslos</option>
                      <option value="busto">Busto</option>
                    </>
                  )}
                  {calcService === 'camuflaje-cicatrices' && (
                    <>
                      <option value="pequeña">Cicatriz pequeña localizada</option>
                      <option value="mediana">Cicatriz mediana</option>
                      <option value="grande">Cicatriz extensa / compleja</option>
                    </>
                  )}
                  {calcService === 'regeneracion-colageno' && (
                    <>
                      <option value="localizada">Zona localizada</option>
                      <option value="amplia">Zona amplia</option>
                    </>
                  )}
                  {calcService === 'eliminacion-lesiones' && (
                    <>
                      <option value="1-3">1 a 3 lesiones</option>
                      <option value="4-7">4 a 7 lesiones</option>
                      <option value="mas-7">Más de 7 lesiones</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Resultado de la Cotización */}
            <div className="bg-white p-6 rounded-xl border border-[#e8ded1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Cotización Estimada</span>
                <p className="text-lg font-serif text-[#4a3b32]">{currentEstimate.desc}</p>
                <p className="text-xs text-[#777]">Tarifa calculada según parte del cuerpo / requerimiento.</p>
              </div>
              <div className="text-center sm:text-right space-y-2">
                <span className="text-3xl font-bold text-[#b88686]">{currentEstimate.price}</span>
                <div>
                  <button
                    onClick={() => openBookingModal(`${calcService.replace(/-/g, ' ')} (${calcZone})`)}
                    className="bg-[#4a3b32] hover:bg-[#352a23] text-white px-6 py-2.5 rounded-xl text-xs font-medium transition-all shadow-sm"
                  >
                    Reservar con esta cotización
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANTES Y DESPUÉS SECTION */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-serif text-[#4a3b32]">Resultados Reales</h2>
            <p className="text-[#6b5b52]">Así se ve la evolución de nuestros tratamientos profesionales.</p>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-xl w-full rounded-2xl overflow-hidden shadow-lg border border-[#e6dfd5] bg-white">
              <div className="relative w-full h-[350px] sm:h-[420px]">
                <Image
                  src="/resultado.jpg"
                  alt="Antes y Después Camuflaje de Estrías"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 bg-[#faf8f5] text-center text-sm font-medium text-[#4a3b32] border-t border-[#e6dfd5]">
                Camuflaje de estrías — Resultado visible después de sesión en zona corporal.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 bg-white border-y border-[#f0ebe3]">
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
            <p className="text-sm text-[#aaa]">Escríbenos directamente por WhatsApp para coordinar turnos y cotizaciones.</p>
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