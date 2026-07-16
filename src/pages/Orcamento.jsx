import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { GoShieldCheck } from 'react-icons/go'
import { GoClock } from 'react-icons/go'
import { SlLocationPin } from 'react-icons/sl'
 
 
const trustItems = [
  { icon: <GoShieldCheck className="w-5 h-5 text-dark-golden" />, title: "Gratuito e sem compromisso", desc: "Nenhum custo associado ao pedido de orçamento." },
  { icon: <GoClock className="w-5 h-5 text-dark-golden" />,        title: "Resposta em 24 horas",       desc: "Entramos em contacto no dia útil seguinte." },
  { icon: <SlLocationPin className="w-5 h-5 text-dark-golden" />,  title: "Visita ao local incluída",   desc: "Se necessário, deslocamo-nos para avaliar o projeto." },
]
 
const STEPS = ["Dados", "Projeto", "Confirmação"]
 
const stepVariants = {
    enter:  { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0  },
    exit:   { opacity: 0, x: -24 },
}
 
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve({
    name: file.name,
    type: file.type,
    content: reader.result.split(',')[1]
  });
  reader.onerror = error => reject(error);
});

async function sendEmail({ name, email, address, phone, description, attachments }) {
  const res = await fetch('https://email-worker.miguelmanoalves.workers.dev/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, address, phone, description, attachments }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? 'Failed to send email');
  }

  return res.json();
}

