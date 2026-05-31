import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useCallback, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ex1 from "@/assets/ex1.jpg";
import ex2 from "@/assets/ex2.jpg";
import ex3 from "@/assets/ex3.jpg";
import Portao_P1 from "@/assets/Portoes/Portao_P1.jpg";
import Portao_P2 from "@/assets/Portoes/Portao_P2.jpg";
import Portao_P3 from "@/assets//Portoes/Portao_P3.jpg";

import { GoShieldCheck } from "react-icons/go";
import { BsChatQuote } from "react-icons/bs";
const projetos = [
    { id: 1,  category: "Portões",    title: "Portão Residencial Preto",     description: "Portão de correr em aço com motorização e comando remoto.", images: [Portao_P1, Portao_P2, Portao_P3] },
    { id: 2,  category: "Grades",     title: "Grades de Segurança Modernas",         description: "Grades em ferro lacado com sistema de abertura certificado.", images: [ex2, ex1, ex3] },
    { id: 3,  category: "Coberturas",  title: "Cobertura Metálica para Garagem",      description: "Cobertura em aço galvanizado com telha sandwich para garagem individual.", images: [ex3, ex1, ex2] },
    { id: 4,  category: "Janelas",    title: "Caixilharia em Alumínio Termolacado",  description: "Janelas oscilobatentes com corte térmico e vidro duplo.", images: [ex1, ex3, ex2] },
    { id: 5,  category: "Portões",    title: "Portão Industrial de Correr",          description: "Portão de grandes dimensões para armazém industrial.", images: [ex2, ex3, ex1] },
    { id: 6,  category: "Fachadas",    title: "Fachada Metálica em Alumínio",            description: "Revestimento de fachada em perfis de alumínio anodizado com acabamento personalizado.", images: [ex3, ex2, ex1] },
    { id: 7,  category: "Grades",     title: "Grade de Varanda em Ferro Forjado",    description: "Grade artesanal com motivos geométricos e tratamento anti-corrosivo.", images: [ex1, ex2, ex3] },
    { id: 8,  category: "Coberturas",  title: "Pérgola Metálica com Cobertura",       description: "Pérgola em aço com lâminas orientáveis e LED integrado.", images: [ex2, ex1, ex3] },
    { id: 9,  category: "Portões",    title: "Portão Batente de Ferro Forjado",      description: "Portão batente a dois vãos em ferro forjado, preto mate.", images: [ex3, ex1, ex2] },
    { id: 10, category: "Janelas",    title: "Janelas de Correr em Alumínio",        description: "Sistema de correr de grande vão, perfis slim.", images: [ex1, ex3, ex2] },
    { id: 11, category: "Fachadas",    title: "Painel de Fachada Modular",             description: "Painéis de revestimento em alumínio compósito para fachada de edifício comercial.", images: [ex2, ex3, ex1] },
    { id: 12, category: "Coberturas",  title: "Marquise em Ferro Forjado",            description: "Marquise em ferro forjado com vidro temperado sobre entrada principal.", images: [ex3, ex2, ex1] },
];
 
const categorias = ["Todos", "Portões", "Grades", "Coberturas", "Janelas", "Fachadas"];
 
const COPIES = 51;

