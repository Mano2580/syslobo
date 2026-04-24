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
        className={`fixed top-0 left-0 w-full z-50 bg-[#ebe8e2] drop-shadow-md transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex lg:grid lg:grid-cols-6 items-center justify-between py-2 sm:py-4 px-2 mr-4 md:mr-2 md:px-8 xlg:px-16">
          {/* LEFT — Logo */}
          <div className="col-span-1 flex mx-2 lg:mx-auto items-center cursor-pointer">
            <img
              src={SysloboLogo}
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <span className="text-2xl sm:text-3xl font-semibold text-black border-b border-golden/50">
              Syslobo
            </span>
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
            <Button className="btn h-10 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-[#292724] rounded group py-1.5 px-2.5 cursor-pointer">
              <span className="absolute inset-0 rounded bg-[#3a3734] origin-center scale-x-0 transition-transform duration-800 ease-in-out group-hover:scale-x-100"></span>
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
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        className={`absolute left-0 top-0 h-full w-[65%] bg-white/70 backdrop-blur-lg shadow-2xl transform transition-transform duration-300
          ${open ? "translate-x-0 open" : "-translate-x-full"}
          group`}
        >
        <div className="p-6 flex justify-between items-center border-b border-white/50">
          <div className="col-span-1 flex md:mx-auto items-center group gap-2 cursor-pointer">
            <img
              src={SysloboLogo}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-2xl sm:text-3xl font-medium text-blue-400">
              Syslobo
            </span>
          </div>
          <button onClick={() => setOpen(false)}
            className="text-2xl sm:text-3xl">
            <X />
          </button>
        </div>

        {/* Drawer Menu Links */}
        <nav className="p-4 mx-2 md:mx-auto md:items-center flex flex-col gap-4 text-xl sm:text-2xl">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="mt-2 opacity-0 translate-x-4 transition-all duration-300 delay-100 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Início
          </Link>

          <Link
            to="/servicos"
            onClick={() => setOpen(false)}
            className="opacity-0 translate-x-4 transition-all duration-300 delay-200 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Serviços
          </Link>

          <Link
            to="/galeria"
            onClick={() => setOpen(false)}
            className="opacity-0 translate-x-4 transition-all duration-300 delay-300 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Galeria
          </Link>

          <Link
            to="/sobre-nos"
            onClick={() => setOpen(false)}
            className="opacity-0 translate-x-4 transition-all duration-300 delay-400 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Sobre nós
          </Link>

          <Link
            to="/contactos"
            onClick={() => setOpen(false)}
            className="opacity-0 translate-x-4 transition-all duration-300 delay-500 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Contactos
          </Link>
        </nav>

        <div className="p-2 flex justify-between items-center border-b border-white/50" />

        <div className="p-4 pb-2 mx-2 flex flex-col gap-4 text-xl sm:text-2xl">
          <div className="flex items-center md:mx-auto">
             <Link
            to="/orcamento"
            onClick={() => setOpen(false)}
            className="opacity-0 translate-x-4 transition-all duration-300 delay-600 group-[.open]:opacity-100 group-[.open]:translate-x-0"
          >
            Pedir Orçamento
          </Link>
          </div>
        </div>

        <div className="p-2 flex justify-between items-center border-b border-white/50" />

        {/* Social Icons */}
        <div className="mx-2 md:mx-auto md:w-full p-4 flex gap-2 justify-center md:gap-4 opacity-0 translate-x-4 transition-all duration-300 delay-700 group-[.open]:opacity-100 group-[.open]:translate-x-0">
          <a href="https://www.linkedin.com/company/syslobo/" target="_blank" rel="noopener noreferrer" 
            className="">
            <FaLinkedin className="w-8 h-8 md:w-12 md:h-12 text-linkedin-blue"/>
          </a>

          <a href="https://www.instagram.com/syslobo/" target="_blank" rel="noopener noreferrer" 
            className="">
            <FaInstagramSquare className="w-8 h-8 md:w-12 md:h-12 text-ig-pink"/>
          </a>

          <a href="https://www.facebook.com/syslobo" target="_blank" rel="noopener noreferrer"
            className="">
            <FaFacebookSquare className="w-8 h-8 md:w-12 md:h-12 text-fb-blue"/>
          </a>
        </div>
      </aside>
      </div>
    </div>
  );
}
