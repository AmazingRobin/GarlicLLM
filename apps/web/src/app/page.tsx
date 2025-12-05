"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Code2, Brain, BarChart3, Layers, ChevronRight } from "lucide-react";
import { getPerformanceLevel } from "@/lib/utils";
import { getMockBenchmarks } from "@/lib/api";

// Dynamic import for Hero3D to avoid SSR issues
const Hero3D = dynamic(
  () => import("@/components/Hero3D/Hero3D").then((mod) => mod.Hero3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--bg-dark)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent-purple)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading 3D Experience...</p>
        </div>
      </div>
    ),
  }
);

const features = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Model Visualizer",
    description: "Explore the Transformer architecture in interactive 3D. Understand attention mechanisms and layer operations.",
    href: "/visualizer",
    color: "var(--accent-purple)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Benchmark Compare",
    description: "Compare Garlic against GPT-4.5, Gemini 3, Claude 4.5 and more with interactive charts and data sources.",
    href: "/compare",
    color: "var(--accent-cyan)",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Code Lab",
    description: "Visualize code parsing, AST generation, and attention patterns in real-time.",
    href: "/demo/code-lab",
    color: "var(--accent-pink)",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Reasoning Simulator",
    description: "Watch step-by-step chain-of-thought reasoning unfold with confidence scores.",
    href: "/demo/reasoning",
    color: "var(--accent-gold)",
  },
];

export default function Home() {
  const [performanceLevel, setPerformanceLevel] = useState<"high" | "medium" | "low">("high");
  const [models, setModels] = useState(getMockBenchmarks().models.slice(0, 3));

  useEffect(() => {
    setPerformanceLevel(getPerformanceLevel());
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with 3D */}
      <section className="relative h-screen">
        <Hero3D performanceLevel={performanceLevel} />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-float">
              <Sparkles className="w-4 h-4 text-[var(--accent-purple)]" />
              <span className="text-sm text-[var(--text-secondary)]">Rumored Next-Gen AI Model</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="gradient-text neon-purple">GARLIC</span>
              <br />
              <span className="text-[var(--text-primary)]">LLM</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Explore the rumored OpenAI Garlic model through interactive visualizations,
              benchmark comparisons, and hands-on demos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo" className="btn-primary flex items-center gap-2">
                Try Demos <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare" className="btn-secondary flex items-center gap-2">
                View Benchmarks
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[var(--glass-border)] flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[var(--accent-purple)] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--bg-dark-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(30px,5vw,48px)] font-bold text-[var(--text-primary)] mb-4">
              Interactive <span className="gradient-text">Exploration</span> Tools
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Dive deep into AI model capabilities with our suite of visualization and analysis tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                className="card glass-hover group relative overflow-hidden p-7"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: feature.color }}
                />

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 transition-colors group-hover:text-[var(--accent-cyan)]">
                  {feature.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
                  {feature.description}
                </p>

                <span className="inline-flex items-center text-sm font-medium text-[var(--accent-purple)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(30px,5vw,48px)] font-bold text-[var(--text-primary)] mb-4">
              Model <span className="gradient-text">Comparison</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              See how Garlic stacks up against leading AI models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <div
                key={model.id}
                className="relative overflow-hidden bg-[var(--bg-dark-secondary)] border border-[var(--glass-border)] rounded-2xl py-8 px-6"
              >
                <div className="absolute top-5 right-5">
                  <span className={`badge ${model.confidence === "high" ? "badge-high" :
                    model.confidence === "medium" ? "badge-medium" : "badge-low"
                    }`}>
                    {model.confidence}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 pr-20">
                  {model.name}
                </h3>

                <div className="flex flex-col gap-4">
                  {Object.entries(model.scores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-secondary)] capitalize">{key}</span>
                        <span className="text-[var(--text-primary)] font-semibold">{value}</span>
                      </div>
                      <div className="h-2 bg-[var(--bg-dark-tertiary)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${value}%`,
                            background: i === 0
                              ? 'var(--gradient-primary)'
                              : 'var(--accent-cyan)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--glass-border)]">
                  <p className="text-xs text-[var(--text-muted)] leading-normal">
                    Source: {model.source}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/compare" className="btn-secondary inline-flex items-center gap-2">
              See Full Comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--bg-dark-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-[clamp(30px,5vw,60px)] font-bold text-[var(--text-primary)] mb-6">
            Ready to <span className="gradient-text">Explore?</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
            Dive into our interactive demos and discover what the next generation
            of AI models might be capable of.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="btn-primary text-lg py-3 px-8 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Demo
            </Link>
            <Link href="/visualizer" className="btn-secondary text-lg py-3 px-8">
              3D Visualizer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
