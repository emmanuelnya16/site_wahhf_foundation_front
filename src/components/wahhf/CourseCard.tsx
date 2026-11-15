import { Link } from 'react-router-dom';
import { Calendar, Clock, Globe2, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CourseSession } from '../../services/api';

interface CourseCardProps {
  key?: string | number;
  session: CourseSession;
  index?: number;
}

/**
 * Composant CourseCard réutilisable :
 * niveau, titre, format, jours, durée, date de début, places disponibles,
 * mention « Gratuit » bien visible à la place du prix, et bouton « Candidater » (jamais « Réserver » ni « Acheter »).
 */
export default function CourseCard({ session, index = 1 }: CourseCardProps) {
  const watermarkNum = String(index).padStart(2, '0');

  return (
    <article className="group relative rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-6 sm:p-7 shadow-[0_10px_30px_-12px_rgba(15,61,46,0.08)] hover:shadow-[0_18px_36px_-12px_rgba(15,61,46,0.16)] transition duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Grand numéro en filigrane très pâle derrière le texte */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-3 right-4 font-serif font-normal text-[6rem] leading-none text-[#0F3D2E]/[0.05] dark:text-[#F5F1E8]/[0.05]"
      >
        {watermarkNum}
      </span>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-[#0F3D2E] text-[#E8A317] text-xs font-bold tracking-wider uppercase">
              Niveau {session.level}
            </span>
            <Link
              to={`/academie/${session.level.toLowerCase()}`}
              className="text-xs font-medium text-[#0F3D2E] dark:text-[#E8A317] underline underline-offset-4 hover:opacity-80"
            >
              Programme {session.level}
            </Link>
          </div>

          {/* Mention GRATUIT bien visible à la place du prix */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8A317]/20 border border-[#E8A317]/50 text-[#0F3D2E] dark:text-[#E8A317] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {session.costLabel} · Financé par WAHHF
          </span>
        </div>

        <h3 className="font-serif font-normal text-xl sm:text-2xl text-[#1B1B18] dark:text-[#F5F1E8] leading-snug">
          {session.title}
        </h3>

        <ul className="space-y-2.5 text-sm text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 pt-1">
          <li className="flex items-start gap-2.5">
            <Globe2 className="w-4 h-4 text-[#E8A317] shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-[#1B1B18] dark:text-[#F5F1E8]">Format :</strong> {session.format}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#E8A317] shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-[#1B1B18] dark:text-[#F5F1E8]">Rythme & durée :</strong> {session.days} ({session.duration})
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#E8A317] shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-[#1B1B18] dark:text-[#F5F1E8]">Début de session :</strong> {session.startDate}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-[#E8A317] shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-[#1B1B18] dark:text-[#F5F1E8]">Places d’accompagnement :</strong> {session.seatsAvailable} places disponibles (indicatif)
            </span>
          </li>
        </ul>
      </div>

      <div className="relative z-10 pt-5 mt-6 border-t border-[#0F3D2E]/10 dark:border-[#F5F1E8]/10 flex items-center justify-between gap-3">
        <span className="text-xs text-[#1B1B18]/65 dark:text-[#F5F1E8]/65">
          Aucun frais demandé
        </span>
        <Link
          to={`/candidater?souhait=cours_allemand&niveau=${session.level}`}
          className="group/btn inline-flex items-center gap-2.5 pl-5 pr-2 py-1.5 rounded-full bg-[#0F3D2E] hover:bg-[#14523E] text-[#F5F1E8] text-sm font-medium transition"
        >
          <span>Candidater</span>
          <span className="w-7 h-7 rounded-full bg-[#E8A317] text-[#1B1B18] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </article>
  );
}
