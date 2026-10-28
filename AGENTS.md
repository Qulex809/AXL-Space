# AGENTS.md — Development Guidelines for AXL Space

This document serves as the guide for AI coding agents and human contributors working on AXL Space.

## Project Vision & Identity

AXL Space is a web-first AI-powered vibe coding platform foundation.
- **Brand Name**: AXL Space
- **Visual Design**: Dark monochrome palette (`#0B0B0C` main bg, `#111113` panel, `#18181B` surface, `#29292E` border, `#F5F5F5` primary text, `#A1A1AA` muted text).
- **Mascot**: Original pixel-art wolf mascot (`PixelWolf`) rendered using crisp inline SVG with `shape-rendering="crispEdges"`.

## Architecture Overview

1. **Storage Layer**: All project CRUD operations MUST pass through `ProjectRepository` (`src/lib/storage/projectRepository.ts`) using the localStorage key `axl_space_projects_v1`.
2. **AI Provider Abstraction**:
   - Interfaces in `src/lib/ai/types.ts`.
   - Provider implementation in `src/lib/ai/provider.ts`.
   - Never mock successful AI generation with fake static code; return an explicit `unconfigured` status when no valid provider key is set.
3. **Components**:
   - `Sidebar`: Collapsible sidebar navigation, search filter, project list, settings, and profile placeholder.
   - `HomeScreen`: Welcoming header "Bugün ne inşa ediyoruz?", prompt composer, starter suggestions.
   - `Workspace`: Two/three-panel workspace with title editing, conversation history, and subtabs (`Önizleme`, `Kod`, `Dosyalar`).
   - `PixelWolf` & `WolfHelper`: Mascot and static tip helper widget.

## Development Rules & Conventions

- **Strict TypeScript**: Do not use `any`. Always use explicit types defined in `src/types/` or `src/lib/ai/types.ts`.
- **Styling**: Use Tailwind CSS with dark monochrome palette classes defined in `tailwind.config.js` (`axl-*`).
- **Security**: Never hardcode API keys or secret credentials in client-side code or commit them to git.
- **Verification**: Ensure `npm run lint`, `npm test`, and `npm run build` all pass before submitting any PRs or code updates.

## Testing Setup

Vitest is configured with `jsdom`. Place test files in `src/__tests__/`.
To run tests:
```bash
npm test
```
