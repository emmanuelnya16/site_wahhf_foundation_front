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
    <article className="group relative rounded-card bg-surface-raised border border-border-soft p-6 sm:p-7 shadow-[0_10px_30px_-12px_rgba(15,61,46,0.08)] hover:shadow-[0_18px_36px_-12px_rgba(15,61,46,0.16)] transition duration-(--dur-fast) hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Grand numéro en filigrane très pâle derrière le texte */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-3 right-4 font-serif font-normal text-[6rem] leading-none text-foret/[0.05] dark:text-creme/[0.05]"
      >
        {watermarkNum}
      </span>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-pill bg-foret text-or text-xs font-bold tracking-wider uppercase">
              Niveau {session.level}
            </span>
            <Link
              to={`/academie/${session.level.toLowerCase()}`}
              className="text-xs font-medium text-accent underline underline-offset-4 hover:opacity-80"
            >
              Programme {session.level}
            </Link>
          </div>

          {/* Mention GRATUIT bien visible à la place du prix */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-pill bg-or/20 border border-or/50 text-accent text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {session.costLabel} · Financé par WAHHF
          </span>
        </div>

        <h3 className="font-serif font-normal text-xl sm:text-2xl text-text leading-snug">
          {session.title}
        </h3>

        <ul className="space-y-2.5 text-sm text-text-secondary pt-1">
          <li className="flex items-start gap-2.5">
            <Globe2 className="w-4 h-4 text-or shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-text">Format :</strong> {session.format}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-or shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-text">Rythme & durée :</strong> {session.days} ({session.duration})
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-or shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-text">Début de session :</strong> {session.startDate}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-or shrink-0 mt-0.5" />
            <span>
              <strong className="font-medium text-text">Places d’accompagnement :</strong> {session.seatsAvailable} places disponibles (indicatif)
            </span>
          </li>
        </ul>
      </div>

      <div className="relative z-10 pt-5 mt-6 border-t border-border-subtle flex items-center justify-between gap-3">
        <span className="text-xs text-text-muted">
          Aucun frais demandé
        </span>
        <Link
          to={`/candidater?souhait=cours_allemand&niveau=${session.level}`}
          className="group/btn inline-flex items-center gap-2.5 pl-5 pr-2 py-1.5 rounded-pill bg-action hover:bg-action-hover text-on-action text-sm font-medium transition"
        >
          <span>Candidater</span>
          <span className="w-7 h-7 rounded-pill bg-or text-encre flex items-center justify-center transition-transform duration-(--dur-fast) group-hover/btn:rotate-45">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </article>
  );
}
