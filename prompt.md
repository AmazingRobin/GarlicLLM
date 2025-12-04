garlicllm.com — 完整开发提示词（超详尽 / 3D + 可视化 + 竞品分析 + Cloudflare-ready）

你是全球最顶级的一名全栈开发者，下面将开发一个全栈项目。
目标：为 garlicllm.com 从 0→1 自动生成一个高度炫酷、科技感强烈、动画丰富的技术站，融合 LLM 竞品分析（数据/可视化） 与 沉浸式模型可视化 / Demo Hub（Three.js + GSAP）。
部署平台限定：Cloudflare Pages（静态站） + Cloudflare Workers（动态 API）。不得依赖传统服务器。
交付物：完整 GitHub 仓库（可直接 CI/CD 到 Cloudflare）、前端代码、Workers、静态资源、CI 配置、部署说明、示例数据与 demo。

一、总体产品定位与体验要求（必须严格遵守）

定位：技术/研究向的产品化展示站，适合研究者、工程师、记者与技术爱好者。
首屏体验目标：用户进入 3 秒内被视觉与交互抓住（炫酷 3D 神经网络、粒子流与标题动画），至少 10 秒停留时间。
视觉语言：高对比、深色主基调、霓虹 / 线框 / 玻璃质感（可选赛博黑金或宇宙神经网络主题），但需保证可读性与无障碍（提供深色/浅色模式切换）。
渐进增强：对低性能设备回退到轻量化动画 / 静态 SVG；所有 3D/Shader 内容需有“低画质”模式。

二、技术栈（建议与版本）

Frontend: React 18 + Vite (用 Next.js 的静态导出，最终生成静态html文件)

3D & visuals: Three.js (r150+), 自定义 GLSL shaders, react-three-fiber (optional if using React)

Animation: GSAP (GreenSock) + Three.js Tween 或 three/examples/jsm/controls/OrbitControls

UI: TailwindCSS + shadcn/ui component patterns (可用 Radix + Headless UI)

Charts: ECharts 或 Recharts / Chart.js（交互式对比图）

Worker: Cloudflare Workers (wrangler v2) for API endpoints, OG images, lightweight scraping/aggregation, caching logic

Storage: Cloudflare KV (cache & rate-limits) + Cloudflare D1 (optional — small structured data)

CI/CD: GitHub Actions → Cloudflare Pages & Workers

Misc: Lottie for vector animations, GLTF models for 3D nodes (if needed)

三、项目结构（仓库目录建议）
garlicllm/
├─ apps/
│  └─ web/                       # Vite React app
│     ├─ public/
│     │  ├─ assets/              # logos, og templates, gltf etc.
│     ├─ src/
│     │  ├─ components/
│     │  │  ├─ Hero3D/           # Three.js + GSAP hero
│     │  │  ├─ NavBar/
│     │  │  ├─ ModelVisualizer/  # interactive visualizer
│     │  │  ├─ DemoHub/          # individual demo components (CodeLab, ReasoningSim,...)
│     │  │  ├─ CompareCharts/    # radar, bar, benchmark components
│     │  │  ├─ Footer/
│     │  ├─ pages/
│     │  │  ├─ index.tsx
│     │  │  ├─ /visualizer.tsx
│     │  │  ├─ /compare.tsx
│     │  │  ├─ /demo/[slug].tsx
│     │  ├─ styles/
│     │  ├─ lib/
│     │  │  ├─ three/            # three helper utilities
│     │  │  ├─ api.ts            # fetch from Workers
│     │  ├─ main.tsx
│     ├─ index.html
│     ├─ package.json
├─ workers/
│  ├─ api/
│  │  ├─ news.js                 # optional aggregator (lightweight)
│  │  ├─ og.js                   # OG generator
│  │  ├─ benchmarks.js           # returns benchmark JSON
│  │  └─ config.json
├─ infra/
│  ├─ wrangler.toml
│  ├─ cloudflare-pages.yml
├─ ci/
│  ├─ .github/workflows/deploy.yml
├─ docs/
│  └─ design-spec.md
└─ README.md

四、功能清单（高优先级到低优先级 — 应按此优先实现）
必须（MVP）
首屏 Hero3D：Three.js 粒子/神经网络动画 + “GARLIC LLM” 文字联动 + CTA。
Model Visualizer 页面：可旋转 3D 模型（Transformer 模拟），点击节点显示 tooltip（解释该模块）。
Compare 页面：交互式雷达/柱状/能量条对比 Garlic 与主流模型（可用 mock 数据）。
Demo Hub 主页面 + 2 个 Demo：
Code Lab（代码可视化 demo：输入代码片段，显示 AST / attention mock）
Reasoning Simulator（推理路径可视化）
Workers API：/api/benchmarks 返回 JSON（可由 KV 缓存的 mock 数据），/api/og 生成社媒卡。
Cloudflare Pages 部署配置 + GitHub Actions CI。
Accessibility & Device Fallbacks：自动检测 WebGL 支持，若不支持则展示静态 SVG + Lottie。

