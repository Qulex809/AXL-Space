/**
 * AXL Space AI Provider Abstraction
 * Supports future multi-provider connections (Gemini, Claude, Kimi, OpenRouter, Groq)
 */

export type ModelProviderId = 'gemini' | 'claude' | 'kimi' | 'openrouter' | 'groq';

export interface ModelDefinition {
  id: string;
  name: string;
  provider: ModelProviderId;
  description: string;
  contextWindow: string;
  isAvailable: boolean;
}

export const SUPPORTED_MODELS: ModelDefinition[] = [
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'gemini',
    description: 'Büyük bağlam penceresi ve güçlü mantık yürütme kapasitesi',
    contextWindow: '2M tokens',
    isAvailable: false,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'gemini',
    description: 'Yüksek hız ve düşük gecikmeli vibe coding desteği',
    contextWindow: '1M tokens',
    isAvailable: false,
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'claude',
    description: 'Yazılım mimarisi ve karmaşık kod üretiminde üst düzey başarı',
    contextWindow: '200K tokens',
    isAvailable: false,
  },
  {
    id: 'kimi-k1.5',
    name: 'Moonshot Kimi k1.5',
    provider: 'kimi',
    description: 'Uzun dosya bağlamı ve çok adımlı kod analiz yeteneği',
    contextWindow: '256K tokens',
    isAvailable: false,
  },
  {
    id: 'openrouter-auto',
    name: 'OpenRouter (Auto Router)',
    provider: 'openrouter',
    description: 'Açık kaynak ve ticari modeller arasında otomatik yönlendirme',
    contextWindow: 'Değişken',
    isAvailable: false,
  },
  {
    id: 'groq-llama-3.3-70b',
    name: 'Groq Llama 3.3 70B',
    provider: 'groq',
    description: 'Ultra yüksek token/saniye üretim hızı ile anlık düzenleme',
    contextWindow: '128K tokens',
    isAvailable: false,
  },
];

export interface ProviderConfig {
  provider: ModelProviderId;
  apiKey?: string;
  endpointUrl?: string;
  organizationId?: string;
}

export interface PromptPayload {
  prompt: string;
  currentFiles?: Record<string, string>;
  modelId?: string;
  systemPrompt?: string;
}

export interface FileChange {
  path: string;
  action: 'create' | 'update' | 'delete';
  content?: string;
}

export interface ProviderResponse {
  success: boolean;
  message: string;
  suggestedFiles?: FileChange[];
  tokensUsed?: {
    prompt: number;
    completion: number;
    total: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface AIProvider {
  id: ModelProviderId;
  name: string;
  isConfigured: () => boolean;
  generateCode: (payload: PromptPayload) => Promise<ProviderResponse>;
}
