"use client";

import React from "react";
import Link from "next/link";
import { Code2, Brain, Eye, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

const demos = [
  {
    id: "code-lab",
    title: "Code Lab",
    description: "Visualize code parsing, AST generation, and see how attention mechanisms might process your code.",
    icon: <Code2 className="w-8 h-8" />,
    color: "#6B4EFF",
    href: "/demo/code-lab",
    status: "available",
  },
  {
    id: "reasoning",
    title: "Reasoning Simulator",
    description: "Watch step-by-step chain-of-thought reasoning unfold with confidence scores for each step.",
    icon: <Brain className="w-8 h-8" />,
    color: "#00FFD1",
    href: "/demo/reasoning",
    status: "available",
  },
  {
    id: "vision",
    title: "Vision Playground",
    description: "Upload images and see how multimodal models might analyze and describe visual content.",
    icon: <Eye className="w-8 h-8" />,
    color: "#FF4ECD",
    href: "#",
    status: "coming-soon",
  },
  {
    id: "prompt",
    title: "Prompt Sandbox",
    description: "Experiment with different prompting techniques and see how they affect model outputs.",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "#FFD700",
    href: "#",
    status: "coming-soon",
  },
];

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-dark)] pt-[120px] pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[var(--accent-purple)]" />
            <span className="text-sm text-[var(--accent-purple)]">Interactive Demos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Demo <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore AI capabilities through hands-on interactive demonstrations.
            See how models process code, reason through problems, and analyze content.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.href}
              className={`card group relative overflow-hidden transition-all duration-300 ${demo.status === "coming-soon"
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-[var(--accent-purple)] hover:shadow-[0_0_30px_var(--accent-purple-glow)]"
                }`}
              onClick={(e) => demo.status === "coming-soon" && e.preventDefault()}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20"
                style={{ background: demo.color }}
              />

              {/* Status badge */}
              {demo.status === "coming-soon" && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-dark-tertiary)] text-[var(--text-muted)]">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    background: `${demo.color}20`,
                    color: demo.color,
                  }}
                >
                  {demo.icon}
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-cyan)] transition-colors">
                  {demo.title}
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  {demo.description}
                </p>

                {/* CTA */}
                {demo.status === "available" && (
                  <span className="inline-flex items-center text-[var(--accent-purple)] font-medium group-hover:text-[var(--accent-cyan)] transition-colors">
                    Launch Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="card inline-block max-w-2xl">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              About These Demos
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              These demos are simulations designed to illustrate how AI models might process
              and generate outputs. They use mock data and simplified algorithms to demonstrate
              concepts like attention mechanisms, chain-of-thought reasoning, and code analysis.
              Actual model behavior may differ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