高级（Phase 2）
更多 Demo（Vision Playground、Prompt Sandbox）
Benchmark submission flow（POST → Worker → D1, with KV rate limit）
Animated comparatives with shader effects
Persist user-selected comparisons (localStorage)
Dynamic OG image customization API

五、UI / 视觉与动画规范（非常详细 — 必须实现）
1) 主题与色板（示例）
Dark background: #020712
Accent neon purple: #6B4EFF
Accent cyan: #00FFD1
Glass highlight: rgba(255,255,255,0.03)
Text primary: #E6EEF6
提供深色/浅色切换（浅色模式是反色主题）。

2) 字体

Headings: Inter 或 Satoshi (variable)
Body: Noto Sans / Inter
提供 fallback fonts。

3) Hero3D 具体需求（核心，要非常详细）

使用 react-three-fiber 或 Three.js 原生（可选实现方式）

场景组成：
粒子场：50k 粒子（如果性能不允许，退化为 5k 并用 GPU Instancing）
粒子会根据音频节拍或内部时钟做缓慢流动（可用 sine + curl noise）
粒子会在页面 load 的 1.5s 内组合成 GARLIC 立体字（3D text mesh）
鼠标 hover 会在粒子场产生吸引 / 排斥效果（use mouse coord + raycaster）
点击 CTA 时，摄像机做平滑推进（GSAP camera tween）并淡出 Hero 到 Demo Hub

Performance：

自动检测 navigator.hardwareConcurrency & WEBGL_debug_renderer_info（若低于阈值，切换到“Low”模式）
使用 postprocessing selectively (bloom, depth of field) with toggles
Accessibility：
Provide static snapshot image alt text for screen readers
Respect prefers-reduced-motion to disable heavy animations

4) Model Visualizer（交互式 3D Transformer）

视觉元素：

Layer stacks (embedding → transformer layers → head pools → LM head) represented as segmented blocks

Attention visualization: on token input, highlight connection lines between token nodes; line width proportional to weight. (Use instanced lines or shader-based ribbons for performance)

Interactions:

Input box: user types a sentence; simulate tokenization (front-end mock) then animate flow through layers (timed animations)

Click on layer to see small popup with "what happens here" text + sample attention heatmap

Implementation notes:

Use instanced meshes for token spheres

Use custom shader (vertex displacement + color ramp) to show activation intensity

5) Compare Page Animations

Radar chart: animate sweep on load (use ECharts or custom Canvas + GSAP)

Bar charts: use “growing energy bar” animation (bars fill with a gradient + glow)

When user toggles two models, animate morph between radar shapes

6) Demo Hub microinteractions

Demo cards with hover glass effect + subtle parallax

Each demo page contains animated step-by-step timeline of the demo (play / pause / scrub controls)

Provide recording / screenshot button (client-side capture using html2canvas or captureStream)

六、数据：mock 数据与数据模型（必须包含示例 JSON）

Provide initial mock data to populate pages.

Example benchmarks.json (for /api/benchmarks)
{
  "models": [
    {
      "id": "garlic-xl",
      "name": "Garlic XL (rumored)",
      "scores": {
        "coding": 93,
        "reasoning": 90,
        "multimodal": 68,
        "efficiency": 78
      },
      "source": "IndianExpress (Dec 3, 2025)",
      "confidence": "medium"
    },
    {
      "id": "gemini-3.0",
      "name": "Google Gemini 3.0",
      // 分数自己联网查询
      "scores": {
        "coding": 88,
        "reasoning": 91,
        "multimodal": 85,
        "efficiency": 82
      },
      "source": "Google blog (public)",
      "confidence": "high"
    },
    {
      "id": "Claude-4.5",
      "name": "Claude Sonnet 4.5",
      // 分数自己联网查询
      "scores": {
        "coding": 88,
        "reasoning": 91,
        "multimodal": 85,
        "efficiency": 82
      },
      "source": "Google blog (public)",
      "confidence": "high"
    }
  ],
  "last_updated": "2025-12-04T00:00:00Z"
}

Example comparisons model

Fields: model_id, metric, value, units, source, confidence_score (0-1)

must ensure UI reads confidence and displays color-coded badge: high (green), medium (amber), low (red).

七、Cloudflare Workers API 设计（轻量、性能优先）

Workers are used for dynamic JSON endpoints, OG generation, benchmark caching, optional light scraping (only titles & summaries). No heavy scraping of paywalled content.

Routes

GET /api/benchmarks

Returns JSON benchmarks.json from KV cache. If cache miss, return built-in mock and trigger background refresh (non-blocking).

GET /api/compare?models=garlic-xl,gemini-3

Returns merged comparison object for requested models.

GET /api/og?title=...&theme=dark

Returns PNG/SVG for social cards (render headless HTML → screenshot or server-side SVG generation). Keep image small and cache in KV.

POST /api/submit-benchmark

Optional; requires simple captcha + rate-limit (KV). Store submissions in D1 or send to email for manual review.

GET /api/status — health check.

Worker Implementation Notes

Use wrangler v2; use KV with appropriate namespaces.

