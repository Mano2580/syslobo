
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#292724] text-zinc-400">
            {/* Conteúdo Principal */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Sobre */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Syslobo</h3>
                        <p className="text-sm leading-relaxed">
                            Empresa de serralharia com mais de 30 anos de experiência, especializada na fabricação e instalação de estruturas metálicas, portões, grades e muito mais.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <a href="https://www.facebook.com/syslobo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-fb-blue transition-colors duration-200">
                                <FaFacebookSquare size={22} />
                            </a>
                            <a href="https://www.instagram.com/syslobo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-ig-pink transition-colors duration-200">
                                <FaInstagramSquare size={22} />
                            </a>
                            <a href="https://www.linkedin.com/company/syslobo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-linkedin-blue transition-colors duration-200">
                                <FaLinkedin size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Links Úteis */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Links Úteis</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/sobre-nos" className="hover:text-golden transition-colors">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="/servicos" className="hover:text-golden transition-colors">
                                    Serviços
                                </a>
                            </li>
                            <li>
                                <a href="/galeria" className="hover:text-golden transition-colors">
                                    Galeria
                                </a>
                            </li>
                            <li>
                                <a href="/contactos" className="hover:text-golden transition-colors">
                                    Contactos
                                </a>
                            </li>
                            <li>
                                <a href="/orcamento" className="hover:text-golden transition-colors">
                                    Pedir Orçamento
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* Serviços */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Serviços</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Portas</li>
                            <li>Janelas</li>
                            <li>Portões</li>
                            <li>Estores</li>
                            <li>Grades de Segurança</li>
                            <li>Estruturas Metálicas</li>
                        </ul>
                    </div>


                    {/* Contactos */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">
                            Contactos
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <span className="block text-slate-400 text-xs uppercase tracking-wide">
                                    Telefone
                                </span>
                                <span>
                                    +351 253 881 617<br />
                                    +351 962 996 237<br /> 
                                    <span className="text-xs text-slate-600">
                                            (Chamada para a rede fixa/móvel nacional)
                                        </span>
                                </span>
                            </li>
                            <li>
                                <span className="block text-slate-400 text-xs uppercase tracking-wide">
                                    Email
                                </span>
                                <a href="mailto:geral@syslobo.pt" className="hover:text-golden transition-colors">
                                    geral@syslobo.pt
                                </a>
                            </li>
                            <li>
                                <span className="block text-slate-400 text-xs uppercase tracking-wide">
                                    Morada
                                </span>
                                Rua Padre Olavo Teixeira Martins, 161<br />
                                4750-392, Carapeços, Portugal
                            </li>
                            <li>
                                <span className="block text-slate-400 text-xs uppercase tracking-wide">
                                    Horário
                                </span>
                                Seg - Sex: 09h00 - 18h00
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barra inferior — informação legal */}
            <div className="border-t border-[#3a3734]">
                <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span>&copy; {new Date().getFullYear()} Syslobo, Lda. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
}