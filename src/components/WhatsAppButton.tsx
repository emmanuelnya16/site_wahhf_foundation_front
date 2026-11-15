import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();
  const phoneNumber = '237693129205';
  const message = encodeURIComponent(
    i18n.language.startsWith('en')
      ? 'Hello WAHHF Foundation, I would like information about your free programs...'
      : 'Bonjour WAHHF Foundation, je souhaite des informations sur vos programmes d’accompagnement gratuits...'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-13 h-13 bg-[#0F3D2E] hover:bg-[#14523E] border border-[#E8A317]/50 text-[#F5F1E8] rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(15,61,46,0.35)] group transition-colors duration-300 cursor-pointer"
      aria-label="Contacter WAHHF Foundation sur WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={24} className="text-[#F5F1E8] transition-transform group-hover:scale-105" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8A317] ring-2 ring-[#0F3D2E]" />
      </div>

      <span className="absolute right-full mr-3 bg-[#0F3D2E] text-[#F5F1E8] border border-[#E8A317]/30 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
        {i18n.language.startsWith('en') ? 'Free Orientation Support' : 'Écoute & Orientation (Gratuit)'}
      </span>
    </motion.a>
  );
}
