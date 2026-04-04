# CLAUDE.md — Hintmint

Marketing website for hintmint.com. Static HTML with Tailwind CSS build step.

See [`~/Developer/CLAUDE.md`](../../Developer/CLAUDE.md) for global conventions. See [`~/Developer/SCAFFOLDING.md`](../../Developer/SCAFFOLDING.md) for scaffolding reference.

---

## Project overview

- **Client:** Hintmint
- **Tech stack:** Static HTML + Tailwind CSS v4 (build step) + vanilla JS
- **Repo:** github.com/eightecho/hintmint
- **Hosting:** **Eight Echo hosts this site** (unlike most client projects)
- **Live URL:** https://hintmint.com
- **Cloudflare Pages project:** `hintmint`

---

## Folder structure

```
hintmint/
├── CLAUDE.md
├── CHANGELOG.md
├── package.json           ← Tailwind build tool (at root)
├── node_modules/
├── dev/                   ← Active workspace
│   ├── index.html         ← Homepage
│   ├── 404.html
│   ├── CNAME              ← hintmint.com (for Cloudflare Pages custom domain)
│   ├── sitemap.xml
│   ├── src/
│   │   └── styles/
│   │       └── main.css   ← Tailwind source
│   ├── assets/
│   │   ├── css/main.css   ← Tailwind build output (gitignored? no — committed)
│   │   ├── images/
│   │   ├── js/
│   │   └── video/
│   ├── contact/index.html
│   ├── our-story/index.html
│   ├── our-ethos/index.html
│   ├── faq/index.html
│   ├── creative-flair/index.html
│   ├── distribution/index.html
│   ├── private-label/index.html
│   ├── quiet-luxury/index.html
│   ├── privacy-policy/index.html
│   └── terms-of-use/index.html
└── production/            ← Deploy-ready build (excludes src/)
    └── (mirror of dev/ minus src/)
```

**Folder-as-URL pattern:** Each page lives in its own folder with `index.html` inside. This gives pretty URLs (`/contact` instead of `/contact.html`) on both GitHub Pages and Cloudflare Pages.

---

## Lifecycle

This project uses the **publish workflow** because Eight Echo hosts the live site on a client domain.

### Dev server

```bash
cd ~/8E/hintmint

# Watch mode — rebuilds Tailwind CSS on file changes
npm run watch:css &

# Serve dev/
python3 -m http.server 8083 --directory dev/ &
```

### Promote — Build and copy dev/ → production/

```bash
cd ~/8E/hintmint

# Build minified Tailwind CSS into dev/assets/css/main.css
npm run build

# Sync dev/ to production/ (exclude Tailwind source)
rsync -a --delete --exclude='src' dev/ production/
```

### Publish (to hintmint.com via Cloudflare Pages)

```bash
cd ~/8E/hintmint
npx wrangler pages deploy production/ --project-name hintmint
```

This pushes to the `hintmint` Cloudflare Pages project, which serves `hintmint.com` directly.

---

## Notes

### Migration from GitHub Pages
This site was previously hosted on GitHub Pages via `.github/workflows/deploy.yml`. The workflow is currently **disabled** (renamed to `deploy.yml.disabled`) to prevent double-deploys during the Cloudflare migration. Once Cloudflare is verified stable, the workflow file can be deleted.

### Tailwind build output
`dev/assets/css/main.css` is the compiled output from `dev/src/styles/main.css`. It IS committed to git so the site works without requiring a build step on the consuming side (matches the original GitHub Pages workflow). The `production/` copy gets a fresh build via `npm run build` during promote.

### wpsite/
The original WordPress export (`wpsite/`) was removed. If historical reference is needed, it's in the git history.

---

## Known stubs / placeholders

- [ ] [List anything wired up but not yet implemented]

---

## TODO — post Cloudflare migration

- [ ] Deploy to Cloudflare Pages (first deploy to `*.pages.dev` URL for verification)
- [ ] Verify the preview URL matches the current GitHub Pages site
- [ ] In Cloudflare dashboard, add `hintmint.com` as a custom domain for the `hintmint` project
- [ ] Remove the GitHub Pages CNAME DNS record (let Cloudflare handle it)
- [ ] Delete `.github/workflows/deploy.yml.disabled` once confirmed stable
