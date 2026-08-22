'use client';

import React, { useState } from 'react';
import { Sparkles, Phone, Camera, CheckCircle2, Send, User, Calendar, ShieldCheck, HeartPulse, Sparkle } from 'lucide-react';

export default function Home() {
  const [selectedGender, setSelectedGender] = useState<'Mujer' | 'Hombre'>('Mujer');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('Mañana (08:00 - 12:00)');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const zonesList = ['Rostro', 'Cuello', 'Pecho', 'Abdomen', 'Espalda', 'Brazos', 'Piernas', 'Glúteos'];

  const servicesList = [
    {
      id: 'camuflaje-estrias',
      title: 'Camuflaje de Estrías',
      category: 'Pigmentación Biomédica',
      description: 'Técnica de micropigmentación que iguala el tono de la estría con el color natural de tu piel, logrando un efecto disimulado e imperceptible.',
      image: 'https://images.unsplash.com/photo-1512290900673-0498db25446f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'camuflaje-cicatrices',
      title: 'Camuflaje de Cicatrices',
      description: 'Neutralización del tono de cicatrices quirúrgicas o por traumatismos para integrarlas óptimamente con el resto de la piel.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'regeneracion-colageno-estrias',
      title: 'Regeneración con Colágeno (Estrías)',
      description: 'Inducción percutánea de colágeno sin pigmentos para reestructurar la textura de la piel y regenerar el tejido desde el interior.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'regeneracion-colageno-cicatrices',
      title: 'Regeneración con Colágeno (Cicatrices)',
      description: 'Tratamiento no invasivo para atenuar el relieve y la rigidez de las cicatrices estimulando la elastina natural.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'eliminacion-verrugas',
      title: 'Eliminación de Verrugas y Acrocordones',
      description: 'Procedimiento rápido, seguro y de alta precisión para remover verrugas y lunares indeseados sin cicatrices visibles.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
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

    const hasPhoto = imagePreview ? 'Sí (adjuntada para revisión)' : 'No';

    const message = `Hola Cami Isla Estudio, me gustaría agendar una cita/valoración:

👤 *Nombre:* ${clientName}
📱 *WhatsApp para recordatorios:* ${clientPhone}
👤 *Silueta:* ${selectedGender}
✨ *Tratamiento:* ${selectedService}
📍 *Zona(s) a tratar:* ${selectedZones.join(', ')}
📸 *Adjunta foto:* ${hasPhoto}
📅 *Fecha preferida:* ${appointmentDate || 'A coordinar'} (${appointmentTime})`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5959713013391?text=${encodedMessage}`, '_blank');
  };

  const scrollToAgenda = () => {
    const section = document.getElementById('agendar');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdf8f6] text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#f2e8e5]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-[#c59b8a] w-6 h-6" />
            <span className="text-xl font-bold text-[#4a3730] tracking-wide">Cami Isla Estudio</span>
          </div>
          <button
            onClick={scrollToAgenda}
            className="bg-[#c59b8a] hover:bg-[#b08271] text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Agendar Cita
          </button>
        </div>
      </header>

      {/* HERO / BIENVENIDA */}
      <section className="relative bg-gradient-to-b from-white to-[#fdf8f6] py-16 px-4 text-center border-b border-[#f2e8e5]">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#b08271] font-semibold bg-[#f2e8e5] px-4 py-1.5 rounded-full inline-block mb-4">
            Estética Avanzada & Regeneración Corporal
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4a3730] leading-tight mb-6">
            Restaura la belleza natural de tu piel
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Especialistas en camuflaje biomédico de estrías, regeneración tisular con colágeno y eliminación de imperfecciones cutáneas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToAgenda}
              className="bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition flex items-center gap-2 text-lg"
            >
              <Calendar className="w-5 h-5" /> Iniciar Reserva en Línea
            </button>
            <a
              href="#servicios"
              className="bg-white border border-gray-200 hover:border-[#c59b8a] text-gray-700 font-semibold px-8 py-4 rounded-2xl transition text-lg"
            >
              Ver Tratamientos
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS */}
      <section id="servicios" className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a3730] mb-3">Nuestros Tratamientos</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Conoce nuestras técnicas avanzadas diseñadas para revitalizar tu piel de forma segura y efectiva.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#f2e8e5] flex flex-col hover:shadow-xl transition">
              <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#4a3730] mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(service.title);
                    scrollToAgenda();
                  }}
                  className="w-full bg-[#fdf8f6] hover:bg-[#f2e8e5] text-[#b08271] font-semibold py-2.5 rounded-xl border border-[#f2e8e5] transition text-sm flex items-center justify-center gap-2"
                >
                  <Sparkle className="w-4 h-4" /> Cotizar este servicio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FORMULARIO INTERACTIVO / AGENDADOR */}
      <section id="agendar" className="py-16 bg-white border-t border-[#f2e8e5]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#b08271] font-semibold bg-[#f2e8e5] px-3 py-1 rounded-full">Paso a Paso</span>
            <h2 className="text-3xl font-bold text-[#4a3730] mt-3">Agenda tu Cita y Cotización</h2>
            <p className="text-gray-600 text-sm mt-1">Completa los campos a continuación para personalizar tu valoración.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#fdf8f6] rounded-3xl p-6 md:p-10 shadow-lg border border-[#f2e8e5] space-y-8">
            
            {/* PASO 1: SELECCIÓN DE GÉNERO */}
            <div>
              <h3 className="text-base font-bold text-[#4a3730] flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-[#c59b8a] text-white rounded-full flex items-center justify-center text-xs">1</span>
                Selecciona tu perfil
              </h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedGender('Mujer')}
                  className={`flex-1 py-3 rounded-xl border-2 transition font-medium flex items-center justify-center gap-2 ${
                    selectedGender === 'Mujer' ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm' : 'border-gray-200 bg-white/50 text-gray-500'
                  }`}
                >
                  <User className="w-4 h-4" /> Silueta Femenina
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender('Hombre')}
                  className={`flex-1 py-3 rounded-xl border-2 transition font-medium flex items-center justify-center gap-2 ${
                    selectedGender === 'Hombre' ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm' : 'border-gray-200 bg-white/50 text-gray-500'
                  }`}
                >
                  <User className="w-4 h-4" /> Silueta Masculina
                </button>
              </div>
            </div>

            {/* PASO 2: SERVICIO */}
            <div>
              <h3 className="text-base font-bold text-[#4a3730] flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-[#c59b8a] text-white rounded-full flex items-center justify-center text-xs">2</span>
                Selecciona el Tratamiento *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {servicesList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.title)}
                    className={`p-3 rounded-xl border text-left text-sm font-medium transition ${
                      selectedService === s.title ? 'border-[#c59b8a] bg-white text-[#4a3730] shadow-sm' : 'border-gray-200 bg-white/50 text-gray-600'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 3: ZONAS DEL CUERPO (MULTISELECCIÓN) */}
            <div>
              <h3 className="text-base font-bold text-[#4a3730] flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-[#c59b8a] text-white rounded-full flex items-center justify-center text-xs">3</span>
                Zonas del Cuerpo a Tratar *
              </h3>
              <p className="text-xs text-gray-500 mb-4">Puedes elegir más de una opción.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {zonesList.map((zone) => {
                  const isSelected = selectedZones.includes(zone);
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleZone(zone)}
                      className={`py-3 px-2 rounded-xl border text-sm font-medium transition ${
                        isSelected ? 'bg-[#c59b8a] text-white border-[#c59b8a]' : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {zone}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PASO 4: FOTO DE LA ZONA */}
            <div>
              <h3 className="text-base font-bold text-[#4a3730] flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-[#c59b8a] text-white rounded-full flex items-center justify-center text-xs">4</span>
                Adjuntar Foto de la Zona (Opcional)
              </h3>
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#c59b8a] transition cursor-pointer bg-white block">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {!imagePreview ? (
                  <div className="space-y-1">
                    <Camera className="w-8 h-8 text-[#c59b8a] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-700">Subir imagen de la zona</p>
                    <p className="text-xs text-gray-400">Permite una evaluación rápida previa.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg shadow mb-2 object-cover" />
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Imagen cargada
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* PASO 5: DATOS Y RESERVA */}
            <div>
              <h3 className="text-base font-bold text-[#4a3730] flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-[#c59b8a] text-white rounded-full flex items-center justify-center text-xs">5</span>
                Tus Datos de Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Número de WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej: 0981 123456"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Recibirás aquí los recordatorios de tu cita.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Fecha Preferida</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Horario Preferido</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#c59b8a] outline-none"
                  >
                    <option value="Mañana (08:00 - 12:00)">Mañana (08:00 - 12:00)</option>
                    <option value="Tarde (13:00 - 18:00)">Tarde (13:00 - 18:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              type="submit"
              className="w-full bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-3 text-lg"
            >
              <Send className="w-5 h-5" /> Enviar Consulta y Agendar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#f2e8e5] py-8 text-center text-xs text-gray-500">
        <p className="font-bold text-[#4a3730] text-sm mb-1">Cami Isla Estudio</p>
        <p>© Todos los derechos reservados. Estética Avanzada y Regeneración Corporal.</p>
      </footer>
    </div>
  );
}