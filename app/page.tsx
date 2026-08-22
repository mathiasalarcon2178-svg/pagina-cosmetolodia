'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Phone, Camera, CheckCircle2, Send, User, 
  Calendar, ShieldCheck, HeartPulse, Sparkle, ChevronDown, 
  Award, Clock, Star, MapPin, MessageSquare, Shield, Smile, ArrowRight 
} from 'lucide-react';

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
  const [sessionEstimate, setSessionEstimate] = useState<string>('1 a 3 sesiones (según profundidad)');

  const zonesList = ['Rostro', 'Cuello', 'Pecho', 'Abdomen', 'Espalda', 'Brazos', 'Piernas', 'Glúteos'];

  const servicesList = [
    {
      id: 'camuflaje-estrias',
      title: 'Camuflaje de Estrías',
      tag: 'Técnica Paramédica',
      duration: '2 - 3 horas',
      sessions: '1 - 2 Sesiones',
      description: 'Micropigmentación avanzada que iguala el tono de las estrías con la tez natural de tu piel, volviéndolas ópticamente imperceptibles.',
      image: 'https://images.unsplash.com/photo-1512290900673-0498db25446f?w=800&auto=format&fit=crop'
    },
    {
      id: 'camuflaje-cicatrices',
      title: 'Camuflaje de Cicatrices',
      tag: 'Neutralización',
      duration: '1.5 - 2.5 horas',
      sessions: '1 - 3 Sesiones',
      description: 'Neutralización del tono en cicatrices quirúrgicas o estéticas para integrarlas armónicamente con el tejido circundante.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop'
    },
    {
      id: 'regeneracion-estrias',
      title: 'Regeneración con Colágeno (Estrías)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      sessions: '3 - 4 Sesiones',
      description: 'Inducción percutánea para restructurar la textura, atenuar la profundidad y reactivar la elastina biológica de la piel.',
      image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&auto=format&fit=crop'
    },
    {
      id: 'regeneracion-cicatrices',
      title: 'Regeneración con Colágeno (Cicatrices)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      sessions: '3 - 5 Sesiones',
      description: 'Terapia no invasiva que suaviza relieves, firmeza y rigidez en tejidos cicatriciales antiguos o recientes.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop'
    },
    {
      id: 'eliminacion-verrugas',
      title: 'Eliminación de Verrugas y Lunares',
      tag: 'Alta Precisión',
      duration: '30 - 60 min',
      sessions: '1 Sesión Única',
      description: 'Remoción rápida y estética de verrugas, lunares y acrocordones indeseados sin comprometer la salud cutánea.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Valeria M.',
      service: 'Camuflaje de Estrías',
      comment: 'Increíble el cambio. Después de mis embarazos recuperé la confianza total en mi piel. El estudio es sumamente profesional y limpio.',
      rating: 5
    },
    {
      name: 'Carla R.',
      service: 'Regeneración con Colágeno',
      comment: 'La textura de mi piel mejoró notablemente desde la primera sesión. Cami te explica todo con un trato súper cálido y detallista.',
      rating: 5
    },
    {
      name: 'Lucas G.',
      service: 'Eliminación de Lunares',
      comment: 'Muy rápido y sin dolor. Cero marcas ni complicaciones. 100% recomendado para hombres también.',
      rating: 5
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
      q: '¿Puedo hacer vida normal inmediatamente después?',
      a: 'Sí, son procedimientos ambulatorios. Solo debes seguir cuidados básicos como evitar piscinas, sol directo y saunas durante los primeros días.'
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

  const handleServiceSelect = (serviceTitle: string, sessions: string) => {
    setSelectedService(serviceTitle);
    setSessionEstimate(sessions);
    scrollToAgenda();
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
    <div className="min-h-screen bg-[#fcfaf8] text-[#2c2825] font-sans antialiased selection:bg-[#c59b8a] selection:text-white">
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#4a3730] text-[#f2e8e5] text-[11px] tracking-wider uppercase py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#c59b8a]" /> Agenda Abierta • Turnos limitados por semana • Atención exclusiva en Paraguay
      </div>

      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#f0e8e3] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-[#fdf8f6] border border-[#f2e8e5] rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="text-[#c59b8a] w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#4a3730] tracking-wider block leading-none">CAMI ISLA</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#b08271] font-bold">Estudio Estético</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5959713013391"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#4a3730] hover:text-[#c59b8a] transition"
            >
              <Phone className="w-4 h-4 text-[#c59b8a]" /> 0971 3013391
            </a>
            <button
              onClick={scrollToAgenda}
              className="bg-[#c59b8a] hover:bg-[#b08271] text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Reservar Cita
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-[#fcfaf8] to-[#f7f2ee] py-24 px-6 text-center border-b border-[#f0e8e3] overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c59b8a_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b08271] font-bold bg-white border border-[#e5d8d0] px-5 py-2 rounded-full shadow-sm mb-6">
            <Shield className="w-3.5 h-3.5 text-[#c59b8a]" /> Estándar Clínico Internacional
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#4a3730] leading-[1.1] mb-6 tracking-tight">
            Devuélvele a tu piel su <span className="text-[#c59b8a] italic font-normal">armonía natural</span>
          </h1>
          
          <p className="text-[#6b5e57] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Especialistas en camuflaje biomédico de estrías, regeneración tisular con colágeno y eliminación de imperfecciones con resultados garantizados.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              onClick={scrollToAgenda}
              className="bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base uppercase tracking-wider"
            >
              <Calendar className="w-5 h-5" /> Iniciar Cotización en Línea <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ESTADÍSTICAS / MÉTRICAS DE CONFIANZA */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-[#e5d8d0]/60 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-black text-[#4a3730]">+500</span>
              <span className="text-xs uppercase tracking-wider text-[#7a6e67] font-medium mt-1 block">Casos Exitosos</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-black text-[#4a3730]">100%</span>
              <span className="text-xs uppercase tracking-wider text-[#7a6e67] font-medium mt-1 block">Privacidad Garantizada</span>
            </div>
            <div className="col-span-2 md:col-span-1 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-[#4a3730]">5.0 ★</span>
              <span className="text-xs uppercase tracking-wider text-[#7a6e67] font-medium mt-1 block">Valoración de Pacientes</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA DE SERVICIOS */}
      <section id="servicios" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#b08271] font-bold bg-[#f2e8e5] px-3.5 py-1.5 rounded-full">Catálogo Exclusivo</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#4a3730] mt-3 mb-4">Tratamientos Avanzados</h2>
          <p className="text-[#6b5e57] max-w-xl mx-auto text-sm">Elige el procedimiento ideal y obtén una estimación inmediata de las sesiones requeridas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden border border-[#f0e8e3] flex flex-col shadow-sm hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#4a3730] text-[10px] uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  {service.tag}
                </span>
                <span className="absolute bottom-4 left-4 text-white text-xs font-semibold flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-[#c59b8a]" /> {service.duration}
                </span>
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#fdf8f6] text-[#b08271] border border-[#f2e8e5] text-[11px] font-bold px-3 py-1 rounded-lg mb-3">
                    ✨ Estimación: {service.sessions}
                  </div>
                  <h3 className="text-xl font-bold text-[#4a3730] mb-3">{service.title}</h3>
                  <p className="text-[#6b5e57] text-xs leading-relaxed mb-6">{service.description}</p>
                </div>
                <button
                  onClick={() => handleServiceSelect(service.title, service.sessions)}
                  className="w-full bg-[#fdf8f6] hover:bg-[#c59b8a] text-[#b08271] hover:text-white font-bold py-3.5 rounded-2xl border border-[#f2e8e5] hover:border-[#c59b8a] transition-all duration-300 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkle className="w-4 h-4" /> Seleccionar Servicio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS DE PACIENTES */}
      <section className="py-20 bg-[#f7f2ee] border-t border-b border-[#f0e8e3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#b08271] font-bold">Experiencias Reales</span>
            <h3 className="text-3xl font-black text-[#4a3730] mt-2">Lo que opinan nuestros pacientes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-[#e5d8d0] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#6b5e57] text-xs italic leading-relaxed mb-6">"{t.comment}"</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <span className="font-bold text-[#4a3730] text-sm block">{t.name}</span>
                  <span className="text-[11px] text-[#b08271] font-semibold">{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-[#4a3730]">Preguntas Frecuentes</h3>
          <p className="text-xs text-[#7a6e67] mt-1">Todo lo que necesitas saber antes de tu primera sesión de valoración.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#e5d8d0] overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-[#4a3730] text-sm flex justify-between items-center gap-4 hover:bg-[#fcfaf8] transition"
              >
                {faq.q}
                <ChevronDown className={`w-4 h-4 text-[#c59b8a] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs text-[#6b5e57] leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FORMULARIO / AGENDA INTERACTIVA */}
      <section id="agendar" className="py-24 bg-gradient-to-b from-[#f7f2ee] to-white border-t border-[#f0e8e3]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#b08271] font-bold bg-[#f2e8e5] px-4 py-1.5 rounded-full inline-block">
              Sistema de Reserva 24/7
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#4a3730] mt-4">Cotiza y Agenda tu Cita</h2>
            <p className="text-xs sm:text-sm text-[#7a6e67] mt-2">Configura los detalles de tu tratamiento para coordinar directamente vía WhatsApp.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#e5d8d0] space-y-8">
            
            {/* PASO 1: GÉNERO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a3730] mb-3">
                1. Género del Paciente *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedGender('Femenino')}
                  className={`py-4 rounded-2xl border-2 font-bold text-sm transition flex items-center justify-center gap-2 ${
                    selectedGender === 'Femenino'
                      ? 'border-[#c59b8a] bg-[#fdf8f6] text-[#4a3730] shadow-sm'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-[#f0e8e3]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#c59b8a]" /> Femenino
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('Masculino')}
                  className={`py-4 rounded-2xl border-2 font-bold text-sm transition flex items-center justify-center gap-2 ${
                    selectedGender === 'Masculino'
                      ? 'border-[#c59b8a] bg-[#fdf8f6] text-[#4a3730] shadow-sm'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-[#f0e8e3]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#c59b8a]" /> Masculino
                </button>
              </div>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 2: SERVICIO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a3730] mb-3">
                2. Selección de Tratamiento *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceSelect(s.title, s.sessions)}
                    className={`p-4 rounded-2xl border text-left text-xs font-bold transition flex items-center justify-between ${
                      selectedService === s.title
                        ? 'border-[#c59b8a] bg-[#fdf8f6] text-[#4a3730] shadow-md ring-1 ring-[#c59b8a]'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-[#f0e8e3]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full border shrink-0 ${selectedService === s.title ? 'bg-[#c59b8a] border-[#c59b8a]' : 'border-gray-300'}`}></span>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              {selectedService && (
                <div className="mt-3 p-3 bg-[#fdf8f6] border border-[#f2e8e5] rounded-xl text-xs text-[#b08271] font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Estimación automática seleccionada: {sessionEstimate}
                </div>
              )}
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 3: ZONAS CORPORALES */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a3730] mb-1">
                3. Parte(s) del Cuerpo a Tratar *
              </label>
              <p className="text-[11px] text-gray-500 mb-3">Selecciona una o múltiples zonas corporales.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {zonesList.map((zone) => {
                  const isSelected = selectedZones.includes(zone);
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleZone(zone)}
                      className={`py-3.5 px-2 rounded-xl border text-xs font-bold transition ${
                        isSelected
                          ? 'bg-[#c59b8a] text-white border-[#c59b8a] shadow-md'
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
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a3730] mb-3">
                4. Foto de la Zona (Opcional)
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#c59b8a] transition cursor-pointer bg-[#fcfaf8] block">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {!imagePreview ? (
                  <div className="space-y-1">
                    <Camera className="w-8 h-8 text-[#c59b8a] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#4a3730]">Cargar fotografía para evaluación previa</p>
                    <p className="text-[11px] text-gray-400">Tratamiento de imágenes bajo estricta confidencialidad médica/estética.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="max-h-40 rounded-xl shadow-md mb-2 object-cover" />
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fotografía adjuntada correctamente
                    </span>
                  </div>
                )}
              </label>
            </div>

            <hr className="border-[#f0e8e3]" />

            {/* PASO 5: DATOS Y HORARIO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a3730] mb-4">
                5. Tus Datos de Contacto & Preferencia
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#fcfaf8] focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Número de WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej: 0981 123456"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#fcfaf8] focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Para envío de recordatorios y confirmación de turno.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Fecha Sugerida</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#fcfaf8] focus:border-[#c59b8a] outline-none text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Franja Horaria Preferida</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#fcfaf8] focus:border-[#c59b8a] outline-none text-xs font-medium"
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
              className="w-full bg-[#c59b8a] hover:bg-[#b08271] text-white font-black py-4.5 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-sm tracking-wider uppercase"
            >
              <Send className="w-4 h-4" /> Enviar Cita y Confirmar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4a3730] text-[#f2e8e5] py-14 text-center text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="text-[#c59b8a] w-5 h-5" />
            <span className="text-lg font-black tracking-wider text-white">CAMI ISLA ESTUDIO</span>
          </div>
          <p className="text-xs text-[#dcd0cb] max-w-md mx-auto leading-relaxed">
            Especialistas certificados en Estética Avanzada y Micropigmentación Paramédica. Transformamos vidas realzando tu belleza natural.
          </p>
          <div className="pt-4 border-t border-[#685047] text-[11px] text-[#bdaea7] space-y-1">
            <p>📞 WhatsApp Oficial: 0971 3013391 • Paraguay</p>
            <p>© {new Date().getFullYear()} Cami Isla Estudio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}