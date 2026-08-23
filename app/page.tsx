'app/client'
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SERVICES = [
  { id: 'camuflaje_estrias', name: 'Camuflaje de Estrías', duration: '90 min', description: 'Técnica especializada para unificar el tono de la piel.' },
  { id: 'regeneracion_estrias', name: 'Regeneración de Estrías', duration: '60 min', description: 'Estimulación de colágeno para mejorar la textura.' },
  { id: 'camuflaje_cicatrices', name: 'Camuflaje de Cicatrices', duration: '90 min', description: 'Pigmentación precisa para disimular marcas.' },
  { id: 'regeneracion_cicatrices', name: 'Regeneración de Cicatrices', duration: '60 min', description: 'Tratamiento profundo para suavizar el tejido.' },
  { id: 'verrugas', name: 'Eliminación de Verrugas', duration: '30 min', description: 'Procedimiento seguro y rápido.' },
  { id: 'lunares', name: 'Eliminación de Lunares', duration: '30 min', description: 'Valoración previa y extracción estética.' },
  { id: 'acrocordones', name: 'Eliminación de Acrocordones', duration: '30 min', description: 'Remoción limpia de fibromas blandos.' }
]

const BODY_ZONES = [
  'Rostro',
  'Cuello y Escote',
  'Abdomen',
  'Glúteos',
  'Piernas',
  'Espalda'
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
      setBookedTimes((prev) => [...prev, selectedTime])
    } catch (err: any) {
      setErrorMsg('Error al registrar la cita en la base de datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-pink-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Cabecera minimalista y elegante */}
        <div className="text-center space-y-3 border-b border-neutral-800/80 pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-pink-400 font-semibold">Estética Avanzada</span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
            Cami Isla <span className="font-normal text-pink-400">Studio</span>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm sm:text-base">
            Selecciona tu tratamiento especializado, elige el horario de tu preferencia y agenda tu cita en línea de forma rápida y sencilla.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 rounded-2xl text-center text-sm font-medium shadow-lg animate-fade-in">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-950/60 border border-rose-600/50 text-rose-300 rounded-2xl text-center text-sm font-medium shadow-lg animate-fade-in">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-10 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl">
          
          {/* 1. Selección de Tratamientos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-pink-400">1. Tratamiento Especializado</label>
              <span className="text-xs text-neutral-500">Selecciona uno</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-pink-500 bg-gradient-to-br from-pink-500/10 to-transparent shadow-lg shadow-pink-500/5'
                        : 'border-neutral-800/80 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-950/80'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-medium text-base ${isSelected ? 'text-pink-300' : 'text-white'}`}>
                          {s.name}
                        </h3>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono shrink-0">
                          {s.duration}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 2. Zona a Tratar */}
          <div className="space-y-3 pt-4 border-t border-neutral-800/60">
            <label className="text-sm font-medium uppercase tracking-wider text-pink-400">2. Zona del Cuerpo a Tratar</label>
            <div className="relative">
              <select
                value={selectedBodyZone}
                onChange={(e) => setSelectedBodyZone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-neutral-100 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer transition-colors"
              >
                {BODY_ZONES.map((zone) => (
                  <option key={zone} value={zone} className="bg-neutral-900 text-neutral-100">{zone}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Fecha y Horarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-neutral-800/60">
            <div className="space-y-3">
              <label className="text-sm font-medium uppercase tracking-wider text-pink-400">3. Fecha de la Cita</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-neutral-100 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium uppercase tracking-wider text-pink-400">4. Horarios Disponibles</label>
              {!selectedDate ? (
                <div className="h-[58px] flex items-center px-4 bg-neutral-950/40 border border-neutral-800/60 rounded-2xl text-sm text-neutral-500 italic">
                  Selecciona una fecha primero
                </div>
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
                        className={`py-3 text-xs sm:text-sm rounded-xl font-medium transition-all ${
                          isBooked
                            ? 'bg-neutral-900/40 text-neutral-600 line-through cursor-not-allowed border border-neutral-800/30'
                            : isSelected
                            ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25 border border-pink-500'
                            : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-pink-500/60'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-800/60">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Nombre y Apellido</label>
              <input
                type="text"
                placeholder="Ej. Camila Gómez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-neutral-100 focus:outline-none focus:border-pink-500 transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Teléfono / WhatsApp</label>
              <input
                type="tel"
                placeholder="Ej. 0981 123 456"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-neutral-100 focus:outline-none focus:border-pink-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Botón de Confirmación */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-600/20 transition-all duration-300 disabled:opacity-50 tracking-wide text-sm sm:text-base cursor-pointer"
          >
            {loading ? 'Procesando Reserva...' : 'Confirmar y Agendar Cita'}
          </button>

        </form>

        {/* Enlace de WhatsApp discreto */}
        <div className="text-center pb-6">
          <a
            href="https://wa.me/595981123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-emerald-400 text-sm font-medium transition-colors py-2 px-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60"
          >
            <span>💬</span> ¿Tienes consultas generales? Escríbenos por WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}