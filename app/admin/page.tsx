'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  // Estado simulado para las citas y estadísticas del estudio
  const [appointments, setAppointments] = useState([
    { id: 1, client: 'María Gómez', service: 'Camuflaje de Estrías', date: '2026-08-28', time: '10:00', status: 'Confirmada (Seña Abonada)' },
    { id: 2, client: 'Ana Benítez', service: 'Eliminación de Lunares', date: '2026-08-28', time: '11:30', status: 'Pendiente de Seña' },
    { id: 3, client: 'Lorena Martínez', service: 'Regeneración de Estrías', date: '2026-08-29', time: '15:00', status: 'Confirmada (Seña Abonada)' },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2c2c] font-sans">
      {/* TOPBAR ADMINISTRATIVO */}
      <header className="bg-white border-b border-[#e6dfd5] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-[#4a3b32]">Cami Isla Studio — Panel Administrativo</h1>
            <p className="text-xs text-[#777]">Gestión de turnos, precios y reservas</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-[#6b5b52] bg-[#f4ece1] px-3 py-1.5 rounded-full">
              👩‍⚕️ Admin: Cami Isla
            </span>
            <a
              href="/"
              className="text-xs text-[#b88686] hover:underline font-medium"
            >
              Ver Sitio Web →
            </a>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#777] font-semibold">Citas para Hoy</p>
            <p className="text-3xl font-bold text-[#4a3b32]">2</p>
            <p className="text-xs text-[#888]">Overava 674, Asunción</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#777] font-semibold">Citas de la Semana</p>
            <p className="text-3xl font-bold text-[#4a3b32]">12</p>
            <p className="text-xs text-[#b88686] font-medium">↑ Alta demanda en camuflaje</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#777] font-semibold">Ingresos Estimados (Mes)</p>
            <p className="text-3xl font-bold text-[#b88686]">4.500.000 Gs</p>
            <p className="text-xs text-[#888]">Basado en paquetes activos</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#777] font-semibold">Servicio Top</p>
            <p className="text-lg font-bold text-[#4a3b32] truncate">Camuflaje de Estrías</p>
            <p className="text-xs text-[#888]">65% de las solicitudes</p>
          </div>
        </div>

        {/* SECCIÓN DE GESTIÓN DE CITAS */}
        <div className="bg-white rounded-2xl border border-[#e6dfd5] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#e6dfd5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-serif text-[#4a3b32]">Control de Reservas y Turnos</h2>
              <p className="text-xs text-[#777]">Verifica el estado de las señas (50.000 Gs) y próximas atenciones.</p>
            </div>
            <button
              onClick={() => alert('Función para agregar cita manual o bloquear horario.')}
              className="bg-[#4a3b32] hover:bg-[#352a23] text-white px-4 py-2 rounded-xl text-xs font-medium transition-all"
            >
              + Nuevo Turno Manual
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] text-xs uppercase tracking-wider text-[#777] border-b border-[#e6dfd5]">
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Servicio</th>
                  <th className="p-4 font-semibold">Fecha y Hora</th>
                  <th className="p-4 font-semibold">Estado / Seña</th>
                  <th className="p-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebe3] text-sm text-[#555]">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-[#faf8f5]/50 transition-colors">
                    <td className="p-4 font-medium text-[#4a3b32]">{app.client}</td>
                    <td className="p-4">{app.service}</td>
                    <td className="p-4">{app.date} — {app.time} hs</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        app.status.includes('Confirmada') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleStatusChange(app.id, 'Confirmada (Seña Abonada)')}
                        className="text-xs bg-[#e8ded1] hover:bg-[#d4c3b3] text-[#4a3b32] px-3 py-1.5 rounded-lg transition-all"
                      >
                        Aprobar Seña
                      </button>
                      <button
                        onClick={() => {
                          setAppointments(appointments.filter(item => item.id !== app.id));
                        }}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-all"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GESTIÓN RÁPIDA DE PRECIOS Y PARÁMETROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4">
            <h3 className="text-lg font-serif text-[#4a3b32]">Tarifario Actual</h3>
            <ul className="space-y-3 text-sm text-[#6b5b52]">
              <li className="flex justify-between items-center pb-2 border-b border-[#f0ebe3]">
                <span>1 Sesión (Camuflaje / Regeneración)</span>
                <span className="font-bold text-[#b88686]">350.000 Gs</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-[#f0ebe3]">
                <span>2 Sesiones</span>
                <span className="font-bold text-[#b88686]">500.000 Gs</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-[#f0ebe3]">
                <span>3 Sesiones</span>
                <span className="font-bold text-[#b88686]">850.000 Gs</span>
              </li>
            </ul>
            <button
              onClick={() => alert('Próximamente editor de precios en vivo.')}
              className="w-full bg-[#f4ece1] hover:bg-[#e8ded1] text-[#4a3b32] py-2 rounded-xl text-xs font-medium transition-all"
            >
              Modificar Precios
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm space-y-4">
            <h3 className="text-lg font-serif text-[#4a3b32]">Configuración de Reservas</h3>
            <div className="space-y-3 text-sm text-[#6b5b52]">
              <p>🔒 <strong>Monto de Seña Requerido:</strong> 50.000 Gs (No reembolsable)</p>
              <p>⏱️ <strong>Tolerancia de Espera:</strong> 15 minutos</p>
              <p>📍 <strong>Dirección Registrada:</strong> Overava 674, Barrio Salvador del Mundo, Asunción</p>
            </div>
            <button
              onClick={() => alert('Políticas actualizadas correctamente.')}
              className="w-full bg-[#f4ece1] hover:bg-[#e8ded1] text-[#4a3b32] py-2 rounded-xl text-xs font-medium transition-all"
            >
              Actualizar Políticas
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}