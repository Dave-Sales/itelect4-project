# Campus Lost & Found — Routing & Auth

Quick notes and commands to run the app and verify the new routing/auth features.

**Prerequisites:** Node.js + npm installed.

- **Install deps:**

```bash
npm install
```

- **Start dev server:**

```bash
npm run dev
```

- Open the app at: `http://localhost:5173/`

**What was added**
- `src/pages/` — `Home`, `About`, `Login`, `ItemDetail`, `NotFound`
- `src/components/Layout.tsx` — shared nav + `Outlet`
- `src/components/ProtectedRoute.tsx` — redirects to `/login` when not authenticated
- `src/stores/auth.ts` — typed Zustand auth store (`token`, `login`, `logout`)

**Manual verification (ProtectedRoute)**
1. Start the dev server.
2. Visit `http://localhost:5173/items/101` in your browser — you should be redirected to `/login`.
3. On the `/login` page enter a name and submit — this sets a fake token.
4. After login, navigate to `/items/101` — you should now see the Item Detail view showing the ID.

If you want an automated end-to-end test, I can add a Playwright or Puppeteer test and a `test:e2e` script — tell me which you prefer.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
