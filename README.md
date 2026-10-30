# AXL Space — AI-Powered Vibe Coding Platform Foundation

AXL Space is a web-first AI-powered vibe coding platform foundation. It provides an intuitive workspace for developers to conceptualize applications in natural language, iterate on tasks, inspect code, and prepare for multi-provider AI model connections.

## Brand Identity & Aesthetic

- **Minimalist Monochrome Dark Palette**:
  - Background: `#0B0B0C`
  - Sidebar & Panels: `#111113`
  - Elevated Surfaces: `#18181B`
  - Borders: `#29292E`
  - Text: `#F5F5F5` / Muted: `#A1A1AA`
- **Original Pixel-Art Wolf Mascot (`PixelWolf`)**:
  - Handcrafted crisp inline SVG pixel art with pointed ears, compact wolf muzzle, and pixelated tail.
  - Three visual states: `idle`, `thinking`, and `success`.
  - Accompanying dismissible helper widget (`WolfHelperWidget`) offering non-intrusive vibe coding tips.

## Technology Stack

- **Framework**: React 19 + TypeScript (strict mode)
- **Tooling**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage with typed `ProjectRepository` abstraction
- **Testing**: Vitest with unit tests

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── HomeScreen.tsx     # Home screen with prompt composer & suggestions
│   │   │   ├── Sidebar.tsx        # Project list, search, collapsible navigation
│   │   │   ├── Workspace.tsx      # Task stream, preview, code & file inspection tabs
│   │   │   └── SettingsModal.tsx  # Extensible settings dialog for future integrations
│   │   └── mascot/
│   │       ├── PixelWolf.tsx      # Handcrafted pixel-art wolf mascot component
│   │       └── WolfHelperWidget.tsx # Dismissible starter helper tips widget
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── types.ts           # AI provider interfaces, error types, file change schema
│   │   │   └── provider.ts        # AIServiceManager & graceful UnconfiguredProvider
│   │   └── storage/
│   │       └── projectRepository.ts # Typed local storage persistence for projects
│   ├── App.tsx                    # Root application container & responsive layout
│   ├── index.css                  # Tailwind styles and custom monochrome scrollbar
│   └── main.tsx                   # App bootstrap entry
├── public/
│   └── favicon.svg                # Pixel wolf favicon
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Typechecks with TypeScript (`tsc`) and generates the production bundle (`vite build`).
- `npm run lint`: Runs typechecking (`tsc --noEmit`).
- `npm test`: Runs the Vitest test suite.

## What is Implemented

1. **Brand & Mascot**: Original SVG pixel-art wolf mascot with `idle`, `thinking`, and `success` states, plus the dismissible helper widget.
2. **Project Creation & Persistence**: Create projects from multiline prompts or starter suggestions; stored in `localStorage` through `projectRepository`.
3. **Responsive Workspace**:
   - Sidebar with search filtering, collapse/expand toggle, mobile drawer.
   - Project name editing.
   - Dual-column workspace: conversation/task panel on the left, tabs ("Önizleme", "Kod", "Dosyalar") on the right.
   - Honest, informative placeholder states explaining that the execution and model engine are awaiting configuration.
4. **AI Provider Architecture**: Strongly-typed abstraction ready for Google AI Studio / Gemini 2.5 and Anthropic models without mock/fake generated data.
5. **Security**: No secrets or hardcoded credentials; safe `.env.example`.

## Intentionally Not Implemented Yet

- Live code generation execution via real model APIs (ready to connect via `src/lib/ai/provider.ts`).
- In-browser code execution sandbox (WebContainers or sandboxed iframe execution engine).
- Supabase cloud authentication & sync (prepared in `SettingsModal` and repository model).

## Next Steps for Google AI Studio Build

1. Import the repository into Google AI Studio Build as a web application.
2. Provide a Gemini API key via server proxy or secure environment variable (`VITE_GEMINI_API_KEY`).
3. Implement `GeminiProvider` implementing `AIProvider` in `src/lib/ai/provider.ts`.
4. Connect preview tab to a WebContainer or sandboxed preview runner for live rendering.
