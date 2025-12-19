# 🏛️ DocentDesk - AI-Powered Museum Experience Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)](https://supabase.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Transform museum experiences with AI-guided 3D virtual tours, multilingual support, and intelligent chatbot assistance.**

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture)

</div>

---

## 🎯 Overview

DocentDesk is a comprehensive museum experience platform that leverages cutting-edge AI and 3D technologies to revolutionize visitor engagement. Designed for museums, galleries, and cultural institutions of all sizes, it provides an immersive, accessible, and intelligent way for visitors to explore art and history.

### Key Highlights

- 🤖 **AI-Powered Chatbot** - GPT-4 integration with voice input/output in 8 languages
- 🌍 **Multilingual Support** - Full i18n with EN, ES, FR, DE, IT, ZH, AR, HI
- 🎨 **3D Virtual Tours** - First-person exploration with WebGL/Three.js
- 🎫 **Smart Event Management** - Complete booking system with QR codes
- 📱 **Progressive Web App** - Offline support, installable, mobile-first
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility features
- 🎭 **12 Egyptian Artifacts** - Curated collection with detailed metadata

---

## ✨ Features

### 🎨 User Experience

- **3D Virtual Tours** - Immersive first-person exploration with WASD + mouse controls
- **AI Chatbot Assistant** - Natural language conversations with voice input/output
- **Animated UI** - Smooth 3D card effects, parallax scrolling, gradient animations
- **Dark/Light Themes** - System-aware theme switching with smooth transitions
- **Responsive Design** - Mobile-first, tablet-optimized, desktop-enhanced

### 🌐 Multilingual & Accessibility

- **8 Languages** - English, Spanish, French, German, Italian, Chinese, Arabic, Hindi
- **RTL Support** - Native right-to-left layout for Arabic
- **Voice Recognition** - Speech-to-text in all supported languages
- **Text-to-Speech** - Natural voice synthesis for chatbot responses
- **WCAG 2.1 AA** - Keyboard navigation, screen reader support, ARIA labels

### 🎫 Events & Booking

- **Event Calendar** - Browse workshops, exhibitions, lectures, symposiums
- **5-Step Booking Wizard** - Tickets → Details → Add-ons → Payment → Confirmation
- **QR Code Tickets** - Digital tickets with unique QR codes
- **Seat Availability** - Real-time capacity tracking
- **3D Event Cards** - Animated cards with hover effects and image fallbacks

### 🏛️ Artifact Management

- **Egyptian Collection** - 12 curated artifacts (Nefertiti, Rosetta Stone, Tutankhamun, etc.)
- **Category Filtering** - Art, Sculpture, History, Pottery, Artifact
- **Detail Modals** - Full descriptions, era, origin, high-res images
- **Featured System** - Highlight special exhibits
- **Image Fallbacks** - Graceful error handling with themed gradients

### 👤 User Dashboard

- **Authentication** - Email/password with Supabase Auth
- **My Collection** - Save favorite artifacts
- **My Tickets** - View purchased event tickets
- **Tour History** - Track completed virtual tours
- **Settings** - Profile management, preferences
- **Feedback System** - Submit and view feedback history

### 🔧 Technical Features

- **Progressive Web App** - Service worker, manifest, offline caching
- **Lazy Loading** - Image optimization with loading states
- **Error Boundaries** - Graceful error handling
- **Type Safety** - Full TypeScript coverage
- **Code Splitting** - Route-based chunking for performance
- **SEO Optimized** - Meta tags, semantic HTML, sitemap-ready

---

## 🎬 Demo

### Live Application

🚀 **Coming Soon** - Live demo will be available after deployment

### Screenshots

<div align="center">

| Home Page | Virtual Tour | Events |
|-----------|--------------|--------|
| ![Home](docs/screenshots/home.png) | ![Tour](docs/screenshots/tour.png) | ![Events](docs/screenshots/events.png) |

| Exhibits | Chatbot | Dashboard |
|----------|---------|-----------||
| ![Exhibits](docs/screenshots/exhibits.png) | ![Chat](docs/screenshots/chat.png) | ![Dashboard](docs/screenshots/dashboard.png) |

</div>

### Video Walkthrough

📹 [Full feature demonstration](https://youtube.com/watch-link-here) - Coming Soon

---

## 🎬 Demo

**Live Demo**: [Coming Soon]  
**Video Tour**: [Coming Soon]

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js)

### Backend & Database

