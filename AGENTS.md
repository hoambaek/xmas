# Repository Guidelines

## Project Structure & Module Organization
- App Router: `src/app` contains `layout.tsx`, `page.tsx`, global styles in `src/app/globals.css`.
- UI components: `src/components/ui/*` (export PascalCase components from lowercase files, e.g., `button.tsx` exports `Button`).
- Utilities: `src/lib/utils.ts` (shared helpers like `cn`).
- Static assets: `public/*` (images, svg, pdf).
- Config: `tsconfig.json` (alias `@/*` → `src/*`), `eslint.config.mjs`, `next.config.ts`, `postcss.config.mjs`.

Example import with alias:
```ts
import { cn } from "@/lib/utils";
```

## Build, Test, and Development Commands
- `npm run dev` — Start Next.js dev server with hot reload.
- `npm run build` — Production build (`.next` output).
- `npm run start` — Launch production server (after build).
- `npm run lint` — Run ESLint using Next + TypeScript config.

Use Node 18+ (or current LTS). Install deps with `npm ci` for reproducible installs.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Prefer explicit types on public APIs.
- Components: PascalCase exports from lowercase filenames (e.g., `card.tsx` → `Card`). Prefer named exports for shared UI.
- Functions/variables: `camelCase`; constants `UPPER_SNAKE_CASE`.
- Indentation: 2 spaces. Keep files focused and small.
- Styling: Tailwind CSS v4 utility-first. Use `cn(...)` to compose classes. Avoid inline styles unless dynamic.
- Imports: Use `@/*` alias for local code; group by external → internal.

## Testing Guidelines
- No test framework is configured yet. If adding tests, prefer React Testing Library + Vitest or Playwright for e2e.
- Name tests `*.test.tsx|ts` colocated with the source or in `__tests__`.
- Keep tests deterministic; avoid network/time dependencies.

## Commit & Pull Request Guidelines
- Commits: Clear, imperative subject. Prefer Conventional Commits (e.g., `feat: add hero animation`, `fix(ui): button focus ring`). Keep diffs focused.
- Pull Requests must include:
  - Scope and rationale; link related issues.
  - Screenshots/video for UI changes.
  - How to test locally (commands, steps).
  - Confirmation that `npm run lint` passes.

## Architecture & Tips
- Next.js App Router; client components use `"use client"`. Keep server-only logic out of client files.
- Avoid modifying `next.config.ts` unless necessary; builds ignore ESLint errors by config, but fix lint violations before merging.
- Place new assets in `public/` and reference with `/path.ext`.
