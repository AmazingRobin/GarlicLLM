// Mock benchmark data
const MOCK_BENCHMARKS = {
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
  last_updated: new Date().toISOString()
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Rate limiting helper
async function checkRateLimit(request, env) {
  if (!env.RATE_LIMIT_KV) return true;
  
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `rate:${ip}`;
  
  const current = await env.RATE_LIMIT_KV.get(key);
  const count = current ? parseInt(current) : 0;
  
  if (count >= 100) {
    return false;
  }
  
  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 60 });
  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Rate limiting
    const allowed = await checkRateLimit(request, env);
    if (!allowed) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
    
    // Route handling
    switch (url.pathname) {
      case '/api/benchmarks':
        return handleBenchmarks(env);
      
      case '/api/compare':
        return handleCompare(url, env);
      
      case '/api/status':
        return handleStatus();
      
      case '/api/og':
        return handleOG(url);
      
      default:
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
    }
  },
};

async function handleBenchmarks(env) {
  let data = MOCK_BENCHMARKS;
  
  // Try to get from KV cache
  if (env.BENCHMARK_KV) {
    const cached = await env.BENCHMARK_KV.get('benchmarks');
    if (cached) {
      data = JSON.parse(cached);
    } else {
      // Cache the mock data
      await env.BENCHMARK_KV.put('benchmarks', JSON.stringify(data), {
        expirationTtl: 1800, // 30 minutes
      });
    }
  }
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
      ...corsHeaders,
    },
  });
}

async function handleCompare(url, env) {
  const modelsParam = url.searchParams.get('models');
  
  if (!modelsParam) {
    return new Response(JSON.stringify({ error: 'Missing models parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  const modelIds = modelsParam.split(',');
  const allModels = MOCK_BENCHMARKS.models;
  const filteredModels = allModels.filter(m => modelIds.includes(m.id));
  
  return new Response(JSON.stringify(filteredModels), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
      ...corsHeaders,
    },
  });
}

function handleStatus() {
  return new Response(JSON.stringify({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

async function handleOG(url) {
  const title = url.searchParams.get('title') || 'GarlicLLM';
  const theme = url.searchParams.get('theme') || 'dark';
  
  // Generate a simple SVG OG image
  const bgColor = theme === 'dark' ? '#020712' : '#F8FAFC';
  const textColor = theme === 'dark' ? '#E6EEF6' : '#0F172A';
  const accentColor = '#6B4EFF';
  
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6B4EFF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00FFD1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <text x="100" y="280" font-family="Inter, sans-serif" font-size="72" font-weight="800" fill="url(#grad)">
        GARLIC LLM
      </text>
      <text x="100" y="380" font-family="Inter, sans-serif" font-size="36" fill="${textColor}">
        ${title}
      </text>
      <text x="100" y="550" font-family="Inter, sans-serif" font-size="24" fill="${accentColor}">
        garlicllm.com
      </text>
      <circle cx="1050" cy="200" r="100" fill="${accentColor}" opacity="0.2"/>
      <circle cx="1100" cy="350" r="60" fill="#00FFD1" opacity="0.2"/>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      ...corsHeaders,
    },
  });
}
