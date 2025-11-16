# alx-project-nexus

# Poll Nexus — Online Poll System

A responsive web app to create polls, vote, and see live results. Built with Next.js, TypeScript, Tailwind CSS, and Socket.io for real-time updates.

**Live demo:** <paste your deployed URL here>  
**Repo:** https://github.com/<your-username>/<repo-name>

## Features
- Create polls with multiple options and optional expiry
- Cast votes (single or multi-option as configured)
- Live results with charts (updates via WebSockets)
- Browse polls with search, filters (active/expired), and pagination
- Share poll links; basic anti-duplicate-vote protection (IP/cookie or auth)

## Tech
Next.js · TypeScript · Tailwind CSS · Redux Toolkit / React Query · Recharts · Socket.io · Jest / React Testing Library

## Project Overview
Project Nexus is a documentation repository that captures my journey through the ProDev Frontend Engineering program. It explains the concepts I learned, the projects I built, problems I encountered, and the engineering practices I adopted.

### This repo is meant to be:
* A readable, well-organized single source-of-truth for my portfolio and reflections.
* Useful to future collaborators and employers who want to understand my process.
* A living document — updated as I learn and refactor code.

### Key Technologies

- **Frontend frameworks & meta-frameworks:** Next.js (routing, SSR, SSG, middleware, app router), React fundamentals and hooks.
- **Styling:** Tailwind CSS, NativeWind (for RN), CSS Modules, responsive design techniques.
- **TypeScript:**  Gradual typing, utility types, strict mode, and common patterns.
- **State management & data fetching:** React Query / SWR patterns, context, lifting state.
-  **APIs:** REST and GraphQL integration, authentication flows, CORS considerations.
-  **Build & Tooling:** Vite / Next.js build processes, bundlers, linting (ESLint), formatting (Prettier).
- **Testing:** Unit testing basics (Jest), component testing (React Testing Library).
- **Accessibility & Performance:** Semantic HTML, Lighthouse metrics, image optimization.
- **Mobile & PWA:** Basics of mobile-first design, Expo/React Native, PWA fundamentals.

#### Important Frontend Concepts

- Routing (client-side vs server-side), incremental static regeneration.
- Component design patterns: presentational vs container components, compound components.
- Design systems, atomic design, and reusable component libraries.
- Progressive enhancement, graceful degradation, and feature detection.

#### Tools & Workflows

- **Git workflow:** feature branches, PRs, meaningful commit messages, semantic commits.
- **CI/CD basics:** GitHub Actions for lint/test/build and Vercel/Netlify for deployments.
- **Debugging tools:** browser devtools, React DevTools
