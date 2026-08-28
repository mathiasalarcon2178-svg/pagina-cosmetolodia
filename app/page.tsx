'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SERVICES = [
  {
    id: 'camuflaje_estrias',
    name: 'Camuflaje de Estrías',
    category: 'ESTÉTICA CORPORAL',
    description: 'Procedimiento estético que busca disimular visualmente las estrías aplicando pigmentos seleccionados según el tono de piel.',
    zonesText: 'Abdomen, piernas, glúteos, caderas, busto'
  },
  {
    id: 'camuflaje_cicatrices',
    name: 'Camuflaje de Cicatrices',
    category: 'ESTÉTICA CORPORAL',
    description: 'Técnica especializada para neutralizar y difuminar visualmente la diferencia de color en cicatrices.',
    zonesText: 'Abdomen, piernas, glúteos, caderas, rostro, brazos, espalda'
  },
  {
    id: 'regeneracion_estrias',
    name: 'Regeneración de Estrías',
    category: 'BIOESTIMULACIÓN',
    description: 'Tratamiento orientado a mejorar la textura y profundidad de las estrías mediante la regeneración de la piel.',
    zonesText: 'Abdomen, piernas, glúteos, caderas, busto'
  },
  {
    id: 'regeneracion_cicatrices',
    name: 'Regeneración de Cicatrices',
    category: 'BIOESTIMULACIÓN',
    description: 'Técnica avanzada para mejorar la textura, relieve y aspecto general de las cicatrices.',
    zonesText: 'Rostro, cuerpo, espalda, extremidades'
  },
  {
    id: 'eliminacion_lunares',
    name: 'Eliminación de Lunares',
    category: 'ELECTROCAUTERIO / PLASMA',
    description: 'Remoción estética precisa de lunares benignos mediante tecnología de calor controlado y anestesia tópica.',
    zonesText: 'Cuello y escote, rostro, zona íntima, manos/pies, espalda, cabeza, piernas'
  },
  {
    id: 'eliminacion_verrugas',
    name: 'Eliminación de Verrugas',
    category: 'ELECTROCAUTERIO / PLASMA',
    description: 'Eliminación segura y estética de verrugas cutáneas por zonas corporales.',
    zonesText: 'Cuello y escote, rostro, zona íntima, manos/pies, espalda, cabeza, piernas'
  },
  {
    id: 'eliminacion_acrocordones',
    name: 'Eliminación de Acrocordones',
    category: 'ELECTROCAUTERIO / PLASMA',
    description: 'Extracción rápida y limpia de pequeños fibromas blandos o acrocordones.',
    zonesText: 'Cuello y escote, rostro, zona íntima, manos/pies, espalda, cabeza, piernas'
  }
]

