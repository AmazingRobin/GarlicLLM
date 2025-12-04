const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface ModelScore {
  coding: number;
  reasoning: number;
  multimodal: number;
  efficiency: number;
}

export interface Model {
  id: string;
  name: string;
  scores: ModelScore;
  source: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface BenchmarkData {
  models: Model[];
  last_updated: string;
}

export async function fetchBenchmarks(): Promise<BenchmarkData> {
  try {
    const response = await fetch(`${API_BASE}/api/benchmarks`);
    if (!response.ok) {
      throw new Error('Failed to fetch benchmarks');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching benchmarks:', error);
    // Return mock data as fallback
    return getMockBenchmarks();
  }
}

export async function fetchCompareData(models: string[]): Promise<Model[]> {
  try {
    const response = await fetch(`${API_BASE}/api/compare?models=${models.join(',')}`);
    if (!response.ok) {
      throw new Error('Failed to fetch compare data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching compare data:', error);
    const data = getMockBenchmarks();
    return data.models.filter(m => models.includes(m.id));
  }
}

export function getMockBenchmarks(): BenchmarkData {
  return {
    models: [
      {
        id: "garlic-xl",
        name: "OpenAI Garlic",
        scores: {
          coding: 93,
          reasoning: 90,
          multimodal: 68,
          efficiency: 78
        },
        source: "IndianExpress (Dec 3, 2025)",
        confidence: "high"
      },
      {
        id: "gemini-3.0",
        name: "Google Gemini 3.0",
        scores: {
          coding: 89,
          reasoning: 92,
          multimodal: 95,
          efficiency: 85
        },
        source: "Google DeepMind (Dec 2025)",
        confidence: "medium"
      },
      {
        id: "claude-4.5",
        name: "Anthropic Claude 4.5",
        scores: {
          coding: 91,
          reasoning: 94,
          multimodal: 82,
          efficiency: 88
        },
        source: "Anthropic (Nov 2025)",
        confidence: "medium"
      },
      {
        id: "gpt-4.5",
        name: "OpenAI GPT-4.5",
        scores: {
          coding: 90,
          reasoning: 89,
          multimodal: 86,
          efficiency: 80
        },
        source: "OpenAI (Oct 2025)",
        confidence: "medium"
      },
      {
        id: "llama-4",
        name: "Meta Llama 4",
        scores: {
          coding: 85,
          reasoning: 83,
          multimodal: 78,
          efficiency: 92
        },
        source: "Meta AI (Nov 2025)",
        confidence: "medium"
      }
    ],
    last_updated: "2025-12-05T00:00:00Z"
  };
}
