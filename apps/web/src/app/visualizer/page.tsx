"use client";

import dynamic from "next/dynamic";

const ModelVisualizer = dynamic(
  () => import("@/components/ModelVisualizer/ModelVisualizer").then((mod) => mod.ModelVisualizer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--bg-dark)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent-purple)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading Visualizer...</p>
        </div>
      </div>
    ),
  }
);

export default function VisualizerPage() {
  return <ModelVisualizer />;
}
