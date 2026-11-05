/**
 * AXL Space Provider Registry
 * Concrete fallback provider returning explicit 'unconfigured' state.
 */
import {
  AIProvider,
  ModelDefinition,
  ModelProviderId,
  PromptPayload,
  ProviderResponse,
  SUPPORTED_MODELS,
} from './types';

export class UnconfiguredProvider implements AIProvider {
  id: ModelProviderId;
  name: string;

  constructor(id: ModelProviderId = 'gemini', name = 'Google Gemini') {
    this.id = id;
    this.name = name;
  }

  isConfigured(): boolean {
    return false;
  }

  getAvailableModels(): ModelDefinition[] {
    return SUPPORTED_MODELS;
  }

  async generateCode(payload: PromptPayload): Promise<ProviderResponse> {
    return {
      success: false,
      message: `${this.name} sağlayıcısı henüz yapılandırılmadı. Ayarlar panelinden veya Google AI Studio ortamından API anahtarı ekleyiniz.`,
      suggestedFiles: [],
      error: {
        code: 'UNCONFIGURED',
        message: `Model '${payload.modelId || this.id}' için geçerli bir API anahtarı bulunamadı. Vibe coding motoru yerel bekleme modundadır.`,
      },
    };
  }
}

export class AIService {
  private currentProvider: AIProvider;

  constructor() {
    this.currentProvider = new UnconfiguredProvider();
  }

  getProvider(): AIProvider {
    return this.currentProvider;
  }

  setProvider(provider: AIProvider): void {
    this.currentProvider = provider;
  }
}

export const aiService = new AIService();
export const defaultAIProvider = aiService.getProvider();
