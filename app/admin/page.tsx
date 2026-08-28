'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  client_name: string;
  client_phone: string;
  client_date: string;
  client_time: string;
  selected_services: string[];
  status: 'Confirmado' | 'Completado' | 'Cancelado';
}

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [policies, setPolicies] = useState({
    deposit: '50.000',
    noticeHours: '24',
    toleranceMinutes: '15'
  });

  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualDate, setManualDate] = useState('');
  const [manualTime, setManualTime] = useState('10:00');
  const [manualService, setManualService] = useState('Camuflaje de Estrías');

  const [blockDate, setBlockDate] = useState('');
  const [blockTime, setBlockTime] = useState('10:00');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bData) setBookings(bData);

    const { data: sData } = await supabase.from('blocked_slots').select('*');
    if (sData) setBlockedSlots(sData.map((s: any) => s.slot_key));

    const { data: pData } = await supabase.from('site_policies').select('*').eq('id', 1).single();
    if (pData) {
      setPolicies({
        deposit: pData.deposit,
        noticeHours: pData.notice_hours,
        toleranceMinutes: pData.tolerance_minutes
      });
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'Cami' && adminPass === 'cami123') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone || !manualDate) return;

    const { error } = await supabase.from('bookings').insert([{
      client_name: manualName,
      client_phone: manualPhone,
      client_date: manualDate,
      client_time: manualTime,
      selected_services: [manualService],
      status: 'Confirmado'
    }]);

    if (error) {
      alert('Error al registrar la cita en Supabase.');
    } else {
      setManualName('');
      setManualPhone('');
      setManualDate('');
      fetchData();
      alert('Cita agregada con éxito.');
    }
  };

  const handleBlockSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    const slotKey = `${blockDate}_${blockTime}`;

    if (blockedSlots.includes(slotKey)) {
      alert('Este horario ya está bloqueado.');
      return;
    }

    const { error } = await supabase.from('blocked_slots').insert([{ slot_key: slotKey }]);
    if (!error) {
      fetchData();
      alert('Horario bloqueado con éxito.');
    }
  };

  const unblockSlot = async (slotKey: string) => {
    const { error } = await supabase.from('blocked_slots').delete().eq('slot_key', slotKey);
    if (!error) fetchData();
  };

  const updateBookingStatus = async (id: string, newStatus: Booking['status']) => {
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (!error) fetchData();
  };

  const deleteBooking = async (id: string) => {
    if (confirm('¿Eliminar esta cita?')) {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  const updatePoliciesInDb = async (newPolicies: typeof policies) => {
    setPolicies(newPolicies);
    await supabase.from('site_policies').update({
      deposit: newPolicies.deposit,
      notice_hours: newPolicies.noticeHours,
      tolerance_minutes: newPolicies.toleranceMinutes
    }).eq('id', 1);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const citasHoyCount = bookings.filter(b => b.client_date === todayStr && b.status !== 'Cancelado').length;
  const citasActivasCount = bookings.filter(b => b.status !== 'Cancelado').length;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-4 sm:p-6 rounded-2xl border border-[#e6dfd5] shadow-sm">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#b88686] font-semibold">Panel Interno (Supabase)</span>
            <h1 className="text-2xl font-serif text-[#4a3b32]">Administración - Cami Isla Studio</h1>
          </div>
          <Link href="/" className="bg-[#4a3b32] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#352a23]">
            Ver Página Pública
          </Link>
        </div>

        {!isAdminLoggedIn ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-6">
            <h2 className="text-xl font-serif text-[#4a3b32] text-center">Acceso Administradora</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Usuario (Cami)"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs"
              />
              <input
                type="password"
                placeholder="Contraseña (cami123)"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full bg-[#faf8f5] border border-[#d6ccbe] rounded-xl p-3 text-xs"
              />
              {loginError && <p className="text-xs text-red-500">{loginError}</p>}
              <button type="submit" className="w-full bg-[#d4a373] text-white py-3 rounded-xl text-xs font-medium">
                Ingresar
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#777]">Citas para hoy</span>
                <p className="text-3xl font-bold text-[#4a3b32]">{citasHoyCount}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#777]">Citas Activas</span>
                <p className="text-3xl font-bold text-[#4a3b32]">{citasActivasCount}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#777]">Seña Requerida</span>
                <p className="text-3xl font-bold text-[#b88686]">Gs. {policies.deposit}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#777]">Bloqueos Activos</span>
                <p className="text-3xl font-bold text-[#4a3b32]">{blockedSlots.length}</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6dfd5] space-y-6">
              <h3 className="text-xl font-serif text-[#4a3b32]">Listado de Citas en Tiempo Real</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#6b5b52]">
                  <thead className="bg-[#faf8f5] uppercase tracking-wider text-[10px] text-[#4a3b32] border-b">
                    <tr>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Teléfono</th>
                      <th className="p-3">Servicio</th>
                      <th className="p-3">Fecha y Hora</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ebe3]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#faf8f5]">
                        <td className="p-3 font-medium text-[#4a3b32]">{b.client_name}</td>
                        <td className="p-3">{b.client_phone}</td>
                        <td className="p-3 text-[#b88686]">{b.selected_services?.join(', ')}</td>
                        <td className="p-3">{b.client_date} - {b.client_time} HS</td>
                        <td className="p-3 font-semibold">{b.status}</td>
                        <td className="p-3 space-x-2">
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as Booking['status'])}
                            className="bg-[#faf8f5] border rounded p-1 text-[10px]"
                          >
                            <option value="Confirmado">Confirmado</option>
                            <option value="Completado">Completado</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                          <button onClick={() => deleteBooking(b.id)} className="text-rose-600 hover:underline">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-4">
                <h3 className="text-lg font-serif text-[#4a3b32]">Cargar Cita Manual</h3>
                <form onSubmit={handleManualBooking} className="space-y-3 text-xs">
                  <input
                    type="text"
                    placeholder="Nombre"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="w-full bg-[#faf8f5] border rounded-xl p-2.5"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border rounded-xl p-2.5"
                  />
                  <input
                    type="date"
                    required
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full bg-[#faf8f5] border rounded-xl p-2.5"
                  />
                  <button type="submit" className="w-full bg-[#4a3b32] text-white py-2.5 rounded-xl font-medium">Guardar Cita</button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-4">
                <h3 className="text-lg font-serif text-[#4a3b32]">Bloquear Horarios</h3>
                <form onSubmit={handleBlockSlot} className="space-y-3 text-xs">
                  <input
                    type="date"
                    required
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full bg-[#faf8f5] border rounded-xl p-2.5"
                  />
                  <button type="submit" className="w-full bg-rose-700 text-white py-2.5 rounded-xl font-medium">Bloquear</button>
                </form>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {blockedSlots.map(slot => (
                    <div key={slot} className="flex justify-between items-center text-[11px] bg-[#faf8f5] p-1.5 rounded">
                      <span>{slot.replace('_', ' - ')} HS</span>
                      <button onClick={() => unblockSlot(slot)} className="text-rose-600 font-semibold">Desbloquear</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] space-y-4">
              <h3 className="text-xl font-serif text-[#4a3b32]">Políticas en la Nube</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <input
                  type="text"
                  value={policies.deposit}
                  onChange={(e) => updatePoliciesInDb({ ...policies, deposit: e.target.value })}
                  className="bg-[#faf8f5] border rounded-xl p-2.5"
                />
                <input
                  type="text"
                  value={policies.noticeHours}
                  onChange={(e) => updatePoliciesInDb({ ...policies, noticeHours: e.target.value })}
                  className="bg-[#faf8f5] border rounded-xl p-2.5"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}