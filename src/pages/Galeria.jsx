import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useCallback, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ex1 from "@/assets/ex1.jpg";
import ex2 from "@/assets/ex2.jpg";
import ex3 from "@/assets/ex3.jpg";
import { GoShieldCheck } from "react-icons/go";
import { BsChatQuote } from "react-icons/bs";
 
const projetos = [
    { id: 1,  category: "Portões",    title: "Portão Residencial Automatizado",     description: "Portão de correr em aço com motorização e comando remoto.", images: [ex1, ex2, ex3] },
    { id: 2,  category: "Grades",     title: "Grades de Segurança Modernas",         description: "Grades em ferro lacado com sistema de abertura certificado.", images: [ex2, ex1, ex3] },
    { id: 3,  category: "Estruturas", title: "Cobertura Metálica para Garagem",      description: "Estrutura em aço galvanizado com telha sandwich.", images: [ex3, ex1, ex2] },
    { id: 4,  category: "Janelas",    title: "Caixilharia em Alumínio Termolacado",  description: "Janelas oscilobatentes com corte térmico e vidro duplo.", images: [ex1, ex3, ex2] },
    { id: 5,  category: "Portões",    title: "Portão Industrial de Correr",          description: "Portão de grandes dimensões para armazém industrial.", images: [ex2, ex3, ex1] },
    { id: 6,  category: "Estores",    title: "Estores Exteriores Motorizados",       description: "Estores em alumínio lacado com motor Somfy integrado.", images: [ex3, ex2, ex1] },
    { id: 7,  category: "Grades",     title: "Grade de Varanda em Ferro Forjado",    description: "Grade artesanal com motivos geométricos e tratamento anti-corrosivo.", images: [ex1, ex2, ex3] },
    { id: 8,  category: "Estruturas", title: "Pérgola Metálica com Cobertura",       description: "Pérgola em aço com lâminas orientáveis e LED integrado.", images: [ex2, ex1, ex3] },
    { id: 9,  category: "Portões",    title: "Portão Batente de Ferro Forjado",      description: "Portão batente a dois vãos em ferro forjado, preto mate.", images: [ex3, ex1, ex2] },
    { id: 10, category: "Janelas",    title: "Janelas de Correr em Alumínio",        description: "Sistema de correr de grande vão, perfis slim.", images: [ex1, ex3, ex2] },
    { id: 11, category: "Estores",    title: "Caixa de Estore Embutida",             description: "Solução de estore com caixa embutida na parede.", images: [ex2, ex3, ex1] },
    { id: 12, category: "Estruturas", title: "Escada Metálica Interior",             description: "Escada em aço inox com degraus em madeira.", images: [ex3, ex2, ex1] },
];
 
const categorias = ["Todos", "Portões", "Grades", "Estruturas", "Janelas", "Estores"];
 
function ProjectModal({ projeto, selectedIndex, total, onClose, onPrev, onNext }) {
    const [activeImg, setActiveImg] = useState(0);
    const imageRefs = useRef([]);
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => { setActiveImg(0); imageRefs.current = []; }, [projeto.id]);
 
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
 
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 lg:p-8" onClick={onClose}>
            <div className="flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-stone-300 border border-stone-400 shadow-2xl rounded-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex-1 overflow-y-auto bg-stone-300" style={{ scrollbarWidth: "none" }}
                    onScroll={(e) => {
                        const c = e.currentTarget;
                        const center = c.scrollTop + c.clientHeight / 2;
                        let closest = 0, minDist = Infinity;
                        imageRefs.current.forEach((el, i) => {
                            if (!el) return;
                            const mid = el.offsetTop + el.offsetHeight / 2;
                            const dist = Math.abs(mid - center);
                            if (dist < minDist) { minDist = dist; closest = i; }
                        });
                        setActiveImg(closest);
                    }}
                >
                    <div className="flex flex-col gap-6 p-6">
                        {projeto.images.map((img, i) => (
                            <img 
                                key={i} 
                                ref={(el) => { imageRefs.current[i] = el; }} 
                                src={img} 
                                alt={`${projeto.title} ${i + 1}`} 
                                className="w-full max-h-[65vh] object-contain mx-auto drop-shadow-sm rounded-sm" 
                            />
                        ))}
                    </div>
                </div>
 
                <div className="w-full lg:w-72 flex flex-col bg-stone-300 border-t lg:border-t-0 lg:border-l border-stone-400 shrink-0">
                    <div className="p-6 border-b border-stone-400 bg-stone-300">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-golden bg-amber-50 border border-amber-100 px-2 py-0.5">{projeto.category}</span>
                        <h3 className="text-zinc-900 font-bold text-lg mt-3 leading-snug">{projeto.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mt-3">{projeto.description}</p>
                    </div>
                    <div className="flex lg:flex-col gap-3 p-6 overflow-x-auto lg:overflow-x-visible bg-stone-300 flex-1" style={{ scrollbarWidth: "none" }}>
                        {projeto.images.map((img, i) => (
                            <img key={i} src={img} alt={`miniatura ${i + 1}`}
                                onClick={() => imageRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                                className={`w-16 lg:w-full object-cover rounded-sm cursor-pointer shrink-0 transition-all duration-200 border-2 ${i === activeImg ? "border-dark-golden opacity-100 scale-105 lg:scale-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                            />
                        ))}
                    </div>
                    <div className="p-4 border-t border-stone-400 flex items-center justify-between bg-stone-300">
                        <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{selectedIndex + 1} / {total}</span>
                        <div className="flex gap-2">
                            <button onClick={onPrev} className="w-8 h-8 border border-stone-400 hover:border-dark-golden text-zinc-500 hover:text-dark-golden text-sm flex items-center justify-center transition-all duration-200 rounded-sm">←</button>
                            <button onClick={onNext} className="w-8 h-8 border border-stone-400 hover:border-dark-golden text-zinc-500 hover:text-dark-golden text-sm flex items-center justify-center transition-all duration-200 rounded-sm">→</button>
                        </div>
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
    const [sidebarTop, setSidebarTop] = useState(96);

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
            <section className="relative bg-zinc-900 overflow-hidden">
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
 
            {/* ── MAIN: vertical sidebar + grid ── */}
            <div className="flex items-start">
 
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

                {/* ── MOBILE FILTER ROW ── */}
                <div className="lg:hidden w-full border-b border-stone-400 overflow-x-auto bg-white sticky top-16 z-20" style={{ scrollbarWidth: "none" }}>
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
                    selectedIndex={selectedIndex}
                    total={filtered.length}
                    onClose={close}
                    onPrev={prev}
                    onNext={next}
                />
            )}

            <Footer />
        </div>
    );
}