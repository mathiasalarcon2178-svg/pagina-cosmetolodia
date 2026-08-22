export default function Home() {
  const tratamientos = [
    {
      titulo: "Limpieza Facial Profunda",
      descripcion: "Eliminación de impurezas, exfoliación y suero hidratante personalizado.",
      precio: "$45"
    },
    {
      titulo: "Peeling Químico",
      descripcion: "Renovación celular para atenuar manchas, marcas de acné y líneas de expresión.",
      precio: "$60"
    },
    {
      titulo: "Microdermoabrasión",
      descripcion: "Tratamiento no invasivo para devolver la luminosidad y textura suave a la piel.",
      precio: "$55"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navegación */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-rose-500 tracking-wide">DermoCare Studio</h1>
        <a 
          href="https://wa.me/123456789" 
          target="_blank" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-medium text-sm transition"
        >
          Contactar por WhatsApp
        </a>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          Cuidado profesional para la salud de tu piel
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Tratamientos cosmetológicos personalizados para resaltar tu belleza natural con tecnología avanzada.
        </p>
        <a 
          href="#tratamientos" 
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition inline-block"
        >
          Ver Tratamientos
        </a>
      </section>

      {/* Catálogo de Tratamientos */}
      <section id="tratamientos" className="max-w-5xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Nuestros Tratamientos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tratamientos.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-bold text-slate-900 mb-2">{item.titulo}</h4>
              <p className="text-slate-600 text-sm mb-4">{item.descripcion}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-rose-500">{item.precio}</span>
                <button className="text-xs font-semibold bg-rose-50 text-rose-600 px-3 py-1.5 rounded-md hover:bg-rose-100 transition">
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}