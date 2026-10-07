# Deployment Guide: Ply Dot Com

This document outlines the final steps to deploy the Ply Dot Com frontend to a production environment.

## 1. Local Development
To run the project locally:
```bash
npm install
npm run dev
```

## 2. Production Build
To generate a production-ready build:
```bash
npm run build
```
The output will be generated in the `dist` folder.

## 3. Environment Requirements
- **Node.js**: v18+ is recommended.
- **Package Manager**: npm, yarn, or pnpm.
- **Backend/Database**: None required. This is a static SPA.

## 4. Vercel Deployment Steps
The easiest way to deploy this Vite/React SPA is via Vercel:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log into [Vercel](https://vercel.com/) and click "Add New... -> Project".
3. Import the repository.
4. **Framework Preset**: Vercel will auto-detect "Vite".
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click "Deploy".

## 5. Domain Configuration
Once deployed to Vercel:
1. Go to your Vercel Project Settings > Domains.
2. Add your custom domain (e.g., `plydotcom.in` or `plydotcom.com`).
3. Follow the DNS instructions provided by Vercel to update your domain registrar (A record or CNAME).

## 6. Sitemap & Robots Update
**CRITICAL**: Before final deployment, you must update the placeholder domain in:
- `public/sitemap.xml`
Change `[your-production-domain]` to your actual domain.

## 7. Final Asset Replacement
- Replace `src/assets/hero.png` with your final high-resolution hero image or video.
- The official logo has already been integrated at `src/assets/logo.png`.
