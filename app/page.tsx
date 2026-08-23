'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SERVICES = [
  { id: 'limpieza', name: 'Limpieza Facial Profunda', price: 150000, duration: '60 min' },
  { id: 'lifting', name: 'Lifting de Pestanas', price: 120000, duration: '45 min' },
  { id: 'cejas', name: 'Diseño y Laminado de Cejas', price: 100000, duration: '45 min' },
  { id: 'masaje', name: 'Masaje Relajante Facial', price: 130000, duration: '50 min' }
]

const BODY_ZONES = [
  'Rostro',
  'Cejas / Pestañas',
  'Cuello y Escote',
  'Abdomen',
  'Glúteos',
  'Piernas'
]

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function Page() {
  const [selectedService, setSelectedService] = useState(SERVICES[0])
  const [selectedBodyZone, setSelectedBodyZone] = useState(BODY_ZONES[0])
  const [selectedDate, setSelectedDate] = useState('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Consultar horarios ocupados en Supabase cuando cambia la fecha
  useEffect(() => {
    if (!selectedDate) return
    
    async function fetchBookings() {
      const { data, error } = await supabase
        .from('appointments')
        .select('time_slot')
        .eq('date', selectedDate)

      if (!error && data) {
        setBookedTimes(data.map((item: any) => item.time_slot))
      } else {
        setBookedTimes([])
      }
    }

    fetchBookings()
  }, [selectedDate])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !clientName || !clientPhone) {
      setErrorMsg('Por favor completa todos los campos obligatorios.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          service_name: selectedService.name,
          body_zone: selectedBodyZone,
          date: selectedDate,
          time_slot: selectedTime,
          client_name: clientName,
          client_phone: clientPhone,
          status: 'confirmed'
        }
      ])

      if (error) throw error

      setSuccessMsg('¡Cita reservada con éxito! Te esperamos en Cami Isla Studio.')
      setClientName('')
      setClientPhone('')
      setSelectedTime('')
      
      // Recargar horarios ocupados
      setBookedTimes((prev) => [...prev, selectedTime])
    } catch (err: any) {
      setErrorMsg('Error al registrar la cita. Verifica que la columna "body_zone" exista en Supabase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-pink-400">Cami Isla Studio</h1>
          <p className="text-neutral-400">Sistema de reservas en línea para tratamientos estéticos</p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-900/50 border border-emerald-500 text-emerald-200 rounded-xl text-center font-medium">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-900/50 border border-rose-500 text-rose-200 rounded-xl text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-8 bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl">
          
          {/* 1. Seleccionar Servicio */}
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-3">1. Selecciona tu Tratamiento</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedService.id === s.id
                      ? 'border-pink-500 bg-pink-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <p className="font-semibold text-neutral-100">{s.name}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-pink-400 font-bold">₲ {s.price.toLocaleString()}</span>
                    <span className="text-neutral-500">{s.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Zona del Cuerpo a Tratar */}
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-3">2. Zona a Tratar</label>
            <select
              value={selectedBodyZone}
              onChange={(e) => setSelectedBodyZone(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-pink-500"
            >
              {BODY_ZONES.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          {/* 3. Fecha y Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-3">3. Fecha de la Cita</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-3">4. Horarios Disponibles</label>
              {!selectedDate ? (
                <p className="text-sm text-neutral-500 italic py-3">Primero selecciona una fecha en el calendario.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const isBooked = bookedTimes.includes(time)
                    const isSelected = selectedTime === time

                    return (
                      <button
                        type="button"
                        key={time}
                        disabled={isBooked}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 text-sm rounded-lg font-medium transition-all ${
                          isBooked
                            ? 'bg-neutral-800/40 text-neutral-600 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                            : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-pink-500'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 5. Datos Personales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-2">Tu Nombre y Apellido</label>
              <input
                type="text"
                placeholder="Ej: María Gómez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-2">Teléfono / WhatsApp</label>
              <input
                type="tel"
                placeholder="Ej: 0981 123 456"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Botón de Confirmación */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-600/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Procesando Reserva...' : 'Confirmar y Agendar Cita'}
          </button>

        </form>

        {/* Botón Independiente de WhatsApp */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/595981123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-emerald-500 text-neutral-300 hover:text-emerald-400 font-semibold rounded-xl transition-all shadow-md text-sm"
          >
            💬 ¿Tienes dudas? Escríbenos por WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}