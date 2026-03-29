# UI/UX Redesign: "Dark Forge"

This document outlines the major UI/UX overhaul completed for the Atlas JavaScript prep platform, referred to internally as the **"Dark Forge"** aesthetic.

## 1. Aesthetic Direction: "Dark Forge"
The app was entirely redesigned to move away from a generic "template dashboard" feel into a premium, focused, weaponized code-literate environment (similar to Linear or Aceternity).

- **Core Palette**: Transitioned from standard blacks to a layered zinc background system (`--bg-void` `#09090B`, `--bg-surface` `#111113`, `--bg-elevated` `#1A1A1F`).
- **Accents**: Stripped out lime green and replaced it with a mature, warm amber/gold (`#F59E0B`) for primary actions and glowing atmospheric radial gradients, accompanied by cool sky blue for code accents.
- **Typography**: Removed default system fonts. Integrated `Instrument Serif` for a highly editorial, literary feel on main headings. Used `Geist Sans` for highly readable body text, and `Geist Mono` for precise code blocks.
- **Shadows & Depth**: Added layered drop shadows and ambient glowing shadows (`shadow-glow`) to elevate active or prominent components rather than relying on heavy borders.

## 2. Component Enhancements (Emil Kowalski & Aceternity Standards)
Implemented high-end design engineering principles focusing on interaction micro-physics:
- **Spring Animations**: Replaced raw CSS linear/ease-out transitions with Framer Motion `spring` physics across the board (bounces between `0.1` and `0.2` for snappy, magnetic feels).
- **Active States**: All primary buttons and interactive cards utilize `scale-[0.98]` physical press states.
- **Magnetic Buttons**: The primary "Start Practicing" CTA is a custom-built React component that uses `useSpring` and `useMotionValue` to gently pull the button toward the user's cursor.
- **Card Tilt**: The landing page sections utilize custom 3D parallax tilt effects (`transform-style: preserve-3d`) tied to mouse coordinates.
- **Staggered Reveals & Blurs**: Content loading, explanation un-hiding, and landing page elements enter the DOM via staggered delays, opacity fades, and filter blur resolutions.
- **Marquee Ticker**: Added a seamless infinite looping CSS variables marquee in Tailwind v4 for the stats banner on the hero page.

## 3. Core Page Overhauls
- **Landing Page**: Upgraded to a massive typography hero with `TextGenerateEffect` and a floating, interactive code execution demo card. The "How it Works" section became a sticky-scroll overlapping deck of cards, and the Topic Coverage section was rebuilt into an interactive Bento Grid with heat indicators.
- **Dashboard**: Evolved from scattered data points into a true 12-column "Command Center".
  - **Overview Cards**: Features circular SVG progress rings and clear consistency trackers.
  - **Topic Mastery**: Built a full `recharts` Radar/Spider Chart to visualize user accuracy across tags.
  - **Activity Heatmap**: Converted basic bar charts into a GitHub-style 17-week contribution heatmap matrix.
- **Question List (Library)**: Integrated a global Shadcn `<CommandDialog>` (CMD+K) palette, completely replacing the standard input box with a debounced, accessible, and fast search modal overlay.
- **Question Detail (IDE View)**:
  - Addressed responsive bleeding and footer overlapping by strictly constraining the workspace height to exactly the viewport (`min-h-[calc(100vh-3rem)]`), forcing scrolling for supplementary data.
  - Flattened rounded corners where the options panel meets the resizable handle to achieve a professional split-pane workstation look.
  - The Event Loop Replay visualization now starts completely hidden, only springing into view with an `animate-pulse-once` amber glow *after* valid code executes.
- **Scratchpad**: Pulled the scratchpad out of a cramped bottom sheet into a massive `side="right"` desktop overlay. Inside, the Monaco Editor has full breathing room on top, while Terminal Output and Event Loop diagnostics live side-by-side underneath.

## 4. Engineering Impact
- All styles strictly utilize **Tailwind CSS v4** `@theme` native variable configuration.
- Imports for animations strictly utilize `motion/react` over `framer-motion` for updated API compliance.
- No `framer-motion` components are left unclosed, and all dynamic JSX templates properly manage backtick escaping to prevent Turbopack build crashes.