![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=for-the-badge&logo=postgresql)
![Edge Functions](https://img.shields.io/badge/Edge_Functions-Serverless-FF6C37?style=for-the-badge)

</div>

### Core Technologies

| Category      | Technologies                          |
| ------------- | ------------------------------------- |
| **Framework** | React 18.3, TypeScript 5.8, Vite 5.4  |
| **Styling**   | Tailwind CSS 3.4, shadcn/ui, Radix UI |

| \*\*3DQuick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm))
- **npm** 9+ or **bun** 1+
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (optional for backend features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot.git
cd DocentDesk-Museum-Chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional for development)
cp .env.example .env
# Edit .env with your Supabase credentials if needed

# 4. Start development server
npm run dev
```

The app will open at **http://localhost:8080** 🎉

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration (optional for local development)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: OpenAI API for chatbot
OPENAI_API_KEY=your_openai_key
```

**Note**: The app works without Supabase using mock data for development.

### Build for Production

````bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Development build (with source maps)
npm run build:dev
2. **Install dependencies**
```basArchitecture

### Project Structure

````

DocentDesk/
├── public/
│ ├── images/ # Static images
│ │ ├── artifacts/ # Artifact placeholder
│ │ └── events/ # Event images
│ ├── favicon.svg # App icon
│ ├── manifest.json # PWA manifest
│ └── service-worker.js # Service worker for offline
├── src/
│ ├── components/
│ │ ├── tour/ # 3D virtual tour
│ │ │ ├── TourScene.tsx
│ │ │ ├── MuseumRoom.tsx
│ │ │ ├── CameraController.tsx
│ │ │ ├── ArtifactHotspot.tsx
│ │ │ └── ...
│ │ ├── booking/ # Event booking wizard
│ │ │ ├── BookingWizard.tsx
│ │ │ ├── StepTickets.tsx
│ │ │ ├── StepDetails.tsx
│ │ │ └── ...
│ │ ├── dashboard/ # User dashboard
│ │ │ ├── MyCollection.tsx
│ │ │ ├── MyTickets.tsx
│ │ │ └── ...
│ │ ├── ui/ # shadcn/ui components (60+)
│ │ ├── AnimatedAuthModal.tsx
│ │ ├── AIChatbot.tsx
│ │ ├── Artifact3DCard.tsx
│ │ ├── ArtifactImage.tsx
│ │ ├── EventImage.tsx
│ │ └── ...
│ ├── pages/
│ │ ├── Index.tsx # Home page
│ │ ├── VirtualTour.tsx # 3D tour page
│ │ ├── Events.tsx # Events listing
│ │ ├── Exhibits.tsx # Artifacts gallery
│ │ ├── About.tsx # About museum
│ │ ├── Dashboard.tsx # User dashboard
│ │ └── NotFound.tsx
│ ├── hooks/
│ │ ├── useArtifacts.ts # Artifact data hook
│ │ ├── useChatContext.ts
│ │ └── use-toast.ts
│ ├── contexts/
│ │ └── AuthContext.tsx # Auth state management
│ ├── data/
│ │ └── artifacts.ts # Mock artifact data
│ ├── i18n/
│ │ ├── index.ts # i18next setup
│ │ └── locales/ # Translation files (8 languages)
│ │ ├── en.json
│ │ ├── es.json
│ │ ├── fr.json
│ │ └── ...
│ │ └── supabase/        # Supabase client & types
│ ├── lib/
│ │ └── utils.ts         # Utility functions
│ ├── styles/
│ │ └── accessibility.css
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── supabase/
│ ├── functions/
│ │ └── chat/            # AI chatbot edge function
│ └── migrations/
│     └── 20251219000000_comprehensive_schema.sql
├── docs/                    # Documentation
│ ├── FRONTEND_ANALYSIS_AND_NEXT_STEPS.md
│ ├── QUICK_START_GUIDE.md
│ └── README_PROJECT_SUMMARY.md
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Component Architecture

```
App
├── Navigation (with i18n, theme, auth)
├── Routes
│   ├── Index (Home)
│   │   ├── HeroSection (3D background)
│   │   ├── ExhibitShowcase (3D cards)
│   │   └── FeaturesSection
│   ├── VirtualTour
│   │   ├── TourScene (Three.js)
│   │   ├── CameraController (WASD)
│   │   └── ArtifactHotspots
│   ├── Events
│   │   ├── EventCards (3D animated)
│   │   └── BookingWizard (5 steps)
│   ├── Exhibits
│   │   ├── Artifact3DCard
│   │   └── ArtifactModal
│   ├── Dashboard
│   │   ├── MyCollection
│   │   ├── MyTickets
│   │   └── Settings
│   └── About
├── AIChatbot (voice + text)
└── Footer
```

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js)

### Backend & Database
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=for-the-badge&logo=postgresql)
![Edge Functions](https://img.shields.io/badge/Edge_Functions-Serverless-FF6C37?style=for-the-badge)

</div>

### Core Technologies

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18.3, TypeScript 5.8, Vite 5.4 |
| **Styling** | Tailwind CSS 3.4, shadcn/ui, Radix UI |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **State Management** | TanStack Query (React Query) |
| **Routing** | React Router DOM 6.30 |
| **Forms** | React Hook Form, Zod validation |
| **i18n** | react-i18next 15.1, i18next 24.2 |
| **Auth** | Supabase Auth |
| **Database** | PostgreSQL via Supabase |
| **API** | Supabase Edge Functions |
| **Icons** | Lucide React |
| **Date** | date-fns 4.1 |
| **Voice** | Web Speech API |
| **PWA** | Service Workers, Manifest |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm))
- **npm** 9+ or **bun** 1+
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (optional for backend features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot.git
cd DocentDesk-Museum-Chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional for development)
cp .env.example .env
# Edit .env with your Supabase credentials if needed

# 4. Start development server
npm run dev
```

