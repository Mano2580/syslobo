import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ex1 from "@/assets/ex1.jpg";
import ex2 from "@/assets/ex2.jpg";
import ex3 from "@/assets/ex3.jpg";
import { GoShieldCheck } from "react-icons/go";
import { BsChatQuote } from "react-icons/bs";

const servicos = [
    {
        id: "portas",
        label: "Portas",
        title: "Portas Metálicas",
        tagline: "Segurança e acabamento em cada detalhe.",
        description:
            "Fabricamos e instalamos portas metálicas para uso residencial, comercial e industrial. Cada porta é produzida à medida, com atenção ao design e à durabilidade. Trabalhamos com aço galvanizado, alumínio termolacado e ferro forjado, com acabamentos personalizados.",
        materials: ["Aço galvanizado", "Alumínio termolacado", "Ferro forjado", "Inox"],
        includes: [
            "Fabrico à medida",
            "Instalação e ajuste",
            "Fechaduras e acessórios incluídos",
            "Tratamento anti-corrosivo",
        ],
        image: ex1,
    },
    {
        id: "janelas",
        label: "Janelas",
        title: "Janelas e Caixilharia",
        tagline: "Isolamento térmico e acústico de alto desempenho.",
        description:
            "Produzimos janelas e caixilharia em alumínio com corte térmico, ideais para eficiência energética. Disponíveis em sistemas de correr, basculante ou projetante, com vidro simples ou duplo. Vasta gama de cores e acabamentos para se integrar em qualquer arquitetura.",
        materials: ["Alumínio com corte térmico", "PVC", "Alumínio standard"],
        includes: [
            "Vidro simples ou duplo",
            "Sistemas de correr, oscilobatente e projetante",
            "Vedação perimetral incluída",
            "Montagem e acabamento final",
        ],
        image: ex2,
    },
    {
        id: "portoes",
        label: "Portões",
        title: "Portões e Vedações",
        tagline: "Entrada marcante, segurança garantida.",
        description:
            "Dos portões de correr automáticos a portões batentes artesanais, projetamos e instalamos soluções completas para habitações e espaços industriais. Possibilidade de automatização com comando remoto, teclado de código ou intercomunicador.",
        materials: ["Aço", "Ferro forjado", "Alumínio", "Inox"],
        includes: [
            "Manual ou automático",
            "Comando remoto e acessórios",
            "Guias e perfis incluídos",
            "Pintura e tratamento de superfície",
        ],
        image: ex3,
    },
    {
        id: "fachadas",
        label: "Fachadas",
        title: "Fachadas Metálicas",
        tagline: "Estética e funcionalidade na envolvente do edifício.",
        description:
            "Projetamos e instalamos fachadas metálicas em alumínio e aço para edifícios residenciais, comerciais e industriais. Soluções com perfis de alto desempenho, acabamentos personalizados e integração arquitetónica. Combina proteção climática com identidade visual marcante.",
        materials: ["Alumínio lacado", "Alumínio anodizado", "Aço Corten", "Compósito"],
        includes: [
            "Projeto e desenho técnico",
            "Perfis e painéis à medida",
            "Montagem e fixação em obra",
            "Acabamento e tratamento anti-corrosivo",
        ],
        image: ex1,
    },
    {
        id: "grades",
        label: "Grades",
        title: "Grades de Segurança",
        tagline: "Proteção sem comprometer o design.",
        description:
            "Fabricamos grades de segurança para janelas, portas e varandas com design moderno e resistência comprovada. Podem ser fixas ou com sistema de abertura com trava de segurança certificada. Personalizadas em forma, cor e padrão.",
        materials: ["Ferro", "Aço inox", "Alumínio"],
        includes: [
            "Fixas ou com abertura certificada",
            "Pintura anti-corrosiva",
            "Instalação em alvenaria ou caixilharia",
            "Padrões e designs personalizados",
        ],
        image: ex2,
    },
    {
        id: "coberturas",
        label: "Coberturas",
        title: "Coberturas e Pérgolas",
        tagline: "Proteção e design no espaço exterior.",
        description:
            "Fabricamos e instalamos coberturas metálicas para garagens, terraços, pátios e espaços industriais. Desde marquises simples a pérgolas com lâminas orientáveis, cada solução é pensada para combinar funcionalidade, durabilidade e estética.",
        materials: ["Aço galvanizado", "Alumínio", "Aço inox"],
        includes: [
            "Projeto e cálculo estrutural",
            "Fabrico em oficina própria",
            "Montagem e fixação em obra",
            "Galvanização ou pintura epoxy",
        ],
        image: ex3,
    },
];
 
