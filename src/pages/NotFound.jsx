import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="bg-stone-200 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-6 pt-40 sm:pt-44 pb-32">
        <div className="text-center">
          <h1 className="text-8xl font-black tracking-tighter text-zinc-900">404</h1>
          <div className="w-12 h-0.5 bg-golden mx-auto my-6" />
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold mb-8">
            Página não encontrada
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-600 transition-colors duration-200"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
