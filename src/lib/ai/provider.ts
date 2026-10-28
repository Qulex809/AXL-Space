import { AIProvider, GenerationRequest, GenerationResponse } from './types';

/**
 * Placeholder provider returned when no AI provider API keys or backends are connected.
 * Explicitly informs the user that AI integration is not configured yet.
 */
export class UnconfiguredAIProvider implements AIProvider {
  id = 'unconfigured';
  name = 'Yapılandırılmamış Yapay Zeka Servisi';

  isConfigured(): boolean {
    return false;
  }

  async generateCode(request: GenerationRequest): Promise<GenerationResponse> {
    return {
      message: 'Yapay zeka sağlayıcısı (Gemini vb.) henüz yapılandırılmadı. Lütfen Ayarlar panelinden geçerli bir API anahtarı ekleyin.',
      modifiedFiles: [],
      status: 'unconfigured',
      errorDetails: 'AI Provider integration is not configured. Prompt was: ' + request.prompt,
    };
  }
}

/**
 * Future Gemini AI Provider implementation stub.
 */
export class GeminiAIProvider implements AIProvider {
  id = 'gemini';
  name = 'Google Gemini API';
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateCode(request: GenerationRequest): Promise<GenerationResponse> {
    if (!this.isConfigured()) {
      return new UnconfiguredAIProvider().generateCode(request);
    }

    throw new Error('Gemini API call not implemented in foundation baseline.');
  }
}

let activeProvider: AIProvider = new UnconfiguredAIProvider();

export function getAIProvider(): AIProvider {
  return activeProvider;
}

export function setAIProvider(provider: AIProvider): void {
  activeProvider = provider;
}
