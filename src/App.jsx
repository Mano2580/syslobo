
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Galeria from './pages/Galeria'
import SobreNos from './pages/SobreNos'
import Contactos from './pages/Contactos'
import Orcamento from './pages/Orcamento'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/orcamento" element={<Orcamento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
