import { useEffect, useState, useRef, FormEvent, Ref } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, Variants } from 'motion/react';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Ear,
  Users,
  Sprout,
  ShieldCheck,
  Handshake,
  GraduationCap,
  Compass,
  Globe2,
  CheckCircle2,
  Quote,
  Calendar,
  Heart,
  Mail,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import DomainCard from '../components/wahhf/DomainCard';
import Counter from '../components/wahhf/Counter';
import PresenceSection from '../components/wahhf/PresenceSection';
import { useDialog } from '../lib/useDialog';
import { useMediaQuery } from '../lib/useMediaQuery';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../lib/motionTokens';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { buildDraft } from '../lib/contactDraft';
import { MQ } from '../lib/gsap';
import MaskedLines, { splitAtComma } from '../effects/MaskedLines';
import SplitReveal from '../effects/SplitReveal';
import HorizontalGallery from '../effects/HorizontalGallery';
import ExpandSection from '../effects/ExpandSection';
import { useTimelineDraw } from '../effects/useTimelineDraw';
import StaggerGroup from '../effects/StaggerGroup';
import GalleryGrid from '../components/wahhf/GalleryGrid';
import { HeroVideoBackground, HeroVideoToggle, useHeroVideo } from '../components/wahhf/HeroVideoBackground';
import { HERO_POSTER } from '../config/heroVideo';
import { galleryItem, GalleryItem, HOME_GALLERY_IDS } from '../data/gallery';

/** Aperçu « En images » de l'accueil (5 photos du First Open Day & Boot Camp). */
const homeGalleryItems = HOME_GALLERY_IDS.map(galleryItem).filter((item): item is GalleryItem => !!item);
import {
  DOMAINS_DATA,
  NEWS_DATA,
  TIMELINE_MILESTONES,
  WAHHF_IMAGES,
  WAHHF_LOGO_URL,
  imageSrcSet,
} from '../services/api';

/**
 * Léger glissement d'un bloc du hero (0,9 s, sans rebond), décalé de `delay` secondes.
 * Pas d'opacité : sur-titre, phrase d'appui et boutons sont lisibles dès le premier rendu (élément LCP, PERF-01).
 */
const heroFade = (delay: number): Variants => ({
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: DURATION.reveal, delay, ease: EASE_OUT } },
});

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

