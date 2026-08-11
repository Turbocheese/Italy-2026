# Tour d'Italia — Italy 2026 itinerary

A phone-first, offline-capable itinerary for 17 Sept – 1 Oct 2026 (Venice · Florence · Rome · Palermo).

## Publish on GitHub Pages

1. Create a repository (public is simplest — Pages on private repos needs a paid plan).
2. Upload **everything in this folder** to the repository root.
3. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)` → Save.
4. Wait ~1 minute. Your URL will be `https://<user>.github.io/<repo>/`.

## Add it to a phone

Open the URL in the phone's browser.

- **iPhone (Safari):** Share → Add to Home Screen.
- **Android (Chrome):** the install prompt appears on its own, or menu → Install app.

Once installed it works with no signal. Live weather and the SGD→EUR rate refresh when there is a connection and fall back to the last cached values when there isn't.

## What's here

| File | What it is |
| --- | --- |
| `index.html` | The itinerary app |
| `decisions.html` | The planner decisions record (printable) |
| `support.js`, `doc-page.js` | Runtime the two pages load |
| `sw.js` | Service worker — offline cache |
| `manifest.json`, `icon.svg` | Install metadata and icon |
| `.nojekyll` | Stops GitHub Pages running Jekyll over the files |

## Updating it later

Replace `index.html` and bump `VERSION` in `sw.js` (e.g. `-v2`). The bump is what makes installed phones pick up the new version instead of serving the cached one.

## Notes

- Ticket prices and opening hours were checked on 11 Aug 2026; reconfirm ticketed stops the week before departure.
- Per-device progress: ticking stops saves to that phone only. "Share today" copies the day out as text for the group chat.
