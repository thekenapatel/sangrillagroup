---
name: sangrilla-real-estate-design
description: Defines SANGRILLA GROUP's premium real-estate website design direction, UX patterns, content style, responsive layouts, accessibility, and implementation standards. Use when designing, auditing, or modifying the SANGRILLA website.
---

# SANGRILLA GROUP — Website Design & Development Skill

> Reusable design direction for AI coding agents working on https://www.sangrillagroup.com  
> Brand direction: premium, timeless, trustworthy real estate.  
> Brand line: **Nothing Less Than Heaven.**

## 1. How to use this file

Before changing the website:
1. Read this file completely.
2. Inspect the existing repository, framework, routes, components, assets, and design tokens.
3. Review the live website at https://www.sangrillagroup.com and compare it with the current local implementation.
4. Create a short implementation plan describing the pages/components to change, reusable components to create, assets needed, and any risks.
5. Implement the changes in the existing project architecture. Do not rebuild the site from scratch unless explicitly asked.
6. Run available lint, type-check, tests, and production build. Fix errors introduced by the changes.
7. Summarize changed files, key decisions, validation performed, and anything that still needs human input.

Do not assume a framework or package is installed. Inspect `package.json`, lockfiles, source folders, and project instructions first. Preserve the existing stack unless there is a clear, justified reason to change it.

## 2. Role and quality bar

Act as a senior digital art director, luxury real-estate brand designer, UX strategist, and careful front-end engineer.

Create a distinctive, conversion-focused digital experience for an established real-estate developer in Ahmedabad, Gujarat, India. The website should feel premium and considered, not like a generic property template.

Priorities, in order:
1. Trust, clarity, and factual accuracy.
2. Strong visual identity and architectural storytelling.
3. Easy project discovery and enquiry journeys.
4. Excellent mobile usability and accessibility.
5. Performance, maintainability, and search visibility.
6. Subtle, purposeful motion.

## 3. Brand identity

### Brand attributes
- Timeless, premium, elegant, confident, calm, dependable, architectural.
- Luxury through restraint, spacing, material, imagery, and typography—not excessive gold, glow, gradients, or animation.
- Indian real-estate context with an international editorial design standard.
- Respect the existing SANGRILLA logo, S symbol, and trident motif. Do not redraw, distort, or replace brand assets without approval.

### Suggested visual tokens
Treat these as initial design recommendations. Inspect existing brand assets and CSS variables before applying them, and centralize tokens so they can be refined.

- Obsidian / near-black: `#111111`
- Deep charcoal: `#1B1B1B`
- Champagne gold: `#C5A46D`
- Warm ivory: `#F5F1E8`
- Pure white: `#FFFFFF`
- Muted text: `#77736B`
- Borders: `#DED8CC`

Use gold as an accent for small details, active states, thin rules, icons, and selected calls to action. Avoid making every heading, button, and border gold. Maintain WCAG-friendly contrast; do not use pale gold for small text on white.

### Typography
- Headings: an elegant, legible editorial serif (for example, Cormorant Garamond or Playfair Display if the project can load it reliably).
- Body, navigation, labels, and UI: a clean sans-serif (for example, Inter or Manrope).
- Use a clear type scale, comfortable line-height, intentional line breaks, and restrained letter spacing.
- Avoid using too many font families or all-caps body copy.
- Prefer self-hosted or optimized font loading where practical; include sensible fallbacks.

### Imagery
- Prioritize authentic photographs, architectural renders approved for use, landscape imagery, interiors, materials, and people enjoying spaces.
- Use large, carefully cropped images and consistent aspect ratios.
- Apply overlays only when necessary to preserve text readability.
- Do not use unrelated luxury stock photos to imply they depict a SANGRILLA project.
- Clearly label artist impressions and illustrative renders where applicable.
- Never fabricate project photography, construction progress, awards, client testimonials, delivery status, amenities, or location claims.
- If suitable assets are missing, use existing assets first and add a clearly named placeholder rather than inventing facts.

## 4. Reference websites and what to learn from them

These websites are inspiration for design patterns and content structure—not assets or layouts to copy.

- Shivalik Group — https://shivalikgroup.com/  
  Study its connected real-estate ecosystem, project categorization, local-market relevance, and links between different business verticals.
- Godrej Properties — https://www.godrejproperties.com/  
  Study structured project discovery, location browsing, featured projects, trust signals, and clear project information.
- Ganesh Housing — https://ganeshhousing.com/  
  Study Ahmedabad-specific positioning, company milestones, local credibility, and portfolio presentation.
- DLF — https://www.dlf.in/homes/  
  Study architectural scale, premium project imagery, lifestyle storytelling, and presentation of delivered developments.
