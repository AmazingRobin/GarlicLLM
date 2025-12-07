"use client";

import React, { useState } from "react";
import { MessageSquare, Sparkles, Copy, RotateCcw, Zap, Check } from "lucide-react";

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: string;
}

const promptTemplates: PromptTemplate[] = [
  {
    id: "zero-shot",
    name: "Zero-Shot",
    description: "Direct task instruction without examples",
    template: "Please {task}.",
    category: "Basic",
  },
  {
    id: "few-shot",
    name: "Few-Shot Learning",
    description: "Provide examples to guide the model",
    template: `Here are some examples:

Example 1: {example1}
Example 2: {example2}

Now, please {task}.`,
    category: "Advanced",
  },
  {
    id: "chain-of-thought",
    name: "Chain-of-Thought",
    description: "Ask model to show reasoning steps",
    template: "Let's think step by step about how to {task}. Please explain your reasoning process.",
    category: "Advanced",
  },
  {
    id: "role-play",
    name: "Role-Playing",
    description: "Assign a specific role or persona",
    template: "You are a {role}. Please {task} from this perspective.",
    category: "Creative",
  },
  {
    id: "structured",
    name: "Structured Output",
    description: "Request specific output format",
    template: `Please {task} and format the response as follows:

1. Summary: [brief overview]
2. Details: [detailed explanation]
3. Examples: [relevant examples]`,
    category: "Technical",
  },
  {
    id: "constrained",
    name: "Constrained Generation",
    description: "Add constraints or requirements",
    template: "Please {task}. Requirements: {constraints}",
    category: "Technical",
  },
];

const mockResponses: Record<string, string> = {
  "zero-shot": "Here's a direct response to your task. I'll provide a straightforward answer based on the instruction given.",
  "few-shot": "Based on the examples provided, I can understand the pattern you're looking for. Here's my response following the same structure...",
  "chain-of-thought": "Let me break this down step by step:\n\n1. First, I'll analyze the core requirements...\n2. Next, I'll consider the different approaches...\n3. Then, I'll evaluate the pros and cons...\n4. Finally, I'll synthesize a solution...",
  "role-play": "Speaking as a {role}, I would approach this task with expertise in the field. My perspective brings unique insights...",
  "structured": "Summary: This is a concise overview of the response.\n\nDetails: Here I provide comprehensive information with depth and clarity.\n\nExamples: Specific instances that illustrate the concept.",
  "constrained": "I'll ensure my response adheres to all specified constraints while providing a thorough and accurate answer.",
};

export function PromptSandbox() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(promptTemplates[0]);
  const [prompt, setPrompt] = useState(promptTemplates[0].template);
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPrompt(template.template);
    setResponse("");
  };

  const generateResponse = () => {
    setIsGenerating(true);
    setResponse("");

    // Simulate streaming response
    const fullResponse = mockResponses[selectedTemplate.id] || "This is a mock response demonstrating how the model would respond to your prompt.";
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        setResponse(fullResponse.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetPrompt = () => {
    setPrompt(selectedTemplate.template);
    setResponse("");
  };

  const categories = Array.from(new Set(promptTemplates.map(t => t.category)));

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] pt-[120px] pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 mb-4">
            <MessageSquare className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="text-sm text-[var(--accent-gold)]">Prompt Sandbox</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Prompt <span className="gradient-text">Engineering</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experiment with different prompting techniques and see how they affect model outputs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
                Prompt Templates
              </h2>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase mb-2">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {promptTemplates
                        .filter((t) => t.category === category)
                        .map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className={`w-full text-left p-3 rounded-lg transition-all ${selectedTemplate.id === template.id
                                ? "bg-[var(--accent-gold)]/20 border border-[var(--accent-gold)]/50 text-[var(--text-primary)]"
                                : "bg-[var(--bg-dark)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-[var(--glass-highlight)]"
                              }`}
                          >
                            <div className="font-medium text-sm mb-1">{template.name}</div>
                            <div className="text-xs text-[var(--text-muted)]">
                              {template.description}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Editor */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Prompt Editor
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyPrompt}
                    className="btn-secondary text-sm py-2 px-3 flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={resetPrompt}
                    className="btn-secondary text-sm py-2 px-3 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-48 p-4 bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-lg text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent-gold)]"
                placeholder="Enter your prompt here..."
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-[var(--text-muted)]">
                  Variables in {"{}"} will be highlighted
                </div>
                <button
                  onClick={generateResponse}
                  disabled={isGenerating || !prompt.trim()}
                  className="btn-primary flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generate Response
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div className="card bg-[var(--bg-dark-secondary)]">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {selectedTemplate.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {selectedTemplate.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Response Display */}
            {(response || isGenerating) && (
              <div className="card">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[var(--accent-cyan)]" />
                  Model Response
                </h2>

                <div className="p-4 bg-[var(--bg-dark)] rounded-lg border border-[var(--glass-border)] min-h-32">
                  <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">
                    {response}
                    {isGenerating && <span className="inline-block w-2 h-4 bg-[var(--accent-cyan)] animate-pulse ml-1" />}
                  </p>
                </div>

                {!isGenerating && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="btn-secondary text-sm py-2 px-3 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Response
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tips Section */}
            <div className="card bg-[var(--bg-dark-tertiary)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--accent-gold)]" />
                Prompting Tips
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2">
                  <span className="text-[var(--accent-gold)]">•</span>
                  <span>Be specific and clear about what you want the model to do</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-gold)]">•</span>
                  <span>Use examples to demonstrate the desired output format</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-gold)]">•</span>
                  <span>Break complex tasks into step-by-step instructions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-gold)]">•</span>
                  <span>Experiment with different phrasings to find what works best</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
