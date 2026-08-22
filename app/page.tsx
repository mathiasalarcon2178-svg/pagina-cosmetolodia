'use client';

import React, { useState } from 'react';
import { Sparkles, Phone, Camera, CheckCircle2, Send, User, Calendar, ShieldCheck, HeartPulse, Sparkle, ChevronDown, Award, Clock } from 'lucide-react';

export default function Home() {
  const [selectedGender, setSelectedGender] = useState<'Femenino' | 'Masculino'>('Femenino');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('Mañana (08:00 - 12:00)');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const zonesList = ['Rostro', 'Cuello', 'Pecho', 'Abdomen', 'Espalda', 'Brazos', 'Piernas', 'Glúteos'];

  const servicesList = [
    {
      id: 'camuflaje-estrias',
      title: 'Camuflaje de Estrías',
      tag: 'Técnica Paramédica',
      duration: '2 - 3 horas',
      description: 'Micropigmentación avanzada que iguala el tono de las estrías con la tez natural de tu piel, volviéndolas ópticamente imperceptibles.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'camuflaje-cicatrices',
      title: 'Camuflaje de Cicatrices',
      tag: 'Neutralización',
      duration: '1.5 - 2.5 horas',
      description: 'Neutralización del tono en cicatrices quirúrgicas o estéticas para integrarlas armónicamente con el tejido circundante.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'regeneracion-estrias',
      title: 'Regeneración con Colágeno (Estrías)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      description: 'Inducción percutánea para restructurar la textura, atenuar la profundidad y reactivar la elastina biológica de la piel.',
      image: 'https://images.unsplash.com/photo-1512290900673-0498db25446f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'regeneracion-cicatrices',
      title: 'Regeneración con Colágeno (Cicatrices)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      description: 'Terapia no invasiva que suaviza relieves, firmeza y rigidez en tejidos cicatriciales antiguos o recientes.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'eliminacion-verrugas',
      title: 'Eliminación de Verrugas y Lunares',
      tag: 'Alta Precisión',
      duration: '30 - 60 min',
      description: 'Remoción rápida y estética de verrugas, lunares y acrocordones indeseados sin comprometer la salud cutánea.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const faqs = [
    {
      q: '¿El procedimiento de camuflaje de estrías es permanente?',
      a: 'Sí, la micropigmentación paramédica utiliza pigmentos específicos de alta permanencia. El resultado suele durar entre 3 a 5 años antes de requerir un retoque sutil.'
    },
    {
      q: '¿Cuál es la diferencia entre camuflaje y regeneración con colágeno?',
      a: 'El camuflaje utiliza pigmentos a tono con tu piel para disimular la diferencia de color. La regeneración con colágeno no usa pigmentos, sino que estimula a tu propia piel a reparar la textura y profundidad.'
    },
    {
      q: '¿Puedo tomar sol después del tratamiento?',
      a: 'Se debe evitar la exposición solar directa durante los primeros 30 a 45 días del proceso de cicatrización para garantizar un tono homogéneo.'
    }
  ];

  const toggleZone = (zone: string) => {
    if (selectedZones.includes(zone)) {
      setSelectedZones(selectedZones.filter((z) => z !== zone));
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      alert('Por favor selecciona un servicio.');
      return;
    }
    if (selectedZones.length === 0) {
      alert('Por favor selecciona al menos una zona del cuerpo.');
      return;
    }

    const hasPhoto = imagePreview ? 'Sí (adjuntada en este chat)' : 'No';

    const message = `Hola Cami Isla Estudio, me gustaría agendar una valoración profesional:

👤 *Nombre:* ${clientName}
📱 *WhatsApp para recordatorios:* ${clientPhone}
🚻 *Género:* ${selectedGender}
✨ *Tratamiento:* ${selectedService}
📍 *Zona(s) a tratar:* ${selectedZones.join(', ')}
📸 *Adjunta foto:* ${hasPhoto}
📅 *Fecha sugerida:* ${appointmentDate || 'A coordinar'} (${appointmentTime})`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5959713013391?text=${encodedMessage}`, '_blank');
  };

  const scrollToAgenda = () => {
    const section = document.getElementById('agendar');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#2c2825] font-sans antialiased">
      {/* NAVBAR EDITORIAL */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#f0e8e3]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#c59b8a]/10 rounded-full flex items-center justify-center">
              <Sparkles className="text-[#c59b8a] w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#4a3730] tracking-wide block leading-none">CAMI ISLA</span>
              <span className="text-[10px] uppercase tracking-widest text-[#b08271] font-medium">Estudio Estético</span>
            </div>
          </div>
          <button
            onClick={scrollToAgenda}
            className="bg-[#c59b8a] hover:bg-[#b08271] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Agendar Cita
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-[#fcfaf8] to-[#f7f2ee] py-20 px-6 text-center border-b border-[#f0e8e3]">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b08271] font-bold bg-[#f2e8e5] px-4 py-1.5 rounded-full inline-block mb-6">
            Especialistas en Micropigmentación Paramédica
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4a3730] leading-tight mb-6 tracking-tight">
            Perfecciona y regenera la apariencia de tu piel
          </h1>
          <p className="text-[#6b5e57] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Tratamientos avanzados en camuflaje biomédico, inducción de colágeno y remoción estética en un espacio de absoluta confidencialidad y confort.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={scrollToAgenda}
              className="bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-base"
            >
              <Calendar className="w-5 h-5" /> Agendar Cita
            </button>
            <a
              href="#servicios"
              className="bg-white border border-[#e5d8d0] hover:border-[#c59b8a] text-[#4a3730] font-semibold px-8 py-4 rounded-2xl transition text-base flex items-center justify-center"
            >
              Explorar Servicios
            </a>
          </div>
        </div>
      </section>

      {/* PILARES / POR QUÉ ELEGIRNOS */}
      <section className="py-14 bg-white border-b border-[#f0e8e3]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fdf8f6] border border-[#f2e8e5] flex items-center justify-center text-[#c59b8a] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#4a3730] mb-1">Técnica Especializada</h4>
              <p className="text-xs text-[#7a6e67] leading-relaxed">Pigmentos hipoalergénicos biomédicos aprobados de alta durabilidad.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fdf8f6] border border-[#f2e8e5] flex items-center justify-center text-[#c59b8a] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#4a3730] mb-1">Valoración Diagnóstica</h4>
              <p className="text-xs text-[#7a6e67] leading-relaxed">Evaluación del tipo de piel y fototipo antes de iniciar cualquier sesión.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fdf8f6] border border-[#f2e8e5] flex items-center justify-center text-[#c59b8a] shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#4a3730] mb-1">Resultados Naturales</h4>
              <p className="text-xs text-[#7a6e67] leading-relaxed">Protocolos diseñados para integrarse orgánicamente con tu piel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA DE SERVICIOS */}
      <section id="servicios" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#b08271] font-bold">Catálogo Clínico</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4a3730] mt-2 mb-4">Nuestros Tratamientos Especializados</h2>
          <p className="text-[#6b5e57] max-w-xl mx-auto text-sm">Selecciona cualquiera de nuestros procedimientos para conocer detalles o solicitar tu presupuesto personalizado.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden border border-[#f0e8e3] flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#4a3730] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {service.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#b08271] font-semibold mb-2">
                    <Clock className="w-3.5 h-3.5" /> {service.duration}
                  </div>
                  <h3 className="text-xl font-bold text-[#4a3730] mb-3">{service.title}</h3>
                  <p className="text-[#6b5e57] text-xs leading-relaxed mb-6">{service.description}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(service.title);
                    scrollToAgenda();
                  }}
                  className="w-full bg-[#fdf8f6] hover:bg-[#f2e8e5] text-[#b08271] font-bold py-3 rounded-xl border border-[#f0e8e3] transition text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkle className="w-4 h-4" /> Seleccionar y Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-16 bg-[#f7f2ee] border-t border-b border-[#f0e8e3]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-[#4a3730]">Preguntas Frecuentes</h3>
            <p className="text-xs text-[#7a6e67] mt-1">Resolvemos tus dudas antes de iniciar tu tratamiento.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#e5d8d0] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-[#4a3730] text-sm flex justify-between items-center gap-4"
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 text-[#c59b8a] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#6b5e57] leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN FORMULARIO / AGENDA */}
      <section id="agendar" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#b08271] font-bold bg-[#f2e8e5] px-4 py-1.5 rounded-full">
              Reserva de Turno
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4a3730] mt-4">Agendar Cita de Valoración</h2>
            <p className="text-xs sm:text-sm text-[#7a6e67] mt-2">Completa el formulario para enviar tu solicitud directa al equipo de Cami Isla Estudio.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#fdf8f6] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#f0e8e3] space-y-8">
            
            {/* PASO 1: GÉNERO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3730] mb-3">
                1. Género del Paciente *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedGender('Femenino')}
                  className={`py-3.5 rounded-2xl border-2 font-semibold text-sm transition flex items-center justify-center gap-2 ${
                    selectedGender === 'Femenino'
                      ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm'
                      : 'border-gray-200 bg-white/50 text-gray-500 hover:border-[#f0e8e3]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#c59b8a]" /> Femenino
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('Masculino')}
                  className={`py-3.5 rounded-2xl border-2 font-semibold text-sm transition flex items-center justify-center gap-2 ${
                    selectedGender === 'Masculino'
                      ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm'
                      : 'border-gray-200 bg-white/50 text-gray-500 hover:border-[#f0e8e3]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#c59b8a]" /> Masculino
                </button>
              </div>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 2: SERVICIO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3730] mb-3">
                2. Selección de Tratamiento *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.title)}
                    className={`p-4 rounded-2xl border text-left text-xs font-bold transition flex items-center gap-3 ${
                      selectedService === s.title
                        ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm'
                        : 'border-gray-200 bg-white/50 text-gray-600 hover:border-[#f0e8e3]'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border shrink-0 ${selectedService === s.title ? 'bg-[#c59b8a] border-[#c59b8a]' : 'border-gray-300'}`}></span>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 3: ZONAS CORPORALES */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3730] mb-1">
                3. Parte(s) del Cuerpo a Tratar *
              </label>
              <p className="text-[11px] text-gray-500 mb-3">Puedes seleccionar una o múltiples zonas.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {zonesList.map((zone) => {
                  const isSelected = selectedZones.includes(zone);
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleZone(zone)}
                      className={`py-3 px-2 rounded-xl border text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-[#c59b8a] text-white border-[#c59b8a] shadow-sm'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-[#c59b8a]'
                      }`}
                    >
                      {zone}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 4: FOTO DE EVALUACIÓN */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3730] mb-3">
                4. Foto de la Zona (Opcional)
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#c59b8a] transition cursor-pointer bg-white block">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {!imagePreview ? (
                  <div className="space-y-1">
                    <Camera className="w-8 h-8 text-[#c59b8a] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#4a3730]">Cargar fotografía para evaluación previa</p>
                    <p className="text-[11px] text-gray-400">Tratamiento de imágenes bajo estricta confidencialidad médica/estética.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="max-h-40 rounded-xl shadow mb-2 object-cover" />
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fotografía adjuntada
                    </span>
                  </div>
                )}
              </label>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 5: DATOS Y HORARIO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3730] mb-4">
                5. Datos del Paciente & Preferencia de Cita
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">Número de WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej: 0981 123456"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Para envío de recordatorios y confirmación.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">Fecha Sugerida</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">Franja Horaria Preferida</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none text-xs font-medium"
                  >
                    <option value="Mañana (08:00 - 12:00)">Mañana (08:00 - 12:00)</option>
                    <option value="Tarde (13:00 - 18:00)">Tarde (13:00 - 18:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BOTÓN ENVIAR */}
            <button
              type="submit"
              className="w-full bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-3 text-sm tracking-wider uppercase"
            >
              <Send className="w-4 h-4" /> Confirmar Consulta por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#f0e8e3] py-10 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 space-y-2">
          <p className="font-bold text-[#4a3730] text-sm tracking-wide">CAMI ISLA ESTUDIO</p>
          <p className="text-[11px]">Estética Avanzada & Micropigmentación Paramédica • WhatsApp: 0971 3013391</p>
          <p className="text-[10px] text-gray-400 pt-2">© Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}