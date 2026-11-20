import { useState } from 'react';
import SectionHeader from '../../components/wahhf/SectionHeader';
import CourseCard from '../../components/wahhf/CourseCard';
import { SecondaryButton } from '../../components/wahhf/Buttons';
import { COURSE_SESSIONS_DATA } from '../../services/api';
import { upcomingSessions } from '../../lib/sessions';
import { FIELD_CLASS, LABEL_CLASS } from '../../components/wahhf/FormField';

const WHATSAPP_ALERT = `https://wa.me/237693129205?text=${encodeURIComponent(
  'Bonjour WAHHF Foundation, je souhaite être prévenu(e) de la prochaine session de cours d’allemand /anglais.'
)}`;

/**
 * Calendrier des prochaines sessions (Académie et pages de niveau ; groupe 7.1 : T-05, ACAD-03).
 * - Seules les sessions pas encore commencées s'affichent (dates ISO comparées à la date du jour) ; une date non
 *   confirmée par la fondation n'affiche que son mois.
 * - Filtres par niveau et par format, avec le nombre de sessions annoncé (role=status) et un état vide qui dit
 *   pourquoi et quoi faire (voir les sessions en ligne, être prévenu de la prochaine session).
 * - `level` : page d'un niveau, le filtre de niveau est fixé.
 */
export default function SessionsCalendar({ level, tone = 'sauge' }: { level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'; tone?: 'brume' | 'sauge' }) {
  const [filterLevel, setFilterLevel] = useState<string>(level ?? 'ALL');
  const [filterFormat, setFilterFormat] = useState<'ALL' | 'ONLINE' | 'PRESENTIEL'>('ALL');
  const upcoming = upcomingSessions(COURSE_SESSIONS_DATA);
  const sessions = upcoming.filter(
    (s) =>
      (filterLevel === 'ALL' || s.level === filterLevel) &&
      (filterFormat === 'ALL' || (filterFormat === 'ONLINE' ? s.format === 'En ligne' : s.format !== 'En ligne'))
  );
  const count = sessions.length === 0 ? 'Aucune session' : sessions.length === 1 ? '1 session' : `${sessions.length} sessions`;
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
          title={level ? `Prochaines sessions de niveau ${level}` : 'Calendrier des prochaines sessions'}
          subtitle="Toutes les sessions sont gratuites. En ligne ou en présentiel à Douala et à Yaoundé ; celles déjà commencées n’apparaissent plus."
        />

        <div className="flex flex-wrap items-end gap-4">
          {showLevelFilter && (
            <div>
              <label htmlFor="filtre-niveau" className={LABEL_CLASS}>
                Niveau
              </label>
              <select id="filtre-niveau" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={FIELD_CLASS}>
                <option value="ALL">Tous les niveaux</option>
                {['A1', 'A2', 'B1', 'B2', 'C1'].map((l) => (
                  <option key={l} value={l}>
                    Niveau {l}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showFormatFilter && (
          <div>
            <label htmlFor="filtre-format" className={LABEL_CLASS}>
              Format
            </label>
            <select
              id="filtre-format"
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value as typeof filterFormat)}
              className={FIELD_CLASS}
            >
              <option value="ALL">Tous les formats</option>
              <option value="ONLINE">En ligne</option>
              <option value="PRESENTIEL">En présentiel (Douala, Yaoundé)</option>
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
              ? 'Pas de session en présentiel annoncée pour ce choix pour l’instant.'
              : showLevelFilter || showFormatFilter
              ? 'Pas de session annoncée pour ce choix pour l’instant.'
              : level
              ? `Pas de session de niveau ${level} annoncée pour l’instant.`
              : 'Pas de session annoncée pour l’instant.'}
          </p>
          <p className="text-body text-text-secondary">Vous pouvez demander à être prévenu de la prochaine session.</p>
          <div className="flex flex-wrap gap-3">
            {showFormatFilter && filterFormat === 'PRESENTIEL' && (
              <SecondaryButton onClick={() => setFilterFormat('ONLINE')}>Voir les sessions en ligne</SecondaryButton>
            )}
            {level && <SecondaryButton to="/mobilite-langues/academie#calendrier-sessions">Voir toutes les sessions</SecondaryButton>}
            <SecondaryButton href={WHATSAPP_ALERT}>Être prévenu sur WhatsApp</SecondaryButton>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
