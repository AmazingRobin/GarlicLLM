"use client";

import React, { useState, useEffect } from "react";
import { getMockBenchmarks, Model } from "@/lib/api";
import { RadarChart, BarChart, ModelCard } from "@/components/CompareCharts";
import { BarChart3, Info } from "lucide-react";

export default function ComparePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [activeMetric, setActiveMetric] = useState<"coding" | "reasoning" | "multimodal" | "efficiency">("coding");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const data = getMockBenchmarks();
    setModels(data.models);
    setSelectedModels(data.models.slice(0, 3).map((m) => m.id));
    setLastUpdated(new Date(data.last_updated).toLocaleDateString());
  }, []);

  const toggleModel = (id: string) => {
    setSelectedModels((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  const filteredModels = models.filter((m) => selectedModels.includes(m.id));

  // Sort models by average score for ranking
  const rankedModels = [...models].sort((a, b) => {
    const avgA = (a.scores.coding + a.scores.reasoning + a.scores.multimodal + a.scores.efficiency) / 4;
    const avgB = (b.scores.coding + b.scores.reasoning + b.scores.multimodal + b.scores.efficiency) / 4;
    return avgB - avgA;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] pt-[120px] pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 mb-4">
            <BarChart3 className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span className="text-sm text-[var(--accent-cyan)]">Model Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Compare <span className="gradient-text">AI Models</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Interactive comparison of Garlic LLM against leading AI models.
            All data includes sources and confidence levels.
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Model Selection */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Select Models to Compare
            </h2>
            <span className="text-sm text-[var(--text-secondary)]">
              {selectedModels.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => toggleModel(model.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedModels.includes(model.id)
                  ? "bg-[var(--accent-purple)] text-white"
                  : "bg-[var(--bg-dark)] text-[var(--text-secondary)] border border-[var(--glass-border)] hover:border-[var(--accent-purple)]"
                  }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        {filteredModels.length > 0 && (
          <>
            {/* Radar Chart */}
            <div className="card mb-8">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Overall Capability Comparison
              </h2>
              <RadarChart models={filteredModels} />
            </div>

            {/* Bar Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {(["coding", "reasoning", "multimodal", "efficiency"] as const).map((metric) => (
                <div key={metric} className="card">
                  <BarChart models={filteredModels} metric={metric} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Model Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            Detailed Model Rankings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rankedModels.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                isSelected={selectedModels.includes(model.id)}
                onSelect={toggleModel}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card bg-[var(--bg-dark-tertiary)]">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Data Sources & Methodology
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Benchmark data is compiled from public sources including official announcements,
                research papers, and third-party evaluations. Each data point includes a confidence
                level based on source reliability:
              </p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li><span className="text-[var(--confidence-high)]">● High</span> - Official sources or peer-reviewed research</li>
                <li><span className="text-[var(--confidence-medium)]">● Medium</span> - Reputable news sources or leaked documents</li>
                <li><span className="text-[var(--confidence-low)]">● Low</span> - Speculation or unverified reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
