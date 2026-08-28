'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [bookings, setBookings] = useState<any[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<any[]>([]);
  const [policies, setPolicies] = useState({
    deposit: '50.000',
    noticeHours: '24',
    toleranceMinutes: '15'
  });

  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockTime, setNewBlockTime] = useState('09:00');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === 'admin' && passwordInput === 'camisla') {
      setIsAuthenticated(true);
      loadAdminData();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  async function loadAdminData() {
    try {
      // Cargar reservas
      const { data: bData, error: bError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!bError && bData) setBookings(bData);

      // Cargar bloqueos
      const { data: sData } = await supabase.from('blocked_slots').select('*');
      if (sData) setBlockedSlots(sData);

      // Cargar políticas
      const { data: pData } = await supabase.from('site_policies').select('*').eq('id', 1).single();
      if (pData) {
        setPolicies({
          deposit: pData.deposit,
          noticeHours: pData.notice_hours,
          toleranceMinutes: pData.tolerance_minutes
        });
      }
    } catch (err) {
      console.error("Error al cargar datos del admin:", err);
    }
  }

  const handleDeleteBooking = async (id: string) => {
    if (confirm('¿Estás segura de eliminar esta reserva?')) {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        alert('Error al eliminar la reserva');
      }
    }
  };

  const handleAddBlockSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate) return;

    const slotKey = `${newBlockDate}_${newBlockTime}`;
    const { error } = await supabase.from('blocked_slots').insert([{ slot_key: slotKey }]);

    if (!error) {
      alert('Horario bloqueado exitosamente');
      setNewBlockDate('');
      loadAdminData();
    } else {
      alert('Este horario ya está bloqueado o hubo un error.');
    }
  };

  const handleDeleteBlockSlot = async (id: string) => {
    const { error } = await supabase.from('blocked_slots').delete().eq('id', id);
    if (!error) {
      loadAdminData();
    }
  };

  const handleUpdatePolicies = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('site_policies').update({
      deposit: policies.deposit,
      notice_hours: policies.noticeHours,
      tolerance_minutes: policies.toleranceMinutes
    }).eq('id', 1);

    if (!error) {
      alert('Políticas actualizadas correctamente');
    } else {
      alert('Error al actualizar políticas');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-[#e6dfd5] shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-serif text-[#4a3b32]">Panel de Administradora</h1>
            <p className="text-xs text-[#6b5b52]">Ingresá tus credenciales para acceder al sistema.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#4a3b32]">Usuario</label>
              <input
                type="text"
                required
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#4a3b32]">Contraseña</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-3 rounded-xl text-xs font-medium transition-all"
            >
              Entrar al Panel
            </button>
            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-[#b88686] hover:underline">
                ← Volver al sitio principal
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm">
          <div>
            <h1 className="text-2xl font-serif text-[#4a3b32]">Panel de Administración</h1>
            <p className="text-xs text-[#6b5b52]">Gestión de turnos, bloqueos y políticas de Cami Isla Studio.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="bg-[#4a3b32] text-white px-4 py-2 rounded-xl text-xs font-medium">
              Ver Web
            </Link>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setUserInput('');
                setPasswordInput('');
              }}
              className="border border-[#b88686] text-[#b88686] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#b88686] hover:text-white transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* RESERVAS RECIBIDAS */}
        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-[#4a3b32]">Reservas de Clientes</h2>
            <button onClick={loadAdminData} className="text-xs text-[#b88686] hover:underline">
              🔄 Actualizar lista
            </button>
          </div>
          {bookings.length === 0 ? (
            <p className="text-xs text-[#6b5b52]">No hay reservas registradas todavía.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#6b5b52]">
                <thead className="bg-[#faf8f5] text-[#4a3b32] border-b border-[#e6dfd5]">
                  <tr>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Teléfono</th>
                    <th className="p-3">Servicio</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Hora</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe3]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#fcfbf9]">
                      <td className="p-3 font-medium text-[#4a3b32]">{b.client_name}</td>
                      <td className="p-3">{b.client_phone}</td>
                      <td className="p-3">{b.service_name}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3">{b.time_slot}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="text-red-500 hover:underline font-medium"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BLOQUEO DE HORARIOS */}
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4">
            <h2 className="text-xl font-serif text-[#4a3b32]">Bloquear Horarios</h2>
            <form onSubmit={handleAddBlockSlot} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#4a3b32]">Fecha a bloquear</label>
                <input
                  type="date"
                  required
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#4a3b32]">Hora</label>
                <select
                  value={newBlockTime}
                  onChange={(e) => setNewBlockTime(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                >
                  <option value="09:00">09:00</option>
                  <option value="10:30">10:30</option>
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium"
              >
                Bloquear este horario
              </button>
            </form>

            <div className="pt-4 border-t border-[#f0ebe3]">
              <h3 className="text-xs font-semibold text-[#4a3b32] mb-2">Horarios bloqueados actuales:</h3>
              <div className="max-h-36 overflow-y-auto space-y-1 text-xs">
                {blockedSlots.map((s) => (
                  <div key={s.id} className="flex justify-between items-center bg-[#faf8f5] p-2 rounded-lg border border-[#e6dfd5]">
                    <span>{s.slot_key.replace('_', ' - ')} HS</span>
                    <button onClick={() => handleDeleteBlockSlot(s.id)} className="text-red-500 hover:underline">Desbloquear</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EDITAR POLÍTICAS */}
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4">
            <h2 className="text-xl font-serif text-[#4a3b32]">Políticas del Sitio</h2>
            <form onSubmit={handleUpdatePolicies} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#4a3b32]">Monto de seña (Gs.)</label>
                <input
                  type="text"
                  value={policies.deposit}
                  onChange={(e) => setPolicies({ ...policies, deposit: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#4a3b32]">Horas de anticipación para cancelar</label>
                <input
                  type="text"
                  value={policies.noticeHours}
                  onChange={(e) => setPolicies({ ...policies, noticeHours: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#4a3b32]">Minutos de tolerancia</label>
                <input
                  type="text"
                  value={policies.toleranceMinutes}
                  onChange={(e) => setPolicies({ ...policies, toleranceMinutes: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs text-[#4a3b32]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4a3b32] hover:bg-[#352a23] text-white py-2.5 rounded-xl text-xs font-medium"
              >
                Guardar Políticas
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}