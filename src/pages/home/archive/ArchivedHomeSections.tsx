import { useEffect, useState, useRef, FormEvent, Ref } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, Variants } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  Mail,
} from 'lucide-react';
import SEO from '../../../components/wahhf/SEO';
import SectionHeader from '../../../components/wahhf/SectionHeader';
import Section from '../../../components/wahhf/Section';
import { TextList, TextListItem } from '../../../components/wahhf/TextList';
import { CardLink, CardMedia, CardBody, CardMeta, CardTitle } from '../../../components/wahhf/Card';
import { LABEL_CLASS, FIELD_CLASS } from '../../../components/wahhf/FormField';
import { cn } from '../../../lib/utils';
import { PrimaryButton, SecondaryButton, DonateButton } from '../../../components/wahhf/Buttons';
import { useFocusOnChange } from '../../../lib/useFocusOnChange';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../../../lib/motionTokens';
import ContactHandoff from '../../../components/wahhf/ContactHandoff';
import { buildDraft } from '../../../lib/contactDraft';
import SplitReveal from '../../../effects/SplitReveal';

import { useTimelineDraw } from '../../../effects/useTimelineDraw';
import StaggerGroup from '../../../effects/StaggerGroup';

import {
  DOMAINS_DATA,
  NEWS_DATA,
  TIMELINE_MILESTONES,
  WAHHF_IMAGES,
  WAHHF_LOGO_URL,
  imageSrcSet,
} from '../../../services/api';

/** Changement de témoignage : léger glissement dans le sens de navigation, sans rebond. */
const testimonialSlide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: DURATION.fast, ease: EASE_SCREEN } }),
};

const TESTIMONIALS_TODO = [
  {
    id: 1,
    firstName: 'Aline M. (TODO : valider témoignage)',
    role: 'Apprenante niveau B1 · Cohorte Douala',
    quote:
      '« Pouvoir suivre des cours d’allemand structurés du niveau A1 jusqu’au B1 sans aucun frais a changé ma trajectoire. L’équipe nous met en garde contre les fausses promesses et nous apprend à préparer un dossier authentique. »',
    image: WAHHF_IMAGES.education,
  },
  {
    id: 2,
    firstName: 'Samuel N. (TODO : valider témoignage)',
    role: 'Jeune porteur de projet · Entrepreneuriat & Agroécologie',
    quote:
      '« Grâce aux ateliers gratuits de gestion et d’agroécologie soutenus par WAHHF Foundation, notre coopérative de jeunes a pu structurer sa pépinière villageoise avec dignité et autonomie. »',
    image: WAHHF_IMAGES.entrepreneurship,
  },
  {
    id: 3,
    firstName: 'Dr. Clarisse E. (TODO : valider témoignage)',
    role: 'Médecin bénévole · Campagnes Santé Communautaire',
    quote:
      '« Sur le terrain, chaque journée de prévention maternelle et infantile démontre qu’une écoute respectueuse et une organisation rigoureuse sauvent des vies durablement. »',
    image: WAHHF_IMAGES.health,
  },
];

const PARTNERS_LIST = [
  { name: 'Groupe IROKO — Mécène fondateur (10 pôles)', tag: 'Partenaire Fondateur' },
  { name: 'Réseau des Écoles & Bibliothèques Partenaires (TODO)', tag: 'Éducation' },
  { name: 'Collectif Médical Camerouno-Allemand (TODO)', tag: 'Santé' },
  { name: 'Mentors & Enseignants d’Allemand Solidaires (TODO)', tag: 'Mobilité & Langues' },
  { name: 'Initiatives Agroécologiques Régionales (TODO)', tag: 'Environnement' },
  { name: 'Donateurs & Philanthropes Engagés', tag: 'Mécénat' },
];

