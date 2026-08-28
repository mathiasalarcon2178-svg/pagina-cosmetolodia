'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const SERVICES = [
  { id: 'camuflaje', name: 'Camuflaje de Estrías y Cicatrices', price: '350.000 Gs.', duration: '1h 30m' },
  { id: 'labios', name: 'Hidralips / Micropigmentación de Labios', price: '400.000 Gs.', duration: '2h' },
  { id: 'cejas', name: 'Microblading / Shadow Brows', price: '350.000 Gs.', duration: '2h' },
  { id: 'pestanas', name: 'Lifting de Pestañas', price: '150.000 Gs.', duration: '1h' },
];

const TIME_SLOTS = ['09:00', '10:30', '13:00', '15:00', '17:00'];

export default function Home() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [policies, setPolicies] = useState({
    deposit: '50.000',
    noticeHours: '24',
    toleranceMinutes: '15'
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    try {
      const { data: bData } = await supabase.from('blocked_slots').select('*');
      if (bData) {
        setBlockedSlots(bData.map((item: any) => item.slot_key));
      }

      const { data: pData } = await supabase.from('site_policies').select('*').eq('id', 1).single();
      if (pData) {
        setPolicies({
          deposit: pData.deposit,
          noticeHours: pData.notice_hours,
          toleranceMinutes: pData.tolerance_minutes
        });
      }
    } catch (err) {
      console.error("Error al cargar datos iniciales:", err);
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !clientName || !clientPhone) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('bookings').insert([
      {
        client_name: clientName,
        client_phone: clientPhone,
        service_name: selectedService.name,
        date: selectedDate,
        time_slot: selectedTime
      }
    ]);

    setLoading(false);

    if (!error) {
      setStep(3);
    } else {
      alert('Hubo un error al registrar la reserva. Intentalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-sans selection:bg-[#e6dfd5]">
      {/* HEADER */}
      <header className="border-b border-[#e6dfd5] bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-[#4a3b32] tracking-wide">Cami Isla Studio</h1>
            <p className="text-[10px] text-[#8c7a6b] uppercase tracking-widest">Estética & Micropigmentación</p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#6b5b52] hover:text-[#4a3b32] hidden sm:inline-block"
            >
              Instagram
            </a>
            <Link 
              href="/admin" 
              className="text-xs text-[#4a3b32] bg-[#f0ebe3] hover:bg-[#e6dfd5] border border-[#d6ccbe] px-3.5 py-2 rounded-xl transition-all font-medium"
            >
              Panel Admin
            </Link>
          </div>
        </div>
      </header>

      {/* HERO & RESERVATION SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-[#f0ebe3] text-[#4a3b32] text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-medium inline-block">
            ✨ Especialista Certificada
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#4a3b32] leading-tight">
            Realza tu belleza natural con total confianza.
          </h2>
          <p className="text-sm text-[#6b5b52] leading-relaxed">
            Transformá tu piel y recupera tu seguridad con tratamientos avanzados en camuflaje de estrías, micropigmentación de labios, cejas y más. Elegí tu servicio y agendá tu espacio en segundos.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#6b5b52]">
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#e6dfd5] shadow-xs">
              Seña de reserva: <strong className="text-[#4a3b32]">{policies.deposit} Gs.</strong>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#e6dfd5] shadow-xs">
              Tolerancia de llegada: <strong className="text-[#4a3b32]">{policies.toleranceMinutes} min</strong>
            </div>
          </div>
        </div>

        {/* WIDGET DE RESERVAS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6dfd5] shadow-xl">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#4a3b32]">1. Selecciona un Servicio</h3>
              <div className="space-y-3">
                {SERVICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                      selectedService.id === s.id
                        ? 'border-[#4a3b32] bg-[#faf8f5] shadow-xs'
                        : 'border-[#e6dfd5] hover:border-[#d6ccbe]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-[#4a3b32]">{s.name}</h4>
                      <p className="text-[11px] text-[#8c7a6b]">Duración: {s.duration}</p>
                    </div>
                    <span className="text-xs font-bold text-[#4a3b32]">{s.price}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-xs font-medium transition-all"
              >
                Continuar con la fecha y hora →
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif text-[#4a3b32]">2. Fecha y Tus Datos</h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#b88686] hover:underline"
                >
                  ← Volver
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#4a3b32] mb-1">Fecha de la cita</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3b32] mb-1">Horario disponible</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isBlocked = blockedSlots.includes(`${selectedDate}_${slot}`);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBlocked || !selectedDate}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                            isBlocked
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : selectedTime === slot
                              ? 'bg-[#4a3b32] text-white border-[#4a3b32]'
                              : 'bg-[#faf8f5] text-[#4a3b32] border-[#d6ccbe] hover:border-[#4a3b32]'
                          }`}
                        >
                          {slot} {isBlocked && '(Ocupado)'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3b32] mb-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3b32] mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="0981 123 456"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !selectedTime}
                className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
              >
                {loading ? 'Confirmando...' : 'Confirmar y Agendar Turno'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 bg-[#e6dfd5] text-[#4a3b32] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-serif text-[#4a3b32]">¡Turno Solicitado con Éxito!</h3>
              <p className="text-xs text-[#6b5b52] leading-relaxed">
                Gracias <strong>{clientName}</strong>. Tu solicitud para <strong>{selectedService.name}</strong> el día <strong>{selectedDate}</strong> a las <strong>{selectedTime} HS</strong> fue registrada correctamente.
              </p>
              <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-[#e6dfd5] text-xs text-[#6b5b52]">
                ⚠️ Recuerda abonar la seña de <strong>{policies.deposit} Gs.</strong> para asegurar tu espacio de forma definitiva.
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedTime('');
                  setClientName('');
                  setClientPhone('');
                }}
                className="w-full bg-[#4a3b32] text-white py-3 rounded-xl text-xs font-medium"
              >
                Agendar otro turno
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e6dfd5] py-8 mt-16 text-center text-xs text-[#8c7a6b]">
        <p>© 2026 Cami Isla Studio. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}