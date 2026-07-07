import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, User, FileText, Globe } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import MagneticButton from '../components/MagneticButton.jsx'

// Zod schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

// FormField component remains decoupled outside to preserve keystroke context
const FormField = ({ label, name, type = 'text', icon: Icon, isTextarea = false, register, errors, watch, textareaRef }) => {
  const value = watch(name)
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  const inputRegistration = register(name)

  return (
    <div className="relative mb-6 text-left group">
      <div className={`absolute left-4 top-3.5 transition-colors duration-300 ${
        isFocused ? 'text-primary-cyan' : 'text-slate-500 group-hover:text-slate-400'
      }`}>
        <Icon className="w-5 h-5" />
      </div>

      {isTextarea ? (
        <textarea
          {...inputRegistration}
          id={name}
          ref={(e) => {
            inputRegistration.ref(e)
            if (textareaRef) textareaRef.current = e
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            inputRegistration.onBlur(e)
            setIsFocused(false)
          }}
          rows={4}
          className={`w-full pl-12 pr-4 py-3 bg-slate-950/40 border rounded-2xl text-white outline-none transition-all duration-300 resize-none ${
            errors[name]
              ? 'border-rose-500/50 focus:border-rose-500 shadow-sm shadow-rose-500/10'
              : 'border-white/10 focus:border-primary-cyan/60 focus:bg-slate-950/60 focus:shadow-md focus:shadow-primary-cyan/5 hover:border-white/20'
          }`}
        />
      ) : (
        <input
          {...inputRegistration}
          type={type}
          id={name}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            inputRegistration.onBlur(e)
            setIsFocused(false)
          }}
          className={`w-full pl-12 pr-4 py-3 bg-slate-950/40 border rounded-2xl text-white outline-none transition-all duration-300 ${
            errors[name]
              ? 'border-rose-500/50 focus:border-rose-500 shadow-sm shadow-rose-500/10'
              : 'border-white/10 focus:border-primary-cyan/60 focus:bg-slate-950/60 focus:shadow-md focus:shadow-primary-cyan/5 hover:border-white/20'
          }`}
        />
      )}

      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute left-12 transition-all duration-300 pointer-events-none select-none ${
          isFocused || hasValue
            ? 'top-[-10px] text-xs font-bold text-primary-cyan bg-slate-900 px-2 py-0.5 rounded-md border border-white/5'
            : 'top-3.5 text-sm text-slate-500 group-hover:text-slate-400'
        }`}
      >
        {label}
      </label>

      {/* Error message */}
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1 pl-2"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {errors[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const textareaRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const messageValue = watch('message')

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [messageValue])

  // INTEGRATED FORMSPREE HERE
  const onSubmit = async (data) => {
    setFormStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch('https://formspree.io/f/xkoadrek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setFormStatus('success')
        setStatusMessage('✅ Message Sent Successfully')
        reset()
      } else {
        throw new Error('Formspree rejected the request submission.')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setFormStatus('error')
      setStatusMessage('❌ Failed to send message. Please try again later or email directly.')
    }
  }

  return (
    <section id="contact" className="relative py-20 px-4 md:px-8 overflow-hidden z-10">
      {/* Decorative Blob */}
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-primary-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-cyan"
          >
            <Mail className="w-4 h-4 text-primary-cyan animate-pulse" />
            <span>Connect</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white mt-2"
          >
            Get In Touch
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple mt-4 rounded-full"
          />
        </div>

        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details & info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Let's Build Something Amazing Together 🚀
            </h4>
            <p className="text-slate-400 text-base leading-relaxed">
              I'm always open to freelance opportunities, remote positions, open-source collaborations, and exciting development ideas. Feel free to reach out!
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-primary-cyan/20 transition-all duration-300 group">
                <div className="p-3.5 rounded-xl bg-primary-cyan/10 text-primary-cyan group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</p>
                  <a
                    href="mailto:arslaniqbal4666@gmail.com"
                    className="text-sm font-bold text-white hover:text-primary-cyan transition-colors"
                  >
                    arslaniqbal4666@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-primary-purple/20 transition-all duration-300 group">
                <div className="p-3.5 rounded-xl bg-primary-purple/10 text-primary-purple group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone</p>
                  <a
                    href="tel:+923135180543"
                    className="text-sm font-bold text-white hover:text-primary-purple transition-colors"
                  >
                    +92 313-5180543
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-primary-blue/20 transition-all duration-300 group">
                <div className="p-3.5 rounded-xl bg-primary-blue/10 text-primary-blue group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</p>
                  <p className="text-sm font-bold text-white">
                    Mansehra, KPK, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Container */}
            <div className="pt-4 text-left">
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-4">Connect on Social Media</p>
              <div className="flex gap-4">
                <MagneticButton>
                  <a
                    href="https://github.com/arslaniqbal4666"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-primary-cyan/40 hover:bg-primary-cyan/10 hover:shadow-lg hover:shadow-primary-cyan/20 transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://linkedin.com/in/arslan-iqbal-1087092bb"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-primary-blue/40 hover:bg-primary-blue/10 hover:shadow-lg hover:shadow-primary-blue/20 transition-all duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="mailto:arslaniqbal4666@gmail.com"
                    aria-label="Send Email Direct"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-primary-purple/40 hover:bg-primary-purple/10 hover:shadow-lg hover:shadow-primary-purple/20 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative"
          >
            {/* Ambient Background Aura inside form */}
            <div className="absolute top-10 right-10 w-44 h-44 rounded-full bg-primary-cyan/5 blur-2xl pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              <FormField label="Full Name" name="name" icon={User} register={register} errors={errors} watch={watch} />
              <FormField label="Email Address" name="email" type="email" icon={Mail} register={register} errors={errors} watch={watch} />
              <FormField label="Subject" name="subject" icon={FileText} register={register} errors={errors} watch={watch} />
              <FormField label="Message Details" name="message" icon={Globe} isTextarea={true} register={register} errors={errors} watch={watch} textareaRef={textareaRef} />

              {/* Status Banner */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-3 border ${
                      formStatus === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                  >
                    {formStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="w-full pt-2">
                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple text-white-pure font-bold text-sm shadow-xl shadow-primary-blue/10 hover:shadow-primary-blue/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:brightness-75 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-shine pointer-events-none" />

                    {formStatus === 'sending' ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white-pure"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}