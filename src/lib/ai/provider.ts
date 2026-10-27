import { AIProviderInterface, AIProviderStatus, GenerationTaskInput, GenerationTaskOutput } from './types';

/**
 * Default AI Provider when no external API key/provider is configured.
 * Explicitly informs the user rather than producing fake generated outputs.
 */
export class UnconfiguredAIProvider implements AIProviderInterface {
  getId() {
    return 'mock' as const;
  }

  getName() {
    return 'Henüz Yapılandırılmadı';
  }

  getStatus(): AIProviderStatus {
    return {
      status: 'not_configured',
      message: 'AI Model entegrasyonu henüz yapılandırılmadı. API anahtarı ekleyerek Gemini veya diğer modelleri bağlayabilirsiniz.',
    };
  }

  isConfigured(): boolean {
    return false;
  }

  async generateProjectStructure(input: GenerationTaskInput): Promise<GenerationTaskOutput> {
    return {
      id: `gen-${Date.now()}`,
      projectId: input.projectId,
      status: 'failed',
      message: 'AI sağlayıcısı henüz yapılandırılmadı.',
      error: 'AI entegrasyonu yapılandırılmadığı için dosya üretimi gerçekleştirilemedi. Lütfen Ayarlar panelinden bir AI sağlayıcı API anahtarı ekleyin.',
      createdAt: new Date().toISOString(),
    };
  }

  async applyCodeTask(input: GenerationTaskInput): Promise<GenerationTaskOutput> {
    return {
      id: `task-${Date.now()}`,
      projectId: input.projectId,
      status: 'failed',
      message: 'AI sağlayıcısı henüz yapılandırılmadı.',
      error: 'AI entegrasyonu yapılandırılmadığı için kod güncellemesi gerçekleştirilemedi.',
      createdAt: new Date().toISOString(),
    };
  }
}

let currentProvider: AIProviderInterface = new UnconfiguredAIProvider();

export function getAIProvider(): AIProviderInterface {
  return currentProvider;
}

export function setAIProvider(provider: AIProviderInterface): void {
  currentProvider = provider;
}
