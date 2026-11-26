import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Photo from '../../components/wahhf/Photo';
import { memberPortrait, visibleMembers } from '../../lib/team';

/** En production, seulement les personnes au nom confirmé, et dont le portrait est publiable (memberPortrait). */
const SHOW_ALL = !import.meta.env.PROD || import.meta.env.VITE_APERCU_EQUIPE === '1';

/**
 * Rangée de visages du hero (src/data/team.ts) : ronds de 46 px qui se chevauchent, puis deux lignes ; le groupe est un
 * lien vers Qui sommes-nous. Portraits décoratifs : le texte du lien dit tout, et un nom non confirmé n'apparaît dans
 * aucun texte alternatif. Sans portrait publiable, les deux lignes restent seules.
 */
export default function Equipe() {
  const { t } = useTranslation();
  const faces = visibleMembers()
    .filter((m) => SHOW_ALL || m.nomConfirme)
    .flatMap((m) => {
      const portrait = memberPortrait(m);
      return portrait ? [{ id: m.id, portrait }] : [];
    })
    .slice(0, 4);

  return (
    <Link to="/qui-sommes-nous" className="ac-equipe">
      {faces.length > 0 && (
        <span className="ac-visages" aria-hidden="true">
          {faces.map(({ id, portrait }, i) => (
            <span key={id} className="ac-visage" style={{ '--rang': i } as CSSProperties}>
              <Photo photo={portrait} sizes="46px" fit="cover" radius="none" decorative />
            </span>
          ))}
        </span>
      )}
      <span className="ac-equipe-texte ac-entree" style={{ '--delai': '0.75s' } as CSSProperties}>
        <span className="ac-equipe-titre">{t('accueil.hero.equipe')}</span>{' '}
        <span className="ac-equipe-suite">{t('accueil.hero.equipeSuite')}</span>
      </span>
    </Link>
  );
}
