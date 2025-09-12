# CODEBUDDY.md

## Development Commands

### Core Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies
- `npm run postinstall` - Prepare Nuxt (runs automatically after install)

### Linting
- ESLint is configured via `eslint.config.mjs` using Nuxt's built-in ESLint integration
- Run linting through your editor or via Nuxt dev tools

## Project Architecture

### Framework & Structure
This is a **Nuxt 3** personal portfolio website with TypeScript support. The project uses the `app/` directory structure:

- `app/components/` - Vue components organized by type:
  - `layout/` - Layout components (header, footer, navigation)
  - `sections/` - Page section components 
  - `ui/` - shadcn/ui components (managed via shadcn-nuxt)
- `app/pages/` - File-based routing (index.vue, share.vue)
- `app/assets/css/` - Global CSS including Tailwind base styles
- `app/composables/` - Vue composables for shared logic
- `app/data/` - Static data files
- `app/layouts/` - Nuxt layout templates
- `app/lib/` - Utility functions and helpers
- `app/plugins/` - Nuxt plugins
- `app/utils/` - General utilities

### Key Technologies & Libraries

**Styling & UI:**
- **Tailwind CSS 4.0** - Primary styling framework (configured via Vite plugin)
- **shadcn/ui** - Component library (New York style, configured in `components.json`)
- **Lucide Vue Next** - Icon library
- Fonts: Inter, JetBrains Mono, LXGW WenKai (loaded via Google Fonts & jsDelivr)

**Animation & 3D:**
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics and effects
- **OGL** - Lightweight WebGL library
- **Motion-v** - Vue motion library
- Custom CSS animations via `tw-animate-css`

**Development:**
- **@nuxt/image** - Optimized image handling
- **@vueuse/core** - Vue composition utilities
- **ESLint** with Nuxt integration for code quality

### Configuration Notes
- Uses Nuxt 3's auto-imports for components, composables, and utilities
- Path aliases configured in `components.json` for shadcn/ui integration
- Tailwind configured as Vite plugin rather than PostCSS
- TypeScript enabled throughout the project
- Component auto-discovery from `app/components/` directory

### Component Library Integration
The project uses shadcn/ui components which are:
- Installed in `app/components/ui/`
- Configured with "new-york" style and neutral base color
- Managed via the `shadcn-nuxt` module
- Use `npx shadcn-vue@latest add [component]` to add new components