'test client'
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Appointment {
  id: number | string
  client_name: string
  client_phone: string
  service_name: string
  body_zone: string
  date: string
  time_slot: string
  status: 'confirmed' | 'pending'
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorLogin, setErrorLogin] = useState('')

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all')

  // Credenciales de acceso (puedes cambiarlas aquí cuando gustes)
  const ADMIN_USER = 'admin'
  const ADMIN_PASSWORD = 'cami123'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setErrorLogin('')
      fetchAppointments()
    } else {
      setErrorLogin('Usuario o contraseña incorrectos')
    }
  }

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error al cargar citas:', error.message)
      } else if (data) {
        setAppointments(data)
      }
    } catch (err) {
      console.error('Error inesperado:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id: number | string, currentStatus: 'confirmed' | 'pending') => {
    const newStatus = currentStatus === 'confirmed' ? 'pending' : 'confirmed'
    
    // Actualización optimista en pantalla
    setAppointments(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    )

    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) {
        console.error('Error al actualizar estado:', error.message)
        // Revertir si falla
        fetchAppointments()
      }
    } catch (err) {
      console.error('Error:', err)
      fetchAppointments()
    }
  }

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'pending') return app.status === 'pending'
    if (filter === 'confirmed') return app.status === 'confirmed'
    return true
  })

  // Pantalla de Inicio de Sesión
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-pink-600 font-bold">Panel Privado</span>
            <h1 className="text-2xl font-light tracking-tight text-neutral-900">
              Cami Isla <span className="font-semibold text-pink-600">Admin</span>
            </h1>
            <p className="text-sm text-neutral-500">Ingresa tus credenciales para gestionar las citas.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-bold">Usuario</label>
              <input
                type="text"
                placeholder="Ej. admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-bold">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            {errorLogin && (
              <p className="text-xs text-rose-600 font-medium text-center">{errorLogin}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-600/20 transition-all text-sm mt-2"
            >
              Entrar al Panel
            </button>
          </form>
        </div>
      </main>
    )
  }

  // Panel de Administración (Listado de Citas)
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabecera del panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-pink-600 font-bold">Gestión de Reservas</span>
            <h1 className="text-2xl sm:text-3xl font-light text-neutral-900">
              Panel de <span className="font-semibold text-pink-600">Citas</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-all"
            >
              🔄 Actualizar Lista
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                setUsername('')
                setPassword('')
              }}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Filtros de estado */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            Todas ({appointments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filter === 'pending'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            ⏳ Pendientes ({appointments.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filter === 'confirmed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            🟢 Confirmadas ({appointments.filter(a => a.status === 'confirmed').length})
          </button>
        </div>

        {/* Listado / Tabla de citas */}
        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-sm text-neutral-500">Cargando citas...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-sm text-neutral-500">No hay citas registradas con este filtro.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
                    <th className="p-4 sm:p-6">Cliente</th>
                    <th className="p-4 sm:p-6">Tratamiento / Zona</th>
                    <th className="p-4 sm:p-6">Fecha y Hora</th>
                    <th className="p-4 sm:p-6">Estado</th>
                    <th className="p-4 sm:p-6 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {filteredAppointments.map(app => (
                    <tr key={app.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-6">
                        <div className="font-bold text-neutral-900">{app.client_name}</div>
                        <a
                          href={`https://wa.me/595${app.client_phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:underline font-medium"
                        >
                          📱 {app.client_phone}
                        </a>
                      </td>
                      <td className="p-4 sm:p-6 space-y-1">
                        <div className="font-semibold text-neutral-800">{app.service_name}</div>
                        <div className="text-xs text-neutral-500">Zona: {app.body_zone}</div>
                      </td>
                      <td className="p-4 sm:p-6">
                        <div className="font-medium text-neutral-900">{app.date}</div>
                        <div className="text-xs text-pink-600 font-bold">{app.time_slot} hs</div>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {app.status === 'confirmed' ? '🟢 Confirmada' : '⏳ Pendiente'}
                        </span>
                      </td>
                      <td className="p-4 sm:p-6 text-right">
                        <button
                          onClick={() => toggleStatus(app.id, app.status)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            app.status === 'confirmed'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {app.status === 'confirmed' ? 'Pasar a Pendiente' : 'Confirmar Cita ✓'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}