# Traductions allemandes à relire

Généré par `npm run i18n:relire` (scripts/traductions-a-relire.mjs) le 2026-11-25. Ne pas modifier à la main : corriger les fichiers de langue, puis relancer.

Chaque texte allemand du site, face à son français. **Un astérisque (\*) marque les 162 textes dont le traducteur n'était pas sûr** (sens du français ambigu, terme juridique, nom d'institution, ton) : à relire en priorité. 1790 textes allemands au total.

- Ton choisi : vouvoiement (« Sie »), simple et chaleureux, pas du mot à mot.
- Ne sont pas traduits : les noms propres et officiels (WAHHF Foundation, IROKO, Albatros Hotel, Ausbildung, Studienkolleg…), les adresses, les liens.
- Les pages légales (mentions légales, confidentialité, transparence) ne sont pas traduites : en allemand, elles affichent le français avec la mention « Diese Seite ist derzeit nur auf Französisch verfügbar. » (question 179 de docs/contenus-a-fournir.md).
- {{nom}} : une valeur insérée par le site (nom, date, nombre). <b>…</b>, <lien>…</lien> : mise en forme, à garder.
- Où corriger : la colonne « Clé » donne le chemin du texte dans le fichier de langue indiqué en tête de chaque partie.

## Textes communs (en-tête, pied de page, accueil, composants)

Fichier : `src/locales/de.json` (370 textes, dont 40 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `brand.name` | WAHHF Foundation | WAHHF Foundation |
|  | `brand.fullName` | We Are Here Help Foundation | We Are Here Help Foundation |
|  | `brand.branch` | Branche sociale du groupe IROKO | Sozialer Zweig der IROKO-Gruppe |
|  | `brand.tagline` | Fondation camerouno-allemande à but non lucratif | Gemeinnützige kamerunisch-deutsche Stiftung |
|  | `nav.home` | Accueil | Startseite |
|  | `nav.about` | Qui sommes-nous | Über uns |
|  | `nav.actions` | Nos actions | Unsere Arbeit |
|  | `nav.impact` | Notre impact | Unsere Wirkung |
|  | `nav.news` | Actualités | Aktuelles |
|  | `nav.events` | Événements | Veranstaltungen |
|  | `nav.changeLanguage` | Changer de langue ({{lang}}) | Sprache ändern ({{lang}}) |
|  | `nav.homeLink` | WAHHF Foundation, accueil | WAHHF Foundation, Startseite |
|  | `nav.act` | Agir | Mitmachen |
|  | `nav.donate` | Faire un don | Spenden |
|  | `nav.apply` | Candidater | Bewerben |
|  | `nav.partners` | Partenaires | Partner |
|  | `nav.contact` | Contact | Kontakt |
|  | `nav.searchPlaceholder` | Rechercher un programme, un cours d'allemand /anglais, un pays... | Programm, Deutsch- oder Englischkurs, Land suchen … |
|  | `nav.themeLight` | Mode clair | Heller Modus |
|  | `nav.themeDark` | Mode sombre | Dunkler Modus |
|  | `nav.domains.education` | Éducation | Bildung |
|  | `nav.domains.health` | Santé | Gesundheit |
|  | `nav.domains.entrepreneurship` | Entrepreneuriat des jeunes | Unternehmertum junger Menschen |
|  | `nav.domains.environment` | Environnement | Umwelt |
|  | `nav.domains.rights` | Droits et inclusion | Rechte und Teilhabe |
|  | `nav.domains.mobility` | Mobilité & Langues | Mobilität & Sprachen |
|  | `nav.mainNav` | Navigation principale | Hauptnavigation |
|  | `nav.mainNavMobile` | Navigation principale (mobile) | Hauptnavigation (mobil) |
|  | `nav.searchOpen` | Rechercher sur le site | Website durchsuchen |
|  | `nav.searchClose` | Fermer la recherche | Suche schließen |
|  | `nav.menuOpen` | Ouvrir le menu principal | Hauptmenü öffnen |
|  | `nav.menuClose` | Fermer le menu | Menü schließen |
|  | `nav.mobileMenu` | Menu mobile WAHHF Foundation | Mobiles Menü der WAHHF Foundation |
|  | `nav.actionsMobile` | Nos actions (6 domaines) | Unsere Arbeit (6 Bereiche) |
|  | `nav.applyMobile` | Candidater (Cours & Europe — Gratuit) | Bewerben (Kurse & Europa – kostenlos) |
|  | `nav.search.domain` | Domaine : {{title}} | Bereich: {{title}} |
|  | `nav.search.level` | Cours d'allemand : {{title}} | Deutschkurs: {{title}} |
|  | `nav.search.country` | Pays accompagné : {{flag}} {{name}} | Begleitetes Land: {{flag}} {{name}} |
|  | `nav.mega.domainsTitle` | Les 6 domaines d’action de WAHHF Foundation | Die 6 Arbeitsbereiche der WAHHF Foundation |
|  | `nav.mega.overview` | Voir la vue d’ensemble | Zur Übersicht |
|  | `nav.mega.mobilityTitle` | Mobilité & Langues : Allemand /anglais (A1–C1) & Europe | Mobilität & Sprachen: Deutsch/Englisch (A1–C1) & Europa |
| \* | `nav.mega.mobilityText` | Accompagnement gratuit aux cours d’allemand /anglais et orientation vérifiée vers 10 pays européens, financé par IROKO et nos donateurs. | Kostenlose Begleitung bei Deutsch- und Englischkursen und geprüfte Orientierung für 10 europäische Länder, finanziert von IROKO und unseren Spenderinnen und Spendern. <br>_Note : « nos donateurs » rendu par « unseren Spenderinnen und Spendern » (forme inclusive)_ |
|  | `nav.mega.academy` | Académie de langues (A1 à C1) | Sprachakademie (A1 bis C1) |
|  | `nav.mega.support` | Accompagnement vers 10 pays | Begleitung in 10 Länder |
|  | `nav.mega.scams` | Vigilance : Éviter les arnaques | Vorsicht: Betrug vermeiden |
|  | `nav.mega.apply` | Candidater gratuitement | Kostenlos bewerben |
|  | `disclaimer.title` | Ce que nous ne vous demanderons jamais | Was wir nie von Ihnen verlangen |
|  | `disclaimer.text` | Nos cours et notre accompagnement sont gratuits. Nous ne vendons ni visa ni emploi et ne garantissons aucun résultat. Nous ne vous demandons jamais d’argent. Les décisions appartiennent aux autorités et aux établissements concernés. Vérifiez toujours les informations sur les sites officiels. | Unsere Kurse und unsere Begleitung sind kostenlos. Wir verkaufen weder Visa noch Arbeitsplätze und garantieren kein Ergebnis. Wir verlangen nie Geld von Ihnen. Entscheidungen treffen die zuständigen Behörden und Einrichtungen. Prüfen Sie Informationen immer auf den offiziellen Websites. |
|  | `disclaimer.link` | Comment reconnaître une fausse offre et éviter les arnaques ? | Wie erkennt man ein falsches Angebot und vermeidet Betrug? |
|  | `hero.kicker` | FONDATION CAMEROUNO-ALLEMANDE · BRANCHE SOCIALE DU GROUPE IROKO | KAMERUNISCH-DEUTSCHE STIFTUNG · SOZIALER ZWEIG DER IROKO-GRUPPE |
|  | `hero.title` | Autonomiser la jeunesse, transformer les communautés | Junge Menschen stärken, Gemeinschaften verändern |
|  | `hero.subtitle` | Nous agissons au Cameroun et accompagnons la jeunesse africaine avec dignité, transparence et solidarité : éducation, santé, entrepreneuriat, écologie et mobilité linguistique 100 % gratuite. | Wir sind in Kamerun aktiv und begleiten junge Menschen in Afrika mit Würde, Transparenz und Solidarität: Bildung, Gesundheit, Unternehmertum, Umwelt und zu 100 % kostenlose Sprachmobilität. |
|  | `hero.ctaPrimary` | Soutenir nos actions | Unsere Arbeit unterstützen |
|  | `hero.ctaSecondary` | Découvrir nos programmes | Unsere Programme entdecken |
|  | `hero.scrollHint` | Défiler pour découvrir | Zum Entdecken scrollen |
|  | `hero.videoPause` | Mettre la vidéo en pause | Video anhalten |
|  | `hero.videoPlay` | Lire la vidéo | Video abspielen |
| \* | `hero.headline` | Des cours d'allemand /anglais pour préparer l'Europe en confiance | Deutsch- und Englischkurse, um Europa gut vorbereitet anzugehen <br>_Note : « préparer l'Europe en confiance » rendu par « um Europa gut vorbereitet anzugehen »_ |
|  | `hero.lead` | Une fondation camerouno-allemande, à Yaoundé et Douala : niveaux A1 à C1, test en ligne et orientation vers 10 pays européens, sans intermédiaire payant. | Eine kamerunisch-deutsche Stiftung in Yaoundé und Douala: Niveaus A1 bis C1, Online-Test und Orientierung für 10 europäische Länder – ohne bezahlte Vermittler. |
|  | `hero.ctaTest` | Passer le test d'allemand gratuit | Kostenlosen Deutschtest machen |
|  | `hero.filmLink` | Regarder le film avec le son (1 min) | Film mit Ton ansehen (1 Min.) |
|  | `hero.filStart` | Cameroun | Kamerun |
|  | `hero.filEnd` | Europe | Europa |
|  | `hero.videoConsent` | Activer la vidéo | Video aktivieren |
|  | `hero.videoConsentNote` | Elle est diffusée par YouTube, qui reçoit alors votre adresse IP. | Es wird über YouTube abgespielt; YouTube erhält dabei Ihre IP-Adresse. |
|  | `hero.filmTitle` | Film WAHHF Foundation | Film der WAHHF Foundation |
|  | `hero.filmPlay` | Lire le film sur YouTube | Film auf YouTube abspielen |
|  | `hero.filmNote` | Le film est diffusé par YouTube, qui reçoit alors votre adresse IP. | Der Film wird über YouTube abgespielt; YouTube erhält dabei Ihre IP-Adresse. |
|  | `hero.filmClose` | Fermer le film | Film schließen |
|  | `hero.loopTitle` | Vidéo de présentation de WAHHF Foundation (décorative, sans son) | Vorstellungsvideo der WAHHF Foundation (dekorativ, ohne Ton) |
|  | `hero.filmFrameTitle` | Film WAHHF Foundation (1 min 10) | Film der WAHHF Foundation (1:10 Min.) |
|  | `home.mission.kicker` | Qui sommes-nous | Über uns |
|  | `home.mission.title` | Une passerelle humaine entre le Cameroun et l'Allemagne | Eine menschliche Brücke zwischen Kamerun und Deutschland |
|  | `home.mission.p1` | Née d'une double culture camerounaise et allemande, WAHHF Foundation (We Are Here Help Foundation) est la branche sociale et philanthropique du groupe IROKO. | Aus einer kamerunisch-deutschen Doppelkultur entstanden, ist die WAHHF Foundation (We Are Here Help Foundation) der soziale und gemeinnützige Zweig der IROKO-Gruppe. |
|  | `home.mission.p2` | Convaincus que la dignité passe par le savoir, la santé et l'autonomie, nous développons des programmes de terrain durables et un dispositif gratuit d'apprentissage de l'allemand /anglais et d'orientation vers l'Europe. | Wir sind überzeugt, dass Würde durch Wissen, Gesundheit und Selbstständigkeit entsteht. Darum entwickeln wir nachhaltige Programme vor Ort und ein kostenloses Angebot, um Deutsch oder Englisch zu lernen und sich in Richtung Europa zu orientieren. |
|  | `home.mission.link` | En savoir plus sur notre histoire et notre gouvernance | Mehr über unsere Geschichte und unsere Organisation |
|  | `home.stats.kicker` | Notre impact en chiffres | Unsere Wirkung in Zahlen |
|  | `home.stats.title` | Des actions concrètes et mesurables | Konkrete und messbare Arbeit |
|  | `home.stats.subtitle` | Chaque programme est suivi avec rigueur et transparence financière. (Chiffres à confirmer — TODO) | Jedes Programm wird sorgfältig und finanziell transparent begleitet. (Zahlen noch zu bestätigen — TODO) |
|  | `home.stats.s1Label` | Jeunes et familles accompagnés (TODO : confirmer) | Begleitete junge Menschen und Familien (TODO: bestätigen) |
|  | `home.stats.s2Label` | Domaines d'intervention complémentaires | Sich ergänzende Arbeitsbereiche |
|  | `home.stats.s3Label` | Régions du Cameroun couvertes | Abgedeckte Regionen Kameruns |
|  | `home.stats.s4Label` | Pays européens d'orientation documentés | Dokumentierte europäische Zielländer |
|  | `home.domains.kicker` | Nos 6 domaines d'action | Unsere 6 Arbeitsbereiche |
|  | `home.domains.title` | Six piliers pour bâtir l'autonomie | Sechs Säulen für mehr Selbstständigkeit |
|  | `home.domains.subtitle` | De l'accès à l'école primaire jusqu'à la mobilité académique et linguistique internationale. | Vom Zugang zur Grundschule bis zur internationalen Studien- und Sprachmobilität. |
|  | `home.mobilitySpot.title` | Apprendre l'allemand /anglais, s'orienter vers l'Europe | Deutsch oder Englisch lernen, den Weg nach Europa finden |
|  | `home.mobilitySpot.subtitle` | Cours d'allemand /anglais et orientation gratuits, sans frais d'inscription ni intermédiaire commercial. | Kostenlose Deutsch- und Englischkurse und Orientierung – ohne Anmeldegebühren und ohne kommerzielle Vermittler. |
|  | `home.mobilitySpot.card1Title` | Académie de langues A1 à C1 | Sprachakademie A1 bis C1 |
|  | `home.mobilitySpot.card1Desc` | Accompagnement des cours de langue allemande /anglaise structuré du niveau débutant A1 au niveau avancé C1, avec un test de niveau en ligne. | Strukturierte Begleitung der Deutsch- und Englischkurse vom Anfängerniveau A1 bis zum fortgeschrittenen Niveau C1, mit Online-Einstufungstest. |
|  | `home.mobilitySpot.card2Title` | Accompagnement vers l'Europe | Begleitung nach Europa |
|  | `home.mobilitySpot.card2Desc` | Information claire et vérifiée en 4 étapes : compréhension des parcours d'études, de formation ou de travail, et préparation de dossier. | Klare und geprüfte Informationen in 4 Schritten: Studien-, Ausbildungs- und Arbeitswege verstehen und die Unterlagen vorbereiten. |
|  | `home.mobilitySpot.card3Title` | 10 pays accompagnés | 10 begleitete Länder |
|  | `home.mobilitySpot.card3Desc` | Luxembourg, Allemagne, Slovénie, Italie, Grèce, Portugal, Espagne, Danemark, Pologne et Albanie. | Luxemburg, Deutschland, Slowenien, Italien, Griechenland, Portugal, Spanien, Dänemark, Polen und Albanien. |
|  | `home.mobilitySpot.cta` | Découvrir le programme | Programm entdecken |
|  | `home.mobilitySpot.filLabel` | Les cinq niveaux d'allemand /anglais, de A1 à C1, puis l'Europe | Die fünf Sprachniveaus von A1 bis C1, dann Europa |
|  | `home.mobilitySpot.filEnd` | Europe | Europa |
|  | `home.mobilitySpot.levels.a1` | Découverte | Einstieg |
|  | `home.mobilitySpot.levels.a2` | Échanges courants | Alltagsgespräche |
|  | `home.mobilitySpot.levels.b1` | Autonomie | Selbstständigkeit |
|  | `home.mobilitySpot.levels.b2` | Indépendance | Unabhängigkeit |
|  | `home.mobilitySpot.levels.c1` | Maîtrise | Sprachbeherrschung |
|  | `home.video.kicker` | Au cœur du terrain | Mitten im Geschehen |
|  | `home.video.title` | Voir nos actions et notre vision en images | Unsere Arbeit und unsere Vision in Bildern |
|  | `home.video.subtitle` | Découvrez en vidéo l'engagement de la fondation et l'écosystème du groupe IROKO qui soutient la gratuité de nos actions. | Sehen Sie im Video das Engagement der Stiftung und das Umfeld der IROKO-Gruppe, das unsere Angebote kostenlos macht. |
|  | `home.video.playLabel` | Regarder le film de présentation | Vorstellungsfilm ansehen |
|  | `home.approach.kicker` | Notre approche | Unser Ansatz |
|  | `home.approach.title` | Cinq principes qui guident chaque projet | Fünf Grundsätze für jedes Projekt |
|  | `home.approach.subtitle` | Une méthode humble, rigoureuse et ancrée dans les réalités locales. | Eine bescheidene, sorgfältige und in der Wirklichkeit vor Ort verankerte Arbeitsweise. |
|  | `home.timeline.kicker` | Notre parcours | Unser Weg |
|  | `home.timeline.title` | Les grandes étapes de WAHHF Foundation | Die wichtigsten Etappen der WAHHF Foundation |
|  | `home.timeline.subtitle` | Une construction progressive au service des communautés. (Dates et jalons à confirmer — TODO) | Schritt für Schritt aufgebaut, im Dienst der Gemeinschaften. (Daten und Etappen noch zu bestätigen — TODO) |
|  | `home.presence.kicker` | Présence & rayonnement | Präsenz & Reichweite |
|  | `home.presence.title` | Basée à Yaoundé et Douala, tournée vers 10 pays européens | In Yaoundé und Douala zu Hause, offen für 10 europäische Länder |
|  | `home.presence.subtitle` | Nos équipes sont à Yaoundé et Douala ; les relais dans les autres régions restent à confirmer. En Europe, des fiches vérifiées pour 10 pays. | Unsere Teams sind in Yaoundé und Douala; Ansprechpartner in anderen Regionen werden noch bestätigt. Für Europa: geprüfte Informationen zu 10 Ländern. |
|  | `home.testimonials.kicker` | Témoignages | Erfahrungsberichte |
|  | `home.testimonials.title` | Paroles de bénéficiaires et de bénévoles | Stimmen von Teilnehmenden und Ehrenamtlichen |
|  | `home.testimonials.subtitle` | Extraits d'expériences vécues au sein de nos programmes (Témoignages d'exemple marqués TODO à valider). | Auszüge aus Erfahrungen in unseren Programmen (Beispiele mit TODO markiert, noch zu bestätigen). |
|  | `home.news.kicker` | Actualités & terrain | Aktuelles & vor Ort |
|  | `home.news.title` | Nos dernières actions et publications | Unsere neuesten Aktionen und Beiträge |
|  | `home.news.subtitle` | Suivez la vie de la fondation, les nouvelles sessions linguistiques et les campagnes solidaires. | Verfolgen Sie das Leben der Stiftung, neue Sprachkurse und Solidaritätsaktionen. |
|  | `home.news.allLink` | Toutes les actualités | Alle Neuigkeiten |
|  | `home.gallery.kicker` | En images | In Bildern |
|  | `home.gallery.title` | La fondation sur le terrain | Die Stiftung vor Ort |
|  | `home.gallery.subtitle` | Retour en photos sur le First Open Day & Boot Camp, le 25 avril 2026 à Yaoundé. | Fotos vom First Open Day & Boot Camp am 25. April 2026 in Yaoundé. |
|  | `home.gallery.link` | Voir toute la galerie | Ganze Galerie ansehen |
|  | `home.gallery.expandCaption` | Yaoundé, 25 avril 2026 | Yaoundé, 25. April 2026 |
|  | `home.partners.kicker` | Partenaires et financeurs | Partner und Förderer |
|  | `home.partners.title` | Soutenus par IROKO Group et un réseau engagé | Getragen von der IROKO Group und einem engagierten Netzwerk |
|  | `home.partners.subtitle` | La gratuité de nos programmes repose sur l'engagement structurel du groupe IROKO et la générosité de nos donateurs. | Dass unsere Programme kostenlos sind, verdanken wir dem dauerhaften Engagement der IROKO-Gruppe und der Großzügigkeit unserer Spenderinnen und Spender. |
|  | `home.partners.link` | Découvrir tous nos partenaires | Alle unsere Partner entdecken |
|  | `home.act.kicker` | Agir avec nous | Mit uns aktiv werden |
|  | `home.act.title` | Chaque geste renforce un parcours de vie | Jede Geste stärkt einen Lebensweg |
|  | `home.act.subtitle` | Rejoindre la mission comme bénévole ou comme partenaire, ou suivre nos actions par la lettre d'information. | Unterstützen Sie die Mission als Ehrenamtliche oder als Partner – oder verfolgen Sie unsere Arbeit über den Newsletter. |
|  | `home.act.volunteerText` | Rejoignez nos équipes au Cameroun, en Allemagne ou à distance : enseignement des langues, mentorat, santé ou logistique. | Verstärken Sie unsere Teams in Kamerun, in Deutschland oder aus der Ferne: Sprachunterricht, Mentoring, Gesundheit oder Logistik. |
| \* | `home.act.partnerText` | Écoles, universités, ONG, fondations et entreprises : co-construisons des programmes d’intérêt général mesurables. | Schulen, Hochschulen, NGOs, Stiftungen und Unternehmen: Lassen Sie uns gemeinsam messbare gemeinnützige Programme gestalten. <br>_Note : « co-construisons » rendu par « Lassen Sie uns gemeinsam … gestalten »_ |
|  | `home.newsletter.kicker` | Restons en lien | In Verbindung bleiben |
|  | `home.newsletter.title` | Recevoir nos actualités et les dates des prochaines sessions | Neuigkeiten und Termine der nächsten Kurse erhalten |
|  | `home.newsletter.subtitle` | Votre adresse sert uniquement à vous envoyer cette lettre. Le site ne l'enregistre pas encore : il prépare un message d'inscription à nous envoyer par WhatsApp ou par e-mail. | Ihre Adresse dient nur dazu, Ihnen diesen Newsletter zu senden. Die Website speichert sie noch nicht: Sie bereitet eine Anmeldenachricht vor, die Sie uns per WhatsApp oder E-Mail schicken. |
|  | `home.newsletter.placeholder` | Votre adresse e-mail | Ihre E-Mail-Adresse |
|  | `home.newsletter.button` | Préparer mon inscription | Anmeldung vorbereiten |
|  | `home.newsletter.privacyLink` | Politique de confidentialité | Datenschutz |
|  | `home.newsletter.donateBannerTitle` | Soutenez la gratuité de nos programmes éducatifs et sociaux | Unterstützen Sie unsere kostenlosen Bildungs- und Sozialprogramme |
|  | `home.newsletter.donateBannerSub` | 100 % des dons financent directement les cours de langue, l'accompagnement des jeunes et les actions de terrain. | 100 % der Spenden fließen direkt in Sprachkurse, die Begleitung junger Menschen und die Arbeit vor Ort. |
|  | `home.newsletter.donateBannerBtn` | Faire un don | Spenden |
|  | `home.newsletter.draftSubject` | Inscription à la lettre d’information WAHHF | Anmeldung zum WAHHF-Newsletter |
|  | `home.newsletter.draftIntro` | Je souhaite recevoir la lettre d’information de WAHHF Foundation. | Ich möchte den Newsletter der WAHHF Foundation erhalten. |
|  | `home.newsletter.draftEmail` | Adresse e-mail | E-Mail-Adresse |
|  | `home.newsletter.ready` | Votre message est prêt : envoyez-le par WhatsApp ou par e-mail. | Ihre Nachricht ist fertig: Senden Sie sie per WhatsApp oder per E-Mail. |
|  | `home.newsletter.handoffTitle` | Dernière étape : envoyez votre demande d’inscription | Letzter Schritt: Senden Sie Ihre Anmeldung ab |
|  | `home.newsletter.editAddress` | Modifier mon adresse | Meine Adresse ändern |
|  | `home.seo.title` | Accueil — Autonomiser la jeunesse, transformer les communautés | Startseite — Junge Menschen stärken, Gemeinschaften verändern |
|  | `home.seo.description` | WAHHF Foundation (We Are Here Help Foundation), fondation camerouno-allemande à but non lucratif et branche sociale du groupe IROKO : 6 domaines d'action et cours d'allemand /anglais gratuits. | WAHHF Foundation (We Are Here Help Foundation), gemeinnützige kamerunisch-deutsche Stiftung und sozialer Zweig der IROKO-Gruppe: 6 Arbeitsbereiche und kostenlose Deutsch- und Englischkurse. |
|  | `home.journey.albumLink` | Voir l’album | Zum Album |
|  | `footer.description` | Fondation camerouno-allemande à but non lucratif œuvrant pour l'éducation, la santé, l'autonomie des jeunes et la mobilité solidaire. | Gemeinnützige kamerunisch-deutsche Stiftung für Bildung, Gesundheit, die Selbstständigkeit junger Menschen und solidarische Mobilität. |
|  | `footer.irokoBadge` | Branche sociale du groupe IROKO | Sozialer Zweig der IROKO-Gruppe |
|  | `footer.colAbout` | Qui sommes-nous | Über uns |
|  | `footer.colActions` | Nos actions | Unsere Arbeit |
|  | `footer.colAct` | Agir et faire un don | Mitmachen und spenden |
|  | `footer.colContact` | Contact et adresse | Kontakt und Adresse |
|  | `footer.legal` | Mentions légales | Impressum |
|  | `footer.privacy` | Politique de confidentialité | Datenschutz |
|  | `footer.transparency` | Transparence financière | Finanzielle Transparenz |
|  | `footer.backToTop` | Retour en haut | Nach oben |
|  | `footer.rights` | Tous droits réservés. | Alle Rechte vorbehalten. |
|  | `footer.story` | Notre histoire & mission | Unsere Geschichte & Mission |
|  | `footer.team` | Équipe & Gouvernance | Team & Leitung |
|  | `footer.gallery` | Galerie photo & vidéo | Foto- & Videogalerie |
|  | `footer.partners` | Partenaires & Groupe IROKO | Partner & IROKO-Gruppe |
|  | `footer.news` | Actualités & Terrain | Aktuelles & Einsätze vor Ort |
|  | `footer.academy` | Académie d’allemand /anglais A1–C1 (Gratuit) | Deutsch-/Englisch-Akademie A1–C1 (kostenlos) |
|  | `footer.apply` | Candidater à un programme | Für ein Programm bewerben |
|  | `footer.volunteer` | Devenir bénévole | Ehrenamtlich mitmachen |
|  | `footer.partner` | Devenir partenaire | Partner werden |
|  | `footer.scams` | Prévention des arnaques | Schutz vor Betrug |
|  | `footer.contactForm` | Formulaire de contact | Kontaktformular |
|  | `footer.addressTodo` | (TODO : adresse exacte) | (TODO: genaue Adresse) |
|  | `ui.logoAlt` | Logo WAHHF Foundation | Logo der WAHHF Foundation |
|  | `ui.newTab` |  (nouvel onglet) |  (neuer Tab) |
|  | `ui.skipLink` | Aller au contenu | Zum Inhalt springen |
|  | `ui.whatsapp.message` | Bonjour WAHHF Foundation, je souhaite des informations sur vos programmes d’accompagnement gratuits... | Guten Tag, liebes Team der WAHHF Foundation, ich möchte mich über Ihre kostenlosen Begleitprogramme informieren … |
|  | `ui.whatsapp.label` | Écrire à WAHHF Foundation sur WhatsApp (nouvel onglet) | Der WAHHF Foundation auf WhatsApp schreiben (neuer Tab) |
|  | `ui.cookies.label` | Gestion des cookies et de la vie privée | Cookies und Datenschutz |
|  | `ui.cookies.title` | Respect de votre vie privée (RGPD) | Ihre Privatsphäre ist uns wichtig (DSGVO) |
|  | `ui.cookies.text` | WAHHF Foundation utilise uniquement des cookies techniques nécessaires au bon fonctionnement du site (choix de langue et de thème). Aucun traceur publicitaire n’est activé. | Die WAHHF Foundation verwendet nur technisch notwendige Cookies, damit die Website funktioniert (Wahl von Sprache und Darstellung). Es sind keine Werbe-Tracker aktiv. |
|  | `ui.cookies.privacy` | Politique de confidentialité | Datenschutzerklärung |
| \* | `ui.cookies.refuse` | Refuser le non-essentiel | Nur notwendige Cookies <br>_Note : « Refuser le non-essentiel » rendu par « Nur notwendige Cookies »_ |
|  | `ui.cookies.accept` | Accepter | Akzeptieren |
|  | `ui.chunkError.page` | Cette page n’a pas pu se charger. Vérifiez votre connexion. | Diese Seite konnte nicht geladen werden. Bitte prüfen Sie Ihre Verbindung. |
|  | `ui.chunkError.block` | Le contenu n’a pas pu se charger. | Dieser Inhalt konnte nicht geladen werden. |
|  | `ui.chunkError.retry` | Réessayer | Erneut versuchen |
|  | `ui.handoff.info` | Le site ne transmet pas encore les formulaires. Votre message est prêt avec vos réponses : envoyez-le par WhatsApp ou par e-mail. La fondation ne le reçoit qu’une fois que vous l’avez envoyé. | Die Website kann Formulare noch nicht selbst übermitteln. Ihre Nachricht mit Ihren Antworten ist fertig: Senden Sie sie per WhatsApp oder per E-Mail. Die Stiftung erhält sie erst, wenn Sie sie abgeschickt haben. |
|  | `ui.handoff.whatsapp` | Envoyer par WhatsApp | Per WhatsApp senden |
|  | `ui.handoff.email` | Envoyer par e-mail | Per E-Mail senden |
|  | `ui.handoff.fallback` | Si aucune application ne s’ouvre, écrivez directement à &lt;mail>{{email}}&lt;/mail> ou sur WhatsApp au {{phone}}, en copiant le message ci-dessous. | Falls sich keine App öffnet, schreiben Sie direkt an &lt;mail>{{email}}&lt;/mail> oder per WhatsApp an {{phone}} und kopieren Sie die Nachricht unten. |
|  | `ui.handoff.preview` | Voir le message préparé | Vorbereitete Nachricht ansehen |
|  | `ui.handoff.edit` | Modifier mes réponses | Meine Antworten ändern |
| \* | `ui.draft.greeting` | Bonjour WAHHF Foundation, | Guten Tag, liebes Team der WAHHF Foundation, <br>_Note : formule d'accueil des messages préparés (« Guten Tag, liebes Team der WAHHF Foundation, »)_ |
|  | `ui.draft.row` | {{label}} : {{value}} | {{label}}: {{value}} |
|  | `ui.validation.emailEmpty` | Saisissez votre adresse e-mail, par exemple nom@exemple.com. | Bitte geben Sie Ihre E-Mail-Adresse ein, zum Beispiel name@beispiel.de. |
|  | `ui.validation.emailInvalid` | Adresse e-mail incomplète : elle doit ressembler à nom@exemple.com. | Die E-Mail-Adresse ist unvollständig. Sie sollte so aussehen: name@beispiel.de. |
|  | `ui.validation.phoneEmpty` | Saisissez votre numéro de téléphone ou WhatsApp, avec l’indicatif (ex. +237 6 90 00 00 00). | Bitte geben Sie Ihre Telefon- oder WhatsApp-Nummer mit Ländervorwahl ein (z. B. +237 6 90 00 00 00). |
|  | `ui.validation.phoneInvalid` | Numéro incomplet : indiquez l’indicatif du pays et au moins 8 chiffres (ex. +237 6 90 00 00 00). | Die Nummer ist unvollständig: Bitte geben Sie die Ländervorwahl und mindestens 8 Ziffern an (z. B. +237 6 90 00 00 00). |
|  | `ui.presence.cameroonTitle` | Présence terrain au Cameroun | Vor Ort in Kamerun |
|  | `ui.presence.promptShort` | Choisissez une région ou son chef-lieu sur la carte. | Wählen Sie auf der Karte eine Region oder ihre Hauptstadt. |
|  | `ui.presence.prompt` | Choisissez une région ou son chef-lieu pour afficher nos relais locaux (éducation, santé, agroécologie et orientation). | Wählen Sie eine Region oder ihre Hauptstadt, um unsere lokalen Ansprechpartner zu sehen (Bildung, Gesundheit, Agrarökologie und Orientierung). |
|  | `ui.presence.europeTitle` | Les 10 pays d’orientation vers l’Europe | Die 10 Orientierungsländer in Europa |
|  | `ui.presence.europeText` | Fiches d’information vérifiées sur les voies d’études, de formation professionnelle et de travail, avec liens vers les portails officiels. | Geprüfte Informationsseiten zu Studium, Berufsausbildung und Arbeit, mit Links zu den offiziellen Portalen. |
|  | `ui.presence.albaniaNote` | Note : L’Albanie est un pays européen candidat mais &lt;b>non membre de l’Union européenne&lt;/b>. Consultez chaque fiche pays pour connaître le cadre réglementaire officiel. | Hinweis: Albanien ist ein europäisches Beitrittskandidatenland, aber &lt;b>kein Mitglied der Europäischen Union&lt;/b>. Den offiziellen rechtlichen Rahmen finden Sie auf der jeweiligen Länderseite. |
|  | `ui.map.loadingCameroon` | Chargement de la carte des 10 régions du Cameroun… | Karte der 10 Regionen Kameruns wird geladen … |
|  | `ui.map.loadingEurope` | Chargement de la carte Europe… | Europakarte wird geladen … |
|  | `ui.map.selected` | Région sélectionnée | Ausgewählte Region |
|  | `ui.map.selectedTitle` | Région sélectionnée : {{name}} ({{capital}}) | Ausgewählte Region: {{name}} ({{capital}}) |
|  | `ui.map.capital` | Chef-lieu : {{capital}} | Hauptstadt: {{capital}} |
|  | `ui.map.quickSelect` | Sélection rapide des 10 régions du Cameroun | Schnellauswahl der 10 Regionen Kameruns |
|  | `ui.map.regionLabel` | Région {{name}}, chef-lieu {{capital}} | Region {{name}}, Hauptstadt {{capital}} |
|  | `ui.map.cameroonLabel` | Carte des 10 régions du Cameroun ; chaque région est un bouton | Karte der 10 Regionen Kameruns; jede Region ist eine Schaltfläche |
|  | `ui.map.fullscreenOpen` | Afficher la carte du Cameroun en plein écran | Karte von Kamerun im Vollbild anzeigen |
|  | `ui.map.fullscreen` | Plein écran | Vollbild |
|  | `ui.map.close` | Fermer | Schließen |
|  | `ui.map.europeLabel` | Carte de l'Europe : les 10 pays accompagnés, chacun avec un lien vers sa fiche | Europakarte: die 10 begleiteten Länder, jeweils mit Link zur Länderseite |
|  | `ui.map.countryLink` | {{name}} : ouvrir la fiche | {{name}}: Länderseite öffnen |
|  | `ui.map.countryLinkNonEu` | {{name}}, hors Union européenne : ouvrir la fiche | {{name}}, nicht in der Europäischen Union: Länderseite öffnen |
|  | `ui.map.fromCameroon` | Depuis le Cameroun | Aus Kamerun |
|  | `ui.map.creditsPrefix` | Fonds de carte : limites régionales | Kartengrundlage: Regionsgrenzen |
|  | `ui.map.creditsSuffix` | ) · pays Natural Earth (domaine public). | ) · Länder: Natural Earth (gemeinfrei). |
|  | `ui.countries.link` | {{name}} — Voir la fiche | {{name}} — Zur Länderseite |
|  | `ui.countries.linkNonEu` | {{name}}, Hors Union européenne — Voir la fiche | {{name}}, nicht in der Europäischen Union — Zur Länderseite |
|  | `ui.countries.nonEu` | Hors UE | Nicht in der EU |
| \* | `ui.breadcrumb` | Fil d’Ariane | Pfadnavigation <br>_Note : « Fil d'Ariane » rendu par « Pfadnavigation » (lu par les lecteurs d'écran)_ |
|  | `ui.photos.enlarge` | Agrandir la photo : {{alt}} | Foto vergrößern: {{alt}} |
|  | `ui.photos.loadError` | Cette photo n’a pas pu être chargée. Vérifiez votre connexion, puis rouvrez-la. | Dieses Foto konnte nicht geladen werden. Bitte prüfen Sie Ihre Verbindung und öffnen Sie es erneut. |
|  | `ui.photos.viewer` | Visionneuse de photos | Fotoansicht |
|  | `ui.photos.closeViewer` | Fermer la visionneuse | Ansicht schließen |
|  | `ui.photos.prev` | Photo précédente | Vorheriges Foto |
|  | `ui.photos.next` | Photo suivante | Nächstes Foto |
|  | `ui.photos.position` | Photo {{n}} sur {{total}}. | Foto {{n}} von {{total}}. |
|  | `ui.photos.count_one` | {{count}} photo | {{count}} Foto |
|  | `ui.photos.count_other` | {{count}} photos | {{count}} Fotos |
|  | `ui.gallery.playVideo` | Lire la vidéo :  | Video abspielen:  |
|  | `ui.gallery.enlarge` | Agrandir la photo :  | Foto vergrößern:  |
|  | `ui.gallery.close` | Fermer la galerie | Galerie schließen |
|  | `ui.gallery.prevPhoto` | Photo précédente | Vorheriges Foto |
|  | `ui.gallery.prevVideo` | Vidéo précédente | Vorheriges Video |
|  | `ui.gallery.nextPhoto` | Photo suivante | Nächstes Foto |
|  | `ui.gallery.nextVideo` | Vidéo suivante | Nächstes Video |
|  | `ui.gallery.position` | {{n}} sur {{total}} : | {{n}} von {{total}}: |
|  | `ui.gallery.placeDate` | {{place}}, le {{date}} | {{place}}, {{date}} |
|  | `ui.gallery.videoCount_one` | {{count}} vidéo | {{count}} Video |
|  | `ui.gallery.videoCount_other` | {{count}} vidéos | {{count}} Videos |
|  | `ui.gallery.and` |  et  |  und  |
|  | `ui.fil.current` | niveau affiché | angezeigtes Niveau |
|  | `contenu.domaines.education.title` | Éducation | Bildung |
|  | `contenu.domaines.education.shortDesc` | Soutien scolaire, réhabilitation de salles de classe, bourses d’études et bibliothèques communautaires. | Nachhilfe, Renovierung von Klassenzimmern, Stipendien und Gemeinschaftsbibliotheken. |
|  | `contenu.domaines.education.fullDesc` | Nous œuvrons pour que chaque enfant et chaque jeune dispose des fournitures, de l’encadrement pédagogique et d’un cadre d’apprentissage digne. | Wir setzen uns dafür ein, dass jedes Kind und jeder junge Mensch Schulmaterial, pädagogische Begleitung und einen würdigen Lernort hat. |
|  | `contenu.domaines.education.programs[0]` | Kits scolaires et manuels pour les élèves en zone rurale | Schulsets und Lehrbücher für Schülerinnen und Schüler auf dem Land |
|  | `contenu.domaines.education.programs[1]` | Bibliothèques communautaires et espaces de lecture | Gemeinschaftsbibliotheken und Leseräume |
| \* | `contenu.domaines.education.programs[2]` | Mentorat académique et orientation post-baccalauréat | Mentoring und Studienorientierung nach dem Abitur <br>_Note : « post-baccalauréat » rendu par « nach dem Abitur »_ |
|  | `contenu.domaines.sante.title` | Santé | Gesundheit |
|  | `contenu.domaines.sante.shortDesc` | Campagnes de prévention, santé maternelle et infantile, accès aux soins de base et sensibilisation. | Präventionskampagnen, Gesundheit von Müttern und Kindern, Zugang zur Grundversorgung und Aufklärung. |
|  | `contenu.domaines.sante.fullDesc` | En lien avec les centres de santé locaux, nos équipes bénévoles organisent des journées de dépistage gratuit, d’éducation sanitaire et de soutien aux mères. | Gemeinsam mit örtlichen Gesundheitszentren organisieren unsere ehrenamtlichen Teams kostenlose Vorsorgetage, Gesundheitsaufklärung und Unterstützung für Mütter. |
|  | `contenu.domaines.sante.programs[0]` | Consultations préventives et sensibilisation communautaire | Vorsorgeberatung und Aufklärung in den Gemeinden |
|  | `contenu.domaines.sante.programs[1]` | Accompagnement de la santé maternelle et infantile | Begleitung der Gesundheit von Müttern und Kindern |
|  | `contenu.domaines.sante.programs[2]` | Accès à l’eau potable et à l’hygiène en milieu scolaire | Zugang zu Trinkwasser und Hygiene an Schulen |
|  | `contenu.domaines.entrepreneuriat.title` | Entrepreneuriat des jeunes | Unternehmertum junger Menschen |
|  | `contenu.domaines.entrepreneuriat.shortDesc` | Incubation solidaire, littératie numérique, gestion de micro-projets et mentorat par des professionnels. | Solidarische Gründungsbegleitung, digitale Grundkompetenzen, Management von Kleinprojekten und Mentoring durch Fachleute. |
|  | `contenu.domaines.entrepreneuriat.fullDesc` | Accompagner les jeunes porteurs d’initiatives locales pour structurer des activités génératrices de revenus durables et éthiques. | Wir begleiten junge Menschen mit lokalen Initiativen dabei, nachhaltige und ethische Einkommensquellen aufzubauen. |
|  | `contenu.domaines.entrepreneuriat.programs[0]` | Ateliers de gestion et de comptabilité simplifiée | Workshops zu Betriebsführung und einfacher Buchhaltung |
|  | `contenu.domaines.entrepreneuriat.programs[1]` | Initiation aux outils numériques et à la bureautique | Einführung in digitale Werkzeuge und Büroanwendungen |
|  | `contenu.domaines.entrepreneuriat.programs[2]` | Mise en réseau avec les experts solidaires du groupe IROKO | Vernetzung mit engagierten Fachleuten der IROKO-Gruppe |
|  | `contenu.domaines.environnement.title` | Environnement | Umwelt |
|  | `contenu.domaines.environnement.shortDesc` | Reboisement communautaire, agroécologie, gestion des déchets et éducation climatique des jeunes. | Gemeinschaftliche Aufforstung, Agrarökologie, Abfallwirtschaft und Klimabildung für junge Menschen. |
|  | `contenu.domaines.environnement.fullDesc` | Protéger les écosystèmes locaux et transmettre aux jeunes générations les gestes d’une agriculture durable et respectueuse des sols. | Wir schützen lokale Ökosysteme und geben der jungen Generation das Wissen um eine nachhaltige, bodenschonende Landwirtschaft weiter. |
|  | `contenu.domaines.environnement.programs[0]` | Pépinières villageoises et campagnes de reboisement | Baumschulen in den Dörfern und Aufforstungskampagnen |
|  | `contenu.domaines.environnement.programs[1]` | Sensibilisation au tri et à l’assainissement urbain | Aufklärung über Mülltrennung und Hygiene in der Stadt |
|  | `contenu.domaines.environnement.programs[2]` | Formation aux pratiques agroécologiques durables | Schulungen zu nachhaltigen agrarökologischen Methoden |
| \* | `contenu.domaines.droits-inclusion.title` | Droits et inclusion | Rechte und Teilhabe <br>_Note : « inclusion » rendu par « Teilhabe », comme le menu_ |
|  | `contenu.domaines.droits-inclusion.shortDesc` | Promotion de l’égalité des chances, inclusion des personnes vulnérables et accès à l’information civique. | Förderung der Chancengleichheit, Teilhabe schutzbedürftiger Menschen und Zugang zu Informationen über Bürgerrechte. |
|  | `contenu.domaines.droits-inclusion.fullDesc` | Défendre la dignité humaine en luttant contre toutes les formes d’exclusion sociale, économique ou liée au handicap. | Wir verteidigen die Würde des Menschen und wenden uns gegen jede Form der Ausgrenzung – sozial, wirtschaftlich oder wegen einer Behinderung. |
|  | `contenu.domaines.droits-inclusion.programs[0]` | Autonomisation des jeunes femmes et leadership communautaire | Stärkung junger Frauen und Führung in der Gemeinschaft |
|  | `contenu.domaines.droits-inclusion.programs[1]` | Soutien à la scolarisation des jeunes en situation de handicap | Unterstützung beim Schulbesuch junger Menschen mit Behinderung |
|  | `contenu.domaines.droits-inclusion.programs[2]` | Permanences d’écoute et d’orientation sociale | Sprechstunden für ein offenes Ohr und soziale Beratung |
|  | `contenu.domaines.mobilite-langues.title` | Mobilité & Langues | Mobilität & Sprachen |
|  | `contenu.domaines.mobilite-langues.shortDesc` | Académie d’allemand /anglais gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens. | Kostenlose Deutsch- und Englischakademie (A1 bis C1) und transparente Begleitung in 10 europäische Länder. |
|  | `contenu.domaines.mobilite-langues.fullDesc` | Un programme financé par nos partenaires et nos donateurs, pour apprendre l’allemand /anglais et préparer un projet d’études, de formation ou de mobilité en toute sécurité. | Ein Programm, das unsere Partner und Spender finanzieren: Deutsch oder Englisch lernen und ein Studien-, Ausbildungs- oder Mobilitätsprojekt sicher vorbereiten. |
|  | `contenu.domaines.mobilite-langues.programs[0]` | Accompagnement des cours de langue allemande /anglaise du niveau A1 au C1 | Begleitung der Deutsch- und Englischkurse von Niveau A1 bis C1 |
|  | `contenu.domaines.mobilite-langues.programs[1]` | Orientation documentée vers 10 pays européens | Fundierte Orientierung für 10 europäische Länder |
|  | `contenu.domaines.mobilite-langues.programs[2]` | Prévention active contre les arnaques et fausses promesses de visa | Aktiver Schutz vor Betrug und falschen Visaversprechen |
|  | `contenu.pays.allemagne.name` | Allemagne | Deutschland |
|  | `contenu.pays.luxembourg.name` | Luxembourg | Luxemburg |
|  | `contenu.pays.slovenie.name` | Slovénie | Slowenien |
|  | `contenu.pays.italie.name` | Italie | Italien |
|  | `contenu.pays.grece.name` | Grèce | Griechenland |
|  | `contenu.pays.portugal.name` | Portugal | Portugal |
|  | `contenu.pays.espagne.name` | Espagne | Spanien |
|  | `contenu.pays.danemark.name` | Danemark | Dänemark |
|  | `contenu.pays.pologne.name` | Pologne | Polen |
|  | `contenu.pays.albanie.name` | Albanie | Albanien |
|  | `contenu.niveaux.a1.title` | Niveau A1 — Découverte & Bases | Niveau A1 — Einstieg & Grundlagen |
|  | `contenu.niveaux.a2.title` | Niveau A2 — Survie & Échanges Courants | Niveau A2 — Verständigung im Alltag |
|  | `contenu.niveaux.b1.title` | Niveau B1 — Seuil d’Autonomie | Niveau B1 — Schwelle zur Selbstständigkeit |
|  | `contenu.niveaux.b2.title` | Niveau B2 — Indépendance & Fluidité | Niveau B2 — Unabhängigkeit & Sprachfluss |
|  | `contenu.niveaux.c1.title` | Niveau C1 — Maîtrise Académique & Professionnelle | Niveau C1 — Sprachbeherrschung für Studium & Beruf |
|  | `contenu.contact.place` | Cameroun (Douala, Yaoundé) et coordination en Allemagne | Kamerun (Douala, Yaoundé) und Koordination in Deutschland |
| \* | `contenu.regions.littoral.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.littoral.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.littoral.name` | Littoral (Douala) | Littoral <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.centre.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.centre.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.centre.name` | Centre (Yaoundé) | Centre <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.ouest.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.ouest.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.ouest.name` | Ouest (Bafoussam) | Ouest <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud-ouest.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud-ouest.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud-ouest.name` | Sud-Ouest (Buea) | Sud-Ouest <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord-ouest.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord-ouest.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord-ouest.name` | Nord-Ouest (Bamenda) | Nord-Ouest <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.sud.name` | Sud (Ebolowa) | Sud <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.est.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.est.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.est.name` | Est (Bertoua) | Est <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.adamaoua.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.adamaoua.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.adamaoua.name` | Adamaoua (Ngaoundéré) | Adamaoua <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.nord.name` | Nord (Garoua) | Nord <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.extreme-nord.antennaTodo` | Antenne locale : à confirmer (TODO) | Lokale Anlaufstelle: noch zu bestätigen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.extreme-nord.actionsTodo` | Actions dans la région : à renseigner (TODO) | Aktivitäten in der Region: noch einzutragen (TODO) <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
| \* | `contenu.regions.extreme-nord.name` | Extrême-Nord (Maroua) | Extrême-Nord <br>_Note : noms des régions du Cameroun gardés en français (noms officiels, usage des sources allemandes) ; question 181_ |
|  | `contenu.voisins.Nigeria.label[0]` | NIGERIA | NIGERIA |
|  | `contenu.voisins.Chad.label[0]` | TCHAD | TSCHAD |
|  | `contenu.voisins.CentralAfricanRep.label[0]` | RÉP. | ZENTRALAFRIK. |
|  | `contenu.voisins.CentralAfricanRep.label[1]` | CENTRAFRICAINE | REPUBLIK |
|  | `contenu.voisins.Congo.label[0]` | CONGO | KONGO |
|  | `contenu.voisins.Gabon.label[0]` | GABON | GABUN |
|  | `contenu.voisins.EqGuinea.label[0]` | GUINÉE ÉQ. | ÄQUAT.-GUINEA |
| \* | `contenu.parcours.section.title` | Apprendre, cultiver, grandir | Lernen, anbauen, wachsen <br>_Note : « Apprendre, cultiver, grandir » rendu par « Lernen, anbauen, wachsen »_ |
|  | `contenu.parcours.section.intro` | Des salles de formation aux champs, et jusqu’au sommet avec les jeunes. | Von den Schulungsräumen auf die Felder – und mit den jungen Menschen bis auf den Gipfel. |
|  | `contenu.parcours.section.link` | Voir toutes les photos | Alle Fotos ansehen |
|  | `contenu.parcours.panneaux.apprendre.title` | Apprendre | Lernen |
|  | `contenu.parcours.panneaux.apprendre.meta` | Albatros Hotel, 25 avril 2026 | Albatros Hotel, 25. April 2026 |
|  | `contenu.parcours.panneaux.apprendre.description` | Une salle comble pour découvrir les programmes de la fondation. | Ein voller Saal, um die Programme der Stiftung kennenzulernen. |
|  | `contenu.parcours.panneaux.chanter-ensemble.title` | Chanter ensemble | Gemeinsam singen |
|  | `contenu.parcours.panneaux.chanter-ensemble.meta` | 25 avril 2026 | 25. April 2026 |
|  | `contenu.parcours.panneaux.chanter-ensemble.description` | Les jeunes reprennent en chœur l’hymne de la fondation. | Die jungen Menschen singen gemeinsam die Hymne der Stiftung. |
|  | `contenu.parcours.panneaux.cultiver.title` | Cultiver | Anbauen |
|  | `contenu.parcours.panneaux.cultiver.meta` | Visite de plantation | Besuch einer Plantage |
|  | `contenu.parcours.panneaux.cultiver.description` | Sur le terrain pour comprendre l’agriculture et l’élevage durables. | Vor Ort, um nachhaltige Landwirtschaft und Tierhaltung zu verstehen. |
|  | `contenu.parcours.panneaux.s-engager.title` | S’engager | Sich engagieren |
| \* | `contenu.parcours.panneaux.s-engager.meta` | Sorties de terrain | Exkursionen <br>_Note : « Sorties de terrain » rendu par « Exkursionen »_ |
|  | `contenu.parcours.panneaux.s-engager.description` | Encadrants et jeunes réunis sous les mêmes couleurs. | Betreuende und junge Menschen vereint in denselben Farben. |
|  | `contenu.parcours.panneaux.grandir.title` | Grandir | Wachsen |
|  | `contenu.parcours.panneaux.grandir.meta` | Randonnée avec les jeunes | Wanderung mit den jungen Menschen |
|  | `contenu.parcours.panneaux.grandir.description` | Une montée à plusieurs, la ville en contrebas. | Ein gemeinsamer Aufstieg, die Stadt tief unten. |
|  | `notFound.title` | Cette page n’existe pas ou a changé d’adresse | Diese Seite gibt es nicht oder sie ist umgezogen |
|  | `notFound.seoTitle` | Page introuvable | Seite nicht gefunden |
|  | `notFound.seoDescription` | Cette adresse ne correspond à aucune page du site WAHHF Foundation. | Diese Adresse entspricht keiner Seite der Website der WAHHF Foundation. |
|  | `notFound.lost` | On s’est perdus en route. | Wir haben uns unterwegs verlaufen. |
|  | `notFound.meta` | Page introuvable (erreur 404) | Seite nicht gefunden (Fehler 404) |
|  | `notFound.message` | L’adresse « {{path}} » ne correspond à aucune page du site. Le lien a peut-être été mal copié ou la page a été déplacée. | Die Adresse „{{path}}“ entspricht keiner Seite dieser Website. Vielleicht wurde der Link falsch kopiert oder die Seite wurde verschoben. |
|  | `notFound.countries` | Les 10 pays accompagnés | Die 10 begleiteten Länder |
|  | `notFound.countryNonEu` | {{name}} (hors Union européenne) | {{name}} (nicht in der Europäischen Union) |
|  | `notFound.where` | Où aller maintenant ? | Wohin jetzt? |
|  | `notFound.home` | Retour à l’accueil | Zurück zur Startseite |
|  | `legal.onlyFrench` | Cette page n’existe pour l’instant qu’en français. | Diese Seite ist derzeit nur auf Französisch verfügbar. |