export default function Home() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // Hero : parallaxe sur ordinateur seulement et jamais en « réduire les animations »
  const heroRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery(MQ.desktop);
  const heroParallax = isDesktop && !shouldReduceMotion;
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 20]);
  // Vidéo YouTube d'arrière-plan (ordinateur, après chargement et inactivité ; image d'attente sinon)
  const heroVideo = useHeroVideo(heroRef);

  // Modale vidéo plein écran à la demande : Échap, focus gardé puis rendu, page figée dessous
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const videoDialogRef = useRef<HTMLDivElement>(null);
  const videoCloseRef = useRef<HTMLButtonElement>(null);
  useDialog(videoModalOpen, videoDialogRef, () => setVideoModalOpen(false), {
    initialFocusRef: videoCloseRef,
  });
  // À la fermeture, la vignette est remontée : le focus revient sur son bouton « Regarder »
  const videoPlayRef = useRef<HTMLButtonElement>(null);
  const videoWasOpen = useRef(false);
  useEffect(() => {
    if (videoWasOpen.current && !videoModalOpen) {
      requestAnimationFrame(() => videoPlayRef.current?.focus({ preventScroll: true }));
    }
    videoWasOpen.current = videoModalOpen;
  }, [videoModalOpen]);
  // Frise : la ligne se dessine au défilement, chaque jalon apparaît quand il est atteint
  const timelineRef = useRef<HTMLDivElement>(null);
  useTimelineDraw(timelineRef);

  // Léger agrandissement de la vignette (0,92 -> 1) lié au défilement, ordinateur uniquement
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoProgress } = useScroll({ target: videoFrameRef, offset: ['start end', 'center center'] });
  const videoScale = useTransform(videoProgress, [0, 1], [0.92, 1]);

  // Carrousel témoignages
  const [[activeTestimonial, testimonialDir], setTestimonial] = useState<[number, number]>([0, 0]);
  const paginateTestimonials = (dir: 1 | -1) =>
    setTestimonial(([index]) => [(index + dir + TESTIMONIALS_TODO.length) % TESTIMONIALS_TODO.length, dir]);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  // Demande d'inscription prête à envoyer (WhatsApp ou e-mail) : le site n'inscrit encore personne lui-même
  const [newsletterPrepared, setNewsletterPrepared] = useState(false);
  // Le formulaire et l'encart se remplacent : le focus passe au titre de l'encart, puis revient au champ
  const newsletterFocusRef = useFocusOnChange<HTMLElement>(newsletterPrepared);

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterPrepared(true);
  };
  const newsletterDraft = buildDraft(
    'Inscription à la lettre d’information WAHHF',
    'Je souhaite recevoir la lettre d’information de WAHHF Foundation.',
    [['Adresse e-mail', newsletterEmail]]
  );

  return (
    <>
      <SEO
        title="Accueil — Autonomiser la jeunesse, transformer les communautés"
        description="WAHHF Foundation (We Are Here Help Foundation), fondation camerouno-allemande à but non lucratif et branche sociale du groupe IROKO : 6 domaines d'action et cours d'allemand gratuits."
      />

      {/* =====================================================================
          1. HERO PLEIN ÉCRAN
          ===================================================================== */}
      <section
        id="accueil"
        ref={heroRef}
        className="surface-green relative min-h-svh w-full flex items-center justify-center overflow-hidden bg-nuit text-creme pt-28 pb-16"
      >
        {/* 1) Image d'attente (élément principal du chargement, préchargée dans index.html) :
               zoom très lent et léger décalage au défilement sur ordinateur (20 px max).
            2) Vidéo YouTube par-dessus, sans parallaxe, qui apparaît en fondu une fois la lecture lancée.
            3) Voile vert profond : ~60 % sur les bords, ~75 % dans la bande du texte, pour garder
               au moins 4,5:1 même sur une image entièrement blanche de la vidéo. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroParallax ? heroImageY : 0 }}>
            <img
              src={HERO_POSTER.src}
              srcSet={HERO_POSTER.srcSet}
              sizes="100vw"
              fetchPriority="high"
              decoding="async"
              alt=""
              width={HERO_POSTER.width}
              height={HERO_POSTER.height}
              className="w-full h-full object-cover object-center hero-zoom"
            />
          </motion.div>
          <HeroVideoBackground video={heroVideo} />
          <div className="absolute inset-0 hero-veil" />
        </div>

        {/* Séquence dès le montage : titre ligne par ligne derrière un masque ; sur-titre, phrase et boutons
            sont déjà visibles et ne font que glisser de quelques pixels. */}
        <motion.div
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7"
        >
          <motion.div
            variants={heroFade(0)}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-nuit/85 border border-or/40 text-or text-xs font-semibold uppercase tracking-kicker"
          >
            <img
              src={WAHHF_LOGO_URL}
              alt=""
              className="w-5 h-5 rounded-pill bg-white p-0.5 object-contain"
            />
            <span>{t('hero.kicker')}</span>
          </motion.div>

          {/* Très grand titre en graisse NORMALE, coupé en deux lignes sémantiques à la virgule */}
          <MaskedLines
            as="h1"
            lines={splitAtComma(t('hero.title'))}
            className="font-serif font-normal tracking-tight text-creme leading-[1.08] text-[clamp(2.35rem,5.4vw,4.75rem)] max-w-5xl mx-auto"
          />

          {/* Phrase d'appui */}
          <motion.p
            variants={heroFade(0.55)}
            className="text-base sm:text-xl text-creme/95 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Deux boutons, après le titre : « Soutenir nos actions » (principal) & « Découvrir nos programmes » */}
          <motion.div
            variants={heroFade(0.85)}
            className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PrimaryButton
              to="/faire-un-don"
              onInverse
            >
              {t('hero.ctaPrimary')}
            </PrimaryButton>
            <SecondaryButton to="/nos-actions" onInverse>
              {t('hero.ctaSecondary')}
            </SecondaryButton>
          </motion.div>
        </motion.div>

        {/* Indicateur de défilement (immobile : plus de rebond infini) */}
        <a
          href="#mission"
          aria-label={t('hero.scrollHint')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-kicker text-creme/85 hover:text-or transition-colors"
        >
          <span>{t('hero.scrollHint')}</span>
          <span className="w-8 h-8 rounded-pill border border-or/40 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-or" />
          </span>
        </a>

        {/* Pause / lecture de la vidéo d'arrière-plan (seulement quand elle peut bouger) */}
        <HeroVideoToggle video={heroVideo} pauseLabel={t('hero.videoPause')} playLabel={t('hero.videoPlay')} />
      </section>

      {/* =====================================================================
          2. MISSION (« Qui sommes-nous »)
          ===================================================================== */}
      <section id="mission" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          3. CHIFFRES CLÉS (4 compteurs animés)
          ===================================================================== */}
      <section id="chiffres-cles" className="surface-green py-16 sm:py-20 bg-nuit text-creme border-y border-or/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            title={t('home.stats.title')}
            subtitle={t('home.stats.subtitle')}
            onInverse
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: 1250,
                suffix: '+',
                label: t('home.stats.s1Label'),
                note: 'Valeur d’exemple — TODO : confirmer chiffre officiel',
              },
              {
                number: 6,
                suffix: '',
                label: t('home.stats.s2Label'),
                note: 'Éducation, Santé, Entrepreneuriat, Environnement, Droits, Mobilité',
              },
              {
                number: 10,
                suffix: '',
                label: t('home.stats.s3Label'),
                note: 'Présence et relais communautaires au Cameroun',
              },
              {
                number: 10,
                suffix: '',
                label: t('home.stats.s4Label'),
                note: 'Fiches pays vérifiées & cours d’allemand A1–C1 gratuits',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="relative rounded-card bg-feuillage/70 border border-or/30 p-7 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-3 right-3 font-serif text-7xl text-creme/[0.05]"
                >
                  0{idx + 1}
                </span>
                <p className="font-serif font-normal text-4xl sm:text-5xl text-or mb-3">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-base font-medium text-creme mb-1.5">{stat.label}</p>
                <p className="text-xs text-creme/65">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. NOS 6 DOMAINES D'ACTION
          Ordre : Éducation, Santé, Entrepreneuriat des jeunes, Environnement,
          Droits et inclusion, Mobilité & Langues.
          Sur mobile : carrousel horizontal avec flèches rondes ; sur ordinateur : grille.
          ===================================================================== */}
      <HorizontalGallery
        id="domaines"
        header={
          <SectionHeader
            kicker={t('home.domains.kicker')}
            title={t('home.domains.title')}
            subtitle={t('home.domains.subtitle')}
          />
        }
        items={DOMAINS_DATA.map((domain) => ({
          key: domain.id,
          node: <DomainCard domain={domain} total="06" />,
        }))}
        prevLabel="Domaine précédent"
        nextLabel="Domaine suivant"
        pinHint="Faites défiler pour parcourir les 6 domaines"
      />

      {/* =====================================================================
          5. MOBILITÉ & LANGUES À LA UNE
          Bandeau pleine largeur « Apprendre l'allemand, s'orienter vers l'Europe — gratuitement »,
          3 cartes, mention « 100 % gratuit, financé par IROKO et nos donateurs », bouton « Découvrir le programme ».
          ===================================================================== */}
      {/* Effet fort : la carte verte s'agrandit jusqu'à la pleine largeur, puis cascade du contenu */}
      <ExpandSection id="mobilite-langues" backgroundClassName="bg-nuit" className="surface-green py-20 sm:py-24 text-creme">
        <div data-expand-content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div data-cascade className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <SectionHeader
              title={t('home.mobilitySpot.title')}
              subtitle={t('home.mobilitySpot.subtitle')}
              onInverse
            />

            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-or/20 border border-or text-gold-on-green text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                100 % gratuit, financé par IROKO et nos donateurs
              </span>
            </div>
          </div>

          {/* Trois cartes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                icon: GraduationCap,
                title: t('home.mobilitySpot.card1Title'),
                desc: t('home.mobilitySpot.card1Desc'),
                to: '/mobilite-langues/academie',
                cta: 'Explorer les niveaux A1 à C1',
              },
              {
                num: '02',
                icon: Compass,
                title: t('home.mobilitySpot.card2Title'),
                desc: t('home.mobilitySpot.card2Desc'),
                to: '/mobilite-langues/accompagnement',
                cta: 'Voir les 4 étapes du parcours',
              },
              {
                num: '03',
                icon: Globe2,
                title: t('home.mobilitySpot.card3Title'),
                desc: t('home.mobilitySpot.card3Desc'),
                to: '/mobilite-langues/accompagnement#pays',
                cta: 'Consulter les 10 fiches pays',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  data-cascade
                  key={item.num}
                  to={item.to}
                  className="group relative rounded-card bg-feuillage/85 border border-or/30 p-7 flex flex-col justify-between hover:-translate-y-1 transition-[translate,color,background-color,border-color,box-shadow] duration-(--dur-fast) overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-creme/[0.05]"
                  >
                    {item.num}
                  </span>
                  <div className="space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-or text-v1-encre flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-normal text-2xl text-creme group-hover:text-or transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-creme/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-creme/15 flex items-center justify-between text-sm font-medium text-gold-on-green relative z-10">
                    <span>{item.cta}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div data-cascade className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <PrimaryButton
              to="/mobilite-langues"
              onInverse
            >
              {t('home.mobilitySpot.cta')}
            </PrimaryButton>
            <p className="text-xs sm:text-sm text-creme/75">
              Aucun frais de dossier · Aucune promesse commerciale · Information vérifiée.
            </p>
          </div>
        </div>
      </ExpandSection>

      {/* =====================================================================
          6. VIDÉO (Vignette qui s'agrandit en plein écran à la demande — jamais en lecture auto avec son)
          ===================================================================== */}
      <section id="video" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <SectionHeader
          title={t('home.video.title')}
          subtitle={t('home.video.subtitle')}
        />

        {/* Effet de la section : la vignette grandit légèrement au défilement (ordinateur),
            puis s'ouvre en plein écran AU CLIC par une transition partagée (layoutId).
            Le cadre garde sa place (16:9) pendant que la vignette est ouverte. */}
        <motion.div
          ref={videoFrameRef}
          style={{ scale: heroParallax ? videoScale : 1 }}
          className="relative aspect-[16/9] max-w-5xl mx-auto"
        >
          {!videoModalOpen && (
            <motion.div
              layoutId="wahhf-video-frame"
              transition={{ duration: DURATION.screen, ease: EASE_SCREEN }}
              className="absolute inset-0 rounded-card overflow-hidden border border-border shadow-xl group bg-nuit"
            >
              <img
                src={WAHHF_IMAGES.education}
                srcSet={imageSrcSet(WAHHF_IMAGES.education)}
                sizes="(min-width: 1024px) 1024px, 100vw"
                alt="Aperçu vidéo WAHHF Foundation"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/35 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <button
                  ref={videoPlayRef}
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  aria-label={t('home.video.playLabel')}
                  aria-haspopup="dialog"
                  className="group/play inline-flex items-center gap-4 pl-4 pr-7 py-3.5 rounded-pill bg-or text-v1-encre font-semibold text-sm sm:text-base shadow-xl hover:scale-[1.03] transition-transform duration-(--dur-fast) cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
                >
                  <span className="w-12 h-12 rounded-pill bg-nuit text-creme flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                  <span>{t('home.video.playLabel')}</span>
                </button>
                <p className="mt-4 text-xs sm:text-sm text-creme/85 max-w-lg">
                  Lecture à la demande uniquement (respect de votre forfait mobile et de votre tranquillité).
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Plein écran : Échap ferme, focus gardé dans la fenêtre, page figée dessous.
            La vidéo ne démarre que si l'on appuie sur lecture (jamais de son automatique). */}
        <AnimatePresence>
          {videoModalOpen && (
            <motion.div
              key="video-dialog"
              ref={videoDialogRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              data-lenis-prevent
              aria-label="Lecteur vidéo WAHHF Foundation"
              className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: DURATION.screen, ease: EASE_SCREEN } }}
                exit={{ opacity: 0, transition: { duration: DURATION.screen, ease: EASE_SCREEN } }}
                onClick={() => setVideoModalOpen(false)}
              />
              <motion.div
                layoutId="wahhf-video-frame"
                transition={{ duration: DURATION.screen, ease: EASE_SCREEN }}
                className="relative w-full max-w-5xl rounded-card overflow-hidden bg-nuit border border-or/40 shadow-2xl"
              >
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/15 text-creme">
                  <span className="font-serif text-lg">
                    WAHHF Foundation — Présentation & Écosystème Solidaire (TODO : vidéo dédiée WAHHF à confirmer)
                  </span>
                  <button
                    ref={videoCloseRef}
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    aria-label="Fermer la vidéo"
                    className="w-9 h-9 shrink-0 rounded-pill bg-white/10 hover:bg-or hover:text-v1-encre flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-video w-full bg-black">
                  <video
                    src="https://res.cloudinary.com/dtntkknaq/video/upload/v1792318859/IROKO-Showreel-2026_1_njl3pg.mp4"
                    controls
                    playsInline
                    preload="none"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* =====================================================================
          7. NOTRE APPROCHE (5 vignettes avec icônes)
          ===================================================================== */}
      <section id="approche" className="py-20 sm:py-24 bg-white/60 dark:bg-v1-sous-bois/40 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            title={t('home.approach.title')}
            subtitle={t('home.approach.subtitle')}
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                icon: Ear,
                title: 'Écoute',
                desc: 'Partir des besoins exprimés par les jeunes, les mères et les acteurs de terrain sans imposer de modèle préconçu.',
              },
              {
                num: '02',
                icon: Users,
                title: 'Co-construction',
                desc: 'Bâtir chaque action avec les enseignants, soignants et associations locales pour un impact partagé.',
              },
              {
                num: '03',
                icon: Sprout,
                title: 'Durabilité',
                desc: 'Privilégier la transmission de compétences durables (langues, métiers, écologie) plutôt que l’assistanat.',
              },
              {
                num: '04',
                icon: ShieldCheck,
                title: 'Transparence',
                desc: 'Garantir une gratuité totale pour les bénéficiaires et une traçabilité exemplaire des fonds engagés.',
              },
              {
                num: '05',
                icon: Handshake,
                title: 'Partenariats',
                desc: 'Mobiliser les compétences du groupe IROKO et des institutions camerounaises et européennes.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="relative rounded-card bg-surface-raised border border-border-subtle p-6 shadow-xs hover:-translate-y-1 transition-[translate,color,background-color,border-color,box-shadow] duration-(--dur-fast) overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -bottom-3 right-3 font-serif text-6xl text-nuit/[0.05] dark:text-creme/[0.05]"
                  >
                    {pillar.num}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-nuit text-or flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-normal text-xl text-text mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-text-tertiary leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* =====================================================================
          8. FRISE « NOTRE PARCOURS » (ligne verticale qui se dessine au défilement)
          ===================================================================== */}
      <section id="parcours" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
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
          9. PRÉSENCE (Carte stylisée du Cameroun 10 régions + 10 pays européens)
          ===================================================================== */}
      <section id="presence" className="py-20 sm:py-28 bg-white/55 dark:bg-v1-sous-bois/30 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            title={t('home.presence.title')}
            subtitle={t('home.presence.subtitle')}
          />
          <PresenceSection />
        </div>
      </section>

      {/* =====================================================================
          10. TÉMOIGNAGES (Carrousel de citations avec photo et prénom — marqué TODO)
          ===================================================================== */}
      <section id="temoignages" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
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
      <section id="actualites" className="py-20 sm:py-28 bg-white/55 dark:bg-v1-sous-bois/30 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeader
              title={t('home.news.title')}
              subtitle={t('home.news.subtitle')}
            />
            <SecondaryButton to="/actualites">{t('home.news.allLink')}</SecondaryButton>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.map((article, idx) => (
              <Link
                key={article.slug}
                to={`/actualites/${article.slug}`}
                className="group rounded-card overflow-hidden bg-surface-raised border border-border-subtle shadow-xs hover:shadow-md hover:-translate-y-1 transition-[translate,color,background-color,border-color,box-shadow] duration-(--dur-fast) flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-nuit/10">
                    <img
                      src={article.image}
                      srcSet={imageSrcSet(article.image)}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={375}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-pill bg-nuit/90 text-gold-on-green text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3 relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute bottom-0 right-4 font-serif text-6xl text-nuit/[0.04]"
                    >
                      0{idx + 1}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-v1-encre/60 dark:text-creme/60">
                      <Calendar className="w-3.5 h-3.5 text-or" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-serif font-normal text-xl text-text group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-text-tertiary line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs font-semibold text-accent">
                  <span>Lire l’article</span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* =====================================================================
          11 bis. EN IMAGES (5 vraies photos du First Open Day ; visionneuse ; lien /galerie)
          ===================================================================== */}
      <section id="en-images" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            title={t('home.gallery.title')}
            subtitle={t('home.gallery.subtitle')}
          />
          <SecondaryButton to="/galerie">{t('home.gallery.link')}</SecondaryButton>
        </div>
        {/* 1 grande + 4 petites : grille pleine sur téléphone (2 col.) comme dès la tablette (4 col.) */}
        <GalleryGrid items={homeGalleryItems} featureFirst cols="grid-cols-2 md:grid-cols-4" />
      </section>

      {/* =====================================================================
          12. PARTENAIRES ET FINANCEURS (Bandeau avec IROKO en premier ; lien vers /partenaires)
          ===================================================================== */}
      <section id="partenaires" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
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

      {/* =====================================================================
          13. AGIR (Trois cartes : Faire un don · Devenir bénévole · Devenir partenaire)
          ===================================================================== */}
      <section id="agir" className="py-20 sm:py-28 bg-white/70 dark:bg-v1-sous-bois/40 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            kicker={t('home.act.kicker')}
            title={t('home.act.title')}
            subtitle={t('home.act.subtitle')}
          />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Carte 1 : Faire un don */}
            <div className="surface-green relative rounded-card bg-nuit text-creme p-8 border border-or/35 flex flex-col justify-between overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-creme/[0.05]"
              >
                01
              </span>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-rouge text-white text-xs font-semibold">
                  Soutien Financier Direct
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-creme">
                  Faire un don
                </h3>
                <p className="text-sm sm:text-base text-creme/80 leading-relaxed">
                  Financez directement les heures de cours d’allemand gratuits, les manuels pédagogiques et les campagnes de santé communautaire.
                </p>
              </div>
              <div className="pt-8">
                <DonateButton size="lg" className="w-full">
                  Faire un don maintenant
                </DonateButton>
              </div>
            </div>

            {/* Carte 2 : Devenir bénévole */}
            <div className="relative rounded-card bg-surface-raised p-8 border border-border-soft flex flex-col justify-between overflow-hidden shadow-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-nuit/[0.05]"
              >
                02
              </span>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-nuit/10 dark:bg-or/20 text-accent text-xs font-semibold">
                  Engagement Humain
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-text">
                  Devenir bénévole
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                  Rejoignez nos équipes au Cameroun, en Allemagne ou à distance : enseignement des langues, mentorat, santé ou logistique.
                </p>
              </div>
              <div className="pt-8">
                <PrimaryButton to="/agir#benevole" className="w-full">
                  Proposer mon aide bénévole
                </PrimaryButton>
              </div>
            </div>

            {/* Carte 3 : Devenir partenaire */}
            <div className="relative rounded-card bg-surface-raised p-8 border border-border-soft flex flex-col justify-between overflow-hidden shadow-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-nuit/[0.05]"
              >
                03
              </span>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-or/20 text-v1-encre dark:text-or text-xs font-semibold">
                  Mécénat & Institutions
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-text">
                  Devenir partenaire
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                  Écoles, universités, ONG, fondations et entreprises : co-construisons des programmes d’intérêt général mesurables.
                </p>
              </div>
              <div className="pt-8">
                <PrimaryButton to="/agir#partenaire" className="w-full">
                  Bâtir un partenariat
                </PrimaryButton>
              </div>
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* =====================================================================
          14. NEWSLETTER + BANDE FINALE D'APPEL AU DON (juste avant le footer)
          ===================================================================== */}
      <section id="newsletter" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Bloc Newsletter */}
        <div className="rounded-card bg-surface-raised border border-border p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-text">
              {t('home.newsletter.title')}
            </h2>
            <p className="text-sm sm:text-base text-text-tertiary">
              {t('home.newsletter.subtitle')}
            </p>
          </div>

          <div className="lg:col-span-5">
            <p role="status" className="sr-only">
              {newsletterPrepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
            </p>
            {newsletterPrepared ? (
              <ContactHandoff
                compact
                headingLevel="h3"
                title="Dernière étape : envoyez votre demande d’inscription"
                draft={newsletterDraft}
                titleRef={newsletterFocusRef as Ref<HTMLHeadingElement>}
                onEdit={() => setNewsletterPrepared(false)}
                editLabel="Modifier mon adresse"
              />
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="wahhf-newsletter-email" className="sr-only">
                  {t('home.newsletter.placeholder')}
                </label>
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-v1-encre/50 dark:text-creme/50 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    ref={newsletterFocusRef as Ref<HTMLInputElement>}
                    id="wahhf-newsletter-email"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t('home.newsletter.placeholder')}
                    className="w-full pl-11 pr-4 py-3.5 rounded-pill bg-surface-inset border border-border-input text-sm text-text"
                  />
                </div>
                <PrimaryButton type="submit" className="shrink-0">
                  {t('home.newsletter.button')}
                </PrimaryButton>
              </form>
            )}
          </div>
        </div>

        {/* Bande finale d'appel au don juste avant le footer */}
        <div className="surface-green rounded-card bg-gradient-to-r from-nuit via-feuillage to-nuit text-creme p-8 sm:p-12 border border-or/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-kicker text-or">
              <Heart className="w-4 h-4 text-rouge fill-current" />
              <span>Solidarité & Gratuité</span>
            </div>
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-creme">
              {t('home.newsletter.donateBannerTitle')}
            </h2>
            <p className="text-sm sm:text-base text-creme/80">
              {t('home.newsletter.donateBannerSub')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <DonateButton size="lg">{t('home.newsletter.donateBannerBtn')}</DonateButton>
            <SecondaryButton to="/candidater" onInverse>
              Être accompagné gratuitement
            </SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
