/** Ce qui avance sur la route du projet phare (décor). Les pièces mobiles portent les classes que ProjetMotion anime. */

/** Fourgonnette : croix soleil ; chaque roue tourne autour de son moyeu */
function Roue({ cx }: { cx: number }) {
  return (
    <g className="ac-roue">
      <circle cx={cx} cy="58" r="11" className="ac-v-pneu" />
      <circle cx={cx} cy="58" r="5.5" className="ac-v-moyeu" />
      <path d={`M${cx - 5.5} 58 H${cx + 5.5} M${cx} 52.5 V63.5`} className="ac-v-rayon" />
    </g>
  );
}

export function Fourgonnette() {
  return (
    <svg viewBox="0 0 124 70" className="ac-fourgonnette" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 56 V18 a9 9 0 0 1 9-9 H78 c6 0 10 2 13 7 l11 17 c9 2 16 5 16 13 V56 Z" className="ac-v-caisse" />
      <path d="M80 17 h3 c3 0 5 1 7 4 l8 12 H80 Z" className="ac-v-vitre" />
      <path d="M5 46 H118" className="ac-v-bande" />
      <path d="M38 17 h8 v7 h7 v8 h-7 v7 h-8 v-7 h-7 v-8 h7 Z" className="ac-v-croix" />
      <rect x="112" y="40" width="6" height="5" rx="2" className="ac-v-phare" />
      <Roue cx={31} />
      <Roue cx={92} />
    </svg>
  );
}

/** Livre ouvert à deux ailes : elles battent avec la distance parcourue */
export function Livre() {
  return (
    <svg viewBox="0 0 124 84" className="ac-livre" fill="none" aria-hidden="true" focusable="false">
      <path className="ac-aile ac-aile-g ac-v-aile" d="M36 46 C25 22 9 22 3 30 C10 32 12 37 10 42 C17 42 20 47 19 52 C26 50 33 50 36 46 Z" />
      <path className="ac-aile ac-aile-d ac-v-aile" d="M88 46 C99 22 115 22 121 30 C114 32 112 37 114 42 C107 42 104 47 105 52 C98 50 91 50 88 46 Z" />
      <path d="M28 30 V66 C40 62 52 64 62 72 C72 64 84 62 96 66 V30 Z" className="ac-v-couverture" />
      <path d="M62 36 C53 27 41 26 32 29 V61 C43 58 54 60 62 67 Z" className="ac-v-page" />
      <path d="M62 36 C71 27 83 26 92 29 V61 C81 58 70 60 62 67 Z" className="ac-v-page" />
      <path d="M39 37 C45 36 51 38 56 42 M39 45 C45 44 51 46 56 50 M85 37 C79 36 73 38 68 42 M85 45 C79 44 73 46 68 50" className="ac-v-lignes" />
    </svg>
  );
}
