import { Link } from 'react-router-dom';
import { CourseSession } from '../../services/api';
import { PrimaryButton } from './Buttons';
import { formatKey, formatSessionStart, localizedSession } from '../../lib/sessions';
import { useLocalize } from '../../lib/localize';
import '../../locales/mobilite';

interface CourseCardProps {
  session: CourseSession;
}

/**
 * Session de cours en ligne de liste dense (contrat §5 « liste dense pour les sessions de cours », §8) :
 * niveau et lien vers le programme, titre, format, rythme, date de début et places dans une liste de définitions,
 * bouton « Candidater » (jamais « Réserver » ni « Acheter »). Ni carte, ni filigrane, ni icônes or.
 * La gratuité est dite une seule fois, au-dessus de la liste (décision n° 5) ; à poser dans une <ul>.
 * Groupe 7.1 : date ISO formatée (T-05) ; « Candidater » transmet la session, donc le niveau ET le format (ACAD-01).
 * Lot 7.10 : textes dans la langue de l'interface (paquet « mobilite ») ; `session` est la session des données.
 */
export default function CourseCard({ session: raw }: CourseCardProps) {
  const { t, lang } = useLocalize();
  const session = localizedSession(raw, lang);
  const format = formatKey(raw.format);
  return (
    <li data-reveal="" className="grid gap-x-8 gap-y-3 border-t border-border-subtle py-6 md:grid-cols-[10rem_1fr_auto] md:items-start">
      <div className="space-y-1">
        <p className="text-meta font-semibold text-text">{t('mobilite.commun.niveau', { level: session.level })}</p>
        <Link
          to={`/academie/${session.level.toLowerCase()}`}
          className="inline-flex min-h-11 items-center text-meta text-link underline underline-offset-4 md:min-h-0"
        >
          {t('mobilite.cours.programme', { level: session.level })}
        </Link>
      </div>

      <div className="space-y-3">
        <h3 className="text-body font-semibold text-text">{session.title}</h3>
        <dl className="grid gap-x-8 gap-y-2 text-meta sm:grid-cols-2">
          <div>
            <dt className="text-text-secondary">{t('mobilite.cours.format')}</dt>
            <dd className="text-text">{t(`mobilite.formats.${format}`)}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">{t('mobilite.cours.rythme')}</dt>
            <dd className="text-text">
              {session.days} ({session.duration})
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">{t('mobilite.cours.debut')}</dt>
            <dd className="text-text">{formatSessionStart(raw, lang)}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">{t('mobilite.cours.places')}</dt>
            <dd className="text-text tabular-nums">
              {session.seatsAvailable} {t('mobilite.cours.indicatif')}
            </dd>
          </div>
        </dl>
      </div>

      <div className="md:pt-0.5">
        <PrimaryButton size="sm" to={`/candidater?souhait=cours_allemand&niveau=${session.level}&session=${session.id}`}>
          {t('mobilite.commun.candidater')}
          <span className="sr-only"> {t('mobilite.cours.srSession', { level: session.level, format: t(`mobilite.formatsPhrase.${format}`) })}</span>
        </PrimaryButton>
      </div>
    </li>
  );
}
