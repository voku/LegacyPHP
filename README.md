# Legacy PHP Codebase Monster 🧟‍♂️

<div align="center">

An interactive web experience that visualizes the journey of refactoring legacy PHP codebases into modern, maintainable code through a gamified Frankenstein's monster metaphor.

[🎮 Live Demo](https://voku.github.io/LegacyPHP/) | [🐛 Report Bug](https://github.com/voku/LegacyPHP/issues) | [✨ Request Feature](https://github.com/voku/LegacyPHP/issues)

</div>

---

## 📖 Overview

**Legacy PHP Codebase Monster** is an educational and entertaining interactive application that represents the challenges developers face when dealing with legacy codebases. Click on different body parts of the monster to learn about common legacy code issues and play mini-games to "refactor" each part, transforming the monster into a modern developer.

### Key Features

- 🎯 **Interactive Learning**: Engage with different aspects of legacy code through clickable body parts
- 🎮 **Mini-Games**: Complete challenges to refactor each part of the codebase
- 🎨 **Smooth Animations**: Beautiful transitions and particle effects using CSS animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Lightweight**: Built with React and Vite for optimal performance
- 🌐 **No Backend Required**: Fully client-side application

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/voku/LegacyPHP.git
   cd LegacyPHP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Creates a production-ready build in the `dist/` directory |
| `npm run preview` | Previews the production build locally |

---

## 📁 Project Structure

```
LegacyPHP/
├── components/          # React components
│   ├── InfoPanel.tsx   # Modal panel for displaying info and mini-games
│   └── Monster.tsx     # Main monster SVG component
├── constants.ts        # Monster part data and descriptions
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── package.json       # Project dependencies
└── README.md          # This file
```

---

## 🎮 How to Play

1. **Hover** over different body parts of the monster to see what they represent
2. **Click** on a body part to learn about that specific legacy code issue
3. **Complete the mini-game** challenge to "refactor" that part
4. **Refactor all parts** to transform the monster into a modern developer
5. **Celebrate** your achievement and start a new project!

---

## 🏗️ Built With

- [**React**](https://react.dev/) - UI library
- [**TypeScript**](https://www.typescriptlang.org/) - Type safety
- [**Vite**](https://vite.dev/) - Build tool and dev server
- [**Tailwind CSS**](https://tailwindcss.com/) - Styling via CDN
- [**Lucide React**](https://lucide.dev/) - Icon library

---

## 🌐 Deployment

The application is automatically deployed to GitHub Pages on every push to the main branch.

### Manual Deployment

To deploy manually:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be served by any static hosting service.

---

## 🤖 Key Files Detector Helper Prompt

Use this prompt with AI assistants to quickly understand the codebase structure:

```
I'm working with the Legacy PHP Codebase Monster project. Here are the key files:

1. **App.tsx** - Main application component with game state management
2. **components/Monster.tsx** - SVG-based monster visualization with interactive parts
3. **components/InfoPanel.tsx** - Modal component for displaying information and mini-games
4. **constants.ts** - Contains all the monster part data, descriptions, and challenges
5. **types.ts** - TypeScript definitions for PartId, HealedState, and MonsterPartData
6. **index.html** - HTML template with Tailwind CSS configuration and animations
7. **vite.config.ts** - Vite build configuration

The application uses React hooks (useState) for state management and CSS animations for visual effects. Each monster part represents a different legacy code issue, and clicking them triggers a modal with educational content and a mini-game to "refactor" that part.
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Lars Moelleken**

- GitHub: [@voku](https://github.com/voku)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you or you find it interesting!
