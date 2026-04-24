import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { MdOutlineEmail } from "react-icons/md"
import { BsTelephone } from "react-icons/bs"
import { SlLocationPin } from "react-icons/sl"
import { GoClock } from "react-icons/go"
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import SysloboLogo from "../assets/SysloboLogo.png"

const contactDetails = [
  {
    icon: <BsTelephone className="w-5 h-5 text-golden" />,
    label: "Telefone",
    value: (
      <span>
        +351 253 881 617
        <br />
        +351 962 996 237
        <br />
        <span className="text-xs text-zinc-400">(Chamada para a rede fixa/móvel nacional)</span>
      </span>
    ),
  },
  {
    icon: <MdOutlineEmail className="w-5 h-5 text-golden" />,
    label: "Email",
    value: "geral@syslobo.pt",
  },
  {
    icon: <SlLocationPin className="w-5 h-5 text-golden" />,
    label: "Morada",
    value: (
      <span>
        Rua Padre Olavo Teixeira Martins, 161
        <br />
        4750-392, Carapeços, Portugal
      </span>
    ),
  },
  {
    icon: <GoClock className="w-5 h-5 text-golden" />,
    label: "Horário",
    value: "Seg - Sex: 09:00 - 18:00",
  },
]

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/syslobo", label: "LinkedIn" },
  { icon: FaFacebook, href: "https://www.facebook.com/syslobo", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/syslobo", label: "Instagram" },
]

export default function Contactos() {
  return (
    <div className="bg-[#d2cfca] min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <section className="bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900/80 to-zinc-900" />
        <div className="relative container mx-auto px-6 py-28 pt-40 sm:pt-44">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">Fale Connosco</p>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter text-white mb-4">Contactos</h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Estamos disponíveis para responder às suas questões e ajudá-lo com o seu projeto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">Informações</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">
              Entre em Contacto
            </h2>
          </div>
        </div>

        <p className="text-zinc-600 text-sm leading-relaxed max-w-md mb-6">
          Seja para um orçamento, uma questão técnica ou apenas para conhecer o nosso trabalho — estamos aqui.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-10"
          >

            {/* Contact Details */}
            <div className="divide-y divide-[#c0bdb7]">
              {contactDetails.map((item, i) => (
                <div key={i} className="flex items-start gap-5 py-5 first:pt-0">
                  <div className="w-10 h-10 border border-[#c0bdb7] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-none block">
                      {item.label}
                    </span>
                    <p className="text-zinc-800 text-sm mt-1 leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-4">
                Redes Sociais
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 border border-[#c0bdb7] flex items-center justify-center text-dark-golden hover:bg-dark-golden hover:border-dark-golden hover:text-white transition-colors duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-zinc-900 p-8 sm:p-10">
              <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">Peça um Orçamento</p>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white mb-4">
                Pronto para começar o seu projeto?
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Preencha o nosso formulário de contacto e entraremos em contacto consigo brevemente. Resposta garantida
                em 24 horas úteis.
              </p>

              <div className="flex items-center justify-between gap-4">
                <a
                  href="/orcamento"
                  className="group inline-flex items-center gap-3 bg-golden text-zinc-900 px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-200"
                >
                  Enviar Mensagem
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                
                <img 
                  src={SysloboLogo} 
                  alt="Syslobo" 
                  className="h-24">
                </img>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">Localização</p>
          <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-10">
            Como Chegar
          </h3>
          <div className="border border-[#c0bdb7] overflow-hidden w-full h-96">
            <iframe
              title="Localização Syslobo"
              aria-label="Mapa com a localização da Syslobo em Carapeços, Portugal"
              src="https://maps.google.com/maps?width=600&height=400&hl=pt&q=Rua%20Padre%20Olavo%20Teixeira%20Martins%2C%20161%204750-392%2C%20Carapeços%2C%20Portugal&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-zinc-500 text-xs">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Padre+Olavo+Teixeira+Martins+161+4750-392+Carapeços+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors underline underline-offset-2"
            >
              Abrir no Google Maps
            </a>
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