- Lodha — https://www.lodhagroup.com/  
  Study editorial luxury, typography, spacious layouts, architectural imagery, and restrained copy.
- SOBHA — https://www.sobha.com/  
  Study craftsmanship-led messaging, location and property discovery, and quality-focused presentation.
- Prestige Group — verify the current official website before use; inspect portfolio organization and consistent branding across project categories.
- Adani Realty — https://www.adanirealty.com/  
  Study location-based project discovery, testimonials, residential/commercial categories, and township storytelling.

For every reference, identify the underlying UX principle and adapt it to SANGRILLA's own brand, assets, audience, and business model. Do not copy their logos, text, code, distinctive page compositions, or images.

## 5. Website experience and information architecture

Inspect the actual current website and preserve valid routes. Recommend or improve these sections where appropriate and supported by real company information:

### Main navigation
- Home
- About SANGRILLA
- Projects (with Residential, Commercial, Plotted Developments, or other real categories only)
- Our Approach / Why SANGRILLA
- News & Insights (only if maintained)
- Contact / Enquire

Use a clean header with clear hierarchy. On desktop, consider a refined sticky header that transitions from transparent over a hero to a solid background after scrolling, provided it does not harm readability or performance. On mobile, use an accessible menu with a visible close action and working keyboard controls.

Do not invent categories or pages that the company does not actually offer. Update navigation to reflect the real portfolio.

## 6. Homepage content and layout direction

Build the page as a deliberate story. The following is a recommended order, not a mandate to add unsupported content.

### A. Hero — first impression
- Use one strong, high-quality project or architectural image/video.
- Keep the hero uncluttered with a confident headline, short supporting line, and one primary CTA.
- Possible brand line: “Nothing Less Than Heaven.”
- Supporting copy should explain what SANGRILLA actually develops; do not make vague claims that could fit any developer.
- Suggested CTA: “Explore Our Projects” and a secondary “Speak to Our Team”.
- Use subtle image movement or a restrained entrance animation only if it adds value.
- Ensure hero text remains readable at every responsive size and does not cover key image content.

### B. Brand introduction
- Introduce SANGRILLA's philosophy, history, and approach using verified facts.
- Prefer a short, distinctive statement over a long generic company paragraph.
- Add an “Our Story” link to the About page.

### C. Featured projects
- Use large image-led cards with project name, location, property type, and verified status.
- Provide a clear path to the individual project page.
- Include filters only if there are enough real projects for filtering to be useful.
- Never invent price, availability, possession dates, square footage, RERA number, or project status.

### D. The SANGRILLA difference
- Explain genuine strengths using evidence: design approach, execution philosophy, customer experience, location knowledge, or other verified differentiators.
- Avoid empty claims such as “No. 1”, “best in India”, “guaranteed returns”, or “unmatched quality” unless legally approved and substantiated.

### E. Brand / company story
- Use a refined editorial layout with text paired with a meaningful image, timeline, or architectural detail.
- Only show years, leadership details, milestones, and delivery statistics after verification.

### F. Lifestyle and design philosophy
- Communicate how spaces support everyday living, comfort, community, and long-term usefulness.
- Avoid promising lifestyle facilities that are not part of a specific project.

### G. Trust and proof
- Include real project milestones, approved testimonials, authentic media coverage, certifications, and RERA details where relevant.
- If verified proof is not available, omit the section rather than creating fake evidence.

### H. Enquiry section
- Invite visitors to discuss a project or request details.
- Keep forms short: name, phone/email, project of interest, and consent where required.
- Validate fields, show clear success/error states, and protect personal data.
- Connect to the existing backend or CRM only after inspecting the implementation. Never pretend a form submission succeeded if it did not.

### I. Footer
- Include verified company contact details, office address, social links, key navigation, privacy policy, and relevant legal/RERA disclosures.
- Avoid placeholder contact details in production.

## 7. Project detail page template

Every project page should help a visitor understand the project and decide on a next step.

Recommended sections, when applicable:
1. Project hero with name, actual location, type, and clear enquiry CTA.
2. Short project overview.
3. Verified project highlights and specifications.
4. Image gallery, with accessible captions and responsive behavior.
5. Location and connectivity—only with substantiated distances and routes.
6. Floor plans / plot plans / master plan, only if approved for public use.
7. Amenities and lifestyle details confirmed for that project.
8. Project status, expected completion or possession information, and RERA details where applicable.
9. FAQs answering genuine buyer questions.
10. Enquiry form and contact options.
11. Related projects, if useful.

Make it easy to distinguish current, completed, upcoming, and under-construction projects. Never imply that a proposed or illustrative image is a photograph of a completed property.

## 8. UI components and interactions