## accompagnement

Fichier : `src/locales/accompagnement/de.json` (309 textes, dont 19 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `commun.mobilite` | Mobilité & Langues | Mobilität & Sprachen |
|  | `commun.accompagnement` | Accompagnement vers l’Europe | Begleitung nach Europa |
|  | `commun.etape` | Étape {{n}} sur {{total}} de l’accompagnement | Schritt {{n}} von {{total}} der Begleitung |
| \* | `commun.etreAccompagne` | Être accompagné | Sich begleiten lassen |
|  | `commun.formulaire` | Un seul formulaire pour l’orientation vers l’Europe et les cours d’allemand /anglais. Aucun document d’identité ni paiement ne vous est demandé. | Ein einziges Formular für die Orientierung nach Europa und für die Deutsch- und Englischkurse. Wir verlangen von Ihnen weder Ausweisdokumente noch eine Zahlung. |
|  | `commun.nouvelOnglet` |  (nouvel onglet) |  (neuer Tab) |
|  | `commun.dixPays` | Les 10 pays accompagnés | Die 10 begleiteten Länder |
|  | `commun.langues` | Langues{{nb}}: {{liste}} | Sprachen: {{liste}} |
|  | `badges.membre` | Membre de l’Union européenne | Mitglied der Europäischen Union |
|  | `badges.membreCourt` | Membre UE | EU-Mitglied |
|  | `badges.hors` | Hors Union européenne | Außerhalb der Europäischen Union |
|  | `badges.horsCourt` | Hors UE | Nicht-EU |
|  | `etapes.affichee` |  (étape affichée) |  (aktueller Schritt) |
|  | `hub.seoTitre` | Accompagnement vers l'Europe — 5 étapes et 10 pays accompagnés | Begleitung nach Europa – 5 Schritte und 10 begleitete Länder |
|  | `hub.seoDescription` | Orientation gratuite et transparente vers 10 pays européens ({{liste}}) par WAHHF Foundation. | Kostenlose und transparente Orientierung für 10 europäische Länder ({{liste}}) durch die WAHHF Foundation. |
|  | `hub.chargementCarte` | Chargement de la carte Europe… | Europakarte wird geladen… |
|  | `hub.titre` | Un accompagnement transparent, étape par étape | Transparente Begleitung, Schritt für Schritt |
|  | `hub.intro` | Comprendre les parcours légaux, préparer un dossier authentique, apprendre la langue du pays et vérifier chaque information sur les portails officiels de 10 pays européens. | Die legalen Wege verstehen, echte Bewerbungsunterlagen vorbereiten, die Landessprache lernen und jede Information auf den offiziellen Portalen von 10 europäischen Ländern prüfen. |
|  | `hub.choisirPays` | Choisir un pays | Land auswählen |
|  | `hub.etapesTitre` | Votre parcours en 5 étapes | Ihr Weg in 5 Schritten |
|  | `hub.etapesSousTitre` | Chaque étape mène à son guide pratique. | Jeder Schritt führt zu seinem praktischen Leitfaden. |
|  | `hub.paysSousTitre` | {{liste}}. Pour chaque pays, une fiche présente les voies légales et les sites officiels. | {{liste}}. Für jedes Land stellt eine Länderseite die legalen Wege und die offiziellen Websites vor. |
|  | `hub.et` | et | und |
|  | `hub.demander` | Demander un accompagnement | Begleitung anfragen |
|  | `hub.signalerTitre` | Signaler une arnaque | Betrug melden |
|  | `hub.signalerSousTitre` | Une personne vous demande de l’argent au nom de WAHHF Foundation ? Interrompez tout échange et prévenez-nous. | Jemand verlangt im Namen der WAHHF Foundation Geld von Ihnen? Brechen Sie jeden Kontakt ab und informieren Sie uns. |
|  | `pays.seoTitre` | {{name}} — Fiche d'orientation gratuite vers l'Europe | {{name}} – Kostenlose Länderseite zur Orientierung nach Europa |
|  | `pays.seoDescription` | Information gratuite sur les études, la formation et le travail {{inside}}, par WAHHF Foundation. | Kostenlose Informationen zu Studium, Berufsausbildung und Arbeit {{inside}}, von der WAHHF Foundation. |
|  | `pays.precisionTitre` | Précision juridique importante concernant {{pays}} (État non membre de l’UE) | Wichtiger rechtlicher Hinweis zu {{name}} (kein EU-Mitgliedstaat) |
| \* | `pays.titre` | S’orienter {{towards}} | Ihr Weg {{towards}} |
|  | `pays.cameroun` | Cameroun | Kamerun |
|  | `pays.verifies` | Liens officiels vérifiés le {{date}} | Offizielle Links geprüft am {{date}} |
| \* | `pays.action` | Être accompagné pour partir {{inside}} | Begleitung für den Weg {{towards}} |
|  | `pays.voirPays` | Voir les 10 pays accompagnés | Alle 10 begleiteten Länder ansehen |
|  | `pays.voiesTitre` | Les trois grandes voies de mobilité réglementaire | Die drei großen geregelten Wege der Mobilität |
|  | `pays.voiesSousTitre` | Aperçu informatif. Vérifiez toujours les critères à jour sur les portails officiels ci-dessous. | Ein Überblick zur Information. Prüfen Sie die aktuellen Kriterien immer auf den offiziellen Portalen unten. |
|  | `pays.voieEtudes` | Études supérieures | Hochschulstudium |
|  | `pays.voieFormation` | Formation professionnelle | Berufsausbildung |
|  | `pays.voieTravail` | Travail et mobilité qualifiée | Arbeit und Fachkräftemobilität |
|  | `pays.etapesTitre` | Les grandes étapes pour préparer votre projet {{towards}} | Die wichtigsten Schritte für Ihr Vorhaben {{inside}} |
|  | `pays.sitesTitre` | Les sites officiels | Die offiziellen Websites |
|  | `pays.sitesSousTitre` | Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels : | Verlassen Sie sich nie auf inoffizielle Seiten. Nutzen Sie direkt die Portale der Institutionen: |
|  | `pays.lienVerifie` | Lien vérifié le {{date}} | Link geprüft am {{date}} |
|  | `pays.vigilance` | Lire notre guide de vigilance contre les fausses offres | Unseren Leitfaden zum Schutz vor falschen Angeboten lesen |
|  | `pays.autresFiches` | Consulter une autre fiche parmi les 10 pays accompagnés | Eine andere Länderseite der 10 begleiteten Länder ansehen |
|  | `pays.introuvableTitre` | Ce pays ne fait pas partie des 10 pays accompagnés | Dieses Land gehört nicht zu den 10 begleiteten Ländern |
|  | `pays.introuvableMessage` | WAHHF Foundation accompagne gratuitement vers 10 pays européens. Choisissez l’un d’eux ci-dessous pour consulter sa fiche d’orientation. | Die WAHHF Foundation begleitet kostenlos in 10 europäische Länder. Wählen Sie unten eines davon aus, um seine Länderseite aufzurufen. |
|  | `pays.horsUe` |  (hors Union européenne) |  (außerhalb der Europäischen Union) |
|  | `guide.introuvableTitre` | Ce guide d’accompagnement n’existe pas | Diesen Leitfaden der Begleitung gibt es nicht |
|  | `guide.introuvableMessage` | Le lien a peut-être été mal copié. Voici les guides disponibles pour préparer votre projet vers l’Europe. | Der Link wurde vielleicht falsch kopiert. Hier finden Sie die verfügbaren Leitfäden, um Ihr Vorhaben in Europa vorzubereiten. |
|  | `guide.introuvableListe` | Les guides d’accompagnement | Die Leitfäden der Begleitung |
|  | `guide.seoTitre` | {{title}} — Accompagnement gratuit vers l'Europe | {{title}} – Kostenlose Begleitung nach Europa |
|  | `guide.etapesTitre` | Les 5 étapes de l’accompagnement | Die 5 Schritte der Begleitung |
|  | `arnaques.signalementObjet` | Signalement d’une tentative d’arnaque | Meldung eines Betrugsversuchs |
|  | `arnaques.signalementIntro` | Je souhaite signaler une personne ou un message qui utilise le nom de WAHHF Foundation. | Ich möchte eine Person oder eine Nachricht melden, die den Namen der WAHHF Foundation verwendet. |
|  | `arnaques.signalementFin` | Ce qui s’est passé (date, numéro ou profil, somme demandée) :<br><br>(Joignez si possible une capture d’écran du message.) | Was ist passiert (Datum, Nummer oder Profil, verlangter Betrag):<br><br>(Fügen Sie nach Möglichkeit einen Screenshot der Nachricht bei.) |
|  | `arnaques.signalerWhatsapp` | Signaler sur WhatsApp | Über WhatsApp melden |
|  | `arnaques.signalerEmail` | Signaler par e-mail | Per E-Mail melden |
|  | `arnaques.seoTitre` | Éviter les arnaques et les fausses promesses — Accompagnement gratuit vers l'Europe | Betrug und falsche Versprechen vermeiden – Kostenlose Begleitung nach Europa |
|  | `arnaques.seoDescription` | Reconnaître une fausse offre de visa, de contrat ou d'admission, et signaler une arnaque à WAHHF Foundation par ses seuls canaux officiels. | Ein falsches Visa-, Vertrags- oder Zulassungsangebot erkennen und Betrug über die einzigen offiziellen Kanäle der WAHHF Foundation melden. |
|  | `arnaques.filAriane` | Éviter les arnaques | Betrug vermeiden |
|  | `arnaques.titre` | Éviter les arnaques et les fausses promesses | Betrug und falsche Versprechen vermeiden |
|  | `arnaques.intro` | Comment reconnaître une offre frauduleuse, protéger vos proches et vérifier chaque information. | Wie Sie ein betrügerisches Angebot erkennen, Ihre Angehörigen schützen und jede Information prüfen. |
|  | `arnaques.canauxTitre` | Nos seuls canaux officiels | Unsere einzigen offiziellen Kanäle |
|  | `arnaques.canauxSousTitre` | Si une personne prétend agir au nom de WAHHF Foundation ou d’IROKO en vous réclamant de l’argent, interrompez immédiatement tout échange et signalez-le-nous. | Wenn jemand behauptet, im Namen der WAHHF Foundation oder von IROKO zu handeln, und Geld von Ihnen verlangt, brechen Sie den Kontakt sofort ab und melden Sie es uns. |
|  | `arnaques.email` | E-mail | E-Mail |
|  | `arnaques.canauxNote` | Tout autre numéro ou adresse qui se présente comme WAHHF Foundation n’est pas le nôtre. Joignez si possible une capture d’écran du message. | Jede andere Nummer oder Adresse, die sich als WAHHF Foundation ausgibt, gehört nicht uns. Fügen Sie nach Möglichkeit einen Screenshot der Nachricht bei. |
|  | `arnaques.signesTitre` | 5 signes d’arnaque | 5 Anzeichen für Betrug |
|  | `arnaques.signesSousTitre` | Si vous reconnaissez l’un de ces signes, interrompez l’échange et vérifiez. | Wenn Sie eines dieser Anzeichen erkennen, brechen Sie den Kontakt ab und prüfen Sie nach. |
|  | `arnaques.exempleTitre` | À quoi ressemble un faux message | So sieht eine gefälschte Nachricht aus |
|  | `arnaques.exempleSousTitre` | Ce message est inventé pour l’exemple, à partir des signes ci-dessus. Chaque passage souligné en ambre est un signe d’arnaque. | Diese Nachricht ist für das Beispiel erfunden, auf Grundlage der Anzeichen oben. Jede bernsteinfarben unterstrichene Stelle ist ein Anzeichen für Betrug. |
|  | `arnaques.exempleEntete` | Message reçu sur WhatsApp, d’un numéro inconnu | Nachricht auf WhatsApp, von einer unbekannten Nummer |
|  | `arnaques.exempleLegende` | Exemple inventé{{nb}}: ce message ne vient pas de WAHHF Foundation. | Erfundenes Beispiel: Diese Nachricht stammt nicht von der WAHHF Foundation. |
|  | `arnaques.citation` | «{{nb}}{{texte}}{{nb}}» | „{{texte}}“ |
|  | `arnaques.avantNote` | {{nb}}:  | :  |
|  | `arnaques.jamaisTitre` | WAHHF Foundation ne demande jamais d’argent | Die WAHHF Foundation verlangt nie Geld |
|  | `arnaques.jamaisSousTitre` | WAHHF Foundation est une fondation à but non lucratif, financée par ses partenaires et ses donateurs. Notre accompagnement et nos cours d’allemand /anglais sont gratuits. | Die WAHHF Foundation ist eine gemeinnützige Stiftung, finanziert von ihren Partnern sowie ihren Spenderinnen und Spendern. Unsere Begleitung und unsere Deutsch- und Englischkurse sind kostenlos. |
|  | `arnaques.reflexesTitre` | Les bons réflexes | Richtig reagieren |
|  | `arnaques.voirFiches` | Voir les fiches des 10 pays et leurs sites officiels | Die Länderseiten der 10 Länder und ihre offiziellen Websites ansehen |
|  | `arnaques.suspectTitre` | Une offre vous semble suspecte ? | Kommt Ihnen ein Angebot verdächtig vor? |
|  | `arnaques.suspectSousTitre` | Interrompez tout échange et prévenez-nous par l’un de nos seuls canaux officiels, avec une capture d’écran du message si possible. | Brechen Sie jeden Kontakt ab und informieren Sie uns über einen unserer einzigen offiziellen Kanäle, wenn möglich mit einem Screenshot der Nachricht. |
|  | `arnaques.retourEtapes` | Revenir aux 5 étapes de l’accompagnement | Zurück zu den 5 Schritten der Begleitung |
|  | `contenu.etapes.comprendre-les-parcours.title` | Comprendre les parcours vers l’Europe | Die Wege verstehen (Studium, Berufsausbildung, Arbeit) |
|  | `contenu.etapes.comprendre-les-parcours.desc` | Distinguer avec clarté les conditions d’études universitaires, d’alternance professionnelle (Ausbildung) et de mobilité qualifiée selon votre profil réel. | Die Voraussetzungen für ein Hochschulstudium, eine duale Berufsausbildung (Ausbildung) und die Mobilität von Fachkräften klar unterscheiden, passend zu Ihrem tatsächlichen Profil. |
|  | `contenu.etapes.preparer-son-dossier.title` | Préparer son dossier avec rigueur | Bewerbungsunterlagen vorbereiten (Lebenslauf, Anschreiben, Abschlüsse, Anerkennung) |
|  | `contenu.etapes.preparer-son-dossier.desc` | Rassembler des pièces 100 % authentiques, comprendre les procédures d’équivalence académique et rédiger un dossier lisible aux normes européennes. | Zu 100 % echte Unterlagen zusammenstellen, die Verfahren zur Anerkennung von Abschlüssen verstehen und übersichtliche Bewerbungsunterlagen nach europäischen Standards erstellen. |
|  | `contenu.etapes.apprendre-la-langue.title` | Apprendre la langue du pays : la clé de l’autonomie | Die Landessprache lernen |
|  | `contenu.etapes.apprendre-la-langue.desc` | Acquérir le niveau linguistique requis (notamment l’allemand /anglais de A1 à C1 avec l’Académie WAHHF) avant d’entamer les démarches. | Das erforderliche Sprachniveau erreichen (insbesondere Deutsch/Englisch von A1 bis C1 mit der WAHHF-Akademie), bevor die Formalitäten beginnen. |
|  | `contenu.etapes.eviter-les-arnaques.title` | Éviter les arnaques et les fausses promesses | Die offiziellen Verfahren kennen und Betrug vermeiden |
|  | `contenu.etapes.eviter-les-arnaques.desc` | Consulter exclusivement les portails gouvernementaux et consulaires officiels, et refuser tout intermédiaire payant. | Ausschließlich die offiziellen Portale der Regierungen und Konsulate nutzen und jede kostenpflichtige Vermittlung ablehnen. |
|  | `contenu.etapes.s-installer.title` | Préparer son arrivée et son intégration | Ankunft und Integration vorbereiten |
|  | `contenu.etapes.s-installer.desc` | Se préparer aux réalités pratiques de la vie en Europe : logement, assurance et démarches d’arrivée. | Sich auf den praktischen Alltag in Europa vorbereiten: Wohnung, Versicherung und Formalitäten nach der Ankunft. |
|  | `contenu.guides.comprendre-les-parcours.title` | Comprendre les parcours vers l’Europe | Die Wege nach Europa verstehen |
|  | `contenu.guides.comprendre-les-parcours.subtitle` | Distinguer clairement les études universitaires, la formation professionnelle et la mobilité liée au travail. | Hochschulstudium, Berufsausbildung und arbeitsbezogene Mobilität klar voneinander unterscheiden. |
|  | `contenu.guides.comprendre-les-parcours.sections[0].heading` | Les études supérieures (Bachelor, Master, Doctorat) | Das Hochschulstudium (Bachelor, Master, Promotion) |
| \* | `contenu.guides.comprendre-les-parcours.sections[0].body` | Le parcours académique s’adresse aux titulaires du baccalauréat ou d’un diplôme universitaire souhaitant poursuivre une formation théorique et de recherche dans une université publique ou privée accréditée. | Der akademische Weg richtet sich an Personen mit Baccalauréat oder Hochschulabschluss, die ein theoretisches und forschungsorientiertes Studium an einer staatlichen oder privaten akkreditierten Hochschule anstreben. |
|  | `contenu.guides.comprendre-les-parcours.sections[0].bullets[0]` | Nécessite la reconnaissance officielle du diplôme de fin d’études secondaires ou supérieures | Erfordert die offizielle Anerkennung des Schul- oder Hochschulabschlusses |
|  | `contenu.guides.comprendre-les-parcours.sections[0].bullets[1]` | Exige un niveau de langue certifié (souvent B2 ou C1 dans la langue d’enseignement) | Setzt ein zertifiziertes Sprachniveau voraus (oft B2 oder C1 in der Unterrichtssprache) |
|  | `contenu.guides.comprendre-les-parcours.sections[0].bullets[2]` | Implique la justification de ressources financières bloquées ou d’une bourse officielle selon la réglementation du pays d’accueil | Erfordert den Nachweis finanzieller Mittel auf einem Sperrkonto oder eines offiziellen Stipendiums, je nach den Vorschriften des Gastlandes |
|  | `contenu.guides.comprendre-les-parcours.sections[1].heading` | La formation professionnelle (ex. Ausbildung en Allemagne) | Die Berufsausbildung (z. B. Ausbildung in Deutschland) |
|  | `contenu.guides.comprendre-les-parcours.sections[1].body` | La formation professionnelle en alternance combine des cours dans une école professionnelle et une pratique rémunérée en entreprise pendant 2 à 3 ans. | Die duale Berufsausbildung verbindet Unterricht an einer Berufsschule mit bezahlter Praxis in einem Betrieb, über 2 bis 3 Jahre. |
|  | `contenu.guides.comprendre-les-parcours.sections[1].bullets[0]` | Excellente maîtrise de la langue du pays indispensable (minimum B1 solide ou B2) | Sehr gute Kenntnisse der Landessprache sind unerlässlich (mindestens ein solides B1 oder B2) |
|  | `contenu.guides.comprendre-les-parcours.sections[1].bullets[1]` | Candidature directe auprès des entreprises formatrices sans frais d’intermédiaire | Direkte Bewerbung bei den Ausbildungsbetrieben, ohne Vermittlungsgebühren |
|  | `contenu.guides.comprendre-les-parcours.sections[1].bullets[2]` | Contrat de formation officiel requis avant toute démarche consulaire | Ein offizieller Ausbildungsvertrag ist vor jedem Schritt beim Konsulat erforderlich |
|  | `contenu.guides.comprendre-les-parcours.sections[2].heading` | La mobilité professionnelle qualifiée | Die Mobilität von Fachkräften |
|  | `contenu.guides.comprendre-les-parcours.sections[2].body` | Destinée aux professionnels disposant déjà d’un diplôme supérieur ou technique reconnu et d’une expérience vérifiable. | Für Berufstätige, die bereits einen anerkannten Hochschul- oder Fachabschluss und nachweisbare Berufserfahrung haben. |
|  | `contenu.guides.comprendre-les-parcours.sections[2].bullets[0]` | Procédure préalable d’équivalence ou de reconnaissance des qualifications professionnelles | Vorheriges Verfahren zur Gleichwertigkeit oder Anerkennung der Berufsqualifikationen |
|  | `contenu.guides.comprendre-les-parcours.sections[2].bullets[1]` | Respect strict des règles nationales des ministères du travail et de l’immigration | Strikte Einhaltung der nationalen Vorschriften der Arbeits- und Einwanderungsministerien |
|  | `contenu.guides.preparer-son-dossier.title` | Préparer son dossier avec rigueur | Bewerbungsunterlagen sorgfältig vorbereiten |
|  | `contenu.guides.preparer-son-dossier.subtitle` | Les bonnes pratiques documentaires pour constituer un dossier authentique, lisible et conforme. | Bewährte Vorgehensweisen, um echte, übersichtliche und vorschriftsgemäße Unterlagen zusammenzustellen. |
|  | `contenu.guides.preparer-son-dossier.sections[0].heading` | Authenticité absolue des documents | Absolute Echtheit der Dokumente |
|  | `contenu.guides.preparer-son-dossier.sections[0].body` | Tout document falsifié ou inexact entraîne un refus immédiat et des interdictions durables auprès des autorités consulaires. WAHHF sensibilise chaque candidat à l’importance d’un dossier 100 % authentique. | Jedes gefälschte oder unrichtige Dokument führt zur sofortigen Ablehnung und zu dauerhaften Sperren bei den Konsularbehörden. WAHHF macht allen Bewerberinnen und Bewerbern bewusst, wie wichtig zu 100 % echte Unterlagen sind. |
|  | `contenu.guides.preparer-son-dossier.sections[0].bullets[0]` | Rassembler les relevés de notes et diplômes originaux | Originale Notenübersichten und Zeugnisse zusammentragen |
|  | `contenu.guides.preparer-son-dossier.sections[0].bullets[1]` | Effectuer les démarches de légalisation ou d’authentification uniquement auprès des administrations officielles | Legalisation oder Beglaubigung nur bei offiziellen Behörden vornehmen lassen |
|  | `contenu.guides.preparer-son-dossier.sections[0].bullets[2]` | Faire traduire ses pièces par des traducteurs assermentés reconnus | Unterlagen von anerkannten vereidigten Übersetzerinnen und Übersetzern übersetzen lassen |
|  | `contenu.guides.preparer-son-dossier.sections[1].heading` | Curriculum Vitae et lettre de motivation | Lebenslauf und Anschreiben |
|  | `contenu.guides.preparer-son-dossier.sections[1].body` | Chaque pays européen possède ses propres codes de présentation (par exemple le format tabulaire clair en Allemagne ou le format Europass). | Jedes europäische Land hat eigene Gepflogenheiten für die Gestaltung (zum Beispiel den übersichtlichen tabellarischen Lebenslauf in Deutschland oder das Europass-Format). |
|  | `contenu.guides.preparer-son-dossier.sections[1].bullets[0]` | Mettre en valeur son parcours réel avec honnêteté et clarté | Den eigenen tatsächlichen Werdegang ehrlich und klar darstellen |
|  | `contenu.guides.preparer-son-dossier.sections[1].bullets[1]` | Expliquer la cohérence entre ses études passées et le projet visé | Erklären, wie die bisherigen Studien und das angestrebte Vorhaben zusammenpassen |
|  | `contenu.guides.preparer-son-dossier.sections[1].bullets[2]` | Faire relire ses textes lors des ateliers d’accompagnement WAHHF | Die eigenen Texte in den Begleitworkshops von WAHHF Korrektur lesen lassen |
|  | `contenu.guides.apprendre-la-langue.title` | Apprendre la langue du pays : la clé de l’autonomie | Die Landessprache lernen: der Schlüssel zur Selbstständigkeit |
|  | `contenu.guides.apprendre-la-langue.subtitle` | Pourquoi la maîtrise linguistique précède toujours les démarches administratives. | Warum Sprachkenntnisse immer vor den Behördengängen kommen. |
|  | `contenu.guides.apprendre-la-langue.sections[0].heading` | La langue protège et rend autonome | Sprache schützt und macht selbstständig |
|  | `contenu.guides.apprendre-la-langue.sections[0].body` | Partir sans maîtriser la langue du pays d’accueil expose à l’isolement, à l’échec académique et à la précarité. C’est pourquoi WAHHF place l’apprentissage linguistique au tout premier rang. | Wer ohne Kenntnisse der Sprache des Gastlandes ausreist, riskiert Isolation, Misserfolg im Studium und prekäre Lebensumstände. Deshalb stellt WAHHF das Sprachenlernen an die allererste Stelle. |
|  | `contenu.guides.apprendre-la-langue.sections[0].bullets[0]` | Pratique régulière de la compréhension orale, de l’expression écrite et du dialogue | Regelmäßiges Üben von Hörverstehen, schriftlichem Ausdruck und Gespräch |
|  | `contenu.guides.apprendre-la-langue.sections[0].bullets[1]` | Progression structurée selon le Cadre européen commun de référence pour les langues (A1 à C1) | Strukturierter Lernfortschritt nach dem Gemeinsamen Europäischen Referenzrahmen für Sprachen (A1 bis C1) |
|  | `contenu.guides.apprendre-la-langue.sections[0].bullets[2]` | Préparation méthodique aux examens officiels reconnus internationalement | Methodische Vorbereitung auf international anerkannte offizielle Prüfungen |
|  | `contenu.guides.s-installer.title` | Préparer son arrivée et son intégration | Ankunft und Integration vorbereiten |
|  | `contenu.guides.s-installer.subtitle` | Se préparer aux réalités pratiques, culturelles et administratives de la vie en Europe. | Sich auf den praktischen, kulturellen und behördlichen Alltag in Europa vorbereiten. |
|  | `contenu.guides.s-installer.sections[0].heading` | Les premières démarches à l’arrivée | Die ersten Formalitäten nach der Ankunft |
|  | `contenu.guides.s-installer.sections[0].body` | Une installation réussie se prépare plusieurs mois avant le départ : logement étudiant, assurance maladie, inscription municipale et ouverture de compte. | Ein guter Start wird mehrere Monate vor der Abreise vorbereitet: Unterkunft für Studierende, Krankenversicherung, Anmeldung bei der Gemeinde und Kontoeröffnung. |
|  | `contenu.guides.s-installer.sections[0].bullets[0]` | Anticiper la recherche de logement via les résidences universitaires officielles (ex. Studierendenwerk) | Frühzeitig eine Unterkunft über die offiziellen Studierendenwohnheime suchen (z. B. Studierendenwerk) |
|  | `contenu.guides.s-installer.sections[0].bullets[1]` | Comprendre le fonctionnement de l’enregistrement de domicile (Anmeldung) et de l’assurance santé obligatoire | Verstehen, wie die Wohnsitzanmeldung (Anmeldung) und die Krankenversicherungspflicht funktionieren |
|  | `contenu.guides.s-installer.sections[0].bullets[2]` | Connaître ses droits et ses devoirs d’étudiant ou d’apprenti | Die eigenen Rechte und Pflichten als Studierende oder Auszubildende kennen |
|  | `contenu.guides.eviter-les-arnaques.title` | Éviter les arnaques et les fausses promesses | Betrug und falsche Versprechen vermeiden |
|  | `contenu.guides.eviter-les-arnaques.subtitle` | Comment reconnaître une offre frauduleuse, protéger vos proches et vérifier chaque information. | Wie Sie ein betrügerisches Angebot erkennen, Ihre Angehörigen schützen und jede Information prüfen. |
|  | `contenu.arnaques.signes[0].title` | Éducation | Man verspricht Ihnen ein garantiertes Visum |
|  | `contenu.arnaques.signes[0].text` | Méfiez-vous de toute personne qui promet un visa « garanti à 100 % » ou « rapide sans entretien à l’ambassade ». Les décisions appartiennent aux autorités et aux établissements concernés. | Seien Sie misstrauisch, wenn jemand ein Visum „zu 100 % garantiert“ oder „schnell und ohne Gespräch in der Botschaft“ verspricht. Entscheidungen treffen die zuständigen Behörden und Einrichtungen. |
|  | `contenu.arnaques.signes[1].title` | Santé | Man verkauft Ihnen einen Arbeits- oder Ausbildungsvertrag |
|  | `contenu.arnaques.signes[1].text` | Un contrat de formation (Ausbildung) ou de travail en Europe ne s’achète jamais : ce sont les entreprises qui rémunèrent l’apprenti, jamais l’inverse. | Einen Ausbildungsvertrag (Ausbildung) oder Arbeitsvertrag in Europa kann man niemals kaufen: Die Unternehmen bezahlen die Auszubildenden, niemals umgekehrt. |
|  | `contenu.arnaques.signes[2].title` | Entrepreneuriat des jeunes | Man verspricht Ihnen eine Zulassung ohne Abschluss und ohne Sprachkenntnisse |
|  | `contenu.arnaques.signes[2].text` | Les études et la formation professionnelle en Europe demandent un niveau de langue certifié et, pour les études, la reconnaissance officielle de vos diplômes. | Ein Studium und eine Berufsausbildung in Europa setzen ein zertifiziertes Sprachniveau voraus und, für ein Studium, die offizielle Anerkennung Ihrer Abschlüsse. |
| \* | `contenu.arnaques.signes[3].title` | Environnement | Sie sollen eine Privatperson per mobiler Geldüberweisung bezahlen |
| \* | `contenu.arnaques.signes[3].text` | Aucune ambassade ni aucun consulat ne demande de paiement par transfert mobile informel à un particulier, et aucun membre de WAHHF Foundation ne vous demandera d’argent. | Keine Botschaft und kein Konsulat verlangt eine Zahlung per informeller mobiler Geldüberweisung an eine Privatperson, und kein Mitglied der WAHHF Foundation wird Geld von Ihnen verlangen. |
|  | `contenu.arnaques.signes[4].title` | Droits et inclusion | Ein Profil verwendet ein offizielles Logo in einem Messenger |
|  | `contenu.arnaques.signes[4].text` | Attention aux faux profils qui utilisent des logos officiels sur WhatsApp, Telegram ou Facebook : comparez le numéro avec nos seuls canaux officiels, en haut de cette page. | Vorsicht vor gefälschten Profilen mit offiziellen Logos auf WhatsApp, Telegram oder Facebook: Vergleichen Sie die Nummer mit unseren einzigen offiziellen Kanälen oben auf dieser Seite. |
|  | `contenu.arnaques.fauxMessage[0]` | Portugal | Hallo!  |
|  | `contenu.arnaques.fauxMessage[1].flag` | 🇱🇺 | Visum für Deutschland zu 100 % garantiert, ohne Gespräch in der Botschaft. |
|  | `contenu.arnaques.fauxMessage[1].note` | Méfiez-vous de toute promesse de visa garanti ou sans entretien : les décisions appartiennent aux autorités et aux établissements concernés. | Seien Sie misstrauisch bei jedem Versprechen eines garantierten Visums oder eines Visums ohne Gespräch: Entscheidungen treffen die zuständigen Behörden und Einrichtungen. |
|  | `contenu.arnaques.fauxMessage[3].flag` | 🇮🇹 | Ein Arbeitsvertrag wartet bereits auf Sie. |
|  | `contenu.arnaques.fauxMessage[3].note` | Un contrat de travail ou de formation ne s’achète jamais : ce sont les entreprises qui recrutent et rémunèrent. | Einen Arbeits- oder Ausbildungsvertrag kann man niemals kaufen: Es sind die Unternehmen, die einstellen und bezahlen. |
|  | `contenu.arnaques.fauxMessage[4]` |  Pour réserver votre place,  |  Um Ihren Platz zu reservieren,  |
| \* | `contenu.arnaques.fauxMessage[5].flag` | 🇵🇹 | senden Sie die Bearbeitungsgebühr per mobiler Geldüberweisung |
|  | `contenu.arnaques.fauxMessage[5].note` | Ni une ambassade, ni un consulat, ni WAHHF Foundation ne demandent de paiement à un particulier. | Weder eine Botschaft noch ein Konsulat noch die WAHHF Foundation verlangen eine Zahlung an eine Privatperson. |
|  | `contenu.arnaques.fauxMessage[6]` |  à ce numéro.  |  an diese Nummer.  |
|  | `contenu.arnaques.fauxMessage[7].flag` | 🇩🇰 | Das Team der WAHHF Foundation |
|  | `contenu.arnaques.fauxMessage[7].note` | Un nom ou un logo ne prouve rien : comparez le numéro avec nos seuls canaux officiels. | Ein Name oder ein Logo beweist nichts: Vergleichen Sie die Nummer mit unseren einzigen offiziellen Kanälen. |
|  | `contenu.arnaques.promesses[0].title` | Éducation | Eine Spende verschafft niemals einen Platz |
|  | `contenu.arnaques.promesses[0].text` | Méfiez-vous de toute personne qui promet un visa « garanti à 100 % » ou « rapide sans entretien à l’ambassade ». Les décisions appartiennent aux autorités et aux établissements concernés. | Spenden finanzieren die Arbeit der Stiftung. Eine Spende reserviert weder einen Platz in unseren Kursen noch eine Begleitung. |
|  | `contenu.arnaques.promesses[1].text` | Un contrat de formation (Ausbildung) ou de travail en Europe ne s’achète jamais : ce sont les entreprises qui rémunèrent l’apprenti, jamais l’inverse. | Kein Mitglied, keine ehrenamtliche Person und kein Partner von WAHHF wird von Ihnen Bearbeitungs- oder Anmeldegebühren, eine Kaution oder eine Zahlung per Mobile Money verlangen. |
| \* | `contenu.arnaques.promesses[2].text` | Les études et la formation professionnelle en Europe demandent un niveau de langue certifié et, pour les études, la reconnaissance officielle de vos diplômes. | Beim ersten Kontakt online verlangen wir keine Ausweisdokumente (Reisepass, Personalausweis). |
|  | `contenu.arnaques.promesses[3].text` | Aucune ambassade ni aucun consulat ne demande de paiement par transfert mobile informel à un particulier, et aucun membre de WAHHF Foundation ne vous demandera d’argent. | Wir verkaufen weder Visa noch Flugtickets noch Arbeitsverträge. |
|  | `contenu.arnaques.reflexes[0].text` | Méfiez-vous de toute personne qui promet un visa « garanti à 100 % » ou « rapide sans entretien à l’ambassade ». Les décisions appartiennent aux autorités et aux établissements concernés. | Prüfen Sie die Verfahren immer auf der offiziellen Website der Botschaft des jeweiligen Landes. |
|  | `contenu.arnaques.reflexes[1].text` | Un contrat de formation (Ausbildung) ou de travail en Europe ne s’achète jamais : ce sont les entreprises qui rémunèrent l’apprenti, jamais l’inverse. | Verlassen Sie sich nie auf inoffizielle Seiten: Nutzen Sie direkt die Portale der Institutionen, die auf jeder Länderseite genannt sind. |
|  | `contenu.arnaques.reflexes[2].text` | Les études et la formation professionnelle en Europe demandent un niveau de langue certifié et, pour les études, la reconnaissance officielle de vos diplômes. | Brechen Sie im Zweifel den Kontakt sofort ab und melden Sie es uns, mit einem Screenshot der Nachricht. |
|  | `contenu.pays.allemagne.towards` | vers l’Allemagne | nach Deutschland |
|  | `contenu.pays.allemagne.inside` | en Allemagne | in Deutschland |
|  | `contenu.pays.allemagne.languages[0]` | Allemand (langue officielle) | Deutsch (Amtssprache) |
|  | `contenu.pays.allemagne.languages[1]` | Anglais (certains cursus internationaux) | Englisch (einige internationale Studiengänge) |
|  | `contenu.pays.allemagne.summary` | L’Allemagne propose des voies structurées pour les études universitaires, la formation professionnelle duale (Ausbildung) et la mobilité qualifiée. | Deutschland bietet strukturierte Wege für ein Hochschulstudium, die duale Berufsausbildung (Ausbildung) und die Mobilität von Fachkräften. |
|  | `contenu.pays.allemagne.pathways.studies` | Admission universitaire (Studienkolleg, Bachelor, Master) soumise à la reconnaissance du diplôme (Anabin / uni-assist), à un niveau d’allemand B2/C1 (ou anglais selon cursus) et à la preuve de ressources financières réglementaires. | Die Zulassung zum Studium (Studienkolleg, Bachelor, Master) setzt die Anerkennung des Abschlusses (Anabin / uni-assist), Deutschkenntnisse auf Niveau B2/C1 (oder Englisch, je nach Studiengang) und den vorgeschriebenen Finanzierungsnachweis voraus. |
|  | `contenu.pays.allemagne.pathways.training` | Formation professionnelle duale (Ausbildung) alliant école théorique et apprentissage en entreprise, généralement accessible à partir du niveau B1/B2 d’allemand. | Duale Berufsausbildung (Ausbildung), die Theorie in der Berufsschule mit praktischer Ausbildung im Betrieb verbindet; in der Regel ab Deutschniveau B1/B2 möglich. |
|  | `contenu.pays.allemagne.pathways.work` | Mobilité professionnelle encadrée par la loi sur l’immigration qualifiée (Fachkräfteeinwanderungsgesetz) avec reconnaissance des diplômes. | Berufliche Mobilität nach dem Fachkräfteeinwanderungsgesetz, mit Anerkennung der Abschlüsse. |
|  | `contenu.pays.allemagne.steps[0]` | Apprentissage et certification officielle de la langue allemande (B1 à C1 selon le projet) | Deutsch lernen und ein offizielles Sprachzertifikat erwerben (B1 bis C1, je nach Vorhaben) |
|  | `contenu.pays.allemagne.steps[1]` | Vérification de l’équivalence des diplômes et constitution du dossier académique ou professionnel | Anerkennung der Abschlüsse prüfen und die Unterlagen für Studium oder Beruf zusammenstellen |
|  | `contenu.pays.allemagne.steps[2]` | Candidature auprès de l’établissement d’enseignement ou de formation | Bewerbung bei der Bildungs- oder Ausbildungseinrichtung |
|  | `contenu.pays.allemagne.steps[3]` | Demande de rendez-vous et dépôt officiel du dossier auprès de l’Ambassade d’Allemagne compétente | Termin beantragen und die Unterlagen offiziell bei der zuständigen Deutschen Botschaft einreichen |
|  | `contenu.pays.allemagne.officialLinks[0].label` | Make it in Germany (Portail officiel du gouvernement fédéral) | Make it in Germany (offizielles Portal der Bundesregierung) |
|  | `contenu.pays.allemagne.officialLinks[1].label` | DAAD — Office allemand d’échanges universitaires | DAAD — Deutscher Akademischer Austauschdienst |
| \* | `contenu.pays.allemagne.officialLinks[2].label` | Ambassade d’Allemagne au Cameroun (Yaoundé) | Deutsche Botschaft in Kamerun (Yaoundé) |
|  | `contenu.pays.luxembourg.towards` | vers le Luxembourg | nach Luxemburg |
|  | `contenu.pays.luxembourg.inside` | au Luxembourg | in Luxemburg |
|  | `contenu.pays.luxembourg.languages[0]` | Français | Französisch |
|  | `contenu.pays.luxembourg.languages[1]` | Allemand | Deutsch |
|  | `contenu.pays.luxembourg.languages[2]` | Luxembourgeois | Luxemburgisch |
|  | `contenu.pays.luxembourg.languages[3]` | Anglais | Englisch |
|  | `contenu.pays.luxembourg.summary` | Au cœur de l’Europe, le Grand-Duché de Luxembourg offre un environnement multilingue (français, allemand, anglais) pour les études supérieures et la recherche. | Im Herzen Europas bietet das Großherzogtum Luxemburg ein mehrsprachiges Umfeld (Französisch, Deutsch, Englisch) für Studium und Forschung. |
|  | `contenu.pays.luxembourg.pathways.studies` | Cursus bilingues ou trilingues à l’Université du Luxembourg, soumis aux conditions d’admission académiques et aux procédures d’autorisation de séjour étudiant. | Zwei- oder dreisprachige Studiengänge an der Universität Luxemburg, abhängig von den akademischen Zulassungsvoraussetzungen und den Verfahren für den Aufenthaltstitel als Studierende. |
|  | `contenu.pays.luxembourg.pathways.training` | Formations continues et stages académiques encadrés par les conventions universitaires. | Weiterbildungen und akademische Praktika im Rahmen von Hochschulvereinbarungen. |
| \* | `contenu.pays.luxembourg.pathways.work` | Autorisation de séjour pour travailleur salarié délivrée par la Direction de l’immigration avant l’entrée sur le territoire. | Aufenthaltsgenehmigung für Arbeitnehmerinnen und Arbeitnehmer, ausgestellt von der Direction de l’immigration (Einwanderungsbehörde) vor der Einreise. |
|  | `contenu.pays.luxembourg.steps[0]` | Identification du programme multilingue (français/allemand/anglais) | Den passenden mehrsprachigen Studiengang finden (Französisch/Deutsch/Englisch) |
|  | `contenu.pays.luxembourg.steps[1]` | Dépôt du dossier d’admission universitaire dans les délais officiels | Die Bewerbung um einen Studienplatz fristgerecht einreichen |
| \* | `contenu.pays.luxembourg.steps[2]` | Demande d’autorisation temporaire de séjour (ATS) auprès du ministère compétent | Die vorläufige Aufenthaltsgenehmigung (ATS) beim zuständigen Ministerium beantragen |
|  | `contenu.pays.luxembourg.steps[3]` | Démarches consulaires officielles et préparation à l’installation | Offizielle Formalitäten beim Konsulat und Vorbereitung auf das Ankommen |
|  | `contenu.pays.luxembourg.officialLinks[0].label` | Guichet.lu — Portail administratif du Grand-Duché de Luxembourg | Guichet.lu — Verwaltungsportal des Großherzogtums Luxemburg |
|  | `contenu.pays.luxembourg.officialLinks[1].label` | Université du Luxembourg | Universität Luxemburg |
|  | `contenu.pays.slovenie.towards` | vers la Slovénie | nach Slowenien |
|  | `contenu.pays.slovenie.inside` | en Slovénie | in Slowenien |
|  | `contenu.pays.slovenie.languages[0]` | Slovène | Slowenisch |
|  | `contenu.pays.slovenie.languages[1]` | Anglais (programmes internationaux) | Englisch (internationale Studiengänge) |
|  | `contenu.pays.slovenie.summary` | Pays d’Europe centrale membre de l’Union européenne, reconnu pour ses universités publiques (Ljubljana, Maribor, Primorska) et sa qualité de vie étudiante. | Ein mitteleuropäisches Land und Mitglied der Europäischen Union, bekannt für seine staatlichen Universitäten (Ljubljana, Maribor, Primorska) und die Lebensqualität für Studierende. |
|  | `contenu.pays.slovenie.pathways.studies` | Portail national eVŠ pour les candidatures aux universités slovènes en licence, master et doctorat. | Nationales Portal eVŠ für Bewerbungen an slowenischen Universitäten im Bachelor, Master und in der Promotion. |
|  | `contenu.pays.slovenie.pathways.training` | Échanges académiques, écoles d’été et stages techniques. | Akademischer Austausch, Sommerschulen und technische Praktika. |
| \* | `contenu.pays.slovenie.pathways.work` | Permis unique de séjour et de travail géré par les unités administratives slovènes. | Kombinierte Aufenthalts- und Arbeitserlaubnis, verwaltet von den slowenischen Verwaltungseinheiten. |
|  | `contenu.pays.slovenie.steps[0]` | Choix du programme via le portail académique national eVŠ | Studiengang über das nationale Hochschulportal eVŠ auswählen |
|  | `contenu.pays.slovenie.steps[1]` | Procédure de reconnaissance des diplômes antérieurs | Anerkennungsverfahren für bisherige Abschlüsse |
|  | `contenu.pays.slovenie.steps[2]` | Constitution du dossier de permis de séjour temporaire pour études | Unterlagen für die befristete Aufenthaltserlaubnis zu Studienzwecken zusammenstellen |
|  | `contenu.pays.slovenie.steps[3]` | Validation consulaire auprès de la représentation diplomatique compétente | Konsularische Bestätigung bei der zuständigen diplomatischen Vertretung |
|  | `contenu.pays.slovenie.officialLinks[0].label` | Study in Slovenia — Portail officiel | Study in Slovenia — Offizielles Portal |
|  | `contenu.pays.slovenie.officialLinks[1].label` | Portail gouvernemental gov.si (Immigration) | Regierungsportal gov.si (Einwanderung) |
|  | `contenu.pays.italie.towards` | vers l’Italie | nach Italien |
|  | `contenu.pays.italie.inside` | en Italie | in Italien |
|  | `contenu.pays.italie.languages[0]` | Italien | Italienisch |
|  | `contenu.pays.italie.languages[1]` | Anglais (cursus internationaux) | Englisch (internationale Studiengänge) |
|  | `contenu.pays.italie.summary` | Dotée d’une longue tradition universitaire et de programmes de bourses régionales (DSU), l’Italie accueille chaque année des étudiants internationaux. | Mit einer langen Hochschultradition und regionalen Stipendienprogrammen (DSU) empfängt Italien jedes Jahr internationale Studierende. |
| \* | `contenu.pays.italie.pathways.studies` | Pré-inscription obligatoire sur la plateforme officielle Universitaly, déclaration de valeur (Dichiarazione di Valore) ou attestation CIMEA. | Verpflichtende Vorregistrierung auf der offiziellen Plattform Universitaly, Wertigkeitserklärung (Dichiarazione di Valore) oder CIMEA-Bescheinigung. |
|  | `contenu.pays.italie.pathways.training` | Formations techniques supérieures (ITS) et écoles spécialisées. | Höhere technische Ausbildungen (ITS) und Fachschulen. |
| \* | `contenu.pays.italie.pathways.work` | Dispositifs réglementés par les décrets annuels de flux (Decreto Flussi). | Regelungen auf Grundlage der jährlichen Zuwanderungsdekrete (Decreto Flussi). |
|  | `contenu.pays.italie.steps[0]` | Préparation linguistique (italien ou anglais) et sélection de l’université | Sprachliche Vorbereitung (Italienisch oder Englisch) und Wahl der Universität |
|  | `contenu.pays.italie.steps[1]` | Pré-inscription sur le portail officiel Universitaly | Vorregistrierung auf dem offiziellen Portal Universitaly |
|  | `contenu.pays.italie.steps[2]` | Préparation des pièces justificatives académiques et financières | Akademische und finanzielle Nachweise vorbereiten |
|  | `contenu.pays.italie.steps[3]` | Dépôt de la demande de visa d’études auprès des services consulaires italiens | Den Antrag auf ein Studienvisum bei den italienischen Konsularbehörden einreichen |
|  | `contenu.pays.italie.officialLinks[0].label` | Universitaly — Portail officiel du Ministère italien | Universitaly — Offizielles Portal des italienischen Ministeriums |
|  | `contenu.pays.italie.officialLinks[1].label` | Visto per l’Italia — Ministère des Affaires Étrangères | Visto per l’Italia — Außenministerium |
|  | `contenu.pays.grece.towards` | vers la Grèce | nach Griechenland |
|  | `contenu.pays.grece.inside` | en Grèce | in Griechenland |
|  | `contenu.pays.grece.languages[0]` | Grec moderne | Neugriechisch |
|  | `contenu.pays.grece.languages[1]` | Anglais (programmes internationaux) | Englisch (internationale Studiengänge) |
|  | `contenu.pays.grece.summary` | Carrefour méditerranéen membre de l’UE, la Grèce développe des programmes universitaires anglophones et des filières en sciences, ingénierie et études maritimes. | Als Drehscheibe im Mittelmeerraum und EU-Mitglied baut Griechenland englischsprachige Studiengänge sowie Fachrichtungen in Naturwissenschaften, Ingenieurwesen und maritimen Studien aus. |
|  | `contenu.pays.grece.pathways.studies` | Cursus universitaires publics et programmes internationaux encadrés par Study in Greece. | Staatliche Studiengänge und internationale Programme, betreut von Study in Greece. |
|  | `contenu.pays.grece.pathways.training` | Formations professionnelles dans les secteurs du tourisme, du transport maritime et de l’énergie. | Berufsausbildungen in den Bereichen Tourismus, Seeverkehr und Energie. |
|  | `contenu.pays.grece.pathways.work` | Autorisations de séjour et de travail selon les accords et besoins sectoriels réglementaires. | Aufenthalts- und Arbeitserlaubnisse je nach den geltenden Abkommen und dem Bedarf der einzelnen Branchen. |
|  | `contenu.pays.grece.steps[0]` | Orientation académique et vérification des prérequis linguistiques | Studienorientierung und Prüfung der sprachlichen Voraussetzungen |
|  | `contenu.pays.grece.steps[1]` | Dossier d’admission auprès de l’établissement hellénique | Zulassungsantrag bei der griechischen Hochschule |
|  | `contenu.pays.grece.steps[2]` | Légalisation / apostille des documents académiques | Legalisation / Apostille der akademischen Dokumente |
|  | `contenu.pays.grece.steps[3]` | Procédure consulaire officielle auprès de l’Ambassade de Grèce compétente | Offizielles Konsularverfahren bei der zuständigen Griechischen Botschaft |
|  | `contenu.pays.grece.officialLinks[0].label` | Study in Greece — Portail officiel | Study in Greece — Offizielles Portal |
|  | `contenu.pays.grece.officialLinks[1].label` | Ministère grec de la Migration et de l’Asile | Griechisches Ministerium für Migration und Asyl |
|  | `contenu.pays.portugal.towards` | vers le Portugal | nach Portugal |
|  | `contenu.pays.portugal.inside` | au Portugal | in Portugal |
|  | `contenu.pays.portugal.languages[0]` | Portugais | Portugiesisch |
|  | `contenu.pays.portugal.languages[1]` | Anglais | Englisch |
|  | `contenu.pays.portugal.summary` | Le Portugal propose un réseau d’universités et d’instituts polytechniques reconnus en Europe, avec un accueil structuré pour les étudiants internationaux. | Portugal bietet ein Netz von Universitäten und Polytechnischen Instituten, die in Europa anerkannt sind, mit einer strukturierten Aufnahme internationaler Studierender. |
|  | `contenu.pays.portugal.pathways.studies` | Candidature sous le statut d’étudiant international (Estatuto do Estudante Internacional) dans les universités et instituts polytechniques. | Bewerbung mit dem Status als internationale Studierende (Estatuto do Estudante Internacional) an Universitäten und Polytechnischen Instituten. |
|  | `contenu.pays.portugal.pathways.training` | Cursos Técnicos Superiores Profissionais (CTeSP) axés sur la pratique. | Praxisorientierte Cursos Técnicos Superiores Profissionais (CTeSP). |
|  | `contenu.pays.portugal.pathways.work` | Visa de travail ou de recherche d’emploi encadré par l’AIMA et les services consulaires portugais. | Arbeitsvisum oder Visum zur Arbeitssuche, geregelt durch die AIMA und die portugiesischen Konsularbehörden. |
|  | `contenu.pays.portugal.steps[0]` | Apprentissage des bases du portugais ou certification d’anglais | Grundkenntnisse in Portugiesisch erwerben oder ein Englischzertifikat ablegen |
|  | `contenu.pays.portugal.steps[1]` | Candidature directe auprès de l’université ou de l’institut polytechnique | Direkte Bewerbung bei der Universität oder dem Polytechnischen Institut |
|  | `contenu.pays.portugal.steps[2]` | Obtention de la lettre d’acceptation officielle | Das offizielle Zulassungsschreiben erhalten |
|  | `contenu.pays.portugal.steps[3]` | Demande de visa national d’études (D4) via le portail officiel des visas portugais | Das nationale Studienvisum (D4) über das offizielle portugiesische Visaportal beantragen |
|  | `contenu.pays.portugal.officialLinks[0].label` | Study & Research in Portugal — Portail officiel | Study & Research in Portugal — Offizielles Portal |
|  | `contenu.pays.portugal.officialLinks[1].label` | Portail des Visas — Ministère des Affaires Étrangères du Portugal | Visaportal — Außenministerium Portugals |
|  | `contenu.pays.espagne.towards` | vers l’Espagne | nach Spanien |
|  | `contenu.pays.espagne.inside` | en Espagne | in Spanien |
|  | `contenu.pays.espagne.languages[0]` | Espagnol (Castillan) | Spanisch (Kastilisch) |
|  | `contenu.pays.espagne.languages[1]` | Anglais | Englisch |
|  | `contenu.pays.espagne.summary` | L’Espagne dispose d’un vaste réseau d’universités publiques et de centres de formation professionnelle supérieure (Formación Profesional de Grado Superior). | Spanien verfügt über ein großes Netz staatlicher Universitäten und Zentren für höhere Berufsausbildung (Formación Profesional de Grado Superior). |
| \* | `contenu.pays.espagne.pathways.studies` | Admission universitaire via l’homologation du diplôme ou l’accréditation UNEDasiss. | Zulassung zum Studium über die Anerkennung des Abschlusses (Homologación) oder die Akkreditierung durch UNEDasiss. |
|  | `contenu.pays.espagne.pathways.training` | Cycles de formation professionnelle supérieure (FP) très recherchés dans les secteurs techniques et sanitaires. | Höhere Berufsausbildungsgänge (FP), sehr gefragt in technischen Berufen und im Gesundheitswesen. |
|  | `contenu.pays.espagne.pathways.work` | Procédures d’autorisation initiale de résidence et de travail salarié. | Verfahren für eine erstmalige Aufenthalts- und Arbeitserlaubnis für Angestellte. |
| \* | `contenu.pays.espagne.steps[0]` | Démarche d’homologation ou d’accréditation académique (UNEDasiss) | Verfahren zur Anerkennung (Homologación) oder akademischen Akkreditierung (UNEDasiss) |
|  | `contenu.pays.espagne.steps[1]` | Pré-inscription auprès de la communauté autonome ou de l’université choisie | Vorregistrierung bei der Autonomen Gemeinschaft oder der gewählten Universität |
|  | `contenu.pays.espagne.steps[2]` | Constitution du dossier consulaire complet (assurance, ressources, hébergement) | Vollständige Unterlagen für das Konsulat zusammenstellen (Versicherung, finanzielle Mittel, Unterkunft) |
|  | `contenu.pays.espagne.steps[3]` | Dépôt auprès du Consulat d’Espagne compétent | Einreichung beim zuständigen Spanischen Konsulat |
|  | `contenu.pays.espagne.officialLinks[0].label` | SEPIE — étudier en Espagne (Ministère des Universités) | SEPIE — Studieren in Spanien (Ministerium für Universitäten) |
|  | `contenu.pays.espagne.officialLinks[1].label` | Portail de l’Immigration — Gouvernement d’Espagne | Einwanderungsportal — Regierung Spaniens |
|  | `contenu.pays.danemark.towards` | vers le Danemark | nach Dänemark |
|  | `contenu.pays.danemark.inside` | au Danemark | in Dänemark |
|  | `contenu.pays.danemark.languages[0]` | Danois | Dänisch |
|  | `contenu.pays.danemark.languages[1]` | Anglais (très répandu à l’université) | Englisch (an Universitäten sehr verbreitet) |
|  | `contenu.pays.danemark.summary` | Réputé pour sa pédagogie collaborative et ses cursus en ingénierie, énergies renouvelables et sciences de la vie enseignés en anglais. | Bekannt für seine kooperative Lehre und seine englischsprachigen Studiengänge in Ingenieurwesen, erneuerbaren Energien und Lebenswissenschaften. |
|  | `contenu.pays.danemark.pathways.studies` | Programmes de Bachelor et Master enseignés en anglais, coordonnés via le portail officiel Study in Denmark. | Englischsprachige Bachelor- und Masterstudiengänge, koordiniert über das offizielle Portal Study in Denmark. |
|  | `contenu.pays.danemark.pathways.training` | Stages académiques et programmes de recherche appliquée. | Akademische Praktika und Programme der angewandten Forschung. |
| \* | `contenu.pays.danemark.pathways.work` | Dispositifs encadrés par l’Agence danoise pour le recrutement international et l’intégration (SIRI). | Regelungen der Dänischen Agentur für internationale Rekrutierung und Integration (SIRI). |
|  | `contenu.pays.danemark.steps[0]` | Validation d’un niveau élevé d’anglais (IELTS / TOEFL) et des prérequis académiques | Nachweis sehr guter Englischkenntnisse (IELTS / TOEFL) und der akademischen Voraussetzungen |
|  | `contenu.pays.danemark.steps[1]` | Candidature via le portail national Optagelse.dk ou directement auprès de l’université | Bewerbung über das nationale Portal Optagelse.dk oder direkt bei der Universität |
|  | `contenu.pays.danemark.steps[2]` | Ouverture du dossier ST1 avec l’établissement d’accueil | Den Antrag ST1 gemeinsam mit der aufnehmenden Hochschule anlegen |
|  | `contenu.pays.danemark.steps[3]` | Demande de permis de séjour auprès de l’agence officielle SIRI (nyidanmark.dk) | Die Aufenthaltserlaubnis bei der offiziellen Behörde SIRI beantragen (nyidanmark.dk) |
|  | `contenu.pays.danemark.officialLinks[0].label` | Study in Denmark — Portail officiel du Ministère | Study in Denmark — Offizielles Portal des Ministeriums |
|  | `contenu.pays.danemark.officialLinks[1].label` | New to Denmark (nyidanmark.dk) — Portail officiel SIRI | New to Denmark (nyidanmark.dk) — Offizielles Portal von SIRI |
|  | `contenu.pays.pologne.towards` | vers la Pologne | nach Polen |
|  | `contenu.pays.pologne.inside` | en Pologne | in Polen |
|  | `contenu.pays.pologne.languages[0]` | Polonais | Polnisch |
|  | `contenu.pays.pologne.languages[1]` | Anglais (nombreux cursus internationaux) | Englisch (viele internationale Studiengänge) |
|  | `contenu.pays.pologne.summary` | Pôle académique et technologique majeur d’Europe centrale, la Pologne propose des cursus universitaires en anglais et en polonais dans les sciences, la médecine et l’informatique. | Als bedeutendes Wissenschafts- und Technologiezentrum Mitteleuropas bietet Polen Studiengänge auf Englisch und Polnisch in Naturwissenschaften, Medizin und Informatik. |
|  | `contenu.pays.pologne.pathways.studies` | Candidature aux universités publiques et écoles polytechniques, encadrée par l’agence nationale NAWA. | Bewerbung an staatlichen Universitäten und Technischen Hochschulen, begleitet von der nationalen Agentur NAWA. |
|  | `contenu.pays.pologne.pathways.training` | Années préparatoires linguistiques et écoles techniques. | Sprachliche Vorbereitungsjahre und technische Schulen. |
|  | `contenu.pays.pologne.pathways.work` | Autorisation de travail délivrée par la Voïvodie compétente avant la demande de visa national. | Arbeitserlaubnis, ausgestellt von der zuständigen Woiwodschaft vor dem Antrag auf ein nationales Visum. |
|  | `contenu.pays.pologne.steps[0]` | Sélection d’un établissement accrédité sur le portail gouvernemental Study in Poland | Eine akkreditierte Hochschule auf dem Regierungsportal Study in Poland auswählen |
|  | `contenu.pays.pologne.steps[1]` | Vérification et apostille/légalisation du diplôme de fin d’études secondaires ou supérieures | Prüfung und Apostille/Legalisation des Schul- oder Hochschulabschlusses |
|  | `contenu.pays.pologne.steps[2]` | Obtention de l’attestation officielle d’admission ministérielle | Die offizielle ministerielle Zulassungsbescheinigung erhalten |
|  | `contenu.pays.pologne.steps[3]` | Enregistrement consulaire via le système officiel e-Konsulat | Konsularische Registrierung über das offizielle System e-Konsulat |
|  | `contenu.pays.pologne.officialLinks[0].label` | Study in Poland — Agence Nationale NAWA | Study in Poland — Nationale Agentur NAWA |
| \* | `contenu.pays.pologne.officialLinks[1].label` | Office des Étrangers de Pologne (Urząd do Spraw Cudzoziemców) | Ausländeramt Polens (Urząd do Spraw Cudzoziemców) |
|  | `contenu.pays.albanie.towards` | vers l’Albanie | nach Albanien |
|  | `contenu.pays.albanie.inside` | en Albanie | in Albanien |
|  | `contenu.pays.albanie.euNote` | L’Albanie n’est pas membre de l’Union européenne (elle possède le statut de pays candidat). Elle ne fait pas non plus partie de l’espace Schengen. Les visas et titres de séjour albanais ne permettent pas de circuler ou de travailler dans l’Union européenne. | Albanien ist kein Mitglied der Europäischen Union (es hat den Status eines Beitrittskandidaten). Es gehört auch nicht zum Schengen-Raum. Albanische Visa und Aufenthaltstitel berechtigen nicht dazu, in der Europäischen Union zu reisen oder zu arbeiten. |
|  | `contenu.pays.albanie.languages[0]` | Albanais | Albanisch |
|  | `contenu.pays.albanie.languages[1]` | Anglais / Italien (dans certains cursus universitaires) | Englisch / Italienisch (in einigen Studiengängen) |
|  | `contenu.pays.albanie.summary` | Située dans les Balkans occidentaux, l’Albanie développe des filières universitaires accessibles et des programmes d’échanges régionaux, tout en relevant d’un cadre juridique national distinct de l’Union européenne. | Albanien liegt im Westbalkan und baut zugängliche Studiengänge und regionale Austauschprogramme aus; dabei gilt ein eigener nationaler Rechtsrahmen, getrennt von dem der Europäischen Union. |
|  | `contenu.pays.albanie.pathways.studies` | Inscriptions dans les universités publiques et privées accréditées à Tirana et dans les principales villes du pays. | Einschreibung an akkreditierten staatlichen und privaten Universitäten in Tirana und den größeren Städten des Landes. |
|  | `contenu.pays.albanie.pathways.training` | Formations professionnelles en développement territorial, tourisme et technologies. | Berufsausbildungen in Regionalentwicklung, Tourismus und Technologie. |
| \* | `contenu.pays.albanie.pathways.work` | Permis unique demandé en ligne via le portail gouvernemental e-Albania. | Kombinierte Erlaubnis, online über das Regierungsportal e-Albania beantragt. |
|  | `contenu.pays.albanie.steps[0]` | Prendre connaissance du statut non-membre de l’UE de l’Albanie | Sich bewusst machen, dass Albanien kein EU-Mitglied ist |
|  | `contenu.pays.albanie.steps[1]` | Obtenir une admission auprès d’un établissement accrédité par l’agence ASCAL | Eine Zulassung an einer von der Agentur ASCAL akkreditierten Hochschule erhalten |
|  | `contenu.pays.albanie.steps[2]` | Déposer la demande de visa de type D en ligne sur le portail officiel e-Visa de la République d’Albanie | Den Antrag auf ein Visum vom Typ D online über das offizielle e-Visa-Portal der Republik Albanien stellen |
|  | `contenu.pays.albanie.steps[3]` | Effectuer la demande de permis de séjour sur e-Albania après l’arrivée légale | Nach der legalen Einreise die Aufenthaltserlaubnis über e-Albania beantragen |
|  | `contenu.pays.albanie.officialLinks[0].label` | e-Visa Albania — Système officiel de visa en ligne | e-Visa Albania — Offizielles Online-Visasystem |
|  | `contenu.pays.albanie.officialLinks[1].label` | e-Albania — Portail officiel des services publics | e-Albania — Offizielles Portal für öffentliche Dienstleistungen |

## accueil

Fichier : `src/locales/accueil/de.json` (49 textes, dont 5 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Accueil — Autonomiser la jeunesse, transformer les communautés | Startseite — Junge Menschen stärken, Gemeinschaften verändern |
|  | `seo.description` | WAHHF Foundation accompagne les jeunes et les communautés vulnérables du Cameroun : éducation, santé, entrepreneuriat, environnement et mobilité vers l’Europe. | Die WAHHF Foundation begleitet junge Menschen und benachteiligte Gemeinschaften in Kamerun: Bildung, Gesundheit, Unternehmertum, Umwelt und Mobilität nach Europa. |
|  | `hero.titre[0]` | Autonomiser | &lt;accent>Junge Menschen&lt;/accent> |
|  | `hero.titre[1]` | &lt;accent>la jeunesse&lt;/accent>, | stärken, |
|  | `hero.titre[2]` | transformer les | Gemeinschaften |
|  | `hero.titre[3]` | communautés. | verändern. |
| \* | `hero.intro` | WAHHF Foundation accompagne les jeunes et les communautés vulnérables du Cameroun : éducation, santé, entrepreneuriat, environnement et mobilité vers l’Europe. | Die WAHHF Foundation begleitet junge Menschen und benachteiligte Gemeinschaften in Kamerun: Bildung, Gesundheit, Unternehmertum, Umwelt und Mobilität nach Europa. <br>_Note : « communautés vulnérables » rendu par « benachteiligte Gemeinschaften »_ |
|  | `hero.actions` | Découvrir nos actions | Unsere Arbeit entdecken |
|  | `hero.rejoindre` | Nous rejoindre | Mitmachen |
|  | `hero.equipe` | Une équipe entre le Cameroun et l’Allemagne | Ein Team zwischen Kamerun und Deutschland |
|  | `hero.equipeSuite` | au service de la jeunesse | im Dienst der Jugend |
| \* | `hero.pays` | pays d’Europe où nous orientons les jeunes | Länder Europas, für die wir jungen Menschen Orientierung geben <br>_Note : « pays d’Europe où nous orientons les jeunes » rendu par « Länder Europas, für die wir jungen Menschen Orientierung geben »_ |
|  | `hero.domaines` | domaines d’action | Arbeitsbereiche |
|  | `hero.evenement` | Prochain événement | Nächste Veranstaltung |
|  | `qsn.surtitre` | Qui sommes-nous | Über uns |
|  | `qsn.titre[0]` | Une fondation engagée | Eine Stiftung für |
|  | `qsn.titre[1]` | pour un avenir digne | eine Zukunft in Würde |
|  | `qsn.texte` | WAHHF Foundation est la branche sociale du groupe IROKO. Basée à Yaoundé et à Douala, avec une coordination en Allemagne, elle accompagne les jeunes vers l’autonomie : éducation, santé, entrepreneuriat, environnement, droits et inclusion, et mobilité vers l’Europe. | Die WAHHF Foundation ist der soziale Zweig der IROKO-Gruppe. Mit Sitz in Yaoundé und Douala und einer Koordination in Deutschland begleitet sie junge Menschen in die Selbstständigkeit: Bildung, Gesundheit, Unternehmertum, Umwelt, Rechte und Teilhabe sowie Mobilität nach Europa. |
| \* | `qsn.citation` | « Le changement doit venir de nous-⁠mêmes. » | „Der Wandel muss von uns selbst ausgehen.“ <br>_Note : « Le changement doit venir de nous-mêmes » rendu par « Der Wandel muss von uns selbst ausgehen » (devise à valider, question 190)_ |
|  | `qsn.points.dignite.titre` | Dignité et respect | Würde und Respekt |
|  | `qsn.points.dignite.texte` | Chaque jeune est acteur de son parcours. | Jeder junge Mensch gestaltet seinen Weg selbst. |
|  | `qsn.points.integrite.titre` | Intégrité et vérité | Integrität und Wahrheit |
|  | `qsn.points.integrite.texte` | Une information vérifiée, jamais de fausses promesses. | Geprüfte Informationen, niemals falsche Versprechen. |
|  | `qsn.points.gratuite.titre` | Gratuité | Kostenlos |
|  | `qsn.points.gratuite.texte` | L’académie d’allemand et d’anglais, de A1 à C1, sans frais. | Die Deutsch- und Englischakademie, von A1 bis C1, ohne Gebühren. |
|  | `qsn.lien` | Découvrir la fondation | Die Stiftung kennenlernen |
|  | `chiffres.surtitre` | La fondation en chiffres | Die Stiftung in Zahlen |
|  | `chiffres.titre[0]` | Ce qui est | Was bereits |
|  | `chiffres.titre[1]` | déjà en place | aufgebaut ist |
| \* | `chiffres.note` | Les chiffres d’impact (jeunes accompagnés, actions menées) seront publiés ici dès qu’ils seront datés et vérifiés. | Wirkungszahlen (begleitete junge Menschen, durchgeführte Aktionen) werden hier veröffentlicht, sobald sie datiert und geprüft sind. <br>_Note : « chiffres d’impact » rendu par « Wirkungszahlen », « actions menées » par « durchgeführte Aktionen »_ |
|  | `chiffres.source` | Au {{date}}. Source : {{source}} | Stand: {{date}}. Quelle: {{source}} |
|  | `domaines.surtitre` | Nos domaines d’action | Unsere Arbeitsbereiche |
|  | `domaines.titre` | Six domaines pour bâtir l’autonomie | Sechs Bereiche für mehr Selbstständigkeit |
|  | `domaines.compteur` | Domaine | Bereich |
|  | `domaines.rubrique` | Domaine {{n}} | Bereich {{n}} |
|  | `domaines.lien` | Découvrir le domaine | Bereich entdecken |
|  | `domaines.lienDe` | Découvrir le domaine : {{titre}} | Bereich entdecken: {{titre}} |
|  | `domaines.consigne` | Faites défiler pour parcourir les 6 domaines · WAHHF Foundation | Scrollen Sie durch die 6 Bereiche · WAHHF Foundation |
|  | `domaines.fin.rubrique` | Tous nos domaines | Alle unsere Bereiche |
| \* | `domaines.fin.titre` | Six domaines, un même cap | Sechs Bereiche, ein Kurs <br>_Note : « Six domaines, un même cap » rendu par « Sechs Bereiche, ein Kurs »_ |
|  | `domaines.fin.lien` | Voir toutes nos actions | Unsere gesamte Arbeit ansehen |
|  | `contenu.chiffres.pays.libelle` | Pays d’Europe | Länder Europas |
|  | `contenu.chiffres.pays.sousTexte` | Fiches d’orientation vérifiées | Geprüfte Länderseiten |
|  | `contenu.chiffres.domaines.libelle` | Domaines d’action | Arbeits­bereiche |
|  | `contenu.chiffres.domaines.sousTexte` | De l’éducation à la mobilité | Von der Bildung bis zur Mobilität |
|  | `contenu.chiffres.niveaux.libelle` | Niveaux d’allemand et d’anglais | Niveaus in Deutsch und Englisch |
|  | `contenu.chiffres.niveaux.sousTexte` | De A1 à C1, gratuits | Von A1 bis C1, kostenlos |
|  | `contenu.chiffres.villes.libelle` | Villes au Cameroun | Städte in Kamerun |
|  | `contenu.chiffres.villes.sousTexte` | Nos équipes à Yaoundé et Douala, coordination en Allemagne | Unsere Teams in Yaoundé und Douala, Koordination in Deutschland |

## actualites

Fichier : `src/locales/actualites/de.json` (39 textes, dont 11 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
| \* | `seo.title` | Actualités et actions de terrain | Aktuelles und Arbeit vor Ort |
|  | `seo.description` | Les actualités de WAHHF Foundation, et en images la première journée portes ouvertes et le Boot Camp de Yaoundé. | Aktuelles der WAHHF Foundation und in Bildern der erste Tag der offenen Tür und das Boot Camp in Yaoundé. |
| \* | `title` | Actualités et actions de terrain | Aktuelles und Arbeit vor Ort |
|  | `intro` | Les nouvelles de la fondation et de ses actions, au Cameroun et vers l’Europe. | Neuigkeiten der Stiftung und ihrer Arbeit, in Kamerun und auf dem Weg nach Europa. |
|  | `empty.title` | Aucun article publié pour le moment | Noch keine Beiträge veröffentlicht |
|  | `empty.text` | En attendant, retrouvez en photos et en vidéos la première journée portes ouvertes de la fondation et le Boot Camp de Yaoundé. | Bis dahin finden Sie den ersten Tag der offenen Tür der Stiftung und das Boot Camp in Yaoundé in Fotos und Videos. |
|  | `inPictures` | En images | In Bildern |
|  | `seeGallery` | Voir toute la galerie | Ganze Galerie ansehen |
| \* | `albums.inGallery` | , dans la galerie. |  in der Galerie. |
|  | `albums.seeAlbum` | Voir l’album | Album ansehen |
|  | `article.breadcrumb` | Actualités | Aktuelles |
|  | `article.published` | Publié le {{date}} | Veröffentlicht am {{date}} |
|  | `article.apply` | Candidater | Bewerben |
|  | `article.donate` | Faire un don | Spenden |
|  | `article.support` | Soutenir ce domaine | Diesen Bereich unterstützen |
|  | `article.all` | Toutes les actualités | Alle Neuigkeiten |
|  | `notFound.title` | Cet article est introuvable | Dieser Beitrag wurde nicht gefunden |
| \* | `notFound.message` | Il a peut-être été déplacé ou retiré, ou le lien a été mal copié. Voici les actualités publiées. | Vielleicht wurde er verschoben oder entfernt, oder der Link wurde falsch kopiert. Hier finden Sie die veröffentlichten Beiträge. |
|  | `notFound.newsPage` | Page Actualités | Seite Aktuelles |
|  | `notFound.gallery` | Galerie photo et vidéo | Foto- und Videogalerie |
| \* | `contenu.news.ouverture-inscriptions-academie-allemand-2026.title` | Ouverture des candidatures pour la nouvelle cohorte gratuite d’allemand /anglais (A1 à B2) | Bewerbungsstart für die neue kostenlose Kohorte Deutsch/Englisch (A1 bis B2) |
|  | `contenu.news.ouverture-inscriptions-academie-allemand-2026.category` | Mobilité & Langues | Mobilität & Sprachen |
|  | `contenu.news.ouverture-inscriptions-academie-allemand-2026.readTime` | 3 min de lecture | 3 Min. Lesezeit |
|  | `contenu.news.ouverture-inscriptions-academie-allemand-2026.excerpt` | Grâce au soutien du groupe IROKO et de nos donateurs, de nouvelles sessions gratuites d’accompagnement linguistique ouvrent en ligne et au Cameroun. | Dank der Unterstützung der IROKO-Gruppe und unserer Spenderinnen und Spender starten online und in Kamerun neue kostenlose Kurse zur Sprachbegleitung. |
| \* | `contenu.news.ouverture-inscriptions-academie-allemand-2026.content[0]` | WAHHF Foundation annonce l’ouverture des candidatures pour sa prochaine session d’accompagnement des cours de langue allemande /anglaise, accessible gratuitement du niveau A1 au niveau B2. | Die WAHHF Foundation gibt den Bewerbungsstart für ihre nächste Begleitung der Deutsch- und Englischkurse bekannt, kostenlos von Niveau A1 bis Niveau B2. |
| \* | `contenu.news.ouverture-inscriptions-academie-allemand-2026.content[1]` | Ce dispositif solidaire s’adresse à toute personne motivée souhaitant construire un projet d’études ou de formation professionnelle avec sérieux et méthode. | Dieses solidarische Angebot richtet sich an alle motivierten Menschen, die ernsthaft und methodisch ein Studium oder eine Berufsausbildung planen möchten. |
| \* | `contenu.news.ouverture-inscriptions-academie-allemand-2026.content[2]` | Pour rejoindre une cohorte, nous invitons les candidats à passer d’abord le test d’orientation gratuit en ligne puis à remplir le formulaire unique de candidature. | Um einer Kohorte beizutreten, machen Bewerberinnen und Bewerber zuerst den kostenlosen Online-Orientierungstest und füllen dann das einheitliche Bewerbungsformular aus. |
| \* | `contenu.news.campagne-sante-prevention-communautaire.title` | Journées de prévention sanitaire et d’écoute auprès des familles rurales | Tage der Gesundheitsvorsorge und des Zuhörens bei Familien auf dem Land |
|  | `contenu.news.campagne-sante-prevention-communautaire.category` | Santé | Gesundheit |
|  | `contenu.news.campagne-sante-prevention-communautaire.readTime` | 4 min de lecture | 4 Min. Lesezeit |
|  | `contenu.news.campagne-sante-prevention-communautaire.excerpt` | Retour sur notre déploiement mobile de sensibilisation sanitaire, de dépistage gratuit et d’accompagnement maternel. | Rückblick auf unseren mobilen Einsatz für Gesundheitsaufklärung, kostenlose Vorsorgeuntersuchungen und die Begleitung von Müttern. |
| \* | `contenu.news.campagne-sante-prevention-communautaire.content[0]` | En partenariat avec les professionnels de santé locaux, les bénévoles de WAHHF Foundation ont mené une campagne de prévention axée sur la santé maternelle et infantile. | Gemeinsam mit örtlichen Gesundheitsfachkräften haben die Ehrenamtlichen der WAHHF Foundation eine Präventionskampagne zur Gesundheit von Müttern und Kindern durchgeführt. |
| \* | `contenu.news.campagne-sante-prevention-communautaire.content[1]` | Au-delà des consultations d’orientation, ces rencontres permettent d’informer durablement les familles sur la prévention nutritionnelle et l’hygiène de l’eau. | Über die Beratungsgespräche hinaus informieren diese Begegnungen die Familien nachhaltig über Prävention durch Ernährung und über Wasserhygiene. |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.title` | Les jeunes volontaires s’engagent pour le reboisement et l’agroécologie | Junge Ehrenamtliche engagieren sich für Wiederaufforstung und Agrarökologie |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.category` | Environnement | Umwelt |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.readTime` | 3 min de lecture | 3 Min. Lesezeit |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.excerpt` | Mise en terre de jeunes plants d’essences locales et ateliers pratiques de préservation des sols avec les écoles partenaires. | Pflanzung junger Setzlinge heimischer Baumarten und praktische Workshops zum Bodenschutz mit Partnerschulen. |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.content[0]` | Parce que la protection de l’environnement est indissociable du bien-être des communautés, WAHHF associe les élèves et étudiants à la création de pépinières locales. | Weil Umweltschutz untrennbar mit dem Wohl der Gemeinschaften verbunden ist, bezieht WAHHF Schülerinnen, Schüler und Studierende in den Aufbau örtlicher Baumschulen ein. |
|  | `contenu.news.reboisement-jeunesse-engagement-ecologique.content[1]` | Chaque arbre planté fait l’objet d’un suivi par un groupe d’élèves, alliant responsabilité écologique et apprentissage agronomique. | Jeder gepflanzte Baum wird von einer Schülergruppe betreut. So verbinden sich ökologische Verantwortung und agronomisches Lernen. |

## agir

Fichier : `src/locales/agir/de.json` (79 textes, dont 6 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Agir avec WAHHF Foundation — Don, Bénévolat, Partenariat | Mitmachen bei der WAHHF Foundation — Spenden, Ehrenamt, Partnerschaft |
|  | `seo.description` | Rejoignez l'engagement de WAHHF Foundation : faire un don, devenir formateur ou bénévole, ou bâtir un partenariat institutionnel. | Engagieren Sie sich mit der WAHHF Foundation: spenden, als Lehrkraft oder ehrenamtlich mitarbeiten oder eine institutionelle Partnerschaft aufbauen. |
|  | `header.title` | Trois manières concrètes de soutenir la jeunesse | Drei konkrete Wege, junge Menschen zu unterstützen |
|  | `header.intro` | Donner, partager vos compétences ou engager votre structure&lt;nb> &lt;/nb>: voici comment agir avec WAHHF Foundation, au Cameroun comme en Europe. | Spenden, Ihr Wissen teilen oder Ihre Organisation einbringen: So werden Sie mit der WAHHF Foundation aktiv, in Kamerun wie in Europa. |
|  | `ways.donate.title` | Faire un don | Spenden |
|  | `ways.donate.text` | Financez les cours d’allemand /anglais gratuits et les actions sociales de terrain. | Finanzieren Sie die kostenlosen Deutsch- und Englischkurse und unsere soziale Arbeit vor Ort. |
|  | `ways.volunteer.title` | Devenir bénévole | Ehrenamtlich helfen |
| \* | `ways.volunteer.text` | Enseignants d’allemand /anglais, médecins, mentors ou coordinateurs locaux au Cameroun et en Europe. | Lehrkräfte für Deutsch und Englisch, Ärztinnen und Ärzte, Mentorinnen und Mentoren oder lokale Koordinatorinnen und Koordinatoren in Kamerun und in Europa. |
|  | `ways.volunteer.action` | Remplir le formulaire bénévole | Formular für Ehrenamtliche ausfüllen |
|  | `ways.partner.title` | Devenir partenaire | Partner werden |
|  | `ways.partner.text` | Écoles, universités, ONG et entreprises souhaitant co-financer ou appuyer un programme. | Schulen, Hochschulen, NGOs und Unternehmen, die ein Programm mitfinanzieren oder unterstützen möchten. |
|  | `ways.partner.action` | Proposer un partenariat | Partnerschaft vorschlagen |
|  | `status.ready` | Votre message est prêt : envoyez-le par WhatsApp ou par e-mail. | Ihre Nachricht ist bereit: Senden Sie sie per WhatsApp oder per E-Mail. |
|  | `status.form.benevole` | Formulaire : proposer votre aide comme bénévole. | Formular: ehrenamtliche Mitarbeit anbieten. |
|  | `status.form.partenaire` | Formulaire : proposer un partenariat. | Formular: eine Partnerschaft vorschlagen. |
|  | `handoff.title.benevole` | Dernière étape : envoyez votre proposition de bénévolat | Letzter Schritt: Senden Sie Ihr Angebot zur ehrenamtlichen Mitarbeit |
|  | `handoff.title.partenaire` | Dernière étape : envoyez votre proposition de partenariat | Letzter Schritt: Senden Sie Ihren Partnerschaftsvorschlag |
|  | `handoff.edit` | Modifier mes réponses | Meine Angaben ändern |
| \* | `form.title.benevole` | Proposer votre aide comme bénévole | Ehrenamtliche Mitarbeit anbieten |
|  | `form.title.partenaire` | Proposer un partenariat | Eine Partnerschaft vorschlagen |
|  | `form.role.legend` | Vous nous écrivez | Sie schreiben uns |
|  | `form.role.benevole` | Pour devenir bénévole | Um ehrenamtlich zu helfen |
|  | `form.role.partenaire` | Pour proposer un partenariat | Um eine Partnerschaft vorzuschlagen |
|  | `form.name.benevole` | Nom complet * | Vollständiger Name * |
|  | `form.name.partenaire` | Votre nom et votre fonction * | Ihr Name und Ihre Funktion * |
|  | `form.namePlaceholder.benevole` | Ex. Marie Nguenang | z. B. Marie Nguenang |
| \* | `form.namePlaceholder.partenaire` | Ex. Anna Weber, directrice | z. B. Anna Weber, Leiterin |
|  | `form.email` | Adresse e-mail * | E-Mail-Adresse * |
|  | `form.phone.benevole` | Téléphone / WhatsApp (facultatif) | Telefon / WhatsApp (optional) |
|  | `form.phone.partenaire` | Téléphone (facultatif) | Telefon (optional) |
|  | `form.phonePlaceholder.benevole` | Ex. +237 6... | z. B. +237 6... |
|  | `form.phonePlaceholder.partenaire` | Ex. +49 30... | z. B. +49 30... |
|  | `form.org` | Nom de votre structure * | Name Ihrer Organisation * |
|  | `form.orgType` | Type de structure * | Art der Organisation * |
|  | `form.orgTypeChoose` | Choisissez | Bitte wählen |
|  | `form.country` | Pays * | Land * |
|  | `form.countryPlaceholder` | Ex. Allemagne | z. B. Deutschland |
|  | `form.supportLegend` | Ce que vous envisagez (facultatif) | Was Sie sich vorstellen können (optional) |
|  | `form.details.benevole` | Vos compétences et vos disponibilités * | Ihre Fähigkeiten und Ihre Verfügbarkeit * |
|  | `form.details.partenaire` | Votre projet de partenariat * | Ihr Partnerschaftsprojekt * |
|  | `form.detailsPlaceholder.benevole` | Ex. enseignante d’allemand /anglais, disponible le samedi, en ligne ou à Douala. | z. B. Lehrerin für Deutsch/Englisch, samstags verfügbar, online oder in Douala. |
|  | `form.detailsPlaceholder.partenaire` | Quel programme souhaitez-vous soutenir, et comment ? | Welches Programm möchten Sie unterstützen, und wie? |
| \* | `form.consent` | J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement, conformément à la &lt;lien>politique de confidentialité&lt;sr> (nouvel onglet)&lt;/sr>&lt;/lien>. * | Ich bin damit einverstanden, dass die WAHHF Foundation meine Daten gemäß der &lt;lien>Datenschutzerklärung&lt;sr> (neuer Tab)&lt;/sr>&lt;/lien> verarbeitet, um meinen Vorschlag für ein Engagement zu prüfen. * |
|  | `form.submit` | Préparer l’envoi de ma proposition | Meinen Vorschlag zum Senden vorbereiten |
|  | `orgTypes.ecole` | École, université ou centre de formation | Schule, Hochschule oder Bildungseinrichtung |
|  | `orgTypes.ong` | ONG ou association | NGO oder Verein |
|  | `orgTypes.entreprise` | Entreprise | Unternehmen |
|  | `orgTypes.sante` | Établissement de santé | Gesundheitseinrichtung |
|  | `orgTypes.public` | Institution publique | Öffentliche Einrichtung |
|  | `orgTypes.autre` | Autre | Sonstige |
|  | `support.financement` | Financement d’un programme | Finanzierung eines Programms |
| \* | `support.stagiaires` | Accueil de stagiaires ou d’étudiants | Praktikumsplätze oder Aufnahme von Studierenden |
|  | `support.expertise` | Expertise ou enseignement | Fachwissen oder Unterricht |
|  | `support.materiel` | Matériel ou équipement | Material oder Ausstattung |
|  | `errors.name.benevole` | Saisissez votre prénom et votre nom. | Geben Sie Ihren Vor- und Nachnamen ein. |
|  | `errors.name.partenaire` | Saisissez le nom et la fonction de la personne à contacter. | Geben Sie Name und Funktion der Ansprechperson ein. |
|  | `errors.org` | Saisissez le nom de votre structure. | Geben Sie den Namen Ihrer Organisation ein. |
|  | `errors.orgType` | Choisissez le type de votre structure. | Wählen Sie die Art Ihrer Organisation. |
|  | `errors.country` | Indiquez le pays de votre structure, par exemple Allemagne ou Cameroun. | Geben Sie das Land Ihrer Organisation an, zum Beispiel Deutschland oder Kamerun. |
|  | `errors.details.benevole` | Décrivez en quelques lignes vos compétences et vos disponibilités. | Beschreiben Sie in wenigen Zeilen Ihre Fähigkeiten und Ihre Verfügbarkeit. |
|  | `errors.details.partenaire` | Décrivez en quelques lignes votre projet de partenariat. | Beschreiben Sie Ihr Partnerschaftsprojekt in wenigen Zeilen. |
|  | `errors.consent` | Cochez cette case pour que nous puissions étudier votre proposition et vous répondre. | Kreuzen Sie dieses Feld an, damit wir Ihren Vorschlag prüfen und Ihnen antworten können. |
|  | `draft.benevole.subject` | Proposition de bénévolat — {{name}} | Angebot zur ehrenamtlichen Mitarbeit — {{name}} |
|  | `draft.benevole.intro` | Je souhaite devenir bénévole pour WAHHF Foundation. Voici ma proposition, saisie sur le site : | Ich möchte mich ehrenamtlich für die WAHHF Foundation engagieren. Hier ist mein Angebot, eingegeben auf der Website: |
|  | `draft.benevole.name` | Nom complet | Vollständiger Name |
|  | `draft.benevole.email` | E-mail | E-Mail |
|  | `draft.benevole.phone` | Téléphone / WhatsApp | Telefon / WhatsApp |
|  | `draft.benevole.details` | Compétences et disponibilités | Fähigkeiten und Verfügbarkeit |
|  | `draft.partenaire.subject` | Proposition de partenariat — {{org}} | Partnerschaftsvorschlag — {{org}} |
|  | `draft.partenaire.intro` | Je souhaite proposer un partenariat à WAHHF Foundation. Voici notre proposition, saisie sur le site : | Ich möchte der WAHHF Foundation eine Partnerschaft vorschlagen. Hier ist unser Vorschlag, eingegeben auf der Website: |
|  | `draft.partenaire.org` | Structure | Organisation |
|  | `draft.partenaire.orgType` | Type de structure | Art der Organisation |
|  | `draft.partenaire.country` | Pays | Land |
|  | `draft.partenaire.name` | Contact (nom et fonction) | Ansprechperson (Name und Funktion) |
|  | `draft.partenaire.email` | E-mail | E-Mail |
|  | `draft.partenaire.phone` | Téléphone | Telefon |
|  | `draft.partenaire.support` | Soutien envisagé | Mögliche Unterstützung |
|  | `draft.partenaire.details` | Projet de partenariat | Partnerschaftsprojekt |
| \* | `draft.consent` | J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement. | Ich bin damit einverstanden, dass die WAHHF Foundation meine Daten verarbeitet, um meinen Vorschlag für ein Engagement zu prüfen. |

## contact-page

Fichier : `src/locales/contact-page/de.json` (40 textes, dont 4 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Contact — Écrire à WAHHF Foundation | Kontakt — Schreiben Sie der WAHHF Foundation |
|  | `seo.description` | Contacter WAHHF Foundation par WhatsApp ou par e-mail : candidature, bénévolat, partenariat, presse ou toute autre demande. | Kontaktieren Sie die WAHHF Foundation per WhatsApp oder per E-Mail: Bewerbung, Ehrenamt, Partnerschaft, Presse oder jedes andere Anliegen. |
| \* | `vigilance.title` | Vigilance | Vorsicht |
| \* | `vigilance.text` | Aucun collaborateur de WAHHF ne vous demandera d’argent par téléphone, e-mail ou WhatsApp pour traiter votre dossier. | Niemand von WAHHF wird Sie per Telefon, E-Mail oder WhatsApp um Geld bitten, um Ihre Bewerbungsunterlagen zu bearbeiten. |
|  | `vigilance.link` | Reconnaître une fausse offre | Falsche Angebote erkennen |
|  | `header.title` | Écrire à WAHHF Foundation | Schreiben Sie der WAHHF Foundation |
|  | `header.intro` | Joignez-nous directement par WhatsApp ou par e-mail, ou utilisez le formulaire&lt;nb> &lt;/nb>: il prépare votre message selon son motif. | Erreichen Sie uns direkt per WhatsApp oder per E-Mail, oder nutzen Sie das Formular: Es bereitet Ihre Nachricht passend zu Ihrem Anliegen vor. |
|  | `direct.title` | Nous joindre directement | Direkter Kontakt |
|  | `direct.whatsapp` | Écrire sur WhatsApp | Auf WhatsApp schreiben |
|  | `direct.greeting` | Bonjour WAHHF Foundation,  | Guten Tag, liebes Team der WAHHF Foundation,  |
|  | `status.ready` | Votre message est prêt : envoyez-le par WhatsApp ou par e-mail. | Ihre Nachricht ist bereit: Senden Sie sie per WhatsApp oder per E-Mail. |
|  | `handoff.title` | Dernière étape : envoyez votre message | Letzter Schritt: Senden Sie Ihre Nachricht |
|  | `handoff.edit` | Modifier mes réponses | Meine Angaben ändern |
|  | `form.title` | Votre message | Ihre Nachricht |
|  | `form.motifLegend` | Motif de votre message * | Ihr Anliegen * |
|  | `form.name` | Nom complet ou structure * | Vollständiger Name oder Organisation * |
|  | `form.email` | Adresse e-mail * | E-Mail-Adresse * |
|  | `form.whatsapp` | Numéro WhatsApp (facultatif) | WhatsApp-Nummer (optional) |
|  | `form.whatsappPlaceholder` | Ex. +237 6... | z. B. +237 6... |
|  | `form.message` | Votre message * | Ihre Nachricht * |
| \* | `form.consent` | J’accepte que mes coordonnées soient traitées par WAHHF Foundation pour répondre à mon message, conformément à la &lt;lien>politique de confidentialité&lt;sr> (nouvel onglet)&lt;/sr>&lt;/lien>. * | Ich bin damit einverstanden, dass die WAHHF Foundation meine Kontaktdaten gemäß der &lt;lien>Datenschutzerklärung&lt;sr> (neuer Tab)&lt;/sr>&lt;/lien> verarbeitet, um auf meine Nachricht zu antworten. * |
|  | `form.submit` | Préparer l’envoi de mon message | Meine Nachricht zum Senden vorbereiten |
|  | `motifs.candidat` | Je suis candidat (cours d’allemand /anglais, accompagnement) | Ich bewerbe mich (Deutsch- und Englischkurse, Begleitung) |
|  | `motifs.benevole` | Je souhaite devenir bénévole | Ich möchte mich ehrenamtlich engagieren |
|  | `motifs.partenaire` | Partenaire ou institution | Partner oder Institution |
|  | `motifs.presse` | Presse et médias | Presse und Medien |
|  | `motifs.autre` | Autre demande | Anderes Anliegen |
|  | `errors.motif` | Choisissez le motif de votre message. | Wählen Sie das Anliegen Ihrer Nachricht. |
|  | `errors.name` | Saisissez votre nom complet ou celui de votre structure. | Geben Sie Ihren vollständigen Namen oder den Namen Ihrer Organisation ein. |
|  | `errors.message` | Écrivez votre message en quelques lignes. | Schreiben Sie Ihre Nachricht in wenigen Zeilen. |
|  | `errors.consent` | Cochez cette case pour que nous puissions lire votre message et vous répondre. | Kreuzen Sie dieses Feld an, damit wir Ihre Nachricht lesen und Ihnen antworten können. |
|  | `draft.subject` | Contact WAHHF — {{motif}} — {{name}} | Kontakt WAHHF — {{motif}} — {{name}} |
|  | `draft.noMotif` | Message | Nachricht |
|  | `draft.intro` | Je vous écris depuis le formulaire de contact du site : | Ich schreibe Ihnen über das Kontaktformular der Website: |
|  | `draft.motif` | Motif | Anliegen |
|  | `draft.name` | Nom | Name |
|  | `draft.email` | E-mail | E-Mail |
|  | `draft.whatsapp` | WhatsApp | WhatsApp |
|  | `draft.message` | Message | Nachricht |
| \* | `draft.consent` | J’accepte que mes coordonnées soient traitées par WAHHF Foundation pour répondre à mon message (RGPD). | Ich bin damit einverstanden, dass die WAHHF Foundation meine Kontaktdaten verarbeitet, um auf meine Nachricht zu antworten (DSGVO). |

## don

Fichier : `src/locales/don/de.json` (58 textes, dont 8 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Faire un don — Soutenir les cours d’allemand /anglais et nos actions au Cameroun | Spenden — Deutsch- und Englischkurse und unsere Arbeit in Kamerun unterstützen |
|  | `seo.description` | Soutenez WAHHF Foundation : vos dons financent les cours d'allemand /anglais (A1 à C1), l'accompagnement des jeunes vers l'Europe et nos actions d'éducation, de santé et d'environnement au Cameroun. | Unterstützen Sie die WAHHF Foundation: Ihre Spenden finanzieren Deutsch- und Englischkurse (A1 bis C1), die Begleitung junger Menschen nach Europa und unsere Arbeit in Bildung, Gesundheit und Umwelt in Kamerun. |
|  | `header.title` | Votre don finance des cours d’allemand /anglais et nos actions au Cameroun | Ihre Spende finanziert Deutsch- und Englischkurse und unsere Arbeit in Kamerun |
|  | `header.intro` | Les cours d’allemand /anglais (A1 à C1) et l’accompagnement vers l’Europe sont gratuits pour les jeunes&lt;nb> &lt;/nb>: ils sont financés par nos partenaires et nos donateurs. Vos dons soutiennent aussi nos actions d’éducation, de santé et d’environnement. | Die Deutsch- und Englischkurse (A1 bis C1) und die Begleitung nach Europa sind für junge Menschen kostenlos: Unsere Partner sowie unsere Spenderinnen und Spender finanzieren sie. Ihre Spenden unterstützen auch unsere Arbeit in Bildung, Gesundheit und Umwelt. |
|  | `status.ready` | Votre message est prêt : envoyez-le par WhatsApp ou par e-mail. | Ihre Nachricht ist bereit: Senden Sie sie per WhatsApp oder per E-Mail. |
|  | `handoff.title` | Dernière étape : envoyez votre message de don | Letzter Schritt: Senden Sie Ihre Spendennachricht |
|  | `handoff.edit` | Modifier mon don | Meine Spende ändern |
|  | `handoff.text` | Votre message demande à la fondation comment régler votre don de &lt;v>{{amount}}&lt;/v>. Aucun paiement n’est demandé sur ce site. | In Ihrer Nachricht fragen Sie die Stiftung, wie Sie Ihre Spende von &lt;v>{{amount}}&lt;/v> bezahlen können. Auf dieser Website wird keine Zahlung verlangt. |
| \* | `officialChannels` | Pour votre sécurité, la fondation vous répond seulement par WhatsApp au &lt;tel>{{phone}}&lt;/tel> ou par e-mail depuis &lt;mail>{{email}}&lt;/mail>. Si quelqu’un vous écrit d’un autre numéro ou d’une autre adresse au sujet de votre don, ne payez rien et prévenez-nous. | Zu Ihrer Sicherheit antwortet Ihnen die Stiftung nur per WhatsApp unter &lt;tel>{{phone}}&lt;/tel> oder per E-Mail von &lt;mail>{{email}}&lt;/mail>. Wenn Ihnen jemand von einer anderen Nummer oder Adresse wegen Ihrer Spende schreibt, zahlen Sie nichts und informieren Sie uns. |
|  | `section.title` | Comment donner aujourd’hui | So spenden Sie heute |
|  | `section.subtitle` | Le paiement en ligne n’est pas encore ouvert sur ce site. Choisissez un montant : un message est préparé, vous l’envoyez par WhatsApp ou par e-mail, et la fondation vous indique comment régler votre don. | Online-Zahlungen sind auf dieser Website noch nicht möglich. Wählen Sie einen Betrag: Eine Nachricht wird vorbereitet, Sie senden sie per WhatsApp oder per E-Mail, und die Stiftung teilt Ihnen mit, wie Sie Ihre Spende bezahlen können. |
|  | `allocation.label` | Votre don soutient | Ihre Spende unterstützt |
| \* | `allocation.general` | Là où le besoin est le plus urgent | Dort, wo der Bedarf am dringendsten ist |
|  | `currency.legend` | Devise | Währung |
|  | `currency.tile.EUR` | Euros (€) | Euro (€) |
|  | `currency.tile.XAF` | Francs CFA | CFA-Franc |
|  | `currency.word.EUR` | euros | Euro |
|  | `currency.word.XAF` | francs CFA | CFA-Franc |
|  | `currency.example.EUR` | 75 | 75 |
|  | `currency.example.XAF` | 15 000 | 15.000 |
|  | `amount.legend` | Montant | Betrag |
|  | `amount.other` | Autre montant, en &lt;v>{{devise}}&lt;/v> | Anderer Betrag in &lt;v>{{devise}}&lt;/v> |
|  | `amount.placeholder` | Ex. {{example}} | z. B. {{example}} |
|  | `amount.range` | Entre &lt;v>{{min}}&lt;/v> et &lt;v>{{max}}&lt;/v>. | Zwischen &lt;v>{{min}}&lt;/v> und &lt;v>{{max}}&lt;/v>. |
|  | `impact.title` | À quoi servira votre don | Wofür Ihre Spende eingesetzt wird |
|  | `impact.noAmount` | Choisissez un montant, ou saisissez un montant entre {{min}} et {{max}}. | Wählen Sie einen Betrag oder geben Sie einen Betrag zwischen {{min}} und {{max}} ein. |
|  | `impact.approx` | {{amount}} (environ {{converted}}) | {{amount}} (etwa {{converted}}) |
|  | `impact.domain` | {{money}} pour {{for}} : {{what}}. | {{money}} für {{for}}: {{what}}. |
|  | `impact.domainTitle` | {{money}} pour le domaine « {{title}} ». | {{money}} für den Bereich „{{title}}“. |
| \* | `impact.general` | {{money}}, là où le besoin est le plus urgent. | {{money}} dort, wo der Bedarf am dringendsten ist. |
|  | `impact.example` | Par exemple : {{text}} | Zum Beispiel: {{text}} |
|  | `donor.label` | Votre nom, ou celui de votre organisation (facultatif) | Ihr Name oder der Name Ihrer Organisation (optional) |
| \* | `privacy` | Ce site n’enregistre rien&lt;nb> &lt;/nb>: le message part de votre propre messagerie. Voir notre &lt;lien>politique de confidentialité&lt;sr> (nouvel onglet)&lt;/sr>&lt;/lien>. | Diese Website speichert nichts: Die Nachricht wird aus Ihrem eigenen Messenger oder E-Mail-Programm gesendet. Mehr dazu in unserer &lt;lien>Datenschutzerklärung&lt;sr> (neuer Tab)&lt;/sr>&lt;/lien>. |
|  | `submit` | Préparer mon message | Meine Nachricht vorbereiten |
|  | `errors.digits` | Saisissez le montant en chiffres, par exemple {{example}}. | Geben Sie den Betrag in Ziffern ein, zum Beispiel {{example}}. |
|  | `errors.min` | Le montant minimum est de {{min}}. | Der Mindestbetrag beträgt {{min}}. |
|  | `errors.max` | Pour un don de plus de {{max}}, écrivez-nous directement par WhatsApp ou par e-mail (coordonnées en bas de page). | Für eine Spende über {{max}} schreiben Sie uns bitte direkt per WhatsApp oder per E-Mail (Kontaktdaten unten auf der Seite). |
|  | `draft.subject` | Don à WAHHF Foundation — {{amount}} | Spende an die WAHHF Foundation — {{amount}} |
|  | `draft.intro` | Je souhaite faire un don à WAHHF Foundation. Pouvez-vous m’indiquer comment le régler ? | Ich möchte der WAHHF Foundation spenden. Können Sie mir sagen, wie ich die Spende bezahlen kann? |
|  | `draft.amount` | Montant | Betrag |
| \* | `draft.allocation` | Affectation souhaitée | Gewünschter Verwendungszweck |
|  | `draft.name` | Nom ou organisation | Name oder Organisation |
|  | `contenu.impactDomaines.mobilite-langues.for` | _(français dans le fichier de données)_ | Mobilität und Sprachen |
| \* | `contenu.impactDomaines.mobilite-langues.what` | _(français dans le fichier de données)_ | Deutsch- und Englischkurse von Niveau A1 bis C1 und Orientierung für 10 europäische Zielländer |
|  | `contenu.impactDomaines.education.for` | _(français dans le fichier de données)_ | Bildung |
|  | `contenu.impactDomaines.education.what` | _(français dans le fichier de données)_ | Schulsets und Lehrbücher, Gemeinschaftsbibliotheken, Mentoring und Orientierung für Schülerinnen und Schüler |
|  | `contenu.impactDomaines.sante.for` | _(français dans le fichier de données)_ | Gesundheit |
|  | `contenu.impactDomaines.sante.what` | _(français dans le fichier de données)_ | Vorsorgeuntersuchungen, Gesundheit von Müttern und Kindern, Trinkwasser und Hygiene in der Schule |
|  | `contenu.impactDomaines.entrepreneuriat.for` | _(français dans le fichier de données)_ | Unternehmertum junger Menschen |
|  | `contenu.impactDomaines.entrepreneuriat.what` | _(français dans le fichier de données)_ | Workshops zu Betriebsführung und Buchhaltung, Einführung in digitale Werkzeuge, Mentoring für Gründerinnen und Gründer |
|  | `contenu.impactDomaines.environnement.for` | _(français dans le fichier de données)_ | die Umwelt |
|  | `contenu.impactDomaines.environnement.what` | _(français dans le fichier de données)_ | Baumschulen und Aufforstung, Sensibilisierung für Mülltrennung, Schulungen in Agrarökologie |
|  | `contenu.impactDomaines.droits-inclusion.for` | _(français dans le fichier de données)_ | Rechte und Teilhabe |
| \* | `contenu.impactDomaines.droits-inclusion.what` | _(français dans le fichier de données)_ | Selbstständigkeit junger Frauen, Schulbildung junger Menschen mit Behinderung, Zuhören und soziale Beratung |
|  | `contenu.exemplesImpact.EUR-25.text` | _(français dans le fichier de données)_ | Finanziert Lehrbücher und Übungsmaterial für Deutsch/Englisch A1 für eine junge lernende Person (Beispiel — TODO) |
|  | `contenu.exemplesImpact.EUR-50.text` | _(français dans le fichier de données)_ | Unterstützt einen Monat Sprachbegleitung und digitalen Zugang für eine Studentin oder einen Studenten (Beispiel — TODO) |
|  | `contenu.exemplesImpact.EUR-100.text` | _(français dans le fichier de données)_ | Trägt zu einem Präventionstag für die Gesundheit von Müttern und Kindern in einer ländlichen Region bei (Beispiel — TODO) |
| \* | `contenu.exemplesImpact.EUR-250.text` | _(français dans le fichier de données)_ | Finanziert eine vollständige sprachliche Begleitung und Unterstützung bei den Unterlagen für eine Gruppe (Beispiel — TODO) |

## equipe

Fichier : `src/locales/equipe/de.json` (21 textes, dont 6 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `nameTbc` | Nom à confirmer | Name noch zu bestätigen |
|  | `portraitAlt` | Portrait de {{name}} | Porträt von {{name}} |
|  | `hero.title` | Ceux qui portent la fondation. | Wer die Stiftung trägt. |
|  | `hero.intro` | Une équipe entre le Cameroun et l’Allemagne, au service de la jeunesse. | Ein Team zwischen Kamerun und Deutschland, im Dienst der Jugend. |
| \* | `hero.join` | Rejoindre la fondation | Bei der Stiftung mitmachen |
|  | `hero.orgChart` | Voir l’organigramme | Zum Organigramm |
|  | `carousel.roleDescription` | carrousel | Karussell |
|  | `carousel.label` | Portraits des dirigeants | Porträts der Leitung |
|  | `carousel.previous` | Portrait précédent | Vorheriges Porträt |
|  | `carousel.next` | Portrait suivant | Nächstes Porträt |
|  | `carousel.pause` | Mettre en pause | Anhalten |
|  | `carousel.resume` | Reprendre | Fortsetzen |
|  | `orgChart.title` | Notre organisation | Unsere Organisation |
| \* | `contenu.niveaux.1` | Poland | Präsidentschaft |
| \* | `contenu.niveaux.2` | Denmark | Vizepräsidentschaft |
|  | `contenu.niveaux.4` |  Pour réserver votre place,  | Generalsekretariat |
| \* | `contenu.niveaux.5` | Bureau | Vorstand |
|  | `contenu.niveaux.6` |  à ce numéro.  | Koordination |
| \* | `contenu.membres.marrion-watio-notesse.role` | Président | Präsident |
|  | `contenu.membres.christian-wilberg.role` | Vice-président | Vizepräsident |
| \* | `contenu.membres.wilfried.role` | Secrétaire général | Generalsekretär |

## events

Fichier : `src/locales/events/de.json` (278 textes, dont 19 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
| \* | `seo.listTitle` | Événements — Les journées de la fondation | Veranstaltungen — Die Aktionstage der Stiftung <br>_Note : « journée » rendu par « Aktionstag » (pas de mot allemand court pour « journée de la fondation »)_ |
|  | `seo.listDescription` | Les journées et rencontres de WAHHF Foundation : prochains rendez-vous, programme et éditions passées en images. | Die Aktionstage und Begegnungen der WAHHF Foundation: kommende Termine, Programm und vergangene Ausgaben in Bildern. |
|  | `seo.eventDescription` | {{title}} : programme, lieu et informations pratiques de cette journée de WAHHF Foundation. | {{title}}: Programm, Ort und praktische Informationen zu diesem Aktionstag der WAHHF Foundation. |
|  | `list.badge` | Les rendez-vous de la fondation | Die Termine der Stiftung |
| \* | `list.title` | Nos événements | Unsere Veranstaltungen <br>_Note : « journée » rendu par « Aktionstag » (pas de mot allemand court pour « journée de la fondation »)_ |
|  | `list.accent` | événements | Veranstaltungen |
|  | `list.intro` | Des journées pour rencontrer la fondation, ses équipes et ses partenaires, et poser toutes vos questions. | Tage, an denen Sie die Stiftung, ihre Teams und ihre Partner kennenlernen und all Ihre Fragen stellen können. |
|  | `list.upcoming` | À venir | Demnächst |
|  | `list.past` | Éditions passées | Vergangene Ausgaben |
|  | `list.none` | Aucun événement n’est annoncé pour le moment. | Derzeit ist keine Veranstaltung angekündigt. |
|  | `list.noneAction` | Écrivez-nous pour être prévenu du prochain | Schreiben Sie uns, um von der nächsten zu erfahren |
|  | `list.seeEvent` | Voir l’événement | Zur Veranstaltung |
|  | `list.startsIn` | Commence dans | Beginnt in |
|  | `hero.badgeUpcoming` | Prochain rendez-vous de la fondation | Der nächste Termin der Stiftung |
|  | `hero.badgePast` | Retour sur une journée de la fondation | Rückblick auf einen Aktionstag der Stiftung |
|  | `hero.register` | S’inscrire | Anmelden |
|  | `hero.program` | Voir le programme | Zum Programm |
|  | `hero.photos` | Voir les photos | Zu den Fotos |
|  | `hero.placesLeft_one` | Il reste {{count}} place | Noch {{count}} Platz frei |
|  | `hero.placesLeft_other` | Il reste {{count}} places | Noch {{count}} Plätze frei |
| \* | `hero.venueUpcoming` | L’événement a lieu à | Hier findet die Veranstaltung statt <br>_Note : « L'événement a lieu à » rendu par « Hier findet … statt » (au-dessus du nom du lieu)_ |
| \* | `hero.venuePast` | L’événement a eu lieu à | Hier fand die Veranstaltung statt <br>_Note : « L'événement a lieu à » rendu par « Hier findet … statt » (au-dessus du nom du lieu)_ |
|  | `hero.flag` | Drapeau du Cameroun | Flagge Kameruns |
|  | `hero.pause` | Mettre les animations en pause | Animationen pausieren |
|  | `hero.play` | Relancer les animations | Animationen fortsetzen |
|  | `hero.breadcrumb` | Événements | Veranstaltungen |
|  | `countdown.label` | Rendez-vous dans | Wir sehen uns in |
|  | `countdown.days` | Jours | Tage |
|  | `countdown.hours` | Heures | Stunden |
|  | `countdown.minutes` | Minutes | Minuten |
|  | `countdown.seconds` | Secondes | Sekunden |
|  | `countdown.when` | L’événement commence le {{date}} à {{time}}, heure de Douala. | Die Veranstaltung beginnt am {{date}} um {{time}} Ortszeit Douala. |
|  | `countdown.past` | C’était le {{date}} | Das war am {{date}} |
|  | `countdown.pastText` | Merci à toutes celles et tous ceux qui étaient là. | Danke an alle, die dabei waren. |
|  | `countdown.photos` | Voir les photos | Zu den Fotos |
|  | `organizers.label` | Organisé par | Veranstaltet von |
|  | `ticker.label` | Les six domaines de la fondation, en allemand | Die sechs Bereiche der Stiftung, auf Deutsch |
|  | `ticker.pause` | Mettre le bandeau en pause | Laufband pausieren |
|  | `ticker.play` | Relancer le bandeau | Laufband fortsetzen |
|  | `why.eyebrow` | Pourquoi venir | Warum Sie kommen sollten |
|  | `why.title` | Quatre raisons d’être là. | Vier Gründe, dabei zu sein. |
|  | `schedule.eyebrow` | Le déroulé | Der Ablauf |
|  | `schedule.title` | Le fil de la journée, heure par heure. | Der Tagesablauf, Stunde für Stunde. |
|  | `activities.eyebrow` | Les activités | Die Aktivitäten |
|  | `activities.title` | Ce qui se passe pendant la journée. | Was im Laufe des Tages passiert. |
|  | `activities.more` | En savoir plus : {{title}} | Mehr erfahren: {{title}} |
|  | `activities.domainLink` | {{title}}, domaine {{domain}} | {{title}}, Bereich {{domain}} |
|  | `program.eyebrow` | Le programme en un coup d’œil | Das Programm auf einen Blick |
|  | `program.title` | Quatre moments pour retenir l’essentiel. | Vier Momente für das Wesentliche. |
| \* | `program.speakers` | Intervenants | Referenten <br>_Note : « intervenants » au masculin générique (Referenten), comme Ausbilder, Vermittler, Partner ; forme inclusive à décider_ |
|  | `program.speakersSep` |  :  | :  |
|  | `program.speakersSoon` | annoncés très bientôt. | werden in Kürze bekannt gegeben. |
|  | `program.schedule` | Voir le déroulé | Zum Ablauf |
|  | `program.team` | Notre équipe | Unser Team |
|  | `support.eyebrow` | Soutenir l’événement | Die Veranstaltung unterstützen |
|  | `support.title` | Faites partie de la journée. | Seien Sie Teil des Tages. |
|  | `support.text` | Écoles, associations, entreprises, institutions ou bénévoles : chacun peut aider la fondation à accueillir les jeunes. | Schulen, Vereine, Unternehmen, Institutionen oder Ehrenamtliche: Alle können der Stiftung helfen, die jungen Menschen zu empfangen. |
|  | `support.partnerEyebrow` | Pour les structures | Für Organisationen |
|  | `support.partnerTitle` | Devenir partenaire | Partner werden |
|  | `support.partnerText` | Proposez un partenariat à la fondation pour cette journée ou les suivantes. | Schlagen Sie der Stiftung eine Partnerschaft für diesen Aktionstag oder die nächsten vor. |
|  | `support.giveEyebrow` | Pour chacun | Für alle |
|  | `support.giveTitle` | Faire un don de matériel ou de temps | Material oder Zeit spenden |
|  | `support.giveText` | Prêtez main-forte le jour J, ou apportez du matériel utile aux jeunes. | Packen Sie am Tag selbst mit an oder bringen Sie Material mit, das den jungen Menschen nützt. |
|  | `parents.eyebrow` | Pour les parents | Für Eltern |
|  | `parents.title` | Ce que nous devons aux familles. | Was wir den Familien schuldig sind. |
|  | `parents.text` | Avant de confier un jeune à la fondation, vous avez le droit de savoir comment la journée est encadrée. | Bevor Sie der Stiftung einen jungen Menschen anvertrauen, haben Sie das Recht zu erfahren, wie er an diesem Tag betreut wird. |
|  | `parents.promises` | Nos engagements | Unsere Zusagen |
|  | `parents.never` | Ce que nous ne promettrons jamais | Was wir niemals versprechen werden |
|  | `faq.eyebrow` | Questions fréquentes | Häufige Fragen |
|  | `faq.title` | Les réponses, avant de venir. | Die Antworten, bevor Sie kommen. |
|  | `faq.text` | Les questions que les familles et les jeunes nous posent le plus souvent. | Die Fragen, die uns Familien und junge Menschen am häufigsten stellen. |
|  | `faq.action` | Nous écrire | Schreiben Sie uns |
|  | `news.eyebrow` | Actualités | Aktuelles |
|  | `news.title` | Les dernières nouvelles de la fondation. | Die neuesten Nachrichten der Stiftung. |
|  | `news.all` | Toutes les actualités | Alle Neuigkeiten |
|  | `final.titleUpcoming` | Réservez votre journée. | Merken Sie sich den Tag vor. |
|  | `final.textUpcoming` | Inscrivez-vous, puis venez avec vos questions : l’équipe de la fondation vous attend. | Melden Sie sich an und bringen Sie Ihre Fragen mit: Das Team der Stiftung erwartet Sie. |
|  | `final.titlePast` | Revivez la journée en images. | Erleben Sie den Tag noch einmal in Bildern. |
|  | `final.textPast` | Les photos de la journée sont dans la galerie de la fondation. | Die Fotos des Tages finden Sie in der Galerie der Stiftung. |
|  | `final.write` | Nous écrire | Schreiben Sie uns |
|  | `notFound.title` | Cet événement n’existe pas | Diese Veranstaltung gibt es nicht |
|  | `notFound.text` | Il a peut-être changé d’adresse. Voici les événements de la fondation. | Vielleicht hat sich ihre Adresse geändert. Hier sind die Veranstaltungen der Stiftung. |
|  | `faits.dateBientot` | Date annoncée très bientôt | Datum folgt in Kürze |
|  | `faits.villeBientot` | Ville annoncée très bientôt | Stadt folgt in Kürze |
|  | `faits.inscriptionBientot` | Inscriptions annoncées très bientôt | Anmeldung folgt in Kürze |
|  | `faits.quandOu` | Le {{date}} à {{ville}}, {{pays}}. | Am {{date}} in {{ville}}, {{pays}}. |
|  | `faits.quandSansVille` | Le {{date}}, au {{pays}} ; la ville est annoncée très bientôt. | Am {{date}} in {{pays}}; die Stadt wird in Kürze bekannt gegeben. |
|  | `faits.ouSansDate` | À {{ville}}, {{pays}} ; la date est annoncée très bientôt. | In {{ville}}, {{pays}}; das Datum wird in Kürze bekannt gegeben. |
|  | `faits.quandOuInconnus` | La date et la ville sont annoncées très bientôt ; l’événement a lieu au {{pays}}. | Datum und Stadt werden in Kürze bekannt gegeben; die Veranstaltung findet in {{pays}} statt. |
|  | `faits.prix` | {{prix}}. | {{prix}}. |
|  | `faits.prixInconnu` | Le prix est annoncé très bientôt. | Der Preis wird in Kürze bekannt gegeben. |
| \* | `faits.deVille` |  de {{ville}} |  aus {{ville}} <br>_Note : « repartez de {{ville}} avec un plan » rendu par « nehmen Sie aus {{ville}} einen Plan mit nach Hause »_ |
|  | `contenu.road-to-europe.bandeauLabel` | Les 10 pays de Road to Europe | Die 10 Länder von Road to Europe |
|  | `contenu.road-to-europe.pastille.texte` | Le rendez-vous qui lance votre projet européen | Der Termin, der Ihr Europa-Projekt ins Rollen bringt |
|  | `contenu.road-to-europe.titre` | Votre route vers<br>l’Europe<br>commence ici. | Ihr Weg nach<br>Europa<br>beginnt hier. |
|  | `contenu.road-to-europe.motAccent` | l’Europe | Europa |
|  | `contenu.road-to-europe.accroche` | Études, formation, emploi qualifié : en une journée, comprenez les voies légales vers 10 pays d’Europe, rencontrez ceux qui forment et accompagnent, et repartez avec un plan clair. | Studium, Ausbildung, Arbeit als Fachkraft: Verstehen Sie an einem Tag die legalen Wege in 10 Länder Europas, treffen Sie die Menschen, die ausbilden und begleiten, und gehen Sie mit einem klaren Plan nach Hause. |
|  | `contenu.road-to-europe.pays` | Cameroun | Kamerun |
|  | `contenu.road-to-europe.sections.hero.action` | Réserver ma place | Meinen Platz reservieren |
|  | `contenu.road-to-europe.sections.hero.action2` | Voir le programme | Zum Programm |
| \* | `contenu.road-to-europe.sections.hero.etiquette` | La conférence a lieu à | Hier findet die Konferenz statt <br>_Note : « L'événement a lieu à » rendu par « Hier findet … statt » (au-dessus du nom du lieu)_ |
|  | `contenu.road-to-europe.sections.compte.titre` | Le compte à rebours a commencé | Der Countdown läuft |
|  | `contenu.road-to-europe.sections.pourquoi.surtitre` | Pourquoi venir | Warum Sie kommen sollten |
|  | `contenu.road-to-europe.sections.pourquoi.titre` | Une journée pour changer de trajectoire. | Ein Tag, um den Kurs zu ändern. |
|  | `contenu.road-to-europe.sections.pourquoi.intro` | Beaucoup de jeunes perdent du temps et de l’argent faute d’informations fiables. Road to Europe vous donne les bonnes cartes, au bon moment. | Viele junge Menschen verlieren Zeit und Geld, weil ihnen verlässliche Informationen fehlen. Road to Europe gibt Ihnen die richtigen Karten in die Hand, zum richtigen Zeitpunkt. |
|  | `contenu.road-to-europe.sections.route.surtitre` | Votre route | Ihr Weg |
|  | `contenu.road-to-europe.sections.route.titre` | Cinq étapes jusqu’en Europe. | Fünf Schritte bis nach Europa. |
|  | `contenu.road-to-europe.sections.route.intro` | Le chemin demande des efforts, mais il est balisé. À Road to Europe, chaque étape est expliquée par des personnes qui l’ont vécue. | Der Weg verlangt Einsatz, aber er ist ausgeschildert. Bei Road to Europe wird jeder Schritt von Menschen erklärt, die ihn selbst gegangen sind. |
|  | `contenu.road-to-europe.sections.voies.surtitre` | Les voies vers l’Europe | Die Wege nach Europa |
|  | `contenu.road-to-europe.sections.voies.titre` | Quatre voies légales vers l’Europe. | Vier legale Wege nach Europa. |
|  | `contenu.road-to-europe.sections.voies.intro` | Chaque voie a ses conditions, ses délais et ses chances, et elles changent d’un pays à l’autre. Découvrez celle qui vous ressemble. | Jeder Weg hat seine Voraussetzungen, Fristen und Chancen, und sie unterscheiden sich von Land zu Land. Finden Sie den Weg, der zu Ihnen passt. |
|  | `contenu.road-to-europe.sections.programme.surtitre` | Le programme en un coup d’œil | Das Programm auf einen Blick |
|  | `contenu.road-to-europe.sections.programme.titre` | Une journée, quatre temps forts. | Ein Tag, vier Höhepunkte. |
|  | `contenu.road-to-europe.sections.programme.intro` | Comprendre, échanger, pratiquer, rencontrer : vous repartez avec des réponses claires et des contacts utiles. | Verstehen, austauschen, üben, begegnen: Sie gehen mit klaren Antworten und nützlichen Kontakten nach Hause. |
|  | `contenu.road-to-europe.sections.programme.action` | Programme complet | Vollständiges Programm |
| \* | `contenu.road-to-europe.sections.programme.action2` | Les intervenants | Die Referenten <br>_Note : « intervenants » au masculin générique (Referenten), comme Ausbilder, Vermittler, Partner ; forme inclusive à décider_ |
|  | `contenu.road-to-europe.sections.partenaires.surtitre` | Sponsors et partenaires | Sponsoren und Partner |
|  | `contenu.road-to-europe.sections.partenaires.titre` | Faites partie de l’aventure. | Werden Sie Teil des Abenteuers. |
|  | `contenu.road-to-europe.sections.partenaires.intro` | Entreprises, écoles, institutions et médias : rejoignez Road to Europe et rencontrez une jeunesse motivée. | Unternehmen, Schulen, Institutionen und Medien: Machen Sie bei Road to Europe mit und begegnen Sie einer motivierten Jugend. |
|  | `contenu.road-to-europe.sections.parents.surtitre` | Pour les parents | Für Eltern |
|  | `contenu.road-to-europe.sections.parents.titre` | Votre confiance compte.<br>Voici nos<br>engagements. | Ihr Vertrauen zählt.<br>Hier sind unsere<br>Zusagen. |
|  | `contenu.road-to-europe.sections.parents.intro` | Road to Europe est organisé par WAHHF Foundation, une fondation identifiée et joignable, qui accompagne des jeunes dans leur projet vers l’Europe. | Road to Europe wird von der WAHHF Foundation organisiert, einer klar erkennbaren und erreichbaren Stiftung, die junge Menschen auf ihrem Weg nach Europa begleitet. |
|  | `contenu.road-to-europe.sections.faq.surtitre` | Vos questions | Ihre Fragen |
|  | `contenu.road-to-europe.sections.faq.titre` | Des réponses claires. | Klare Antworten. |
|  | `contenu.road-to-europe.sections.faq.intro` | Les questions que l’on nous pose le plus souvent. | Die Fragen, die uns am häufigsten gestellt werden. |
|  | `contenu.road-to-europe.sections.faq.action` | Nous écrire | Schreiben Sie uns |
|  | `contenu.road-to-europe.sections.blog.surtitre` | Le blog | Der Blog |
|  | `contenu.road-to-europe.sections.blog.titre` | À lire avant de partir. | Vor der Abreise lesen. |
| \* | `contenu.road-to-europe.sections.final.titre` | Prenez la bonne route<br>vers l’Europe. | Auf dem richtigen Weg<br>nach Europa. <br>_Note : « Prenez la bonne route vers l'Europe » rendu sans impératif (« Auf dem richtigen Weg nach Europa ») pour tenir sur deux lignes comme la référence ; « Gehen Sie den richtigen Weg » passait sur trois lignes à 1440 px_ |
| \* | `contenu.road-to-europe.sections.final.intro` | Ne laissez pas votre projet attendre : réservez votre place et repartez{{deVille}} avec un plan. | Schieben Sie Ihr Projekt nicht auf: Sichern Sie sich Ihren Platz und nehmen Sie{{deVille}} einen Plan mit nach Hause. <br>_Note : « repartez de {{ville}} avec un plan » rendu par « nehmen Sie aus {{ville}} einen Plan mit nach Hause »_ |
|  | `contenu.road-to-europe.sections.final.action` | Réserver ma place | Meinen Platz reservieren |
|  | `contenu.road-to-europe.sections.final.action2` | Nous écrire | Schreiben Sie uns |
|  | `contenu.road-to-europe.pourquoi[0].titre` | Des conseils honnêtes, pas des promesses | Ehrliche Ratschläge statt Versprechen |
| \* | `contenu.road-to-europe.pourquoi[0].texte` | Des intervenants qui connaissent l’Europe de l’intérieur vous disent ce qui marche, ce que ça coûte et ce qui prend du temps. | Referenten, die Europa von innen kennen, sagen Ihnen, was funktioniert, was es kostet und was Zeit braucht. <br>_Note : « intervenants » au masculin générique (Referenten), comme Ausbilder, Vermittler, Partner ; forme inclusive à décider_ |
|  | `contenu.road-to-europe.pourquoi[1].titre` | Les bonnes démarches, étape par étape | Die richtigen Schritte, einer nach dem anderen |
|  | `contenu.road-to-europe.pourquoi[1].texte` | Langue, reconnaissance des diplômes, dossier, visa : vous repartez avec une feuille de route pour le pays qui vous correspond. | Sprache, Anerkennung der Abschlüsse, Bewerbungsunterlagen, Visum: Sie gehen mit einem Fahrplan für das Land nach Hause, das zu Ihnen passt. |
|  | `contenu.road-to-europe.pourquoi[2].titre` | Des partenaires qui forment et accompagnent | Partner, die ausbilden und begleiten |
|  | `contenu.road-to-europe.pourquoi[2].texte` | Écoles de langue, établissements, structures d’accompagnement : rencontrez-les en personne et posez vos questions. | Sprachschulen, Bildungseinrichtungen, Beratungsstellen: Lernen Sie sie persönlich kennen und stellen Sie Ihre Fragen. |
|  | `contenu.road-to-europe.pourquoi[3].titre` | Ceux qui sont partis témoignent | Wer schon gegangen ist, erzählt |
|  | `contenu.road-to-europe.pourquoi[3].texte` | Des jeunes déjà installés en Europe racontent leur parcours : les erreurs à éviter, les portes qui s’ouvrent. | Junge Menschen, die bereits in Europa leben, erzählen von ihrem Weg: welche Fehler Sie vermeiden sollten und welche Türen sich öffnen. |
|  | `contenu.road-to-europe.deroule[0].titre` | Choisir son pays et sa voie | Land und Weg wählen |
|  | `contenu.road-to-europe.deroule[0].texte` | Études, formation ou emploi, parmi 10 pays : trouvez la combinaison qui correspond à votre profil, à votre niveau et à votre budget. | Studium, Ausbildung oder Arbeit, in 10 Ländern: Finden Sie die Kombination, die zu Ihrem Profil, Ihrem Niveau und Ihrem Budget passt. |
|  | `contenu.road-to-europe.deroule[0].lien.libelle` | Voir les 10 pays | Die 10 Länder ansehen |
|  | `contenu.road-to-europe.deroule[1].titre` | Apprendre la langue | Die Sprache lernen |
|  | `contenu.road-to-europe.deroule[1].texte` | Allemand, italien, portugais, polonais… ou anglais selon le cursus : le niveau de langue ouvre ou ferme les portes. Visez le bon certificat. | Deutsch, Italienisch, Portugiesisch, Polnisch … oder Englisch, je nach Studiengang: Das Sprachniveau öffnet oder schließt Türen. Streben Sie das richtige Zertifikat an. |
|  | `contenu.road-to-europe.deroule[1].lien.libelle` | Mobilité & Langues | Mobilität & Sprachen |
|  | `contenu.road-to-europe.deroule[2].titre` | Préparer son dossier | Die Unterlagen vorbereiten |
|  | `contenu.road-to-europe.deroule[2].texte` | Diplômes reconnus, traductions officielles, CV et lettre au format du pays : un dossier complet fait gagner des mois. | Anerkannte Abschlüsse, amtliche Übersetzungen, Lebenslauf und Anschreiben im Format des Landes: Vollständige Bewerbungsunterlagen sparen Monate. |
|  | `contenu.road-to-europe.deroule[2].lien.libelle` | Accompagnement | Begleitung |
|  | `contenu.road-to-europe.deroule[3].titre` | Obtenir son visa | Das Visum erhalten |
|  | `contenu.road-to-europe.deroule[3].texte` | Rendez-vous à l’ambassade, pièces justificatives, entretien : préparez chaque détail et évitez les pièges. | Termin bei der Botschaft, Nachweise, Gespräch: Bereiten Sie jedes Detail vor und vermeiden Sie die Fallen. |
|  | `contenu.road-to-europe.deroule[3].lien.libelle` | Éviter les arnaques | Betrug vermeiden |
|  | `contenu.road-to-europe.deroule[4].titre` | Partir et s’installer | Aufbrechen und sich einleben |
|  | `contenu.road-to-europe.deroule[4].texte` | Logement, inscription, assurance, premiers mois : arriver préparé change tout. | Wohnung, Einschreibung, Versicherung, die ersten Monate: Vorbereitet anzukommen macht den entscheidenden Unterschied. |
|  | `contenu.road-to-europe.deroule[4].lien.libelle` | Candidater | Bewerben |
|  | `contenu.road-to-europe.activites[0].titre` | Études | Studium |
|  | `contenu.road-to-europe.activites[0].texte` | Des universités publiques reconnues dans 10 pays, avec des cursus parfois en anglais et une admission à préparer tôt. | Anerkannte staatliche Universitäten in 10 Ländern, mit Studiengängen, die teils auf Englisch angeboten werden, und einer Zulassung, die Sie früh vorbereiten sollten. |
|  | `contenu.road-to-europe.activites[0].etiquette` | Universités publiques | Staatliche Universitäten |
|  | `contenu.road-to-europe.activites[1].titre` | Formation professionnelle | Berufsausbildung |
|  | `contenu.road-to-europe.activites[1].texte` | Apprendre un métier en alternance, comme l’Ausbildung en Allemagne, dans les soins, l’artisanat, l’hôtellerie ou l’industrie. | Einen Beruf im dualen System lernen, wie in der Ausbildung in Deutschland, in Pflege, Handwerk, Hotellerie oder Industrie. |
|  | `contenu.road-to-europe.activites[1].etiquette` | Formation en alternance | Duale Ausbildung |
| \* | `contenu.road-to-europe.activites[2].titre` | Emploi qualifié | Arbeit als Fachkraft <br>_Note : « Emploi qualifié » rendu par « Arbeit als Fachkraft » (terme de l'immigration qualifiée en Allemagne)_ |
|  | `contenu.road-to-europe.activites[2].texte` | Votre diplôme ou votre expérience reconnus dans le pays choisi, pour travailler dans votre métier. | Ihr Abschluss oder Ihre Berufserfahrung, anerkannt im gewählten Land, damit Sie in Ihrem Beruf arbeiten können. |
|  | `contenu.road-to-europe.activites[2].etiquette` | Diplôme reconnu | Anerkannter Abschluss |
|  | `contenu.road-to-europe.activites[3].titre` | Être accompagné | Begleitet werden |
|  | `contenu.road-to-europe.activites[3].texte` | La fondation vous aide à choisir le pays, préparer la langue et monter un dossier complet, sans intermédiaire inconnu. | Die Stiftung hilft Ihnen, das Land zu wählen, sich sprachlich vorzubereiten und vollständige Bewerbungsunterlagen zusammenzustellen, ohne unbekannte Vermittler. |
|  | `contenu.road-to-europe.activites[3].etiquette` | Accompagnement WAHHF | Begleitung durch WAHHF |
|  | `contenu.road-to-europe.tempsForts[0].titre` | Comprendre | Verstehen |
|  | `contenu.road-to-europe.tempsForts[0].texte` | Les voies légales vers les 10 pays, leurs conditions et leurs délais, expliqués simplement. | Die legalen Wege in die 10 Länder, ihre Voraussetzungen und Fristen, einfach erklärt. |
|  | `contenu.road-to-europe.tempsForts[1].titre` | Échanger | Austauschen |
|  | `contenu.road-to-europe.tempsForts[1].texte` | Tables rondes avec des formateurs, des établissements et des jeunes déjà partis. | Gesprächsrunden mit Ausbildern, Bildungseinrichtungen und jungen Menschen, die schon gegangen sind. |
|  | `contenu.road-to-europe.tempsForts[2].titre` | Pratiquer | Üben |
|  | `contenu.road-to-europe.tempsForts[2].texte` | Ateliers : dossier, CV au format européen, visa, langue. | Workshops: Bewerbungsunterlagen, Lebenslauf im europäischen Format, Visum, Sprache. |
|  | `contenu.road-to-europe.tempsForts[3].titre` | Rencontrer | Begegnen |
|  | `contenu.road-to-europe.tempsForts[3].texte` | Écoles, établissements et partenaires à leurs stands. | Schulen, Bildungseinrichtungen und Partner an ihren Ständen. |
|  | `contenu.road-to-europe.soutien[0].surtitre` | Pour les entreprises | Für Unternehmen |
|  | `contenu.road-to-europe.soutien[0].titre` | Devenir sponsor | Sponsor werden |
|  | `contenu.road-to-europe.soutien[0].texte` | Soutenez l’événement et gagnez en visibilité auprès de jeunes motivés. | Unterstützen Sie die Veranstaltung und gewinnen Sie Sichtbarkeit bei motivierten jungen Menschen. |
|  | `contenu.road-to-europe.soutien[1].surtitre` | Pour les écoles, institutions, médias | Für Schulen, Institutionen, Medien |
|  | `contenu.road-to-europe.soutien[1].titre` | Devenir partenaire | Partner werden |
|  | `contenu.road-to-europe.soutien[1].texte` | Formez, informez et accompagnez avec nous. | Bilden, informieren und begleiten Sie mit uns. |
|  | `contenu.road-to-europe.parents.titrePromesses` | Ce que nous promettons | Was wir versprechen |
|  | `contenu.road-to-europe.parents.titreJamais` | Ce que nous ne promettrons jamais | Was wir niemals versprechen werden |
|  | `contenu.road-to-europe.parents.promesses[0]` | Des informations vérifiées, avec leurs sources officielles | Geprüfte Informationen mit ihren offiziellen Quellen |
| \* | `contenu.road-to-europe.parents.promesses[1]` | Des organisateurs et des partenaires identifiés | Namentlich bekannte Veranstalter und Partner <br>_Note : « organisateurs identifiés » rendu par « namentlich bekannte Veranstalter »_ |
|  | `contenu.road-to-europe.parents.promesses[2]` | Des prix clairs, payés uniquement par les canaux officiels de la fondation | Klare Preise, bezahlt ausschließlich über die offiziellen Kanäle der Stiftung |
|  | `contenu.road-to-europe.parents.jamais[0]` | Un visa « garanti » | Ein „garantiertes“ Visum |
|  | `contenu.road-to-europe.parents.jamais[1]` | Une admission ou un emploi sans démarches ni niveau de langue | Eine Zulassung oder eine Stelle ohne Formalitäten und ohne Sprachniveau |
|  | `contenu.road-to-europe.parents.jamais[2]` | Des frais cachés, ou payés à un intermédiaire inconnu | Versteckte Kosten oder Zahlungen an einen unbekannten Vermittler |
|  | `contenu.road-to-europe.faq[0].question` | Quand et où a lieu Road to Europe ? | Wann und wo findet Road to Europe statt? |
|  | `contenu.road-to-europe.faq[0].reponse` | {{quandOu}} Le lieu exact et l’heure d’ouverture sont annoncés dès qu’ils sont confirmés. | {{quandOu}} Der genaue Ort und die Einlasszeit werden bekannt gegeben, sobald sie feststehen. |
|  | `contenu.road-to-europe.faq[1].question` | À qui s’adresse l’événement ? | Für wen ist die Veranstaltung gedacht? |
|  | `contenu.road-to-europe.faq[1].reponse` | Aux jeunes qui préparent un projet d’études, de formation ou de travail en Europe, et à leurs parents. Aucun niveau de langue n’est exigé pour venir. | Für junge Menschen, die ein Studium, eine Ausbildung oder eine Arbeit in Europa planen, und für ihre Eltern. Für die Teilnahme ist kein bestimmtes Sprachniveau erforderlich. |
|  | `contenu.road-to-europe.faq[2].question` | Combien coûte l’entrée et comment s’inscrire ? | Was kostet der Eintritt und wie melde ich mich an? |
|  | `contenu.road-to-europe.faq[2].reponse` | {{prix}} L’inscription se fait uniquement par les canaux officiels de la fondation. Ne payez jamais une place à un intermédiaire inconnu. | {{prix}} Die Anmeldung erfolgt ausschließlich über die offiziellen Kanäle der Stiftung. Bezahlen Sie niemals einen unbekannten Vermittler für einen Platz. |
|  | `contenu.road-to-europe.faq[3].question` | Venir à Road to Europe me garantit-il un visa, une admission ou un emploi ? | Garantiert mir die Teilnahme an Road to Europe ein Visum, eine Zulassung oder eine Stelle? |
|  | `contenu.road-to-europe.faq[3].reponse` | Non. Les visas sont décidés par les ambassades, les admissions par les établissements et les embauches par les employeurs. Nous vous montrons les bonnes démarches et les bons contacts. | Nein. Über Visa entscheiden die Botschaften, über Zulassungen die Bildungseinrichtungen und über Einstellungen die Arbeitgeber. Wir zeigen Ihnen die richtigen Schritte und die richtigen Ansprechpartner. |
|  | `contenu.road-to-europe.faq[4].question` | Quel niveau de langue faut-il pour partir ? | Welches Sprachniveau brauche ich für die Ausreise? |
|  | `contenu.road-to-europe.faq[4].reponse` | Cela dépend du pays et de la voie : chaque fiche pays du site indique les langues et les niveaux demandés. | Das hängt vom Land und vom Weg ab: Jede Länderseite der Website nennt die geforderten Sprachen und Niveaus. |
|  | `contenu.road-to-europe.faq[5].question` | Mon entreprise peut-elle soutenir l’événement ? | Kann mein Unternehmen die Veranstaltung unterstützen? |
|  | `contenu.road-to-europe.faq[5].reponse` | Oui. Écrivez-nous depuis la page Agir ou le formulaire de contact. | Ja. Schreiben Sie uns über die Seite Mitmachen oder das Kontaktformular. |
|  | `contenu.road-to-europe.blog[0].surtitre` | Fiches pays | Länderseiten |
|  | `contenu.road-to-europe.blog[0].titre` | Les 10 pays, un par un | Die 10 Länder im Einzelnen |
|  | `contenu.road-to-europe.blog[0].texte` | Langues demandées, études, formation et travail : ce qu’il faut savoir avant de choisir son pays. | Geforderte Sprachen, Studium, Ausbildung und Arbeit: Was Sie wissen sollten, bevor Sie Ihr Land wählen. |
|  | `contenu.road-to-europe.blog[0].lien` | Voir les fiches pays | Zu den Länderseiten |
|  | `contenu.road-to-europe.blog[1].surtitre` | Mobilité & Langues | Mobilität & Sprachen |
|  | `contenu.road-to-europe.blog[1].titre` | Apprendre la langue du pays | Die Sprache des Landes lernen |
|  | `contenu.road-to-europe.blog[1].texte` | Les cours de langue de la fondation, du niveau A1 au niveau C1, et l’orientation vers l’Europe. | Die Sprachkurse der Stiftung, von Niveau A1 bis Niveau C1, und die Orientierung in Richtung Europa. |
|  | `contenu.road-to-europe.blog[1].lien` | Découvrir Mobilité & Langues | Mobilität & Sprachen entdecken |
|  | `contenu.road-to-europe.blog[2].surtitre` | Éviter les arnaques | Betrug vermeiden |
|  | `contenu.road-to-europe.blog[2].titre` | Les signes qui doivent alerter | Die Warnsignale |
|  | `contenu.road-to-europe.blog[2].texte` | Faux recruteurs, visas « garantis », frais cachés : comment les reconnaître avant de payer qui que ce soit. | Falsche Anwerber, „garantierte“ Visa, versteckte Kosten: So erkennen Sie sie, bevor Sie irgendjemanden bezahlen. |
|  | `contenu.road-to-europe.blog[2].lien` | Lire le guide | Zum Leitfaden |
| \* | `contenu.journee-2026-04-25.titre` | Journée du 25 avril 2026 à l’Albatros Hotel | Aktionstag am 25. April 2026 im Albatros Hotel <br>_Note : « journée » rendu par « Aktionstag » (pas de mot allemand court pour « journée de la fondation »)_ |
|  | `contenu.journee-2026-04-25.motAccent` | 25 avril 2026 | 25. April 2026 |
| \* | `contenu.journee-2026-04-25.accroche` | Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse. | Ein Afrika aufbauen, das seine Jugend ernährt, heilt und bildet. <br>_Note : phrase de la banderole (non citée entre guillemets), traduite comme en anglais ; « soigne » rendu par « heilt »_ |
|  | `contenu.journee-2026-04-25.pays` | Cameroun | Kamerun |
|  | `contenu.journee-2026-04-25.organisateurs[1].nom` | Partenaire de la journée (TODO) | Partner des Tages (TODO) |
|  | `contenu.journee-2026-04-25.pourquoi[0].titre` | Gratuit | Kostenlos |
|  | `contenu.journee-2026-04-25.pourquoi[0].texte` | L’entrée et les formations sont gratuites. | Eintritt und Schulungen sind kostenlos. |
|  | `contenu.journee-2026-04-25.pourquoi[1].titre` | Networking professionnel | Professionelles Networking |
|  | `contenu.journee-2026-04-25.pourquoi[1].texte` | Rencontrer des professionnels et élargir son réseau. | Fachleute treffen und das eigene Netzwerk erweitern. |
| \* | `contenu.journee-2026-04-25.pourquoi[2].titre` | Un professeur venu d’Allemagne | Ein Dozent aus Deutschland <br>_Note : « professeur » rendu par « Dozent » (masculin, comme le français ; genre et fonction à confirmer)_ |
| \* | `contenu.journee-2026-04-25.pourquoi[2].texte` | Un professeur d’Allemagne présent sur place. | Ein Dozent aus Deutschland ist vor Ort. <br>_Note : « professeur » rendu par « Dozent » (masculin, comme le français ; genre et fonction à confirmer)_ |
| \* | `contenu.journee-2026-04-25.pourquoi[3].titre` | Accompagnement voyage | Begleitung bei Reiseplänen <br>_Note : « Accompagnement voyage » rendu par « Begleitung bei Reiseplänen » (« Reisebegleitung » voudrait dire « accompagnateur de voyage »)_ |
| \* | `contenu.journee-2026-04-25.pourquoi[3].texte` | Un accompagnement pour préparer un projet de voyage. | Begleitung bei der Vorbereitung eines Reisevorhabens. <br>_Note : « Accompagnement voyage » rendu par « Begleitung bei Reiseplänen » (« Reisebegleitung » voudrait dire « accompagnateur de voyage »)_ |
|  | `contenu.journee-2026-04-25.deroule[0].heure` | 8 h 00 | 8:00 Uhr |
|  | `contenu.journee-2026-04-25.deroule[0].titre` | Accueil des participants (TODO) | Empfang der Teilnehmenden (TODO) |
|  | `contenu.journee-2026-04-25.deroule[0].texte` | Ouverture des portes à 8 h (banderole) ; déroulé à confirmer (TODO). | Einlass um 8:00 Uhr (Banner); Ablauf noch zu bestätigen (TODO). |
|  | `contenu.journee-2026-04-25.deroule[1].heure` | 9 h 00 (TODO) | 9:00 Uhr (TODO) |
|  | `contenu.journee-2026-04-25.deroule[1].titre` | Présentation de la fondation (TODO) | Vorstellung der Stiftung (TODO) |
|  | `contenu.journee-2026-04-25.deroule[1].texte` | Les six domaines d’action présentés au public (TODO). | Die sechs Arbeitsbereiche werden dem Publikum vorgestellt (TODO). |
|  | `contenu.journee-2026-04-25.deroule[1].lien.libelle` | Nos actions | Unsere Arbeit |
|  | `contenu.journee-2026-04-25.deroule[2].heure` | 11 h 00 (TODO) | 11:00 Uhr (TODO) |
|  | `contenu.journee-2026-04-25.deroule[2].titre` | Études et formation en Europe (TODO) | Studium und Ausbildung in Europa (TODO) |
|  | `contenu.journee-2026-04-25.deroule[2].texte` | Présentation sur les études en Allemagne (TODO). | Vortrag über das Studium in Deutschland (TODO). |
|  | `contenu.journee-2026-04-25.deroule[2].lien.libelle` | Mobilité & Langues | Mobilität & Sprachen |
|  | `contenu.journee-2026-04-25.deroule[3].heure` | 14 h 00 (TODO) | 14:00 Uhr (TODO) |
|  | `contenu.journee-2026-04-25.deroule[3].titre` | Échanges avec le public (TODO) | Austausch mit dem Publikum (TODO) |
|  | `contenu.journee-2026-04-25.deroule[3].texte` | Questions de la salle au micro (TODO). | Fragen aus dem Saal am Mikrofon (TODO). |
|  | `contenu.journee-2026-04-25.deroule[4].heure` | 21 h 00 | 21:00 Uhr |
|  | `contenu.journee-2026-04-25.deroule[4].titre` | Clôture (TODO) | Abschluss (TODO) |
|  | `contenu.journee-2026-04-25.deroule[4].texte` | Fin de la journée à 21 h (banderole) ; contenu à confirmer (TODO). | Ende des Tages um 21:00 Uhr (Banner); Inhalt noch zu bestätigen (TODO). |
|  | `contenu.journee-2026-04-25.activites[0].titre` | Formations gratuites | Kostenlose Schulungen |
|  | `contenu.journee-2026-04-25.activites[1].titre` | Logiciels gratuits | Kostenlose Software |
|  | `contenu.journee-2026-04-25.activites[2].titre` | Accompagnement des startups | Begleitung von Start-ups |
|  | `contenu.journee-2026-04-25.activites[3].titre` | Équipement des hôpitaux | Ausstattung von Krankenhäusern |
|  | `contenu.journee-2026-04-25.activites[4].titre` | Subvention du meilleur projet | Zuschuss für das beste Projekt |
|  | `contenu.journee-2026-04-25.activites[5].titre` | Transfert technologique Allemagne–Cameroun | Technologietransfer Deutschland–Kamerun |
|  | `contenu.journee-2026-04-25.tempsForts[0].titre` | Comprendre (TODO) | Verstehen (TODO) |
|  | `contenu.journee-2026-04-25.tempsForts[0].texte` | Premier temps fort de la journée : à fournir (TODO). | Erster Höhepunkt des Tages: noch ausstehend (TODO). |
|  | `contenu.journee-2026-04-25.tempsForts[1].titre` | Échanger (TODO) | Austauschen (TODO) |
|  | `contenu.journee-2026-04-25.tempsForts[1].texte` | Deuxième temps fort : à fournir (TODO). | Zweiter Höhepunkt: noch ausstehend (TODO). |
|  | `contenu.journee-2026-04-25.tempsForts[2].titre` | Pratiquer (TODO) | Üben (TODO) |
|  | `contenu.journee-2026-04-25.tempsForts[2].texte` | Troisième temps fort : à fournir (TODO). | Dritter Höhepunkt: noch ausstehend (TODO). |
|  | `contenu.journee-2026-04-25.tempsForts[3].titre` | Rencontrer (TODO) | Begegnen (TODO) |
|  | `contenu.journee-2026-04-25.tempsForts[3].texte` | Quatrième temps fort : à fournir (TODO). | Vierter Höhepunkt: noch ausstehend (TODO). |
|  | `contenu.journee-2026-04-25.parents.promesses[0]` | Une autorisation écrite des parents pour chaque mineur (TODO : à faire valider par la fondation) | Eine schriftliche Einwilligung der Eltern für jeden Minderjährigen (TODO: von der Stiftung zu bestätigen) |
|  | `contenu.journee-2026-04-25.parents.promesses[1]` | Des jeunes encadrés par l’équipe de la fondation pendant toute la journée (TODO : à faire valider) | Junge Menschen, die den ganzen Tag vom Team der Stiftung betreut werden (TODO: zu bestätigen) |
|  | `contenu.journee-2026-04-25.parents.promesses[2]` | Une entrée gratuite, ou un prix clair annoncé à l’avance (TODO : à faire valider) | Kostenloser Eintritt oder ein klarer, vorab angekündigter Preis (TODO: zu bestätigen) |
|  | `contenu.journee-2026-04-25.parents.jamais[0]` | Une promesse de visa (TODO : à faire valider) | Ein Visumversprechen (TODO: zu bestätigen) |
|  | `contenu.journee-2026-04-25.parents.jamais[1]` | Une promesse d’emploi (TODO : à faire valider) | Ein Jobversprechen (TODO: zu bestätigen) |
|  | `contenu.journee-2026-04-25.parents.jamais[2]` | Des frais cachés ou payés à un intermédiaire (TODO : à faire valider) | Versteckte Kosten oder Zahlungen an einen Vermittler (TODO: zu bestätigen) |
|  | `contenu.journee-2026-04-25.faq[0].question` | Où et quand la journée a-t-elle eu lieu ? (TODO) | Wo und wann fand der Aktionstag statt? (TODO) |
|  | `contenu.journee-2026-04-25.faq[0].reponse` | À l’Albatros Hotel, le 25 avril 2026, de 8 h à 21 h (banderole). Ville à confirmer (TODO). | Im Albatros Hotel, am 25. April 2026, von 8:00 bis 21:00 Uhr (Banner). Stadt noch zu bestätigen (TODO). |
|  | `contenu.journee-2026-04-25.faq[1].question` | À qui s’adressait la journée ? (TODO) | Für wen war der Aktionstag gedacht? (TODO) |
|  | `contenu.journee-2026-04-25.faq[1].reponse` | Réponse à fournir par la fondation (TODO). | Antwort der Stiftung steht noch aus (TODO). |
|  | `contenu.journee-2026-04-25.faq[2].question` | L’entrée était-elle payante ? (TODO) | Musste man Eintritt zahlen? (TODO) |
|  | `contenu.journee-2026-04-25.faq[2].reponse` | Réponse à fournir par la fondation (TODO). | Antwort der Stiftung steht noch aus (TODO). |
|  | `contenu.journee-2026-04-25.faq[3].question` | Les mineurs pouvaient-ils venir seuls ? (TODO) | Durften Minderjährige allein kommen? (TODO) |
|  | `contenu.journee-2026-04-25.faq[3].reponse` | Réponse à fournir par la fondation (TODO). | Antwort der Stiftung steht noch aus (TODO). |
|  | `contenu.journee-2026-04-25.faq[4].question` | Une prochaine édition est-elle prévue ? (TODO) | Ist eine nächste Ausgabe geplant? (TODO) |
|  | `contenu.journee-2026-04-25.faq[4].reponse` | Réponse à fournir par la fondation (TODO). | Antwort der Stiftung steht noch aus (TODO). |
|  | `contenu.journee-2026-04-25.faq[5].question` | Comment proposer un partenariat ? (TODO) | Wie kann man eine Partnerschaft vorschlagen? (TODO) |
|  | `contenu.journee-2026-04-25.faq[5].reponse` | Par la page Agir, rubrique partenaire (TODO : à confirmer). | Über die Seite Mitmachen, Rubrik Partner (TODO: zu bestätigen). |
|  | `contenu.exemple-a-venir.titre` | Prochaine journée de la fondation (TODO) | Nächster Aktionstag der Stiftung (TODO) |
|  | `contenu.exemple-a-venir.motAccent` | journée | Aktionstag |
|  | `contenu.exemple-a-venir.accroche` | Événement d’exemple pour tester la page : textes, date et lieu à remplacer (TODO). | Beispielveranstaltung zum Testen der Seite: Texte, Datum und Ort werden noch ersetzt (TODO). |

## galerie

Fichier : `src/locales/galerie/de.json` (9 textes, dont 4 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Galerie — La fondation en images | Galerie — Die Stiftung in Bildern |
| \* | `seo.description` | Photos de WAHHF Foundation : la journée du 25 avril 2026 à l’Albatros Hotel, une visite de plantation, des sorties à Nkongsamba, au mont et au lac, et une randonnée avec les jeunes. | Fotos der WAHHF Foundation: die Veranstaltung vom 25. April 2026 im Albatros Hotel, ein Besuch auf einer Plantage, Ausflüge nach Nkongsamba, zum Berg und zum See sowie eine Wanderung mit jungen Menschen. |
| \* | `title` | La fondation en images | Die Stiftung in Bildern |
|  | `intro` | Retour en photos sur nos actions : la journée du 25 avril 2026 à l’Albatros Hotel, une visite de plantation, des sorties à Nkongsamba, au mont et au lac, et une randonnée avec les jeunes. | Ein Rückblick in Fotos auf unsere Arbeit: die Veranstaltung vom 25. April 2026 im Albatros Hotel, ein Besuch auf einer Plantage, Ausflüge nach Nkongsamba, zum Berg und zum See sowie eine Wanderung mit jungen Menschen. |
|  | `filterLabel` | Filtrer par album | Nach Album filtern |
|  | `allAlbums` | Tous les albums | Alle Alben |
| \* | `end.title` | Participer à la suite | Die Fortsetzung mitgestalten |
| \* | `end.subtitle` | Un don soutient les actions de la fondation. Les jeunes peuvent candidater aux cours d’allemand /anglais et à l’orientation vers l’Europe. | Eine Spende unterstützt die Arbeit der Stiftung. Junge Menschen können sich für die Deutsch- und Englischkurse und für die Orientierungsberatung in Richtung Europa bewerben. |
|  | `end.apply` | Candidater au programme | Für das Programm bewerben |

## mobilite

Fichier : `src/locales/mobilite/de.json` (315 textes, dont 17 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `commun.europe` | Europe | Europa |
|  | `commun.mobilite` | Mobilité & Langues | Mobilität & Sprachen |
|  | `commun.academie` | Académie de langues | Sprachakademie |
|  | `commun.niveau` | Niveau {{level}} | Niveau {{level}} |
|  | `commun.candidater` | Candidater | Bewerben |
|  | `commun.candidaterNiveau` | Candidater au niveau {{level}} | Für Niveau {{level}} bewerben |
|  | `commun.filAria` | Les cinq niveaux d’allemand /anglais, de A1 à C1, puis l’Europe | Die fünf Niveaus Deutsch/Englisch, von A1 bis C1, dann Europa |
|  | `commun.niveauAffiche` | niveau affiché | angezeigtes Niveau |
|  | `commun.nomNiveau` | Allemand {{level}} : {{short}} | Deutsch {{level}}: {{short}} |
| \* | `commun.cohorte` | Rejoindre la prochaine cohorte | In die nächste Kursgruppe einsteigen |
|  | `formats.enLigne` | En ligne | Online |
|  | `formats.douala` | Présentiel à Douala | Vor Ort in Douala |
|  | `formats.yaounde` | Présentiel à Yaoundé | Vor Ort in Yaoundé |
|  | `formatsPhrase.enLigne` | en ligne | online |
|  | `formatsPhrase.douala` | présentiel à Douala | vor Ort in Douala |
|  | `formatsPhrase.yaounde` | présentiel à Yaoundé | vor Ort in Yaoundé |
|  | `formatsChoix.enLigne` | En ligne (accessible partout) | Online (überall zugänglich) |
|  | `formatsChoix.douala` | Présentiel à Douala | Vor Ort in Douala |
|  | `formatsChoix.yaounde` | Présentiel à Yaoundé | Vor Ort in Yaoundé |
|  | `hub.seoTitle` | Mobilité & Langues — Apprendre, se préparer, s'orienter gratuitement | Mobilität & Sprachen — kostenlos lernen, sich vorbereiten und orientieren |
|  | `hub.seoDescription` | WAHHF Foundation : Académie de langue allemande /anglaise gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens, financé par nos partenaires et nos donateurs. | WAHHF Foundation: kostenlose Sprachakademie für Deutsch/Englisch (A1 bis C1) und transparente Begleitung in 10 europäische Länder, finanziert von unseren Partnern und Spendern. |
|  | `hub.title` | Apprendre l’allemand /anglais, se préparer, s’orienter vers l’Europe | Deutsch/Englisch lernen, sich vorbereiten, den Weg nach Europa finden |
|  | `hub.intro` | Des cours d’allemand /anglais du niveau A1 au niveau C1 et une information fiable sur les études, la formation et le travail dans 10 pays européens. | Deutsch- und Englischkurse von Niveau A1 bis Niveau C1 und verlässliche Informationen zu Studium, Ausbildung und Arbeit in 10 europäischen Ländern. |
|  | `hub.ctaCandidater` | Candidater au programme | Für das Programm bewerben |
|  | `hub.ctaAcademie` | Découvrir l’Académie d’allemand /anglais | Die Sprachakademie entdecken |
|  | `hub.portesTitle` | Choisissez votre porte d’entrée | Wählen Sie Ihren Einstieg |
| \* | `hub.portesSubtitle` | Vous pouvez candidater uniquement aux cours de langue allemande /anglaise, uniquement à l’accompagnement documentaire, ou aux deux. | Sie können sich nur für die Deutsch- und Englischkurse bewerben, nur für die Begleitung bei den Unterlagen oder für beides. |
|  | `hub.academieTitle` | Académie de langues (allemand /anglais A1 à C1) | Sprachakademie (Deutsch/Englisch A1 bis C1) |
|  | `hub.academieText` | Apprendre l’allemand /anglais étape par étape : compréhension, expression orale et écrite, test de niveau en ligne et préparation méthodique aux certifications. | Deutsch/Englisch Schritt für Schritt lernen: Verstehen, Sprechen und Schreiben, ein Online-Einstufungstest und eine methodische Vorbereitung auf die Zertifikate. |
|  | `hub.academieBouton` | Accéder à l’Académie de langues | Zur Sprachakademie |
|  | `hub.academieTest` | Passer le test de niveau (20 questions) | Einstufungstest machen (20 Fragen) |
|  | `hub.europeTitle` | Accompagnement vers l’Europe | Begleitung nach Europa |
|  | `hub.europeText` | Un parcours pédagogique en 4 étapes pour comprendre les voies légales (études, formation professionnelle, travail), préparer son dossier et vérifier chaque démarche sur les portails officiels. | Ein Lernweg in 4 Schritten: die legalen Wege verstehen (Studium, Berufsausbildung, Arbeit), die Bewerbungsunterlagen vorbereiten und jeden Schritt auf den offiziellen Portalen prüfen. |
|  | `hub.europeBouton` | Explorer l’accompagnement Europe | Begleitung nach Europa ansehen |
|  | `hub.europeArnaques` | Guide : éviter les arnaques | Ratgeber: Betrug vermeiden |
|  | `hub.pourquoiTitle` | Protéger la jeunesse contre la désinformation et ouvrir l’accès au savoir | Junge Menschen vor Desinformation schützen und den Zugang zu Wissen öffnen |
|  | `hub.pourquoiSubtitle` | Trop de jeunes et de familles s’endettent auprès d’intermédiaires frauduleux qui vendent de fausses promesses. WAHHF Foundation répond par la rigueur linguistique et la transparence. | Zu viele junge Menschen und Familien verschulden sich bei betrügerischen Vermittlern, die falsche Versprechen verkaufen. Die WAHHF Foundation setzt dem sprachliche Gründlichkeit und Transparenz entgegen. |
| \* | `hub.pourquoiText` | Un projet d’études ou de formation professionnelle à l’étranger ne s’achète pas : il se construit par l’apprentissage exigeant de la langue, la conformité des diplômes et le respect strict des procédures consulaires officielles. | Ein Studium oder eine Berufsausbildung im Ausland kann man nicht kaufen. Man erarbeitet es sich: durch anspruchsvolles Sprachenlernen, Abschlüsse, die den Anforderungen entsprechen, und die strikte Einhaltung der offiziellen konsularischen Verfahren. |
| \* | `hub.raisons.frais.title` | Zéro frais pour le bénéficiaire | Keine Kosten für Teilnehmende |
|  | `hub.raisons.frais.desc` | Aucun frais d’inscription, aucun frais de dossier, aucune commission à aucun moment du parcours. | Keine Anmeldegebühr, keine Bearbeitungsgebühr, keine Provision – zu keinem Zeitpunkt. |
|  | `hub.raisons.arnaques.title` | Lutte active contre les arnaques | Aktiv gegen Betrug |
|  | `hub.raisons.arnaques.desc` | Un guide pour reconnaître les faux contrats et les faux visas, et vérifier chaque information sur les sources officielles. | Ein Ratgeber, mit dem Sie gefälschte Verträge und gefälschte Visa erkennen und jede Information bei offiziellen Quellen prüfen. |
|  | `hub.raisons.exigence.title` | Exigence académique et linguistique | Akademischer und sprachlicher Anspruch |
|  | `hub.raisons.exigence.desc` | Accompagnement progressif du niveau débutant A1 jusqu’à l’autonomie universitaire C1. | Schrittweise Begleitung vom Anfängerniveau A1 bis zur Studierfähigkeit auf Niveau C1. |
|  | `hub.temoignagesTitle` | Ce que disent nos apprenants | Das sagen unsere Lernenden |
|  | `hub.faqTitle` | Questions fréquentes | Häufige Fragen |
|  | `hub.faq.gratuit.q` | Les cours d’allemand /anglais et l’accompagnement sont-ils vraiment 100 % gratuits ? | Sind die Deutsch- und Englischkurse und die Begleitung wirklich zu 100 % kostenlos? |
|  | `hub.faq.gratuit.a` | Oui, pour tous les bénéficiaires : les cours d’allemand /anglais, du niveau A1 au niveau C1, comme les séances d’orientation vers l’Europe. Le programme est financé par nos partenaires et nos donateurs. | Ja, für alle Teilnehmenden: die Deutsch- und Englischkurse von Niveau A1 bis Niveau C1 ebenso wie die Orientierungstermine zu Europa. Das Programm wird von unseren Partnern und Spendern finanziert. |
|  | `hub.faq.visas.q` | WAHHF Foundation délivre-t-elle des visas ou des contrats de travail ? | Stellt die WAHHF Foundation Visa oder Arbeitsverträge aus? |
|  | `hub.faq.visas.a` | Non, jamais. WAHHF Foundation est une fondation à but non lucratif. Nous ne vendons ni visa, ni admission universitaire, ni contrat de travail, et nous ne garantissons aucun résultat. Les décisions appartiennent exclusivement aux ambassades, consulats et établissements officiels. | Nein, niemals. Die WAHHF Foundation ist eine gemeinnützige Stiftung. Wir verkaufen weder Visa noch Studienplätze noch Arbeitsverträge, und wir garantieren kein Ergebnis. Die Entscheidungen liegen allein bei Botschaften, Konsulaten und offiziellen Einrichtungen. |
|  | `hub.faq.identite.q` | Faut-il envoyer son passeport ou sa carte d’identité pour candidater ? | Muss ich für die Bewerbung meinen Reisepass oder Personalausweis schicken? |
| \* | `hub.faq.identite.a` | Non. Lors de votre candidature en ligne sur ce site, aucun document d’identité (ni passeport, ni CNI) et aucune somme d’argent ne vous sont demandés. | Nein. Für Ihre Online-Bewerbung auf dieser Website verlangen wir kein Ausweisdokument (keinen Reisepass, keinen Personalausweis) und kein Geld. |
|  | `hub.faq.niveau.q` | Comment savoir par quel niveau d’allemand /anglais commencer ? | Wie finde ich heraus, mit welchem Niveau ich in Deutsch/Englisch beginne? |
|  | `hub.faq.niveau.a` | Si vous débutez totalement, choisissez le niveau A1. Si vous avez déjà des bases, passez notre test d’orientation de 20 questions sur la page Académie de langues. | Wenn Sie ganz ohne Vorkenntnisse starten, wählen Sie Niveau A1. Wenn Sie schon Grundkenntnisse haben, machen Sie unseren Einstufungstest mit 20 Fragen auf der Seite der Sprachakademie. |
|  | `hub.finSubtitle` | Un seul formulaire pour les cours d’allemand /anglais et l’orientation vers l’Europe. Il se remplit en 5 minutes environ ; aucun document d’identité ni paiement ne vous est demandé. | Ein einziges Formular für die Deutsch- und Englischkurse und die Orientierung nach Europa. Es dauert etwa 5 Minuten. Wir verlangen weder ein Ausweisdokument noch eine Zahlung. |
|  | `academie.seoTitle` | Académie de langues — Allemand /anglais A1 à C1 gratuit | Sprachakademie — Deutsch/Englisch A1 bis C1 kostenlos |
|  | `academie.seoDescription` | Accompagnement gratuit des cours de langue allemande /anglaise du niveau A1 au niveau C1 par WAHHF Foundation : test de niveau de 20 questions, programme par niveau et sessions. | Kostenlose Begleitung der Deutsch- und Englischkurse von Niveau A1 bis Niveau C1 durch die WAHHF Foundation: Einstufungstest mit 20 Fragen, Programm für jedes Niveau und Kurstermine. |
|  | `academie.title` | Académie de langues : l’allemand /anglais, du niveau A1 au niveau C1 avec WAHHF Institute | Sprachakademie: Deutsch/Englisch von Niveau A1 bis Niveau C1 mit dem WAHHF Institute |
|  | `academie.intro` | Des cours d’allemand /anglais du niveau débutant jusqu’à la maîtrise académique, en ligne ou en présentiel à Douala et à Yaoundé. Commencez par le test : il vous dit par quel niveau commencer. | Deutsch- und Englischkurse vom Anfängerniveau bis zur akademischen Sprachbeherrschung, online oder vor Ort in Douala und Yaoundé. Beginnen Sie mit dem Test: Er zeigt Ihnen, mit welchem Niveau Sie starten. |
|  | `academie.ctaTest` | Trouver mon niveau (5 minutes) | Mein Niveau finden (5 Minuten) |
|  | `academie.ctaCandidater` | Candidater (choisir mon niveau) | Bewerben (Niveau selbst wählen) |
|  | `academie.niveauxTitle` | Les 5 niveaux, de A1 à C1 | Die 5 Niveaus, von A1 bis C1 |
|  | `academie.niveauxSubtitle` | Chaque niveau mène à sa page : objectifs, compétences, volume horaire et prochaines sessions. | Jedes Niveau hat eine eigene Seite: Ziele, Kompetenzen, Stundenumfang und nächste Kurse. |
|  | `academie.pageNiveau` | Toute la page du niveau {{level}} | Zur Seite von Niveau {{level}} |
|  | `academie.examensTitle` | Préparation aux examens officiels | Vorbereitung auf offizielle Prüfungen |
|  | `academie.examensText` | Nos parcours intègrent des entraînements blancs aux épreuves de compréhension écrite, d’écoute, d’expression écrite et d’oral, selon les standards des examens reconnus : Goethe-Zertifikat, telc Deutsch et TestDaF. | Unsere Kurse umfassen Probeprüfungen in Lesen, Hören, Schreiben und Sprechen nach den Standards anerkannter Prüfungen: Goethe-Zertifikat, telc Deutsch und TestDaF. |
|  | `niveauPage.seoTitle` | Allemand niveau {{level}} — Académie de langues gratuite | Deutsch Niveau {{level}} — kostenlose Sprachakademie |
|  | `niveauPage.seoDescription` | Niveau {{level}} d'allemand à l'Académie WAHHF : {{subtitle}} Objectifs, compétences, volume horaire et prochaines sessions. | Deutsch auf Niveau {{level}} an der WAHHF-Akademie: {{subtitle}} Ziele, Kompetenzen, Stundenumfang und nächste Kurse. |
|  | `niveauPage.verifier` | Vérifier mon niveau (test) | Mein Niveau prüfen (Test) |
|  | `niveauPage.filAria` | Les cinq niveaux d’allemand ; niveau affiché : {{level}} | Die fünf Deutsch-Niveaus; angezeigtes Niveau: {{level}} |
|  | `niveauPage.programme` | Programme du niveau {{level}} | Programm für Niveau {{level}} |
|  | `niveauPage.introuvableTitle` | Ce niveau d’allemand n’existe pas | Dieses Deutsch-Niveau gibt es nicht |
|  | `niveauPage.introuvableMessage` | L’Académie de langues propose 5 niveaux, de A1 à C1. Choisissez le vôtre ci-dessous, ou faites le test de niveau. | Die Sprachakademie bietet 5 Niveaus von A1 bis C1 an. Wählen Sie unten Ihr Niveau oder machen Sie den Einstufungstest. |
|  | `niveauPage.introuvableListe` | Les niveaux de l’Académie | Die Niveaus der Akademie |
|  | `niveauPage.introuvableTest` | Test de niveau (20 questions) | Einstufungstest (20 Fragen) |
| \* | `cohorte.subtitle` | Un seul formulaire, 5 minutes environ ; aucun document d’identité ni paiement ne vous est demandé. | Ein einziges Formular, etwa 5 Minuten. Wir verlangen weder ein Ausweisdokument noch eine Zahlung. |
|  | `fiche.volume` | Volume horaire | Stundenumfang |
|  | `fiche.prerequis` | Prérequis | Voraussetzungen |
|  | `fiche.duree` | Durée | Dauer |
|  | `fiche.prochaine` | Prochaine session | Nächster Kursbeginn |
|  | `fiche.pasAnnoncee` | Pas encore annoncée | Noch nicht bekannt gegeben |
|  | `fiche.format` | Format | Format |
|  | `fiche.formatValeur` | En ligne, ou en présentiel à Douala et à Yaoundé selon les sessions | Online oder vor Ort in Douala und Yaoundé, je nach Kurs |
|  | `fiche.objectifs` | Objectifs du niveau {{level}} | Ziele von Niveau {{level}} |
|  | `fiche.saurezFaire` | Ce que vous saurez faire à la fin du niveau {{level}} | Das können Sie am Ende von Niveau {{level}} |
|  | `test.blanc` | (blanc) | (Lücke) |
|  | `test.statutFini` | Test terminé. Score : {{score}} sur {{total}}. Niveau conseillé : {{level}}. | Test beendet. Ergebnis: {{score}} von {{total}}. Empfohlenes Niveau: {{level}}. |
|  | `test.statutFiche` | La fiche du niveau {{level}} est affichée plus bas. | Die Übersicht zu Niveau {{level}} finden Sie weiter unten. |
|  | `test.statutQuestion` | Question {{n}} sur {{total}}. | Frage {{n}} von {{total}}. |
|  | `test.title` | Trouver mon niveau d’allemand | Mein Deutsch-Niveau finden |
|  | `test.subtitle` | 20 questions à choix multiples, de A1 à C1, environ 5 minutes. Le résultat vous indique le niveau par lequel commencer. | 20 Multiple-Choice-Fragen von A1 bis C1, etwa 5 Minuten. Das Ergebnis zeigt Ihnen, mit welchem Niveau Sie beginnen. |
|  | `test.intro` | Les questions sont classées par difficulté croissante : 4 questions par niveau. Vous pouvez revenir à la question précédente à tout moment. | Die Fragen werden nach und nach schwieriger: 4 Fragen pro Niveau. Sie können jederzeit zur vorherigen Frage zurückgehen. |
|  | `test.commencer` | Commencer le test | Test starten |
| \* | `test.resultatKicker` | Résultat indicatif de votre test | Ihr Testergebnis (zur Orientierung) |
|  | `test.niveauConseille` | Niveau conseillé : {{level}} | Empfohlenes Niveau: {{level}} |
|  | `test.score_one` | {{count}} bonnes réponses sur {{total}} | {{count}} richtige Antwort von {{total}} |
|  | `test.score_other` | {{count}} bonnes réponses sur {{total}} | {{count}} richtige Antworten von {{total}} |
|  | `test.niveauConseilleCourt` | niveau conseillé | empfohlenes Niveau |
|  | `test.resultatText` | Ce résultat sert à vous orienter. Lors de l’étude de votre candidature, un formateur confirmera avec vous le groupe qui vous permettra de progresser dans les meilleures conditions. | Dieses Ergebnis dient Ihrer Orientierung. Bei der Prüfung Ihrer Bewerbung legt eine Lehrkraft gemeinsam mit Ihnen die Gruppe fest, in der Sie am besten vorankommen. |
|  | `test.recommencer` | Recommencer le test | Test neu starten |
|  | `test.position` | Question {{n}} sur {{total}} | Frage {{n}} von {{total}} |
|  | `test.niveauTeste` | Niveau testé : {{level}} | Geprüftes Niveau: {{level}} |
|  | `test.avancement` | Avancement du test | Testfortschritt |
|  | `test.manque` | Choisissez une réponse pour passer à la question suivante. | Wählen Sie eine Antwort, um zur nächsten Frage zu gelangen. |
|  | `test.precedente` | Question précédente | Vorherige Frage |
|  | `test.voirResultat` | Voir mon niveau conseillé | Mein empfohlenes Niveau ansehen |
|  | `test.suivante` | Question suivante | Nächste Frage |
|  | `sessions.moisAConfirmer` | {{month}} (date à confirmer) | {{month}} (Datum noch nicht bestätigt) |
|  | `sessions.whatsapp` | Bonjour WAHHF Foundation, je souhaite être prévenu(e) de la prochaine session de cours d’allemand /anglais. | Guten Tag, liebes Team der WAHHF Foundation, ich möchte über den nächsten Termin der Deutsch- und Englischkurse informiert werden. |
|  | `sessions.titleNiveau` | Prochaines sessions de niveau {{level}} | Nächste Kurse auf Niveau {{level}} |
| \* | `sessions.titleTout` | Calendrier des prochaines sessions | Kalender der nächsten Kurse |
|  | `sessions.subtitle` | Toutes les sessions sont gratuites. En ligne ou en présentiel à Douala et à Yaoundé ; celles déjà commencées n’apparaissent plus. | Alle Kurse sind kostenlos. Online oder vor Ort in Douala und Yaoundé; bereits begonnene Kurse werden nicht mehr angezeigt. |
|  | `sessions.filtreNiveau` | Niveau | Niveau |
|  | `sessions.tousNiveaux` | Tous les niveaux | Alle Niveaus |
|  | `sessions.filtreFormat` | Format | Format |
|  | `sessions.tousFormats` | Tous les formats | Alle Formate |
|  | `sessions.presentiel` | En présentiel (Douala, Yaoundé) | Vor Ort (Douala, Yaoundé) |
|  | `sessions.aucune` | Aucune session | Keine Kurse |
|  | `sessions.nombre_one` | {{count}} session | {{count}} Kurs |
|  | `sessions.nombre_other` | {{count}} sessions | {{count}} Kurse |
|  | `sessions.videPresentiel` | Pas de session en présentiel annoncée pour ce choix pour l’instant. | Für diese Auswahl ist noch kein Kurs vor Ort angekündigt. |
|  | `sessions.videChoix` | Pas de session annoncée pour ce choix pour l’instant. | Für diese Auswahl ist noch kein Kurs angekündigt. |
|  | `sessions.videNiveau` | Pas de session de niveau {{level}} annoncée pour l’instant. | Für Niveau {{level}} ist noch kein Kurs angekündigt. |
|  | `sessions.videTout` | Pas de session annoncée pour l’instant. | Noch ist kein Kurs angekündigt. |
|  | `sessions.prevenir` | Vous pouvez demander à être prévenu de la prochaine session. | Sie können sich über den nächsten Kurs informieren lassen. |
|  | `sessions.voirEnLigne` | Voir les sessions en ligne | Online-Kurse ansehen |
|  | `sessions.voirToutes` | Voir toutes les sessions | Alle Kurse ansehen |
|  | `sessions.prevenirWhatsapp` | Être prévenu sur WhatsApp | Per WhatsApp informiert werden |
|  | `cours.programme` | Programme {{level}} | Programm {{level}} |
|  | `cours.format` | Format : | Format: |
|  | `cours.rythme` | Rythme et durée : | Kurszeiten und Dauer: |
|  | `cours.debut` | Début de session : | Kursbeginn: |
| \* | `cours.places` | Places prévues : | Geplante Plätze: |
|  | `cours.indicatif` | (indicatif) | (Richtwert) |
|  | `cours.srSession` | à cette session ({{level}}, {{format}}) | für diesen Kurs ({{level}}, {{format}}) |
|  | `apres.title` | Après votre candidature | Nach Ihrer Bewerbung |
|  | `apres.etape` | Étape {{n}} : | Schritt {{n}}: |
|  | `apres.etapes.envoi.title` | Vous envoyez votre demande | Sie senden Ihre Anfrage |
|  | `apres.etapes.envoi.text` | Le formulaire prépare un message avec vos réponses ; vous l’envoyez par WhatsApp ou par e-mail. | Das Formular bereitet eine Nachricht mit Ihren Antworten vor. Sie senden sie per WhatsApp oder per E-Mail. |
|  | `apres.etapes.etude.title` | L’équipe étudie votre demande | Das Team prüft Ihre Anfrage |
|  | `apres.etapes.etude.text` | Elle vous répond par WhatsApp ou par e-mail, aux coordonnées que vous avez données. | Es antwortet Ihnen per WhatsApp oder per E-Mail, über die Kontaktdaten, die Sie angegeben haben. |
|  | `apres.etapes.niveau.title` | Votre niveau est confirmé | Ihr Niveau wird bestätigt |
|  | `apres.etapes.niveau.text` | Un formateur confirme avec vous le groupe qui vous convient, à partir du test de niveau si vous l’avez passé. | Eine Lehrkraft legt mit Ihnen die passende Gruppe fest, auf Grundlage des Einstufungstests, wenn Sie ihn gemacht haben. |
|  | `apres.etapes.cohorte.title` | Vous rejoignez une cohorte | Sie steigen in eine Kursgruppe ein |
|  | `apres.etapes.cohorte.text` | En ligne ou en présentiel, selon les sessions ouvertes et les places disponibles. | Online oder vor Ort, je nach offenen Kursen und freien Plätzen. |
|  | `apres.quiTitle` | Qui peut candidater | Wer sich bewerben kann |
|  | `apres.qui.niveaux.title` | Débutants comme confirmés | Anfänger wie Fortgeschrittene |
|  | `apres.qui.niveaux.text` | Du niveau A1 (aucune base) au niveau C1. Le test de niveau en ligne vous aide à vous situer. | Von Niveau A1 (ohne Vorkenntnisse) bis Niveau C1. Der Online-Einstufungstest hilft Ihnen, Ihr Niveau einzuschätzen. |
|  | `apres.qui.lieu.title` | Où que vous viviez | Wo auch immer Sie leben |
|  | `apres.qui.lieu.text` | Les cours en ligne sont accessibles partout ; des cohortes en présentiel sont prévues à Douala et à Yaoundé. | Die Online-Kurse sind überall zugänglich. Kursgruppen vor Ort sind in Douala und Yaoundé geplant. |
|  | `apres.qui.pieces.title` | Sans pièce d’identité ni paiement | Ohne Ausweis und ohne Zahlung |
|  | `apres.qui.pieces.text` | Aucun document d’identité ni aucun paiement ne vous sont demandés pour candidater. | Für die Bewerbung verlangen wir weder ein Ausweisdokument noch eine Zahlung. |
|  | `candidature.seoTitle` | Candidater gratuitement — Cours d'allemand /anglais & Accompagnement Europe | Kostenlos bewerben — Deutsch- und Englischkurse & Begleitung nach Europa |
|  | `candidature.seoDescription` | Formulaire unique et 100 % gratuit de demande d'accompagnement et d'inscription aux cours d'allemand /anglais WAHHF Foundation. Aucun document d'identité ni paiement demandé. | Ein einziges, zu 100 % kostenloses Formular für die Anfrage nach Begleitung und die Anmeldung zu den Deutsch- und Englischkursen der WAHHF Foundation. Kein Ausweisdokument und keine Zahlung nötig. |
|  | `candidature.title` | Candidater à un parcours d’accompagnement | Für eine Begleitung bewerben |
|  | `candidature.intro` | Un seul formulaire pour rejoindre l’Académie d’allemand /anglais (A1 à C1), être orienté vers l’Europe, ou les deux. Il se remplit en 5 minutes environ. | Ein einziges Formular, um an der Sprachakademie für Deutsch/Englisch (A1 bis C1) teilzunehmen, Orientierung für Europa zu erhalten oder beides. Es dauert etwa 5 Minuten. |
|  | `candidature.avant` | Avant de commencer | Bevor Sie beginnen |
|  | `candidature.souhaits.cours_allemand` | Cours d’allemand /anglais (A1 à C1) | Deutsch- und Englischkurse (A1 bis C1) |
|  | `candidature.souhaits.accompagnement_europe` | Accompagnement vers l’Europe | Begleitung nach Europa |
|  | `candidature.souhaits.les_deux` | Les deux : cours et orientation | Beides: Kurse und Orientierung |
|  | `candidature.etapes.1` | Vos coordonnées de contact | Ihre Kontaktdaten |
|  | `candidature.etapes.2` | Votre souhait d’accompagnement | Ihr Wunsch nach Begleitung |
|  | `candidature.etapes.3` | Votre motivation et votre accord | Ihre Motivation und Ihre Einwilligung |
|  | `candidature.erreurs.nom` | Saisissez votre prénom et votre nom. | Geben Sie Ihren Vor- und Nachnamen ein. |
|  | `candidature.erreurs.pays` | Indiquez votre pays de résidence, par exemple Cameroun. | Geben Sie Ihr Wohnsitzland an, zum Beispiel Kamerun. |
|  | `candidature.erreurs.ville` | Indiquez votre ville de résidence, par exemple Douala. | Geben Sie Ihren Wohnort an, zum Beispiel Douala. |
|  | `candidature.erreurs.accord` | Cochez cette case pour que nous puissions étudier votre candidature et vous recontacter. | Kreuzen Sie dieses Feld an, damit wir Ihre Bewerbung prüfen und Sie kontaktieren können. |
|  | `candidature.paysDefaut` | Cameroun | Kamerun |
|  | `candidature.statutPret` | Votre message est prêt : envoyez-le par WhatsApp ou par e-mail. | Ihre Nachricht ist fertig: Senden Sie sie per WhatsApp oder per E-Mail. |
|  | `candidature.statutEtape` | Étape {{step}} sur 3 : {{label}}. | Schritt {{step}} von 3: {{label}}. |
|  | `candidature.message.objet` | Candidature WAHHF — {{name}} | Bewerbung WAHHF — {{name}} |
|  | `candidature.message.intro` | Je souhaite candidater à un parcours d’accompagnement de WAHHF Foundation. Voici mes réponses au formulaire du site : | Ich möchte mich für eine Begleitung der WAHHF Foundation bewerben. Hier sind meine Antworten aus dem Formular auf der Website: |
|  | `candidature.message.nom` | Nom complet | Vollständiger Name |
|  | `candidature.message.email` | E-mail | E-Mail |
|  | `candidature.message.telephone` | Téléphone / WhatsApp | Telefon / WhatsApp |
|  | `candidature.message.pays` | Pays de résidence | Wohnsitzland |
|  | `candidature.message.ville` | Ville | Wohnort |
|  | `candidature.message.souhait` | Souhait | Wunsch |
|  | `candidature.message.session` | Session choisie | Gewählter Kurs |
|  | `candidature.message.paysInteret` | Pays d’intérêt | Zielland |
|  | `candidature.message.niveau` | Niveau d’allemand /anglais | Niveau Deutsch/Englisch |
|  | `candidature.message.format` | Format souhaité | Gewünschtes Format |
|  | `candidature.message.message` | Message | Nachricht |
| \* | `candidature.message.accord` | J’accepte que mes coordonnées soient traitées par WAHHF Foundation dans le seul but de répondre à ma demande d’accompagnement. | Ich bin damit einverstanden, dass die WAHHF Foundation meine Kontaktdaten ausschließlich zur Beantwortung meiner Anfrage nach Begleitung verarbeitet. |
|  | `candidature.envoiTitle` | Dernière étape : envoyez votre candidature | Letzter Schritt: Senden Sie Ihre Bewerbung |
|  | `candidature.modifier` | Modifier mes réponses | Meine Antworten ändern |
| \* | `candidature.rappel` | Rappel : aucun collaborateur de WAHHF ne vous demandera d’argent par téléphone, e-mail ou WhatsApp pour traiter votre dossier. | Zur Erinnerung: Niemand von WAHHF wird Sie per Telefon, E-Mail oder WhatsApp um Geld bitten, um Ihre Bewerbungsunterlagen zu bearbeiten. |
|  | `candidature.conservees` | Vos réponses restent dans ce navigateur jusqu’à la fermeture de l’onglet. | Ihre Antworten bleiben in diesem Browser, bis Sie den Tab schließen. |
|  | `candidature.effacer` | Effacer mes réponses maintenant | Meine Antworten jetzt löschen |
|  | `candidature.effacerConseil` | (conseillé sur un téléphone ou un ordinateur partagé). | (empfohlen auf einem gemeinsam genutzten Telefon oder Computer). |
|  | `candidature.formTitle` | Votre candidature | Ihre Bewerbung |
|  | `candidature.garderTitle` | Nous avons gardé vos réponses | Wir haben Ihre Antworten gespeichert |
|  | `candidature.garderText` | Vos réponses ont été conservées dans ce navigateur. Elles seront effacées à la fermeture de l’onglet. | Ihre Antworten wurden in diesem Browser gespeichert. Sie werden gelöscht, wenn Sie den Tab schließen. |
|  | `candidature.garderEffacer` | Effacer mes réponses et recommencer | Meine Antworten löschen und neu beginnen |
|  | `candidature.sessionTitle` | Vous candidatez à cette session | Sie bewerben sich für diesen Kurs |
|  | `candidature.sessionText` | Niveau {{level}}, {{format}} : {{title}}. | Niveau {{level}}, {{format}}: {{title}}. |
|  | `candidature.sessionChanger` | Changer de session | Anderen Kurs wählen |
|  | `candidature.sessionNote` | (vous pourrez choisir votre niveau et votre format à l’étape 2) | (Niveau und Format können Sie in Schritt 2 wählen) |
|  | `candidature.position` | Étape {{step}} sur 3 | Schritt {{step}} von 3 |
|  | `candidature.etape1Text` | Ces informations servent uniquement à vous recontacter. | Diese Angaben dienen nur dazu, Sie zu kontaktieren. |
|  | `candidature.nomLabel` | Nom complet (prénom et nom) * | Vollständiger Name (Vor- und Nachname) * |
|  | `candidature.nomExemple` | Ex. Marie Nguenang | z. B. Marie Nguenang |
|  | `candidature.emailLabel` | Adresse e-mail * | E-Mail-Adresse * |
|  | `candidature.emailExemple` | exemple@domaine.com | beispiel@domain.com |
|  | `candidature.telephoneLabel` | Téléphone / WhatsApp * | Telefon / WhatsApp * |
|  | `candidature.telephoneExemple` | Ex. +237 6... | z. B. +237 6... |
|  | `candidature.paysLabel` | Pays de résidence actuel * | Aktuelles Wohnsitzland * |
|  | `candidature.villeLabel` | Ville de résidence * | Wohnort * |
|  | `candidature.villeExemple` | Ex. Douala, Yaoundé, Bafoussam, Garoua... | z. B. Douala, Yaoundé, Bafoussam, Garoua... |
|  | `candidature.versEtape2` | Continuer vers l’étape 2 | Weiter zu Schritt 2 |
|  | `candidature.etape2Text` | Précisez le volet qui vous intéresse ainsi que votre niveau linguistique actuel. | Geben Sie an, welcher Bereich Sie interessiert und welches Sprachniveau Sie zurzeit haben. |
|  | `candidature.souhaitLegend` | Que souhaitez-vous ? * | Was wünschen Sie sich? * |
|  | `candidature.paysInteretLabel` | Pays d’intérêt principal parmi les 10 pays accompagnés | Wichtigstes Zielland unter den 10 begleiteten Ländern |
|  | `candidature.horsUE` | (hors Union européenne) | (außerhalb der Europäischen Union) |
|  | `candidature.niveauLabel` | Niveau d’allemand /anglais actuel / visé | Aktuelles / angestrebtes Niveau Deutsch/Englisch |
|  | `candidature.niveaux.A1` | A1 — Débutant complet | A1 — Absolute Anfänger |
|  | `candidature.niveaux.A2` | A2 — Bases élémentaires | A2 — Elementare Grundkenntnisse |
|  | `candidature.niveaux.B1` | B1 — Niveau intermédiaire | B1 — Mittelstufe |
|  | `candidature.niveaux.B2` | B2 — Niveau avancé | B2 — Fortgeschrittenes Niveau |
|  | `candidature.niveaux.C1` | C1 — Niveau académique | C1 — Akademisches Niveau |
|  | `candidature.formatLabel` | Format souhaité | Gewünschtes Format |
|  | `candidature.precedente` | Étape précédente | Vorheriger Schritt |
|  | `candidature.versEtape3` | Continuer vers l’étape 3 | Weiter zu Schritt 3 |
|  | `candidature.etape3Text` | Présentez brièvement votre parcours, puis validez votre demande. | Beschreiben Sie kurz Ihren Werdegang und bestätigen Sie dann Ihre Anfrage. |
|  | `candidature.messageLabel` | Message libre (études actuelles, objectifs, disponibilités) | Ihre Nachricht (aktuelles Studium, Ziele, zeitliche Verfügbarkeit) |
|  | `candidature.messageExemple` | Expliquez en quelques lignes votre motivation et votre projet... | Beschreiben Sie in wenigen Zeilen Ihre Motivation und Ihr Vorhaben... |
|  | `candidature.aucunDocument` | Aucun document d’identité ni aucun paiement ne vous est demandé à cette étape. | In diesem Schritt verlangen wir weder ein Ausweisdokument noch eine Zahlung. |
| \* | `candidature.accord` | J’accepte que mes coordonnées soient traitées de manière strictement confidentielle par WAHHF Foundation dans le seul but de répondre à ma demande d’accompagnement, conformément à la &lt;lien>politique de confidentialité&lt;nouvel> (nouvel onglet)&lt;/nouvel>&lt;/lien>. * | Ich bin damit einverstanden, dass die WAHHF Foundation meine Kontaktdaten streng vertraulich und ausschließlich zur Beantwortung meiner Anfrage nach Begleitung verarbeitet, gemäß der &lt;lien>Datenschutzerklärung&lt;nouvel> (neuer Tab)&lt;/nouvel>&lt;/lien>. * |
|  | `candidature.preparer` | Préparer l’envoi de ma candidature | Versand meiner Bewerbung vorbereiten |
| \* | `contenu.niveaux.a1.shortTitle` | Découverte | Einstieg |
|  | `contenu.niveaux.a1.subtitle` | Comprendre et utiliser des expressions familières et quotidiennes. | Vertraute, alltägliche Ausdrücke verstehen und verwenden. |
|  | `contenu.niveaux.a1.duration` | 10 à 12 semaines (indicatif — TODO) | 10 bis 12 Wochen (Richtwert — TODO) |
| \* | `contenu.niveaux.a1.hours` | 80 heures d’accompagnement | 80 Stunden Lernbegleitung |
|  | `contenu.niveaux.a1.prerequisites` | Aucun prérequis en allemand. Ouvert aux grands débutants. | Keine Deutschkenntnisse nötig. Offen für absolute Anfänger. |
|  | `contenu.niveaux.a1.nextSession` | Septembre 2026 (TODO : confirmer date) | September 2026 (TODO: Datum bestätigen) |
|  | `contenu.niveaux.a1.objectives[0]` | Maîtriser l’alphabet, la prononciation et les structures de phrase simples | Alphabet, Aussprache und einfache Satzstrukturen beherrschen |
|  | `contenu.niveaux.a1.objectives[1]` | Se présenter, poser des questions simples sur l’environnement immédiat | Sich vorstellen und einfache Fragen zum direkten Umfeld stellen |
|  | `contenu.niveaux.a1.objectives[2]` | Acquérir le vocabulaire de la vie quotidienne (famille, logement, achats, horaires) | Den Wortschatz des Alltags lernen (Familie, Wohnen, Einkaufen, Uhrzeiten) |
|  | `contenu.niveaux.a1.canDo[0]` | Se présenter et présenter quelqu’un en allemand | Sich selbst und andere auf Deutsch vorstellen |
|  | `contenu.niveaux.a1.canDo[1]` | Remplir un formulaire simple avec ses coordonnées personnelles | Ein einfaches Formular mit den eigenen Angaben ausfüllen |
|  | `contenu.niveaux.a1.canDo[2]` | Comprendre des annonces courtes et des indications simples | Kurze Durchsagen und einfache Hinweise verstehen |
|  | `contenu.niveaux.a1.examTarget` | Préparation au Goethe-Zertifikat A1 : Start Deutsch 1 / telc Deutsch A1 (TODO : à vérifier) | Vorbereitung auf das Goethe-Zertifikat A1: Start Deutsch 1 / telc Deutsch A1 (TODO: zu prüfen) |
|  | `contenu.niveaux.a2.shortTitle` | Échanges courants | Alltagsgespräche |
|  | `contenu.niveaux.a2.subtitle` | Communiquer lors de tâches simples et habituelles du quotidien. | In einfachen, routinemäßigen Alltagssituationen kommunizieren. |
|  | `contenu.niveaux.a2.duration` | 10 à 12 semaines (indicatif — TODO) | 10 bis 12 Wochen (Richtwert — TODO) |
|  | `contenu.niveaux.a2.hours` | 90 heures d’accompagnement | 90 Stunden Lernbegleitung |
|  | `contenu.niveaux.a2.prerequisites` | Avoir validé le niveau A1 ou réussi le test d’orientation gratuit. | Niveau A1 abgeschlossen oder den kostenlosen Einstufungstest bestanden. |
|  | `contenu.niveaux.a2.nextSession` | Octobre 2026 (TODO : confirmer date) | Oktober 2026 (TODO: Datum bestätigen) |
|  | `contenu.niveaux.a2.objectives[0]` | Exprimer son parcours scolaire, son environnement et ses besoins directs | Über die eigene Schulzeit, das Umfeld und unmittelbare Bedürfnisse sprechen |
|  | `contenu.niveaux.a2.objectives[1]` | Maîtriser le passé composé (Perfekt), les verbes de modalité et les subordonnées de base | Das Perfekt, Modalverben und einfache Nebensätze beherrschen |
|  | `contenu.niveaux.a2.objectives[2]` | Lire des courriels courts, des offres d’information et des documents usuels | Kurze E-Mails, Informationsangebote und alltägliche Dokumente lesen |
|  | `contenu.niveaux.a2.canDo[0]` | Décrire sa formation et ses expériences de façon simple | Die eigene Ausbildung und Erfahrungen einfach beschreiben |
|  | `contenu.niveaux.a2.canDo[1]` | Échanger sur des sujets familiers (santé, travail, déplacements) | Sich über vertraute Themen austauschen (Gesundheit, Arbeit, Reisen) |
|  | `contenu.niveaux.a2.canDo[2]` | Rédiger des messages courts et structurés | Kurze, klar gegliederte Nachrichten schreiben |
|  | `contenu.niveaux.a2.examTarget` | Préparation au Goethe-Zertifikat A2 / telc Deutsch A2 (TODO : à vérifier) | Vorbereitung auf das Goethe-Zertifikat A2 / telc Deutsch A2 (TODO: zu prüfen) |
|  | `contenu.niveaux.b1.shortTitle` | Autonomie | Selbstständigkeit |
|  | `contenu.niveaux.b1.subtitle` | Être autonome dans la plupart des situations de voyage, d’études ou de formation. | In den meisten Situationen auf Reisen, im Studium oder in der Ausbildung selbstständig zurechtkommen. |
|  | `contenu.niveaux.b1.duration` | 12 à 14 semaines (indicatif — TODO) | 12 bis 14 Wochen (Richtwert — TODO) |
|  | `contenu.niveaux.b1.hours` | 120 heures d’accompagnement | 120 Stunden Lernbegleitung |
|  | `contenu.niveaux.b1.prerequisites` | Avoir validé le niveau A2. | Niveau A2 abgeschlossen. |
|  | `contenu.niveaux.b1.nextSession` | Octobre 2026 (TODO : confirmer date) | Oktober 2026 (TODO: Datum bestätigen) |
|  | `contenu.niveaux.b1.objectives[0]` | Comprendre les points essentiels d’une discussion claire sur le travail, l’école ou les loisirs | Die Hauptpunkte eines klaren Gesprächs über Arbeit, Schule oder Freizeit verstehen |
| \* | `contenu.niveaux.b1.objectives[1]` | Raconter un événement, expliquer un projet d’études ou de formation professionnelle (Ausbildung) | Ein Ereignis erzählen, ein Vorhaben für Studium oder Ausbildung erklären |
|  | `contenu.niveaux.b1.objectives[2]` | Rédiger une lettre de motivation et un curriculum vitae aux normes germanophones | Ein Anschreiben und einen Lebenslauf nach deutschsprachigen Standards verfassen |
|  | `contenu.niveaux.b1.canDo[0]` | Participer sans préparation à une conversation sur des sujets familiers | Ohne Vorbereitung an einem Gespräch über vertraute Themen teilnehmen |
|  | `contenu.niveaux.b1.canDo[1]` | Défendre brièvement une opinion ou expliquer un choix de parcours | Kurz eine Meinung vertreten oder die Wahl des eigenen Bildungswegs erklären |
|  | `contenu.niveaux.b1.canDo[2]` | Se débrouiller dans les démarches administratives courantes en langue allemande | Alltägliche Behördengänge auf Deutsch bewältigen |
|  | `contenu.niveaux.b1.examTarget` | Préparation au Goethe-Zertifikat B1 / telc Deutsch B1 (TODO : à vérifier) | Vorbereitung auf das Goethe-Zertifikat B1 / telc Deutsch B1 (TODO: zu prüfen) |
|  | `contenu.niveaux.b2.shortTitle` | Indépendance | Unabhängigkeit |
|  | `contenu.niveaux.b2.subtitle` | Communiquer avec spontanéité et comprendre des textes complexes. | Spontan kommunizieren und komplexe Texte verstehen. |
|  | `contenu.niveaux.b2.duration` | 14 à 16 semaines (indicatif — TODO) | 14 bis 16 Wochen (Richtwert — TODO) |
|  | `contenu.niveaux.b2.hours` | 140 heures d’accompagnement | 140 Stunden Lernbegleitung |
|  | `contenu.niveaux.b2.prerequisites` | Avoir validé le niveau B1. | Niveau B1 abgeschlossen. |
|  | `contenu.niveaux.b2.nextSession` | Novembre 2026 (TODO : confirmer date) | November 2026 (TODO: Datum bestätigen) |
|  | `contenu.niveaux.b2.objectives[0]` | Comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe | Die Hauptinhalte konkreter oder abstrakter Themen in einem komplexen Text verstehen |
|  | `contenu.niveaux.b2.objectives[1]` | Participer à des discussions techniques dans son domaine de spécialité | An Fachdiskussionen im eigenen Fachgebiet teilnehmen |
|  | `contenu.niveaux.b2.objectives[2]` | S’exprimer de façon claire, détaillée et nuancée à l’oral comme à l’écrit | Sich mündlich wie schriftlich klar, ausführlich und differenziert ausdrücken |
|  | `contenu.niveaux.b2.canDo[0]` | Suivre des cours préparatoires ou une formation professionnelle exigeante en allemand | Vorbereitungskurse oder eine anspruchsvolle Berufsausbildung auf Deutsch absolvieren |
|  | `contenu.niveaux.b2.canDo[1]` | Argumenter de manière structurée lors d’un entretien académique ou professionnel | In einem akademischen oder beruflichen Gespräch strukturiert argumentieren |
|  | `contenu.niveaux.b2.canDo[2]` | Rédiger des synthèses et des courriers formels précis | Präzise Zusammenfassungen und formelle Schreiben verfassen |
|  | `contenu.niveaux.b2.examTarget` | Préparation au Goethe-Zertifikat B2 / telc Deutsch B2 (TODO : à vérifier) | Vorbereitung auf das Goethe-Zertifikat B2 / telc Deutsch B2 (TODO: zu prüfen) |
| \* | `contenu.niveaux.c1.shortTitle` | Maîtrise | Sprachbeherrschung |
|  | `contenu.niveaux.c1.subtitle` | Utiliser la langue de façon souple et efficace dans la vie universitaire et sociale. | Die Sprache im Studium und im gesellschaftlichen Leben flexibel und wirksam einsetzen. |
|  | `contenu.niveaux.c1.duration` | 16 semaines (indicatif — TODO) | 16 Wochen (Richtwert — TODO) |
|  | `contenu.niveaux.c1.hours` | 160 heures d’accompagnement | 160 Stunden Lernbegleitung |
|  | `contenu.niveaux.c1.prerequisites` | Avoir validé le niveau B2. | Niveau B2 abgeschlossen. |
|  | `contenu.niveaux.c1.nextSession` | Janvier 2027 (TODO : confirmer date) | Januar 2027 (TODO: Datum bestätigen) |
|  | `contenu.niveaux.c1.objectives[0]` | Comprendre une grande gamme de textes longs et exigeants et saisir les significations implicites | Ein breites Spektrum langer, anspruchsvoller Texte verstehen und implizite Bedeutungen erfassen |
|  | `contenu.niveaux.c1.objectives[1]` | S’exprimer spontanément et couramment sans chercher ses mots de façon apparente | Sich spontan und fließend ausdrücken, ohne erkennbar nach Worten zu suchen |
|  | `contenu.niveaux.c1.objectives[2]` | Maîtriser la méthodologie d’écriture scientifique et académique universitaire | Die Methodik des wissenschaftlichen und akademischen Schreibens an der Universität beherrschen |
|  | `contenu.niveaux.c1.canDo[0]` | Suivre un cursus universitaire complet en langue allemande | Ein komplettes Studium auf Deutsch absolvieren |
|  | `contenu.niveaux.c1.canDo[1]` | Présenter des exposés complexes et répondre à des questions pointues | Komplexe Referate halten und auf anspruchsvolle Fragen antworten |
|  | `contenu.niveaux.c1.canDo[2]` | Rédiger des textes structurés sur des sujets académiques complexes | Gut strukturierte Texte zu komplexen akademischen Themen verfassen |
|  | `contenu.niveaux.c1.examTarget` | Préparation au TestDaF / Goethe-Zertifikat C1 / telc Deutsch C1 Hochschule (TODO : à vérifier) | Vorbereitung auf den TestDaF / das Goethe-Zertifikat C1 / telc Deutsch C1 Hochschule (TODO: zu prüfen) |
|  | `contenu.sessions.sess-a1-online.title` | Allemand A1 : fondations et communication quotidienne | Deutsch A1: Grundlagen und Alltagskommunikation |
|  | `contenu.sessions.sess-a1-online.days` | Lundi, Mercredi, Vendredi (18h00 – 20h00) | Montag, Mittwoch, Freitag (18:00–20:00 Uhr) |
|  | `contenu.sessions.sess-a1-online.duration` | 12 semaines | 12 Wochen |
|  | `contenu.sessions.sess-a1-dla.title` | Allemand A1 : cohorte en présentiel à Douala | Deutsch A1: Kursgruppe vor Ort in Douala |
|  | `contenu.sessions.sess-a1-dla.days` | Mardi, Jeudi (16h00 – 18h30) & Samedi matin | Dienstag, Donnerstag (16:00–18:30 Uhr) und Samstagvormittag |
|  | `contenu.sessions.sess-a1-dla.duration` | 12 semaines | 12 Wochen |
|  | `contenu.sessions.sess-a2-online.title` | Allemand A2 : consolidation et autonomie au quotidien | Deutsch A2: Festigung und Selbstständigkeit im Alltag |
|  | `contenu.sessions.sess-a2-online.days` | Mardi, Jeudi (18h30 – 20h30) & Samedi (10h00 – 12h00) | Dienstag, Donnerstag (18:30–20:30 Uhr) und Samstag (10:00–12:00 Uhr) |
|  | `contenu.sessions.sess-a2-online.duration` | 12 semaines | 12 Wochen |
| \* | `contenu.sessions.sess-b1-online.title` | Allemand B1 : parcours études et formation (Ausbildung) | Deutsch B1: Kurs für Studium und Ausbildung |
|  | `contenu.sessions.sess-b1-online.days` | Lundi, Mercredi, Vendredi (18h30 – 21h00) | Montag, Mittwoch, Freitag (18:30–21:00 Uhr) |
|  | `contenu.sessions.sess-b1-online.duration` | 14 semaines | 14 Wochen |
|  | `contenu.sessions.sess-b1-yde.title` | Allemand B1 : atelier intensif à Yaoundé | Deutsch B1: Intensivworkshop in Yaoundé |
|  | `contenu.sessions.sess-b1-yde.days` | Mercredi, Vendredi (16h00 – 18h30) & Samedi | Mittwoch, Freitag (16:00–18:30 Uhr) und Samstag |
|  | `contenu.sessions.sess-b1-yde.duration` | 14 semaines | 14 Wochen |
|  | `contenu.sessions.sess-b2-online.title` | Allemand B2 : expression avancée et dossiers techniques | Deutsch B2: fortgeschrittener Ausdruck und Fachthemen |
|  | `contenu.sessions.sess-b2-online.days` | Mardi, Jeudi (18h30 – 21h00) & Samedi (14h00 – 16h30) | Dienstag, Donnerstag (18:30–21:00 Uhr) und Samstag (14:00–16:30 Uhr) |
|  | `contenu.sessions.sess-b2-online.duration` | 15 semaines | 15 Wochen |
|  | `contenu.sessions.sess-c1-online.title` | Allemand C1 : préparation universitaire et TestDaF | Deutsch C1: Studienvorbereitung und TestDaF |
|  | `contenu.sessions.sess-c1-online.days` | Lundi, Jeudi (19h00 – 21h30) & Samedi (09h00 – 12h00) | Montag, Donnerstag (19:00–21:30 Uhr) und Samstag (9:00–12:00 Uhr) |
|  | `contenu.sessions.sess-c1-online.duration` | 16 semaines | 16 Wochen |

## nos-actions

Fichier : `src/locales/nos-actions/de.json` (8 textes, dont 1 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Nos 6 domaines d'action — Éducation, santé, entrepreneuriat, environnement, droits, mobilité | Unsere 6 Arbeitsbereiche — Bildung, Gesundheit, Unternehmertum, Umwelt, Rechte, Mobilität |
|  | `seo.description` | Découvrez les 6 domaines d'intervention de WAHHF Foundation au Cameroun et vers l'Europe, et soutenez celui de votre choix. | Entdecken Sie die 6 Arbeitsbereiche der WAHHF Foundation in Kamerun und in Richtung Europa – und unterstützen Sie den Bereich Ihrer Wahl. |
| \* | `title` | Agir sur tous les leviers de l’autonomie humaine | An allen Hebeln menschlicher Selbstständigkeit ansetzen |
|  | `intro` | Éducation, santé, entrepreneuriat des jeunes, environnement, droits et inclusion, Mobilité & Langues : les six domaines où la fondation agit. Vous pouvez soutenir celui de votre choix. | Bildung, Gesundheit, Unternehmertum junger Menschen, Umwelt, Rechte und Teilhabe, Mobilität & Sprachen: die sechs Bereiche, in denen die Stiftung arbeitet. Sie können den Bereich Ihrer Wahl unterstützen. |
|  | `navLabel` | Les six domaines | Die sechs Bereiche |
|  | `discoverMobility` | Découvrir Mobilité & Langues | Mobilität & Sprachen entdecken |
|  | `support` | Soutenir ce domaine | Diesen Bereich unterstützen |
|  | `supportLabel` | Soutenir ce domaine : {{domain}} | Diesen Bereich unterstützen: {{domain}} |

## notre-impact

Fichier : `src/locales/notre-impact/de.json` (12 textes, dont 2 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Notre impact — Présence au Cameroun et orientation vers 10 pays européens | Unsere Wirkung — Präsenz in Kamerun und Orientierung für 10 europäische Länder |
|  | `seo.description` | Où agit WAHHF Foundation : basée à Yaoundé et Douala, au Cameroun, elle informe les jeunes sur les études, la formation et le travail dans 10 pays européens. | Wo die WAHHF Foundation arbeitet: Mit Sitz in Yaoundé und Douala in Kamerun informiert sie junge Menschen über Studium, Ausbildung und Arbeit in 10 europäischen Ländern. |
| \* | `title` | Un impact concret, mesuré avec humilité et transparence | Konkrete Wirkung, mit Bescheidenheit und Transparenz gemessen |
|  | `intro` | Voici où la fondation est présente au Cameroun, et les 10 pays européens sur lesquels elle informe les jeunes. Les résultats chiffrés seront publiés ici quand ils seront datés et vérifiés. | Hier sehen Sie, wo die Stiftung in Kamerun präsent ist und über welche 10 europäischen Länder sie junge Menschen informiert. Ergebnisse in Zahlen veröffentlichen wir hier, sobald sie datiert und geprüft sind. |
|  | `field.title` | Nos actions, en images | Unsere Arbeit in Bildern |
| \* | `field.subtitle` | Quelques moments de nos journées et de nos sorties. Les albums complets sont dans la galerie. | Einige Momente von unseren Veranstaltungstagen und Ausflügen. Die vollständigen Alben finden Sie in der Galerie. |
|  | `field.gallery` | Voir la galerie | Zur Galerie |
|  | `transparency.title` | Consulter nos engagements de transparence financière | Unsere Verpflichtungen zur finanziellen Transparenz |
|  | `transparency.subtitle` | Découvrez comment les ressources du groupe IROKO et les dons sont affectés aux missions sociales. | Erfahren Sie, wie die Mittel der IROKO-Gruppe und die Spenden für die sozialen Aufgaben eingesetzt werden. |
|  | `transparency.cta` | Voir la page Transparence | Zur Seite Transparenz |
|  | `support.title` | Soutenir nos actions | Unsere Arbeit unterstützen |
|  | `support.subtitle` | Votre don finance des cours d’allemand /anglais et nos actions au Cameroun. Vous pouvez choisir le domaine qu’il soutient. | Ihre Spende finanziert Deutsch- und Englischkurse und unsere Arbeit in Kamerun. Sie können wählen, welchen Bereich sie unterstützt. |

## partenaires

Fichier : `src/locales/partenaires/de.json` (11 textes, dont 2 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Partenaires — Le groupe IROKO et les soutiens de WAHHF Foundation | Partner — Die IROKO-Gruppe und die Förderer der WAHHF Foundation |
|  | `seo.description` | Découvrez le rôle du groupe IROKO, partenaire fondateur de WAHHF Foundation, et comment devenir partenaire de la fondation. | Erfahren Sie mehr über die Rolle der IROKO-Gruppe, Gründungspartner der WAHHF Foundation, und wie Sie Partner der Stiftung werden. |
|  | `title` | Nos partenaires et nos soutiens | Unsere Partner und Förderer |
|  | `intro` | WAHHF Foundation est soutenue par le groupe IROKO, dont elle est la branche sociale, et par ses donateurs. Aucun autre partenaire n’est nommé sans son accord écrit. | Die WAHHF Foundation wird von der IROKO-Gruppe, deren sozialer Zweig sie ist, und von ihren Spenderinnen und Spendern unterstützt. Weitere Partner nennen wir nur mit ihrer schriftlichen Zustimmung. |
| \* | `iroko.title` | Le groupe IROKO, partenaire fondateur | Die IROKO-Gruppe, Gründungspartner |
| \* | `iroko.p1` | IROKO est un groupe camerouno-allemand organisé autour d’une holding et de neuf pôles d’activité, en trois familles : Business (communication et événementiel, formation, ingénierie), Digital (applications, logiciels de gestion, hébergement) et Services et support (audiovisuel, cybersécurité, investissement). Son pôle de communication et d’événementiel, IROKO Event, est en activité ; les autres sont annoncés. | IROKO ist eine kamerunisch-deutsche Unternehmensgruppe aus einer Holding und neun Geschäftsbereichen in drei Familien: Business (Kommunikation und Veranstaltungen, Weiterbildung, Ingenieurwesen), Digital (Anwendungen, Verwaltungssoftware, Hosting) sowie Services und Support (Audiovisuelles, Cybersicherheit, Investitionen). Ihr Geschäftsbereich für Kommunikation und Veranstaltungen, IROKO Event, ist bereits tätig; die übrigen sind angekündigt. |
|  | `iroko.p2` | WAHHF Foundation est sa branche sociale. Le groupe finance l’Académie de langues (allemand /anglais A1 à C1) et les supports d’orientation vérifiés vers l’Europe. | Die WAHHF Foundation ist ihr sozialer Zweig. Die Gruppe finanziert die Sprachakademie (Deutsch/Englisch A1 bis C1) und die geprüften Orientierungsmaterialien für Europa. |
|  | `offers.title` | Ce que nous proposons | Was wir anbieten |
|  | `cta.title` | Devenir partenaire de WAHHF Foundation | Partner der WAHHF Foundation werden |
|  | `cta.subtitle` | Vous représentez une université, un centre de formation, une ONG, un établissement médical ou une entreprise engagée ? Construisons ensemble un programme à impact mesurable. | Sie vertreten eine Universität, ein Ausbildungszentrum, eine NGO, eine medizinische Einrichtung oder ein engagiertes Unternehmen? Lassen Sie uns gemeinsam ein Programm mit messbarer Wirkung aufbauen. |
|  | `cta.button` | Proposer un partenariat | Partnerschaft vorschlagen |

## photos

Fichier : `src/locales/photos/de.json` (143 textes, dont 10 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
| \* | `contenu.albums.journee-2026-04-25.title` | Journée du 25 avril 2026 — Albatros Hotel | Veranstaltung vom 25. April 2026 — Albatros Hotel |
|  | `contenu.albums.journee-2026-04-25.note` | Nom exact de l'événement à confirmer (la banderole indique : Albatros Hotel, 25 avril 2026, 8 h–21 h). | Genauer Name der Veranstaltung noch zu bestätigen (auf dem Banner steht: Albatros Hotel, 25. April 2026, 8:00–21:00 Uhr). |
|  | `contenu.albums.terrain-agricole.title` | Visite de terrain dans une plantation | Exkursion in eine Plantage |
|  | `contenu.albums.terrain-agricole.note` | Lieu et date à confirmer. | Ort und Datum noch zu bestätigen. |
|  | `contenu.albums.nkongsamba.title` | Sortie à Nkongsamba | Ausflug nach Nkongsamba |
|  | `contenu.albums.nkongsamba.note` | Date et contexte à confirmer. | Datum und Kontext noch zu bestätigen. |
|  | `contenu.albums.mont-et-lac.title` | Sortie au mont et au lac | Ausflug zum Berg und zum See |
|  | `contenu.albums.mont-et-lac.note` | Lieu à confirmer (lac de cratère). | Ort noch zu bestätigen (Kratersee). |
|  | `contenu.albums.randonnee-jeunesse.title` | Randonnée avec les jeunes | Wanderung mit jungen Menschen |
|  | `contenu.albums.randonnee-jeunesse.note` | Lieu et date à confirmer. | Ort und Datum noch zu bestätigen. |
| \* | `contenu.photos.A02.alt` | Banderole de la WAHHF Foundation sur la façade de l'Albatros Hotel : « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » | Banner der WAHHF Foundation an der Fassade des Albatros Hotel: „Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse“ |
|  | `contenu.photos.A07.alt` | Participants rassemblés devant l'Albatros Hotel avant le début de la journée | Teilnehmende versammeln sich vor Beginn des Tages vor dem Albatros Hotel |
| \* | `contenu.photos.A12.alt` | Un membre de l'équipe pose à côté du kakémono de la fondation | Ein Teammitglied posiert neben dem Roll-up der Stiftung |
|  | `contenu.photos.A13.alt` | Kakémono orange de la fondation : « Showing hope, harvesting change » | Orangefarbenes Roll-up der Stiftung: „Showing hope, harvesting change“ |
|  | `contenu.photos.A14.alt` | Kakémono de la fondation présentant ses domaines d'action | Roll-up der Stiftung mit ihren Handlungsfeldern |
|  | `contenu.photos.A16.alt` | Jeunes participants vus de dos, en t-shirts « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » | Junge Teilnehmende von hinten, in T-Shirts mit der Aufschrift „Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse“ |
|  | `contenu.photos.A17.alt` | Salle de conférence vue depuis le fond, participants assis face à l'écran | Konferenzsaal von hinten gesehen, die Teilnehmenden sitzen vor der Leinwand |
|  | `contenu.photos.A18.alt` | Accueil et inscription des participants près du kakémono | Empfang und Anmeldung der Teilnehmenden neben dem Roll-up |
|  | `contenu.photos.A22.alt` | Préparation des ordinateurs avant les présentations | Vorbereitung der Computer vor den Präsentationen |
|  | `contenu.photos.A23.alt` | Salle remplie, kakémono de la fondation au fond | Voller Saal, im Hintergrund das Roll-up der Stiftung |
|  | `contenu.photos.A26.alt` | Vue d'ensemble de la salle pendant l'installation | Gesamtansicht des Saals während des Aufbaus |
|  | `contenu.photos.A27.alt` | Salle comble pendant une présentation, kakémonos de la fondation de chaque côté de l'écran | Vollbesetzter Saal während einer Präsentation, links und rechts der Leinwand die Roll-ups der Stiftung |
|  | `contenu.photos.A29.alt` | Logo de la fondation projeté sur l'écran de la salle | Das Logo der Stiftung auf der Leinwand im Saal |
|  | `contenu.photos.A30.alt` | Participants de dos face au kakémono de la fondation | Teilnehmende von hinten, vor dem Roll-up der Stiftung |
| \* | `contenu.photos.A31.alt` | Parents et aînés assis au premier rang | Eltern und ältere Menschen sitzen in der ersten Reihe |
|  | `contenu.photos.A33.alt` | Jeunes participantes attentives pendant une présentation | Junge Teilnehmerinnen folgen aufmerksam einer Präsentation |
|  | `contenu.photos.A34.alt` | Un participant prend la parole au micro pendant les échanges | Ein Teilnehmer spricht während der Diskussion ins Mikrofon |
|  | `contenu.photos.A36.alt` | Jeunes participants debout dans la salle | Junge Teilnehmende stehen im Saal |
|  | `contenu.photos.A37.alt` | Un jeune homme écoute une présentation | Ein junger Mann hört einer Präsentation zu |
|  | `contenu.photos.A38.alt` | Jeune participant en polo de la fondation | Junger Teilnehmer im Poloshirt der Stiftung |
|  | `contenu.photos.A41.alt` | Intervenant en polo rose au pupitre, micro en main | Redner im rosa Poloshirt am Rednerpult, Mikrofon in der Hand |
|  | `contenu.photos.A42.alt` | Intervenant assis à la table technique | Redner sitzt am Technikpult |
|  | `contenu.photos.A44.alt` | Deux intervenants au pupitre | Zwei Redner am Rednerpult |
|  | `contenu.photos.A45.alt` | Intervenant en veste bleue, micro en main | Redner in blauer Jacke, Mikrofon in der Hand |
|  | `contenu.photos.A46.alt` | Intervenant présentant devant l'écran et le kakémono | Redner präsentiert vor der Leinwand und dem Roll-up |
|  | `contenu.photos.A48.alt` | Projection de photos de terrain pendant une présentation | Fotos aus der Arbeit vor Ort werden während einer Präsentation gezeigt |
|  | `contenu.photos.A51.alt` | Présentation devant la salle, photos d'actions projetées | Präsentation vor dem Saal, Fotos von Aktionen auf der Leinwand |
|  | `contenu.photos.A53.alt` | Présentation « Der Hochschulvergleich » sur les études en Allemagne | Präsentation „Der Hochschulvergleich“ über das Studium in Deutschland |
|  | `contenu.photos.A56.alt` | Intervenant présentant face au public | Redner präsentiert vor dem Publikum |
|  | `contenu.photos.A57.alt` | Photos d'actions projetées devant le public | Fotos von Aktionen werden vor dem Publikum gezeigt |
|  | `contenu.photos.A59.alt` | Intervenant devant la diapositive de présentation de la fondation | Redner vor der Folie, die die Stiftung vorstellt |
|  | `contenu.photos.A60.alt` | Diapositive présentant les domaines d'action de la fondation | Folie mit den Handlungsfeldern der Stiftung |
|  | `contenu.photos.A61.alt` | Intervenant au pupitre dans une salle baignée de lumière | Redner am Rednerpult in einem lichtdurchfluteten Saal |
| \* | `contenu.photos.A63.alt` | Intervenant devant les pictogrammes Éducation, Santé et Moyens de subsistance | Redner vor den Piktogrammen Bildung, Gesundheit und Lebensgrundlagen |
|  | `contenu.photos.A66.alt` | Intervenant présentant les domaines d'action de la fondation | Redner stellt die Handlungsfelder der Stiftung vor |
|  | `contenu.photos.A68.alt` | Intervenant sur la scène, devant le kakémono | Redner auf der Bühne, vor dem Roll-up |
|  | `contenu.photos.A71.alt` | Portrait d'un intervenant pendant sa présentation | Porträt eines Redners während seiner Präsentation |
|  | `contenu.photos.A74.alt` | Intervenant s'adressant à la salle, bras ouverts | Redner wendet sich mit offenen Armen an den Saal |
|  | `contenu.photos.A77.alt` | Intervenant parlant au micro | Redner spricht ins Mikrofon |
|  | `contenu.photos.A80.alt` | Le public debout dans la salle | Das Publikum steht im Saal |
|  | `contenu.photos.A81.alt` | Les jeunes chantent l'hymne de la WAHHF Foundation sur scène | Die jungen Menschen singen auf der Bühne die Hymne der WAHHF Foundation |
|  | `contenu.photos.A83.alt` | L'hymne de la fondation vu depuis le public | Die Hymne der Stiftung, vom Publikum aus gesehen |
|  | `contenu.photos.A85.alt` | Chant de l'hymne de la fondation, bras levés | Die Hymne der Stiftung wird mit erhobenen Armen gesungen |
|  | `contenu.photos.A87.alt` | Vue large de la scène pendant l'hymne | Gesamtansicht der Bühne während der Hymne |
|  | `contenu.photos.A88.alt` | Trois aînés assis, attentifs | Drei ältere Menschen sitzen da und hören aufmerksam zu |
|  | `contenu.photos.A89.alt` | Jeunes participantes souriantes | Lächelnde junge Teilnehmerinnen |
|  | `contenu.photos.A90.alt` | Participante en polo rose de la fondation | Teilnehmerin im rosa Poloshirt der Stiftung |
|  | `contenu.photos.A92.alt` | Jeunes participantes à l'écoute | Junge Teilnehmerinnen hören zu |
|  | `contenu.photos.A95.alt` | Jeune participant pensif | Nachdenklicher junger Teilnehmer |
|  | `contenu.photos.A97.alt` | Trois jeunes participants | Drei junge Teilnehmende |
|  | `contenu.photos.A98.alt` | Un participant prend des notes | Ein Teilnehmer macht sich Notizen |
|  | `contenu.photos.A99.alt` | Membre de la fondation en polo rose, bras croisés | Mitglied der Stiftung im rosa Poloshirt, mit verschränkten Armen |
|  | `contenu.photos.B03.alt` | Groupe en gilets réfléchissants avant le départ | Gruppe in Warnwesten vor dem Aufbruch |
|  | `contenu.photos.B04.alt` | Jeunes en gilets orange écoutant un encadrant dans une plantation d'ananas | Junge Menschen in orangefarbenen Westen hören in einer Ananasplantage einem Betreuer zu |
|  | `contenu.photos.B06.alt` | Deux encadrants échangent au bord d'un champ | Zwei Betreuer unterhalten sich am Rand eines Feldes |
|  | `contenu.photos.B10.alt` | Groupe en gilets réfléchissants au milieu d'un champ d'ananas | Gruppe in Warnwesten mitten in einem Ananasfeld |
|  | `contenu.photos.B13.alt` | Le groupe se répartit dans la plantation | Die Gruppe verteilt sich in der Plantage |
|  | `contenu.photos.B16.alt` | Participants observant les plants d'ananas | Teilnehmende betrachten die Ananaspflanzen |
|  | `contenu.photos.B17.alt` | Le groupe de la visite au milieu de la plantation, sous un grand ciel | Die Besuchsgruppe mitten in der Plantage, unter weitem Himmel |
|  | `contenu.photos.B20.alt` | Vue large du groupe dans la plantation | Gesamtansicht der Gruppe in der Plantage |
|  | `contenu.photos.B21.alt` | Un encadrant accroupi examine un plant | Ein Betreuer untersucht in der Hocke eine Pflanze |
|  | `contenu.photos.B23.alt` | Deux encadrants en discussion près des hautes herbes | Zwei Betreuer im Gespräch neben hohem Gras |
|  | `contenu.photos.B24.alt` | Encadrants échangeant sur le terrain | Betreuer im Gespräch vor Ort |
|  | `contenu.photos.B26.alt` | Photo de groupe des participants en gilets réfléchissants | Gruppenfoto der Teilnehmenden in Warnwesten |
|  | `contenu.photos.B27.alt` | Jeunes en gilets écoutant une explication sur le terrain | Junge Menschen in Westen hören vor Ort einer Erklärung zu |
|  | `contenu.photos.B01.alt` | Route en terre détrempée en travaux | Aufgeweichte unbefestigte Straße mit Bauarbeiten |
|  | `contenu.photos.B02.alt` | Pelleteuse sur un chantier de route, collines en arrière-plan | Bagger auf einer Straßenbaustelle, im Hintergrund Hügel |
|  | `contenu.photos.B09.alt` | Pelleteuse en travaux sur une route | Bagger bei der Arbeit auf einer Straße |
|  | `contenu.photos.B51.alt` | Participants sous l'arche « I love my town Nkongsamba 1er – Ville propre » | Teilnehmende unter dem Bogen „I love my town Nkongsamba 1er – Ville propre“ |
|  | `contenu.photos.B53.alt` | Trois participants posent sous l'arche de Nkongsamba | Drei Teilnehmende posieren unter dem Bogen von Nkongsamba |
|  | `contenu.photos.B56.alt` | Un participant pose sous l'arche de Nkongsamba | Ein Teilnehmer posiert unter dem Bogen von Nkongsamba |
|  | `contenu.photos.B30.alt` | Un membre de l'équipe à cheval sur les pentes verdoyantes | Ein Teammitglied zu Pferd an grünen Hängen |
|  | `contenu.photos.B35.alt` | Deux membres de l'équipe posent à côté d'un cheval, bras ouverts | Zwei Teammitglieder posieren mit ausgebreiteten Armen neben einem Pferd |
|  | `contenu.photos.B40.alt` | Vue sur un lac de cratère entouré de collines | Blick auf einen Kratersee, umgeben von Hügeln |
|  | `contenu.photos.B41.alt` | Membre de l'équipe au bord d'un lac de cratère | Teammitglied am Ufer eines Kratersees |
|  | `contenu.photos.B44.alt` | Membre de l'équipe contemplant le lac | Teammitglied blickt auf den See |
|  | `contenu.photos.B60.alt` | Une jeune participante sur un sentier en forêt | Eine junge Teilnehmerin auf einem Waldweg |
|  | `contenu.photos.B62.alt` | Deux participantes sur un rocher au sommet | Zwei Teilnehmerinnen auf einem Felsen am Gipfel |
|  | `contenu.photos.B63.alt` | Échauffement collectif avant la randonnée | Gemeinsames Aufwärmen vor der Wanderung |
|  | `contenu.photos.B65.alt` | Échauffement en cercle sous les arbres | Aufwärmen im Kreis unter den Bäumen |
|  | `contenu.photos.B68.alt` | Pause des participants sur la roche | Die Teilnehmenden machen eine Pause auf dem Felsen |
|  | `contenu.photos.B69.alt` | Étirements au sommet | Dehnübungen am Gipfel |
|  | `contenu.photos.B73.alt` | Un jeune contemple la ville depuis le sommet | Ein junger Mann blickt vom Gipfel auf die Stadt |
|  | `contenu.photos.B75.alt` | Le groupe célèbre l'arrivée au sommet, bras levés | Die Gruppe feiert mit erhobenen Armen die Ankunft am Gipfel |
|  | `contenu.photos.B77.alt` | Photo de groupe au sommet, la ville en contrebas | Gruppenfoto am Gipfel, unten die Stadt |
|  | `contenu.photos.B80.alt` | Un jeune s'appuie à un arbre sur le sentier | Ein junger Mann lehnt sich auf dem Weg an einen Baum |
|  | `contenu.photos.B82.alt` | Le groupe progresse en file sur un sentier forestier | Die Gruppe geht im Gänsemarsch einen Waldweg entlang |
|  | `contenu.photos.B84.alt` | Le groupe au sommet, vue sur la ville | Die Gruppe am Gipfel mit Blick auf die Stadt |
| \* | `contenu.photos.B85.alt` | Participant de dos en chasuble verte dans la forêt | Teilnehmer von hinten, in grünem Leibchen im Wald |
| \* | `contenu.galerie.open-day.meta` | Hôtel Albatros Premium, Yaoundé · 25 avril 2026 | Hotel Albatros Premium, Yaoundé · 25. April 2026 |
|  | `contenu.galerie.open-day.story` | La première journée portes ouvertes de la fondation, avec les jeunes du Boot Camp et leurs encadrants : une marche dans les rues de Yaoundé, un rassemblement au centre-ville, des prises de parole sur place et en visioconférence, un accompagnement sur ordinateur et des chants sur scène. | Der erste Tag der offenen Tür der Stiftung, mit den jungen Menschen des Boot Camps und ihren Betreuern: ein Marsch durch die Straßen von Yaoundé, eine Versammlung im Stadtzentrum, Redebeiträge vor Ort und per Videokonferenz, Begleitung am Computer und Lieder auf der Bühne. |
| \* | `contenu.galerie.communaute.title` | Rencontres de la communauté | Begegnungen der Gemeinschaft |
|  | `contenu.galerie.communaute.meta` | Lieu et date à confirmer (TODO) | Ort und Datum noch zu bestätigen (TODO) |
|  | `contenu.galerie.terrain.title` | Sur le terrain | Vor Ort |
|  | `contenu.galerie.terrain.meta` | Lieux, dates et projets à confirmer (TODO) | Orte, Daten und Projekte noch zu bestätigen (TODO) |
|  | `contenu.galerie.open-day-jeunes.alt` | Des jeunes en t-shirts WAHHF rient et lèvent les bras autour de deux encadrants. | Junge Menschen in WAHHF-T-Shirts lachen und heben die Arme, in ihrer Mitte zwei Betreuer. |
| \* | `contenu.galerie.open-day-jeunes.caption` | Les jeunes du Boot Camp et leurs encadrants. | Die jungen Menschen des Boot Camps und ihre Betreuer. |
|  | `contenu.galerie.open-day-marche.alt` | Le cortège de WAHHF marche dans une rue de Yaoundé, entre les taxis jaunes. | Der WAHHF-Marsch zieht durch eine Straße in Yaoundé, zwischen gelben Taxis. |
|  | `contenu.galerie.open-day-marche.caption` | La marche dans les rues de Yaoundé. | Der Marsch durch die Straßen von Yaoundé. |
|  | `contenu.galerie.open-day-marche-slogan.alt` | Vus de dos, des participants marchent en t-shirts portant le slogan « Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse ». | Von hinten gesehen: Teilnehmende gehen in T-Shirts mit dem Slogan „Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse“. |
| \* | `contenu.galerie.open-day-marche-slogan.caption` | « Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse » : le slogan porté dans la rue. | „Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse“: der Slogan, auf die Straße getragen. |
|  | `contenu.galerie.open-day-rassemblement.alt` | Des participants en gilets orange et t-shirts blancs rassemblés sur une pelouse au centre de Yaoundé. | Teilnehmende in orangefarbenen Westen und weißen T-Shirts, versammelt auf einer Rasenfläche im Zentrum von Yaoundé. |
|  | `contenu.galerie.open-day-rassemblement.caption` | Rassemblement des participants au centre de Yaoundé. | Versammlung der Teilnehmenden im Zentrum von Yaoundé. |
|  | `contenu.galerie.open-day-interview.alt` | Un responsable de WAHHF, en casquette blanche, répond à une interview télévisée en plein air. | Ein Verantwortlicher von WAHHF mit weißer Kappe gibt im Freien ein Fernsehinterview. |
|  | `contenu.galerie.open-day-interview.caption` | Interview accordée à la presse. | Interview für die Presse. |
|  | `contenu.galerie.open-day-accueil.alt` | Des participants en gilets orange dans le hall de l’hôtel. | Teilnehmende in orangefarbenen Westen in der Hotellobby. |
|  | `contenu.galerie.open-day-accueil.caption` | Dans le hall de l’Hôtel Albatros Premium. | In der Lobby des Hotels Albatros Premium. |
|  | `contenu.galerie.open-day-visioconference.alt` | Dans une salle de conférence, le public suit un intervenant projeté en visioconférence, à côté d’un kakémono WAHHF. | In einem Konferenzsaal verfolgt das Publikum einen per Videokonferenz zugeschalteten Redner auf der Leinwand, neben einem WAHHF-Roll-up. |
|  | `contenu.galerie.open-day-visioconference.caption` | Intervention en visioconférence. | Beitrag per Videokonferenz. |
|  | `contenu.galerie.open-day-prise-de-parole.alt` | Un intervenant en veste bleue parle au micro devant le kakémono WAHHF Foundation. | Ein Redner in blauer Jacke spricht vor dem Roll-up der WAHHF Foundation ins Mikrofon. |
|  | `contenu.galerie.open-day-prise-de-parole.caption` | Prise de parole devant les participants. | Ansprache vor den Teilnehmenden. |
|  | `contenu.galerie.open-day-accompagnement.alt` | Un encadrant guide une jeune participante sur un ordinateur portable. | Ein Betreuer leitet eine junge Teilnehmerin am Laptop an. |
|  | `contenu.galerie.open-day-accompagnement.caption` | Accompagnement d’une participante sur ordinateur. | Begleitung einer Teilnehmerin am Computer. |
|  | `contenu.galerie.open-day-chorale.alt` | Des jeunes en t-shirts WAHHF chantent sur scène. | Junge Menschen in WAHHF-T-Shirts singen auf der Bühne. |
|  | `contenu.galerie.open-day-chorale.caption` | Les jeunes chantent sur scène. | Die jungen Menschen singen auf der Bühne. |
|  | `contenu.galerie.video-chorale.alt` | Extrait vidéo : des jeunes en t-shirts WAHHF chantent sur scène. | Videoausschnitt: Junge Menschen in WAHHF-T-Shirts singen auf der Bühne. |
|  | `contenu.galerie.video-chorale.caption` | La chorale des jeunes (extrait vidéo, 18 s). | Der Chor der jungen Menschen (Videoausschnitt, 18 s). |
|  | `contenu.galerie.open-day-trophee.alt` | Trois responsables posent devant les kakémonos WAHHF ; une femme tient un trophée en verre. | Drei Verantwortliche posieren vor den WAHHF-Roll-ups; eine Frau hält eine Glastrophäe. |
|  | `contenu.galerie.open-day-trophee.caption` | Photo souvenir devant les kakémonos WAHHF. | Erinnerungsfoto vor den WAHHF-Roll-ups. |
|  | `contenu.galerie.open-day-groupe.alt` | Photo de groupe des jeunes du Boot Camp en t-shirts WAHHF devant les kakémonos de la fondation. | Gruppenfoto der jungen Menschen des Boot Camps in WAHHF-T-Shirts vor den Roll-ups der Stiftung. |
|  | `contenu.galerie.open-day-groupe.caption` | Photo de groupe des participants du Boot Camp. | Gruppenfoto der Teilnehmenden des Boot Camps. |
|  | `contenu.galerie.open-day-slogan.alt` | Dos d’un polo WAHHF : « Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse », à côté de caméramans. | Rückseite eines WAHHF-Poloshirts: „Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse“, daneben Kameraleute. |
|  | `contenu.galerie.open-day-slogan.caption` | Le slogan de la fondation au dos des polos. | Der Slogan der Stiftung auf dem Rücken der Poloshirts. |
|  | `contenu.galerie.communaute-masque.alt` | Un membre de WAHHF en polo blanc salue un danseur masqué en costume de raphia, sur une pelouse. | Ein WAHHF-Mitglied im weißen Poloshirt begrüßt auf einer Wiese einen maskierten Tänzer im Kostüm aus Raffiabast. |
|  | `contenu.galerie.communaute-masque.caption` | Rencontre avec un danseur masqué traditionnel. | Begegnung mit einem traditionellen Maskentänzer. |
|  | `contenu.galerie.communaute-rencontre.alt` | Trois hommes, dont un membre de WAHHF en polo blanc, posent lors d’un pique-nique de la communauté dans un parc. | Drei Männer, darunter ein WAHHF-Mitglied im weißen Poloshirt, posieren bei einem Picknick der Gemeinschaft in einem Park. |
|  | `contenu.galerie.communaute-rencontre.caption` | Pique-nique de la communauté. | Picknick der Gemeinschaft. |
|  | `contenu.galerie.video-car.alt` | Extrait vidéo : des jeunes en gilets WAHHF voyagent en car sur une piste de terre. | Videoausschnitt: Junge Menschen in WAHHF-Westen fahren im Reisebus über eine unbefestigte Piste. |
|  | `contenu.galerie.video-car.caption` | En route : les jeunes en car (extrait vidéo, sans son). | Unterwegs: die jungen Menschen im Reisebus (Videoausschnitt, ohne Ton). |
|  | `contenu.galerie.video-pepiniere.alt` | Extrait vidéo : une pépinière de jeunes palmiers, puis un camion chargé de plants. | Videoausschnitt: eine Baumschule mit jungen Palmen, dann ein mit Setzlingen beladener Lastwagen. |
|  | `contenu.galerie.video-pepiniere.caption` | Pépinière de jeunes palmiers (extrait vidéo, sans son). | Baumschule mit jungen Palmen (Videoausschnitt, ohne Ton). |
|  | `contenu.galerie.video-bananeraie.alt` | Extrait vidéo : des régimes de bananes dans une plantation. | Videoausschnitt: Bananenbüschel in einer Plantage. |
|  | `contenu.galerie.video-bananeraie.caption` | Régimes de bananes dans une plantation (extrait vidéo, sans son). | Bananenbüschel in einer Plantage (Videoausschnitt, ohne Ton). |

## principles

Fichier : `src/locales/principles/de.json` (23 textes, dont 3 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `title` | Cinq principes qui guident chaque projet | Fünf Grundsätze für jedes Projekt |
|  | `intro` | Une méthode humble, rigoureuse et ancrée dans les réalités locales. | Eine bescheidene, sorgfältige und in der Wirklichkeit vor Ort verankerte Arbeitsweise. |
|  | `counter` | Principe | Grundsatz |
|  | `rubric` | Principe {{n}} | Grundsatz {{n}} |
|  | `hint` | Faites défiler pour parcourir les 5 principes · WAHHF Foundation | Scrollen Sie, um die 5 Grundsätze zu entdecken · WAHHF Foundation |
|  | `items[0].title` | Écoute | Zuhören |
|  | `items[0].desc` | Partir des besoins exprimés par les jeunes, les mères et les acteurs de terrain sans imposer de modèle préconçu. | Von den Bedürfnissen ausgehen, die junge Menschen, Mütter und Akteure vor Ort äußern, ohne ein vorgefertigtes Modell aufzuzwingen. |
|  | `items[0].label` | Jeunes · Mères · Terrain | Junge Menschen · Mütter · Vor Ort |
| \* | `items[1].title` | Co-construction | Gemeinsam gestalten |
|  | `items[1].desc` | Bâtir chaque action avec les enseignants, soignants et associations locales pour un impact partagé. | Jede Maßnahme mit Lehrkräften, Gesundheitspersonal und Vereinen vor Ort aufbauen, für eine gemeinsame Wirkung. |
|  | `items[1].label` | Enseignants · Soignants · Associations | Lehrkräfte · Gesundheitspersonal · Vereine |
|  | `items[2].title` | Durabilité | Nachhaltigkeit |
| \* | `items[2].desc` | Privilégier la transmission de compétences durables (langues, métiers, écologie) plutôt que l’assistanat. | Dauerhafte Kompetenzen weitergeben (Sprachen, Berufe, Ökologie), statt bloße Hilfe zu leisten. |
|  | `items[2].label` | Langues · Métiers · Écologie | Sprachen · Berufe · Ökologie |
|  | `items[3].title` | Transparence | Transparenz |
|  | `items[3].desc` | Rendre compte de l’usage des fonds engagés. | Offenlegen, wie die eingesetzten Mittel verwendet werden. |
|  | `items[3].label` | Usage des fonds | Mittelverwendung |
|  | `items[4].title` | Partenariats | Partnerschaften |
|  | `items[4].desc` | Mobiliser les compétences du groupe IROKO et des institutions camerounaises et européennes. | Die Kompetenzen der IROKO-Gruppe und kamerunischer wie europäischer Institutionen einbinden. |
|  | `items[4].label` | IROKO · Cameroun · Europe | IROKO · Kamerun · Europa |
|  | `final.rubric` | Sur le terrain | Vor Ort |
| \* | `final.title` | Ces principes, sur le terrain | Diese Grundsätze in der Praxis |
|  | `final.cta` | Voir nos actions | Unsere Arbeit ansehen |

## qui-sommes-nous

Fichier : `src/locales/qui-sommes-nous/de.json` (26 textes, dont 5 à relire).

| | Clé | Français | Allemand |
|---|---|---|---|
|  | `seo.title` | Qui sommes-nous — Fondation camerouno-allemande, branche sociale du groupe IROKO | Über uns — Kamerunisch-deutsche Stiftung, sozialer Zweig der IROKO-Gruppe |
|  | `seo.description` | Découvrez l’histoire, la mission, les valeurs et l’approche de WAHHF Foundation, et son lien avec le groupe IROKO. | Erfahren Sie mehr über Geschichte, Auftrag, Werte und Ansatz der WAHHF Foundation und über ihre Verbindung zur IROKO-Gruppe. |
|  | `mission.title` | Bâtir l’autonomie par l’éducation, la santé et l’accès au savoir | Selbstständigkeit durch Bildung, Gesundheit und Zugang zu Wissen |
| \* | `mission.p1` | WAHHF Foundation part d’une conviction simple : chaque jeune mérite d’accéder à l’éducation, aux soins de prévention, à l’apprentissage des langues et à une information vérifiée, sans que le manque de ressources financières ou les réseaux de désinformation ne brisent son avenir. | Die WAHHF Foundation geht von einer einfachen Überzeugung aus: Jeder junge Mensch verdient Zugang zu Bildung, Gesundheitsvorsorge, Sprachunterricht und geprüften Informationen – ohne dass fehlendes Geld oder Netzwerke der Desinformation seine Zukunft zerstören. |
|  | `mission.p2` | Basée à Yaoundé et à Douala, avec une coordination en Allemagne, la fondation propose un programme gratuit d’apprentissage de l’allemand /anglais (A1 à C1) et d’orientation vers 10 pays européens. | Mit Sitz in Yaoundé und Douala und einer Koordination in Deutschland bietet die Stiftung ein kostenloses Programm zum Erlernen von Deutsch/Englisch (A1 bis C1) und zur Orientierung für 10 europäische Länder. |
|  | `values[0].title` | Dignité et respect | Würde und Respekt |
| \* | `values[0].desc` | Chaque bénéficiaire est accueilli comme un acteur de son propre parcours, jamais comme un client. | Alle Begünstigten werden als Gestalter ihres eigenen Weges aufgenommen, nie als Kunden. |
|  | `values[1].title` | Intégrité et vérité | Integrität und Wahrheit |
|  | `values[1].desc` | Nous combattons les fausses promesses migratoires par une information rigoureuse et vérifiable. | Wir bekämpfen falsche Migrationsversprechen mit sorgfältigen und überprüfbaren Informationen. |
|  | `presidentAlt` | {{name}}, {{role}}, pendant sa présentation | {{name}}, {{role}}, während seines Vortrags |
|  | `timeline.title` | Les grandes étapes de WAHHF Foundation | Die wichtigsten Etappen der WAHHF Foundation |
|  | `timeline.subtitle` | Une construction progressive au service des communautés. | Schritt für Schritt aufgebaut, im Dienst der Gemeinschaften. |
|  | `iroko.title` | WAHHF Foundation, branche sociale du groupe IROKO | WAHHF Foundation, sozialer Zweig der IROKO-Gruppe |
| \* | `iroko.text` | Le groupe multisectoriel camerouno-allemand IROKO a structuré WAHHF Foundation comme sa branche sociale et philanthropique, à but non lucratif. Ce soutien couvre les frais de fonctionnement et d’enseignement. | Die kamerunisch-deutsche, branchenübergreifende IROKO-Gruppe hat die WAHHF Foundation als ihren gemeinnützigen sozialen und philanthropischen Zweig aufgebaut. Diese Unterstützung deckt die Betriebs- und Unterrichtskosten. |
|  | `iroko.partners` | Découvrir nos partenaires | Unsere Partner entdecken |
|  | `support.title` | Soutenir la fondation | Die Stiftung unterstützen |
|  | `support.subtitle` | Vous pouvez soutenir nos actions par un don, ou proposer un partenariat à la fondation : école, association, entreprise ou institution. | Sie können unsere Arbeit mit einer Spende unterstützen oder der Stiftung eine Partnerschaft vorschlagen: als Schule, Verein, Unternehmen oder Institution. |
|  | `support.partner` | Devenir partenaire | Partner werden |
|  | `contenu.etapes[0].title` | Éducation | Die Anfänge der Solidaritätsinitiative |
| \* | `contenu.etapes[0].desc` | Premières actions d’entraide éducative et de soutien matériel aux élèves entre le Cameroun et la diaspora en Allemagne. | Erste Aktionen gegenseitiger Hilfe in der Bildung und materielle Unterstützung für Schülerinnen und Schüler, zwischen Kamerun und der Diaspora in Deutschland. |
|  | `contenu.etapes[1].title` | Santé | Aufbau der WAHHF Foundation |
|  | `contenu.etapes[1].desc` | Organisation des programmes autour des cinq premiers piliers : Éducation, Santé, Entrepreneuriat, Environnement et Droits & Inclusion. | Ausrichtung der Programme auf die ersten fünf Säulen: Bildung, Gesundheit, Unternehmertum, Umwelt sowie Rechte & Teilhabe. |
| \* | `contenu.etapes[2].title` | Entrepreneuriat des jeunes | Anbindung als sozialer Zweig der IROKO-Gruppe |
|  | `contenu.etapes[2].desc` | Le groupe IROKO s’engage structurellement à financer le fonctionnement de la fondation. | Die IROKO-Gruppe verpflichtet sich dauerhaft, den Betrieb der Stiftung zu finanzieren. |
|  | `contenu.etapes[3].title` | Environnement | Start des 6. Arbeitsbereichs: Mobilität & Sprachen |
|  | `contenu.etapes[3].desc` | Ouverture de l’Académie d’allemand gratuite (A1 à C1) et publication des guides d’orientation vérifiés vers 10 pays européens. | Eröffnung der kostenlosen Deutschakademie (A1 bis C1) und Veröffentlichung geprüfter Orientierungsleitfäden für 10 europäische Länder. |
