import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { CONTACT, IROKO_ENGINEER_URL } from '../../config/contact';
import { Tete } from './ui';

/**
 * 11. Soumettre mon projet (forêt) : le formulaire sur une carte blanche (étape 3) ; à côté, le WhatsApp officiel et le
 * lien vers IROKO Engineer pour une étude complète ou certifiée.
 */
export default function Soumettre({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <section id="soumettre" className="sim-section sim-fond-foret" aria-labelledby="sim-soumettre">
      <div className="container-page sim-soumettre">
        <div className="sim-soumettre-cote">
          <Tete id="sim-soumettre" cle="soumettre" intro />
          <div className="sim-soumettre-aide">
            <p className="sim-aide-titre">{t('simulation.soumettre.whatsappTitre')}</p>
            <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="ac-lien sim-lien">
              <MessageCircle aria-hidden="true" className="ac-fleche" />
              <span>{t('simulation.soumettre.whatsapp', { numero: CONTACT.whatsappDisplay })}</span>
              <span className="sr-only"> {t('simulation.nouvelOnglet')}</span>
            </a>
          </div>
          <div className="sim-soumettre-aide">
            <p className="sim-aide-titre">{t('simulation.soumettre.irokoTitre')}</p>
            <a href={IROKO_ENGINEER_URL} target="_blank" rel="noopener noreferrer" className="ac-lien sim-lien">
              <span>{t('simulation.soumettre.iroko')}</span>
              <span className="sr-only"> {t('simulation.nouvelOnglet')}</span>
              <ArrowUpRight aria-hidden="true" className="ac-fleche" />
            </a>
          </div>
        </div>
        {children && <div className="sim-formulaire-carte">{children}</div>}
      </div>
    </section>
  );
}
