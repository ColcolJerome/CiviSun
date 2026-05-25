# CiviSun — Sito Web Istituzionale
**Versione**: 1.0 · Maggio 2025  
**Autore**: CiviSun Srl · Dalmine (BG)

---

## Struttura cartella

```
civisun/
├── pages/                    # Pagine HTML — una per sezione
│   ├── index.html            # Homepage con hero, stats, servizi, testimonial
│   ├── chi-siamo.html        # Storia, valori e mappa OSM reale (Dalmine)
│   ├── servizi.html          # Consulenza CER dettagliata
│   ├── cer-monitor.html      # Prodotto SaaS con mockup dashboard live
│   ├── notizie.html          # Griglia articoli con badge categoria
│   ├── eventi.html           # Calendario eventi con datario colorato
│   └── contatti.html         # Form + mappa OSM + info contatto
│
├── assets/
│   ├── css/
│   │   └── main.css          # Foglio di stile condiviso (636 righe commentate)
│   │
│   ├── js/
│   │   ├── main.js           # Script condiviso: loader, i18n, reveal, FAQ...
│   │   └── translations.js   # Dizionario IT/EN per tutti i testi
│   │
│   ├── img/
│   │   └── logo-kraft.jpg    # Logo originale CiviSun (carta kraft) — usato in
│   │                         # navbar, footer, loader e filigrana watermark
│   │
│   └── svg/
│       ├── icons/            # 7 icone vettoriali custom (NON emoji)
│       │   ├── solar-panel.svg
│       │   ├── community.svg
│       │   ├── savings.svg
│       │   ├── monitoring.svg
│       │   ├── leaf.svg
│       │   ├── lightning.svg
│       │   └── location-pin.svg
│       ├── illustrations/
│       │   └── hero-home.svg # Illustrazione hero 520x400: casa solare, persone,
│       │                     # badge risparmio, frecce energia, alberi
│       └── patterns/
│           └── bg-tile.svg   # Tile 120x120 — sfondo ripetuto (stile WhatsApp)
│                             # con soli, foglie e puntini a bassa opacità
│
└── README.md                 # Questo file

```

---

## Come aprire il sito

Basta aprire **`pages/index.html`** in qualsiasi browser moderno.  
Nessun server o build step richiesto — tutto è statico.

Per una preview con hot-reload:
```bash
npx live-server pages/
```

---

## Funzionalità implementate

| Funzionalità | Dettaglio |
|---|---|
| Loader animato | Logo kraft reale + anello rotante + punti pulsanti |
| Toggle IT/EN | `data-it` / `data-en` su ogni elemento testuale |
| Scroll reveal | IntersectionObserver con `reveal`, `reveal-left`, `reveal-right` |
| Progress bar | Barra scroll in cima alla pagina (verde→giallo→arancio) |
| Back-to-top | Appare dopo 400px, sparisce sopra |
| Navbar hide | Si nasconde su scroll-down, riappare su scroll-up |
| Menu mobile | Hamburger → overlay con tutti i link |
| FAQ accordion | Toggle animato, uno aperto alla volta |
| Cookie banner | Con persistenza `localStorage` |
| Contatori animati | ease-out cubic, si attivano all'entrata in viewport |
| Post-it hover | Tilt → raddrizzamento + scale su hover |
| Mappa reale | OpenStreetMap embed · marker 45.6533, 9.6097 (Dalmine) |
| Mockup dashboard | Barre animate + dato live simulato (CER Monitor) |
| Filigrana logo | `.watermark-section` usa il logo kraft come bg-image (opacity 2.8%) |
| Pattern sfondo | `bg-tile.svg` tile soli/foglie su `body::before` (opacity 4.5%) |

---

## Palette colori

| Variabile | Hex | Uso |
|---|---|---|
| `--cream` | `#fdf6e3` | Sfondo principale |
| `--paper` | `#f5efe0` | Sfondo sezioni alternate |
| `--green` | `#4a9e3f` | Primary CTA, badge, accenti |
| `--orange` | `#e8873a` | Datari eventi, accenti caldi |
| `--yellow` | `#f7c948` | Post-it, highlights, CTA secondari |
| `--rust` | `#c4523a` | Badge PNRR, avvisi |
| `--bd` | `#3d2b1a` | Testo principale, footer |

---

## Font

- **Playfair Display** — titoli h1/h2 (Google Fonts)
- **Patrick Hand** — eyebrow, badge, post-it, date (Google Fonts)
- **Nunito** — corpo testo, bottoni, label (Google Fonts)

---

*CiviSun Srl · Dalmine (BG) · info@civisun.it*