Build reusable components consistent with the existing codebase:
- Header and mobile navigation
- Footer
- Primary, secondary, and text buttons
- Project card and project grid
- Section heading / eyebrow label
- Image gallery
- Enquiry form
- Breadcrumbs
- FAQ accordion
- Trust / milestone block
- Cookie or consent UI only if needed by the actual site

Interaction requirements:
- All buttons and links must do what their labels promise.
- Forms need client-side validation and meaningful feedback; server-side validation is also required when a backend exists.
- Menus, dialogs, and accordions must work with keyboard and touch.
- Provide visible focus styles and meaningful accessible names.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary carousels, autoplay audio, cursor gimmicks, scroll-jacking, and animation that blocks content.
- Use motion sparingly: gentle opacity/position reveals, restrained image transitions, and clear hover/focus states.

## 9. Responsive behavior

Design mobile-first and verify at small phone, large phone, tablet, laptop, and wide desktop sizes.

- No horizontal overflow.
- Navigation and forms must be comfortable to use on touch screens.
- Keep body text readable and tap targets sufficiently large.
- Images must crop intentionally rather than hide the subject.
- Desktop-only interactions must have a mobile alternative.
- Avoid fixed heights that cut off important text on smaller screens.
- Test long project names, long headings, empty data, and missing images.

## 10. Technical and implementation rules

- Inspect and follow the project's actual framework, TypeScript settings, package manager, folder structure, and conventions.
- If the project uses React and TypeScript, prefer typed reusable components and avoid `any` unless justified.
- Reuse installed libraries. Do not add packages just to implement a minor effect.
- Keep components focused and maintainable; avoid a giant component for an entire page.
- Keep content and project data separate from presentation when that matches the existing architecture.
- Use semantic HTML and accessible form controls.
- Use optimized image formats/sizes, lazy-load below-the-fold imagery, and avoid lazy-loading the main hero image if it harms LCP.
- Prevent layout shifts by reserving image dimensions.
- Avoid duplicate CSS, unnecessary dependencies, dead code, and console errors.
- Do not expose API keys, secrets, private environment variables, or customer data.
- Never replace real content with mock data in production without clearly flagging it.
- Do not remove working functionality simply to make the page look cleaner.

## 11. SEO, performance, accessibility, and compliance

- Give each public page a unique, descriptive title and meta description.
- Use one clear primary page heading and a logical heading hierarchy.
- Add descriptive alt text to meaningful images; use empty alt text for decorative images.
- Use canonical URLs and structured data only when accurate and supported.
- Keep internal links descriptive and working.
- Check image size, font loading, Core Web Vitals, and unnecessary JavaScript.
- Aim for WCAG 2.2 AA practices where practical.
- Use consent and privacy language appropriate to the actual data collection.
- Ensure project claims, RERA details, disclosures, prices, and availability are reviewed by the business/legal owner before publication.
- Do not promise investment returns or guaranteed appreciation.

## 12. Content voice

Write in a voice that is:
- Refined, confident, human, and specific.
- Aspirational without exaggeration.
- Clear enough for first-time property buyers.
- Grounded in actual design, place, craftsmanship, service, and verified project details.

Avoid:
- Generic AI-sounding paragraphs.
- Repeated phrases such as “where luxury meets comfort” on every page.
- Fake scarcity, manipulative urgency, guaranteed returns, or unverified superlatives.
- Overuse of exclamation marks and ALL CAPS.
- Unsupported claims about nearby infrastructure, future appreciation, project scale, or possession.

## 13. Definition of done

Before finishing a task, confirm:
- [ ] The change matches SANGRILLA's identity and this design direction.
- [ ] Existing routes and working functionality are preserved.
- [ ] Desktop and mobile layouts have been checked.
- [ ] All buttons, navigation, forms, and interactive states work.
- [ ] Accessibility, focus, and reduced-motion behavior have been considered.
- [ ] Images and factual claims are authentic and approved.
- [ ] No invented testimonials, metrics, awards, amenities, prices, or RERA details were added.
- [ ] No obvious console, lint, type-check, test, or build errors remain.
- [ ] The final response lists files changed, decisions made, checks run, and outstanding items.

## 14. First task for the coding agent

Do not immediately rewrite the whole website. First:
1. Audit the current website and repository.
2. Identify the current framework, page routes, reusable components, brand assets, and major UX/design issues.
3. Compare the existing experience against the principles in this file.
4. Produce a prioritized plan with quick wins, larger redesign work, content gaps, and risks.
5. Then implement the first approved set of changes while preserving the current working site.

The final result should feel unmistakably like SANGRILLA: timeless, premium, architectural, trustworthy, and thoughtfully designed.
