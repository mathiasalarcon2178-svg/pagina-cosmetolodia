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

  const services = [
    { id: 'limpieza', name: 'Limpieza Facial Profunda', price: '150.000 Gs' },
    { id: 'peeling', name: 'Peeling Químico', price: '200.000 Gs' },
    { id: 'acne', name: 'Tratamiento Anti-Acné', price: '180.000 Gs' },
  ];

  const zones = ['Rostro', 'Cuello', 'Escote'];

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

  const handleSubmit = async () => {
    if (!clientName || !clientPhone) {
      alert('Por favor completa tu nombre y teléfono.');
      return;
    }
    if (!selectedService) {
      alert('Por favor selecciona un servicio.');
      return;
    }
    if (selectedZones.length === 0) {
      alert('Por favor selecciona al menos una zona.');
      return;
    }

    window.open('https://wa.me/message/3KYVZSN3F3MKC1', '_blank');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Camila Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Reserva tu cita de cosmetología profesional</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre y Apellido</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ej: Camila Gómez"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono / WhatsApp</label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ej: 0981123456"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Género</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
            >
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona un Servicio</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {services.map((srv) => (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => setSelectedService(srv.name)}
                  className={`p-3 text-left border rounded-xl transition-all ${
                    selectedService === srv.name
                      ? 'border-green-600 bg-green-50 text-green-900 font-medium shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <p className="text-sm font-semibold">{srv.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{srv.price}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Zonas a Tratar</label>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone) => (
                <button
                  type="button"
                  key={zone}
                  onClick={() => handleZoneToggle(zone)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                    selectedZones.includes(zone)
                      ? 'bg-green-600 text-white border-green-600 font-medium'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Foto de referencia (Opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Vista previa" className="h-20 w-20 object-cover rounded-lg border" />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#40c351] hover:bg-[#36a844] text-white py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium text-base shadow-md"
            >
              Agendar por WhatsApp Directo
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm space-y-1">
          <p>📍 Asunción, Paraguay</p>
          <p>© {new Date().getFullYear()} Camila Studio. Todos los derechos reservados.</p>
        </div>

      </div>
    </main>
  );
}