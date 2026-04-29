
import { useState, useEffect, useCallback, useRef } from "react";
import ex1 from "@/assets/ex1.jpg" 
import ex2 from "@/assets/ex2.jpg"
import ex3 from "@/assets/ex3.jpg"
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone, BsChatQuote } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { GoClock, GoShieldCheck } from "react-icons/go";
import { HiOutlineWrenchScrewdriver, HiArrowRight } from "react-icons/hi2";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import SysloboLogo from "@/assets/SysloboLogo.png";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';




const projetos = [
    {
        id: 1,
        category: "Portões",
        title: "Portões Metálicos Personalizados",
        description: "Fabricação e instalação de portões automáticos e manuais em aço ou ferro com acabamento anti-corrosivo.",
        images: [ex1, ex2, ex3],
        featured: true,
    },
    {
        id: 2,
        category: "Grades",
        title: "Grades de Segurança para Janelas",
        description: "Grades sob medida, com design moderno e sistema de abertura com trava de segurança.",
        images: [ex2, ex1, ex3],
    },
    {
        id: 3,
        category: "Estruturas",
        title: "Estruturas Metálicas para Coberturas",
        description: "Projetos e execução de estruturas metálicas para galpões, varandas e pergolados resistentes.",
        images: [ex3, ex1, ex2],
    },
    {
        id: 4,
        category: "Portões",
        title: "Portão Industrial Automatizado",
        description: "Portão de correr em perfil metálico com motorização e comando remoto.",
        images: [ex1, ex3, ex2],
    },
    {
        id: 5,
        category: "Janelas",
        title: "Caixilharia em Alumínio",
        description: "Janelas de correr em alumínio termolacado com vidro duplo e corte térmico.",
        images: [ex2, ex3, ex1],
    },
    {
        id: 6,
        category: "Estores",
        title: "Estores Exteriores com Automatismo",
        description: "Estores de lâminas em alumínio com motor e sensor de vento integrado.",
        images: [ex3, ex2, ex1],
    },
];

const servicos = [
    {
        id: 1,
        title: 'Portas',
        image: ex1,
    },
    {
        id: 2,
        title: 'Janelas',
        image: ex2,
    },
    {
        id: 3,      
        title: 'Portões',
        image: ex3,
    },
    {
        id: 4,
        title: 'Estores',
        image: ex1,
    },
    {
        id: 5,
        title: 'Grades de Segurança',
        image: ex2,
    },
    {
        id: 6,
        title: 'Estruturas Metálicas',
        image: ex3,
    },
];

const stats = [
    { value: "50 +",   label: "Anos de Experiência" },
    { value: "3000 +", label: "Projetos Entregues"  },
    { value: "2000 +", label: "Clientes Satisfeitos" },
    { value: "100%",  label: "Garantia nos Trabalhos" },
];
 
const razoes = [
    {
        icon: <GoShieldCheck className="w-7 h-7 text-golden" />,
        title: "Garantia Total",
        desc: "Suporte pós-instalação incluído em todos os trabalhos, sem excepções.",
    },
    {
        icon: <BsChatQuote className="w-7 h-7 text-golden" />,
        title: "Orçamento Gratuito",
        desc: "Sem compromisso. Deslocamo-nos ao local ou respondemos por contacto.",
    },
    {
        icon: <RiTeamLine className="w-7 h-7 text-golden" />,
        title: "Equipa Especializada",
        desc: "Técnicos com 30+ anos de experiência em metalurgia e serralharia.",
    },
    {
        icon: <HiOutlineWrenchScrewdriver className="w-7 h-7 text-golden" />,
        title: "Feito à Medida",
        desc: "Cada projeto é único. Fabricamos e instalamos de acordo com as suas necessidades.",
    },
];

const contactDetails = [
    {
        icon: <BsTelephone className="w-5 h-5 text-golden" />,
        label: "Telefone",
        value: <span>+351 253 881 617<br />+351 962 996 237<br /><span className="text-xs text-zinc-400">(Chamada para a rede fixa/móvel nacional)</span></span>,
    },
    {
        icon: <MdOutlineEmail className="w-5 h-5 text-golden" />,
        label: "Email",
        value: "geral@syslobo.pt",
    },
    {
        icon: <SlLocationPin className="w-5 h-5 text-golden" />,
        label: "Morada",
        value: <span>Rua Padre Olavo Teixeira Martins, 161<br />4750-392, Carapeços, Portugal</span>,
    },
    {
        icon: <GoClock className="w-5 h-5 text-golden" />,
        label: "Horário",
        value: "Seg - Sex: 09:00 - 18:00",
    },
];

