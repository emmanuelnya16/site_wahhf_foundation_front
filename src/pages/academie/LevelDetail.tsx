import { GermanLevelCourse, COURSE_SESSIONS_DATA } from '../../services/api';
import { formatSessionStart, isProvisional, upcomingSessions } from '../../lib/sessions';

/**
 * Fiche d'un niveau (Académie et page de niveau, groupe 7.1). Les textes encore provisoires (durée, examen visé,
 * marqués TODO dans les données) sont masqués tant que la fondation ne les a pas confirmés ; la prochaine session
 * vient du calendrier réel (dates ISO, sessions passées exclues), plus d'un texte libre.
 */
export default function LevelDetail({ level, headingLevel: H = 'h3' }: { level: GermanLevelCourse; headingLevel?: 'h3' | 'h4' }) {
  const next = upcomingSessions(COURSE_SESSIONS_DATA).find((s) => s.level === level.level);
  const facts: { term: string; value: string }[] = [
    { term: 'Volume horaire', value: level.hours },
    { term: 'Prérequis', value: level.prerequisites },
    ...(isProvisional(level.duration) ? [] : [{ term: 'Durée', value: level.duration }]),
    { term: 'Prochaine session', value: next ? formatSessionStart(next) : 'Pas encore annoncée' },
    { term: 'Format', value: 'En ligne, ou en présentiel à Douala et à Yaoundé selon les sessions' },
  ];

  return (
    <div className="space-y-10">
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {facts.map((f) => (
          <div key={f.term} className="border-t border-border-subtle py-4 space-y-1">
            <dt className="text-meta text-text-secondary">{f.term}</dt>
            <dd className="text-body text-text">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-reveal="" className="space-y-4">
          <H className="text-body font-semibold text-text">Objectifs du niveau {level.level}</H>
          <ul className="list-disc pl-5 space-y-2 text-body text-text marker:text-text-secondary">
            {level.objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </div>
        <div data-reveal="" className="space-y-4">
          <H className="text-body font-semibold text-text">Ce que vous saurez faire à la fin du niveau {level.level}</H>
          <ul className="list-disc pl-5 space-y-2 text-body text-text marker:text-text-secondary">
            {level.canDo.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {!isProvisional(level.examTarget) && (
        <p className="border-t border-border-subtle pt-4 text-body font-semibold text-text">{level.examTarget}</p>
      )}
    </div>
  );
}