/**
 * Sections retirées de l'accueil au lot 6 (décision du 16/11), MASQUÉES SANS SUPPRESSION : ce composant n'est
 * importé nulle part. Mission et carte « Identité & Lien IROKO », Approche, frise « Notre parcours » (elles iront sur
 * /qui-sommes-nous, contrat §7), témoignages fictifs (T-02), actualités d'exemple (T-03), partenaires TODO.
 * Code recopié tel qu'il était sur l'accueil (effets compris : SplitText, frise dessinée, carrousel), à reprendre
 * aux couleurs et au mouvement du contrat le jour où une section revient.
 */
export function ArchivedHomeSections() {
  const { t, i18n } = useTranslation();


  // Frise : la ligne se dessine au défilement, chaque jalon apparaît quand il est atteint
  const timelineRef = useRef<HTMLDivElement>(null);
  useTimelineDraw(timelineRef);


  // Carrousel témoignages
  const [[activeTestimonial, testimonialDir], setTestimonial] = useState<[number, number]>([0, 0]);
  const paginateTestimonials = (dir: 1 | -1) =>
    setTestimonial(([index]) => [(index + dir + TESTIMONIALS_TODO.length) % TESTIMONIALS_TODO.length, dir]);


  return (
    <>

      {/* =====================================================================
          2. MISSION (« Qui sommes-nous »)
          ===================================================================== */}
      <section id="mission" className="container-page section-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              title={t('home.mission.title')}
            />
            {/* Effet fort de la section : paragraphes révélés ligne par ligne (SplitText).
                key = langue : à la bascule FR/EN, le texte est re-découpé proprement. */}
            <SplitReveal
              key={`mission-p1-${i18n.language}`}
              id="mission-p1"
              className="text-base sm:text-lg text-v1-encre/85 dark:text-creme/85 leading-relaxed"
            >
              {t('home.mission.p1')}
            </SplitReveal>
            <SplitReveal
              key={`mission-p2-${i18n.language}`}
              id="mission-p2"
              className="text-base sm:text-lg text-text-secondary leading-relaxed"
            >
              {t('home.mission.p2')}
            </SplitReveal>
            <div className="pt-2">
              <Link
                to="/qui-sommes-nous"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4"
              >
                <span>{t('home.mission.link')}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-card bg-surface-raised border border-border-soft p-7 sm:p-9 shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <img
                  src={WAHHF_LOGO_URL}
                  alt="Logo officiel WAHHF Foundation"
                  width={68}
                  height={68}
                  loading="lazy"
                  className="w-16 h-16 object-contain rounded-2xl bg-creme p-1.5 border border-nuit/10"
                />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-or">
                    Identité & Lien IROKO
                  </span>
                  <h3 className="font-serif font-normal text-2xl text-text">
                    We Are Here Help Foundation
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                En tant que <strong>branche sociale du groupe IROKO</strong>, nos frais de structure sont soutenus afin que chaque programme éducatif, sanitaire ou linguistique demeure accessible dignement et sans barrière financière.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl bg-creme dark:bg-nuit/60 p-4">
                  <p className="text-xs text-text-muted">Ancrage</p>
                  <p className="font-serif text-lg text-accent mt-0.5">
                    Cameroun & Allemagne
                  </p>
                </div>
                <div className="rounded-2xl bg-creme dark:bg-nuit/60 p-4">
                  <p className="text-xs text-text-muted">Principe</p>
                  <p className="font-serif text-lg text-accent mt-0.5">
                    100 % Non lucratif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* =====================================================================
          7. NOTRE APPROCHE (5 vignettes avec icônes)
          ===================================================================== */}
      <Section tone="sauge" id="approche">
        <div className="container-page space-y-12">
          <SectionHeader
            title={t('home.approach.title')}
            subtitle={t('home.approach.subtitle')}
          />

          <TextList columns={3}>
            {[
              {
                num: '01',
                title: 'Écoute',
                desc: 'Partir des besoins exprimés par les jeunes, les mères et les acteurs de terrain sans imposer de modèle préconçu.',
              },
              {
                num: '02',
                title: 'Co-construction',
                desc: 'Bâtir chaque action avec les enseignants, soignants et associations locales pour un impact partagé.',
              },
              {
                num: '03',
                title: 'Durabilité',
                desc: 'Privilégier la transmission de compétences durables (langues, métiers, écologie) plutôt que l’assistanat.',
              },
              {
                num: '04',
                title: 'Transparence',
                desc: 'Garantir une gratuité totale pour les bénéficiaires et une traçabilité exemplaire des fonds engagés.',
              },
              {
                num: '05',
                title: 'Partenariats',
                desc: 'Mobiliser les compétences du groupe IROKO et des institutions camerounaises et européennes.',
              },
            ].map((pillar) => (
              <TextListItem key={pillar.num} title={pillar.title}>
                <p>{pillar.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* =====================================================================
          8. FRISE « NOTRE PARCOURS » (ligne verticale qui se dessine au défilement)
          ===================================================================== */}
      <section id="parcours" className="container-page *:max-w-5xl section-space space-y-12">
        <SectionHeader
          title={t('home.timeline.title')}
          subtitle={t('home.timeline.subtitle')}
        />

        <div ref={timelineRef} className="relative [--timeline-pad:1.5rem] [--timeline-x:0.5rem] pl-(--timeline-pad) sm:pl-0">
          {/* Ligne verticale : rail pâle fixe + tracé doré qui se dessine au défilement (scaleY) */}
          <div
            aria-hidden="true"
            className="absolute left-(--timeline-x) sm:left-1/2 top-2 bottom-2 w-[2px] sm:-translate-x-1/2 bg-nuit/12 dark:bg-creme/12"
          />
          <div
            aria-hidden="true"
            data-timeline-line
            className="absolute left-(--timeline-x) sm:left-1/2 top-2 bottom-2 w-[2px] sm:-translate-x-1/2 origin-top bg-gradient-to-b from-nuit via-or to-nuit"
          />

          <div className="space-y-10">
            {TIMELINE_MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  data-milestone
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } gap-6`}
                >
                  <div className="sm:w-1/2 sm:px-8">
                    <div className="rounded-card bg-surface-raised border border-border-soft p-6 shadow-xs">
                      <span className="inline-block px-3 py-1 rounded-pill bg-nuit text-or text-xs font-semibold mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-serif font-normal text-xl text-text mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-tertiary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Point d'ancrage sur la frise */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[calc(var(--timeline-x)-var(--timeline-pad)-5px)] sm:left-1/2 top-6 sm:-translate-x-1/2 w-4 h-4 rounded-pill bg-or ring-4 ring-creme dark:ring-v1-nuit"
                  />

                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =====================================================================
          10. TÉMOIGNAGES (Carrousel de citations avec photo et prénom — marqué TODO)
          ===================================================================== */}
      <section id="temoignages" className="container-page section-space space-y-12">
        <SectionHeader
          title={t('home.testimonials.title')}
          subtitle={t('home.testimonials.subtitle')}
        />

        <div className="surface-green rounded-card bg-nuit text-creme p-7 sm:p-12 border border-or/30 relative overflow-hidden">
          <Quote
            aria-hidden="true"
            className="absolute top-6 right-6 w-20 h-20 text-or/15 pointer-events-none"
          />

          {/* Glisser (souris ou doigt) pour changer de témoignage ; boutons conservés.
              Le nouveau témoignage est annoncé aux lecteurs d'écran (aria-live). */}
          <div aria-live="polite" className="relative z-10">
            <AnimatePresence mode="wait" initial={false} custom={testimonialDir}>
              <motion.div
                key={activeTestimonial}
                custom={testimonialDir}
                variants={testimonialSlide}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) paginateTestimonials(1);
                  else if (info.offset.x > 60 || info.velocity.x > 400) paginateTestimonials(-1);
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-grab active:cursor-grabbing"
              >
                <div className="md:col-span-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-or/30">
                    <img
                      src={TESTIMONIALS_TODO[activeTestimonial].image}
                      srcSet={imageSrcSet(TESTIMONIALS_TODO[activeTestimonial].image)}
                      sizes="(min-width: 768px) 320px, 100vw"
                      alt={TESTIMONIALS_TODO[activeTestimonial].firstName}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 space-y-5">
                  <p className="font-serif font-normal text-xl sm:text-2xl leading-relaxed text-creme">
                    {TESTIMONIALS_TODO[activeTestimonial].quote}
                  </p>
                  <div>
                    <p className="font-semibold text-or">
                      {TESTIMONIALS_TODO[activeTestimonial].firstName}
                    </p>
                    <p className="text-xs sm:text-sm text-creme/75">
                      {TESTIMONIALS_TODO[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 pt-6 md:pl-[calc(33.333%+0.67rem)] flex items-center gap-3">
            <button
              type="button"
              onClick={() => paginateTestimonials(-1)}
              aria-label="Témoignage précédent"
              className="w-10 h-10 rounded-pill border border-border-on-inverse flex items-center justify-center hover:bg-or hover:text-v1-encre transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => paginateTestimonials(1)}
              aria-label="Témoignage suivant"
              className="w-10 h-10 rounded-pill border border-border-on-inverse flex items-center justify-center hover:bg-or hover:text-v1-encre transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs text-creme/65 ml-2">
              {activeTestimonial + 1} / {TESTIMONIALS_TODO.length}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. ACTUALITÉS (3 cartes + lien « Toutes les actualités »)
          ===================================================================== */}
      <Section tone="sauge" id="actualites">
        <div className="container-page space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeader
              title={t('home.news.title')}
              subtitle={t('home.news.subtitle')}
            />
            <SecondaryButton to="/actualites">{t('home.news.allLink')}</SecondaryButton>
          </div>

          {/* Collection cliquable : cartes sans bordure ni ombre, papier sur la section sauge ; survol = couleur du titre (§8) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.map((article) => (
              <CardLink key={article.slug} to={`/actualites/${article.slug}`} surface="section">
                <CardMedia
                  src={article.image}
                  srcSet={imageSrcSet(article.image)}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={article.title}
                  width={600}
                  height={375}
                />
                <CardBody>
                  <CardMeta>
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </CardMeta>
                  <CardTitle>{article.title}</CardTitle>
                  <p className="text-body text-text-secondary">{article.excerpt}</p>
                </CardBody>
              </CardLink>
            ))}
          </div>
        </div>
      </Section>

      {/* =====================================================================
          12. PARTENAIRES ET FINANCEURS (Bandeau avec IROKO en premier ; lien vers /partenaires)
          ===================================================================== */}
      <section id="partenaires" className="container-page section-space space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            title={t('home.partners.title')}
            subtitle={t('home.partners.subtitle')}
          />
          <Link
            to="/partenaires"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline shrink-0"
          >
            <span>{t('home.partners.link')}</span>
          </Link>
        </div>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNERS_LIST.map((p, idx) => (
            <Link
              key={p.name}
              to="/partenaires"
              className={`rounded-[20px] p-5 border transition-[translate,color,background-color,border-color,box-shadow] duration-(--dur-fast) flex items-center justify-between gap-4 ${
                idx === 0
                  ? 'bg-action text-on-action border-or'
                  : 'bg-surface-raised border-border-soft hover:border-or'
              }`}
            >
              <div>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider ${
                    idx === 0 ? 'text-or' : 'text-accent-or'
                  }`}
                >
                  {p.tag}
                </span>
                <p className="font-serif text-base sm:text-lg mt-0.5">{p.name}</p>
              </div>
            </Link>
          ))}
        </StaggerGroup>
      </section>


    </>
  );
}
