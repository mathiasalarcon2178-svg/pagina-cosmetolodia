'use client';

import React, { useState } from 'react';
import { Sparkles, Phone, Camera, CheckCircle2, Send, User } from 'lucide-react';

export default function Home() {
  const [selectedGender, setSelectedGender] = useState<'Mujer' | 'Hombre'>('Mujer');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('Mañana (08:00 - 12:00)');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const zones = ['Rostro', 'Cuello', 'Pecho', 'Abdomen', 'Espalda', 'Brazos', 'Piernas', 'Glúteos'];
  const services = [
    'Camuflaje de estrías',
    'Camuflaje de cicatrices',
    'Regeneración de estrías con colágeno',
    'Regeneración de cicatrices con colágeno',
    'Eliminación de verrugas',
    'Eliminación de lunares',
    'Eliminación de acrocordones'
  ];

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

    if (!selectedZone) {
      alert('Por favor selecciona una zona del cuerpo.');
      return;
    }
    if (!selectedService) {
      alert('Por favor selecciona un servicio.');
      return;
    }

    const hasPhoto = imagePreview ? 'Sí (adjunta en este chat)' : 'No';

    const message = `Hola Cami Isla Estudio, me gustaría agendar una valoración/cita:

👤 *Nombre:* ${clientName}
📱 *WhatsApp Cliente:* ${clientPhone}
👤 *Perfil:* ${selectedGender}
📍 *Zona a tratar:* ${selectedZone}
✨ *Servicio:* ${selectedService}
📸 *Adjunta foto:* ${hasPhoto}
📅 *Fecha preferida:* ${appointmentDate || 'A coordinar'} (${appointmentTime})`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5959713013391?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fdf8f6] text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#f2e8e5]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-[#c59b8a] w-6 h-6" />
            <span className="text-xl font-bold text-[#4a3730] tracking-wide">Cami Isla Estudio</span>
          </div>
          <a
            href="https://wa.me/5959713013391"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c59b8a] hover:bg-[#b08271] text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4" /> 0971 3013391
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-12 px-4 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#b08271] font-semibold bg-[#f2e8e5] px-3 py-1 rounded-full">
          Valoración Personalizada
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-[#4a3730] mt-4 leading-tight">
          Agenda tu cita y cotiza tu tratamiento en línea
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Selecciona la zona del cuerpo a tratar, adjunta tu foto y solicita tu cita interactiva en pocos pasos.
        </p>
      </section>

      {/* FORMULARIO INTERACTIVO */}
      <main className="max-w-3xl mx-auto px-4 pb-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#f2e8e5] space-y-8">
          
          {/* PASO 1: DATOS PERSONALES */}
          <div>
            <h2 className="text-lg font-bold text-[#4a3730] flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-[#f2e8e5] text-[#b08271] rounded-full flex items-center justify-center text-sm">1</span>
              Tus Datos de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: María González"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c59b8a] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Número de WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: 0981 123456"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c59b8a] outline-none transition"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">Para enviarte la confirmación y recordatorios de tu cita.</span>
              </div>
            </div>
          </div>

          <hr className="border-[#f2e8e5]" />

          {/* PASO 2: SELECCIÓN DE GÉNERO Y MAPA CORPORAL */}
          <div>
            <h2 className="text-lg font-bold text-[#4a3730] flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-[#f2e8e5] text-[#b08271] rounded-full flex items-center justify-center text-sm">2</span>
              ¿En qué parte del cuerpo es el tratamiento?
            </h2>

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setSelectedGender('Mujer')}
                className={`flex-1 py-2.5 rounded-xl border-2 transition flex items-center justify-center gap-2 font-medium ${
                  selectedGender === 'Mujer'
                    ? 'border-[#c59b8a] bg-[#fdf8f6] text-[#4a3730]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#f2e8e5]'
                }`}
              >
                <User className="w-4 h-4" /> Silueta Femenina
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('Hombre')}
                className={`flex-1 py-2.5 rounded-xl border-2 transition flex items-center justify-center gap-2 font-medium ${
                  selectedGender === 'Hombre'
                    ? 'border-[#c59b8a] bg-[#fdf8f6] text-[#4a3730]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#f2e8e5]'
                }`}
              >
                <User className="w-4 h-4" /> Silueta Masculina
              </button>
            </div>

            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Selecciona la zona a tratar *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {zones.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`border rounded-xl py-3 px-2 text-sm font-medium transition text-center ${
                    selectedZone === zone
                      ? 'bg-[#c59b8a] text-white border-[#c59b8a]'
                      : 'border-gray-200 text-gray-700 hover:border-[#c59b8a]'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#f2e8e5]" />

          {/* PASO 3: TRATAMIENTO SOLICITADO */}
          <div>
            <h2 className="text-lg font-bold text-[#4a3730] flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-[#f2e8e5] text-[#b08271] rounded-full flex items-center justify-center text-sm">3</span>
              Selecciona el Servicio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`border rounded-xl p-3 text-left text-sm font-medium transition flex items-center gap-2 ${
                    selectedService === service
                      ? 'bg-[#fdf8f6] border-[#c59b8a]'
                      : 'border-gray-200 text-gray-700 hover:border-[#c59b8a]'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full border inline-block ${
                      selectedService === service
                        ? 'bg-[#c59b8a] border-[#c59b8a]'
                        : 'border-gray-300'
                    }`}
                  ></span>
                  {service}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#f2e8e5]" />

          {/* PASO 4: ADJUNTAR FOTO */}
          <div>
            <h2 className="text-lg font-bold text-[#4a3730] flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-[#f2e8e5] text-[#b08271] rounded-full flex items-center justify-center text-sm">4</span>
              Adjuntar Foto de la Zona (Opcional)
            </h2>
            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#c59b8a] transition cursor-pointer relative bg-[#fdf8f6]/30 block">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {!imagePreview ? (
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-[#c59b8a] mx-auto" />
                  <p className="text-sm font-medium text-gray-700">Haz clic aquí para subir una foto de tu estría, lunar o cicatriz</p>
                  <p className="text-xs text-gray-400">Permite una evaluación previa más precisa por parte del especialista.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={imagePreview} alt="Vista previa" className="max-h-48 rounded-lg shadow-md mb-2 object-cover" />
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Imagen cargada con éxito
                  </span>
                </div>
              )}
            </label>
          </div>

          <hr className="border-[#f2e8e5]" />

          {/* PASO 5: FECHA TENTATIVA Y RESERVA */}
          <div>
            <h2 className="text-lg font-bold text-[#4a3730] flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-[#f2e8e5] text-[#b08271] rounded-full flex items-center justify-center text-sm">5</span>
              Fecha y Hora Tentativa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Fecha Preferida</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c59b8a] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Horario Preferido</label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c59b8a] outline-none transition"
                >
                  <option value="Mañana (08:00 - 12:00)">Mañana (08:00 - 12:00)</option>
                  <option value="Tarde (13:00 - 18:00)">Tarde (13:00 - 18:00)</option>
                </select>
              </div>
            </div>
          </div>

          {/* BOTÓN PRINCIPAL */}
          <button
            type="submit"
            className="w-full bg-[#c59b8a] hover:bg-[#b08271] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 text-lg"
          >
            <Send className="w-5 h-5" /> Agendar Cita por WhatsApp
          </button>

        </form>
      </main>

      <footer className="bg-white border-t border-[#f2e8e5] py-6 text-center text-xs text-gray-500">
        <p>© Cami Isla Estudio - Estética y Regeneración Corporal. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}