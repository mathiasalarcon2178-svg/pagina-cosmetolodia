'use client';

import React, { useState } from 'react';

export default function Home() {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedGender, setSelectedGender] = useState('Femenino');
  
  // Ahora permitimos múltiples servicios y múltiples zonas
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Estado para el modal detallado
  const [activeModalService, setActiveModalService] = useState<any | null>(null);

  const services = [
    {
      id: 'camuflaje-estrias',
      name: 'Camuflaje de Estrías',
      price: 'Consultar',
      duration: '90 min',
      benefit: 'Unifica el tono de la piel de forma duradera, disimulando las estrías visiblemente con pigmentación especializada.',
      description: 'Es una técnica de micropigmentación paramédica avanzada. Consiste en implantar pigmentos biocompatibles del tono exacto de tu piel en la capa media de la dermis donde se encuentra la estría, logrando que esta se camufle y pase desapercibida de manera permanente ante cualquier tipo de iluminación o exposición solar.',
      process: '1. Evaluación del fototipo de piel y mapeo de estrías. \n2. Aplicación de anestesia tópica para mayor confort. \n3. Imantación y depósito de pigmento a medida.',
      aftercare: 'Evitar exposición solar directa, piscinas y saunas durante los primeros 7 días posteriores al procedimiento.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'camuflaje-cicatrices',
      name: 'Camuflaje de Cicatrices',
      price: 'Consultar',
      duration: '90 min',
      benefit: 'Disimulación estética avanzada para devolver la armonía natural y el tono uniforme a tu dermis.',
      description: 'Diseñado específicamente para neutralizar discromías (cambios de coloración) en cicatrices quirúrgicas, accidentales o post-traumáticas. Restaura visualmente la continuidad cromática de la piel mediante la introducción de tonos perfectamente calibrados.',
      process: '1. Diagnóstico de la profundidad y textura del tejido cicatricial. \n2. Selección y mezcla personalizada de pigmentos correctores. \n3. Pigmentación precisa en zonas despigmentadas.',
      aftercare: 'Mantener la zona hidratada con cremas regeneradoras recomendadas y evitar rascar o arrancar costras.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'regen-estrias',
      name: 'Regeneración de Estrías con Colágeno',
      price: 'Consultar',
      duration: '60 min',
      benefit: 'Estimulación profunda de colágeno y elastina para mejorar significativamente la textura y firmeza.',
      description: 'Tratamiento bio-regenerativo que no utiliza pigmentos, sino activos concentrados, péptidos y técnicas de inducción percutánea para obligar a la piel a romper la fibrosis de la estría vieja y generar nuevo colágeno natural, mejorando notablemente el grosor, surco y textura.',
      process: '1. Limpieza y desinfección profunda de la zona. \n2. Aplicación de cócteles ricos en colágeno y factores de crecimiento. \n3. Activación mecánica de la regeneración tisular.',
      aftercare: 'Uso obligatorio de protector solar si la zona queda expuesta y evitar exfoliantes fuertes por 5 días.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'regen-cicatrices',
      name: 'Regeneración de Cicatrices con Colágeno',
      price: 'Consultar',
      duration: '60 min',
      benefit: 'Reparación tisular avanzada y activación celular para alisar cicatrices profundas o atróficas.',
      description: 'Enfocado en cicatrices deprimidas, atróficas o con irregularidades severas. Estimula la proliferación de fibroblastos y la síntesis de nuevas fibras de colágeno y elastina, rellenando y nivelando la superficie de la piel de forma gradual.',
      process: '1. Preparación y antisepsia de la cicatriz. \n2. Aplicación de nutrientes biomédicos de alta pureza. \n3. Estimulación profunda controlada para reestructuración celular.',
      aftercare: 'Aplicar protector solar factor 50+ diariamente y mantener la piel perfectamente hidratada.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'elim-verrugas',
      name: 'Eliminación de Verrugas',
      price: 'Consultar',
      duration: '30 min',
      benefit: 'Procedimiento seguro, clínico y rápido sin marcas invasivas ni molestias prolongadas.',
      description: 'Técnica clínica altamente efectiva orientada a la eliminación controlada y segura de verrugas vulgares o planas, evitando su propagación y garantizando una recuperación limpia de la piel circundante.',
      process: '1. Asepsia y delimitación de la lesión. \n2. Aplicación de método de remoción seguro y localizado. \n3. Curación y protección de la pequeña zona tratada.',
      aftercare: 'No manipular la costra que se forma de manera natural; dejar que caiga por sí sola para evitar marcas.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'elim-lunares',
      name: 'Eliminación de Lunares',
      price: 'Consultar',
      duration: '45 min',
      benefit: 'Evaluación y remoción estética precisa bajo estrictos estándares de cuidado.',
      description: 'Remoción estética de lunares benignos indeseados por motivos estéticos o de fricción. Se realiza bajo rigurosos protocolos de bioseguridad, cuidando que el proceso de cicatrización sea estético y discreto.',
      process: '1. Evaluación visual y control previo de la lesión. \n2. Procedimiento de extracción rápida y precisa. \n3. Protocolo de cuidado post-remoción.',
      aftercare: 'Evitar la exposición solar en la zona en proceso de cicatrización y seguir las pautas de higienización.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'elim-acrocordones',
      name: 'Eliminación de Acrocordones',
      price: 'Consultar',
      duration: '30 min',
      benefit: 'Limpieza impecable, segura y definitiva de pequeños fibromas blandos en cuello o cuerpo.',
      description: 'Procedimiento exprés y sumamente seguro para eliminar acrocordones (pequeños fibromas blandos o verruguitas colgantes que suelen aparecer en el cuello, axilas o debajo de los pechos debido al roce). Resultado instantáneo sin dolor incapacitante.',
      process: '1. Desinfección de la zona de pliegues o cuello. \n2. Corte o eliminación instantánea y estéril de la lesión. \n3. Aplicación de antiséptico sellador.',
      aftercare: 'Mantener seco y limpio durante los primeros 2 días.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const zones = ['Rostro', 'Cuello', 'Escote', 'Abdomen', 'Glúteos', 'Piernas', 'Espalda'];

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((s) => s !== serviceName) : [...prev, serviceName]
    );
  };

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
    if (selectedServices.length === 0) {
      alert('Por favor selecciona al menos un servicio.');
      return;
    }
    if (selectedZones.length === 0) {
      alert('Por favor selecciona al menos una zona a tratar.');
      return;
    }

    setNotification('¡Cita registrada con éxito! Redirigiendo a WhatsApp...');
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
        <div className="fixed top-5 right-5 z-50 bg-[#2c221e] text-[#f4eee6] border border-[#d4b996] px-6 py-4 rounded-2xl shadow-2xl transition-all animate-bounce flex items-center gap-3">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* MODAL DETALLADO */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8 animate-in fade-in zoom-in duration-200">
            <div className="h-72 relative">
              <img src={activeModalService.image} alt={activeModalService.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold hover:bg-black transition-colors"
              >
                ✕
              </button>
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-medium">
                ⏱ Duración: {activeModalService.duration}
              </span>
              <h3 className="absolute bottom-4 left-6 right-6 font-serif font-bold text-2xl text-white">
                {activeModalService.name}
              </h3>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c6d53] block mb-2">Descripción del Procedimiento</span>
                <p className="text-gray-700 text-sm leading-relaxed">{activeModalService.description}</p>
              </div>

              <div className="bg-[#faf8f5] p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c6d53] block">Paso a Paso de la Sesión</span>
                <p className="text-gray-600 text-xs whitespace-pre-line leading-relaxed">{activeModalService.process}</p>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c6d53] block">Cuidados Posteriores (Post-Tratamiento)</span>
                <p className="text-gray-600 text-xs leading-relaxed">{activeModalService.aftercare}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedServices.includes(activeModalService.name)) {
                      setSelectedServices([...selectedServices, activeModalService.name]);
                    }
                    setActiveModalService(null);
                  }}
                  className="flex-1 bg-[#2c221e] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#1a1311] transition-colors shadow-lg"
                >
                  ✓ Añadir a mis servicios seleccionados
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalService(null)}
                  className="px-6 py-4 bg-stone-100 text-stone-700 rounded-2xl font-bold text-sm hover:bg-stone-200 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#1a1311] text-[#d4b996] text-xs py-2 px-4 text-center tracking-widest font-medium uppercase">
        ✨ Turnos limitados por semana • Atención exclusiva en Asunción, Paraguay
      </div>

      {/* HEADER */}
      <header className="bg-gradient-to-b from-[#2c221e] to-[#1f1715] text-[#f4eee6] py-20 px-6 text-center relative overflow-hidden shadow-xl">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-[#d4b996] font-bold block">
            Estética Avanzada & Biomédica
          </span>
          <h1 className="text-4xl sm:text-7xl font-serif font-extrabold tracking-tight text-white">
            Cami Isla Studio
          </h1>
          <p className="text-base sm:text-xl text-[#dcd6ce] max-w-2xl mx-auto font-light leading-relaxed">
            Devuélvele a tu piel su armonía natural. Especialistas en camuflaje, regeneración tisular con colágeno y eliminación de imperfecciones con resultados garantizados.
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-sm text-[#d4b996]">
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">📞 0971 301 339</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">📍 Asunción, Paraguay</span>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        
        {/* SECCIÓN DE SERVICIOS */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#8c6d53] font-bold">Nuestros Tratamientos</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c221e]">Excelencia y Cuidado Profesional</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Puedes seleccionar uno o varios tratamientos para tu sesión. Haz clic en las tarjetas para ver los detalles completos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => {
              const isSelected = selectedServices.includes(srv.name);
              return (
                <div
                  key={srv.id}
                  className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between group ${
                    isSelected ? 'border-[#8c6d53] ring-4 ring-[#8c6d53]/15 scale-[1.02]' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="h-56 overflow-hidden relative cursor-pointer" onClick={() => setActiveModalService(srv)}>
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wide">
                        ⏱ {srv.duration}
                      </span>
                      <h3 className="absolute bottom-4 left-4 right-4 font-serif font-bold text-lg text-white leading-snug">
                        {srv.name}
                      </h3>
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{srv.benefit}</p>
                      <button
                        type="button"
                        onClick={() => setActiveModalService(srv)}
                        className="text-xs font-bold text-[#8c6d53] hover:underline flex items-center gap-1"
                      >
                        🔍 Ver información detallada y pasos →
                      </button>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-stone-100 mt-auto">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {srv.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleServiceToggle(srv.name)}
                      className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all shadow-sm ${
                        isSelected ? 'bg-[#2c221e] text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? 'Seleccionado ✓' : '+ Añadir Tratamiento'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FORMULARIO DE AGENDAMIENTO */}
        <section className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-8 sm:p-14 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2c221e] via-[#8c6d53] to-[#d4b996]"></div>
          
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#8c6d53] font-bold">Reserva Exclusiva</span>
            <h2 className="text-3xl font-serif font-bold text-[#2c221e]">Completa los Datos de tu Cita</h2>
            <p className="text-gray-500 text-sm">Asegura tu espacio y nos pondremos en contacto inmediato para confirmar los detalles.</p>
          </div>

          <div className="space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Nombre y Apellido *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Camila Benítez"
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Teléfono / WhatsApp *</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: 0981 123 456"
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Género</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900 shadow-sm"
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* RESUMEN DE SERVICIOS SELECCIONADOS */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">Tratamientos Seleccionados *</label>
              {selectedServices.length === 0 ? (
                <p className="text-xs text-amber-700 font-medium">Aún no has seleccionado ningún tratamiento. Haz clic arriba en "+ Añadir Tratamiento" o elige varios.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((srvName) => (
                    <span key={srvName} className="bg-[#2c221e] text-white text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                      {srvName}
                      <button type="button" onClick={() => handleServiceToggle(srvName)} className="text-stone-300 hover:text-white font-bold">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">Zonas a Tratar (Selecciona una o varias) *</label>
              <div className="flex flex-wrap gap-2.5">
                {zones.map((zone) => {
                  const active = selectedZones.includes(zone);
                  return (
                    <button
                      type="button"
                      key={zone}
                      onClick={() => handleZoneToggle(zone)}
                      className={`px-5 py-2.5 text-xs font-medium rounded-xl border transition-all shadow-sm ${
                        active
                          ? 'bg-[#2c221e] text-white border-[#2c221e] shadow-md scale-105'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {zone} {active && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Fecha Preferida</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Hora Estimada</label>
                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#8c6d53] focus:outline-none text-sm text-gray-900 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Foto de Referencia / Zona a Tratar (Opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-stone-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer shadow-sm"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Previsualización" className="h-24 w-24 object-cover rounded-2xl border-2 border-[#8c6d53] shadow-md" />
                </div>
              )}
            </div>

            <div className="pt-8 space-y-4 border-t border-stone-100">
              <button
                type="button"
                onClick={handleBookAppointment}
                className="w-full bg-[#2c221e] hover:bg-[#1a1311] text-[#f4eee6] py-4 px-8 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform active:scale-[0.99]"
              >
                ✨ Confirmar y Registrar Cita en el Sistema
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-4 px-8 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
                </svg>
                ¿Dudas con tu caso? Escríbenos directamente por WhatsApp
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* BURBUJAS FLOTANTES */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://www.instagram.com/camisla_studio?igsi=MTVwemZ6azQ0b3hiZg=="
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
          title="Síguenos en Instagram"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

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

      <footer className="bg-[#1a1311] text-[#dcd6ce] py-14 px-6 text-center border-t border-[#3d302a]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-serif text-2xl text-[#f4eee6] tracking-wide">Cami Isla Studio</p>
          <p className="text-xs text-[#a89f91] uppercase tracking-widest">Asunción, Paraguay • Exclusividad y Cuidado Profesional</p>
          <p className="text-xs text-[#8a7f71] pt-6 border-t border-[#2c221e]">© {new Date().getFullYear()} Cami Isla Studio. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}