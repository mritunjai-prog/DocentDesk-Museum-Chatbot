# 🏛️ DocentDesk - AI-Powered Museum Experience Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)

> Transform museum experiences with AI-guided 3D virtual tours, multilingual support, and intelligent chatbot assistance.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## 🎯 Overview

DocentDesk is a modern museum experience platform that combines cutting-edge AI technology with immersive 3D environments to revolutionize how visitors engage with art and history. Built for museums of all sizes, DocentDesk provides:

- **3D Virtual Tours** - Explore museums from anywhere with interactive 3D environments
- **AI Docent Guide** - Get personalized tours and instant answers from our intelligent chatbot
- **Multilingual Support** - Experience museums in 15+ languages
- **Smart Ticketing** - QR-based digital tickets with seamless booking
- **Real-time Updates** - Live crowd monitoring and optimal visit planning

**Current Status**: Phase 1 Complete - Visual Build & Core 3D Tour (45% overall completion)  
**Repository**: https://github.com/mritunjai-prog/docent-desk-dreams  
**Latest Commit**: `354ad78 - Build Phase 1 visuals`

---

## ✨ Features

### ✅ Implemented (Phase 1)
- 🎨 **Beautiful Landing Page** - Modern, animated hero section with 3D background
- 🗺️ **Interactive Navigation** - Responsive navbar with mobile menu, theme toggle, language selector
- 🎭 **3D Virtual Tour** - First-person museum exploration with WASD + mouse controls
- 🖼️ **Artifact Showcase** - Interactive exhibits with detailed modals and category filtering
- 🎨 **Premium Design System** - Custom gold/teal color palette with glass morphism
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌙 **Dark/Light Mode** - Smooth theme switching
- 🛒 **Cart System UI** - Shopping cart interface for ticket purchases

### 🚧 In Progress (Phase 2)
- 🤖 AI Chatbot integration
- 🎫 Event management & booking system
- 👤 User authentication & dashboard
- 🔐 Admin panel for content management

### 📅 Planned (Phase 3-4)
- 🌍 Full multilingual i18n support
- ⭐ Feedback & rating system
- 🎮 Gamification (badges, leaderboards)
- 📱 PWA features (offline support, installability)
- 📊 Crowd monitoring & analytics

For detailed status, see [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 🎬 Demo

**Live Demo**: [Coming Soon]  
**Video Tour**: [Coming Soon]

**Screenshots**:
- Landing Page with 3D Hero
- Virtual Tour Interface
- Artifact Detail Modal
- Mobile Navigation

---

## 🛠️ Tech Stack

### **Frontend**
- ⚡ **Vite 5.4** - Next-gen frontend tooling
- ⚛️ **React 18.3** - UI library
- 📘 **TypeScript 5.8** - Type safety
- 🎨 **Tailwind CSS 3.4** - Utility-first styling
- 🧩 **shadcn/ui** - High-quality component library
- 🎭 **Three.js + R3F** - 3D graphics and interactions

### **Backend & Database**
- 🗄️ **Supabase** - PostgreSQL database
- 🔐 **Supabase Auth** - Authentication system
- ⚡ **Edge Functions** - Serverless functions

### **Libraries & Tools**
- 🔄 **TanStack Query** - Data fetching & caching
- 🗺️ **React Router** - Client-side routing
- 📝 **React Hook Form** - Form management
- ✅ **Zod** - Schema validation
- 🎨 **Lucide React** - Icon library

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or bun package manager
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/mritunjai-prog/docent-desk-dreams.git
cd docent-desk-dreams
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:8080`

### **Build for Production**
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
DocentDesk/
├── src/
│   ├── components/          # React components
│   │   ├── tour/           # 3D tour components (7 files)
│   │   │   ├── TourScene.tsx
│   │   │   ├── MuseumRoom.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── ArtifactHotspot.tsx
│   │   │   └── ...
│   │   ├── ui/             # shadcn/ui components (50+ files)
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AIChatbot.tsx
│   │   └── ...
│   ├── pages/              # Route pages
│   │   ├── Index.tsx
│   │   ├── VirtualTour.tsx
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useArtifacts.ts
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── supabase/
│   ├── functions/          # Edge functions
│   │   └── chat/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
├── docs/                   # Project documentation
├── .env                    # Environment variables (not in git)
├── package.json            # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 💻 Development

### **Available Scripts**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

### **Code Style**
- ESLint configured for React + TypeScript
- Prettier for code formatting
- Tailwind CSS for styling

### **Component Development**
We use shadcn/ui components. To add new components:
```bash
npx shadcn-ui@latest add [component-name]
```

---

## 🌐 Deployment

### **Option 1: Lovable Platform**
1. Visit [Lovable Projects](https://lovable.dev/projects)
2. Connect your GitHub repository
3. Click Share → Publish

### **Option 2: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Option 3: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 📚 Documentation

- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Detailed project status and roadmap
- **[docs/FRONTEND_ANALYSIS_AND_NEXT_STEPS.md](docs/FRONTEND_ANALYSIS_AND_NEXT_STEPS.md)** - Frontend architecture
- **[docs/QUICK_START_GUIDE.md](docs/QUICK_START_GUIDE.md)** - Developer quick start
- **[docs/Lovable-AI-Prompts/](docs/Lovable-AI-Prompts/)** - AI development prompts

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues

- 4 npm security vulnerabilities (run `npm audit fix`)
- `three-mesh-bvh` deprecation warning
- Missing routes: `/events`, `/exhibits`, `/about`, `/dashboard/*`

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for full issue list.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project**: Smart India Hackathon 2024  
**Team**: HEXADS  
**Repository**: https://github.com/mritunjai-prog/docent-desk-dreams

---

## 🙏 Acknowledgments

- Built with [Lovable.dev](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- 3D graphics powered by [Three.js](https://threejs.org)

---

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Status**: 🚧 Active Development | **Version**: 0.1.0 | **Last Updated**: December 19, 2025
