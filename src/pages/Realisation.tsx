import { motion } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle2, UserCheck, Wrench, ArrowRight, FileCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Realisation() {
  const { t } = useTranslation();

  const steps = [
    {
      num: '01',
      title: t('method.step1Title'),
      desc: t('method.step1Desc'),
      icon: UserCheck,
      details: [
        'Prise de brief détaillée (objectifs, audience, tonalité)',
        'Visite technique ou analyse du plan de salle',
        'Cadrage des contraintes d’horaires et d’accès'
      ]
    },
    {
      num: '02',
      title: t('method.step2Title'),
      desc: t('method.step2Desc'),
      icon: FileCheck,
      details: [
        'Dossier technique complet avec fiches produits',
        'Devis modulaire en euros (€) sans frais dissimulés',
        'Garantie d’envoi en 48 heures ouvrées chrono'
      ]
    },
    {
      num: '03',
      title: t('method.step3Title'),
      desc: t('method.step3Desc'),
      icon: Layers,
      details: [
        'Élaboration du conducteur minuté et synoptique audio/vidéo',
        'Validation des visuels, génériques et scénographies',
        'Attribution d’un chef de projet et d’une équipe technique attitrée'
      ]
    },
    {
      num: '04',
      title: t('method.step4Title'),
      desc: t('method.step4Desc'),
      icon: Wrench,
      details: [
        'Montage et raccordement au moins 3h avant ouverture des portes',
        'Balance acoustique complète et répétition générale des intervenants',
        'Régisseur plateau en liaison permanente avec vos équipes'
      ]
    },
    {
      num: '05',
      title: t('method.step5Title'),
      desc: t('method.step5Desc'),
      icon: ShieldCheck,
      details: [
        'Démontage soigné et remise en état des lieux',
        'Fourniture des enregistrements audio/vidéo bruts ou montés',
        'Réunion de débriefing et enquête de satisfaction qualité'
      ]
    }
  ];

  return (
    <div className="pt-28 min-h-screen bg-[#080C14] text-white">
      {/* HEADER SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0D1B3E]/40 via-[#080C14] to-[#080C14] relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[#FF8500] font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('method.badge')} • EXCELLENCE OPÉRATIONNELLE
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-tight text-white">
              Nos réalisations & <span className="font-cursive text-gradient-violet-orange font-normal">Méthode</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl font-normal leading-relaxed">
              {t('method.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5 STEPS TIMELINE */}
      <section className="py-20 px-6 bg-[#080C14]">
        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0D1B3E]/50 border border-white/10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start hover:border-[#FF8500]/50 transition-colors rounded-2xl"
            >
              <div className="flex md:flex-col items-center gap-4 shrink-0">
                <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-wider">
                  {step.num}
                </span>
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center text-[#FF8500] rounded-xl">
                  <step.icon size={24} />
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                <p className="text-base text-white/80 leading-relaxed">{step.desc}</p>
                
                <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {step.details.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/85">
                      <CheckCircle2 size={15} className="text-[#8B66FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GARANTIES D'EXCELLENCE */}
      <section className="py-24 px-6 bg-[#161616] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF8500] font-black uppercase tracking-[0.3em] text-xs mb-2 block">
              Sécurité & Sérénité
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white">
              {t('method.guaranteesTitle')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#0D1B3E]/40 border border-white/10 rounded-2xl">
              <UserCheck size={36} className="text-[#FF8500] mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">{t('method.g1Title')}</h4>
              <p className="text-sm text-white/70 leading-relaxed">{t('method.g1Desc')}</p>
            </div>

            <div className="p-8 bg-[#0D1B3E]/40 border border-white/10 rounded-2xl">
              <Clock size={36} className="text-[#8B66FF] mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">{t('method.g2Title')}</h4>
              <p className="text-sm text-white/70 leading-relaxed">{t('method.g2Desc')}</p>
            </div>

            <div className="p-8 bg-[#0D1B3E]/40 border border-white/10 rounded-2xl">
              <ShieldCheck size={36} className="text-[#FF8500] mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">{t('method.g3Title')}</h4>
              <p className="text-sm text-white/70 leading-relaxed">{t('method.g3Desc')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#531FF5] hover:bg-[#4314d6] text-white px-8 py-4 font-semibold text-sm rounded-full transition shadow-xl shadow-[#531FF5]/25 hover:scale-105 active:scale-95"
            >
              Lancer votre projet avec notre équipe <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
