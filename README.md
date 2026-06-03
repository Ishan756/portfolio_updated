# Portfolio — Next.js
> Replica of lukebaffait.fr design

## Setup
```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## Sections & What to Edit

### 1. HERO (`components/Hero.tsx`)
- Change `"Your Name"` and `"Surname."` to your real name
- The first word uses **Inter Bold** (white), the last uses **DM Serif Italic** (teal `#7dd9c8`)
- Edit tagline top-left, social links, and nav links

### 2. VIDEO SECTION (`components/VideoSection.tsx`)
Replace the placeholder div with your actual video or image:
```tsx
// Video:
<video autoPlay muted loop playsInline>
  <source src="/assets/videos/showreel.mp4" type="video/mp4" />
</video>

// Image:
<img src="/assets/images/art/sculpture.jpg" alt="3D artwork" />
```
> Drop your file into `public/assets/videos/` or `public/assets/images/art/`

### 3. ABOUT (`components/About.tsx`)
- Edit the heading text and body paragraph
- Replace the photo placeholder:
```tsx
<img src="/assets/images/profile/me.jpg" alt="Profile" />
```
> Drop your photo into `public/assets/images/profile/`

### 4. PROJECTS (`components/Projects.tsx`)
Edit the `projects` array at the top of the file:
```ts
{ id: 1, title: 'CyberDiag', date: '09 2025', category: 'Website', image: '/assets/images/projects/cyberdiag.jpg' },
```
To add project preview images, drop them into `public/assets/images/projects/` and uncomment:
```tsx
<img src={projects[active].image} alt={projects[active].title} key={active} />
```

### 5. SKILLS (`components/Skills.tsx`)
Edit the `skillGroups` array. The accordion opens/closes on click.
Change the bold uppercase heading text to match your background.

### 6. CONTACT (`components/Contact.tsx`)
- Change email and social links
- Replace image placeholder with your red/blue tinted artwork image

---

## Colors
```css
--black: #0a0a0a    /* main bg */
--white: #ffffff
--off-white: #f0f0ee  /* contact section bg */
--red: #e63020      /* swoosh, arrow accent */
--teal: #7dd9c8     /* last name color */
```

## Fonts
- **Inter** — headings & UI (weight 700–900)
- **DM Serif Display** — italic accents, video tagline

## Animations (GSAP)
Every section has scroll-triggered reveal animations in its own component.
The cursor uses GSAP for dot snapping and ring lag follow.
Smooth scroll is handled by Lenis synced with GSAP ScrollTrigger.