The app will open at **http://localhost:8080** 🎉

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration (optional for local development)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: OpenAI API for chatbot
OPENAI_API_KEY=your_openai_key
```

**Note**: The app works without Supabase using mock data for development.

### Build for Production

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Development build (with source maps)
npm run build:dev
```

---

## 💻 Development

###  NPM Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start development server (port 8080) |
| `npm run build`     | Production build                     |
| `npm run build:dev` | Development build with source maps   |
| `npm run preview`   | Preview production build             |
| `npm run lint`      | Run ESLint                           |

### Development Guidelines

#### Code Style

- **ESLint** - Configured for React + TypeScript + Hooks
- **Prettier** - Auto-formatting (recommended extension)
- **Tailwind** - Utility-first styling (no CSS-in-JS)

#### Component Patterns

````tsx
// Use TypeScript interfaces
interface ArtifactCardProps {
  artifact: Artifact;
  onClick: () => void;
}

// Prefer named exports
export function ArtifactCard({ artifact, onClick }: ArtifactCardProps) {
  // Component logic
}

// Use custom hooks for logic
function useArtifactData() {
  return useQuery({
    queryKey: ['artifacts'],
    queryFn: fetchArtifacts,
  });
}
```

#### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn-ui@latest add dialog

# Add new custom component
# Create in src/components/MyComponent.tsx
# Export from index if needed
```

#### i18n Translations

Add translations to `src/i18n/locales/{lang}.json`:

```json
{
  "nav": {
    "home": "Home",
    "virtualTours": "Virtual Tours"
  }
}
```

