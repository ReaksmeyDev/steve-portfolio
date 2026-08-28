# Steve — Full-Stack & Mobile Developer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/STEVE.dev-Full--Stack%20%26%20Mobile-06b6d4?style=for-the-badge&logo=react&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

A modern, high-performance developer portfolio featuring a liquid glassmorphic UI, an interactive multi-tab syntax-highlighted code editor, official [Icons8](https://icons8.com/) brand assets, a live developer terminal emulator, and 60fps GPU-accelerated starfield animations.

[Explore Live Demo](https://steve.dev) • [Report Bug](https://github.com/stevedev/portfolio/issues) • [Request Feature](https://github.com/stevedev/portfolio/issues)

</div>

---

## 🌟 Key Features

- 💻 **Interactive Syntax-Highlighted Code Editor**: Home hero features an authentic Tokyo Night / GitHub Dark styled code editor with interactive multi-file tabs (`developer.ts`, `stack.config.ts`, `architecture.ts`), line numbers, copy-to-clipboard functionality, and Git status bar.
- 🎨 **Modern Liquid Glassmorphism**: Tailored dark theme with backdrop blur panels, subtle gradient borders, and animated atmospheric ambient glows.
- ⚡ **Official Icons8 Visual System**: Pixel-perfect official brand icons for React, Flutter, Dart, Laravel, PHP, Node.js, PostgreSQL, MySQL, Linux, Git, Nginx, Cloud, and AI.
- ⌨️ **Interactive Developer Terminal (CLI)**: Fully interactive terminal component supporting commands (`whoami`, `skills`, `projects`, `status`, `contact`, `clear`) with quick-action click pills and structured output.
- 🚀 **Performance-Safe Animations**: CSS-only 3-layer parallax starfield background using `will-change: transform` on GPU layers.
- 📱 **Mobile-First Responsive Design**: Instant layout rendering on mobile devices with zero lag, touch-friendly navigation drawer, and fluid viewport typography.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18 (TypeScript), Vite 5 |
| **Styling & UI** | Tailwind CSS 3, Vanilla CSS Keyframes, CSS Grid & Flexbox |
| **Icons & Media** | [Icons8 Color & Fluency Assets](https://icons8.com/), Lucide React |
| **Animations** | CSS Hardware-Accelerated Keyframes & Transitions |
| **Tooling** | PostCSS, Autoprefixer, ESLint / TypeScript Compiler |

---

## 📁 Project Structure

```text
steve-portfolio/
├── public/                     # Static public assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── About.tsx           # Developer background & engineering pillars
│   │   ├── Contact.tsx         # Contact gateway with direct messaging form
│   │   ├── Experience.tsx      # Career timeline & milestones
│   │   ├── Footer.tsx          # Wave divider, branding & social links
│   │   ├── Hero.tsx            # Hero intro & syntax-highlighted code editor
│   │   ├── Navbar.tsx          # Glassmorphic navbar & mobile overlay drawer
│   │   ├── Projects.tsx        # Project showcase & category filters
│   │   ├── Services.tsx        # Technical solutions & capabilities
│   │   ├── Skills.tsx          # Skills & expertise with Icons8 brand icons
│   │   ├── TechIcons.tsx       # Icons8 asset mapper & brand glow helpers
│   │   └── Terminal.tsx        # Interactive CLI terminal emulator
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio content & metadata
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interfaces & domain types
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Global theme tokens, starfield & utilities
│   └── main.tsx                # React DOM entry point
├── index.html                  # HTML5 entry template & viewport meta
├── tailwind.config.js          # Tailwind theme extensions & custom animations
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/stevedev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application with Hot Module Replacement (HMR).

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with instant Vite HMR. |
| `npm run build` | Type-checks code with `tsc` and compiles an optimized production bundle in `/dist`. |
| `npm run preview` | Locally previews the compiled production build. |

---

## ⚙️ Customizing Content

All data is decoupled from component presentation for easy updates:

1. **Projects, Skills & Experience**:
   Edit `src/data/portfolioData.ts` to update your work history, featured case studies, skill descriptions, and service offerings.
2. **Terminal Commands**:
   Customize commands or add new command responses in `src/components/Terminal.tsx`.
3. **Hero Code Snippets**:
   Update the interactive tabs in `src/components/Hero.tsx`.

---

## 🚢 Deployment

### Deploying to Vercel

```bash
npm install -g vercel
vercel
```

### Deploying to Netlify

```bash
npm run build
# Drag and drop the generated /dist folder into the Netlify Dashboard
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

Crafted with clean code, modern architecture, and precision design.

</div>
