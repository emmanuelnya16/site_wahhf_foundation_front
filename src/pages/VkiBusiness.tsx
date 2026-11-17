import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Phone, Mail, Instagram, MessageCircle, Smartphone, 
  Camera, Languages, Copy, Check, ExternalLink, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNoIndex } from '@/src/lib/useNoIndex';

export default function VkiBusiness() {
  useNoIndex();
  const { t, i18n } = useTranslation();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const pageUrl = window.location.href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const contacts = [
    { icon: Globe, labelKey: 'website', value: "irokogroup.com", href: "https://irokogroup.com" },
    { icon: Smartphone, labelKey: 'mobile', value: "+237 693 129 205", href: "tel:+237693129205" },
    { icon: Phone, labelKey: 'phone', value: "+49 30 1234567", href: "tel:+49301234567" },
    { icon: Mail, labelKey: 'email', value: "contact@irokogroup.com", href: "mailto:contact@irokogroup.com" },
  ];

  const socials = [
    { 
      icon: Instagram, 
      label: "Instagram", 
      value: "@irokogroup", 
      href: "https://instagram.com/irokogroup", 
      bg: "bg-gradient-to-tr from-[#531FF5] via-[#8B66FF] to-[#FF8500]",
      tag: "irokogroup"
    },
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      value: "+237 693 129 205", 
      href: "https://wa.me/237693129205", 
      bg: "bg-[#0A0B14]",
      tag: "+237 693 129 205"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-ktv-blue font-sans selection:bg-ktv-red/10 selection:text-ktv-red">
      
      {/* FLOATING ACTION BAR */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition duration-300 px-4 py-3 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
        <div className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-black text-lg tracking-tighter text-[#142FA0]">
            V<span className="text-[#9D0E1F]">K</span>I BUSINESS
          </span>
        </div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white/90 backdrop-blur shadow-sm border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors uppercase tracking-wider"
        >
          <Languages size={14} className="text-ktv-red" />
          {i18n.language === 'fr' ? 'English' : 'Français'}
        </button>
      </div>

      {/* HERO HEADER */}
      <header className="relative bg-ktv-blue pt-20 pb-16 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ktv-red/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -ml-32 -mb-32" />
        
        <div className="max-w-md mx-auto relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-24 h-24 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-ktv-blue/50"
          >
            <div className="text-4xl font-black flex items-center">
              <span className="text-[#142FA0]">V</span>
              <span className="text-[#9D0E1F]">K</span>
              <span className="text-[#142FA0]">I</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white text-3xl font-black tracking-tight leading-none uppercase mb-2">
              IROKO GROUP
            </h1>
            <p className="text-white/60 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
              Holding & Pôles d'Excellence
            </p>
            <div className="inline-block px-4 py-1.5 bg-[#531FF5] rounded-full text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-[#531FF5]/30">
              "Construire aujourd'hui les entreprises de demain"
            </div>
          </motion.div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-md mx-auto -mt-6 px-4 pb-20 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* QR CODE CARD */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-center">
              <div className="relative group p-2">
                <div className="absolute inset-0 bg-[#531FF5]/5 rounded-3xl scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-4 bg-white border-2 border-[#531FF5]/10 rounded-2xl">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pageUrl)}&color=0D1B3E&bgcolor=ffffff&margin=10&format=svg`}
                    alt="IROKO QR"
                    width={160}
                    height={160}
                    className="block"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -top-1.5 -left-1.5 p-1 bg-ktv-red rounded-lg text-white shadow-lg">
                    <Camera size={10} />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold text-slate-400 tracking-wide uppercase flex items-center gap-2">
                <ExternalLink size={14} className="text-ktv-red" />
                {t('vki.scanToShare')}
              </p>
            </div>
          </motion.section>

          {/* CONTACT ACTIONS */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">{t('vki.phone')} & {t('common.contactUs')}</h2>
            <div className="grid grid-cols-1 gap-3">
              {contacts.map((contact, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-lg hover:shadow-slate-200 transition duration-300"
                >
                  <a href={contact.href} className="flex-grow flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-ktv-blue group-hover:bg-ktv-blue group-hover:text-white transition-colors">
                      <contact.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{t(`vki.${contact.labelKey}`)}</p>
                      <p className="font-bold text-ktv-blue group-hover:text-ktv-red transition-colors">{contact.value}</p>
                    </div>
                  </a>
                  <button 
                    onClick={() => copyToClipboard(contact.value, contact.labelKey)}
                    className="p-2 text-slate-300 hover:text-ktv-blue transition-colors rounded-lg hover:bg-slate-50"
                  >
                    {copiedLabel === contact.labelKey ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SOCIAL MEDIA PILLS */}
          <section className="space-y-3">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">{t('vki.socials')}</h2>
             <div className="grid grid-cols-1 gap-3">
               {socials.map((social, idx) => (
                 <motion.a 
                  key={idx} 
                  href={social.href}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.12 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-lg transition group"
                 >
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl ${social.bg} flex items-center justify-center text-white shadow-lg shadow-black/5`}>
                        <social.icon size={22} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{social.label}</p>
                        <p className="font-bold text-ktv-blue break-all">{social.value}</p>
                     </div>
                   </div>
                   <ChevronRight size={18} className="text-slate-200 group-hover:text-ktv-red transition-colors" />
                 </motion.a>
               ))}
             </div>
          </section>

          {/* LEGAL INFO CARD */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-ktv-blue rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-ktv-blue/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-ktv-red flex items-center justify-center">
                  <Copy size={14} className="text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-widest">{t('vki.legal')}</h2>
              </div>
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Registration (RC)</p>
                  <p className="text-xl font-black tracking-tight">46009</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Tax Code</p>
                  <p className="text-xl font-black tracking-tight">771-037-279</p>
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </main>

      {/* BOTTOM NAV / FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-10 px-6 text-center">
        <div className="font-black text-xs tracking-[0.3em] text-[#142FA0] uppercase mb-4">
          © 2026 V<span className="text-[#9D0E1F]">K</span>I BUSINESS GROUP - LTD
        </div>
        <div className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
          {t('vki.allRightsReserved')}
        </div>
      </footer>

      {/* COPIED TOAST */}
      <AnimatePresence>
        {copiedLabel && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-ktv-blue text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm border border-white/10"
          >
            <Check size={18} className="text-green-400" />
            <span>{t('vki.copied')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
