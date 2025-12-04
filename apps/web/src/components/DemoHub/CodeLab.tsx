"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Download, Code2, Layers } from "lucide-react";

// Mock AST visualization
interface ASTNode {
  type: string;
  name?: string;
  children?: ASTNode[];
  line?: number;
}

function parseToAST(code: string): ASTNode {
  // Simplified mock AST parser
  const lines = code.split("\n");
  const root: ASTNode = { type: "Program", children: [] };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("function") || trimmed.startsWith("const") || trimmed.startsWith("let")) {
      const match = trimmed.match(/(?:function|const|let)\s+(\w+)/);
      root.children?.push({
        type: trimmed.startsWith("function") ? "FunctionDeclaration" : "VariableDeclaration",
        name: match?.[1] || "anonymous",
        line: idx + 1,
        children: [],
      });
    } else if (trimmed.startsWith("if")) {
      root.children?.push({
        type: "IfStatement",
        line: idx + 1,
        children: [],
      });
    } else if (trimmed.startsWith("return")) {
      root.children?.push({
        type: "ReturnStatement",
        line: idx + 1,
      });
    } else if (trimmed.startsWith("for") || trimmed.startsWith("while")) {
      root.children?.push({
        type: "LoopStatement",
        line: idx + 1,
        children: [],
      });
    }
  });

  return root;
}

// AST Tree visualization component
function ASTTree({ node, depth = 0 }: { node: ASTNode; depth?: number }) {
  const colors: Record<string, string> = {
    Program: "#6B4EFF",
    FunctionDeclaration: "#00FFD1",
    VariableDeclaration: "#FF4ECD",
    IfStatement: "#FFD700",
    ReturnStatement: "#FF6B6B",
    LoopStatement: "#4ECDC4",
  };

  return (
    <div className="pl-4 border-l border-[var(--glass-border)]">
      <div
        className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[var(--glass-highlight)] transition-colors"
        style={{ marginLeft: depth * 8 }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors[node.type] || "#9CA3AF" }}
        />
        <span className="text-sm text-[var(--text-primary)]">{node.type}</span>
        {node.name && (
          <span className="text-sm text-[var(--accent-cyan)]">({node.name})</span>
        )}
        {node.line && (
          <span className="text-xs text-[var(--text-muted)]">L{node.line}</span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <ASTTree key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

// Attention visualization mock
function AttentionHeatmap({ tokens }: { tokens: string[] }) {
  const [activeToken, setActiveToken] = useState<number | null>(null);

  // Generate mock attention weights
  const attentionMatrix = tokens.map((_, i) =>
    tokens.map((_, j) => {
      // Higher attention to nearby tokens and special patterns
      const distance = Math.abs(i - j);
      const base = Math.random() * 0.3;
      const proximity = Math.exp(-distance * 0.3) * 0.7;
      return Math.min(base + proximity, 1);
    })
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tokens.map((token, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded text-sm transition-all ${activeToken === i
              ? "bg-[var(--accent-purple)] text-white"
              : "bg-[var(--bg-dark-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-purple)]/20"
              }`}
            onMouseEnter={() => setActiveToken(i)}
            onMouseLeave={() => setActiveToken(null)}
          >
            {token}
          </button>
        ))}
      </div>

      {activeToken !== null && (
        <div className="p-4 bg-[var(--bg-dark)] rounded-lg">
          <div className="text-sm text-[var(--text-secondary)] mb-2">
            Attention from &quot;<span className="text-[var(--accent-purple)]">{tokens[activeToken]}</span>&quot; to:
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, j) => {
              const weight = attentionMatrix[activeToken][j];
              return (
                <div
                  key={j}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: `rgba(107, 78, 255, ${weight})`,
                    color: weight > 0.5 ? "white" : "var(--text-primary)",
                  }}
                >
                  {token} ({(weight * 100).toFixed(0)}%)
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function CodeLab() {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);`);

  const [ast, setAst] = useState<ASTNode | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const analyze = () => {
    const parsedAST = parseToAST(code);
    setAst(parsedAST);

    // Tokenize
    const tokenized = code
      .replace(/[{}()\[\];,]/g, " $& ")
      .split(/\s+/)
      .filter(t => t.length > 0)
      .slice(0, 20);
    setTokens(tokenized);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && tokens.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= tokens.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, tokens.length]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setAst(null);
    setTokens([]);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)', paddingTop: '120px', paddingBottom: '48px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/30 mb-4">
            <Code2 className="w-4 h-4 text-[var(--accent-purple)]" />
            <span className="text-sm text-[var(--accent-purple)]">Code Lab</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Code <span className="gradient-text">Visualization</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Enter code to visualize its AST structure and see how attention mechanisms
            might process the tokens.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Code Editor
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={analyze}
                  className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Analyze
                </button>
                <button
                  onClick={reset}
                  className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-lg text-[var(--text-primary)] font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-purple)]"
              spellCheck={false}
            />
          </div>

          {/* AST Visualization */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-[var(--accent-cyan)]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                AST Structure
              </h2>
            </div>
            <div className="h-64 overflow-auto bg-[var(--bg-dark)] rounded-lg p-4">
              {ast ? (
                <ASTTree node={ast} />
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                  Click &quot;Analyze&quot; to parse the code
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attention Visualization */}
        {tokens.length > 0 && (
          <div className="card mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Token Attention Visualization
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-secondary text-sm py-1 px-3 flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <div className="text-sm text-[var(--text-secondary)]">
                  Step {currentStep + 1} / {tokens.length}
                </div>
              </div>
            </div>

            {/* Token flow animation */}
            <div className="mb-6 p-4 bg-[var(--bg-dark)] rounded-lg overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {tokens.map((token, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded text-sm font-mono transition-all duration-300 ${i <= currentStep
                      ? "bg-[var(--accent-purple)] text-white scale-100"
                      : "bg-[var(--bg-dark-tertiary)] text-[var(--text-muted)] scale-95 opacity-50"
                      }`}
                  >
                    {token}
                  </div>
                ))}
              </div>
            </div>

            <AttentionHeatmap tokens={tokens.slice(0, currentStep + 1)} />
          </div>
        )}
      </div>
    </div>
  );
}
