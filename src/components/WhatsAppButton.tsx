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
      className="focus-ring-double fixed bottom-6 right-6 z-(--z-float) w-13 h-13 bg-action hover:bg-action-hover border border-or/50 text-on-action rounded-pill flex items-center justify-center shadow-[0_12px_30px_rgba(15,61,46,0.35)] group transition-colors duration-(--dur-fast) cursor-pointer"
      aria-label="Contacter WAHHF Foundation sur WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={24} className="text-creme transition-transform group-hover:scale-105" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-pill bg-or ring-2 ring-foret" />
      </div>

      <span className="absolute right-full mr-3 bg-foret text-creme border border-or/30 px-3.5 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
        {i18n.language.startsWith('en') ? 'Free Orientation Support' : 'Écoute & Orientation (Gratuit)'}
      </span>
    </motion.a>
  );
}
