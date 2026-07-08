import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare   } from "react-icons/fa";
import SysloboLogo from "../assets/SysloboLogo.png";
import { Button } from "@/components/ui/button";



export default function Navbar () {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Click‑outside‑to‑close
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Scroll hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY) {
        setShow(false); // scrolling down → hide
      } else {
        setShow(true); // scrolling up → show
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-stone-100 drop-shadow-md transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex lg:grid lg:grid-cols-6 items-center justify-between py-2 sm:py-4 px-2 mr-4 md:mr-2 md:px-8 xlg:px-16">
          {/* LEFT — Logo */}
          <div className="col-span-1 flex mx-2 lg:mx-auto items-center cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={SysloboLogo}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <span className="text-2xl sm:text-3xl font-semibold text-black border-b border-golden/50">
              Syslobo
              </span>
            </Link>
          </div>

          {/* CENTER — Desktop Menu */}
          <nav className="hidden col-span-4 mx-auto lg:flex items-center gap-12 lg:gap-8 md:text-xl lg:text-xl font-semibold">
            <Link to="/" className="relative group">
              Início
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
            </Link>

            <Link to="/servicos" className="relative group">
              Serviços
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
            </Link>

            <Link to="/galeria" className="relative group">
              Galeria
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
            </Link>

            <Link to="/sobre-nos" className="relative group">
              Sobre Nós
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
            </Link>

            <Link to="/contactos" className="relative group">
              Contactos
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-golden/50 group-hover:w-3/6"></span>
            </Link>
          </nav>

          {/* RIGHT — Contact Button */}
          <div className="hidden mx-auto col-span-1 lg:flex items-center gap-3">
            <Link to="/orcamento">
            <Button className="btn h-10 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-stone-800 rounded group py-1.5 px-2.5 cursor-pointer">
              <span className="absolute inset-0 rounded bg-stone-600 origin-center scale-x-0 transition-transform duration-800 ease-in-out group-hover:scale-x-100"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                Pedir Orçamento
              </span>
            </Button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 md:w-12 md:h-12"/>
          </button>
        </div>
      </header>

      {/* DRAWER + OVERLAY */}
      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Drawer Panel */}
        <aside
          ref={drawerRef}
          className={`absolute left-0 top-0 h-full w-[80%] max-w-xs sm:max-w-sm bg-stone-100 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
            ${open ? "translate-x-0 open" : "-translate-x-full"}
            group`}
        >
          
          {/* Header */}
          <div className="pl-6 pr-5 py-5 flex justify-between items-center border-b border-black/10">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={SysloboLogo} alt="" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-semibold text-stone-900">
                Syslobo
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded hover:bg-black/10 transition-colors duration-200 text-stone-900"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="pl-7 pr-5 pt-6 flex flex-col flex-1">
            {[
              { to: "/", label: "Início", delay: "delay-75" },
              { to: "/servicos", label: "Serviços", delay: "delay-100" },
              { to: "/galeria", label: "Galeria", delay: "delay-150" },
              { to: "/sobre-nos", label: "Sobre Nós", delay: "delay-200" },
              { to: "/contactos", label: "Contactos", delay: "delay-300" },
            ].map(({ to, label, delay }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`relative group/link py-3.5 text-lg sm:text-xl font-semibold text-stone-900 border-b border-black/10 flex items-center gap-3
                  opacity-0 translate-x-4 transition-all duration-300 ${delay}
                  group-[.open]:opacity-100 group-[.open]:translate-x-0
                  hover:text-golden`}
              >
                <span className="w-0 h-px bg-golden transition-all duration-300 group-hover/link:w-4 shrink-0" />
                {label}
              </Link>
            ))}

            {/* CTA Button */}
            <div className={`mt-6 opacity-0 translate-x-4 transition-all duration-300 delay-[350ms] group-[.open]:opacity-100 group-[.open]:translate-x-0`}>
              <Link
                to="/orcamento"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-3 bg-stone-800 text-white text-sm sm:text-base font-semibold uppercase tracking-widest hover:bg-golden hover:text-stone-900 transition-colors duration-300"
              >
                Pedir Orçamento
              </Link>
            </div>
          </nav>

          {/* Footer — Social Icons */}
          <div className={`pl-7 pr-5 py-5 border-t border-black/10 flex items-center gap-4
            opacity-0 translate-x-4 transition-all duration-300 delay-[400ms]
            group-[.open]:opacity-100 group-[.open]:translate-x-0`}>
            <span className="text-xs uppercase tracking-widest text-stone-900/50 font-semibold mr-1">Seguir</span>
            <a href="https://www.linkedin.com/company/syslobo/" target="_blank" rel="noopener noreferrer"
              className="text-stone-900/60 hover:text-linkedin-blue transition-colors duration-200">
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.instagram.com/syslobo/" target="_blank" rel="noopener noreferrer"
              className="text-stone-900/60 hover:text-ig-pink transition-colors duration-200">
              <FaInstagramSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.facebook.com/syslobo" target="_blank" rel="noopener noreferrer"
              className="text-stone-900/60 hover:text-fb-blue transition-colors duration-200">
              <FaFacebookSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
