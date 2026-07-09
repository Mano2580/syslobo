
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
import { Link } from "react-router-dom";
import { RiTeamLine } from "react-icons/ri";
import SysloboLogo from "@/assets/SysloboLogo.png";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PortaBody from "@/assets/Home/PortaBody.JPEG";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";





const projetos = [
    {
        id: 1,
        category: "Portas",
        title: "Portas Metálicas Personalizadas",
        description: "Fabricação e instalação de portas automáticas e manuais em aço ou ferro com acabamento anti-corrosivo.",
        images: [ex1, ex2, ex3],
        featured: true,
    },
    {
        id: 2,
        category: "Janelas",
        title: "Caixilharia em Alumínio",
        description: "Janelas de correr em alumínio termolacado com vidro duplo e corte térmico.",
        images: [ex2, ex3, ex1],
    },
    {
        id: 3,
        category: "Portões",
        title: "Portão Industrial Automatizado",
        description: "Portão de correr em perfil metálico com motorização e comando remoto.",
        images: [ex1, ex3, ex2],
    },
    {
        id: 4,
        category: "Fachadas",
        title: "Fachada Metálica em Alumínio",
        description: "Revestimento de fachada em perfis de alumínio anodizado com acabamento personalizado.",
        images: [ex3, ex2, ex1],
    },
    {
        id: 5,
        category: "Grades",
        title: "Grades de Segurança para Janelas",
        description: "Grades sob medida, com design moderno e sistema de abertura com trava de segurança.",
        images: [ex2, ex1, ex3],
    },
    {
        id: 6,
        category: "Coberturas",
        title: "Cobertura Metálica para Garagem",
        description: "Projetos e execução de coberturas e pérgolas metálicas para garagens, terraços e espaços exteriores.",
        images: [ex3, ex1, ex2],
    },
];

const servicos = [
    {
        id: 1,
        title: 'Portas',
        image: PortaBody,
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
        title: 'Fachadas',
        image: ex1,
    },
    {
        id: 5,
        title: 'Grades de Segurança',
        image: ex2,
    },
    {
        id: 6,
        title: 'Coberturas',
        image: ex3,
    },
];

// Per-card accent line configs for each service tile hover.
const accentConfigs = [
    // Portas — top-left corner, expand right + down
    [
        "absolute top-0 left-0 h-0.5 bg-golden transition-all duration-500 w-0 group-hover:w-full",
        "absolute top-0 left-0 w-0.5 bg-golden transition-all duration-500 h-0 group-hover:h-full",
    ],
    // Janelas — top-center, expand both sides
    [
        "absolute top-0 inset-x-0 h-0.5 bg-golden transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-center",
    ],
    // Portões — top-right corner, expand left + down
    [
        "absolute top-0 right-0 h-0.5 bg-golden transition-all duration-500 w-0 group-hover:w-full",
        "absolute top-0 right-0 w-0.5 bg-golden transition-all duration-500 h-0 group-hover:h-full",
    ],
    // Fachadas — bottom-left corner, expand right + up
    [
        "absolute bottom-0 left-0 h-0.5 bg-golden transition-all duration-500 w-0 group-hover:w-full",
        "absolute bottom-0 left-0 w-0.5 bg-golden transition-all duration-500 h-0 group-hover:h-full",
    ],
    // Grades — bottom-center, expand both sides
    [
        "absolute bottom-0 inset-x-0 h-0.5 bg-golden transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-center",
    ],
    // Coberturas — bottom-right corner, expand left + up
    [
        "absolute bottom-0 right-0 h-0.5 bg-golden transition-all duration-500 w-0 group-hover:w-full",
        "absolute bottom-0 right-0 w-0.5 bg-golden transition-all duration-500 h-0 group-hover:h-full",
    ],
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

const testimonials = [
    {
        quote: "Trabalho impecável, entrega no prazo e com acabamento de excelente qualidade. Recomendo sem hesitar.",
        author: "João M.",
        since: "Cliente desde 2019",
    },
    {
        quote: "A Syslobo transformou a entrada da minha casa com um portão à medida. Profissionais de excelência do início ao fim.",
        author: "Ana R.",
        since: "Cliente desde 2021",
    },
    {
        quote: "Qualidade de fabrico que raramente se encontra. As fachadas e janelas ficaram com um acabamento perfeito.",
        author: "Carlos F.",
        since: "Cliente desde 2023",
    },
];

const contacts = [
    {
        icon: Phone,
        title: "Telefone",
        content: (
            <>
                <p>+351 253 881 617</p>
                <p>+351 962 996 237</p>
                <span className="text-sm text-zinc-500">
                    Chamada para a rede fixa/movel nacional
                </span>
            </>
        ),
    },
    {
        icon: Mail,
        title: "Email",
        content: <p>serralharialobo@syslobo.pt</p>,
    },
    {
        icon: MapPin,
        title: "Morada",
        content: (
            <>
                <p>Rua Padre Olavo Teixeira Martins, 161</p>
                <p>4750-392 Carapecos, Portugal</p>
            </>
        ),
    },
    {
        icon: Clock,
        title: "Horario",
        content: <p>Seg - Sex | 09:00 - 18:00</p>,
    },
];

const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/syslobo", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/syslobo", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/syslobo", label: "Instagram" },
];

