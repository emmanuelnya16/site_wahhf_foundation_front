#!/usr/bin/env node
/**
 * Contrôle des textes provisoires (audit T-01, décision du 16/11/2026).
 *
 * Échoue (code 1) si « TODO », « Simulé » (et ses accords) ou « démonstration » apparaissent, sur une page WAHHF :
 *   - dans le texte affiché (innerText de la page rendue, à 1 440 et 390 px de large) ;
 *   - dans un aria-label ;
 *   - dans une option de liste (<option>).
 * Les pages historiques IROKO (/le-groupe, /structure, /poles, /tarifs, /methode, /fondateurs, /vkibusiness)
 * ne sont pas contrôlées. Les titres d'onglet et méta-descriptions sont listés à part, sans faire échouer.
 *
 * Usage : npm run check:todo            (construit le site, puis contrôle dist/)
 *         node scripts/check-textes-provisoires.mjs [--out rapport.md]
 * Aucune dépendance : Node 22 ou plus (WebSocket natif) et Chrome ou Edge installé (CHROME_PATH pour le préciser).
 * Les pages sont trouvées en suivant les liens internes depuis l'accueil, plus une adresse inconnue (page 404).
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const LEGACY = ['/le-groupe', '/structure', '/poles', '/tarifs', '/methode', '/fondateurs', '/vkibusiness'];
const PATTERNS = [
  { name: 'TODO', re: /TODO/ },
  { name: 'Simulé', re: /simul[ée]e?s?(?!\p{L})/iu },
  { name: 'démonstration', re: /d[ée]monstration/i },
];
const WIDTHS = [1440, 390];
const MAX_PAGES = 200;
const outArg = process.argv.indexOf('--out');
const OUT = outArg > 0 ? process.argv[outArg + 1] : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (typeof WebSocket === 'undefined') {
  console.error('Node 22 ou plus est nécessaire (WebSocket natif).');
  process.exit(2);
}
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ introuvable : lancez d’abord « npm run build » (ou « npm run check:todo »).');
  process.exit(2);
}

// 1. Serveur statique de dist/, avec retour à index.html pour les routes de l'application
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(DIST, path);
  if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html');
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

// 2. Chrome sans interface, piloté par le protocole DevTools
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chromePath = candidates.find((p) => existsSync(p));
if (!chromePath) {
  console.error('Chrome ou Edge introuvable : indiquez son chemin dans CHROME_PATH.');
  server.close();
  process.exit(2);
}
const profile = mkdtempSync(join(tmpdir(), 'wahhf-check-'));
const debugPort = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const cleanup = () => {
  try { chrome.kill(); } catch {}
  server.close();
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch {} }, 500);
};

let wsUrl;
for (let i = 0; i < 80 && !wsUrl; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    wsUrl = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {
    await sleep(250);
  }
}
if (!wsUrl) {
  console.error('Impossible de piloter Chrome (protocole DevTools).');
  cleanup();
  process.exit(2);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((res) => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send('Page.enable');
await send('Runtime.enable');

// 3. Relevé d'une page : texte affiché, aria-label, options de liste, liens internes
const COLLECT = `(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { window.scrollTo(0, y); await wait(60); }
  window.scrollTo(0, 0); await wait(150);
  return {
    text: document.body.innerText,
    aria: [...document.querySelectorAll('[aria-label]')].map((e) => e.getAttribute('aria-label')),
    options: [...document.querySelectorAll('option')].map((o) => o.textContent),
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
  };
})()`;

// Formulaires en plusieurs étapes (Candidater) : les champs visibles sont remplis avec des valeurs neutres, puis le
// bouton « Continuer… » est pressé, pour relever aussi les étapes suivantes (leurs options de liste, notamment).
const NEXT_STEP = `(async () => {
  const button = [...document.querySelectorAll('main form button[type="submit"]')].find((b) => b.offsetParent && /^Continuer/.test(b.textContent.trim()));
  if (!button) return false;
  const form = button.closest('form');
  const setValue = (el, value) => {
    const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
    el.dispatchEvent(new Event(el instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
  };
  for (const el of form.querySelectorAll('input, select, textarea')) {
    if (!el.offsetParent || el.disabled) continue;
    if (el instanceof HTMLSelectElement) {
      const option = [...el.options].find((o) => o.value);
      if (option && !el.value) setValue(el, option.value);
    } else if (el.type === 'checkbox' || el.type === 'radio') {
      if (!el.checked && (el.required || el.type === 'radio')) el.click();
    } else if (!el.value) {
      setValue(el, { email: 'test@example.org', tel: '+237600000000', number: '1', date: '2000-01-01' }[el.type] || 'Test');
    }
  }
  await new Promise((r) => setTimeout(r, 100));
  button.click();
  await new Promise((r) => setTimeout(r, 600));
  return true;
})()`;

const isWahhfPage = (path) => !LEGACY.includes(path) && !extname(path);
const queue = ['/', '/adresse-inconnue-404'];
const seen = new Set(queue);
const findings = new Map(); // page -> Set de lignes
const meta = new Map();
const add = (map, page, line) => { if (!map.has(page)) map.set(page, new Set()); map.get(page).add(line); };
const check = (map, page, kind, value) => {
  for (const raw of String(value).split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const hits = PATTERNS.filter((p) => p.re.test(line)).map((p) => p.name);
    if (hits.length) add(map, page, `${kind} [${hits.join(', ')}] : ${line.length > 180 ? line.slice(0, 177) + '…' : line}`);
  }
};

let pages = 0;
while (queue.length && pages < MAX_PAGES) {
  const path = queue.shift();
  pages++;
  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await send('Page.navigate', { url: BASE + path });
    await sleep(900);
    for (let step = 0; step < 4; step++) {
      const r = await evaluate(COLLECT);
      if (!r) break;
      check(findings, path, 'texte', r.text);
      r.aria.forEach((a) => check(findings, path, 'aria-label', a));
      r.options.forEach((o) => check(findings, path, 'option', o));
      check(meta, path, 'titre', r.title);
      check(meta, path, 'description', r.description);
      for (const href of r.links) {
        const u = new URL(href);
        if (u.origin !== BASE) continue;
        const p = u.pathname.replace(/\/$/, '') || '/';
        if (!seen.has(p) && isWahhfPage(p)) { seen.add(p); queue.push(p); }
      }
      if (!(await evaluate(NEXT_STEP))) break;
    }
  }
}
ws.close();
cleanup();

// 4. Rapport
const total = [...findings.values()].reduce((n, s) => n + s.size, 0);
// Ce qui revient sur presque toutes les pages (footer, en-tête) n'est listé qu'une fois.
const counts = new Map();
for (const set of findings.values()) for (const l of set) counts.set(l, (counts.get(l) || 0) + 1);
const everywhere = [...counts].filter(([, n]) => n >= Math.max(2, Math.ceil(pages * 0.8))).map(([l]) => l);
const unique = counts.size;
const lines = [
  `# Textes provisoires sur les pages WAHHF`,
  ``,
  `${pages} pages contrôlées (largeurs ${WIDTHS.join(' et ')} px, étapes des formulaires comprises). Motifs : ${PATTERNS.map((p) => '« ' + p.name + ' »').join(', ')}.`,
  ``,
  total ? `**${total} occurrences** sur ${findings.size} pages, soit **${unique} textes différents**.` : `**Aucune occurrence.**`,
  ``,
];
if (everywhere.length) {
  lines.push(`## Sur presque toutes les pages (${everywhere.length})`, '', ...everywhere.map((l) => `- ${l} (${counts.get(l)} pages)`), '');
}
for (const [page, set] of [...findings].sort()) {
  const own = [...set].filter((l) => !everywhere.includes(l));
  if (own.length) lines.push(`## ${page} (${own.length})`, '', ...own.map((l) => `- ${l}`), '');
}
if (meta.size) {
  lines.push(`## Titres d'onglet et méta-descriptions (pour information, ne font pas échouer)`, '');
  for (const [page, set] of [...meta].sort()) [...set].forEach((l) => lines.push(`- ${page} : ${l}`));
  lines.push('');
}
const report = lines.join('\n');
console.log(report);
if (OUT) writeFileSync(OUT, report);
console.log(total ? `\nÉCHEC : ${total} occurrences de textes provisoires.` : '\nOK : aucun texte provisoire.');
process.exit(total ? 1 : 0);
