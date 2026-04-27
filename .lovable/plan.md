## Why the 404 happens

Netlify is publishing `dist/client/`, but that folder contains only `assets/` and `.assetsignore` — no `index.html`. Your build is currently producing a Cloudflare Workers SSR bundle (see `dist/server/wrangler.json` and `worker-entry-*.js` in the log). Netlify just serves static files and never runs that Worker, so requests to `/` have nothing to return.

## Approach

This app is a pure client-side React presentation (one `App` component, no loaders, no server functions, no data fetching). The cleanest fix is to build it as a **static SPA** instead of an SSR Worker. No code changes to the presentation itself.

Note: you selected "Migrate to Netlify". A full SSR-on-Netlify migration would require replacing the Cloudflare adapter, adding a Netlify Function for the SSR handler, etc. — but since the app has zero server-side logic, that's overkill. A static SPA build gives you the same end result with far less risk. If you'd rather do the full SSR migration anyway, tell me and I'll re-plan.

## Changes

### 1. Replace `vite.config.ts` to disable the TanStack Start SSR/Workers adapter
Switch to a plain Vite + React + Tailwind + tsconfig-paths setup that produces a standard SPA in `dist/`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
```

### 2. Add a SPA entry point
- `index.html` at the project root mounting `<div id="root">` and loading `/src/main.tsx`.
- `src/main.tsx` that creates a React root, sets up the TanStack Router (`RouterProvider` with `getRouter()`), and renders into `#root`.
- Move the favicon `<link>` and document title into `index.html` (since `__root.tsx`'s `HeadContent`/`Scripts` only run during SSR).

### 3. Add `netlify.toml` at the repo root
```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
The redirect rule is the SPA fallback so deep links / refresh don't 404.

### 4. Add `public/_redirects` as a backup
```
/*  /index.html  200
```

### 5. Delete Workers-only files
- `wrangler.jsonc` (no longer needed)
- Optional: remove `@cloudflare/vite-plugin` and `@lovable.dev/vite-tanstack-config` from `package.json` to slim the install. (Safe to leave them; they're just unused.)

## Netlify dashboard settings

After these changes, set in Netlify → Site settings → Build & deploy:
- **Build command:** `bun run build` (or `npm run build`)
- **Publish directory:** `dist`

## Trade-offs

- ✅ Works on Netlify immediately, no Functions needed.
- ✅ No code changes to your presentation.
- ⚠️ You lose the ability to add TanStack Start server functions later. If you need them, switch back to Lovable Publish (Cloudflare) or do a full Netlify Functions migration.
- ⚠️ The Lovable in-editor preview will keep working (Vite dev server is unaffected), but the live preview build pipeline targets the same SPA output now.
