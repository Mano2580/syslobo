
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { GoShieldCheck } from 'react-icons/go'
import { GoClock } from 'react-icons/go'
import { SlLocationPin } from 'react-icons/sl'
 
const servicos = [
    { value: "portas",     label: "Portas",     subtypes: ["Portas de Abrir", "Portas de Correr", "Portas de Enrolar", "Portas de Vaivém"] },
    { value: "janelas",    label: "Janelas",    subtypes: ["Janelas de Abrir", "Janelas de Correr", "Janelas Fixas", "Janelas de Guilhotina"] },
    { value: "portoes",    label: "Portões",    subtypes: ["Portão de Batente", "Portão de Correr", "Portão Automático"] },
    { value: "grades",     label: "Grades",     subtypes: ["Grades Fixas", "Grades Amovíveis", "Grades com Porta"] },
    { value: "fachadas",   label: "Fachadas",   subtypes: ["Fachada Ventilada", "Revestimento em Alumínio", "Fachada Compósita", "Fachada em Aço Corten"] },
    { value: "coberturas", label: "Coberturas", subtypes: ["Marquise", "Pérgola", "Cobertura de Garagem", "Cobertura Industrial"] },
    { value: "outro",      label: "Outro",      subtypes: [] },
]
 
const trustItems = [
    { icon: <GoShieldCheck className="w-5 h-5 text-golden-amber" />, title: "Gratuito e sem compromisso", desc: "Nenhum custo associado ao pedido de orçamento." },
    { icon: <GoClock className="w-5 h-5 text-golden-amber" />,        title: "Resposta em 24 horas",       desc: "Entramos em contacto no dia útil seguinte." },
    { icon: <SlLocationPin className="w-5 h-5 text-golden-amber" />,  title: "Visita ao local incluída",   desc: "Se necessário, deslocamo-nos para avaliar o projeto." },
]
 
const STEPS = ["Dados", "Projeto", "Confirmação"]
 
const stepVariants = {
    enter:  { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0  },
    exit:   { opacity: 0, x: -24 },
}
 
