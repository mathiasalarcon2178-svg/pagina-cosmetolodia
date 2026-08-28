'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<any[]>([]);
  const [policies, setPolicies] = useState({
    deposit: '50.000',
    noticeHours: '24',
    toleranceMinutes: '15'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAuthenticated(true);
      loadAdminData();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  async function loadAdminData() {
    const { data: bData } = await supabase.from('bookings').select('*').order('client_date', { ascending: true });
    if (bData) setBookings(bData);

    const { data: sData } = await supabase.from('blocked_slots').select('*');
    if (sData) setBlockedSlots(sData);

    const { data: pData } = await supabase.from('site_policies').select('*').eq('id', 1).single();
    if (pData) {
      setPolicies({
        deposit: pData.deposit,
        noticeHours: pData.notice_hours,
        toleranceMinutes: pData.tolerance_minutes
      });
    }
  }

  // Función para cancelar o eliminar una cita definitivamente
  const handleDeleteBooking = async (id: string) => {
    if (confirm('¿Estás segura de eliminar/cancelar esta cita?')) {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) {
        alert('Error al eliminar la cita.');
      } else {
        loadAdminData();
      }
    }
  };

  const handleUpdatePolicies = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('site_policies').upsert({
      id: 1,
      deposit: policies.deposit,
      notice_hours: policies.noticeHours,
      tolerance_minutes: policies.toleranceMinutes
    });

    if (error) {
      alert('Error al guardar políticas.');
    } else {
      alert('Políticas actualizadas correctamente.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl border border-[#e6dfd5] shadow-md max-w-sm w-full space-y-4">
          <h2 className="text-xl font-serif text-[#4a3b32] text-center">Panel de Administración</h2>
          <p className="text-xs text-[#6b5b52] text-center">Ingresá tu clave de acceso</p>
          <input
            type="password"
            placeholder="Clave (ej. 1234)"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
            required
          />
          <button type="submit" className="w-full bg-[#4a3b32] text-white py-3 rounded-xl text-xs font-medium">
            Ingresar
          </button>
          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-[#b88686] underline">← Volver al sitio web</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] p-6 sm:p-10 space-y-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center border-b border-[#e6dfd5] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a3b32]">Panel Administradora - Cami Isla Studio</h1>
          <p className="text-xs text-[#6b5b52]">Gestión completa de citas, turnos y políticas del sitio.</p>
        </div>
        <Link href="/" className="bg-[#4a3b32] text-white px-4 py-2 rounded-xl text-xs font-medium">
          Ver Sitio Público
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONFIGURACIÓN DE POLÍTICAS */}
        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4 lg:col-span-1 h-fit">
          <h2 className="text-lg font-serif text-[#4a3b32]">Políticas del Sitio</h2>
          <form onSubmit={handleUpdatePolicies} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-[#4a3b32]">Monto de Reserva (Gs.):</label>
              <input
                type="text"
                value={policies.deposit}
                onChange={(e) => setPolicies({ ...policies, deposit: e.target.value })}
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-2.5"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-[#4a3b32]">Horas de anticipación aviso:</label>
              <input
                type="text"
                value={policies.noticeHours}
                onChange={(e) => setPolicies({ ...policies, noticeHours: e.target.value })}
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-2.5"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-[#4a3b32]">Minutos de tolerancia:</label>
              <input
                type="text"
                value={policies.toleranceMinutes}
                onChange={(e) => setPolicies({ ...policies, toleranceMinutes: e.target.value })}
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-2.5"
              />
            </div>
            <button type="submit" className="w-full bg-[#d4a373] text-white py-2.5 rounded-xl font-medium">
              Guardar Cambios
            </button>
          </form>
        </div>

        {/* LISTADO Y GESTIÓN DE CITAS */}
        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-6 lg:col-span-2">
          <h2 className="text-lg font-serif text-[#4a3b32]">Citas y Turnos Agendados ({bookings.length})</h2>

          {bookings.length === 0 ? (
            <p className="text-xs text-gray-500">No hay citas registradas en este momento.</p>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {bookings.map((b) => (
                <div key={b.id} className="bg-[#faf8f5] p-4 rounded-xl border border-[#e6dfd5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[#4a3b32]">{b.client_name}</p>
                    <p className="text-gray-600">Teléfono: <strong>{b.client_phone}</strong></p>
                    <p className="text-gray-600">Fecha y Hora: <strong>{b.client_date} a las {b.client_time}</strong></p>
                    <p className="text-gray-500">Tratamiento(s): {Array.isArray(b.selected_services) ? b.selected_services.join(', ') : b.selected_services}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                      {b.status || 'Confirmado'}
                    </span>
                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-xl font-medium transition-colors"
                    >
                      Cancelar / Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}