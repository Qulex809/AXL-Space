import { AIProvider, GenerationRequest, GenerationResult, ModelOption } from './types';

/**
 * UnconfiguredProvider: Default placeholder provider when no real API keys
 * or backend proxy are configured. It gracefully communicates the integration state
 * without silently fabricating output or pretending an app has been generated.
 */
export class UnconfiguredProvider implements AIProvider {
  public id = 'unconfigured';
  public name = 'Yapılandırılmamış Sağlayıcı';

  public isConfigured(): boolean {
    return false;
  }

  public getAvailableModels(): ModelOption[] {
    return [
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        provider: 'gemini',
        isAvailable: false,
        description: 'Google AI Studio / Gemini API entegrasyonu henüz yapılandırılmadı.',
      },
      {
        id: 'claude-3-7-sonnet',
        name: 'Claude 3.7 Sonnet',
        provider: 'anthropic',
        isAvailable: false,
        description: 'Anthropic API entegrasyonu henüz yapılandırılmadı.',
      },
    ];
  }

  public async generateCode(_request: GenerationRequest): Promise<GenerationResult> {
    return {
      success: false,
      message: 'Yapay zeka sağlayıcısı henüz yapılandırılmadı. Google AI Studio veya API anahtarı ayarları eklendiğinde kod üretimi aktif hale gelecektir.',
      fileChanges: [],
      error: {
        code: 'UNCONFIGURED',
        message: 'No AI provider is connected.',
        suggestion: 'Ayarlar menüsünden veya Google AI Studio Build ortamından model sağlayıcısını bağlayabilirsiniz.',
      },
    };
  }
}

/**
 * Central AI provider factory / registry instance
 */
class AIServiceManager {
  private activeProvider: AIProvider;

  constructor() {
    this.activeProvider = new UnconfiguredProvider();
  }

  public getProvider(): AIProvider {
    return this.activeProvider;
  }

  public setProvider(provider: AIProvider): void {
    this.activeProvider = provider;
  }
}

export const aiService = new AIServiceManager();