export default function OrcamentoPage() {
    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [files, setFiles] = useState([])

    const [form, setForm] = useState({
      description:   '',
      name:          '',
      email:         '',
      phone:         '',
      address:       '',
    })

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))
    const setPhone = (e) => setForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))

    const step1Valid = form.description.trim().length > 0 || files.length > 0
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    const step2Valid = form.name.trim() && emailValid && form.phone.trim() && form.address.trim()

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
          const attachments = await Promise.all(files.map(toBase64));

          await sendEmail({
            name: form.name,
            email: form.email,
            address: form.address,
            phone: form.phone,
            description: form.description,
            attachments,
          })
          setSubmitted(true)
        } catch (err) {
          console.error('Error submitting form:', err)
          setError(err.message || 'Falha ao enviar o email. Por favor, tente novamente.')
        } finally {
          setLoading(false)
        }
    }
 
    const inputClass = "border-b border-stone-400 bg-transparent px-0 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-dark-golden w-full"
    const labelClass = "text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400"
 
  return (
    <div className="bg-stone-200 min-h-screen">
      <Navbar />
 
      {/* ── HERO ── */}
      <section className="bg-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-800/80 to-zinc-800" />
        <div className="relative container mx-auto px-6 py-24 pt-40 sm:pt-44">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-dark-golden text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Orçamento
            </p>

            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none mb-4">
              Peça o seu<br />orçamento
            </h1>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Preencha o formulário em 3 passos simples. Gratuito, sem compromisso, resposta em 24 horas.
            </p>

          </motion.div>
        </div>
      </section>
 
      {/* ── FORM AREA ── */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <p className="text-dark-golden text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Processo Simples
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900">
              Orçamento à sua medida
            </h2>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
              Recolhemos apenas o essencial para lhe enviar uma proposta clara e ajustada ao seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,780px)_320px] lg:justify-between gap-8 items-start">
          <div className="w-full">
 
          {!submitted ? (
          <>
 
          {/* Form panel */}
          <div className="bg-stone-100 border border-stone-400 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {/* ── STEP 1 ── */}
              {step === 0 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25 }}
                  className="p-6 md:p-7 flex flex-col gap-7"
                >
                  <div>
                    <p className="text-dark-golden text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      Passo 1 de 3
                    </p>

                    <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                      Os seus dados
                    </h2>

                    <p className="text-zinc-400 text-xs mt-1">
                      Para entrarmos em contacto consigo com a proposta.
                    </p>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="name" className={labelClass}>
                        Nome completo
                      </label>
                      <input type="text" id="name" value={form.name} onChange={set('name')} placeholder="O seu nome" className={inputClass} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="phone" className={labelClass}>
                        Telefone
                      </label>
                      <input type="tel" id="phone" value={form.phone} onChange={setPhone} inputMode="numeric" placeholder="912345678" className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input type="email" id="email" value={form.email} onChange={set('email')} placeholder="exemplo@email.com" className={inputClass} />
                      {form.email.trim() && !emailValid && (
                        <p className="text-red-500 text-[10px] mt-0.5">Email inválido</p>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="address" className={labelClass}>
                        Morada <span className="normal-case font-normal text-zinc-300"></span>
                      </label>
                      <input type="text" id="address" value={form.address} onChange={set('address')} placeholder="Rua, Cidade, Código Postal" className={inputClass} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-stone-300">
                    <button
                      onClick={() => step2Valid && setStep(1)}
                      disabled={!step2Valid}
                      className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        step2Valid ? 'text-zinc-900 hover:text-dark-golden cursor-pointer' : 'text-zinc-300 cursor-not-allowed'
                      }`}
                    >
                      Seguinte
                      <span className={`h-px transition-all duration-300 inline-block ${step2Valid ? 'w-8 bg-zinc-300 group-hover:w-14 group-hover:bg-dark-golden' : 'w-8 bg-stone-100'}`} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 1 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25 }}
                  className="p-6 md:p-7 flex flex-col gap-7"
                >
                  <div>
                    <p className="text-dark-golden text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      Passo 2 de 3
                    </p>

                    <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                      O seu projeto
                    </h2>

                    <p className="text-zinc-400 text-xs mt-1">
                      Descreva o projeto e, se tiver, anexe fotografias, plantas ou esboços.
                    </p>

                  </div>

                  {/* General info */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className={labelClass}>
                      Descrição do projeto <span className="normal-case font-normal text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={set('description')}
                      rows={3}
                      placeholder="Descreva o seu projeto: tipo de trabalho, medidas aproximadas."
                      className={inputClass + " resize-none"}
                    />
                  </div>

                  {/* File upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>
                      Fotografias ou esboço <span className="normal-case font-normal text-zinc-400/70">(opcional, mas recomendado)</span>
                    </label>

                    {files.length > 0 && (
                      <ul className="flex flex-col gap-1 mb-1">
                        {files.map((file, i) => (
                          <li key={i} className="flex items-center justify-between px-3 py-2 bg-stone-100 border border-stone-400">
                            <span className="text-xs text-zinc-700 truncate max-w-[80%]">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                              className="text-zinc-400 hover:text-zinc-700 text-xs ml-2 cursor-pointer transition-colors duration-200"
                              aria-label={`Remover ${file.name}`}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <label className="flex items-center gap-3 border border-dashed border-stone-400 px-4 py-4 cursor-pointer hover:border-zinc-600 transition-colors duration-200 group">
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors duration-200">
                        {files.length > 0 ? "Clique para adicionar mais ficheiros" : "Clique para selecionar ficheiros"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => setFiles(prev => {
                          const newFiles = Array.from(e.target.files)
                          const all = [...prev, ...newFiles]
                          return all.filter((file, i) => all.findIndex(f => f.name === file.name) === i)
                        })}
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-300">
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-800 transition-colors duration-200 cursor-pointer"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={() => step1Valid && setStep(2)}
                      disabled={!step1Valid}
                      className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        step1Valid ? 'text-zinc-900 hover:text-dark-golden cursor-pointer' : 'text-zinc-300 cursor-not-allowed'
                      }`}
                    >
                      Seguinte
                      <span className={`h-px transition-all duration-300 inline-block ${step1Valid ? 'w-8 bg-zinc-300 group-hover:w-14 group-hover:bg-dark-golden' : 'w-8 bg-stone-100'}`} />
                    </button>
                  </div>
                </motion.div>
              )}
 
 
              {/* ── STEP 3 — CONFIRMATION ── */}
              {step === 2 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25 }}
                  className="p-6 md:p-7 flex flex-col gap-7"
                >
                  <div>
                    <p className="text-dark-golden text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      Passo 3 de 3
                    </p>

                    <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                      Confirmação
                    </h2>

                    <p className="text-zinc-400 text-xs mt-1">
                      Reveja os seus dados antes de enviar.
                    </p>

                  </div>
 
                  {/* Summary */}
                  <div className="flex flex-col gap-0 border border-stone-400">
                    {/* Contact block */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                          Dados de contacto
                        </span>
                        <button onClick={() => setStep(0)} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors duration-200">
                          Editar
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Nome",     value: form.name    },
                          { label: "Telefone", value: form.phone   },
                          { label: "Email",    value: form.email   },
                          { label: "Morada",   value: form.address },
                        ].map((row, i) => (
                        <div key={i}>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                            {row.label}
                          </p>

                          <p className="text-sm text-zinc-700 mt-0.5">
                            {row.value}
                          </p>

                        </div>
                        ))}
                      </div>
                    </div>
                    {/* Project block */}
                    <div className="p-5 border-t border-stone-400">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                          Projeto
                        </span>
                        <button onClick={() => setStep(1)} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors duration-200">
                          Editar
                        </button>
                      </div>

                      <div className="flex flex-col gap-4">
                        {form.description && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                              Descrição do projeto
                            </p>

                            <p className="text-sm text-zinc-700 mt-0.5 leading-relaxed">
                              {form.description}
                            </p>

                          </div>
                        )}
                        {files.length > 0 && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                              Ficheiros
                            </p>

                            <p className="text-sm text-zinc-700 mt-0.5">
                              {files.map(f => f.name).join(', ')}
                            </p>

                          </div>
                        )}
                      </div>
                    </div>
 
                  </div>
 
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Ao submeter, autoriza o uso dos seus dados para contacto relacionado com este pedido de orçamento.
                  </p>
 
                  {error && (
                    <p className="text-red-500 text-xs mt-2">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-stone-300">
                    <button
                      onClick={() => setStep(1)}
                      disabled={loading}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-dark-golden transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'A enviar...' : 'Enviar pedido'}
                      <span className="w-8 h-px bg-zinc-300 group-hover:w-14 group-hover:bg-dark-golden transition-all duration-300 inline-block" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </>
          ) : (
 
          /* ── SUCCESS STATE ── */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-stone-100 border border-stone-400 shadow-sm p-8 md:p-10 flex flex-col items-center text-center gap-6"
          >
            <GoShieldCheck className="w-7 h-7 text-dark-golden" />
            
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                Pedido enviado
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mt-2 max-w-sm">
                Recebemos o seu pedido de orçamento. Entraremos em contacto em menos de 24 horas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-600 transition-colors duration-200">
                Voltar ao início
              </Link>
              <Link to="/galeria" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 text-zinc-500 text-xs font-bold uppercase tracking-wider hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-200">
                Ver galeria
              </Link>
            </div>
          </motion.div>
        )}

        </div>

        <aside className="flex flex-col gap-4 w-full lg:sticky lg:top-32">
          <div className="bg-stone-100 border border-stone-300 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-golden mb-4">
              Como Funciona
            </p>
            <ul className="flex flex-col gap-3">
              {STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-3">
                  <span className={`w-6 h-6 border text-[10px] font-bold flex items-center justify-center ${step >= i ? 'border-zinc-800 bg-zinc-800 text-white' : 'border-stone-400 text-zinc-400'}`}>
                    {i + 1}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${step >= i ? 'text-zinc-900' : 'text-zinc-500'}`}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-800 border border-zinc-700 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-golden mb-4">
              Garantias Syslobo
            </p>
            <div className="flex flex-col gap-4">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 text-dark-golden">{item.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wide">{item.title}</p>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        </div>

        </div>
      </section>
 
      <Footer />
    </div>
  )
}