const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/syslobo", label: "LinkedIn" },
    { icon: FaFacebook, href: "https://www.facebook.com/syslobo", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/syslobo", label: "Instagram" },
];

function ProjectTile({ projeto, onClick, className = "", index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onClick={onClick}
            className={`group relative overflow-hidden cursor-pointer bg-[#161618] border border-zinc-800 hover:border-zinc-400 transition-all duration-500 ${className}`}
        >
            {/* Photo — Grayscale at rest, full color on hover */}
            <img
                src={projeto.images[0]}
                alt={projeto.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />

            {/* Heavy gradient at the bottom to ensure text readability */}
            <div className="absolute inset-0 bg-~linear-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

            {/* Category pill — Sharp, blueprint style */}
            <div className="absolute top-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white text-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                    {projeto.category}
                </span>
            </div>

            {/* Title & Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {/* Simulated weld/spark accent line that grows on hover */}
                <div className="w-0 h-1 bg-white mb-4 group-hover:w-12 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight tracking-tight">
                    {projeto.title}
                </h3>
            </div>
        </motion.div>
    );
}

export default function Body() {
    const [selectedProjeto, setSelectedProjeto] = useState(null);

    const imageRefs = useRef([]);

    const closeModal = useCallback(() => setSelectedProjeto(null), []);

    useEffect(() => {
        if (!selectedProjeto) return;
        const handleKey = (e) => { if (e.key === 'Escape') closeModal(); };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [selectedProjeto, closeModal]);


    const [selected, setSelected] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
 
    const selectedIndex = projetos.findIndex(p => p.id === selected);
    const projeto = projetos[selectedIndex] ?? null;
 
    const close = useCallback(() => { setSelected(null); setActiveImg(0); }, []);
 
    const prev = useCallback((e) => {
        e?.stopPropagation();
        const i = (selectedIndex - 1 + projetos.length) % projetos.length;
        setSelected(projetos[i].id);
        setActiveImg(0);
    }, [selectedIndex]);
 
    const next = useCallback((e) => {
        e?.stopPropagation();
        const i = (selectedIndex + 1) % projetos.length;
        setSelected(projetos[i].id);
        setActiveImg(0);
    }, [selectedIndex]);
 
    useEffect(() => {
        if (!selected) return;
        const handleKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [selected, close, prev, next]);
 
    const openProject = (id) => { setSelected(id); setActiveImg(0); imageRefs.current = []; };

    return (
        <>
        
        {/* SERVIÇOS */}
         <section id="servicos" className="bg-[#e5e2dc] py-20">
            <div className="container mx-auto px-6">
 
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <div>
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            O que fazemos
                        </p>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900">
                            Os Nossos Serviços
                        </h2>
                    </div>
                    <a
                        href="/servicos"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                    >
                        Ver Todos os Serviços
                        <span className="w-8 h-px bg-zinc-400 group-hover:w-14 group-hover:bg-golden transition-all duration-300 inline-block"></span>
                    </a>
                </div>
 
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c5c2bc]">
                    {servicos.map((servico) => (
                        <a
                            key={servico.id}
                            href="/servicos"
                            className="group relative overflow-hidden aspect-4/3 bg-[#dddad5] block"
                        >
                            {/* Photo */}
                            <img
                                src={servico.image}
                                alt={servico.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105"
                            />
 
                            {/* Bottom gradient always visible */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
 
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                                <span className="text-white font-bold text-base tracking-tight leading-tight">
                                    {servico.title}
                                </span>
                                <span className="w-7 h-7 rounded-full border border-golden flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shrink-0">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="#e4a020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
 
                            {/* Amber top-left corner accent on hover */}
                            <div className="absolute top-0 left-0 w-0 h-0.5 bg-golden transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>
 
            </div>
        </section>

        {/* SOBRE NÓS */}
      <section className="relative w-full min-h-200 flex items-center justify-center py-20 bg-[#2a2826]">
      {/* Background with simple darkened image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ex3}
          alt="Workshop" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-[#2a2826]/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Content & Stats */}
        <div className="text-white space-y-12">
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-6xl font-black uppercase tracking-tighter text-white"
            >
              Sobre Nós
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-xl text-zinc-400 leading-relaxed font-light max-w-lg"
            >
              Especialistas em soluções metálicas de alta precisão. 
              Combinamos décadas de técnica artesanal com rigor industrial para projetos que desafiam o tempo.
            </motion.p>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="border-l border-golden/70 pl-6 py-2">
              <div className="text-3xl font-bold text-white tracking-tighter">2000 +</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Clientes Satisfeitos</div>
            </div>
            <div className="border-l border-golden/70 pl-6 py-2">
              <div className="text-3xl font-bold text-white tracking-tighter">3000 +</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Projetos Entregues</div>
            </div>
          </div>
        </div>

        {/* Right Side: The Main Plaque */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md bg-[#343230] border-2 border-[#454340] p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] overflow-visible">
            
            {/* Structural Detail: Corner Bolts */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((s) => (
              <div key={s} className={`absolute ${s} w-4 h-4 rounded-full bg-[#454340] shadow-inner border border-[#555350]`}></div>
            ))}

            <div className="flex flex-col items-center overflow-visible">
              <motion.div 
                className="relative w-full h-44 flex items-center justify-center overflow-visible py-8"
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              >
                <span 
                  className="text-[10rem] leading-none text-transparent bg-clip-text font-normal italic px-6"
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    backgroundImage: 'linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 40%, #71717a 100%)',
                  }}
                >
                  50+
                </span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                className="mt-2 text-center border-t border-golden/70 pt-6 w-full"
              >
                <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                  Anos de Experiência No Setor
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>  
        {/* Stats, Quote & Reasons */}
        <section className="bg-[#d0cdc7] py-20">
            <div className="container mx-auto px-6">
 
                {/* Stats bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-golden/40">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="py-10 px-6 border-b border-r border-[#c5c2bc] last:border-r-0 nth-2:border-r-0 lg:nth-2:border-r lg:nth-4:border-r-0"
                        >
                            <div
                                className="text-5xl font-black tracking-tighter text-zinc-900"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                {stat.value}
                            </div>
                            <div className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
 
                {/* Pull quote */}
                <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="my-16 border-l-2 border-golden pl-6 max-w-2xl"
                >
                    <p className="text-xl text-zinc-700 font-light italic leading-relaxed">
                        "Trabalho impecável, entrega no prazo e com acabamento de excelente qualidade. Recomendo sem hesitar."
                    </p>
                    <footer className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                        João M. — Cliente desde 2019
                    </footer>
                </motion.blockquote>
 
                {/* Reasons row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#c5c2bc] border border-[#c5c2bc]">
                    {razoes.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 flex flex-col gap-4 group hover:bg-[#d5d2cc] transition-colors duration-300"
                        >
                            <div className="w-12 h-12 border border-[#c5c2bc] group-hover:border-golden/50 flex items-center justify-center transition-colors duration-300">
                                {r.icon}
                            </div>
                            <div>
                                <h3 className="text-zinc-900 font-bold text-sm uppercase tracking-wider mb-2">
                                    {r.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {r.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
 
            </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="bg-[#dddad5] py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-20">
                    <div>
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">
                            Portfólio
                        </p>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">
                            Galeria
                        </h2>
                    </div>
                    <a
                        href="/galeria"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                    >
                        Ver Portfólio Completo
                        <span className="w-8 h-px bg-zinc-400 group-hover:w-14 group-hover:bg-golden transition-all duration-300 inline-block"></span>
                    </a>
                </div>

                {/* Offset Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
                    {projetos.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: (i % 2) * 0.15 }}
                            className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-16' : ''}`}
                            onClick={() => openProject(p.id)}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-zinc-200 shadow-sm">
                                <img
                                    src={p.images[0]}
                                    alt={p.title}
                                    className="w-full aspect-3/2 object-cover transition-all duration-700 group-hover:scale-105"
                                />

                                {/* Corner arrow indicator */}
                                <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Info Row */}
                            <div className="mt-5 flex items-start gap-5">
                                <span
                                    className="text-4xl font-extralight text-zinc-400/50 leading-none select-none"
                                    style={{ fontVariantNumeric: 'tabular-nums' }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 border-t border-zinc-400/30 pt-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-golden">
                                        {p.category}
                                    </span>
                                    <h3 className="text-zinc-900 font-bold text-lg mt-1 leading-tight group-hover:text-golden transition-colors duration-300">
                                        {p.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm mt-2 leading-relaxed line-clamp-2">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Dark Mode Modal */}
            {projeto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 lg:p-12"
                    onClick={close}
                >
                    {/* Navigation Buttons */}
                    <button onClick={prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#161618] border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300">←</button>
                    <button onClick={next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#161618] border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300">→</button>
                    <button onClick={close} className="absolute top-6 right-6 lg:top-12 lg:right-12 z-10 w-10 h-10 bg-[#161618] border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-300">✕</button>

                    <div
                        className="flex flex-col lg:flex-row w-full max-w-7xl h-full max-h-[85vh] bg-[#0a0a0c] border border-zinc-800 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Images Scroll Area */}
                        <div
                            className="flex-1 overflow-y-auto bg-black"
                            style={{ scrollbarWidth: "none" }}
                            onScroll={(e) => {
                                const container = e.currentTarget;
                                const scrollTop = container.scrollTop;
                                let closest = 0;
                                let minDist = Infinity;
                                imageRefs.current.forEach((el, idx) => {
                                    if (!el) return;
                                    const dist = Math.abs(el.offsetTop - scrollTop);
                                    if (dist < minDist) { minDist = dist; closest = idx; }
                                });
                                setActiveImg(closest);
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                {projeto.images.map((img, i) => (
                                    <img key={i} ref={(el) => { imageRefs.current[i] = el; }} src={img} alt={`${projeto.title} ${i + 1}`} className="w-full object-cover" />
                                ))}
                            </div>
                        </div>

                        {/* Dark Sidebar */}
                        <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-zinc-800 shrink-0 bg-[#0f0f11]">
                            <div className="p-8 border-b border-zinc-800">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-zinc-800 px-3 py-1">
                                    {projeto.category}
                                </span>
                                <h3 className="text-white font-black text-xl mt-6 leading-tight uppercase tracking-tight">
                                    {projeto.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-light">
                                    {projeto.description}
                                </p>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-2 p-6 lg:overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                                {projeto.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        onClick={() => imageRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                                        className={`w-16 lg:w-full lg:max-h-32 object-cover cursor-pointer shrink-0 transition-all duration-300 border-2 ${
                                            i === activeImg ? "border-golden opacity-100" : "border-transparent opacity-30 hover:opacity-100 grayscale"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="bg-[#d2cfca] py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
                    <div>
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">
                            Fale Connosco
                        </p>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">
                            Entre em Contacto
                        </h2>
                    </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed max-w-md mb-6">
                    Estamos disponíveis para responder às suas questões e ajudá-lo com o seu projeto.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left — Contact Info */}
                    <div className="space-y-8">
                        <div className="divide-y divide-[#c0bdb7]">
                            {contactDetails.map((item, i) => (
                                <div key={i} className="flex items-start gap-5 py-5 first:pt-0">
                                    <div className="w-10 h-10 border border-[#c0bdb7] flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-none block">{item.label}</span>
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
                    </div>

                    {/* Right — CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-zinc-900 p-8 sm:p-10">
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">Peça um Orçamento</p>
                            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white mb-4">
                                Pronto para começar o seu projeto?
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                Preencha o nosso formulário de contacto e entraremos em contacto consigo brevemente. Resposta garantida em 24 horas úteis.
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <a
                                    href="/orcamento"
                                    className="group inline-flex items-center gap-3 bg-golden text-zinc-900 px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-200"
                                >
                                    Pedir Orçamento
                                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </a>
                                <img src={SysloboLogo} alt="Syslobo" className="h-24" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </>
    )
}