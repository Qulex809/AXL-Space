# AGENTS.md — Development Conventions & Guidelines for AXL Space

This document outlines architectural principles, coding conventions, component rules, and security guidelines for future coding agents and engineers working on **AXL Space**.

---

## 🏛 Architectural Principles

1. **Web-First & Minimal Dependencies:**
   - AXL Space is a web-first application built with Vite, React, TypeScript, and Tailwind CSS.
   - Do not introduce large UI frameworks, complex state management libraries (e.g., Redux), or unnecessary runtime dependencies.

2. **Honest AI Integration:**
   - Never fabricate fake generated code or simulate successful model responses without a real API key.
   - All AI integrations must go through the provider abstraction in `src/lib/ai/provider.ts`.
   - When no provider key is present, explicitly show an unconfigured state to the user.

3. **Design System & Palette:**
   - Follow the monochrome dark theme defined in `tailwind.config.js`:
     - Background: `#0B0B0C` (`bg-axl-bg`)
     - Sidebar/Panels: `#111113` (`bg-axl-panel`)
     - Surfaces: `#18181B` (`bg-axl-surface`)
     - Borders: `#29292E` (`border-axl-border`)
     - Primary Text: `#F5F5F5` (`text-axl-text`)
     - Muted Text: `#A1A1AA` (`text-axl-muted`)
   - Avoid colorful gradients, glassmorphism, or distracting bright neon colors.
   - Maintain high contrast, subtle borders, and clean typography.

4. **Brand Mascot (`PixelWolf`):**
   - The pixel-art wolf mascot is rendered using handcrafted inline SVG with `shape-rendering="crispEdges"`.
   - Palette remains strictly monochrome (white, grays, dark accents).
   - Maintain the existing expressions (`idle`, `thinking`, `success`) and avoid replacing it with third-party artwork.

---

## 🔒 Security Guidelines

- **Zero Secret Credentials in Client Code:**
  - Never hardcode API keys, tokens, or credentials in client-side source code.
  - API keys must be entered by the user at runtime in settings or supplied securely via environment variables.
- **Safe Code Execution:**
  - Generated code previews must run in isolated sandboxes (`iframe` with sandbox restrictions or secure container webworkers) and never evaluated directly via `eval` or unsafe `dangerouslySetInnerHTML`.

---

## 📁 Repository Directory Structure

```
src/
├── components/
│   ├── layout/       # Application shell & Sidebar
│   ├── mascot/       # PixelWolf mascot & WolfHelperWidget
│   └── settings/     # Settings & Integration modal
├── features/
│   ├── home/         # Home screen prompt composer & starter suggestions
│   └── workspace/    # Multi-panel workspace (Preview, Code, Files)
├── lib/
│   ├── ai/           # AI provider interfaces & types
│   └── storage/      # LocalStorage project repository abstraction
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🧪 Testing & Verification Requirements

- Run `npm run lint` (`tsc --noEmit`) to verify zero type errors.
- Run `npm test` (`vitest run`) to verify storage and component unit tests pass.
- Run `npm run build` (`tsc && vite build`) to confirm production build completion.
