# CGCT – Vision 2036 (Functional Debug & Repair)

## Current State

Full-stack React SPA using TanStack Router with hash-based routing (`createHashHistory`).

**Existing routes:**
- `/` — HomePage (all sections)
- `/survey` — SurveyPage (two survey buttons)
- `/gallery` — GalleryPage (admin upload + public view)

**Known issues (from audit of source code):**
1. **Router uses browser history, not hash history** — `createRouter({ routeTree })` in `App.tsx` does not use `createHashHistory`, causing full page reloads when navigating on ICP (which does not support server-side fallback routing). The `navigate({ to: '/survey' })` calls exist in `HeroSection.tsx`, `Footer.tsx`, and `SurveyPage.tsx` but the router itself needs hash history.
2. **Black space below footer** — `#root` in `src/index.css` only sets `background-color` but not `min-height: 100vh; display: flex; flex-direction: column;`. The `RootLayout` wrapper div in `App.tsx` has only `overflow-x-hidden` with no flex column layout. Injected browser extension DOM elements (MaxAI/use-chat-gpt-ai) can add height below footer.
3. **CGCT/CETA logo references broken** — All components reference `/assets/CETA-2.png` which may be a stale/broken asset. New `CGCT-Logo-3.jpg` uploaded at `/assets/uploads/CGCT-Logo-3.jpg`. Similarly, HOPE logo references `/assets/HOPE Logo_0-Photoroom-1.png` which may be stale; new upload at `/assets/uploads/HOPE-Logo-1.jpeg`.
4. **Logo size consistency** — In `Navigation.tsx`: CETA logo `h-10 w-10 lg:h-14 lg:w-14`, HOPE logo `h-10 w-10 lg:h-14 lg:w-14` — already same classes. In `HeroSection.tsx`: both `h-16 w-16 lg:h-20 lg:w-20` — already same. In `Footer.tsx`: both `h-14 w-14` — already same. In `SurveyPage.tsx`: both `h-12 w-12` — already same. Need to verify and enforce via explicit `style` constraints.
5. **Reunion section** — `ReunionSection.tsx` only shows 4 categories (A–D). Missing category E: "Other volunteers associated with HOPE and CGCT initiatives".
6. **Reunion poster** — references `/assets/generated/reunion-poster.dim_926x1312.png` (stale/generated). Should use new upload `/assets/uploads/Reunion-Poster-2.jpeg`.
7. **Countdown timer** — Logic in `useCountdown.ts` looks correct. Target: `2026-04-12T03:30:00Z` (9 AM IST). Uses setInterval. Stable. No negative values (clamped to 0). No changes needed.
8. **Animated counters** — `useCountUp` + `useIntersectionObserver` already wired in `HeroSection.tsx`. The 700–800 stat uses `isNumeric={false}` and just displays string — correct.
9. **Smooth scroll navigation** — `Navigation.tsx` already uses `scrollIntoView({ behavior: 'smooth' })`. Correct.
10. **Mobile responsiveness** — No structural issues found in code. Tailwind responsive classes are applied throughout.
11. **Extension DOM element injection** — Need a `useEffect` in `App.tsx` / `main.tsx` to detect and remove injected elements with class selectors: `use-chat-gpt-ai--MuiStack-root`, `maxai-client--chat-hub--container`, `MAX_AI_FLOATING_IMAGE_MINI_MENU`, `max_ai__floating_image_menu`.
12. **Performance** — Add `will-change: transform` to animation elements; use `loading="lazy"` on images (already present on gallery photos).

## Requested Changes (Diff)

### Add
- Hash history to TanStack Router (`createHashHistory`) so SPA routing works on ICP without page reload
- `useEffect` cleanup utility in `App.tsx` to remove injected extension DOM elements on mount and via MutationObserver
- Category E to `ReunionSection.tsx` categories array: "Other volunteers associated with HOPE and CGCT initiatives" (EN) / Malayalam equivalent
- Category E to translation keys in `LanguageContext.tsx`: `reunion.cat.e`
- `will-change: transform` to countdown boxes and counter cards in CSS for GPU acceleration
- Explicit `overflow: hidden` on `body` extension element suppression via CSS

