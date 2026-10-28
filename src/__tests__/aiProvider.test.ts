import { describe, it, expect } from 'vitest';
import { UnconfiguredAIProvider, GeminiAIProvider } from '../lib/ai/provider';

describe('AI Provider Abstraction', () => {
  it('UnconfiguredAIProvider should report as unconfigured and return explicit message', async () => {
    const provider = new UnconfiguredAIProvider();
    expect(provider.isConfigured()).toBe(false);

    const response = await provider.generateCode({
      projectId: 'proj_1',
      prompt: 'Test prompt',
      existingFiles: [],
    });

    expect(response.status).toBe('unconfigured');
    expect(response.message).toContain('yapılandırılmadı');
    expect(response.modifiedFiles).toEqual([]);
  });

  it('GeminiAIProvider should detect configured state based on key', () => {
    const unconfiguredGemini = new GeminiAIProvider('');
    expect(unconfiguredGemini.isConfigured()).toBe(false);

    const configuredGemini = new GeminiAIProvider('valid_test_api_key');
    expect(configuredGemini.isConfigured()).toBe(true);
  });
});
