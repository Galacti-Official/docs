# Galacti Docs

Documentation site built with Next.js and MDX.

## Adding a new page

### 1. Create the MDX file

Create `src/app/(docs)/<slug>/page.mdx`. For nested routes use `src/app/(docs)/<section>/<slug>/page.mdx`.

```mdx
export const metadata = {
  title: "Page Title — Galacti Docs",
  description: "Short description.",
};

# Page Title

Content here.
```

The `(docs)` route group automatically wraps the page with the sidebar, table of contents, and pagination.

### 2. Add it to the nav

Open `lib/docs-nav.ts` and add an entry to the relevant section (or create a new section):

```ts
{ title: "Page Title", href: "/slug" },
```

The sidebar and pagination (prev/next) derive from this file. That's it — search is handled automatically at build time.

## Dev server

```bash
npm run dev
```

> Search does not work in dev mode — it requires a production build.

## Build and preview

```bash
npm run build   # builds the site and runs Pagefind to generate the search index
npm run preview # serves the built site locally at http://localhost:3000
```