const PRICING_DATA: Record<string, { type: 'sessions' | 'zones', options: Record<string, number> }> = {
  'Camuflaje de Estrías': {
    type: 'sessions',
    options: { '1 Sesión': 350000, '2 Sesiones': 500000, '3 Sesiones': 850000 }
  },
  'Camuflaje de Cicatrices': {
    type: 'sessions',
    options: { '1 Sesión': 350000, '2 Sesiones': 500000, '3 Sesiones': 850000 }
  },
  'Regeneración de Estrías': {
    type: 'sessions',
    options: { '1 Sesión': 350000, '2 Sesiones': 500000, '3 Sesiones': 850000 }
  },
  'Regeneración de Cicatrices': {
    type: 'sessions',
    options: { '1 Sesión': 350000, '2 Sesiones': 500000, '3 Sesiones': 850000 }
  },
  'Eliminación de Lunares': {
    type: 'zones',
    options: {
      'Cuello y escote': 200000,
      'Rostro': 250000,
      'Zona íntima (pelvis e ingle)': 350000,
      'Manos o pies': 150000,
      'Espalda': 250000,
      'Cabeza': 200000,
      'Piernas': 150000
    }
  },
  'Eliminación de Verrugas': {
    type: 'zones',
    options: {
      'Cuello y escote': 200000,
      'Rostro': 250000,
      'Zona íntima (pelvis e ingle)': 350000,
      'Manos o pies': 150000,
      'Espalda': 250000,
      'Cabeza': 200000,
      'Piernas': 150000
    }
  },
  'Eliminación de Acrocordones': {
    type: 'zones',
    options: {
      'Cuello y escote': 200000,
      'Rostro': 250000,
      'Zona íntima (pelvis e ingle)': 350000,
      'Manos o pies': 150000,
      'Espalda': 250000,
      'Cabeza': 200000,
      'Piernas': 150000
    }
  }
}

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function Page() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].name)
  const [selectedOption, setSelectedOption] = useState<string>('1 Sesión')

  const [selectedDate, setSelectedDate] = useState('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  
  const [cotizadorService, setCotizadorService] = useState(SERVICES[0].name)
  const [cotizadorOption, setCotizadorOption] = useState('1 Sesión')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false)

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const optionKeys = Object.keys(PRICING_DATA[selectedService]?.options || {})
    if (optionKeys.length > 0) {
      setSelectedOption(optionKeys[0])
    }
  }, [selectedService])

  useEffect(() => {
    const optionKeys = Object.keys(PRICING_DATA[cotizadorService]?.options || {})
    if (optionKeys.length > 0) {
      setCotizadorOption(optionKeys[0])
    }
  }, [cotizadorService])

  useEffect(() => {
    if (!selectedDate) return
    
    async function fetchBookings() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('time_slot')
          .eq('date', selectedDate)

        if (error) {
          setBookedTimes([])
          return
        }

        if (data) {
          setBookedTimes(data.map((item: any) => item.time_slot))
        }
      } catch (err) {
        setBookedTimes([])
      }
    }

    fetchBookings()
  }, [selectedDate])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !selectedOption || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      setErrorMsg('Por favor completa todos los campos obligatorios para agendar tu turno.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const payload = {
        service_name: selectedService,
        body_zone: selectedOption,
        date: selectedDate,
        time_slot: selectedTime,
        client_name: clientName,
        client_phone: clientPhone,
        status: 'confirmed'
      }

      const { error } = await supabase.from('appointments').insert([payload])

      if (error) {
        throw new Error(error.message)
      }

      setSuccessMsg('¡Cita agendada con éxito! Ya se encuentra registrada en el sistema. Recuerda abonar la seña de 50.000 Gs para confirmar.')
      setClientName('')
      setClientPhone('')
      setSelectedTime('')
      setBookedTimes((prev) => [...prev, selectedTime])
    } catch (err: any) {
      setErrorMsg(`Error al guardar en Supabase: ${err.message || 'Verifica la conexión'}`)
    } finally {
      setLoading(false)
    }
  }

  const currentPriceCotizador = PRICING_DATA[cotizadorService]?.options[cotizadorOption] || 0
  const isCotizadorByZone = PRICING_DATA[cotizadorService]?.type === 'zones'

  const currentPriceAgendador = PRICING_DATA[selectedService]?.options[selectedOption] || 0
  const isAgendadorByZone = PRICING_DATA[selectedService]?.type === 'zones'

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#3F3A36] selection:bg-[#D4B59E]/30 font-sans">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EFECE6]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-serif tracking-wide text-[#3F3A36]">
            Cami Isla Studio
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-[#6B635B]">
            <a href="#inicio" className="hover:text-[#3F3A36] transition-colors">Inicio</a>
            <a href="#sobre-mi" className="hover:text-[#3F3A36] transition-colors">Sobre Mí</a>
            <a href="#servicios" className="hover:text-[#3F3A36] transition-colors">Servicios</a>
            <a href="#cotizador" className="hover:text-[#3F3A36] transition-colors">Cotizador</a>
            <button 
              onClick={() => setIsPoliciesOpen(true)}
              className="hover:text-[#3F3A36] transition-colors uppercase tracking-widest text-sm font-medium text-[#6B635B] bg-transparent border-none cursor-pointer"
            >
              Políticas
            </button>
            <a href="#contacto" className="hover:text-[#3F3A36] transition-colors">Contacto</a>
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#C5A880] hover:bg-[#B3966E] text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide shadow-sm transition-all duration-300 cursor-pointer"
          >
            Reservar Cita
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F3EDE2] text-[#8C7355] text-xs font-semibold uppercase tracking-widest">
            Estética Avanzada y Reparadora
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal leading-[1.15] text-[#3F3A36]">
            Realza tu belleza natural y recupera la confianza en tu piel
          </h1>
          <p className="text-base sm:text-lg text-[#6B635B] font-light max-w-lg">
            Tratamientos especializados e individualizados de camuflaje, regeneración y remoción estética en Asunción.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4E443F] hover:bg-[#3F3A36] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide shadow-md transition-all cursor-pointer"
            >
              Reservar Turno Ahora
            </button>
            <a
              href="https://maps.google.com/maps?q=-25.27239227294922%2C-57.551177978515625&z=17&hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D4C5B9] hover:border-[#4E443F] text-[#4E443F] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all inline-flex items-center justify-center"
            >
              Cómo Llegar (Overava 674)
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3EDE2] max-w-md w-full">
            <img 
              src="/cami.jpg" 
              alt="Camila Isla - Licenciada en Cosmetología"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#EFECE6]">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3F3A36]">Sobre Cami Isla Studio</h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-[#6B635B] font-light text-base leading-relaxed">
            <p className="text-lg font-normal text-[#3F3A36]">
              Hola, soy Camila Isla, Licenciada en Cosmetología.
            </p>
            <p>
              Me especializo en tratamientos estéticos avanzados con un enfoque altamente profesional y personalizado. Cada procedimiento cuenta con su protocolo específico y cotización detallada según la zona o sesiones requeridas.
            </p>
            <div className="p-4 bg-[#F3EDE2]/60 rounded-2xl border border-[#E9E1D4] text-[#4E443F] text-sm font-medium">
              ✨ Atención personalizada en Barrio Salvador del Mundo, Asunción (Overava 674).
            </div>
          </div>

          <div className="bg-[#F8F6F0] p-8 sm:p-10 rounded-3xl border border-[#EFECE6] shadow-sm space-y-6">
            <h3 className="text-xl font-serif text-[#3F3A36]">¿Por qué elegirnos?</h3>
            <ul className="space-y-4 text-sm text-[#6B635B]">
              <li className="flex items-start gap-3">
                <span className="text-[#C5A880] font-bold">✓</span> Profesional titulada y especializada en el área.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C5A880] font-bold">✓</span> Estrictos protocolos de higiene, bioseguridad y confort.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C5A880] font-bold">✓</span> Cotizaciones diferenciadas y transparentes por cada servicio.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* NUESTROS SERVICIOS INDEPENDIENTES */}
      <section id="servicios" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#EFECE6]">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3F3A36]">Nuestros Servicios</h2>
          <p className="text-[#6B635B] font-light">Tratamientos totalmente independientes con cotizaciones específicas.</p>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C7355] bg-[#F3EDE2] px-3 py-1 rounded-full">
                  {s.category}
                </span>
                <h3 className="text-xl font-serif text-[#3F3A36]">{s.name}</h3>
                <p className="text-sm text-[#6B635B] font-light leading-relaxed">{s.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F5F2EC]">
                <div className="text-xs text-[#7A7067] bg-[#FAF8F5] p-3 rounded-xl border border-[#EFECE6]">
                  <strong className="text-[#4E443F]">Zonas / Áreas:</strong> {s.zonesText}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(s.name)
                    setIsModalOpen(true)
                  }}
                  className="w-full block text-center bg-[#4E443F] hover:bg-[#3F3A36] text-white py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Agendar Turno
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COTIZADOR INTERACTIVO SEPARADO */}
      <section id="cotizador" className="max-w-4xl mx-auto px-6 py-20 border-t border-[#EFECE6]">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3F3A36]">Cotizador Interactivo</h2>
          <p className="text-[#6B635B] font-light">Calcula el valor exacto según el tratamiento independiente y su zona o sesiones.</p>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto"></div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EFECE6] shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B635B]">1. Selecciona el Servicio:</label>
              <select
                value={cotizadorService}
                onChange={(e) => setCotizadorService(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-2xl p-4 text-sm text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
              >
                {SERVICES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B635B]">
                {isCotizadorByZone ? '2. Selecciona la Zona Corporal:' : '2. Selecciona la Cantidad de Sesiones:'}
              </label>
              <select
                value={cotizadorOption}
                onChange={(e) => setCotizadorOption(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-2xl p-4 text-sm text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
              >
                {Object.keys(PRICING_DATA[cotizadorService]?.options || {}).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EFECE6] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#8C7355] uppercase block mb-1">Inversión Estimada</span>
              <h4 className="text-lg font-serif text-[#3F3A36]">{cotizadorOption} — {cotizadorService}</h4>
              <p className="text-xs text-[#7A7067] font-light">
                {isCotizadorByZone ? 'Precio cotizado por zona corporal específica.' : 'Precio cotizado por paquete de sesiones.'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-serif font-normal text-[#4E443F]">
                {currentPriceCotizador.toLocaleString('es-PY')} Gs
              </span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedService(cotizadorService)
                setSelectedOption(cotizadorOption)
                setIsModalOpen(true)
              }}
              className="inline-block bg-[#4E443F] hover:bg-[#3F3A36] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Reservar con esta cotización
            </button>
          </div>
        </div>
      </section>

      {/* RESULTADOS REALES */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#EFECE6]">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3F3A36]">Resultados Reales</h2>
          <p className="text-[#6B635B] font-light">Evolución real en tratamientos corporales profesionales.</p>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto"></div>
        </div>

        <div className="bg-white rounded-3xl border border-[#EFECE6] overflow-hidden shadow-sm max-w-2xl mx-auto">
          <div className="w-full bg-[#FAF8F5] flex items-center justify-center p-4">
            <img 
              src="/resultado.jpg" 
              alt="Resultado antes y después"
              className="w-full h-auto max-h-[500px] object-contain rounded-2xl"
            />
          </div>
          <div className="p-6 text-center bg-[#FAF8F5] border-t border-[#EFECE6]">
            <p className="text-sm font-light text-[#6B635B]">
              Tratamiento especializado — Resultado profesional visible.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="bg-[#2D2825] text-[#D4C5B9] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white">Cami Isla Studio</h3>
            <p className="text-sm font-light leading-relaxed text-[#A69B92]">
              Licenciada en Cosmetología especializada en estética reparadora y corporal en Asunción.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Ubicación</h3>
            <p className="text-sm font-light text-[#A69B92]">
              Overava 674, Barrio Salvador del Mundo<br />
              Asunción, Paraguay
            </p>
            <a
              href="https://maps.google.com/maps?q=-25.27239227294922%2C-57.551177978515625&z=17&hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-[#C5A880] hover:underline pt-1"
            >
              Abrir en Google Maps →
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contacto y Consultas</h3>
            <p className="text-sm font-light text-[#A69B92]">
              Atención de lunes a sábados de 10:00 a 19:00 hs.
            </p>
            <a
              href="https://wa.me/595981123456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C5A880] hover:bg-[#B3966E] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL DE RESERVA SEPARADO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EFECE6] p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D4C5B9] text-[#3F3A36] flex items-center justify-center hover:bg-[#EFECE6] transition-colors font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2 mb-8 pr-10">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C7355] font-bold">Agenda en Línea</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#3F3A36]">Reserva tu Cita</h2>
              <p className="text-[#6B635B] font-light text-xs">Selecciona tu tratamiento independiente y completa tus datos.</p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-center text-sm font-medium shadow-sm">
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl text-center text-sm font-medium shadow-sm">
                {errorMsg}
              </div>
            )}

            <div className="space-y-6">
              
              <div className="space-y-4">
                <div className="border-b border-[#FAF8F5] pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3F3A36]">1. Selecciona el Servicio y Opción</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">Servicio Independiente</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl p-3 text-xs text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">
                      {isAgendadorByZone ? 'Zona Corporal' : 'Sesiones'}
                    </label>
                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl p-3 text-xs text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
                    >
                      {Object.keys(PRICING_DATA[selectedService]?.options || {}).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFECE6] flex items-center justify-between text-xs">
                  <span className="text-[#6B635B]">Valor del servicio:</span>
                  <span className="font-serif font-bold text-[#4E443F]">{currentPriceAgendador.toLocaleString('es-PY')} Gs</span>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6 pt-4 border-t border-[#EFECE6]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3F3A36]">2. Fecha y Horario Disponible</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">Fecha</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl p-3 text-xs text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">Horarios</label>
                    {!selectedDate ? (
                      <div className="h-[46px] flex items-center px-4 bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl text-xs text-[#7A7067] italic">
                        Elige fecha primero
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5">
                        {TIME_SLOTS.map((time) => {
                          const isBooked = bookedTimes.includes(time)
                          const isSelected = selectedTime === time

                          return (
                            <button
                              type="button"
                              key={time}
                              disabled={isBooked}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 text-[11px] rounded-lg font-semibold transition-all cursor-pointer ${
                                isBooked
                                  ? 'bg-neutral-100 text-neutral-400 line-through cursor-not-allowed border border-neutral-200'
                                  : isSelected
                                  ? 'bg-[#4E443F] text-white shadow-sm border border-[#4E443F]'
                                  : 'bg-[#FAF8F5] border border-[#D4C5B9] text-[#6B635B] hover:border-[#4E443F]'
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

                <div className="pt-4 border-t border-[#EFECE6] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3F3A36]">3. Tus Datos de Contacto</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">Nombre y Apellido</label>
                      <input
                        type="text"
                        placeholder="Ej. María Gómez"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl p-3 text-xs text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">Teléfono / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="Ej. 0981 123 456"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D4C5B9] rounded-xl p-3 text-xs text-[#3F3A36] focus:outline-none focus:border-[#4E443F]"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#8C7355] italic text-center">
                  * Para confirmar el turno se requiere abonar una seña de Gs. 50.000 (no reembolsable).
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#4E443F] hover:bg-[#3F3A36] text-white font-bold rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 text-xs tracking-widest uppercase cursor-pointer"
                >
                  {loading ? 'Registrando...' : 'Confirmar Reserva en el Sistema'}
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* MODAL DE POLÍTICAS */}
      {isPoliciesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FDFBF7] w-full max-w-xl rounded-3xl shadow-2xl border border-[#EFECE6] p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsPoliciesOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D4C5B9] text-[#3F3A36] flex items-center justify-center hover:bg-[#EFECE6] transition-colors font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2 mb-6 pr-10">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C7355] font-bold">Información Importante</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#3F3A36]">Políticas de Reserva y Citas</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#6B635B] font-light leading-relaxed bg-[#FAF8F5] p-6 rounded-2xl border border-[#EFECE6]">
              <p className="flex items-start gap-2.5">
                <span className="text-[#C5A880] font-bold mt-0.5">•</span> Para confirmar la cita, se deberá abonar una <strong>reserva de Gs. 50.000</strong>.
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-[#C5A880] font-bold mt-0.5">•</span> El monto abonado en concepto de reserva <strong>no es reembolsable</strong>.
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-[#C5A880] font-bold mt-0.5">•</span> Si necesitás cancelar o reprogramar tu cita, solicitamos avisar <strong>con al menos 24 horas de anticipación</strong>.
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-[#C5A880] font-bold mt-0.5">•</span> Las cancelaciones con menos de 24 horas o inasistencia implican la <strong>pérdida de los Gs. 50.000</strong>.
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-[#C5A880] font-bold mt-0.5">•</span> Se establece un <strong>tiempo máximo de tolerancia de 15 minutos</strong> desde el horario reservado.
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsPoliciesOpen(false)}
                className="bg-[#4E443F] hover:bg-[#3F3A36] text-white px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  )
}