"use client";

import React from "react";
import type { Model } from "@/lib/api";
import { formatConfidence } from "@/lib/utils";
import { ExternalLink, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelCardProps {
  model: Model;
  isSelected: boolean;
  onSelect: (id: string) => void;
  rank?: number;
}

export function ModelCard({ model, isSelected, onSelect, rank }: ModelCardProps) {
  const confidence = formatConfidence(model.confidence);

  // Calculate average score
  const avgScore = Math.round(
    (model.scores.coding + model.scores.reasoning + model.scores.multimodal + model.scores.efficiency) / 4
  );

  return (
    <TooltipProvider>
      <div
        className={`card cursor-pointer transition-all duration-300 ${isSelected
            ? "border-[var(--accent-purple)] shadow-[0_0_30px_var(--accent-purple-glow)]"
            : "hover:border-[var(--accent-cyan)]"
          }`}
        onClick={() => onSelect(model.id)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {rank && (
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${rank === 1 ? "bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]" :
                  rank === 2 ? "bg-[var(--text-secondary)]/20 text-[var(--text-secondary)]" :
                    rank === 3 ? "bg-[var(--accent-pink)]/20 text-[var(--accent-pink)]" :
                      "bg-[var(--bg-dark-tertiary)] text-[var(--text-muted)]"}
              `}>
                {rank}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                {model.name}
              </h3>
              <span className={`badge ${confidence.className} text-xs mt-1`}>
                {confidence.label}
              </span>
            </div>
          </div>

          {/* Average score */}
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">{avgScore}</div>
            <div className="text-xs text-[var(--text-muted)]">avg score</div>
          </div>
        </div>

        {/* Score bars */}
        <div className="space-y-3">
          {[
            { key: "coding", label: "Coding", color: "#6B4EFF" },
            { key: "reasoning", label: "Reasoning", color: "#00FFD1" },
            { key: "multimodal", label: "Multimodal", color: "#FF4ECD" },
            { key: "efficiency", label: "Efficiency", color: "#FFD700" },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text-secondary)]">{label}</span>
                <span className="text-[var(--text-primary)] font-medium">
                  {model.scores[key as keyof typeof model.scores]}
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${model.scores[key as keyof typeof model.scores]}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}80)`,
                    boxShadow: `0 0 10px ${color}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Source */}
        <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] cursor-help">
                <Info className="w-3 h-3" />
                <span className="truncate max-w-[150px]">{model.source}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data source: {model.source}</p>
            </TooltipContent>
          </Tooltip>

          <a
            href="#"
            className="text-xs text-[var(--accent-cyan)] hover:underline flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Details <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </TooltipProvider>
  );
}
