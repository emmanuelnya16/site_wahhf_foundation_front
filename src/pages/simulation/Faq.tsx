import { ChevronDown } from 'lucide-react';
import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';

/**
 * 10. Questions fréquentes (papier) : accordéon sur deux colonnes, en <details> natifs (clavier et lecteurs d'écran sans
 * script). Réponses prudentes ; tout délai ou volume reste « à confirmer ».
 */
export default function Faq() {
  const { faq } = useSimulation();
  const moitie = Math.ceil(faq.length / 2);
  const colonnes = [faq.slice(0, moitie), faq.slice(moitie)];
  return (
    <section id="faq" className="sim-section sim-fond-papier" aria-labelledby="sim-faq">
      <div className="container-page">
        <Tete id="sim-faq" cle="faq" />
        <div className="sim-faq">
          {colonnes.map((colonne, c) => (
            <div key={c} className="sim-faq-colonne">
              {colonne.map((q) => (
                <details key={q.id} className="sim-question">
                  <summary>
                    <span>
                      {q.question} <BadgeAConfirmer item={q} />
                    </span>
                    <ChevronDown aria-hidden="true" className="sim-question-chevron" />
                  </summary>
                  <p className="sim-texte">{q.reponse}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