function ProjectModal({ projeto, onClose, onPrev, onNext }) {
    const [activeImg, setActiveImg] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
    }, [onClose, onPrev, onNext]);

    // Center first image on open
    useEffect(() => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        requestAnimationFrame(() => {
            const itemH = el.scrollHeight / (count * COPIES);
            const middleStart = Math.floor(COPIES / 2) * count * itemH;
            el.scrollTop = middleStart + itemH / 2 - el.clientHeight / 2;
        });
        setActiveImg(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projeto.id]);

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        const itemH = el.scrollHeight / (count * COPIES);
        if (itemH === 0) return;
        const centerPos = el.scrollTop + el.clientHeight / 2;
        const idx = Math.floor(centerPos / itemH);
        setActiveImg(((idx % count) + count) % count);
    }, [projeto.images.length]);

    const goToImage = useCallback((i) => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const count = projeto.images.length;
        const itemH = el.scrollHeight / (count * COPIES);
        const currentIdx = Math.round(el.scrollTop / itemH);
        const currentCycle = Math.floor(currentIdx / count);
        const imageTop = (currentCycle * count + i) * itemH;
        const centeredTop = imageTop + itemH / 2 - el.clientHeight / 2;
        el.scrollTo({ top: centeredTop, behavior: 'smooth' });
        setActiveImg(i);
    }, [projeto.images.length]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 lg:p-12" onClick={onClose}>

            <div className="flex flex-col lg:flex-row w-full max-w-7xl h-full max-h-[85vh] bg-stone-950 border border-zinc-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
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

                {/* Sidebar */}
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
    );
}
 
