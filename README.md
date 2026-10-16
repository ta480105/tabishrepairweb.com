# Tabish Web — Cloudflare Pages

## Cloudflare Pages build settings
- Framework preset: Vite
- Build command: `npm install && npm run build`
- Build output directory: `dist`
- Root directory: repository root (folder containing `package.json`)

This project should use npm on Cloudflare Pages. Remove any old `bun.lock` or `bun.lockb` from the GitHub repository if present so the build system does not select Bun based on a stale lockfile.

## Supabase configuration
Set server-side secrets in Cloudflare Pages > Settings > Variables and Secrets for Production (and Preview if needed):
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`, depending on the function code)

Never use a `VITE_` prefix for a Supabase secret/service-role key. Run the SQL migration files in `supabase/migrations/` in order using Supabase SQL Editor.

## Push changes from PowerShell
From your local repository folder, after copying the updated files into it:
```powershell
git status
git add -A
git commit -m "Fix Cloudflare Pages deployment configuration"
git push origin main
```
If your default branch is not `main`, replace `main` with the branch name shown by `git branch --show-current`.
