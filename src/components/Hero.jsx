import oficina from "@/assets/Home/Hero1.png"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background image */}
            <img
                src={oficina}
                alt="Syslobo — Serralharia"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-stone-950/90 via-stone-950/70 to-stone-950/40" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto py-20 pt-28 sm:py-32 sm:pt-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    {/* Accent label */}
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-golden mb-6 border-l-2 border-golden pl-3"
                    >
                        Serralharia desde 1975
                    </motion.span>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Construímos o que{" "}
                        <span className="text-golden">imaginar.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-xl">
                        Portas, janelas, portões, grades, fachadas e coberturas — tudo feito à medida, com a qualidade e rigor de mais de 50 anos de experiência.
                    </p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="/orcamento"
                            className="px-8 py-3.5 bg-golden hover:bg-golden/90 text-stone-950 font-bold text-sm uppercase tracking-wide transition-colors duration-300"
                        >
                            Pedir Orçamento
                        </a>
                        <a
                            href="/galeria"
                            className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-semibold text-sm uppercase tracking-wide transition-colors duration-300"
                        >
                            Ver Trabalhos
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="relative h-10 flex flex-col items-center">
                    {/* Vertical Line Stem */}
                    <div className="w-px h-full overflow-hidden">
                        <motion.div
                            animate={{
                                y: ["-100%", "0%", "0%", "0%"],
                                opacity: [1, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                times: [0, 0.35, 0.75, 1],
                                repeatDelay: 0.3
                            }}
                            className="w-full h-full bg-golden"
                        />
                    </div>

                    {/* Arrow Head (The V) */}
                    <svg
                        className="w-4 h-3 -mt-px"
                        viewBox="0 0 16 8"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                        <motion.path
                            d="M8 7L1 1"
                            animate={{
                                pathLength: [0, 0, 1, 1, 0],
                                opacity:    [0, 0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                times: [0, 0.35, 0.55, 0.75, 1],
                                repeatDelay: 0.3
                            }}
                        />
                        <motion.path
                            d="M8 7L15 1"
                            animate={{
                                pathLength: [0, 0, 1, 1, 0],
                                opacity:    [0, 0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                times: [0, 0.35, 0.55, 0.75, 1],
                                repeatDelay: 0.3
                            }}
                        />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}