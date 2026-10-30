import { describe, it, expect } from 'vitest';
import { aiService, UnconfiguredProvider } from './provider';

describe('AI Provider Abstraction', () => {
  it('defaults to an UnconfiguredProvider', () => {
    const provider = aiService.getProvider();
    expect(provider).toBeInstanceOf(UnconfiguredProvider);
    expect(provider.isConfigured()).toBe(false);
  });

  it('lists available candidate models with unconfigured flag', () => {
    const provider = aiService.getProvider();
    const models = provider.getAvailableModels();
    expect(models.length).toBeGreaterThan(0);
    expect(models.some((m) => m.id.includes('gemini'))).toBe(true);
    expect(models.every((m) => m.isAvailable === false)).toBe(true);
  });

  it('returns explicit unconfigured error on generateCode call without fabricating data', async () => {
    const provider = aiService.getProvider();
    const result = await provider.generateCode({
      projectId: 'proj_test',
      prompt: 'Build a calculator',
    });

    expect(result.success).toBe(false);
    expect(result.fileChanges).toEqual([]);
    expect(result.error?.code).toBe('UNCONFIGURED');
  });
});
