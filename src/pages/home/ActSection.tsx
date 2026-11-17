import { FormEvent, Ref, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { LABEL_CLASS, FIELD_CLASS } from '../../components/wahhf/FormField';
import ContactHandoff from '../../components/wahhf/ContactHandoff';
import { buildDraft } from '../../lib/contactDraft';
import { useFocusOnChange } from '../../lib/useFocusOnChange';

/**
 * 7. Agir + lettre d'information (contrat §7, section 7 ; ACC-06) : un seul bloc sur sauge.
 * - Deux voies en liste typographique : devenir bénévole, devenir partenaire (titres-liens vers /agir).
 *   Le don n'y figure pas : il reste dans le hero, l'en-tête et le footer. Plus de bande de don finale.
 * - Lettre d'information : libellé visible, phrase sur l'usage de l'adresse, lien vers /confidentialite, envoi honnête
 *   (le site n'inscrit encore personne : il prépare un message à envoyer par WhatsApp ou par e-mail).
 */
export default function ActSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [prepared, setPrepared] = useState(false);
  // Le formulaire et l'encart se remplacent : le focus passe au titre de l'encart, puis revient au champ
  const focusRef = useFocusOnChange<HTMLElement>(prepared);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setPrepared(true);
  };
  const draft = buildDraft(
    'Inscription à la lettre d’information WAHHF',
    'Je souhaite recevoir la lettre d’information de WAHHF Foundation.',
    [['Adresse e-mail', email]]
  );

  return (
    <Section tone="sauge" id="agir">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <SectionHeader title={t('home.act.title')} subtitle={t('home.act.subtitle')} />
          <TextList>
            <TextListItem title="Devenir bénévole" to="/agir#benevole">
              <p>Rejoignez nos équipes au Cameroun, en Allemagne ou à distance : enseignement des langues, mentorat, santé ou logistique.</p>
            </TextListItem>
            <TextListItem title="Devenir partenaire" to="/agir#partenaire">
              <p>Écoles, universités, ONG, fondations et entreprises : co-construisons des programmes d’intérêt général mesurables.</p>
            </TextListItem>
          </TextList>
        </div>

        <div id="lettre" className="space-y-4">
          <h3 className="text-[1.375rem] font-semibold leading-tight text-text">{t('home.newsletter.title')}</h3>
          <p className="text-body text-text-secondary max-w-[65ch]">
            {t('home.newsletter.subtitle')}{' '}
            <Link to="/confidentialite" className="text-link underline underline-offset-4 decoration-1 hover:decoration-2">
              {t('home.newsletter.privacyLink')}
            </Link>
          </p>
          <p role="status" className="sr-only">
            {prepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
          </p>
          {prepared ? (
            <ContactHandoff
              compact
              headingLevel="h3"
              title="Dernière étape : envoyez votre demande d’inscription"
              draft={draft}
              titleRef={focusRef as Ref<HTMLHeadingElement>}
              onEdit={() => setPrepared(false)}
              editLabel="Modifier mon adresse"
            />
          ) : (
            <form onSubmit={onSubmit} className="pt-2">
              <label htmlFor="wahhf-newsletter-email" className={LABEL_CLASS}>
                {t('home.newsletter.placeholder')}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={focusRef as Ref<HTMLInputElement>}
                  id="wahhf-newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FIELD_CLASS}
                />
                <PrimaryButton type="submit" className="shrink-0">
                  {t('home.newsletter.button')}
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
