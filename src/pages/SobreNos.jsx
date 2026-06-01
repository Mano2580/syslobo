import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { GoShieldCheck } from 'react-icons/go'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { RiTeamLine } from 'react-icons/ri'
import { BsStars } from 'react-icons/bs'
import oficina from '@/assets/oficina.jpg'
import ex1 from '@/assets/ex1.jpg'
import ex2 from '@/assets/ex2.jpg'

const valores = [
    {
        icon: <GoShieldCheck className="w-7 h-7 text-golden" />,
        title: 'Qualidade',
        desc: 'Cada projeto é executado com os mais altos padrões de rigor e acabamento.',
    },
    {
        icon: <HiOutlineWrenchScrewdriver className="w-7 h-7 text-golden" />,
        title: 'Artesanato',
        desc: 'Valorizamos o trabalho manual — cada peça é única e feita à medida.',
    },
    {
        icon: <RiTeamLine className="w-7 h-7 text-golden" />,
        title: 'Compromisso',
        desc: 'Cumprimos prazos e mantemos uma comunicação transparente do início ao fim.',
    },
    {
        icon: <BsStars className="w-7 h-7 text-golden" />,
        title: 'Inovação',
        desc: 'Combinamos técnicas tradicionais com tecnologia moderna para melhores resultados.',
    },
]

const marcos = [
    { year: '1975', title: 'Fundação', desc: 'A Syslobo é fundada como pequena oficina de serralharia em Carapeços.' },
    { year: '1990', title: 'Expansão', desc: 'Ampliação das instalações e início da produção de caixilharia em alumínio.' },
    { year: '2005', title: 'Modernização', desc: 'Investimento em equipamento industrial e automatismos de portões.' },
    { year: '2025', title: 'Hoje', desc: 'Mais de 3000 projetos entregues e uma referência no setor em Barcelos e região.' },
]

export default function SobreNos() {
    return (
        <div>
            <Navbar />

            <div className="bg-stone-300 min-h-screen">

                {/* ── HERO ── */}
                <section className="relative bg-zinc-900 overflow-hidden">
                    <img
                        src={oficina}
                        alt="Oficina Syslobo"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-zinc-900/60 to-zinc-900" />
                    <div className="relative container mx-auto px-6 py-28 pt-40 sm:pt-44">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.25em] mb-4">
                                Desde 1975
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none max-w-xl">
                                Quem<br />Somos
                            </h1>
                            <p className="mt-5 text-zinc-400 text-base leading-relaxed max-w-lg">
                                Mais de 50 anos a transformar metal em soluções — com a mesma dedicação do primeiro dia.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── HISTÓRIA ── */}
                <section className="bg-stone-200 py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            {/* Text */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
                                    A Nossa História
                                </p>
                                <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900 mb-6">
                                    50 Anos de<br />Experiência
                                </h2>
                                <div className="space-y-4 text-zinc-600 leading-relaxed">
                                    <p>
                                        A Syslobo nasceu em 1975 como uma pequena oficina de serralharia em Carapeços, Barcelos. 
                                        Fundada com a ambição de oferecer trabalho de qualidade à comunidade local, rapidamente se 
                                        tornou referência na região pelo rigor técnico e pelo cuidado com cada detalhe.
                                    </p>
                                    <p>
                                        Ao longo das décadas, crescemos e modernizámo-nos — mas nunca perdemos a essência artesanal 
                                        que nos define. Hoje, combinamos a experiência de gerações com equipamento moderno para oferecer 
                                        soluções completas em serralharia, caixilharia e estruturas metálicas.
                                    </p>
                                </div>
                                <div className="flex gap-10 mt-10">
                                    <div className="border-l border-golden/70 pl-6">
                                        <div className="text-4xl font-black tracking-tighter text-zinc-900">50 +</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1">Anos</div>
                                    </div>
                                    <div className="border-l border-golden/70 pl-6">
                                        <div className="text-4xl font-black tracking-tighter text-zinc-900">3000 +</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1">Projetos</div>
                                    </div>
                                    <div className="border-l border-golden/70 pl-6">
                                        <div className="text-4xl font-black tracking-tighter text-zinc-900">2000 +</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1">Clientes</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={ex1}
                                        alt="Trabalhos Syslobo"
                                        className="w-full aspect-4/3 object-cover"
                                    />
                                </div>
                                {/* Accent block */}
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-golden/30 -z-10" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── MISSÃO ── */}
                <section className="relative bg-stone-800 py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={ex2}
                            alt=""
                            className="w-full h-full object-cover opacity-10 grayscale"
                        />
                        <div className="absolute inset-0 bg-stone-800/80" />
                    </div>
                    <div className="relative container mx-auto px-6 text-center max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.25em] mb-4">
                                A Nossa Missão
                            </p>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                                Construir com Rigor,<br />Entregar com Confiança
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed font-light">
                                A nossa missão é simples: transformar o metal em soluções duradouras e funcionais, 
                                sem nunca comprometer a qualidade. Trabalhamos lado a lado com cada cliente para 
                                garantir que o resultado final supera as expectativas — dentro do prazo e do orçamento.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* ── PERCURSO (TIMELINE) ── */}
                <section className="bg-stone-200 py-20 cursor-default">
                    <div className="container mx-auto px-6">
                        <div className="mb-12">
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
                                O nosso percurso
                            </p>
                            <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900">
                                Marcos Importantes
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-300">
                            {marcos.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.12 }}
                                    className="bg-stone-200 p-8 group"
                                >
                                    <div className="text-5xl font-black tracking-tighter text-dark-golden">
                                        {m.year}
                                    </div>
                                    <h3 className="text-zinc-900 font-bold text-sm uppercase tracking-wider mt-4 mb-2">
                                        {m.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {m.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── VALORES ── */}
                <section className="bg-stone-300 py-20">
                    <div className="container mx-auto px-6">
                        <div className="mb-12">
                            <p className="text-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
                                O que nos define
                            </p>
                            <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900">
                                Os Nossos Valores
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-stone-300 border border-stone-300">
                            {valores.map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-8 flex flex-col gap-4 group hover:bg-stone-300 transition-colors duration-300"
                                >
                                    <div className="w-12 h-12 border border-stone-300 group-hover:border-golden/50 flex items-center justify-center transition-colors duration-300">
                                        {v.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-zinc-900 font-bold text-sm uppercase tracking-wider mb-2">
                                            {v.title}
                                        </h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">
                                            {v.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* ── CTA ── */}
                <section className="bg-stone-900 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                                Tem um projeto em mente?
                            </h2>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                Fale connosco — sem compromisso. Respondemos em menos de 24 horas.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/orcamento"
                                    className="px-8 py-3.5 bg-golden hover:bg-golden/90 text-stone-950 font-bold text-sm uppercase tracking-wide transition-colors duration-300"
                                >
                                    Pedir Orçamento
                                </a>
                                <a
                                    href="/contactos"
                                    className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-300"
                                >
                                    Contactar
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    )
}
