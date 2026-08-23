'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Phone, Camera, CheckCircle2, Send, User, 
  Calendar, Clock, Star, Shield, ArrowRight, X, ChevronRight, Eye, Info, Check
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  tag: string;
  duration: string;
  sessions: string;
  description: string;
  image: string;
  gallery: string[];
  procedure: string[];
  benefits: string[];
}

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

  // Estado para controlar el Modal de Detalles del Servicio
  const [modalService, setModalService] = useState<Service | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string>('');

  const zonesList = ['Rostro', 'Cuello', 'Pecho', 'Abdomen', 'Espalda', 'Brazos', 'Piernas', 'Glúteos'];

  const servicesList: Service[] = [
    {
      id: 'camuflaje-estrias',
      title: 'Camuflaje de Estrías',
      tag: 'Técnica Paramédica',
      duration: '2 - 3 horas',
      sessions: '1 - 2 Sesiones',
      description: 'Micropigmentación avanzada que iguala el tono de las estrías con la tez natural de tu piel, volviéndolas ópticamente imperceptibles.',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      procedure: [
        'Evaluación clínica del tono de piel y fototipo.',
        'Mezcla y preparación personalizada del pigmento biocompatible.',
        'Implantación micro-pigmentaria en capa epidérmica.',
        'Aplicación de sellante regenerador y protocolo post-cuidado.'
      ],
      benefits: [
        'Resultados visibles tras la cicatrización.',
        'Durabilidad de 3 a 5 años.',
        'Procedimiento seguro que no destruye el tejido.'
      ]
    },
    {
      id: 'camuflaje-cicatrices',
      title: 'Camuflaje de Cicatrices',
      tag: 'Neutralización',
      duration: '1.5 - 2.5 horas',
      sessions: '1 - 3 Sesiones',
      description: 'Neutralización del tono en cicatrices quirúrgicas o estéticas para integrarlas armónicamente con el tejido circundante.',
      image: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      procedure: [
        'Análisis de madurez del tejido cicatricial (debe ser blanca/plana).',
        'Prueba de tono e implantación sutil de matices neutralizadores.',
        'Homogeneización con bordes de la piel sana.',
        'Instrucciones específicas para regeneración tisular.'
      ],
      benefits: [
        'Disimula cicatrices de cesáreas, cirugías o accidentes.',
        'Tono personalizado exacto a la piel adyacente.',
        'Mejora la estética corporal y la confianza.'
      ]
    },
    {
      id: 'regeneracion-estrias',
      title: 'Regeneración con Colágeno (Estrías)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      sessions: '3 - 4 Sesiones',
      description: 'Inducción percutánea para restructurar la textura, atenuar la profundidad y reactivar la elastina biológica de la piel.',
      image: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      procedure: [
        'Higienización y preparación de la zona tratada.',
        'Micro-punción percutánea para estimular colágeno natural.',
        'Infiltración de sueros y concentrados de factores de crecimiento.',
        'Máscara o bálsamo calmante e hidratante.'
      ],
      benefits: [
        'Mejora la textura áspera y rehundida de la piel.',
        'Tratamiento 100% natural sin tinta ni química sintética.',
        'Estimula la firmeza y elasticidad en la zona.'
      ]
    },
    {
      id: 'regeneracion-cicatrices',
      title: 'Regeneración con Colágeno (Cicatrices)',
      tag: 'Sin Pigmentos',
      duration: '1 - 2 horas',
      sessions: '3 - 5 Sesiones',
      description: 'Terapia no invasiva que suaviza relieves, firmeza y rigidez en tejidos cicatriciales antiguos o recientes.',
      image: 'https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      procedure: [
        'Evaluación de la elasticidad de la fibrosis o cicatriz.',
        'Técnica de microneedling para ablandar fibras rígidas.',
        'Aplicación de principios activos tensores y regenerantes.',
        'Fototerapia o sellado protector.'
      ],
      benefits: [
        'Suaviza el relieve y ablanda tejidos fibrosos.',
        'Estimula la regeneración celular propia del cuerpo.',
        'Procedimiento altamente tolerable e indoloro.'
      ]
    },
    {
      id: 'eliminacion-verrugas',
      title: 'Eliminación de Verrugas y Lunares',
      tag: 'Alta Precisión',
      duration: '30 - 60 min',
      sessions: '1 Sesión Única',
      description: 'Remoción rápida y estética de verrugas, lunares y acrocordones indeseados sin comprometer la salud cutánea.',
      image: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      procedure: [
        'Valoración estética de la lesión benigna.',
        'Asepsia de la zona y anestesia tópica local si se requiere.',
        'Cauterización o remoción con equipo de plasmación/alta precisión.',
        'Aplicación de crema antiséptica cicatrizante.'
      ],
      benefits: [
        'Resultados inmediatos en una sola sesión.',
        'Minimiza la posibilidad de cicatriz tras el proceso.',
        'Rápido, limpio y sin sangrado significativo.'
      ]
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

  const openServiceModal = (service: Service) => {
    setModalService(service);
    setActiveModalImage(service.image);
  };

  const closeServiceModal = () => {
    setModalService(null);
  };

  const handleSelectFromModal = (serviceTitle: string, sessions: string) => {
    handleServiceSelect(serviceTitle, sessions);
    closeServiceModal();
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
    <div className="min-h-screen bg-[#fcfaf8] text-[#1a1513] font-sans antialiased selection:bg-[#b08271] selection:text-white">
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#382822] text-[#f7f2ee] text-xs tracking-wider uppercase py-2.5 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 text-[#d8ab9a]" /> Agenda Abierta • Turnos limitados por semana • Atención exclusiva en Paraguay
      </div>

      {/* NAVBAR */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#e5d8d0] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-11 h-11 bg-[#fdf8f6] border border-[#d8ab9a] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#b08271] transition duration-300">
              <Sparkles className="text-[#b08271] group-hover:text-white w-5 h-5 transition duration-300" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#2c1d18] tracking-wider block leading-none">CAMI ISLA</span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#916252] font-extrabold">Estudio Estético</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="https://wa.me/5959713013391"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-black text-[#2c1d18] bg-[#fdf8f6] border border-[#d8ab9a] px-4 py-2.5 rounded-full hover:bg-[#b08271] hover:text-white hover:border-[#b08271] transition duration-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#b08271]" /> 0971 3013391
            </a>
            <button
              onClick={scrollToAgenda}
              className="bg-[#b08271] hover:bg-[#8f6353] text-white px-6 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 ring-2 ring-[#b08271]/20"
            >
              <Calendar className="w-4 h-4" /> Reservar Cita
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-[#fcfaf8] to-[#f5eeea] py-24 px-6 text-center border-b border-[#e5d8d0] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#b08271_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#815141] font-black bg-white border border-[#d8ab9a] px-5 py-2.5 rounded-full shadow-sm mb-6">
            <Shield className="w-4 h-4 text-[#b08271]" /> Estándar Clínico Internacional
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2c1d18] leading-[1.15] mb-6 tracking-tight">
            Devuélvele a tu piel su <span className="text-[#b08271] italic font-normal underline decoration-[#d8ab9a]/50 decoration-wavy">armonía natural</span>
          </h1>
          
          <p className="text-[#40322c] text-lg sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Especialistas en camuflaje biomédico de estrías, regeneración tisular con colágeno y eliminación de imperfecciones con resultados garantizados.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              onClick={scrollToAgenda}
              className="bg-[#b08271] hover:bg-[#8f6353] text-white font-black px-8 py-4.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 text-base uppercase tracking-wider ring-4 ring-[#b08271]/20"
            >
              <Calendar className="w-5 h-5" /> Iniciar Cotización en Línea <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-[#d8ab9a]/40 max-w-3xl mx-auto">
            <div className="text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#e5d8d0]/60">
              <span className="block text-3xl sm:text-4xl font-black text-[#2c1d18]">+500</span>
              <span className="text-xs uppercase tracking-wider text-[#5c4a43] font-bold mt-1 block">Casos Exitosos</span>
            </div>
            <div className="text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#e5d8d0]/60">
              <span className="block text-3xl sm:text-4xl font-black text-[#2c1d18]">100%</span>
              <span className="text-xs uppercase tracking-wider text-[#5c4a43] font-bold mt-1 block">Privacidad Garantizada</span>
            </div>
            <div className="col-span-2 md:col-span-1 text-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#e5d8d0]/60">
              <span className="block text-3xl sm:text-4xl font-black text-[#2c1d18]">5.0 ★</span>
              <span className="text-xs uppercase tracking-wider text-[#5c4a43] font-bold mt-1 block">Valoración de Pacientes</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA DE SERVICIOS INTERACTIVA */}
      <section id="servicios" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#815141] font-black bg-[#f2e8e5] border border-[#d8ab9a]/40 px-4 py-2 rounded-full">
            Catálogo Interactivo
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#2c1d18] mt-4 mb-4">Tratamientos Avanzados</h2>
          <p className="text-[#40322c] max-w-xl mx-auto text-base font-medium">
            Haz clic en cualquier servicio para ver **fotografías, procedimiento paso a paso y detalles técnicos**.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-3xl overflow-hidden border border-[#e5d8d0] flex flex-col shadow-sm hover:shadow-2xl hover:border-[#b08271] transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
              onClick={() => openServiceModal(service)}
            >
              <div className="relative h-60 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#2c1d18] text-xs uppercase font-black tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  {service.tag}
                </span>
                
                {/* BOTÓN OVERLAY PARA EXPLORAR FOTOS */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs">
                  <span className="bg-white text-[#2c1d18] text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition">
                    <Eye className="w-4 h-4 text-[#b08271]" /> Ver Fotos y Galería
                  </span>
                </div>

                <span className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                  <Clock className="w-4 h-4 text-[#d8ab9a]" /> {service.duration}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="inline-block bg-[#fdf8f6] text-[#815141] border border-[#d8ab9a]/60 text-xs font-black px-3.5 py-1.5 rounded-xl mb-3 shadow-2xs">
                    ✨ Estimación: {service.sessions}
                  </div>
                  <h3 className="text-2xl font-black text-[#2c1d18] mb-3 group-hover:text-[#b08271] transition-colors">{service.title}</h3>
                  <p className="text-[#40322c] text-sm leading-relaxed mb-6 font-medium">{service.description}</p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openServiceModal(service);
                    }}
                    className="w-full bg-[#fdf8f6] hover:bg-[#f5eeea] text-[#2c1d18] font-black py-3 rounded-2xl border border-[#d8ab9a] transition text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4 text-[#b08271]" /> Ver Información & fotos
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceSelect(service.title, service.sessions);
                    }}
                    className="w-full bg-[#b08271] hover:bg-[#8f6353] text-white font-black py-3.5 rounded-2xl transition text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" /> Seleccionar Servicio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL / VENTANA EMERGENTE PARA MOSTRAR MÁS FOTOS Y DETALLES */}
      {modalService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e5d8d0] relative">
            
            {/* Botón Cerrar */}
            <button 
              onClick={closeServiceModal}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#2c1d18] p-2.5 rounded-full z-10 shadow-md transition border border-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 space-y-8">
              
              {/* CABECERA MODAL */}
              <div>
                <span className="text-xs uppercase font-black text-[#815141] bg-[#fdf8f6] border border-[#d8ab9a]/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  {modalService.tag}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-[#2c1d18]">{modalService.title}</h3>
                <p className="text-[#40322c] text-sm sm:text-base mt-2 font-medium">{modalService.description}</p>
              </div>

              {/* GALERÍA DE FOTOS INTERACTIVA */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-black text-[#2c1d18] block">Galería de Imágenes del Tratamiento</span>
                <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#e5d8d0] relative bg-black/5">
                  <img src={activeModalImage} alt="Fotos tratamiento" className="w-full h-full object-cover transition-all duration-300" />
                </div>
                {/* Miniaturas */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {modalService.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveModalImage(imgUrl)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activeModalImage === imgUrl ? 'border-[#b08271] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* DETALLES Y PASO A PASO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fcfaf8] p-6 rounded-2xl border border-[#e5d8d0]">
                <div>
                  <h4 className="text-xs font-black uppercase text-[#2c1d18] mb-3 flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 text-[#b08271]" /> Procedimiento
                  </h4>
                  <ul className="space-y-2 text-xs text-[#40322c] font-medium">
                    {modalService.procedure.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#b08271] rounded-full mt-1.5 shrink-0"></span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-[#2c1d18] mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> Beneficios Principales
                  </h4>
                  <ul className="space-y-2 text-xs text-[#40322c] font-medium">
                    {modalService.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* PIE DEL MODAL CON BOTÓN DE ACCIÓN */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5d8d0]">
                <div className="text-xs text-[#5c4a43] font-bold">
                  ⏱️ Duración: {modalService.duration} • 📊 Estimación: {modalService.sessions}
                </div>
                <button
                  onClick={() => handleSelectFromModal(modalService.title, modalService.sessions)}
                  className="w-full sm:w-auto bg-[#b08271] hover:bg-[#8f6353] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Cotizar Este Tratamiento
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIOS */}
      <section className="py-20 bg-[#f5eeea] border-t border-b border-[#e5d8d0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#815141] font-black">Experiencias Reales</span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#2c1d18] mt-2">Lo que opinan nuestros pacientes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-[#e5d8d0] shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#40322c] text-sm italic leading-relaxed mb-6 font-medium">"{t.comment}"</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <span className="font-black text-[#2c1d18] text-base block">{t.name}</span>
                  <span className="text-xs text-[#815141] font-bold">{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-[#2c1d18]">Preguntas Frecuentes</h3>
          <p className="text-sm text-[#5c4a43] font-medium mt-2">Todo lo que necesitas saber antes de tu primera sesión de valoración.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#e5d8d0] overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-black text-[#2c1d18] text-base flex justify-between items-center gap-4 hover:bg-[#fcfaf8] transition"
              >
                {faq.q}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-[#40322c] leading-relaxed border-t border-gray-100 pt-4 font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FORMULARIO / AGENDA INTERACTIVA */}
      <section id="agendar" className="py-24 bg-gradient-to-b from-[#f5eeea] to-white border-t border-[#e5d8d0]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#815141] font-black bg-[#f2e8e5] border border-[#d8ab9a]/50 px-4 py-2 rounded-full inline-block">
              Sistema de Reserva 24/7
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2c1d18] mt-4">Cotiza y Agenda tu Cita</h2>
            <p className="text-sm sm:text-base text-[#5c4a43] font-medium mt-2">Configura los detalles de tu tratamiento para coordinar directamente vía WhatsApp.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#e5d8d0] space-y-8">
            
            {/* PASO 1: GÉNERO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#2c1d18] mb-3">
                1. Género del Paciente *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedGender('Femenino')}
                  className={`py-4 rounded-2xl border-2 font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectedGender === 'Femenino'
                      ? 'border-[#b08271] bg-[#fdf8f6] text-[#2c1d18] shadow-sm ring-2 ring-[#b08271]/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#d8ab9a]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#b08271]" /> Femenino
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('Masculino')}
                  className={`py-4 rounded-2xl border-2 font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectedGender === 'Masculino'
                      ? 'border-[#b08271] bg-[#fdf8f6] text-[#2c1d18] shadow-sm ring-2 ring-[#b08271]/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#d8ab9a]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#b08271]" /> Masculino
                </button>
              </div>
            </div>

            <hr className="border-[#e5d8d0]" />

            {/* PASO 2: SERVICIO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#2c1d18] mb-3">
                2. Selección de Tratamiento *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceSelect(s.title, s.sessions)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-black transition-all duration-200 flex items-center justify-between ${
                      selectedService === s.title
                        ? 'border-[#b08271] bg-[#fdf8f6] text-[#2c1d18] shadow-md ring-2 ring-[#b08271]/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#d8ab9a]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${selectedService === s.title ? 'bg-[#b08271] border-[#b08271]' : 'border-gray-300'}`}></span>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              {selectedService && (
                <div className="mt-4 p-3.5 bg-[#fdf8f6] border border-[#d8ab9a] rounded-xl text-xs text-[#815141] font-black flex items-center gap-2 shadow-2xs">
                  <Sparkles className="w-4 h-4" /> Estimación automática seleccionada: {sessionEstimate}
                </div>
              )}
            </div>

            <hr className="border-[#e5d8d0]" />

            {/* PASO 3: ZONAS CORPORALES */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#2c1d18] mb-1">
                3. Parte(s) del Cuerpo a Tratar *
              </label>
              <p className="text-xs text-[#5c4a43] font-medium mb-3">Selecciona una o múltiples zonas corporales.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {zonesList.map((zone) => {
                  const isSelected = selectedZones.includes(zone);
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleZone(zone)}
                      className={`py-3.5 px-2 rounded-xl border-2 text-xs font-black transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#b08271] text-white border-[#b08271] shadow-md scale-102'
                          : 'border-gray-200 bg-white text-gray-800 hover:border-[#b08271]'
                      }`}
                    >
                      {zone}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-[#e5d8d0]" />

            {/* PASO 4: FOTO DE EVALUACIÓN */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#2c1d18] mb-3">
                4. Foto de la Zona (Opcional)
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#b08271] transition cursor-pointer bg-[#fcfaf8] block">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {!imagePreview ? (
                  <div className="space-y-1">
                    <Camera className="w-8 h-8 text-[#b08271] mx-auto mb-2" />
                    <p className="text-xs font-black text-[#2c1d18]">Cargar fotografía para evaluación previa</p>
                    <p className="text-xs text-gray-500 font-medium">Tratamiento de imágenes bajo estricta confidencialidad médica/estética.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="max-h-40 rounded-xl shadow-md mb-2 object-cover" />
                    <span className="text-xs text-emerald-700 font-black flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fotografía adjuntada correctamente
                    </span>
                  </div>
                )}
              </label>
            </div>

            <hr className="border-[#e5d8d0]" />

            {/* PASO 5: DATOS Y HORARIO */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#2c1d18] mb-4">
                5. Tus Datos de Contacto & Preferencia
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-black text-[#40322c] mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#fcfaf8] focus:border-[#b08271] focus:ring-2 focus:ring-[#b08271]/20 outline-none text-xs font-bold text-[#2c1d18]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#40322c] mb-1">Número de WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej: 0981 123456"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#fcfaf8] focus:border-[#b08271] focus:ring-2 focus:ring-[#b08271]/20 outline-none text-xs font-bold text-[#2c1d18]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#40322c] mb-1">Fecha Sugerida</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#fcfaf8] focus:border-[#b08271] focus:ring-2 focus:ring-[#b08271]/20 outline-none text-xs font-bold text-[#2c1d18]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#40322c] mb-1">Franja Horaria Preferida</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#fcfaf8] focus:border-[#b08271] focus:ring-2 focus:ring-[#b08271]/20 outline-none text-xs font-bold text-[#2c1d18]"
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
              className="w-full bg-[#b08271] hover:bg-[#8f6353] text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 text-sm tracking-wider uppercase ring-4 ring-[#b08271]/20"
            >
              <Send className="w-5 h-5" /> Enviar Cita y Confirmar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2c1d18] text-[#f7f2ee] py-14 text-center text-xs">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="text-[#d8ab9a] w-5 h-5" />
            <span className="text-xl font-black tracking-wider text-white">CAMI ISLA ESTUDIO</span>
          </div>
          <p className="text-xs text-[#d8ab9a] max-w-md mx-auto leading-relaxed font-medium">
            Especialistas certificados en Estética Avanzada y Micropigmentación Paramédica. Transformamos vidas realzando tu belleza natural.
          </p>
          <div className="pt-4 border-t border-[#4a3730] text-xs text-[#bdaea7] space-y-1 font-medium">
            <p>📞 WhatsApp Oficial: 0971 3013391 • Paraguay</p>
            <p>© {new Date().getFullYear()} Cami Isla Estudio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}