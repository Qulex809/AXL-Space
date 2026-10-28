# AXL Space

AXL Space is a web-first AI-powered "vibe coding" platform foundation built with React 19, TypeScript, Vite, and Tailwind CSS.

It provides a dark, minimal developer workspace where users can describe an application idea in natural language, create and manage projects locally, inspect generated files and code, and connect to AI model providers.

## Visual Design & Mascot

- **Monochrome Dark Palette**: `#0B0B0C` (bg), `#111113` (panel), `#18181B` (surface), `#29292E` (border), `#F5F5F5` (text), `#A1A1AA` (muted).
- **Pixel-Art Wolf Mascot (`PixelWolf`)**: An original pixelated mascot companion rendered in pure crisp inline SVG (`shape-rendering="crispEdges"`), supporting `idle`, `thinking`, `success`, `running`, `howling`, and `error` states.
- **Wolf Helper (`WolfHelper`)**: A small dismissible helper widget providing static vibe coding tips and starter prompt insertions without fake assistant claims.

## Key Features

1. **Local Project Persistence**: Managed via `ProjectRepository` storage abstraction backed by `localStorage` (`axl_space_projects_v1`).
2. **Project Creation & Workspace Flow**: Users can enter a prompt on the home screen or click starter suggestions to initialize a project shell with smart title derivation.
3. **Multi-panel Workspace**: Includes a conversation/task log, title editor, and tabbed views for "Önizleme" (Preview), "Kod" (Code), and "Dosyalar" (Files).
4. **AI Provider Abstraction**: Strongly typed provider abstraction (`AIProvider`, `GenerationRequest`, `GenerationResponse`) with an explicit `UnconfiguredAIProvider` fallback state.
5. **Mobile-Responsive**: Collapsible sidebar, mobile drawer overlay, and responsive layout across all screens.

## Project Structure

```
src/
├── components/
│   ├── home/         # Home screen with prompt composer and starter suggestions
│   ├── layout/       # Sidebar navigation and header shell
│   ├── mascot/       # PixelWolf mascot component & WolfHelper widget
│   ├── settings/     # Settings modal for API key configuration
│   └── workspace/    # Project workspace layout (Preview, Code, Files)
├── lib/
│   ├── ai/           # AI Provider abstraction interfaces & Gemini/Unconfigured implementations
│   └── storage/      # ProjectRepository localStorage persistence layer
├── types/            # TypeScript interfaces for Project, File, Message, etc.
└── test/             # Vitest test setup and test files
```

## Setup & Running Locally

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Type Checking & Linting

```bash
npm run lint
```

### Run Unit Tests

```bash
npm test
```

### Production Build

```bash
npm run build
```

## How to Continue Development in Google AI Studio

1. Import this repository into **Google AI Studio Build**.
2. Configure a Gemini API key in `src/lib/ai/provider.ts` or via the in-app Settings Modal.
3. Replace the `GeminiAIProvider` stub in `src/lib/ai/provider.ts` with real Gemini API calls to process user prompts and generate structured multi-file code responses.
4. Connect an isolated sandbox execution engine (such as WebContainers or an iframe worker) to render live previews in the Workspace "Önizleme" tab.