Add caching headers with TTL for responses.

Rate-limit using KV per-IP hashed key; deny after N requests/minute.

Log errors to console and to a logs KV namespace (limited retention).

八、部署 & CI（必须自动化）
仓库已经创建好，空白的，什么都没有，开发好后可以选择时间提交：https://github.com/AmazingRobin/GarlicLLM.git
GitHub Actions

Workflow deploy.yml:

On push to main, build Vite app; run unit tests; run linter.

Deploy static output to Cloudflare Pages via pages GitHub Actions / wrangler pages CLI.

Deploy Workers via wrangler deploy (using wrangler.toml from infra/).

On success, comment commit with preview URL.

Wrangler / Cloudflare Config

wrangler.toml should define:

account_id, project name, kv_namespaces, d1_databases (if used), routes for workers.

Secrets

Use GitHub Secrets: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, D1 binding info.

九、可访问性、国际化与性能

Provide lang attribute; initial languages: en-US + zh-CN (later expansion).

All images must have alt.

Implement prefers-reduced-motion fallback.

Lighthouse target: Performance >= 70 (with 3D heavy, acceptable), Accessibility >= 90.

Use code splitting for heavy 3D modules; lazy-load hero assets after first paint if needed.

Use cdn headers for static assets; set aggressive caching for GLTF / images and short TTL for JSON endpoints.

十、Legal / Content / Disclaimer

Create a global Disclaimer component in header/footer:

This site is an independent, unaffiliated analysis & visualization hub. Any information about "Garlic" is based on public reporting, speculation, and third-party sources. Not an OpenAI product or official announcement.

For every benchmark/data cell, show source + link + confidence.

Add DMCA / contact email support@garlicllm.com (or placeholder) and a simple form to request corrections.

十一、交付物（完成后必须包含）

Full repo pushed to provided GitHub (or create repo skeleton).

README.md with build/deploy/run instructions.

infra/wrangler.toml + cloudflare-pages.yml.

apps/web with functional UI: Hero3D, Visualizer, Compare page, Demo Hub with CodeLab & ReasoningSim.

workers/api/* endpoints implemented and wired.

CI workflow in .github/workflows/deploy.yml.

Mock data JSON files and seed data scripts.

Accessibility checklist & basic E2E smoke test (Playwright or Cypress minimal).

Design assets: logo SVG, color palette, sample OG SVG templates.

A short 1–2 minute demo GIF or MP4 (client-side screen capture) showing hero + one demo interaction (for marketing).

十二、开发任务分解（可作为 Issues 列表，请按序自动创建）

Repo skeleton (folders + package.json + tsconfig)

Implement global layout & header/footer, Tailwind config

Implement Hero3D component (low / medium / high modes)

Implement ModelVisualizer page (3D transformer mock)

Implement Compare page + charts + data fetching from /api/benchmarks

Implement DemoHub index + CodeLab page + ReasoningSim page

Implement Workers: /api/benchmarks, /api/og, /api/status

Implement KV caching & simple rate-limiter for submit endpoints

Add disclaimer, sources UI, footer contact form

CI/CD pipeline & Cloudflare Pages + Workers wiring

Create readme & deploy documentation

Run smoke tests and produce demo recording

十三、实现细节与示例代码片段（关键片段，请把这些实现到项目中）
A. Detect WebGL & Low-power fallback (snippet)
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

B. Worker response with KV cache (pseudo)
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/benchmarks') {
      const cached = await env.BENCHMARK_KV.get('benchmarks');
      if (cached) return new Response(cached, { headers: { 'content-type':'application/json' }});
      const data = await fetchMockData(); // fallback
      env.BENCHMARK_KV.put('benchmarks', JSON.stringify(data), { expirationTtl: 1800 });
      return new Response(JSON.stringify(data), { headers: { 'content-type':'application/json' }});
    }
    // other routes...
  }
}

C. Three.js particle text formation idea (pseudocode)

Load font as THREE.FontLoader → create TextGeometry positions → spawn particles at random → animate particles to target positions using GSAP with stagger + easing.

十四、运营与内容建议（部署后建议）

初始内容：一篇长文「What we know about Garlic (analysis)」一篇「How Garlic compares to Gemini & Claude」和 4 个 Demo。

在首页放置 newsletter signup（Mailchimp 或 Cloudflare Workers + simple email endpoint）。

推特/Reddit 分享短片（10-20s demo）容易吸粉。

每次有重大新闻（The Information / IndianExpress / SeekingAlpha）在首页以 Banner 标注“news update”并在 timeline 更新来源。

十五、交付验收标准（完成后由你检验）

npm run build produces static files in dist/ and wrangler deploy deploys Workers.

Pages deployed at https://garlicllm.com rendering Hero with particle formation on desktop modern browsers.

Compare page fetches /api/benchmarks and visualizes radar/bar with animation.

DemoHub CodeLab runs client-side mock and visualizes token flow.

Workers return cached benchmark JSON & og images.

README contains Cloudflare Pages & Wrangler deploy steps.

All disclaimers present and data-sources visible on pages.