# Tech Task

A modern frontend starter template powered by **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI** — with everything preconfigured for fast, scalable development.

---

## Features

- Preconfigured with **ShadCN UI** components using **Radix UI** primitives  
- Responsive design via **Tailwind CSS**  
- Form handling with **react-hook-form** + **zod**  
- Built-in routing with **react-router-dom**  
- Charting with **recharts**  
- Toast notifications with **sonner**  
- Code quality tools: **ESLint**, **TypeScript ESLint**, **Prettier**  
- Dev server, preview, and build setup via **Vite**

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Build for Production

```bash
npm run build
```

### Preview the Build

```bash
npm run preview
```

---

## Lint the Code

```bash
npm run lint
```

---

## Project Structure

```
vite_react_shadcn_ts/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── routes/             # Routing config
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Tailwind & global styles
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── package.json            # Project metadata & scripts
```

---

## Tech Stack Overview

| Tool/Library             | Purpose                       |
| ------------------------ | ----------------------------- |
| `vite`                   | Fast build tool & dev server  |
| `react`, `react-dom`     | UI development                |
| `typescript`             | Static typing                 |
| `tailwindcss`            | Utility-first styling         |
| `shadcn/ui`, `radix-ui`  | UI components                 |
| `zod`, `react-hook-form` | Form validation               |
| `@tanstack/react-query`  | Async data & state management |
| `react-router-dom`       | Client-side routing           |
| `clsx`, `tailwind-merge` | Class name utilities          |
| `sonner`                 | Toast notifications           |
| `lucide-react`           | Icon set                      |
| `recharts`               | Charting                      |
| `eslint`                 | Linting                       |

---

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start dev server                   |
| `npm run build`     | Create production build            |
| `npm run build:dev` | Build with development mode        |
| `npm run preview`   | Preview the build locally          |
| `npm run lint`      | Run ESLint for code quality checks |

---

## Acknowledgements

- [ShadCN/UI](https://ui.shadcn.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
