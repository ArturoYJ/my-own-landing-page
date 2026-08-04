# Arturo Yion Jaime — Professional Engineering Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript 5](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

A high-performance, responsive personal portfolio and engineering showcase built by **Arturo Yion Jaime** (Full-Stack & Mobile Software Engineer). Built from the ground up using **Next.js 16 (App Router)**, **React 19**, and strict **TypeScript**, this portfolio highlights systems architectures ranging from Service-Oriented Architecture (SOA) backends to Hexagonal REST APIs and MVVM native Android applications.

---

## 🏛️ Engineering Philosophy & Architectural Guardrails

This codebase reflects a disciplined approach to modern software engineering:

- **Strict Type Safety & Zero Ambiguity:** Completely typed with TypeScript (`noEmit` validated). No usage of `any`.
- **Next.js 16 App Router Conventions:** Fully compliant with Next.js 16 breaking changes, including asynchronous route parameter resolution (`await params` in dynamic routes and metadata generation).
- **CSS Custom Properties & Zero-Runtime Styling:** All design tokens (colors, typography, spacing, elevations) are centrally managed in `src/app/globals.css` using native CSS variables and scoped via **CSS Modules**—eliminating runtime CSS-in-JS overhead and improving Core Web Vitals (CWV).
- **Clean Architecture & Cohesion:** Strict separation of static domain content (`src/data`), UI presentation (`src/components`), and interactive behavior (`src/hooks`). Zero dead code or unreferenced legacy tokens.

---

## 🚀 Featured Engineering Projects

| Project | Role / Domain | Architecture & Tech Stack | Key Results |
| :--- | :--- | :--- | :--- |
| **[GlamStock](https://github.com/ArturoYJ/GlamStock)** | Retail & Cosmetics Inventory System for SMEs | **SOA**, Express.js, PostgreSQL, Docker, AWS, Zod, TypeScript | Evolved from a monolith to SOA; normalized PostgreSQL schema (+1,500 records); reduced integration errors by 70% with Zod validation. |
| **[Hugin Munin](https://github.com/ArturoYJ/hugin_munin_ng)** | ZOOMAT Wildlife Conservation Management | **Hexagonal Architecture**, Kotlin, Ktor, Angular, PostgreSQL | Desegregated records for +200 protected species at Chiapas Zoo; decoupled domain logic from Ktor API; cut report generation from days to seconds. |
| **[PillUp](https://github.com/ArturoYJ/PillUp)** | Native Android Healthcare & Med Tracker | **Strict MVVM**, Kotlin, Jetpack Compose, ViewModel, LiveData, Firebase | Full configuration-change persistence; modern declarative UI with Jetpack Compose; real-time synchronization with Firebase Cloud. |

---

## 📂 Project Structure

```text
arturoyj-cv/
├── public/                 # Static media assets, project showcases, and profile visuals
├── src/
│   ├── app/                # Next.js 16 App Router
│   │   ├── favicon.ico
│   │   ├── globals.css     # Canonical design tokens & CSS Custom Properties
│   │   ├── layout.tsx      # Root application shell & metadata
│   │   ├── page.tsx        # Landing page entry point
│   │   └── proyectos/[id]/ # Dynamic project case-study route (async params)
│   ├── components/         # Scoped, reusable UI components with CSS Modules
│   │   ├── Hero.tsx
│   │   ├── Nav.tsx
│   │   ├── Projects.tsx
│   │   ├── Stack.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── data/               # Strongly-typed static content and portfolio datasets
│   │   └── projects.ts
│   └── hooks/              # Custom React hooks (e.g., Intersection Observer animations)
│       └── useObserverAnimation.ts
├── .gitignore              # Hardened git ignore rules (excludes local AI & IDE state)
├── package.json            # Deterministic dependency definitions
└── tsconfig.json           # TypeScript 5 strict compiler configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher (ARM64 / Apple Silicon optimized)
- **npm**: `v10.x` or higher

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArturoYJ/my-own-landing-page.git
   cd my-own-landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```
   *(We use `npm ci` to guarantee deterministic builds from `package-lock.json`)*.

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to inspect the application.

---

## 🧪 Verification & Quality Assurance

All commits must pass rigorous linting and compile-time type checking:

```bash
# Run ESLint across all Next.js pages and components
npm run lint

# Validate TypeScript type consistency across the entire project
npx tsc --noEmit
```

---

## 📬 Contact & Connect

- **Author**: Arturo Yion Jaime
- **GitHub**: [@ArturoYJ](https://github.com/ArturoYJ)
- **Email**: [arturoyj@gmail.com](mailto:arturoyj@gmail.com)
- **LinkedIn**: [Arturo Yion Jaime](https://www.linkedin.com/in/arturoyj)

---

*Designed and engineered with attention to architectural clean boundaries, performance optimization, and typographic excellence.*