### Modify
- `App.tsx`: Add `createHashHistory`, pass it to `createRouter({ routeTree, history })`. Fix `RootLayout` wrapper div to use `flex flex-col min-h-screen` so footer is always flush at bottom.
- `src/index.css`: Update `#root` to add `min-height: 100vh; display: flex; flex-direction: column;`. Update `html, body` to ensure `height: 100%; margin: 0; background-color: #1A0404` (footer's darkest color) so extension-injected space is invisible.
- `Navigation.tsx`: Update CETA logo `src` to `/assets/uploads/CGCT-Logo-3.jpg`. Update HOPE logo `src` to `/assets/uploads/HOPE-Logo-1.jpeg`. Enforce both logos at same fixed `style={{ height: '40px', width: '40px' }}` (mobile) and lg equivalent via className.
- `HeroSection.tsx`: Update CETA logo src to `/assets/uploads/CGCT-Logo-3.jpg`. Update HOPE logo src to `/assets/uploads/HOPE-Logo-1.jpeg`. Enforce identical height/width on both.
- `Footer.tsx`: Update CETA logo src to `/assets/uploads/CGCT-Logo-3.jpg`. Update HOPE logo src to `/assets/uploads/HOPE-Logo-1.jpeg`.
- `SurveyPage.tsx`: Update CETA logo src to `/assets/uploads/CGCT-Logo-3.jpg`. Update HOPE logo src to `/assets/uploads/HOPE-Logo-1.jpeg`.
- `ReunionSection.tsx`: Add category E to the `categories` array. Update poster `src` to `/assets/uploads/Reunion-Poster-2.jpeg`.
- `LanguageContext.tsx`: Add `reunion.cat.e` in both EN and ML translations.

### Remove
- Any remaining references to `/assets/CETA-2.png` and `/assets/HOPE Logo_0-Photoroom-1.png` (replace with new uploads)
- Reference to `/assets/generated/reunion-poster.dim_926x1312.png` (replace with new upload)

## Implementation Plan

1. **Fix router** — In `App.tsx`, import `createHashHistory` from `@tanstack/react-router`, instantiate it, and pass as `history` to `createRouter`. Fix `RootLayout` wrapper div className to `flex flex-col min-h-screen overflow-x-hidden`.

2. **Fix CSS layout** — In `src/index.css`, update `#root` to `min-height: 100vh; display: flex; flex-direction: column;`. Set `html` and `body` background to `#1A0404` so any injected extension elements below the footer are invisible.

3. **Remove extension DOM elements** — In `App.tsx`, add a `useEffect` that runs on mount: uses `document.querySelectorAll` with class selectors and removes matching elements. Also sets up a `MutationObserver` on `document.body` to catch late-injected elements.

4. **Update all logo sources** — In `Navigation.tsx`, `HeroSection.tsx`, `Footer.tsx`, `SurveyPage.tsx`: replace old logo src paths with `/assets/uploads/CGCT-Logo-3.jpg` and `/assets/uploads/HOPE-Logo-1.jpeg`. Apply consistent `h-10 w-10 lg:h-14 lg:w-14 object-contain` (navbar) and explicit pixel `height: 64px; width: auto` style on hero/footer instances so they're visually identical.

5. **Add category E** — Add `reunion.cat.e` to `LanguageContext.tsx` translations (EN: "Other volunteers associated with HOPE and CGCT initiatives"; ML: "HOPE, CGCT സംരംഭങ്ങളുമായി ബന്ധപ്പെട്ട മറ്റ് വോളണ്ടിയർമാർ"). Add category E entry to `ReunionSection.tsx` categories array with label "E" and color `#8FAF7E`.

6. **Update reunion poster** — In `ReunionSection.tsx`, change poster `src` from `/assets/generated/reunion-poster.dim_926x1312.png` to `/assets/uploads/Reunion-Poster-2.jpeg`.

7. **GPU acceleration** — Add `will-change: transform` to `.countdown-box` and `.purpose-item` in `src/index.css`.

8. **Validate** — Run typecheck and build. Verify no console errors. No changes to colors, fonts, spacing, animations, or any content text.
