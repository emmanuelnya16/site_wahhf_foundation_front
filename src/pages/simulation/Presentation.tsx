import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, Check, GraduationCap, Handshake, Store, X, type LucideIcon } from 'lucide-react';
import { IROKO_ENGINEER_URL } from '../../config/contact';
import { DOMAIN_LINKS } from '../../lib/events';
import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';
import Entree from '../accueil/Entree';

const POURQUOI: { id: 'economie' | 'jeunesse' | 'iroko'; icone: LucideIcon; lien?: string }[] = [
  { id: 'economie', icone: Store, lien: DOMAIN_LINKS.entrepreneurship },
  { id: 'jeunesse', icone: GraduationCap, lien: DOMAIN_LINKS.education },
  { id: 'iroko', icone: Handshake },
];

/** 2. Pourquoi ce programme (papier) : trois cartes coin feuille, reliées aux domaines Entrepreneuriat et Éducation */
export function Pourquoi() {
  const { t } = useTranslation();
  return (
    <section className="sim-section sim-fond-papier" aria-labelledby="sim-pourquoi">
      <Entree className="container-page">
        <Tete id="sim-pourquoi" cle="pourquoi" />
        <ul className="sim-grille-3">
          {POURQUOI.map(({ id, icone: Icone, lien }) => (
            <li key={id} className="sim-carte-feuille">
              <span className="sim-icone" aria-hidden="true">
                <Icone />
              </span>
              <h3 className="sim-h3">{t(`simulation.pourquoi.cartes.${id}.titre`)}</h3>
              <p className="sim-texte">{t(`simulation.pourquoi.cartes.${id}.texte`)}</p>
              {lien && (
                <Link to={lien} className="ac-lien sim-lien">
                  <span>{t(`simulation.pourquoi.cartes.${id}.lien`)}</span>
                  <ArrowRight aria-hidden="true" className="ac-fleche" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Entree>
    </section>
  );
}

/** 3. Ce que nous offrons (sauge) : 4 cartes numérotées 01 à 04, et ce que vous recevez */
export function Offre() {
  const { t } = useTranslation();
  const { offres } = useSimulation();
  return (
    <section className="sim-section sim-fond-sauge" aria-labelledby="sim-offre">
      <Entree className="container-page">
        <Tete id="sim-offre" cle="offre" />
        <ol className="sim-grille-4">
          {offres.map((offre, i) => (
            <li key={offre.id} className="sim-carte-feuille sim-carte-offre">
              <span className="sim-numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="sim-h3">
                {offre.titre} <BadgeAConfirmer item={offre} />
              </h3>
              <p className="sim-texte">{offre.texte}</p>
              <p className="sim-recu">
                <Check aria-hidden="true" />
                <span>
                  <span className="sr-only">{t('simulation.offre.recu')} : </span>
                  {offre.recu}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </Entree>
    </section>
  );
}

/** 4. Pour qui ? (papier) : à qui s'adresse le programme ; encadré « n'est pas fait pour… » et IROKO Engineer */
export function Publics() {
  const { t } = useTranslation();
  const { publics, nonPublics } = useSimulation();
  return (
    <section id="pour-qui" className="sim-section sim-fond-papier" aria-labelledby="sim-publics">
      <Entree className="container-page">
        <Tete id="sim-publics" cle="publics" />
        <div className="sim-publics">
          <div>
            <h3 className="sim-h3">{t('simulation.publics.pour')}</h3>
            <ul className="sim-liste-coche">
              {publics.map((p) => (
                <li key={p.id}>
                  <Check aria-hidden="true" />
                  <span>
                    {p.texte} <BadgeAConfirmer item={p} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="sim-base">{t('simulation.publics.base')}</p>
          </div>
          <aside className="sim-encadre" aria-labelledby="sim-non">
            <h3 id="sim-non" className="sim-h3">
              {t('simulation.publics.non')}
            </h3>
            <ul className="sim-liste-non">
              {nonPublics.map((p) => (
                <li key={p.id}>
                  <X aria-hidden="true" />
                  <span>
                    {p.texte} <BadgeAConfirmer item={p} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="sim-texte">{t('simulation.publics.nonTexte')}</p>
            <a href={IROKO_ENGINEER_URL} target="_blank" rel="noopener noreferrer" className="ac-lien sim-lien">
              <span>{t('simulation.publics.iroko')}</span>
              <span className="sr-only"> {t('simulation.nouvelOnglet')}</span>
              <ArrowUpRight aria-hidden="true" className="ac-fleche" />
            </a>
          </aside>
        </div>
      </Entree>
    </section>
  );
}
