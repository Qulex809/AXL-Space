# AGENTS.md — Development Guidelines for AXL Space

This guide provides instructions and architectural rules for future coding agents and engineers working on AXL Space.

## Core Architectural Rules

1. **Monochrome Design System**:
   - Maintain the dark monochrome aesthetic defined in `tailwind.config.js`:
     - Background: `#0B0B0C` (`bg-axl-bg`)
     - Panels & Sidebar: `#111113` (`bg-axl-panel`)
     - Elevated Surfaces: `#18181B` (`bg-axl-surface`)
     - Borders: `#29292E` (`border-axl-border`)
     - Text Primary: `#F5F5F5` (`text-axl-text`)
     - Text Muted: `#A1A1AA` (`text-axl-muted`)
   - Avoid bright neon colors or extraneous gradient effects.
   - Prefer crisp borders and subtle contrast over heavy drop shadows.

2. **Pixel-Art Wolf Mascot (`PixelWolf`)**:
   - Do NOT replace the mascot with external image files or third-party proprietary mascots.
   - Use the inline SVG component `src/components/mascot/PixelWolf.tsx` with `shape-rendering="crispEdges"`.
   - Supported states: `idle`, `thinking`, `success`.

3. **Storage Abstraction**:
   - Never access `window.localStorage` directly from React UI components.
   - Always route storage operations through `src/lib/storage/projectRepository.ts`.
   - When integrating Supabase or cloud persistence, create an adapter implementing the same interface or provide a unified repository.

4. **AI Provider Abstraction**:
   - All AI integration logic lives in `src/lib/ai/provider.ts` and `src/lib/ai/types.ts`.
   - Never fake AI responses or simulate successful generation if no provider is configured. Return descriptive `UNCONFIGURED` states.
   - When connecting Gemini or other model providers, implement the `AIProvider` interface.

5. **Security & Secrets**:
   - NEVER commit API keys, OAuth secrets, or credentials to client code or environment variables.
   - In production, proxy model calls through a secure backend or serverless function.
   - Never execute untrusted or user-generated code inside the main application origin; use sandboxed iframes or isolated workers.

6. **Testing and Verification**:
   - Ensure `npm run lint` (`tsc --noEmit`), `npm run build`, and `npm test` pass before completing any changes.
