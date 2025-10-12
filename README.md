# Queens Admin

A modern Next.js admin dashboard built with TypeScript, Tailwind CSS, Biome, Zustand, and more.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling with extended theme configuration
- **Biome** for linting and formatting
- **Zustand** for state management
- **next-themes** for dark/light mode support
- **Lucide React** for icons
- **tailwind-merge** and **clsx** for className utilities
- Path aliases (`@/*` for `src/*`)
- Custom theme with CSS variables
- Responsive design
- Accessibility features

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Theme**: next-themes
- **Linting/Formatting**: Biome
- **Package Manager**: npm

## 📁 Project Structure

```
queens-admin/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── globals.css      # Global styles with CSS variables
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # cn() helper and other utilities
│   └── stores/              # Zustand stores
│       └── app-store.ts     # Main app state
├── public/                  # Static assets
├── biome.json              # Biome configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (or use this template)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Biome
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build directories
- `npm run preview` - Build and start for preview

## 🎨 Customization

### Theme

The project uses a custom theme system with CSS variables. Colors are defined in `src/app/globals.css` and can be customized in `tailwind.config.ts`.

### Components

All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- `cn()` utility for className merging
- Proper accessibility attributes

### State Management

Zustand store is configured with:
- TypeScript interfaces
- DevTools integration
- Persistence
- Selectors for performance

## 🔧 Configuration Files

- **`biome.json`**: Linting and formatting rules
- **`tailwind.config.ts`**: Tailwind CSS configuration with extended theme
- **`tsconfig.json`**: TypeScript configuration with path aliases
- **`next.config.ts`**: Next.js configuration
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind

## 🌙 Dark Mode

Dark mode is implemented using `next-themes` with:
- System preference detection
- Manual toggle
- Persistent user choice
- CSS variable-based theming

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS

### UI & Styling
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional className utility
- `lucide-react` - Icon library
- `next-themes` - Theme switching

### State Management
- `zustand` - Lightweight state management

### Development
- `@biomejs/biome` - Fast linter and formatter
- `@types/*` - TypeScript type definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Biome](https://biomejs.dev/) - Fast linter and formatter
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Lucide](https://lucide.dev/) - Beautiful icons
