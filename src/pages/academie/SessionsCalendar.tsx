import { useState } from 'react';
import SectionHeader from '../../components/wahhf/SectionHeader';
import CourseCard from '../../components/wahhf/CourseCard';
import { SecondaryButton } from '../../components/wahhf/Buttons';
import { COURSE_SESSIONS_DATA } from '../../services/api';
import { upcomingSessions } from '../../lib/sessions';
import { FIELD_CLASS, LABEL_CLASS } from '../../components/wahhf/FormField';
import { useLocalize } from '../../lib/localize';
import { CONTACT } from '../../config/contact';
import '../../locales/mobilite';

/** Demande d'alerte préparée sur WhatsApp, rédigée dans la langue de la personne (lot 7.10). */
const whatsappAlert = (text: string) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * Calendrier des prochaines sessions (Académie et pages de niveau ; groupe 7.1 : T-05, ACAD-03).
 * - Seules les sessions pas encore commencées s'affichent (dates ISO comparées à la date du jour) ; une date non
 *   confirmée par la fondation n'affiche que son mois.
 * - Filtres par niveau et par format, avec le nombre de sessions annoncé (role=status) et un état vide qui dit
 *   pourquoi et quoi faire (voir les sessions en ligne, être prévenu de la prochaine session).
 * - `level` : page d'un niveau, le filtre de niveau est fixé.
 */
export default function SessionsCalendar({ level, tone = 'sauge' }: { level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'; tone?: 'brume' | 'sauge' }) {
  const { t } = useLocalize();
  const [filterLevel, setFilterLevel] = useState<string>(level ?? 'ALL');
  const [filterFormat, setFilterFormat] = useState<'ALL' | 'ONLINE' | 'PRESENTIEL'>('ALL');
  const upcoming = upcomingSessions(COURSE_SESSIONS_DATA);
  const sessions = upcoming.filter(
    (s) =>
      (filterLevel === 'ALL' || s.level === filterLevel) &&
      (filterFormat === 'ALL' || (filterFormat === 'ONLINE' ? s.format === 'En ligne' : s.format !== 'En ligne'))
  );
  const count = sessions.length === 0 ? t('mobilite.sessions.aucune') : t('mobilite.sessions.nombre', { count: sessions.length });
  // Filtres seulement quand ils ont au moins deux choix réels parmi les sessions à venir (ACAD-03)
  const levelsAhead = new Set(upcoming.map((s) => s.level));
  const formatsAhead = new Set(upcoming.filter((s) => !level || s.level === level).map((s) => (s.format === 'En ligne' ? 'ONLINE' : 'PRESENTIEL')));
  const showLevelFilter = !level && levelsAhead.size > 1;
  const showFormatFilter = formatsAhead.size > 1;

  return (
    <section id="calendrier-sessions" className={`section-space ${tone === 'sauge' ? 'bg-surface-section' : 'bg-surface'}`}>
      <div className="container-page space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <SectionHeader
          title={level ? t('mobilite.sessions.titleNiveau', { level }) : t('mobilite.sessions.titleTout')}
          subtitle={t('mobilite.sessions.subtitle')}
        />

        <div className="flex flex-wrap items-end gap-4">
          {showLevelFilter && (
            <div>
              <label htmlFor="filtre-niveau" className={LABEL_CLASS}>
                {t('mobilite.sessions.filtreNiveau')}
              </label>
              <select id="filtre-niveau" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={FIELD_CLASS}>
                <option value="ALL">{t('mobilite.sessions.tousNiveaux')}</option>
                {['A1', 'A2', 'B1', 'B2', 'C1'].map((l) => (
                  <option key={l} value={l}>
                    {t('mobilite.commun.niveau', { level: l })}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showFormatFilter && (
          <div>
            <label htmlFor="filtre-format" className={LABEL_CLASS}>
              {t('mobilite.sessions.filtreFormat')}
            </label>
            <select
              id="filtre-format"
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value as typeof filterFormat)}
              className={FIELD_CLASS}
            >
              <option value="ALL">{t('mobilite.sessions.tousFormats')}</option>
              <option value="ONLINE">{t('mobilite.formats.enLigne')}</option>
              <option value="PRESENTIEL">{t('mobilite.sessions.presentiel')}</option>
            </select>
          </div>
          )}
        </div>
      </div>

      {/* Nombre de sessions, annoncé à chaque changement de filtre (ACAD-03) */}
      <p role="status" className="text-meta text-text-secondary">
        {count}
      </p>

      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <CourseCard key={session.id} session={session} />
          ))}
        </ul>
      ) : (
        // État vide : dire pourquoi, puis quoi faire (§5.5 du contrat : vide n'est pas erreur)
        <div className="border-t border-border-subtle pt-6 space-y-4 max-w-[65ch]">
          <p className="text-body font-semibold text-text">
            {showFormatFilter && filterFormat === 'PRESENTIEL'
              ? t('mobilite.sessions.videPresentiel')
              : showLevelFilter || showFormatFilter
              ? t('mobilite.sessions.videChoix')
              : level
              ? t('mobilite.sessions.videNiveau', { level })
              : t('mobilite.sessions.videTout')}
          </p>
          <p className="text-body text-text-secondary">{t('mobilite.sessions.prevenir')}</p>
          <div className="flex flex-wrap gap-3">
            {showFormatFilter && filterFormat === 'PRESENTIEL' && (
              <SecondaryButton onClick={() => setFilterFormat('ONLINE')}>{t('mobilite.sessions.voirEnLigne')}</SecondaryButton>
            )}
            {level && <SecondaryButton to="/mobilite-langues/academie#calendrier-sessions">{t('mobilite.sessions.voirToutes')}</SecondaryButton>}
            <SecondaryButton href={whatsappAlert(t('mobilite.sessions.whatsapp'))}>{t('mobilite.sessions.prevenirWhatsapp')}</SecondaryButton>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
