'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Camuflaje de Estrías']);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDate, setClientDate] = useState('');
  const [clientTime, setClientTime] = useState('09:00 HS');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [policies, setPolicies] = useState({
    deposit: '50.000',
    noticeHours: '24',
    toleranceMinutes: '15'
  });

  const [calcService, setCalcService] = useState('camuflaje-estrias');
  const [calcZone, setCalcZone] = useState('gluteos');

  const allTreatmentOptions = [
    'Camuflaje de Estrías',
    'Camuflaje de Cicatrices',
    'Regeneración de Estrías',
    'Regeneración de Cicatrices',
    'Eliminación de Lunares',
    'Eliminación de Verrugas',
    'Eliminación de Acrocordones'
  ];

  const galleryItems = [
    { title: 'Camuflaje de Estrías en Glúteos', desc: 'Resultado tras la primera sesión de igualación de tono.', category: 'Camuflaje' },
    { title: 'Tratamiento de Cicatrices Abdominales', desc: 'Disimulación y mejora notable en la textura cutánea.', category: 'Cicatrices' },
    { title: 'Regeneración en Caderas', desc: 'Estimulación de colágeno natural y mejora del tejido.', category: 'Regeneración' },
    { title: 'Eliminación de Lesiones Cutáneas', desc: 'Procedimiento seguro, rápido y sin marcas residuales.', category: 'Eliminación' }
  ];

  useEffect(() => {
    async function loadPublicData() {
      const { data: sData } = await supabase.from('blocked_slots').select('*');
      if (sData) setBlockedSlots(sData.map((s: any) => s.slot_key));

      const { data: pData } = await supabase.from('site_policies').select('*').eq('id', 1).single();
      if (pData) {
        setPolicies({
          deposit: pData.deposit,
          noticeHours: pData.notice_hours,
          toleranceMinutes: pData.tolerance_minutes
        });
      }
    }
    loadPublicData();
  }, []);

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
        'mediana': { price: '500.000 Gs', desc: 'Cicatriz mediana' },
        'grande': { price: '700.000 Gs', desc: 'Cicatriz extensa / compleja' }
      },
      'regeneracion-estrias': {
        'localizada': { price: '300.000 Gs', desc: 'Zona localizada de estrías' },
        'amplia': { price: '500.000 Gs', desc: 'Zona amplia de estrías' }
      },
      'regeneracion-cicatrices': {
        'localizada': { price: '350.000 Gs', desc: 'Regeneración en cicatriz localizada' },
        'amplia': { price: '600.000 Gs', desc: 'Regeneración en cicatrices extensas' }
      },
      'eliminacion-lunares': {
        '1-3': { price: '200.000 Gs', desc: 'De 1 a 3 lunares' },
        '4-7': { price: '350.000 Gs', desc: 'De 4 a 7 lunares' },
        'mas-7': { price: '500.000 Gs', desc: 'Más de 7 lunares' }
      },
      'eliminacion-verrugas': {
        '1-3': { price: '200.000 Gs', desc: 'De 1 a 3 verrugas' },
        '4-7': { price: '350.000 Gs', desc: 'De 4 a 7 verrugas' },
        'mas-7': { price: '500.000 Gs', desc: 'Más de 7 verrugas' }
      },
      'eliminacion-acrocordones': {
        '1-3': { price: '180.000 Gs', desc: 'De 1 a 3 acrocordones' },
        '4-7': { price: '300.000 Gs', desc: 'De 4 a 7 acrocordones' },
        'mas-7': { price: '450.000 Gs', desc: 'Más de 7 acrocordones' }
      }
    };
    return prices[service]?.[zone] || { price: 'A cotizar', desc: 'Evaluación previa requerida' };
  };

  const currentEstimate = getEstimatedPrice(calcService, calcZone);

  const openModalWithService = (serviceName: string) => {
    setSelectedServices([serviceName]);
    setBookingConfirmed(false);
    setModalOpen(true);
  };

  const handleServiceCheckboxChange = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serviceName));
      }
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientDate) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    const timeOnly = clientTime.replace(' HS', '');
    const slotKey = `${clientDate}_${timeOnly}`;

    if (blockedSlots.includes(slotKey)) {
      alert('Lo sentimos, este horario se encuentra bloqueado por la administración. Elija otro.');
      return;
    }

    const { error } = await supabase.from('bookings').insert([{
      client_name: clientName,
      client_phone: clientPhone,
      client_date: clientDate,
      client_time: timeOnly,
      selected_services: selectedServices,
      status: 'Confirmado'
    }]);

    if (error) {
      alert('Hubo un error al registrar la reserva. Intente de nuevo.');
      console.error(error);
    } else {
      setBookingConfirmed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-sans selection:bg-[#e8c8c8] selection:text-[#2c2c2c] relative">
      <div className="bg-[#4a3b32] text-white text-[11px] py-1.5 px-6 text-center flex justify-between items-center shadow-inner">
        <span>✨ Cami Isla Studio — Estética Avanzada y Reparadora en Asunción, Paraguay</span>
        <Link href="/admin" className="underline hover:text-[#d4a373] font-medium transition-colors">
          Acceso Administradora ➔
        </Link>
      </div>

      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e6dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-serif tracking-wide text-[#4a3b32]">Cami Isla Studio</span>
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-[#6b5b52]">
            <a href="#inicio" className="hover:text-[#b88686] transition-colors">Inicio</a>
            <a href="#sobre-mi" className="hover:text-[#b88686] transition-colors">Sobre Mí</a>
            <a href="#servicios" className="hover:text-[#b88686] transition-colors">Servicios</a>
            <a href="#resultados" className="hover:text-[#b88686] transition-colors">Resultados</a>
            <a href="#cotizador" className="hover:text-[#b88686] transition-colors">Cotizador</a>
            <a href="#contacto" className="hover:text-[#b88686] transition-colors">Contacto</a>
          </nav>
          <button
            onClick={() => openModalWithService('Camuflaje de Estrías')}
            className="bg-[#d4a373] hover:bg-[#bc8a5f] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
          >
            Reservar Cita
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-20 lg:py-32 bg-gradient-to-b from-[#f4ece1] to-[#faf8f5] overflow-hidden">
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
                Especialista en camuflaje de estrías, cicatrices y eliminación estética de lesiones cutáneas en Asunción. Tratamientos seguros con resultados reales.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => openModalWithService('Camuflaje de Estrías')}
                  className="bg-[#4a3b32] text-white hover:bg-[#352a23] px-8 py-3.5 rounded-full font-medium transition-all text-center shadow-md"
                >
                  Reservar Turno Ahora
                </button>
                <a
                  href="#cotizador"
                  className="border border-[#4a3b32] text-[#4a3b32] hover:bg-[#4a3b32] hover:text-white px-8 py-3.5 rounded-full font-medium transition-all text-center"
                >
                  Ver Cotizador
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#e8ded1]">
                <Image src="/cami.jpg" alt="Camila Isla" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="py-20 bg-white border-y border-[#f0ebe3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Conocé a la especialista</span>
              <h2 className="text-3xl font-serif text-[#4a3b32]">Licenciada Camila Isla</h2>
              <p className="text-sm text-[#6b5b52] leading-relaxed">
                Licenciada en Cosmetología especializada en estética reparadora y corporal en Asunción. Apasionada por devolverle la seguridad a cada paciente a través de técnicas avanzadas, aparatología de vanguardia y resultados naturales visibles desde la primera sesión.
              </p>
            </div>
            <div className="bg-[#f9f6f0] p-8 rounded-2xl border border-[#e6dfd5] text-xs text-[#6b5b52] space-y-4 shadow-sm">
              <p className="font-semibold text-[#4a3b32] text-sm">✨ Compromiso profesional:</p>
              <p>• Evaluación personalizada previa a cada sesión para garantizar la efectividad.</p>
              <p>• Insumos, pigmentos y aparatología de máxima calidad dermatológica.</p>
              <p>• Espacio clínico esterilizado, privado y confortable en Asunción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section id="servicios" className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Tratamientos Especializados</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Nuestros Servicios</h2>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTreatmentOptions.map((srv) => (
              <div key={srv} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dfd5] flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-[#4a3b32]">{srv}</h3>
                  <p className="text-xs text-[#6b5b52] leading-relaxed">
                    Tratamiento profesional especializado para el cuidado, restauración y mejora estética visible de la piel.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => openModalWithService(srv)}
                    className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium transition-all"
                  >
                    Agendar Turno
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="resultados" className="py-20 bg-white border-y border-[#f0ebe3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Transformaciones Reales</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a3b32]">Galería de Resultados</h2>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="bg-[#f9f6f0] rounded-2xl overflow-hidden border border-[#e6dfd5] shadow-sm flex flex-col">
                <div className="relative h-64 bg-[#e8ded1] flex items-center justify-center text-xs text-[#6b5b52]">
                  <span>[Foto Antes y Después {idx + 1}]</span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest bg-[#e8ded1] text-[#6b5b52] px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-base font-serif text-[#4a3b32] mt-2">{item.title}</h3>
                    <p className="text-xs text-[#6b5b52] mt-1">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => openModalWithService(item.title)}
                    className="mt-4 text-xs font-semibold text-[#b88686] hover:underline text-left"
                  >
                    Quiero este tratamiento ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COTIZADOR */}
      <section id="cotizador" className="py-20 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Calculá tu presupuesto</span>
            <h2 className="text-3xl font-serif text-[#4a3b32]">Cotizador Interactivo</h2>
            <div className="w-16 h-0.5 bg-[#d4a373] mx-auto"></div>
          </div>
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6dfd5] space-y-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#4a3b32]">Seleccionar Servicio:</label>
                <select
                  value={calcService}
                  onChange={(e) => {
                    const s = e.target.value;
                    setCalcService(s);
                    if (s === 'camuflaje-estrias') setCalcZone('gluteos');
                    else if (s === 'camuflaje-cicatrices') setCalcZone('pequeña');
                    else if (s.includes('regeneracion')) setCalcZone('localizada');
                    else setCalcZone('1-3');
                  }}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-sm text-[#4a3b32]"
                >
                  <option value="camuflaje-estrias">Camuflaje de Estrías</option>
                  <option value="camuflaje-cicatrices">Camuflaje de Cicatrices</option>
                  <option value="regeneracion-estrias">Regeneración de Estrías</option>
                  <option value="regeneracion-cicatrices">Regeneración de Cicatrices</option>
                  <option value="eliminacion-lunares">Eliminación de Lunares</option>
                  <option value="eliminacion-verrugas">Eliminación de Verrugas</option>
                  <option value="eliminacion-acrocordones">Eliminación de Acrocordones</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#4a3b32]">Zona o Cantidad:</label>
                <select
                  value={calcZone}
                  onChange={(e) => setCalcZone(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-sm text-[#4a3b32]"
                >
                  {calcService === 'camuflaje-estrias' && (
                    <>
                      <option value="gluteos">Glúteos</option>
                      <option value="caderas">Caderas</option>
                      <option value="abdomen">Abdomen</option>
                      <option value="piernas">Piernas / Muslos</option>
                      <option value="busto">Busto</option>
                    </>
                  )}
                  {calcService === 'camuflaje-cicatrices' && (
                    <>
                      <option value="pequeña">Pequeña</option>
                      <option value="mediana">Mediana</option>
                      <option value="grande">Extensa / Compleja</option>
                    </>
                  )}
                  {calcService.includes('regeneracion') && (
                    <>
                      <option value="localizada">Localizada</option>
                      <option value="amplia">Amplia</option>
                    </>
                  )}
                  {calcService.includes('eliminacion') && (
                    <>
                      <option value="1-3">De 1 a 3 unidades</option>
                      <option value="4-7">De 4 a 7 unidades</option>
                      <option value="mas-7">Más de 7 unidades</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="bg-[#f9f6f0] p-6 rounded-xl border border-[#e8ded1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#6b5b52]">Estimación orientativa:</p>
                <p className="text-lg font-serif text-[#4a3b32]">{currentEstimate.desc}</p>
                <span className="text-2xl font-bold text-[#b88686]">{currentEstimate.price}</span>
              </div>
              <button
                onClick={() => openModalWithService(`${calcService} (${calcZone})`)}
                className="bg-[#4a3b32] hover:bg-[#352a23] text-white px-6 py-3 rounded-xl text-xs font-medium transition-all"
              >
                Reservar con esta cotización
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POLÍTICAS DE RESERVA */}
      <section className="py-16 bg-[#f4ece1] border-t border-[#e6dfd5]">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-serif text-[#4a3b32] text-center">Políticas de Reserva y Citas</h2>
          <div className="bg-white p-8 rounded-2xl border border-[#e6dfd5] text-sm text-[#6b5b52] space-y-4 shadow-sm">
            <p>• Para confirmar la cita, se deberá abonar una <strong>reserva de Gs. {policies.deposit}</strong>.</p>
            <p>• El monto abonado en concepto de reserva <strong>no es reembolsable</strong>.</p>
            <p>• Si necesitás cancelar o reprogramar tu cita, solicitamos avisar <strong>con al menos {policies.noticeHours} horas de anticipación</strong>.</p>
            <p>• Se establece un <strong>tiempo máximo de tolerancia de {policies.toleranceMinutes} minutos</strong> desde el horario reservado.</p>
          </div>
        </div>
      </section>

      {/* FOOTER CON EL ENLACE UNIVERSAL DE WHATSAPP Y EL DE INSTAGRAM */}
      <footer id="contacto" className="bg-[#2c2c2c] text-[#d6d6d6] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="space-y-3">
            <h3 className="text-xl font-serif text-white">Cami Isla Studio</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Estética avanzada y reparadora en Asunción.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-serif text-white">Ubicación</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Overava 674, Barrio Salvador del Mundo<br />Asunción, Paraguay
            </p>
            <a 
              href="https://maps.app.goo.gl/9y5HnJkS2J1v4K4F7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block text-xs text-[#d4a373] underline font-medium pt-1"
            >
              Abrir en Google Maps →
            </a>
          </div>
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-serif text-white">Contacto y Consultas</h3>
            <p className="text-xs text-gray-300">Canales oficiales de atención directa.</p>
            <a
              href="https://wa.me/5959XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4a373] hover:bg-[#bc8a5f] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-sm inline-block"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Cami Isla Studio. Todos los derechos reservados.</p>
          <a
            href="https://www.instagram.com/camisla_studio?igsi=MTVwemZ6azQ0b3hiZg=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform font-bold"
            aria-label="Instagram"
          >
            ig
          </a>
        </div>
      </footer>

      {/* MODAL DE RESERVA CON CHECKBOXES MÚLTIPLES */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-serif text-[#4a3b32]">Sistema de Reservas</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
            </div>

            {!bookingConfirmed ? (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#4a3b32]">
                    Selecciona uno o más tratamientos de interés:
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-[#d6ccbe] rounded-xl p-3 bg-[#faf8f5] space-y-2">
                    {allTreatmentOptions.map((srv) => (
                      <label key={srv} className="flex items-center space-x-3 text-xs text-[#4a3b32] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(srv)}
                          onChange={() => handleServiceCheckboxChange(srv)}
                          className="rounded border-[#d6ccbe] text-[#4a3b32] focus:ring-0"
                        />
                        <span>{srv}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-[#4a3b32]">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. María Gómez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-[#4a3b32]">Número de Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 0981 123 456"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#4a3b32]">Fecha deseada *</label>
                    <input
                      type="date"
                      required
                      value={clientDate}
                      onChange={(e) => setClientDate(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#4a3b32]">Horario preferido *</label>
                    <select
                      value={clientTime}
                      onChange={(e) => setClientTime(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                    >
                      <option value="09:00 HS">09:00 HS</option>
                      <option value="10:30 HS">10:30 HS</option>
                      <option value="13:00 HS">13:00 HS</option>
                      <option value="15:00 HS">15:00 HS</option>
                      <option value="17:00 HS">17:00 HS</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3.5 rounded-xl text-xs font-medium transition-all shadow-sm"
                >
                  Confirmar Solicitud de Reserva
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-lg font-serif text-[#4a3b32]">¡Turno Solicitado con Éxito!</h4>
                <p className="text-xs text-[#6b5b52]">Abona la seña de Gs. {policies.deposit} para confirmar definitivamente tu lugar.</p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full bg-[#d4a373] text-white py-3 rounded-xl text-xs font-medium"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}