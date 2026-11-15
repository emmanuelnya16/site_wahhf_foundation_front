import { motion } from 'motion/react';
import { Layers, Sparkles, Building, Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Scale, TrendingUp, Laptop, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Structure() {
  const { t } = useTranslation();

  const holdingRoles = [
    {
      icon: Scale,
      title: 'Gouvernance & Cohérence',
      desc: 'Fixation des orientations stratégiques, maintien des valeurs fondamentales et garant de l’exigence de qualité à travers tous les pôles.'
    },
    {
      icon: TrendingUp,
      title: 'Stratégie de Groupe & Ressources',
      desc: 'Allocation optimale des moyens humains, financiers et technologiques pour soutenir la croissance durable de chaque branche.'
    },
    {
      icon: ShieldCheck,
      title: 'Synergies & Transversalité',
      desc: 'Faciliter la coopération entre pôles pour offrir aux clients et partenaires des solutions complètes sous une bannière unique.'
    }
  ];

  const families = [
    {
      number: '01',
      title: 'Famille Business',
      icon: Sparkles,
      desc: 'Les pôles de service, au cœur de la relation client : communication 360°, formation d’excellence et ingénierie technique.',
      poles: [
        { name: 'IROKO Event', status: 'Opérationnel', detail: 'Agence de communication 360°, régie événementielle, branding et édition' },
        { name: 'IROKO Academia', status: 'À venir', detail: 'Formations professionnelles certifiantes et masterclasses exécutives' },
        { name: 'IROKO Engineering', status: 'À venir', detail: 'Ingénierie technique de pointe, R&D et solutions technologiques' }
      ]
    },
    {
      number: '02',
      title: 'Famille Digital',
      icon: Laptop,
      desc: 'Les pôles de produits et solutions technologiques : applications mobiles, logiciels de gestion financière et hébergement cloud résilient.',
      poles: [
        { name: 'IROKO App', status: 'À venir', detail: 'Développement d’applications mobiles et plateformes logicielles' },
        { name: 'IROKO Gestion & Compta', status: 'À venir', detail: 'Logiciels de comptabilité, facturation et gestion administrative pour PME' },
        { name: 'IROKO Cloud', status: 'À venir', detail: 'Infrastructures cloud haute disponibilité, DevOps et infogérance 24/7' }
      ]
    },
    {
      number: '03',
      title: 'Famille Services & Support',
      icon: Film,
      desc: 'Les pôles qui protègent, valorisent et font grandir l’écosystème : studio audiovisuel, cybersécurité et investissement d’amorçage.',
      poles: [
        { name: 'IROKO Studio', status: 'À venir', detail: 'Production audiovisuelle, photographie publicitaire et contenus de marque' },
        { name: 'IROKO Security', status: 'À venir', detail: 'Cybersécurité, audits de vulnérabilités, protection des données et RGPD' },
        { name: 'IROKO Ventures', status: 'À venir', detail: 'Accompagnement de projets entrepreneuriaux et investissements stratégiques' }
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-ktv-black text-white">
      {/* HEADER SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-ktv-blue/30 via-ktv-black to-ktv-black relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-ktv-orange font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('structure.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Notre <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">structure</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">
              {t('structure.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* RÔLE DE LA HOLDING */}
      <section className="py-20 px-6 bg-ktv-blue/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-ktv-red block mb-2">
              Le Tronc qui Porte l'Ensemble
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              {t('structure.holdingTitle')}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {t('structure.holdingDesc')}
            </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 text-xs text-white/60">
              {t('structure.legalNotice')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {holdingRoles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="p-8 bg-ktv-black/60 border border-white/10 hover:border-ktv-red/50 transition duration-300 group"
                >
                  <div className="w-12 h-12 bg-ktv-red/10 border border-ktv-red/30 flex items-center justify-center text-ktv-red mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase mb-3 text-white">{role.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{role.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LES 3 FAMILLES DE PÔLES */}
      <section className="py-24 px-6 bg-ktv-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-ktv-red font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              ORGANISATION SECTORIELLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-6 tracking-tight">
              Trois Familles, Neuf Pôles Complémentaires
            </h2>
            <p className="text-white/60 text-base md:text-lg">
              Une structuration équilibrée entre services opérationnels aux clients, création de produits technologiques et fonctions de soutien stratégique.
            </p>
          </div>

          <div className="space-y-12">
            {families.map((family, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-white/10 bg-white/[0.02] p-8 md:p-12 hover:border-white/20 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-3xl font-black text-ktv-red">{family.number}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase text-white">{family.title}</h3>
                      <p className="text-sm text-white/60 mt-1 max-w-2xl">{family.desc}</p>
                    </div>
                  </div>
                  <Link
                    to="/poles"
                    className="self-start md:self-center px-4 py-2 bg-white/5 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 flex items-center gap-2"
                  >
                    <span>Voir les fiches</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {family.poles.map((pole, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-6 bg-ktv-black/50 border border-white/5 hover:border-white/20 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-black uppercase text-white text-base">{pole.name}</h4>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                              pole.status === 'Opérationnel'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/5 text-white/50 border border-white/10'
                            }`}
                          >
                            {pole.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">{pole.detail}</p>
                      </div>
                      {pole.status === 'Opérationnel' && (
                        <Link
                          to="/tarifs"
                          className="text-[10px] font-black uppercase tracking-wider text-ktv-red hover:underline flex items-center gap-1 mt-auto"
                        >
                          Consulter les packs & tarifs <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* BANDEAU SYNERGIES */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-ktv-blue to-ktv-red/30 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-black uppercase text-white">Un Projet Multi-Pôles ?</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Notre holding coordonne directement l'ensemble des interventions pour les projets nécessitant à la fois de la communication 360°, des solutions logicielles et de l’ingénierie technique.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-ktv-black hover:bg-ktv-red hover:text-white px-8 py-4 font-black uppercase text-xs tracking-widest transition shadow-xl shrink-0"
            >
              Échanger avec la Direction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