Use in components:
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('nav.home')}</h1>
```

### Database Schema

Key tables in Supabase:

- **artifacts** - Museum artifact data
- **events** - Museum events & programs
- **bookings** - Event reservations
- **users** - User profiles (via Supabase Auth)
- **feedback** - User feedback & ratings
- **tours** - Virtual tour completion tracking

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
````

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot)

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot)

### Docker

```dockerfile
# Dockerfile included in repo
docker build -t docentdesk .
docker run -p 8080:8080 docentdesk
```

### Configuration

Set environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Build Optimization

The production build includes:
- ✅ Code splitting by route
- ✅ Tree shaking & minification
- ✅ Asset optimization
- ✅ Service worker caching
- ✅ Lazy loading images

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Detailed project status and roadmap |
| [PROJECT_COMPLETION.md](PROJECT_COMPLETION.md) | Feature completion checklist |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) | Implementation details |
| [IMAGE_SETUP.md](IMAGE_SETUP.md) | Image optimization guide |
| [Quick Start Guide](docs/QUICK_START_GUIDE.md) | Developer quick start |
| [Frontend Analysis](docs/FRONTEND_ANALYSIS_AND_NEXT_STEPS.md) | Architecture details |

### API Documentation

**Supabase Edge Functions:**
- `POST /functions/v1/chat` - AI chatbot endpoint

**Key Hooks:**
- `useArtifacts()` - Fetch artifact data
- `useFeaturedArtifacts()` - Get featured artifacts
- `useAuth()` - Authentication state
- `useChatContext()` - Chatbot state management

### Browser Support

| Browser | Version |
|---------|---------||
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |
| Mobile | iOS 14+, Android 10+ ✅ |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- ✅ Follow existing code style and patterns
- ✅ Write meaningful commit messages ([Conventional Commits](https://www.conventionalcommits.org/))
- ✅ Update documentation as needed
- ✅ Test your changes thoroughly
- ✅ Keep PRs focused and atomic
| Browser | Version |
|---------|---------|
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |
| Mobile | iOS 14+, Android 10+ ✅ |

The production build includes:

- ✅ Code splitting by route
- ✅ Tree shaking & minification
- ✅ Asset optimization
- ✅ Service worker caching
- ✅ Lazy loading images
  "nav": {
  "home": "Home",
  "virtualTours": "Virtual Tours"
  }
  }

````

Use in components:
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('nav.home')}</h1>
````

### Database Schema

Key tables in Supabase:

- **artifacts** - Museum artifact data
- **events** - Museum events & programs
- **bookings** - Event reservations
- **users** - User profiles (via Supabase Auth)
- \*\*� Security

- **Authentication**: Secure email/password via Supabase Auth
- **Data Protection**: Row Level Security (RLS) in PostgreSQL
- **API Keys**: Environment variables (never committed)
- **HTTPS**: Required for production
- **CSP**: Content Security Policy headers
- **Input Validation**: Zod schemas on all forms

Report security vulnerabilities: Open an issue with [SECURITY] prefix

---

## 📈 Roadmap

### Q1 2026

- [ ] Admin panel for content management
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AR features for exhibits

### Q2 2026

- [ ] AI-generated tour recommendations
- [ ] Social features (sharing, reviews)
- [ ] Gamification system
- [ ] Multi-museum support

### Future

- [ ] VR virtual tours
- [ ] Live guided tours
- [ ] Museum marketplace
- [ ] API for third-party integration

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for detailed roadmap.

---

## 🙏 Acknowledgments

Special thanks to:

- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Lucide](https://lucide.dev) - Icon system
- [Three.js](https://threejs.org) - 3D graphics engine
- [Supabase](https://supabase.com) - Backend infrastructure
- [Unsplash](https://unsplash.com) - High-quality images
- Open source community

---

## 📞 Support

- 📧 **Email**: [Create an issue](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/discussions)
- 🐛 **Bug Reports**: [Issue Tracker](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/issues)
- 📖 **Documentation**: [Wiki](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/wiki)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 DocentDesk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🔒 Security

- **Authentication**: Secure email/password via Supabase Auth
- **Data Protection**: Row Level Security (RLS) in PostgreSQL
- **API Keys**: Environment variables (never committed)
- **HTTPS**: Required for production
- **CSP**: Content Security Policy headers
- **Input Validation**: Zod schemas on all forms

Report security vulnerabilities: Open an issue with [SECURITY] prefix

---

## 📈 Roadmap

### Q1 2026
- [ ] Admin panel for content management
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AR features for exhibits

### Q2 2026
- [ ] AI-generated tour recommendations
- [ ] Social features (sharing, reviews)
- [ ] Gamification system
- [ ] Multi-museum support

### Future
- [ ] VR virtual tours
- [ ] Live guided tours
- [ ] Museum marketplace
- [ ] API for third-party integration

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for detailed roadmap.

---

## 🙏 Acknowledgments

Built with excellent open source tools:
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Lucide](https://lucide.dev) - Icon system
- [Three.js](https://threejs.org) - 3D graphics engine
- [Supabase](https://supabase.com) - Backend infrastructure
- [Unsplash](https://unsplash.com) - High-quality images

---

## 📞 Support

- 📧 **Issues**: [Create an issue](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/discussions)
- 🐛 **Bug Reports**: [Issue Tracker](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot/issues)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 DocentDesk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mritunjai-prog/DocentDesk-Museum-Chatbot&type=Date)](https://star-history.com/#mritunjai-prog/DocentDesk-Museum-Chatbot&Date)

---

<div align="center">

**Made with ❤️ for museums and cultural institutions worldwide**

[⬆ Back to Top](#-docentdesk---ai-powered-museum-experience-platform)

**Version 1.0.0** | **Last Updated**: December 19, 2025

</div>
