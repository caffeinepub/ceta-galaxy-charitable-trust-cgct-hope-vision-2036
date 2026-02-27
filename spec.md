# Specification

## Summary
**Goal:** Replace the broken CETA Galaxy logo images in the navbar, hero section, and footer with the newly uploaded CETA-2.png file.

**Planned changes:**
- Save CETA-2.png as a static asset at `frontend/public/assets/generated/CETA-2.png`
- Update the CETA Galaxy logo image `src` path in `Navigation.tsx` to point to the new file
- Update the CETA Galaxy logo image `src` path in `HeroSection.tsx` to point to the new file
- Update the CETA Galaxy logo image `src` path in `Footer.tsx` to point to the new file
- Preserve all existing sizing, positioning, and styling of those logo elements exactly

**User-visible outcome:** The CETA Galaxy logo displays correctly (no broken image icon) in the navbar, hero section, and footer.
