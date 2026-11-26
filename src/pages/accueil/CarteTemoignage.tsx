import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import type { Temoignage } from '../../data/accueil-temoignages';
import { useLocalize } from '../../lib/localize';
import { photoOrFallback } from '../../lib/photos';

/** Où raconter son parcours : le formulaire de contact, motif « Partager mon parcours » déjà choisi (réponse 205) */
export const LIEN_RACONTER = '/contact?motif=parcours';

/** Grands guillemets soleil (décor) */
function Guillemets() {
  return (
    <svg className="ac-guillemets" viewBox="0 0 64 44" aria-hidden="true" focusable="false">
      <path d="M0 44 V27 C0 10 9 2 24 0 V9 C17 11 13 15 13 22 H25 V44 Z M36 44 V27 C36 10 45 2 60 0 V9 C53 11 49 15 49 22 H61 V44 Z" />
    </svg>
  );
}

/** Un témoignage : la citation, puis la personne */
export function CarteTemoignage({ temoignage }: { temoignage: Temoignage }) {
  const { t, lang } = useLocalize();
  const photo = temoignage.photo ? photoOrFallback(temoignage.photo) : null;
  return (
    <>
      <Guillemets />
      <blockquote className="ac-citation">
        <p key={lang} className="ac-citation-texte">
          {t('accueil.parcours.citation', { citation: temoignage.citation })}
        </p>
      </blockquote>
      <p className="ac-temoin-resume">{temoignage.resume}</p>
      <div className="ac-temoin-personne">
        <span className="ac-temoin-photo">
          {photo ? (
            <Photo photo={photo} sizes="10rem" fit="cover" radius="none" decorative style={temoignage.cadrage ? { objectPosition: temoignage.cadrage } : undefined} />
          ) : (
            <span className="ac-temoin-initiale" aria-hidden="true">
              {temoignage.nom.charAt(0)}
            </span>
          )}
        </span>
        <div>
          <p className="ac-temoin-nom">{temoignage.nom}</p>
          <p className="ac-temoin-lieu">
            {[temoignage.age !== undefined ? t('accueil.parcours.age', { age: temoignage.age }) : null, temoignage.ville].filter(Boolean).join(', ')}
          </p>
        </div>
      </div>
      <p className="ac-temoin-domaine">{temoignage.domaine}</p>
      {temoignage.resultat && <p className="ac-temoin-resultat">{temoignage.resultat}</p>}
    </>
  );
}

/** Carte vierge : des guillemets, une silhouette, aucun nom. Avec `invite` (dans le paquet), elle invite à raconter. */
export function CarteVierge({ invite = false }: { invite?: boolean }) {
  const { t } = useLocalize();
  return (
    <>
      <Guillemets />
      {invite ? (
        <p className="ac-citation ac-citation-texte">{t('accueil.parcours.vierge')}</p>
      ) : (
        <span className="ac-traits">
          <i />
          <i />
          <i />
        </span>
      )}
      <div className="ac-temoin-personne">
        <span className="ac-temoin-photo">
          <User aria-hidden="true" />
        </span>
        {invite ? (
          <Link to={LIEN_RACONTER} className="ac-lien ac-temoin-lien">
            <span>{t('accueil.parcours.raconter')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        ) : (
          <span className="ac-traits ac-traits-nom">
            <i />
            <i />
          </span>
        )}
      </div>
    </>
  );
}
