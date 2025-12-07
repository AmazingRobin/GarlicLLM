"use client";

import React, { useState, useRef } from "react";
import { Upload, Eye, Image as ImageIcon, Trash2, Sparkles, AlertCircle } from "lucide-react";

interface AnalysisResult {
  description: string;
  objects: Array<{ name: string; confidence: number }>;
  colors: Array<{ name: string; percentage: number; hex: string }>;
  sentiment: string;
  tags: string[];
}

const mockAnalysis: AnalysisResult = {
  description: "A vibrant sunset scene over a calm ocean with silhouettes of palm trees in the foreground. The sky displays a gradient of warm colors from deep orange to soft pink.",
  objects: [
    { name: "Ocean", confidence: 95 },
    { name: "Palm Trees", confidence: 92 },
    { name: "Sky", confidence: 98 },
    { name: "Sunset", confidence: 88 },
  ],
  colors: [
    { name: "Orange", percentage: 35, hex: "#FF6B35" },
    { name: "Pink", percentage: 25, hex: "#FF6BA8" },
    { name: "Blue", percentage: 20, hex: "#004E89" },
    { name: "Dark", percentage: 20, hex: "#1A1A2E" },
  ],
  sentiment: "Peaceful and Serene",
  tags: ["Nature", "Landscape", "Sunset", "Ocean", "Tropical"],
};

export function VisionPlayground() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] pt-[120px] pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-pink)]/10 border border-[var(--accent-pink)]/30 mb-4">
            <Eye className="w-4 h-4 text-[var(--accent-pink)]" />
            <span className="text-sm text-[var(--accent-pink)]">Vision Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Visual <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Upload an image to see how multimodal AI models might analyze and describe visual content.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[var(--accent-pink)]" />
              Image Upload
            </h2>

            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--glass-border)] rounded-lg p-12 text-center cursor-pointer hover:border-[var(--accent-pink)] transition-colors"
              >
                <Upload className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)] mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  PNG, JPG, GIF up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-[var(--bg-dark)]">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze Image
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearImage}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--accent-cyan)]" />
              Analysis Results
            </h2>

            {!analysis ? (
              <div className="flex items-center justify-center h-64 text-[var(--text-muted)]">
                Upload and analyze an image to see results
              </div>
            ) : (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Description
                  </h3>
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    {analysis.description}
                  </p>
                </div>

                {/* Detected Objects */}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Detected Objects
                  </h3>
                  <div className="space-y-2">
                    {analysis.objects.map((obj, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[var(--text-primary)]">{obj.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-[var(--bg-dark)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-purple)] rounded-full transition-all duration-1000"
                              style={{ width: `${obj.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-[var(--text-secondary)] w-12 text-right">
                            {obj.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Dominant Colors
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {analysis.colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-[var(--bg-dark)] rounded"
                      >
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-[var(--text-primary)]">{color.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {color.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sentiment */}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Mood & Sentiment
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 rounded-lg">
                    <Sparkles className="w-4 h-4 text-[var(--accent-cyan)]" />
                    <span className="text-[var(--accent-cyan)]">{analysis.sentiment}</span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="card mt-8 bg-[var(--bg-dark-tertiary)]">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Demo Notice
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                This is a simulated demonstration using mock analysis data. Real multimodal AI models
                would use advanced computer vision techniques including object detection, scene understanding,
                and natural language generation to produce detailed image descriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
