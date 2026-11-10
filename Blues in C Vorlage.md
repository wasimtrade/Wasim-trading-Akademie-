# Wasim Trading Akademie – Veröffentlichen

## 1. Dateien hochladen (z. B. Netlify Drop, Cloudflare Pages, GitHub Pages)
Lege diese Dateien in EINEN Ordner und lade den Ordner hoch:

- `wasim-trading-akademie.html` → **umbenennen in `index.html`**
- `manifest.webmanifest`
- `sw.js`
- `icon-192.png`
- `icon-512.png`

Danach lässt sich die Seite auf dem Handy als App installieren und funktioniert auch offline (ohne KI-Tutor).

## 2. Impressum & Datenschutz ausfüllen (Pflicht)
Öffne `index.html` in einem Texteditor und suche nach `const SITE=`. Trage dort deinen Namen, deine Anschrift, E-Mail und Telefon ein.
Suche außerdem im Datenschutz-Text nach den Stellen in [eckigen Klammern] (Hosting-Anbieter, KI-Anbieter) und ergänze sie.
**Die Texte sind eine Vorlage, keine Rechtsberatung – bitte rechtlich prüfen lassen** (z. B. Anwalt oder anerkannter Rechtstexte-Generator).

## 3. KI-Tutor auf deiner eigenen Seite (optional)
Auf deiner eigenen Webseite braucht der KI-Tutor einen kleinen Server, damit dein API-Schlüssel nicht im Browser liegt.

1. Erstelle bei Cloudflare ein kostenloses Konto → Workers & Pages → „Create Worker“.
2. Füge den Inhalt von `ki-proxy-worker.js` ein und veröffentliche.
3. Unter Settings → Variables: `ANTHROPIC_API_KEY` (als Secret) setzen. Optional `ALLOWED_ORIGIN` = die Adresse deiner Seite (z. B. `https://meine-akademie.de`) und `MODEL`.
4. Kopiere die Worker-Adresse (z. B. `https://ki.deinname.workers.dev`).
5. Öffne `index.html`, suche `const AI_URL=""` und trage die Adresse zwischen die Anführungszeichen ein.
6. Setze in Cloudflare ein Rate-Limit, damit niemand deinen Schlüssel „leer fragt“.

## 4. Inhalte prüfen lassen
In der Seite: **Tools → Einstellungen → „Inhalte exportieren“** erzeugt eine Textdatei mit allen Erklärungen, Fragen und Antworten – ideal für einen erfahrenen Trader zum Gegenlesen.

## 5. Fortschritt & Geräte
Der Fortschritt liegt im Browser des jeweiligen Geräts. Über **Tools → Einstellungen → Sichern/Laden** kann er auf ein anderes Gerät mitgenommen werden. Echte Konten mit automatischer Synchronisation brauchen einen Server mit Datenbank (nicht enthalten).