export default function OrcamentoPage() {
    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [fileNames, setFileNames] = useState([])
    const [collapsedServices, setCollapsedServices] = useState(new Set())
    const [pendingDelete, setPendingDelete] = useState(null)
    const [expandedItems, setExpandedItems] = useState(new Set())

    const [form, setForm] = useState({
      services:      [],
      serviceDetails: {},
      description:   '',
      name:          '',
      email:         '',
      phone:         '',
      address:       '',
    })

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))
    const setPhone = (e) => setForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))

    const toggleService = (value) => {
      if (form.services.includes(value)) {
        if (value === 'outro') {
          setForm(prev => ({ ...prev, services: prev.services.filter(s => s !== value) }))
        } else {
          const detail = form.serviceDetails[value]
          const hasDetails = detail?.items?.some(item => item.subType || item.width || item.height)
          if (hasDetails) {
            setCollapsedServices(prev => new Set([...prev, value]))
            setPendingDelete({ type: 'service', svcValue: value })
          } else {
            removeService(value)
          }
        }
      } else {
        if (value === 'outro') {
          setForm(prev => ({ ...prev, services: [...prev.services, value] }))
        } else {
          setForm(prev => {
            const serviceDetails = { ...prev.serviceDetails }
            serviceDetails[value] = { quantity: 1, items: [{ subType: '', width: '', height: '' }] }
            return { ...prev, services: [...prev.services, value], serviceDetails }
          })
        }
      }
    }

    const removeService = (svcValue) => {
      setForm(prev => {
        const services = prev.services.filter(s => s !== svcValue)
        const serviceDetails = { ...prev.serviceDetails }
        delete serviceDetails[svcValue]
        return { ...prev, services, serviceDetails }
      })
      setCollapsedServices(prev => { const s = new Set(prev); s.delete(svcValue); return s })
      setExpandedItems(prev => {
        const next = new Set(prev)
        for (const key of prev) { if (key.startsWith(`${svcValue}-`)) next.delete(key) }
        return next
      })
    }

    const removeItem = (svcValue, idx) => {
      setForm(prev => {
        const items = (prev.serviceDetails[svcValue]?.items || []).filter((_, i) => i !== idx)
        return {
          ...prev,
          serviceDetails: {
            ...prev.serviceDetails,
            [svcValue]: { ...prev.serviceDetails[svcValue], quantity: items.length, items }
          }
        }
      })
      setExpandedItems(prev => { const s = new Set(prev); s.delete(`${svcValue}-${idx}`); return s })
    }

    const requestDeleteService = (svcValue) => setPendingDelete({ type: 'service', svcValue })
    const requestDeleteItem    = (svcValue, idx) => setPendingDelete({ type: 'item', svcValue, idx })
    const cancelDelete         = () => setPendingDelete(null)
    const confirmDeleteAction  = () => {
      if (!pendingDelete) return
      if (pendingDelete.type === 'service') removeService(pendingDelete.svcValue)
      else removeItem(pendingDelete.svcValue, pendingDelete.idx)
      setPendingDelete(null)
    }

    const toggleItemExpand = (svcValue, idx) => {
      const key = `${svcValue}-${idx}`
      setExpandedItems(prev => {
        const s = new Set(prev)
        if (s.has(key)) s.delete(key); else s.add(key)
        return s
      })
    }

    const collapseService = (value) => setCollapsedServices(prev => new Set([...prev, value]))
    const expandService  = (value) => setCollapsedServices(prev => { const s = new Set(prev); s.delete(value); return s })

    const setQuantity = (svcValue) => (e) => {
      const raw = e.target.value
      setForm(prev => ({
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          [svcValue]: { ...prev.serviceDetails[svcValue], quantity: raw }
        }
      }))
    }

    const commitQuantity = (svcValue) => () => {
      setForm(prev => {
        const qty = Math.max(1, parseInt(prev.serviceDetails[svcValue]?.quantity) || 1)
        const current = prev.serviceDetails[svcValue]?.items || []
        const items = Array.from({ length: qty }, (_, i) => current[i] || { subType: '', width: '', height: '' })
        return {
          ...prev,
          serviceDetails: {
            ...prev.serviceDetails,
            [svcValue]: { ...prev.serviceDetails[svcValue], quantity: qty, items }
          }
        }
      })
    }

    const setItemDetail = (svcValue, index, field) => (eOrValue) => {
      const val = typeof eOrValue === 'string' ? eOrValue : eOrValue.target.value
      setForm(prev => {
        const items = [...(prev.serviceDetails[svcValue]?.items || [])]
        items[index] = { ...items[index], [field]: val }
        return {
          ...prev,
          serviceDetails: {
            ...prev.serviceDetails,
            [svcValue]: { ...prev.serviceDetails[svcValue], items }
          }
        }
      })
    }

    const outroSelected = form.services.includes('outro')
    const step1Valid = form.services.length > 0 && (!outroSelected || form.description.trim().length > 0)
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    const step2Valid = form.name.trim() && emailValid && form.phone.trim() && form.address.trim()

    const handleSubmit = () => {
        console.log('Form submitted:', form)
        setSubmitted(true)
    }
 
    const inputClass = "border-b border-stone-400 bg-transparent px-0 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-golden w-full"
    const labelClass = "text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400"
 
  return (
    <div className="bg-stone-300 min-h-screen">
      <Navbar />
 
      {/* ── HERO ── */}
      <section className="bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900/80 to-zinc-900" />
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
 
      {/* ── TRUST STRIP ── */}
      <div className="bg-stone-200 border-b border-stone-400">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-300">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-6 px-4 first:pl-0 last:pr-0">
                <div className="w-9 h-9 border border-stone-400 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">
                    {item.title}
                  </p>

                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── FORM AREA ── */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
 
          {!submitted ? (
          <>
          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-12">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                    i < step
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : i === step
                    ? 'bg-stone-100 border-golden-amber text-golden-amber'
                    : 'bg-stone-200 border-stone-400 text-zinc-400'
                    }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
                    i === step ? 'text-zinc-900' : i < step ? 'text-zinc-500' : 'text-zinc-300'
                    }`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-4 mb-5 transition-colors duration-500 ${i < step ? 'bg-zinc-900' : 'bg-stone-400'}`} />
                )}
              </div>
            ))}
          </div>
 
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
                  className="p-8 flex flex-col gap-7"
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
                        step2Valid ? 'text-zinc-900 hover:text-golden-amber cursor-pointer' : 'text-zinc-300 cursor-not-allowed'
                      }`}
                    >
                      Seguinte
                      <span className={`h-px transition-all duration-300 inline-block ${step2Valid ? 'w-8 bg-zinc-400 group-hover:w-14 group-hover:bg-golden-amber' : 'w-8 bg-stone-200'}`} />
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
                  className="p-8 flex flex-col gap-7"
                >
                  <div>
                    <p className="text-dark-golden text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      Passo 2 de 3
                    </p>

                    <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                      O seu projeto
                    </h2>

                    <p className="text-zinc-400 text-xs mt-1">
                      Selecione os serviços pretendidos e indique os detalhes de cada um.
                    </p>

                  </div>

                  {/* Service multi-select */}
                  <div>
                    <label className={labelClass + " block mb-3"}>
                      Tipo de serviço <span className="normal-case font-normal text-zinc-400/70">(pode selecionar mais do que um)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {servicos.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => toggleService(s.value)}
                          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border transition-all duration-200 text-left ${
                            form.services.includes(s.value)
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-stone-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Per-service detail panels */}
                  {form.services.filter(v => v !== 'outro').length > 0 && (
                    <div className="flex flex-col gap-4">
                      {form.services.filter(v => v !== 'outro').map((value) => {
                        const svc = servicos.find(s => s.value === value)
                        const detail = form.serviceDetails[value] || { quantity: 1, items: [] }
                        const isCollapsed = collapsedServices.has(value)

                        if (isCollapsed) {
                          const isServicePending = pendingDelete?.type === 'service' && pendingDelete.svcValue === value
                          return (
                            <div key={value} className="border border-stone-300 bg-stone-50 p-5 flex flex-col gap-3">
                              {/* Group header */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={labelClass}>{svc.label}</p>
                                  <p className="text-sm font-semibold text-zinc-900 mt-0.5">
                                    {detail.quantity} {detail.quantity === 1 ? 'Unidade' : 'Unidades'}
                                  </p>
                                </div>
                                {isServicePending ? (
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-zinc-500">Remover tudo?</span>
                                    <button type="button" onClick={confirmDeleteAction} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200">Sim</button>
                                    <button type="button" onClick={cancelDelete} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors duration-200">Não</button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => expandService(value)} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer">
                                      Editar tudo
                                    </button>
                                    <button type="button" onClick={() => requestDeleteService(value)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                                      Remover
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Per-item rows */}
                              {(detail.items || []).map((item, idx) => {
                                const itemKey = `${value}-${idx}`
                                const isItemExpanded = expandedItems.has(itemKey)
                                const isItemPending = pendingDelete?.type === 'item' && pendingDelete.svcValue === value && pendingDelete.idx === idx
                                const parts = [item.subType, item.width && `L: ${item.width} cm`, item.height && `A: ${item.height} cm`].filter(Boolean)

                                return (
                                  <div key={idx} className="border-t border-stone-200 pt-3 flex flex-col gap-3">
                                    {isItemExpanded ? (
                                      <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                            {svc.label.replace(/s$/i, '')} {idx + 1}
                                          </p>
                                          <button type="button" onClick={() => toggleItemExpand(value, idx)} className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:text-golden-amber transition-colors duration-200 cursor-pointer">
                                            Confirmar
                                          </button>
                                        </div>
                                        {svc.subtypes.length > 0 && (
                                          <div>
                                            <label className={labelClass + " block mb-2"}>Tipo</label>
                                            <div className="flex flex-wrap gap-2">
                                              {svc.subtypes.map((sub) => (
                                                <button key={sub} type="button" onClick={() => setItemDetail(value, idx, 'subType')(sub === item.subType ? '' : sub)}
                                                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${item.subType === sub ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-stone-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'}`}>
                                                  {sub}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        <div className="flex gap-4">
                                          <div className="flex-1 flex flex-col gap-1.5">
                                            <label className={labelClass}>Largura (cm)</label>
                                            <input type="number" min="0" value={item.width || ''} onChange={setItemDetail(value, idx, 'width')} placeholder="ex: 90" className={inputClass} />
                                          </div>
                                          <div className="flex-1 flex flex-col gap-1.5">
                                            <label className={labelClass}>Altura (cm)</label>
                                            <input type="number" min="0" value={item.height || ''} onChange={setItemDetail(value, idx, 'height')} placeholder="ex: 210" className={inputClass} />
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-zinc-600">
                                          <span className="font-bold text-zinc-400 mr-1">{idx + 1}.</span>
                                          {parts.length > 0 ? parts.join(' · ') : <span className="text-zinc-300 italic">Sem detalhes</span>}
                                        </p>
                                        {isItemPending ? (
                                          <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[10px] text-zinc-500">Remover?</span>
                                            <button type="button" onClick={confirmDeleteAction} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200">Sim</button>
                                            <button type="button" onClick={cancelDelete} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors duration-200">Não</button>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-3 shrink-0">
                                            <button type="button" onClick={() => toggleItemExpand(value, idx)} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer">Editar</button>
                                            {detail.items.length > 1 && (
                                              <button type="button" onClick={() => requestDeleteItem(value, idx)} className="text-sm text-red-400 hover:text-red-600 transition-colors duration-200 cursor-pointer leading-none" aria-label="Remover">✕</button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }

                        return (
                          <div key={value} className="border border-stone-300 bg-stone-50 p-5 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                              <p className={labelClass}>{svc.label}</p>
                              <div className="flex items-center gap-2">
                                <label className={labelClass}>Quantidade</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={detail.quantity}
                                  onChange={setQuantity(value)}
                                  onBlur={commitQuantity(value)}
                                  className="w-16 border-b border-stone-400 bg-transparent px-0 py-1 text-sm text-zinc-900 text-center outline-none focus:border-golden"
                                />
                              </div>
                            </div>

                            {(detail.items || []).map((item, idx) => (
                              <div key={idx} className="flex flex-col gap-4 pt-4 border-t border-stone-200">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                  {svc.label.replace(/s$/i, '')} {idx + 1}
                                </p>

                                {svc.subtypes.length > 0 && (
                                  <div>
                                    <label className={labelClass + " block mb-2"}>
                                      Tipo
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                      {svc.subtypes.map((sub) => (
                                        <button
                                          key={sub}
                                          type="button"
                                          onClick={() => setItemDetail(value, idx, 'subType')(sub === item.subType ? '' : sub)}
                                          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                                            item.subType === sub
                                            ? 'border-zinc-900 bg-zinc-900 text-white'
                                            : 'border-stone-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
                                          }`}
                                        >
                                          {sub}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="flex gap-4">
                                  <div className="flex-1 flex flex-col gap-1.5">
                                    <label className={labelClass}>
                                      Largura (cm)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={item.width || ''}
                                      onChange={setItemDetail(value, idx, 'width')}
                                      placeholder="ex: 90"
                                      className={inputClass}
                                    />
                                  </div>
                                  <div className="flex-1 flex flex-col gap-1.5">
                                    <label className={labelClass}>
                                      Altura (cm)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={item.height || ''}
                                      onChange={setItemDetail(value, idx, 'height')}
                                      placeholder="ex: 210"
                                      className={inputClass}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="flex justify-end pt-2 border-t border-stone-200">
                              <button
                                type="button"
                                onClick={() => collapseService(value)}
                                className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:text-golden-amber transition-colors duration-200 cursor-pointer"
                              >
                                Confirmar
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* General info */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className={labelClass}>
                      {outroSelected
                        ? <>Descrição do projeto <span className="normal-case font-normal text-red-400">*</span></>
                        : <>Informação adicional <span className="normal-case font-normal text-zinc-400/70">(opcional)</span></>
                      }
                    </label>
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={set('description')}
                      rows={3}
                      placeholder={outroSelected
                        ? "Descreva aqui o seu projeto - tipo de trabalho, material, dimensões, localização..."
                        : "Outros detalhes relevantes - material pretendido, cor, acabamento, quantidade..."
                      }
                      className={inputClass + " resize-none"}
                    />
                    {outroSelected && !form.description.trim() && (
                      <p className="text-[10px] text-red-400 mt-0.5">Obrigatório quando "Outro" está selecionado.</p>
                    )}
                  </div>

                  {/* File upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>
                      Fotografias ou esboço <span className="normal-case font-normal text-zinc-400/70">(opcional)</span>
                    </label>

                    {fileNames.length > 0 && (
                      <ul className="flex flex-col gap-1 mb-1">
                        {fileNames.map((name, i) => (
                          <li key={i} className="flex items-center justify-between px-3 py-2 bg-stone-200 border border-stone-400">
                            <span className="text-xs text-zinc-700 truncate max-w-[80%]">{name}</span>
                            <button
                              type="button"
                              onClick={() => setFileNames(prev => prev.filter((_, j) => j !== i))}
                              className="text-zinc-400 hover:text-zinc-700 text-xs ml-2 cursor-pointer transition-colors duration-200"
                              aria-label={`Remover ${name}`}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <label className="flex items-center gap-3 border border-dashed border-stone-400 px-4 py-4 cursor-pointer hover:border-zinc-600 transition-colors duration-200 group">
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors duration-200">
                        {fileNames.length > 0 ? "Clique para adicionar mais ficheiros" : "Clique para selecionar ficheiros"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => setFileNames(prev => {
                          const newNames = Array.from(e.target.files).map(f => f.name)
                          const all = [...prev, ...newNames]
                          return all.filter((name, i) => all.indexOf(name) === i)
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
                        step1Valid ? 'text-zinc-900 hover:text-golden-amber cursor-pointer' : 'text-zinc-300 cursor-not-allowed'
                      }`}
                    >
                      Seguinte
                      <span className={`h-px transition-all duration-300 inline-block ${step1Valid ? 'w-8 bg-zinc-400 group-hover:w-14 group-hover:bg-golden-amber' : 'w-8 bg-stone-200'}`} />
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
                  className="p-8 flex flex-col gap-7"
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
                        {form.services.map((value) => {
                          const svc = servicos.find(s => s.value === value)
                          const detail = form.serviceDetails[value] || {}
                          if (value === 'outro') {
                            return (
                              <div key={value} className="flex flex-col gap-1.5">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                                  {svc.label}
                                </p>
                                <p className="text-xs text-zinc-400 italic">Ver informação adicional</p>
                              </div>
                            )
                          }
                          return (
                            <div key={value} className="flex flex-col gap-1.5">
                              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                                {svc.label} <span className="text-zinc-300">× {detail.quantity}</span>
                              </p>
                              {(detail.items || []).map((item, idx) => {
                                const parts = [
                                  item.subType,
                                  item.width && `L: ${item.width} cm`,
                                  item.height && `A: ${item.height} cm`,
                                ].filter(Boolean)
                                return parts.length > 0 ? (
                                  <p key={idx} className="text-xs text-zinc-600">
                                    <span className="text-zinc-400">{idx + 1}.</span> {parts.join(' · ')}
                                  </p>
                                ) : null
                              })}
                            </div>
                          )
                        })}
                        {form.description && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                              Informação adicional
                            </p>

                            <p className="text-sm text-zinc-700 mt-0.5 leading-relaxed">
                              {form.description}
                            </p>

                          </div>
                        )}
                        {fileNames.length > 0 && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                              Ficheiros
                            </p>

                            <p className="text-sm text-zinc-700 mt-0.5">
                              {fileNames.join(', ')}
                            </p>

                          </div>
                        )}
                      </div>
                    </div>
 
                  </div>
 
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Ao submeter, autoriza o uso dos seus dados para contacto relacionado com este pedido de orçamento.
                  </p>
 
                  <div className="flex items-center justify-between pt-2 border-t border-stone-300">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-800 transition-colors duration-200 cursor-pointer"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-golden-amber transition-colors duration-300 cursor-pointer"
                    >
                      Enviar pedido
                      <span className="w-8 h-px bg-zinc-400 group-hover:w-14 group-hover:bg-golden-amber transition-all duration-300 inline-block" />
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
            className="bg-stone-100 border border-stone-400 shadow-sm p-12 flex flex-col items-center text-center gap-6"
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
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors duration-200">
                Voltar ao início
              </a>
              <a href="/galeria" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 text-zinc-500 text-xs font-bold uppercase tracking-wider hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-200">
                Ver galeria
              </a>
            </div>
          </motion.div>
        )}

        </div>
      </section>
 
      <Footer />
    </div>
  )
}