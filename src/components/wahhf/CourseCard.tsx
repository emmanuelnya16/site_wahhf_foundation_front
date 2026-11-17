import { Link } from 'react-router-dom';
import { CourseSession } from '../../services/api';
import { PrimaryButton } from './Buttons';
import { formatSessionStart } from '../../lib/sessions';

interface CourseCardProps {
  session: CourseSession;
}

/**
 * Session de cours en ligne de liste dense (contrat §5 « liste dense pour les sessions de cours », §8) :
 * niveau et lien vers le programme, titre, format, rythme, date de début et places dans une liste de définitions,
 * bouton « Candidater » (jamais « Réserver » ni « Acheter »). Ni carte, ni filigrane, ni icônes or.
 * La gratuité est dite une seule fois, au-dessus de la liste (décision n° 5) ; à poser dans une <ul>.
 * Groupe 7.1 : date ISO formatée (T-05) ; « Candidater » transmet la session, donc le niveau ET le format (ACAD-01).
 */
export default function CourseCard({ session }: CourseCardProps) {
  return (
    <li data-reveal="" className="grid gap-x-8 gap-y-3 border-t border-border-subtle py-6 md:grid-cols-[10rem_1fr_auto] md:items-start">
      <div className="space-y-1">
        <p className="text-meta font-semibold text-text">Niveau {session.level}</p>
        <Link
          to={`/academie/${session.level.toLowerCase()}`}
          className="inline-flex min-h-11 items-center text-meta text-link underline underline-offset-4 md:min-h-0"
        >
          Programme {session.level}
        </Link>
      </div>

      <div className="space-y-3">
        <h3 className="text-body font-semibold text-text">{session.title}</h3>
        <dl className="grid gap-x-8 gap-y-2 text-meta sm:grid-cols-2">
          <div>
            <dt className="text-text-secondary">Format :</dt>
            <dd className="text-text">{session.format}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">Rythme et durée :</dt>
            <dd className="text-text">
              {session.days} ({session.duration})
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">Début de session :</dt>
            <dd className="text-text">{formatSessionStart(session)}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">Places prévues :</dt>
            <dd className="text-text tabular-nums">{session.seatsAvailable}</dd>
          </div>
        </dl>
      </div>

      <div className="md:pt-0.5">
        <PrimaryButton size="sm" to={`/candidater?souhait=cours_allemand&niveau=${session.level}&session=${session.id}`}>
          Candidater
          <span className="sr-only"> à cette session ({session.level}, {session.format.charAt(0).toLowerCase() + session.format.slice(1)})</span>
        </PrimaryButton>
      </div>
    </li>
  );
}
