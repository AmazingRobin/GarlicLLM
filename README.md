# GarlicLLM

> 🧄 Independent AI Model Analysis & Visualization Hub

An interactive exploration platform for the rumored OpenAI "Garlic" model, featuring 3D visualizations, benchmark comparisons, and hands-on demos.

![GarlicLLM Preview](./docs/preview.png)

## ✨ Features

- **🎨 3D Hero Animation** - Stunning particle system with interactive 3D text
- **🧠 Model Visualizer** - Explore Transformer architecture in 3D
- **📊 Benchmark Compare** - Interactive charts comparing AI models
- **🔬 Demo Hub** - Code Lab and Reasoning Simulator
- **🌓 Theme Support** - Dark/Light mode with smooth transitions
- **♿ Accessibility** - WebGL fallbacks, reduced motion support

## 🛠 Tech Stack

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP
- **Styling**: TailwindCSS
- **Charts**: ECharts
- **UI Components**: Radix UI
- **Backend**: Cloudflare Workers
- **Deployment**: Cloudflare Pages

## 📦 Project Structure

```
garlicllm/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App router pages
│       │   ├── components/     # React components
│       │   │   ├── Hero3D/     # 3D particle hero
│       │   │   ├── ModelVisualizer/
│       │   │   ├── CompareCharts/
│       │   │   ├── DemoHub/
│       │   │   └── ...
│       │   └── lib/            # Utilities and API
│       └── public/             # Static assets
├── workers/
│   └── api/                    # Cloudflare Workers
├── infra/
│   └── wrangler.toml           # Wrangler config
├── .github/
│   └── workflows/              # CI/CD pipelines
└── docs/                       # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/AmazingRobin/GarlicLLM.git
cd GarlicLLM

# Install dependencies
cd apps/web
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

### Building for Production

```bash
cd apps/web
npm run build
```

Static files will be generated in `apps/web/out/`.

## ☁️ Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `apps/web`
3. Add environment variables if needed

### Cloudflare Workers

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy workers
wrangler deploy --config infra/wrangler.toml
```

### GitHub Actions

The project includes automated CI/CD via GitHub Actions. Add the following secrets to your repository:

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## 🔧 Configuration

### Environment Variables

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_API_URL=https://api.garlicllm.com
```

### KV Namespaces

Create KV namespaces in Cloudflare dashboard:

1. `BENCHMARK_KV` - For caching benchmark data
2. `RATE_LIMIT_KV` - For API rate limiting

Update `infra/wrangler.toml` with your namespace IDs.

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/benchmarks` | GET | Get all benchmark data |
| `/api/compare?models=id1,id2` | GET | Compare specific models |
| `/api/status` | GET | Health check |
| `/api/og?title=...&theme=dark` | GET | Generate OG image |

## 🎨 Theme Customization

Edit CSS variables in `apps/web/src/app/globals.css`:

```css
:root {
  --accent-purple: #6B4EFF;
  --accent-cyan: #00FFD1;
  --bg-dark: #020712;
  /* ... */
}
```

## ⚠️ Disclaimer

This site is an **independent, unaffiliated** analysis & visualization hub. Any information about "Garlic" is based on public reporting, speculation, and third-party sources. This is **NOT** an OpenAI product or official announcement.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

- GitHub: [@AmazingRobin](https://github.com/AmazingRobin)
- Site: [garlicllm.com](https://garlicllm.com)