export default function GaleriaPage() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [selected, setSelected] = useState(null);
    const sidebarRef = useRef(null);
    const heroRef = useRef(null);
    const [sidebarTop, setSidebarTop] = useState(96);
    const [showFilter, setShowFilter] = useState(true);
    const [lastFilterScrollY, setLastFilterScrollY] = useState(0);
    const [filterFixed, setFilterFixed] = useState(false);

    useEffect(() => {
        const updateTop = () => {
            if (!sidebarRef.current) return;
            const sidebarH = sidebarRef.current.offsetHeight;
            const centered = (window.innerHeight - sidebarH) / 2;
            setSidebarTop(Math.max(96, centered));
        };
        updateTop();
        window.addEventListener("resize", updateTop);
        return () => window.removeEventListener("resize", updateTop);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setFilterFixed(!entry.isIntersecting),
            { threshold: 0 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastFilterScrollY) {
                setShowFilter(false);
            } else {
                setShowFilter(true);
            }
            setLastFilterScrollY(currentScroll);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastFilterScrollY]);

    const filtered = activeCategory === "Todos" ? projetos : projetos.filter(p => p.category === activeCategory);
    const selectedIndex = filtered.findIndex(p => p.id === selected);
    const projeto = filtered[selectedIndex] ?? null;
 
    const close = useCallback(() => setSelected(null), []);
    const prev = useCallback(() => setSelected(filtered[(selectedIndex - 1 + filtered.length) % filtered.length].id), [selectedIndex, filtered]);
    const next = useCallback(() => setSelected(filtered[(selectedIndex + 1) % filtered.length].id), [selectedIndex, filtered]);
 
    return (
        <div className="bg-stone-300 min-h-screen">
            <Navbar />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative bg-zinc-900 overflow-hidden">
                <img 
                    src={ex1} 
                    alt="Galeria" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
                <div className="absolute inset-0 bg-linear-to-b from-zinc-900/60 to-zinc-900" />
                <div className="relative container mx-auto px-6 py-28 pt-40 sm:pt-44 ">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-dark-golden text-xs font-bold uppercase tracking-[0.25em] mb-4">
                            O nosso trabalho
                        </p>

                        <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                            Galeria
                        </h1>

                        <p className="mt-5 text-zinc-400 text-base leading-relaxed max-w-lg">
                            Explore o nosso portefólio. Clique em qualquer projeto para ver mais detalhes.
                        </p>
                    </motion.div>
                </div>
            </section>
 
            {/* ── MOBILE FILTER ROW (in-flow when hero visible) ── */}
            {!filterFixed && (
                <div className="lg:hidden w-full border-b border-stone-400 overflow-x-auto bg-stone-200" style={{ scrollbarWidth: "none" }}>
                    <div className="flex gap-0 px-6 py-3 w-max">
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${
                                    activeCategory === cat ? "text-zinc-900 border-golden-amber" : "text-zinc-400 border-transparent hover:text-zinc-600"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── MOBILE FILTER ROW (fixed when hero scrolled out) ── */}
            <div className={`lg:hidden fixed top-0 left-0 w-full z-40 border-b border-stone-400 overflow-x-auto bg-stone-200 transition-transform duration-300 ${filterFixed && showFilter ? 'translate-y-20 sm:translate-y-28' : '-translate-y-full'}`} style={{ scrollbarWidth: "none" }}>
                <div className="flex gap-0 px-6 py-3 w-max">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${
                                activeCategory === cat ? "text-zinc-900 border-golden-amber" : "text-zinc-400 border-transparent hover:text-zinc-600"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── MAIN: vertical sidebar + grid ── */}
            <div className={`flex items-start lg:pt-0 ${filterFixed ? 'pt-14' : ''}`}>
 
                {/* ── VERTICAL FILTER SIDEBAR ── */}
                <aside ref={sidebarRef} style={{ top: `${sidebarTop}px` }} className="hidden lg:flex flex-col w-44 shrink-0 sticky py-10 px-6 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5">
                            Filtrar
                        </p>
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative text-left py-2 text-sm font-semibold transition-colors duration-200 pl-4 ${
                                    activeCategory === cat ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                                }`}
                            >
                                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-golden-amber transition-all duration-300 ${activeCategory === cat ? "h-5" : "h-0"}`} />
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>
 
                {/* ── PHOTO GRID ── */}
                <div className="flex-1 p-6 lg:p-8 min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {filtered.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: i * 0.04 }}
                                    onClick={() => setSelected(p.id)}
                                    className="group relative break-inside-avoid cursor-pointer overflow-hidden bg-stone-100 shadow-sm"
                                >
                                    <img
                                        src={p.images[0]}
                                        alt={p.title}
                                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.05]"
                                    />
 
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />
 
                                    {/* Category tag — slides up from bottom on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-dark-golden self-start">
                                            {p.category}
                                        </span>
                                        <h3 className="text-white font-bold text-sm leading-snug">
                                            {p.title}
                                        </h3>
                                    </div>
 
                                    {/* Dark golden left border sweep */}
                                    <div className="absolute top-0 left-0 w-1 h-0 bg-dark-golden transition-all duration-300 group-hover:h-full" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
 
                    {filtered.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-zinc-400 text-sm font-medium">Nenhum projeto encontrado nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── BOTTOM COUNT (desktop) ── */}
            <div className="hidden lg:block border-t border-stone-400 px-10 py-8 w-44">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeCategory}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-black text-dark-golden tabular-nums leading-none"
                    >
                        {String(filtered.length).padStart(2, "0")}
                    </motion.p>
                </AnimatePresence>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-2">
                    {activeCategory === "Todos" ? "Projetos" : activeCategory}
                </p>
            </div>

            {/* ── CLOSING CTA ── */}
            <section className="bg-zinc-900 py-20 lg:py-28">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div>
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-3">Tem um projeto em mente?</p>
                            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight max-w-lg">
                                Vamos construir algo juntos
                            </h2>
                            <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-md">
                                Orçamento gratuito e sem compromisso. Respondemos em menos de 24 horas.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                            <a href="/contacto" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-dark-golden text-zinc-900 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors duration-200">
                                Pedir orçamento
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 pt-10 border-t border-zinc-800/80 flex flex-wrap gap-x-8 gap-y-4">
                        {[
                            { icon: <GoShieldCheck className="w-4 h-4 text-dark-golden" />, text: "Garantia em todos os trabalhos" },
                            { icon: <BsChatQuote className="w-4 h-4 text-dark-golden" />, text: "Orçamento gratuito e sem compromisso" },
                            { icon: <GoShieldCheck className="w-4 h-4 text-dark-golden" />, text: "Fabricação própria" },
                            { icon: <BsChatQuote className="w-4 h-4 text-dark-golden" />, text: "50+ anos de experiência" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-xs text-zinc-400 font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
 
            {/* ── MODAL ── */}
            {projeto && (
                <ProjectModal
                    projeto={projeto}
                    onClose={close}
                    onPrev={prev}
                    onNext={next}
                />
            )}

            <Footer />
        </div>
    );
}