function ProjectTile({ projeto, onClick, className = "", index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onClick={onClick}
            className={`group relative overflow-hidden cursor-pointer bg-stone-950 border border-zinc-800 hover:border-zinc-400 transition-all duration-500 ${className}`}
        >
            {/* Photo — Grayscale at rest, full color on hover */}
            <img
                src={projeto.images[0]}
                alt={projeto.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />

            {/* Heavy gradient at the bottom to ensure text readability */}
            <div className="absolute inset-0 bg-~linear-to-t from-stone-950 via-stone-950/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

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
    const scrollRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isTeleporting = useRef(false);
    const COPIES = 51;

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
 
    const handleScroll = useCallback(() => {
        if (!scrollRef.current || !projeto) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        const itemH = el.scrollHeight / (count * COPIES);
        if (itemH === 0) return;
        const centerPos = el.scrollTop + el.clientHeight / 2;
        const idx = Math.floor(centerPos / itemH);
        setActiveImg(((idx % count) + count) % count);
    }, [projeto, COPIES]);

    const goToImage = useCallback((i) => {
        if (!scrollRef.current || !projeto) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        const itemH = el.scrollHeight / (count * COPIES);
        const currentIdx = Math.round(el.scrollTop / itemH);
        const currentCycle = Math.floor(currentIdx / count);
        const imageTop = (currentCycle * count + i) * itemH;
        const centeredTop = imageTop + itemH / 2 - el.clientHeight / 2;
        el.scrollTo({ top: centeredTop, behavior: 'smooth' });
        setActiveImg(i);
    }, [projeto, COPIES]);

    useEffect(() => {
        if (!projeto || !scrollRef.current) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        requestAnimationFrame(() => {
            const itemH = el.scrollHeight / (count * COPIES);
            const middleStart = Math.floor(COPIES / 2) * count * itemH;
            el.scrollTop = middleStart + itemH / 2 - el.clientHeight / 2;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projeto?.id]);


    const openProject = (id) => { setSelected(id); setActiveImg(0); imageRefs.current = []; };

    const [activeQuote, setActiveQuote] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActiveQuote(q => (q + 1) % testimonials.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <>
        
        {/* SERVIÇOS */}
         <section id="servicos" className="bg-stone-200 py-20">
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
                    <Link
                        to="/servicos"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                    >
                        Ver Todos os Serviços
                        <span className="w-8 h-px bg-zinc-400 group-hover:w-14 group-hover:bg-golden transition-all duration-300 inline-block"></span>
                    </Link>
                </div>
 
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c5c2bc]">
                    {servicos.map((servico, index) => (
                        <Link
                            key={servico.id}
                            to="/servicos"
                            className="group relative overflow-hidden aspect-4/3 bg-[#dddad5] block"
                        >
                            {/* Photo */}
                            <img
                                src={servico.image}
                                alt={servico.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 aspect-square sm:aspect-auto"
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
 
                            {/* Position-based hover accent */}
                            {accentConfigs[index % accentConfigs.length].map((accentClass, accentIndex) => (
                                <div key={accentIndex} className={`${accentClass} pointer-events-none`} />
                            ))}
                        </Link>
                    ))}
                </div>
 
            </div>
        </section>

        {/* SOBRE NÓS */}
      <section className="relative w-full min-h-200 flex items-center justify-center py-20 bg-stone-800">
      {/* Background with simple darkened image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ex3}
          alt="Workshop" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-stone-800/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* Left Side: Content & Stats */}
        <div className="text-white space-y-12">
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white"
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
          <div className="relative w-full max-w-md bg-stone-700 border-2 border-stone-700 p-6 sm:p-10 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] overflow-visible">
            
            {/* Structural Detail: Corner Bolts */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((s) => (
              <div key={s} className={`absolute ${s} w-4 h-4 rounded-full bg-stone-700 shadow-inner border border-stone-600`}></div>
            ))}

            <div className="flex flex-col items-center overflow-visible">
              <motion.div 
                className="relative w-full h-44 flex items-center justify-center overflow-visible py-8"
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              >
                <span 
                  className="text-[10rem] leading-none text-transparent bg-clip-text font-normal px-6"
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    backgroundImage: 'linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 40%, #71717a 100%)',
                  }}
                >
                  45+
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
        <section className="bg-stone-300 py-15">
            <div className="container mx-auto px-6">
 
                {/* Stats bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-dark-golden">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="py-10 px-6 border-b border-r border-stone-300 last:border-r-0 nth-2:border-r-0 lg:nth-2:border-r lg:nth-4:border-r-0 flex flex-col items-center text-center"
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
 
                {/* Testimonials Carousel */}
                <div className="my-16 flex flex-col items-center">
                    <div className="relative w-full max-w-2xl mx-auto">

                        {/* Quote mark */}
                        <div className="text-center mb-4">
                            <span className="text-6xl leading-none text-golden/70 font-serif select-none">"</span>
                        </div>

                        {/* Sliding quote */}
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={activeQuote}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -24 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="text-center px-10"
                                >
                                    <p className="text-xl text-zinc-700 font-light italic leading-relaxed">
                                        "{testimonials[activeQuote].quote}"
                                    </p>
                                    <footer className="mt-6 flex flex-col items-center gap-1">
                                        <span className="w-6 h-px bg-golden inline-block" />
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
                                            {testimonials[activeQuote].author}
                                        </span>
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                                            {testimonials[activeQuote].since}
                                        </span>
                                    </footer>
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveQuote(i)}
                                className={`transition-all duration-300 rounded-none ${
                                    i === activeQuote
                                        ? 'w-6 h-1.5 bg-golden'
                                        : 'w-1.5 h-1.5 bg-zinc-400 hover:bg-zinc-600'
                                }`}
                                aria-label={`Testemunho ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
 
                {/* Reasons row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-stone-400 border-b border-dark-golden">
                    {razoes.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 flex flex-col items-center text-center gap-4 group hover:bg-stone-300 transition-colors duration-300"
                        >
                            <div className="w-12 h-12 border border-stone-300 group-hover:border-golden/50 flex items-center justify-center transition-colors duration-300">
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
        <section id="galeria" className="bg-stone-200 py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-20">
                    <div>
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">
                            Portfólio
                        </p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">
                            Galeria
                        </h2>
                    </div>
                    <Link
                        to="/galeria"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                    >
                        Ver Portfólio Completo
                        <span className="w-8 h-px bg-zinc-400 group-hover:w-14 group-hover:bg-golden transition-all duration-300 inline-block"></span>
                    </Link>
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
                                    className="w-full aspect-video sm:aspect-3/2 object-cover transition-all duration-700 group-hover:scale-105"
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
                    <div
                        className="flex flex-col lg:flex-row w-full max-w-7xl h-full max-h-[85vh] bg-stone-950 border border-zinc-800 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Ferris Wheel Infinite Scroll */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-scroll bg-stone-950"
                            style={{ scrollbarWidth: 'none' }}
                            onScroll={handleScroll}
                        >
                            {Array.from({ length: COPIES }, () => projeto.images).flat().map((img, i) => (
                                <div
                                    key={i}
                                    style={{ flexShrink: 0, padding: '8px 20px' }}
                                    className="flex items-center justify-center"
                                >
                                    <img
                                        src={img}
                                        alt={`${projeto.title} ${(i % projeto.images.length) + 1}`}
                                        className="w-full object-cover aspect-video"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Dark Sidebar */}
                        <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-zinc-800 shrink-0 bg-stone-950">
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
                                        onClick={() => goToImage(i)}
                                        className={`w-20 md:w-28 lg:w-full lg:max-h-32 object-cover cursor-pointer shrink-0 transition-all duration-300 border-2 ${
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
        <section id="contacto" className="bg-[#f7f5f3] py-24">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-16">
                    <p className="uppercase tracking-[6px] text-golden text-sm font-semibold">
                        Fale Connosco
                    </p>

                    <h2 className="mt-4 text-5xl lg:text-6xl font-black text-black uppercase">
                        Entre em Contacto
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Left */}
                    <div className="space-y-6">
                        {contacts.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="group bg-white p-6 shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-golden/40"
                                >
                                    <div className="flex gap-5">
                                        <div className="w-14 h-14 rounded-full border border-golden flex items-center justify-center text-golden group-hover:bg-golden group-hover:text-white transition">
                                            <Icon size={24} />
                                        </div>

                                        <div>
                                            <p className="uppercase tracking-[3px] text-xs text-zinc-400 mb-2">
                                                {item.title}
                                            </p>

                                            <div className="space-y-1 text-lg text-zinc-800">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Social */}
                        <div className="pt-6">
                            <p className="uppercase tracking-[4px] text-xs text-zinc-400 mb-5">
                                Redes Sociais
                            </p>

                            <div className="flex gap-4">
                                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        aria-label={label}
                                        className="w-12 h-12 rounded-full bg-white shadow hover:bg-golden hover:text-white transition flex items-center justify-center"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden bg-white shadow-2xl p-8 md:p-12 pb-0"
                    >
                        
                        <p className="uppercase tracking-[5px] text-golden text-sm font-semibold mb-4 relative z-10">
                            Peca um orcamento
                        </p>

                        <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8 relative z-10 text-zinc-900">
                            Pronto para comecar o seu projeto?
                        </h3>

                        <div className="space-y-5 text-lg mb-10 relative z-10 text-zinc-800">
                            <div className="flex gap-3">
                                <span className="text-golden">✓</span>
                                <p>Acompanhamento personalizado</p>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-golden">✓</span>
                                <p>Resposta em menos de 24 horas</p>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-golden">✓</span>
                                <p>Orcamento totalmente gratuito</p>
                            </div>
                        </div>

                        <Link
                            to="/orcamento"
                            className="group bg-black hover:bg-golden transition px-8 py-5 text-white rounded-lg font-semibold inline-flex items-center gap-3 relative z-10"
                        >
                            Pedir Orcamento

                            <ArrowRight
                                className="group-hover:translate-x-2 transition"
                                size={20}
                            />
                        </Link>

                        <div className="flex mt-12 ml-auto w-fit items-center cursor-default">
                            <img
                                src={SysloboLogo}
                                alt="SYSLOBO Logo"
                                className="w-16 h-16 sm:w-32 sm:h-32"
                            />
                            <span className="text-2xl sm:text-2xl font-semibold science-gothic text-black border-b-2 border-black">
                                SYSLOBO
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}