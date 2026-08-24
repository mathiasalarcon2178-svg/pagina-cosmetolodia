'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SERVICES = [
  {
    id: 'camuflaje_estrias',
    name: 'Camuflaje de Estrías',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    description: 'Técnica especializada para unificar el tono de la piel y disimular estrías de forma permanente.',
    benefits: ['Resultados naturales y duraderos', 'Estimula la producción de colágeno local', 'Técnica segura y con pigmentos hipoalergénicos'],
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'regeneracion_estrias',
    name: 'Regeneración de Estrías',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Tratamiento enfocado en mejorar la textura y profundidad de la piel afectada por estrías.',
    benefits: ['Mejora notablemente la textura de la piel', 'Favorece la elasticidad natural', 'Compatible con cualquier tipo de piel'],
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'camuflaje_cicatrices',
    name: 'Camuflaje de Cicatrices',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Pigmentación milimétrica para integrar cicatrices al tono natural de tu piel.',
    benefits: ['Disimula marcas quirúrgicas o accidentales', 'Acabado estético sumamente natural', 'Procedimiento ambulatorio'],
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'regeneracion_cicatrices',
    name: 'Regeneración de Cicatrices',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Protocolo de estimulación profunda para suavizar el relieve y rigidez de las cicatrices.',
    benefits: ['Suaviza cicatrices hipertróficas', 'Aumenta la flexibilidad de los tejidos', 'Promueve la sanación estética'],
    gallery: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'verrugas',
    name: 'Eliminación de Verrugas',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Remoción segura y limpia de verrugas bajo estrictos estándares de bioseguridad.',
    benefits: ['Procedimiento rápido y controlado', 'Mínimas molestias', 'Cuidado estético de la zona tratada'],
    gallery: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'lunares',
    name: 'Eliminación de Lunares',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'Evaluación y extracción estética de lunares benignos con excelente resultado visual.',
    benefits: ['Evaluación profesional previa', 'Técnica limpia sin marcas notorias', 'Recuperación rápida'],
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'acrocordones',
    name: 'Eliminación de Acrocordones',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Eliminación indolora de pequeños fibromas blandos en cuello, axilas u otras zonas.',
    benefits: ['Resultados inmediatos', 'Sin tiempo de recuperación prolongado', 'Piel limpia y sin imperfecciones'],
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
    ]
  }
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
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES[0].name])
  const [selectedBodyZones, setSelectedBodyZones] = useState<string[]>([BODY_ZONES[0]])
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
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('time_slot')
          .eq('date', selectedDate)

        if (error) {
          console.error('Error de Supabase al buscar citas:', error.message)
          setBookedTimes([])
          return
        }

        if (data) {
          setBookedTimes(data.map((item: any) => item.time_slot))
        }
      } catch (err) {
        console.error('Error inesperado:', err)
        setBookedTimes([])
      }
    }

    fetchBookings()
  }, [selectedDate])

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    )
  }

  const toggleBodyZone = (zone: string) => {
    setSelectedBodyZones(prev => 
      prev.includes(zone) 
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    )
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedServices.length === 0 || selectedBodyZones.length === 0 || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      setErrorMsg('Por favor selecciona al menos un servicio, una zona, y completa todos los campos.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          service_name: selectedServices.join(', '),
          body_zone: selectedBodyZones.join(', '),
          date: selectedDate,
          time_slot: selectedTime,
          client_name: clientName,
          client_phone: clientPhone,
          status: 'confirmed'
        }
      ])

      if (error) {
        throw new Error(error.message)
      }

      setSuccessMsg('¡Cita múltiple reservada con éxito! Te esperamos en Cami Isla Studio.')
      setClientName('')
      setClientPhone('')
      setSelectedTime('')
      setBookedTimes((prev) => [...prev, selectedTime])
    } catch (err: any) {
      console.error('Error al insertar:', err)
      setErrorMsg(`Error al guardar en Supabase: ${err.message || 'Verifica la estructura de tu tabla'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Cabecera */}
        <div className="text-center space-y-3 border-b border-neutral-200 pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-pink-600 font-bold">Estética Avanzada</span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900">
            Cami Isla <span className="font-semibold text-pink-600">Studio</span>
          </h1>
          <p className="text-neutral-600 max-w-lg mx-auto text-sm sm:text-base">
            Selecciona uno o varios tratamientos, marca tus zonas de interés y agenda tu cita en línea.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-center text-sm font-medium shadow-md">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl text-center text-sm font-medium shadow-md">
            {errorMsg}
          </div>
        )}

        {/* 1. Selección Múltiple de Servicios */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-800">1. Selecciona tus Tratamientos (Múltiples)</h2>
            <span className="text-xs text-pink-600 font-bold">Seleccionados: {selectedServices.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => {
              const isSelected = selectedServices.includes(s.name)
              return (
                <div
                  key={s.id}
                  onClick={() => toggleService(s.name)}
                  className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                    isSelected
                      ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                    <img 
                      src={s.image} 
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 shadow-sm z-10">
                      {s.duration}
                    </div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-600 shadow-sm z-10">
                      {isSelected ? '✓ Seleccionado' : '+ Agregar'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-neutral-900 group-hover:text-pink-600 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 2. Selección Múltiple de Zonas del Cuerpo */}
        <div className="space-y-6 bg-white border border-neutral-200 p-6 sm:p-10 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-800">2. Zonas del Cuerpo a Tratar (Múltiples)</h2>
            <span className="text-xs text-pink-600 font-bold">Seleccionadas: {selectedBodyZones.length}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BODY_ZONES.map((zone) => {
              const isSelected = selectedBodyZones.includes(zone)
              return (
                <button
                  type="button"
                  key={zone}
                  onClick={() => toggleBodyZone(zone)}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50 text-pink-900 ring-1 ring-pink-500/20'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <span>{zone}</span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isSelected ? 'bg-pink-600 text-white' : 'border border-neutral-300 text-transparent'}`}>✓</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Formulario de Reserva y Horarios */}
        <form onSubmit={handleBooking} className="space-y-8 bg-white border border-neutral-200 p-6 sm:p-10 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-4">
            3. Fecha, Horario y Datos de Contacto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">Fecha de la Cita</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 focus:bg-white"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">Horarios Disponibles</label>
              {!selectedDate ? (
                <div className="h-[58px] flex items-center px-4 bg-neutral-50 border border-neutral-300 rounded-2xl text-sm text-neutral-500 italic">
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
                        className={`py-3 text-xs sm:text-sm rounded-xl font-semibold transition-all ${
                          isBooked
                            ? 'bg-neutral-100 text-neutral-400 line-through cursor-not-allowed border border-neutral-200'
                            : isSelected
                            ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30 border border-pink-600'
                            : 'bg-neutral-50 border border-neutral-300 text-neutral-700 hover:border-pink-500 hover:bg-white'
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-bold">Tu Nombre y Apellido</label>
              <input
                type="text"
                placeholder="Ej. María Gómez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-bold">Teléfono / WhatsApp</label>
              <input
                type="tel"
                placeholder="Ej. 0981 123 456"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-600/20 transition-all duration-300 disabled:opacity-50 text-base"
          >
            {loading ? 'Procesando Reserva...' : 'Confirmar y Agendar Cita Múltiple'}
          </button>
        </form>

        <div className="text-center pb-6">
          <a
            href="https://wa.me/595981123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-700 hover:text-emerald-600 text-sm font-semibold transition-colors py-3 px-6 rounded-2xl bg-white border border-neutral-200 shadow-sm"
          >
            <span>💬</span> ¿Tienes dudas o necesitas atención personalizada? Escríbenos por WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}