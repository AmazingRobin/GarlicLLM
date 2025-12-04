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
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-dark-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Interactive <span className="gradient-text">Exploration</span> Tools
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '672px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Dive deep into AI model capabilities with our suite of visualization and analysis tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                className="card glass-hover group relative overflow-hidden"
                style={{ padding: '28px' }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: feature.color }}
                />

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    background: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  transition: 'color 0.2s'
                }} className="group-hover:text-[var(--accent-cyan)]">
                  {feature.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
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
      <section style={{ padding: '96px 0', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Model <span className="gradient-text">Comparison</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              See how Garlic stacks up against leading AI models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <div
                key={model.id}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg-dark-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                }}
              >
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                  <span className={`badge ${model.confidence === "high" ? "badge-high" :
                    model.confidence === "medium" ? "badge-medium" : "badge-low"
                    }`}>
                    {model.confidence}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  marginBottom: '24px',
                  paddingRight: '80px'
                }}>
                  {model.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(model.scores).map(([key, value]) => (
                    <div key={key}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        marginBottom: '8px'
                      }}>
                        <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{key}</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{value}</span>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: 'var(--bg-dark-tertiary)',
                        borderRadius: '999px',
                        overflow: 'hidden'
                      }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${value}%`,
                            borderRadius: '999px',
                            transition: 'all 1s',
                            background: i === 0
                              ? 'var(--gradient-primary)'
                              : 'var(--accent-cyan)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--glass-border)'
                }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
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
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-dark-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 radial-glow opacity-50" />

        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 16px', textAlign: 'center', position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(30px, 5vw, 60px)',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            Ready to <span className="gradient-text">Explore?</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '672px',
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
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
