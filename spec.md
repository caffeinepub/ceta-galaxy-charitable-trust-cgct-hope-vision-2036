# Specification

## Summary
**Goal:** Replace the CETA and HOPE logo images in the navbar, hero section, and footer with newly uploaded versions, keeping all other content identical to Version 5.

**Planned changes:**
- Save `CETA-3.png` (CETA Galaxy Charitable Trust circular seal in dark red) as a static asset under `frontend/public/assets/generated/`
- Save `HOPE Logo_0-Photoroom-2.png` (HOPE – Helping Outstanding Pupils in Education circular logo with cupped hands) as a static asset under `frontend/public/assets/generated/`
- Update `Navigation.tsx`, `HeroSection.tsx`, and `Footer.tsx` to reference the new CETA logo image, preserving existing size, position, and alt text
- Update `Navigation.tsx`, `HeroSection.tsx`, and `Footer.tsx` to reference the new HOPE logo image, preserving existing size, position, and alt text

**User-visible outcome:** The navbar, hero section, and footer now display the updated CETA Galaxy Charitable Trust and HOPE logos; everything else remains unchanged from Version 5.