const fornecedores = [
    { id: 1, name: "Fornecedor A", tagline: "Alumínio e caixilharia" },
    { id: 2, name: "Fornecedor B", tagline: "Automatismos e motores" },
    { id: 3, name: "Fornecedor C", tagline: "Aço e perfis metálicos" },
    { id: 4, name: "Fornecedor D", tagline: "Tratamentos de superfície" },
];
 
function MaterialChip({ label }) {
    return (
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 px-3 py-1 bg-white">
            {label}
        </span>
    );
}


export default function Servicos() {

    const [activeSection, setActiveSection] = useState("portas");
    const sectionRefs = useRef({});
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
 
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);
 
    const scrollTo = (id) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

  return (
    <div>
      <Navbar />
       <div className="bg-stone-300 min-h-screen">
 
            {/* ── HERO ── */}
            <section className="relative bg-zinc-900 overflow-hidden">
                <img
                    src={ex3}
                    alt="Serviços"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-b from-zinc-900/60 to-zinc-900" />
                <div className="relative container mx-auto px-6 py-28 pt-40 sm:pt-44 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.25em] mb-4">
                            O que fazemos
                        </p>
                        <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none max-w-xl">
                            Os Nossos<br />Serviços
                        </h1>
                        <p className="mt-5 text-zinc-400 text-base leading-relaxed max-w-lg">
                            Soluções metálicas à medida para habitação, comércio e indústria.
                            Fabricação própria, instalação e garantia em todos os trabalhos.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 lg:pb-1"
                    >
                        <a
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm bg-golden text-zinc-900 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors duration-200"
                        >
                            Pedir orçamento
                        </a>
                    </motion.div>
                </div>
            </section>
 
            {/* ── MOBILE PILL NAV ── */}
            <div className="lg:hidden bg-white border-b border-stone-200 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <div className="flex gap-2 px-6 py-3 w-max">
                    {servicos.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => scrollTo(s.id)}
                            className={`shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest border transition-colors duration-200 ${
                                activeSection === s.id
                                    ? "bg-zinc-900 text-white border-zinc-900"
                                    : "bg-white text-zinc-400 border-stone-200 hover:border-zinc-400 hover:text-zinc-700"
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>
 
            {/* ── SIDEBAR + CONTENT ── */}
            <div className="container mx-auto px-6">
                <div className="flex gap-0 lg:gap-16 items-start">
 
                    {/* Sidebar */}
                    <aside ref={sidebarRef} style={{ top: `${sidebarTop}px` }} className="hidden lg:flex flex-col w-44 shrink-0 sticky py-16 gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 mb-4 pl-2">
                            Serviços
                        </p>
                        {servicos.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={`group relative text-left px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                                    activeSection === s.id
                                        ? "text-zinc-900"
                                        : "text-zinc-400 hover:text-zinc-700"
                                }`}
                            >
                                <span
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-golden transition-all duration-300 ${
                                        activeSection === s.id ? "h-5" : "h-0 group-hover:h-3"
                                    }`}
                                />
                                {s.label}
                            </button>
                        ))}
 
                        <div className="mt-8 pt-8 border-t border-stone-400 pl-4 flex flex-col gap-3">
                            <a
                                href="/contacto"
                                className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-golden pb-0.5 self-start hover:scale-105 transition-colors duration-200"
                            >
                                Pedir orçamento
                            </a>
                        </div>
                    </aside>
 
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {servicos.map((servico, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <section
                                    key={servico.id}
                                    id={servico.id}
                                    ref={(el) => { sectionRefs.current[servico.id] = el; }}
                                    className="py-16 border-b border-stone-400 last:border-b-0 scroll-mt-8"
                                >
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${!isEven ? "md:[&>*:first-child]:order-last" : ""}`}>
 
                                        {/* Image */}
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -12 : 12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="relative group"
                                        >
                                            <div className="relative overflow-hidden aspect-4/3">
                                                <img
                                                    src={servico.image}
                                                    alt={servico.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className={`absolute top-0 w-10 h-10 border-t-2 border-dark-golden ${isEven ? "right-0 border-r-2" : "left-0 border-l-2"}`} />
                                                <div className={`absolute bottom-0 w-10 h-10 border-b-2 border-dark-golden ${isEven ? "left-0 border-l-2" : "right-0 border-r-2"}`} />
                                            </div>
                                        </motion.div>
 
                                        {/* Text */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            className="flex flex-col gap-5"
                                        >
                                            <div>
                                                <p className="text-dark-golden text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                                                    {servico.label}
                                                </p>
                                                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-tight">
                                                    {servico.title}
                                                </h2>
                                                <p className="mt-1 text-zinc-400 text-sm font-medium italic">
                                                    {servico.tagline}
                                                </p>
                                            </div>
 
                                            <p className="text-zinc-600 text-sm leading-relaxed">
                                                {servico.description}
                                            </p>
 
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                                                    Incluído
                                                </p>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                                                    {servico.includes.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                                                            <GoShieldCheck className="w-3.5 h-3.5 text-dark-golden mt-0.5 shrink-0" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
 
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                                                    Materiais disponíveis
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {servico.materials.map((m) => (
                                                        <MaterialChip key={m} label={m} />
                                                    ))}
                                                </div>
                                            </div>
 
                                        </motion.div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
 
            {/* ── SUPPLIERS ── */}
            <section className="bg-stone-500/80 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            Qualidade assegurada
                        </p>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                            Os Nossos Parceiros
                        </h2>
                        <p className="mt-3 text-sm text-stone-200 max-w-md mx-auto">
                            Os nossos parceiros de referência ajudam a garantir materiais de primeira qualidade em cada projeto.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-stone-600 border border-stone-600">
                        {fornecedores.map((f) => (
                            <motion.div
                                key={f.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="group flex flex-col items-center justify-center gap-3 py-12 px-8 hover:bg-stone-400 transition-colors duration-200 cursor-pointer"
                            >
                                <div className="w-28 h-10 bg-stone-600 group-hover:bg-stone-500 transition-colors duration-200 flex items-center justify-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-stone-200 group-hover:text-white transition-colors duration-200">
                                        {f.name}
                                    </span>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.12em] text-stone-200 text-center font-medium">
                                    {f.tagline}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
 
            {/* ── CLOSING CTA ── */}
            <section className="bg-stone-700 py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-3">
                                Pronto para começar?
                            </p>
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight max-w-lg">
                                Fale connosco sobre o seu projeto
                            </h2>
                            <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-md">
                                Orçamento gratuito e sem compromisso. Respondemos em menos de 24 horas.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <a
                                href="/orcamento"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-golden text-zinc-900 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors duration-200"
                            >
                                Pedir orçamento
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 pt-10 border-t border-stone-700 flex flex-wrap gap-6">
                        {[
                            { icon: <GoShieldCheck className="w-4 h-4 text-golden" />, text: "Garantia em todos os trabalhos" },
                            { icon: <BsChatQuote className="w-4 h-4 text-golden" />, text: "Orçamento gratuito e sem compromisso" },
                            { icon: <GoShieldCheck className="w-4 h-4 text-golden" />, text: "Fabricação própria" },
                            { icon: <BsChatQuote className="w-4 h-4 text-golden" />, text: "50+ anos de experiência" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                {item.icon}
                                <span className="text-xs text-zinc-400 font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
      <Footer />
    </div>
  )
}
