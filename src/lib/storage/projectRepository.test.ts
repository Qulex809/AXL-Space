import { describe, it, expect, beforeEach } from 'vitest';
import { ProjectRepository } from './projectRepository';
import { UnconfiguredAIProvider } from '../ai/provider';

describe('ProjectRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty project list', () => {
    expect(ProjectRepository.getAll()).toEqual([]);
  });

  it('creates project from prompt with derived name', () => {
    const prompt = 'Kişisel portfolyo ve blog sitesi yapmak istiyorum';
    const project = ProjectRepository.createFromPrompt(prompt);

    expect(project).toBeDefined();
    expect(project.initialPrompt).toBe(prompt);
    expect(project.name).toBe('Kişisel portfolyo ve blog sitesi...');
    expect(project.files.length).toBeGreaterThan(0);
    expect(project.messages.length).toBe(2);

    const saved = ProjectRepository.getById(project.id);
    expect(saved).not.toBeNull();
    expect(saved?.id).toBe(project.id);
  });

  it('updates project name', () => {
    const project = ProjectRepository.createFromPrompt('Açıklama');
    const updated = ProjectRepository.updateName(project.id, 'Özel Proje Adı');

    expect(updated?.name).toBe('Özel Proje Adı');
    const fetched = ProjectRepository.getById(project.id);
    expect(fetched?.name).toBe('Özel Proje Adı');
  });

  it('deletes project correctly', () => {
    const p1 = ProjectRepository.createFromPrompt('Proje 1');
    const p2 = ProjectRepository.createFromPrompt('Proje 2');

    expect(ProjectRepository.getAll().length).toBe(2);
    ProjectRepository.delete(p1.id);

    expect(ProjectRepository.getAll().length).toBe(1);
    expect(ProjectRepository.getById(p1.id)).toBeNull();
    expect(ProjectRepository.getById(p2.id)).not.toBeNull();
  });
});

describe('UnconfiguredAIProvider', () => {
  it('returns not_configured status and explicit failure output without faking success', async () => {
    const provider = new UnconfiguredAIProvider();
    expect(provider.isConfigured()).toBe(false);
    expect(provider.getStatus().status).toBe('not_configured');

    const result = await provider.generateProjectStructure({
      projectId: 'test_123',
      prompt: 'Yeni uygulama',
    });

    expect(result.status).toBe('failed');
    expect(result.error).toContain('AI entegrasyonu yapılandırılmadığı');
  });
});
