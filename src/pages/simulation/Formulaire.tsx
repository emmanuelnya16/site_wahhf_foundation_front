import { useEffect, useId, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { TFunction } from 'i18next';
import { Mail, MessageCircle, Paperclip, X } from 'lucide-react';
import { useLocalize } from '../../lib/localize';
import { richText } from '../../lib/richText';
import { CONTACT } from '../../config/contact';
import { CAMEROON_REGIONS_LIST } from '../../data/regions';
import {
  SIM_BESOINS,
  SIM_DESCRIPTION_MIN,
  SIM_FICHIERS_EXTENSIONS,
  SIM_FICHIERS_MAX_OCTETS,
  SIM_STATUTS,
} from '../../data/simulation';
import { CHECK_LABEL_CLASS, CHECKBOX_CLASS, FIELD_CLASS, FieldError, LABEL_CLASS, fieldErrorId } from '../../components/wahhf/FormField';
import { buildDraft, mailtoHref, whatsappHref, type ContactDraft } from '../../lib/contactDraft';
import { emailError, focusFirstError, phoneError, requiredError } from '../../lib/formValidation';

/** Délais proposés (un souhait de la personne, jamais une promesse de la fondation) */
const DELAIS = ['aucun', 'trois', 'six', 'plus'] as const;

type Cle =
  | 'nom'
  | 'structure'
  | 'statut'
  | 'region'
  | 'ville'
  | 'secteur'
  | 'besoin'
  | 'description'
  | 'fichiers'
  | 'delai'
  | 'email'
  | 'telephone'
  | 'consentement';
/** Ordre des champs : celui du focus sur la première erreur */
const ORDRE: readonly Cle[] = ['nom', 'structure', 'statut', 'region', 'ville', 'besoin', 'description', 'fichiers', 'email', 'telephone', 'consentement'];

type Valeurs = Record<Exclude<Cle, 'fichiers' | 'consentement'>, string> & { consentement: boolean; nda: boolean };
const VIDE: Valeurs = {
  nom: '',
  structure: '',
  statut: '',
  region: '',
  ville: '',
  secteur: '',
  besoin: '',
  description: '',
  delai: '',
  email: '',
  telephone: '',
  nda: false,
  consentement: false,
};

const nom = (fichier: File) => fichier.name;
const extension = (nomFichier: string) => nomFichier.slice(nomFichier.lastIndexOf('.') + 1).toLowerCase();
const accepte = (fichier: File) =>
  fichier.name.includes('.') && (SIM_FICHIERS_EXTENSIONS as readonly string[]).includes(extension(fichier.name));
const cleFichier = (fichier: File) => `${fichier.name}|${fichier.size}|${fichier.lastModified}`;
const poids = (fichiers: File[]) => fichiers.reduce((total, f) => total + f.size, 0);

/** « 1,2 Mo », « 340 Ko » (« 1.2 MB » en anglais) */
function formatTaille(octets: number, t: TFunction, locale: string): string {
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  if (octets < 1024 * 1024) return t('simulation.formulaire.ko', { n: format.format(Math.max(1, Math.round(octets / 1024))) });
  return t('simulation.formulaire.mo', { n: format.format(octets / (1024 * 1024)) });
}

function verifier(cle: Cle, v: Valeurs, fichiers: File[], t: TFunction, locale: string): string | undefined {
  const e = (k: string, options?: Record<string, unknown>) => t(`simulation.formulaire.erreurs.${k}`, options);
  switch (cle) {
    case 'nom':
    case 'structure':
    case 'statut':
    case 'region':
    case 'ville':
    case 'besoin':
      return requiredError(v[cle], e(cle));
    case 'description': {
      const n = v.description.trim().length;
      if (!n) return e('descriptionVide');
      return n < SIM_DESCRIPTION_MIN ? e('descriptionCourte', { min: SIM_DESCRIPTION_MIN, reste: SIM_DESCRIPTION_MIN - n }) : undefined;
    }
    case 'fichiers': {
      const total = poids(fichiers);
      return total > SIM_FICHIERS_MAX_OCTETS ? e('fichiersPoids', { total: formatTaille(total, t, locale) }) : undefined;
    }
    case 'email':
      return emailError(v.email);
    case 'telephone':
      // Facultatif : vérifié seulement s'il est rempli
      return v.telephone.trim() ? phoneError(v.telephone) : undefined;
    case 'consentement':
      return v.consentement ? undefined : e('consentement');
    default:
      return undefined;
  }
}

/** Champ : libellé, aide (reliée au champ), champ fourni par l'appelant, message d'erreur relié par aria-describedby */
function Champ({
  id,
  label,
  aide,
  erreur,
  autresIds,
  className,
  children,
}: {
  id: string;
  label: string;
  aide?: string;
  erreur?: string;
  /** Autres textes qui décrivent le champ (compteur, liste des fichiers) */
  autresIds?: string[];
  className?: string;
  children: (a11y: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode;
}) {
  const aideId = `${id}-aide`;
  const decrit = [aide && aideId, ...(autresIds ?? []), erreur && fieldErrorId(id)].filter(Boolean).join(' ');
  // Toujours quatre rangées (libellé, aide, champ, erreur), même vides : deux champs voisins partagent les mêmes
  // rangées (sous-grille, simulation.css) et leurs champs restent alignés, quelle que soit la longueur des libellés
  return (
    <div className={className ? `sim-champ ${className}` : 'sim-champ'}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {aide ? (
        <p id={aideId} className="sim-champ-aide">
          {aide}
        </p>
      ) : (
        <span />
      )}
      <div>{children({ id, 'aria-invalid': erreur ? true : undefined, 'aria-describedby': decrit || undefined })}</div>
      <div>
        <FieldError id={fieldErrorId(id)} message={erreur} />
      </div>
    </div>
  );
}

/**
 * Formulaire « Soumettre mon projet » (lot 13, étape 3).
 * Le site n'a pas de serveur d'envoi : le formulaire de Contact prépare un message que la personne envoie elle-même.
 * Ici aussi, aucun faux succès : « Envoyer ma demande par WhatsApp » ouvre WhatsApp avec la demande déjà écrite, « Envoyer
 * par e-mail » ouvre la messagerie ; les fichiers sont vérifiés (formats, 10 Mo au total) et listés dans le message,
 * la personne les joint elle-même. Champ piège invisible contre les robots. Quand un script d'envoi existera sur
 * l'hébergement (proposition : docs/page-simulation.md), seul l'envoi change : le succès viendra alors du numéro de
 * demande renvoyé par le serveur.
 */
export default function Formulaire() {
  const { t, lang, locale, localized } = useLocalize();
  const f = (cle: string, options?: Record<string, unknown>) => t(`simulation.formulaire.${cle}`, options);
  const uid = useId();
  const idDe = (cle: Cle) => `sim-${cle}-${uid}`;

  const [valeurs, setValeurs] = useState<Valeurs>(VIDE);
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [refuses, setRefuses] = useState<string[]>([]);
  const [erreurs, setErreurs] = useState<Partial<Record<Cle, string>>>({});
  const [pot, setPot] = useState('');
  const [canal, setCanal] = useState<'whatsapp' | 'email' | null>(null);

  const regions = useMemo(
    () =>
      CAMEROON_REGIONS_LIST.map((r) => ({ id: r.id, nom: localized(r, `contenu.regions.${r.id}`).name })).sort((a, b) =>
        a.nom.localeCompare(b.nom, locale)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const verifierUn = (cle: Cle, v = valeurs, liste = fichiers) => verifier(cle, v, liste, t, locale);
  /** Un champ déjà en erreur se revérifie à chaque changement (l'erreur disparaît dès qu'elle est corrigée) */
  const changer = <K extends keyof Valeurs>(cle: K, valeur: Valeurs[K]) => {
    const suivantes = { ...valeurs, [cle]: valeur };
    setValeurs(suivantes);
    if (erreurs[cle as Cle]) setErreurs((prev) => ({ ...prev, [cle]: verifierUn(cle as Cle, suivantes) }));
  };
  /** À la sortie d'un champ rempli : vérification (jamais pendant la frappe) */
  const quitter = (cle: Cle) => {
    const valeur = valeurs[cle as keyof Valeurs];
    if (typeof valeur === 'string' && valeur.trim()) setErreurs((prev) => ({ ...prev, [cle]: verifierUn(cle) }));
  };

  // Changement de langue : les erreurs déjà affichées passent dans la nouvelle langue
  useEffect(() => {
    setErreurs((prev) => {
      const next: Partial<Record<Cle, string>> = {};
      for (const cle of Object.keys(prev) as Cle[]) next[cle] = prev[cle] && verifierUn(cle);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ajouterFichiers = (event: ChangeEvent<HTMLInputElement>) => {
    const choisis = Array.from(event.target.files ?? []);
    event.target.value = '';
    const bons = choisis.filter(accepte);
    const deja = new Set(fichiers.map(cleFichier));
    const liste = [...fichiers, ...bons.filter((fichier) => !deja.has(cleFichier(fichier)))];
    setFichiers(liste);
    setRefuses(choisis.filter((fichier) => !accepte(fichier)).map(nom));
    setErreurs((prev) => ({ ...prev, fichiers: verifierUn('fichiers', valeurs, liste) }));
  };
  const retirerFichier = (cle: string) => {
    const liste = fichiers.filter((fichier) => cleFichier(fichier) !== cle);
    setFichiers(liste);
    setRefuses([]);
    setErreurs((prev) => ({ ...prev, fichiers: verifierUn('fichiers', valeurs, liste) }));
  };

  // Message préparé : libellés dans la langue de la page, réponses telles que saisies
  const listeFichiers = fichiers.map((fichier) => `${fichier.name} (${formatTaille(fichier.size, t, locale)})`).join(', ');
  const brouillon: ContactDraft = buildDraft(
    f('draft.subject', { structure: valeurs.structure.trim() || valeurs.nom.trim() }),
    f('draft.intro'),
    [
      [f('draft.nom'), valeurs.nom],
      [f('draft.structure'), valeurs.structure],
      [f('draft.statut'), valeurs.statut && f(`statuts.${valeurs.statut}`)],
      [f('draft.region'), regions.find((r) => r.id === valeurs.region)?.nom],
      [f('draft.ville'), valeurs.ville],
      [f('draft.secteur'), valeurs.secteur],
      [f('draft.besoin'), valeurs.besoin && f(`besoins.${valeurs.besoin}`)],
      [f('draft.description'), valeurs.description],
      [f('draft.delai'), valeurs.delai && f(`delais.${valeurs.delai}`)],
      [f('draft.email'), valeurs.email],
      [f('draft.telephone'), valeurs.telephone],
      [f('draft.nda'), valeurs.nda ? f('draft.ndaOui') : undefined],
      [f('draft.fichiers'), listeFichiers],
    ],
    f('draft.consent')
  );

  const envoyer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trouvees: Partial<Record<Cle, string>> = {};
    for (const cle of ORDRE) trouvees[cle] = verifierUn(cle);
    setErreurs(trouvees);
    setRefuses([]);
    if (focusFirstError(ORDRE, trouvees, idDe)) {
      setCanal(null);
      return;
    }
    // Champ piège rempli : un robot. Rien ne s'ouvre, rien ne s'affiche.
    if (pot) return;
    const choix = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') === 'email' ? 'email' : 'whatsapp';
    if (choix === 'whatsapp') window.open(whatsappHref(brouillon), '_blank', 'noopener,noreferrer');
    else window.location.href = mailtoHref(brouillon);
    setCanal(choix);
  };

  const selectOptions = (cles: readonly string[], prefixe: string) =>
    cles.map((cle) => (
      <option key={cle} value={cle}>
        {f(`${prefixe}.${cle}`)}
      </option>
    ));
  const compteurId = `${idDe('description')}-compteur`;
  const listeId = `${idDe('fichiers')}-liste`;
  const n = valeurs.description.trim().length;

  return (
    <div className="sim-formulaire">
      <h3 className="sim-h3">{f('titre')}</h3>
      <p className="sim-champ-aide">{f('obligatoires')}</p>

      <form onSubmit={envoyer} noValidate className="sim-formulaire-corps">
        <fieldset className="sim-groupe">
          <legend className="sim-legende">{f('groupes.vous')}</legend>
          <div className="sim-champs">
            <Champ id={idDe('nom')} label={f('nom')} erreur={erreurs.nom}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={valeurs.nom}
                  onChange={(e) => changer('nom', e.target.value)}
                  onBlur={() => quitter('nom')}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
            <Champ id={idDe('structure')} label={f('structure')} erreur={erreurs.structure}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  value={valeurs.structure}
                  onChange={(e) => changer('structure', e.target.value)}
                  onBlur={() => quitter('structure')}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
            <Champ id={idDe('statut')} label={f('statut')} erreur={erreurs.statut}>
              {(a11y) => (
                <select {...a11y} value={valeurs.statut} onChange={(e) => changer('statut', e.target.value)} className={FIELD_CLASS}>
                  <option value="">{f('choisir')}</option>
                  {selectOptions(SIM_STATUTS, 'statuts')}
                </select>
              )}
            </Champ>
            <Champ id={idDe('secteur')} label={f('secteur')} aide={f('secteurAide')}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  maxLength={100}
                  value={valeurs.secteur}
                  onChange={(e) => changer('secteur', e.target.value)}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
            <Champ id={idDe('region')} label={f('region')} erreur={erreurs.region}>
              {(a11y) => (
                <select {...a11y} value={valeurs.region} onChange={(e) => changer('region', e.target.value)} className={FIELD_CLASS}>
                  <option value="">{f('choisir')}</option>
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nom}
                    </option>
                  ))}
                </select>
              )}
            </Champ>
            <Champ id={idDe('ville')} label={f('ville')} erreur={erreurs.ville}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  autoComplete="address-level2"
                  maxLength={80}
                  value={valeurs.ville}
                  onChange={(e) => changer('ville', e.target.value)}
                  onBlur={() => quitter('ville')}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
          </div>
        </fieldset>

        <fieldset className="sim-groupe">
          <legend className="sim-legende">{f('groupes.projet')}</legend>
          <div className="sim-champs">
            <Champ id={idDe('besoin')} label={f('besoin')} erreur={erreurs.besoin} className="sim-champ-large">
              {(a11y) => (
                <select {...a11y} value={valeurs.besoin} onChange={(e) => changer('besoin', e.target.value)} className={FIELD_CLASS}>
                  <option value="">{f('choisir')}</option>
                  {selectOptions(SIM_BESOINS, 'besoins')}
                </select>
              )}
            </Champ>
            <Champ
              id={idDe('description')}
              label={f('description')}
              aide={f('descriptionAide')}
              erreur={erreurs.description}
              autresIds={[compteurId]}
              className="sim-champ-large"
            >
              {(a11y) => (
                <>
                  <textarea
                    {...a11y}
                    rows={6}
                    maxLength={2000}
                    value={valeurs.description}
                    onChange={(e) => changer('description', e.target.value)}
                    onBlur={() => quitter('description')}
                    className={FIELD_CLASS}
                  />
                  <p id={compteurId} className={n >= SIM_DESCRIPTION_MIN ? 'sim-compteur is-ok' : 'sim-compteur'}>
                    {f('compteur', { n, min: SIM_DESCRIPTION_MIN })}
                  </p>
                </>
              )}
            </Champ>
            <Champ
              id={idDe('fichiers')}
              label={f('fichiers')}
              aide={f('fichiersAide')}
              erreur={erreurs.fichiers ?? (refuses.length ? f('erreurs.fichierType', { noms: refuses.join(', ') }) : undefined)}
              autresIds={fichiers.length ? [listeId] : undefined}
              className="sim-champ-large"
            >
              {(a11y) => (
                <input
                  {...a11y}
                  type="file"
                  multiple
                  accept={SIM_FICHIERS_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
                  onChange={ajouterFichiers}
                  className={`${FIELD_CLASS} sim-fichier`}
                />
              )}
            </Champ>
            {fichiers.length > 0 && (
              <div className="sim-champ-large sim-fichiers-bloc">
                <ul className="sim-fichiers">
                  {fichiers.map((fichier) => (
                    <li key={cleFichier(fichier)}>
                      <Paperclip aria-hidden="true" className="sim-fichiers-icone" />
                      <span className="sim-fichiers-nom">{fichier.name}</span>
                      <span className="sim-fichiers-poids">{formatTaille(fichier.size, t, locale)}</span>
                      <button
                        type="button"
                        className="sim-retirer"
                        aria-label={f('retirer', { nom: fichier.name })}
                        onClick={() => retirerFichier(cleFichier(fichier))}
                      >
                        <X aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
                <p id={listeId} className="sim-champ-aide">
                  {f('fichiersTotal', { taille: formatTaille(poids(fichiers), t, locale) })}
                </p>
              </div>
            )}
            <Champ id={idDe('delai')} label={f('delai')} aide={f('delaiAide')} className="sim-champ-large">
              {(a11y) => (
                <select {...a11y} value={valeurs.delai} onChange={(e) => changer('delai', e.target.value)} className={FIELD_CLASS}>
                  <option value="">{f('choisir')}</option>
                  {selectOptions(DELAIS, 'delais')}
                </select>
              )}
            </Champ>
          </div>
        </fieldset>

        <fieldset className="sim-groupe">
          <legend className="sim-legende">{f('groupes.contact')}</legend>
          <div className="sim-champs">
            <Champ id={idDe('email')} label={f('email')} erreur={erreurs.email}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={254}
                  value={valeurs.email}
                  onChange={(e) => changer('email', e.target.value)}
                  onBlur={() => quitter('email')}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
            <Champ id={idDe('telephone')} label={f('telephone')} aide={f('telephoneAide')} erreur={erreurs.telephone}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={30}
                  value={valeurs.telephone}
                  onChange={(e) => changer('telephone', e.target.value)}
                  onBlur={() => quitter('telephone')}
                  className={FIELD_CLASS}
                />
              )}
            </Champ>
          </div>
        </fieldset>

        {/* Champ piège : invisible et hors du parcours au clavier ; un robot le remplit, une personne jamais */}
        <div className="sim-pot" aria-hidden="true">
          <label>
            {f('pot')}
            <input type="text" name="site" tabIndex={-1} autoComplete="off" value={pot} onChange={(e) => setPot(e.target.value)} />
          </label>
        </div>

        <div className="sim-cases">
          <label className={CHECK_LABEL_CLASS}>
            <input type="checkbox" checked={valeurs.nda} onChange={(e) => changer('nda', e.target.checked)} className={CHECKBOX_CLASS} />
            <span>{f('nda')}</span>
          </label>
          <div>
            <label className={CHECK_LABEL_CLASS}>
              <input
                id={idDe('consentement')}
                type="checkbox"
                checked={valeurs.consentement}
                onChange={(e) => changer('consentement', e.target.checked)}
                aria-invalid={erreurs.consentement ? true : undefined}
                aria-describedby={erreurs.consentement ? fieldErrorId(idDe('consentement')) : undefined}
                className={CHECKBOX_CLASS}
              />
              <span>
                {richText(f('consentement'), {
                  lien: (texte) => (
                    <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4">
                      {texte}
                      <span className="sr-only"> {t('simulation.nouvelOnglet')}</span>
                    </Link>
                  ),
                })}
              </span>
            </label>
            <FieldError id={fieldErrorId(idDe('consentement'))} message={erreurs.consentement} />
          </div>
        </div>

        <div className="sim-envoi">
          <div className="sim-actions">
            <button type="submit" value="whatsapp" className="ac-btn ac-btn-nuit">
              <MessageCircle aria-hidden="true" className="sim-bouton-icone" />
              <span>{f('envoyerWhatsapp')}</span>
            </button>
            <button type="submit" value="email" className="ac-btn ac-btn-contour">
              <Mail aria-hidden="true" className="sim-bouton-icone" />
              <span>{f('envoyerEmail')}</span>
            </button>
          </div>
          <p className="sim-note">{f('note')}</p>
          <p className="sim-note">{f('confidentialite')}</p>
        </div>

        {/* Annonce polie : la demande est prête dans l'application choisie ; ce n'est pas un envoi */}
        <div role="status" className={canal ? 'sim-pret' : undefined}>
          {canal && (
            <>
              <p className="sim-pret-titre">{f(`pret.${canal}`)}</p>
              <p>{f('pret.envoyer')}</p>
              {fichiers.length > 0 && <p>{f('pret.joindre', { liste: fichiers.map(nom).join(', ') })}</p>}
              <p>
                {richText(f('pret.rien', { email: CONTACT.email }), {
                  whatsapp: (texte) => (
                    <a href={whatsappHref(brouillon)} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-4">
                      {texte}
                      <span className="sr-only"> {t('simulation.nouvelOnglet')}</span>
                    </a>
                  ),
                  mail: (texte) => (
                    <a href={mailtoHref(brouillon)} className="text-link underline underline-offset-4 break-all">
                      {texte}
                    </a>
                  ),
                })}
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
