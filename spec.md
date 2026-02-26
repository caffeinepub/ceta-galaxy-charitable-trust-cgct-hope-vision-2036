# Specification

## Summary
**Goal:** Replace the existing CETA and HOPE logo images throughout the site with the newly uploaded versions.

**Planned changes:**
- Save the uploaded HOPE logo (circular design with two cupped hands and "Helping Outstanding Pupils in Education" text) as `frontend/public/assets/generated/hope-logo.png`, replacing the existing file
- Save the uploaded CETA Galaxy Charitable Trust logo (circular design with globe, ribbon, and "CETA Galaxy Charitable Trust" text) as `frontend/public/assets/generated/ceta-logo.png`, replacing the existing file
- Update all HOPE logo image references in Navigation.tsx, HeroSection.tsx, and Footer.tsx to use the new file, preserving existing size and position
- Update all CETA logo image references in Navigation.tsx, HeroSection.tsx, and Footer.tsx to use the new file, preserving existing size and position

**User-visible outcome:** The navbar, hero section, and footer all display the new HOPE and CETA logos while everything else on the site remains unchanged.
