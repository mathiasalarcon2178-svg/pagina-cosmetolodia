'use client';

import React, { useState } from 'react';

export default function Home() {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedGender, setSelectedGender] = useState('Femenino');
  const [selectedService, setSelectedService] = useState('');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const services = [
    {
      id: 'camuflaje-estrias',
      name: 'Camuflaje de Estrías',
      price: 'Consultar',
      duration: '90 min',
      benefit: 'Unifica el tono de la piel de forma duradera, disimulando las estrías visiblemente.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'camuflaje-cicatrices',
      name: 'Camuflaje de Cicatrices',
      price: 'Consultar',
      duration: '90 min',
      benefit: 'Disimulación estética avanzada para devolver la armonía natural a la piel.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'regen-estrias',
      name: 'Regeneración de Estrías con Colágeno',
      price: 'Consultar',
      duration: '60 min',
      benefit: 'Estimulación profunda para mejorar significativamente la textura y firmeza.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'regen-cicatrices',
      name: 'Regeneración de Cicatrices con Colágeno',
      price: 'Consultar',
      duration: '60 min',
      benefit: 'Reparación tisular avanzada y activación celular para alisar la dermis.',
      image: 'https://images.unsplash.com/photo-1512290900722-9a702082b25f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'elim-verrugas',
      name: 'Eliminación de Verrugas',
      price: 'Consultar',
      duration: '30 min',
      benefit: 'Procedimiento seguro, limpio y rápido sin marcas invasivas.',
      image: 'https://images.unsplash.com/photo-1512290900722-9a702082b25f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'elim-lunares',
      name: 'Eliminación de Lunares',
      price: 'Consultar',
      duration: '45 min',
      benefit: 'Evaluación y remoción estética precisa con altos estándares de cuidado.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'elim-acrocordones',
      name: 'Eliminación de Acrocordones',
      price: 'Consultar',
      duration: '30 min',
      benefit: 'Limpieza impecable y segura de pequeños fibromas blandos.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const zones = ['Rostro', 'Cuello', 'Escote', 'Abdomen', 'Glúteos', 'Piernas', 'Espalda'];

  const handleZoneToggle = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookAppointment = () => {
    if (!clientName || !clientPhone) {
      alert('Por favor completa tu nombre y número de teléfono.');
      return;
    }
    if (!selectedService) {
      alert('Por favor selecciona un servicio.');
      return;
    }
    if (selectedZones.length === 0) {
      alert('Por favor selecciona al menos una zona a tratar.');
      return;
    }

    setNotification('¡Cita registrada con éxito en el sistema! Redirigiendo...');
    setTimeout(() => {
      window.open('https://wa.me/message/3KYVZSN3F3MKC1', '_blank');
    }, 1500);
  };

  const handleDirectWhatsApp = () => {
    window.open('https://wa.me/message/3KYVZSN3F3MKC1', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 font-sans selection:bg-[#d4b996] selection:text-white relative">
      
      {/* Notificación flotante de éxito */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-800 text-white px-6 py-3 rounded-xl shadow-2xl transition-all animate-bounce">
          {notification}
        </div>
      )}

      {/* HEADER / HERO SECTION */}
      <header className="bg-[#2c221e] text-[#f4eee6] py-16 px-6 text-center relative overflow-hidden shadow-md">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4b996] font-semibold block mb-3">
            Estudio de Estética Avanzada y Biomédica
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 font-serif">
            Cami Isla Studio
          </h1>
          <p className="text-base sm:text-lg text-[#dcd6ce] max-w-xl mx-auto font-light leading-relaxed">
            Especialistas en camuflaje, regeneración tisular con colágeno y eliminación de imperfecciones con resultados garantizados.
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-[#d4b996] font-medium">
            <span>📞 0971 301 339</span>
            <span>•</span>
            <span>📍 Asunción, Paraguay</span>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        
        {/* SECCIÓN DE SERVICIOS */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#2c221e]">Nuestros Tratamientos</h2>
            <p className="text-gray-600 text-sm mt-2">Selecciona el procedimiento ideal para realzar tu belleza natural</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const isSelected = selectedService === srv.name;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.name)}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between ${
                    isSelected ? 'border-[#8c6d53] ring-2 ring-[#8c6d53]/20 scale-[1.02]' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                        ⏱ {srv.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg text-[#2c221e] mb-2">{srv.name}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed mb-4">{srv.benefit}</p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-auto">
                    <span className="text-xs font-semibold text-[#8c6d53] uppercase tracking-wider">
                      {srv.price}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      isSelected ? 'bg-[#2c221e] text-white' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {isSelected ? 'Seleccionado ✓' : 'Seleccionar'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FORMULARIO DE AGENDAMIENTO */}
        <section className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#2c221e]">Completa tu Reserva</h2>
            <p className="text-gray-500 text-sm mt-1">Llena los datos para apartar tu lugar exclusivo</p>
          </div>

          <div className="space-y-6">
            
            {/* Nombre y Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Nombre y Apellido</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Camila Benítez"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Teléfono / WhatsApp</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: 0981 123 456"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900"
                />
              </div>
            </div>

            {/* Género */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Género</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900"
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Zonas a tratar */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Zonas a Tratar</label>
              <div className="flex flex-wrap gap-2">
                {zones.map((zone) => {
                  const active = selectedZones.includes(zone);
                  return (
                    <button
                      type="button"
                      key={zone}
                      onClick={() => handleZoneToggle(zone)}
                      className={`px-4 py-2 text-xs font-medium rounded-xl border transition-all ${
                        active
                          ? 'bg-[#2c221e] text-white border-[#2c221e] shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {zone} {active && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Fecha Preferida</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Hora Estimada</label>
                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900"
                />
              </div>
            </div>

            {/* Foto de referencia */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Foto de Referencia (Opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-stone-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Previsualización" className="h-20 w-20 object-cover rounded-xl border border-stone-300 shadow-sm" />
                </div>
              )}
            </div>

            {/* BOTONES SEPARADOS COMO PEDISTE */}
            <div className="pt-6 space-y-3">
              {/* Botón 1: Confirmar y Guardar Cita */}
              <button
                type="button"
                onClick={handleBookAppointment}
                className="w-full bg-[#2c221e] hover:bg-[#1a1311] text-[#f4eee6] py-4 px-6 rounded-2xl font-medium text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-[0.99]"
              >
                ✨ Confirmar y Registrar Cita
              </button>

              {/* Botón 2: Consultas Generales por WhatsApp (Independiente) */}
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-2xl font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
                </svg>
                ¿Dudas o consultas? Escríbenos por WhatsApp
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* BOTONES FLOTANTES (WIDGETS DE REDES) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Botón Flotante Instagram */}
        <a
          href="https://www.instagram.com/camisla_studio?igsi=MTVwemZ6azQ0b3hiZg=="
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group relative"
          title="Síguenos en Instagram"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* Botón Flotante WhatsApp */}
        <a
          href="https://wa.me/message/3KYVZSN3F3MKC1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
          title="Chatea con nosotros"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
          </svg>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#2c221e] text-[#dcd6ce] py-10 px-6 text-center mt-20 border-t border-[#3d302a]">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-lg text-[#f4eee6]">Cami Isla Studio</p>
          <p className="text-xs text-[#a89f91]">Asunción, Paraguay • Exclusividad y Cuidado Profesional</p>
          <p className="text-xs text-[#a89f91] pt-4">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}