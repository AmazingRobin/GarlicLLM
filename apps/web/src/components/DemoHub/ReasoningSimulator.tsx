"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronRight, Brain, Lightbulb, Target } from "lucide-react";

interface ReasoningStep {
  id: number;
  type: "thought" | "action" | "observation" | "conclusion";
  content: string;
  confidence: number;
}

const reasoningExamples = [
  {
    question: "If a train travels at 60 mph for 2.5 hours, how far does it go?",
    steps: [
      { id: 1, type: "thought" as const, content: "I need to find the distance traveled by the train.", confidence: 0.95 },
      { id: 2, type: "action" as const, content: "Recall the distance formula: Distance = Speed × Time", confidence: 0.98 },
      { id: 3, type: "observation" as const, content: "Speed = 60 mph, Time = 2.5 hours", confidence: 0.99 },
      { id: 4, type: "action" as const, content: "Calculate: 60 × 2.5 = 150", confidence: 0.97 },
      { id: 5, type: "conclusion" as const, content: "The train travels 150 miles.", confidence: 0.99 },
    ],
  },
  {
    question: "What is the capital of the country that borders France to the northeast?",
    steps: [
      { id: 1, type: "thought" as const, content: "I need to identify countries that border France to the northeast.", confidence: 0.92 },
      { id: 2, type: "observation" as const, content: "Countries bordering France: Spain (SW), Italy (SE), Switzerland (E), Germany (NE), Belgium (N), Luxembourg (NE)", confidence: 0.95 },
      { id: 3, type: "action" as const, content: "Filter for northeastern borders: Germany, Belgium, Luxembourg", confidence: 0.93 },
      { id: 4, type: "thought" as const, content: "The question asks for THE country (singular), Germany is the largest and most prominent.", confidence: 0.88 },
      { id: 5, type: "action" as const, content: "Retrieve capital of Germany", confidence: 0.99 },
      { id: 6, type: "conclusion" as const, content: "The capital is Berlin.", confidence: 0.97 },
    ],
  },
  {
    question: "A farmer has 17 sheep. All but 9 run away. How many are left?",
    steps: [
      { id: 1, type: "thought" as const, content: 'This appears to be a trick question. Let me parse it carefully.', confidence: 0.85 },
      { id: 2, type: "observation" as const, content: 'The phrase "all but 9" means "all except 9"', confidence: 0.92 },
      { id: 3, type: "action" as const, content: "If all but 9 run away, then 9 did NOT run away", confidence: 0.95 },
      { id: 4, type: "observation" as const, content: "The sheep that didn't run away = 9", confidence: 0.98 },
      { id: 5, type: "conclusion" as const, content: "9 sheep are left.", confidence: 0.99 },
    ],
  },
];

function StepIcon({ type }: { type: ReasoningStep["type"] }) {
  const icons = {
    thought: <Brain className="w-4 h-4" />,
    action: <Target className="w-4 h-4" />,
    observation: <Lightbulb className="w-4 h-4" />,
    conclusion: <ChevronRight className="w-4 h-4" />,
  };

  const colors = {
    thought: "text-[var(--accent-purple)] bg-[var(--accent-purple)]/20",
    action: "text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20",
    observation: "text-[var(--accent-gold)] bg-[var(--accent-gold)]/20",
    conclusion: "text-[var(--confidence-high)] bg-[var(--confidence-high)]/20",
  };

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colors[type]}`}>
      {icons[type]}
    </div>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[var(--bg-dark)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value * 100}%`,
            background: value > 0.9
              ? "var(--confidence-high)"
              : value > 0.7
                ? "var(--confidence-medium)"
                : "var(--confidence-low)",
          }}
        />
      </div>
      <span className="text-xs text-[var(--text-muted)] w-10">
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

export function ReasoningSimulator() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const example = reasoningExamples[selectedExample];
  const steps = example.steps;

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleExampleChange = (index: number) => {
    setSelectedExample(index);
    reset();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)', paddingTop: '120px', paddingBottom: '48px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 mb-4">
            <Brain className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span className="text-sm text-[var(--accent-cyan)]">Reasoning Simulator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Chain of <span className="gradient-text">Thought</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Visualize how AI models break down complex problems through step-by-step reasoning.
          </p>
        </div>

        {/* Example selector */}
        <div className="card mb-8">
          <h2 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
            Select Example
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {reasoningExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleExampleChange(i)}
                className={`p-3 rounded-lg text-left text-sm transition-all ${selectedExample === i
                  ? "bg-[var(--accent-purple)]/20 border-[var(--accent-purple)] border"
                  : "bg-[var(--bg-dark)] border border-[var(--glass-border)] hover:border-[var(--accent-purple)]/50"
                  }`}
              >
                <div className="line-clamp-2 text-[var(--text-primary)]">
                  {ex.question}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question display */}
        <div className="card mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-purple)]/20 flex items-center justify-center text-[var(--accent-purple)] font-bold">
              Q
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Question
              </h2>
              <p className="text-[var(--text-secondary)]">{example.question}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={reset}
              className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-[var(--bg-dark-secondary)] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Reasoning steps */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`card transition-all duration-500 ${i <= currentStep
                ? "opacity-100 translate-y-0"
                : "opacity-30 translate-y-4 pointer-events-none"
                }`}
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <StepIcon type={step.type} />
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[var(--glass-border)] mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      {step.type}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      #{step.id}
                    </span>
                  </div>
                  <p className="text-[var(--text-primary)] mb-3">{step.content}</p>
                  <ConfidenceBar value={step.confidence} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final answer highlight */}
        {currentStep >= steps.length - 1 && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-[var(--accent-purple)]/20 to-[var(--accent-cyan)]/20 border border-[var(--accent-purple)]/30 animate-pulse-glow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[var(--confidence-high)] flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Final Answer
              </h3>
            </div>
            <p className="text-xl text-[var(--accent-cyan)]">
              {steps[steps.length - 1].content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
