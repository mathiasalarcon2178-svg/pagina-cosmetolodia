'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SERVICES = [
  {
    id: 'camuflaje_estrias',
    name: 'Camuflaje de Estrías',
    duration: '90 min',
    image: '', // Dejado vacío a propósito para activar el contenedor estético garantizado
    description: 'Técnica especializada para unificar el tono de la piel y disimular estrías de forma permanente.',
    benefits: ['Resultados naturales y duraderos', 'Estimula la producción de colágeno local', 'Técnica segura y con pigmentos hipoalergénicos'],
    gallery: [
      'https://images.unsplash.com/photo-1512290900722-9a7f9b8c4618?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Pigmentación milimétrica para integrar cicatrices al tono natural de tu piel.',
    benefits: ['Disimula marcas quirúrgicas o accidentales', 'Acabado estético sumamente natural', 'Procedimiento ambulatorio'],
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
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
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Eliminación indolora de pequeños fibromas blandos en cuello, axilas u otras zonas.',
    benefits: ['Resultados inmediatos', 'Sin tiempo de recuperación prolongado', 'Piel limpia y sin imperfecciones'],
    gallery: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
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

      if (error) {
        throw new Error(error.message)
      }

      setSuccessMsg('¡Cita reservada con éxito! Te esperamos en Cami Isla Studio.')
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
            Descubre nuestros tratamientos especializados, conoce sus beneficios en detalle y agenda tu cita en línea.
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

        {/* 1. Selección de Servicios con Fotos e Información */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-800">1. Selecciona tu Tratamiento</h2>
            <span className="text-xs text-neutral-500 font-medium">Haz clic para ver beneficios y fotos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => {
              const isSelected = selectedService.id === s.id
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                    isSelected
                      ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-neutral-100 flex items-center justify-center">
                    {s.image ? (
                      <img 
                        src={s.image} 
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="text-center p-4 space-y-1">
                        <span className="text-3xl">✨</span>
                        <p className="text-xs font-bold uppercase tracking-widest text-pink-600">Cami Isla Studio</p>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 shadow-sm z-10">
                      {s.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-neutral-900 group-hover:text-pink-600 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {s.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                        {isSelected ? '✓ Servicio Seleccionado' : 'Ver detalles y agendar →'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detalle del Servicio Seleccionado */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">Información Detallada</span>
            <h3 className="text-2xl font-bold text-neutral-900 mt-1">{selectedService.name}</h3>
            <p className="text-neutral-600 text-sm mt-2">{selectedService.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-900 text-sm mb-3 uppercase tracking-wide">Beneficios Principales</h4>
              <ul className="space-y-2">
                {selectedService.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 text-sm mb-3 uppercase tracking-wide">Galería del Procedimiento</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedService.gallery.map((imgUrl, index) => (
                  <div key={index} className="h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src={imgUrl} alt="Procedimiento" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Formulario de Reserva */}
        <form onSubmit={handleBooking} className="space-y-8 bg-white border border-neutral-200 p-6 sm:p-10 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-4">
            2. Completa los Datos de tu Cita para: <span className="text-pink-600">{selectedService.name}</span>
          </h3>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">Zona del Cuerpo a Tratar</label>
            <div className="relative">
              <select
                value={selectedBodyZone}
                onChange={(e) => setSelectedBodyZone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl p-4 text-neutral-900 focus:outline-none focus:border-pink-500 focus:bg-white appearance-none cursor-pointer"
              >
                {BODY_ZONES.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </div>

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
            {loading ? 'Procesando Reserva...' : 'Confirmar y Agendar Cita'}
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