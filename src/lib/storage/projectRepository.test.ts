import { describe, it, expect, beforeEach } from 'vitest';
import { projectRepository } from './projectRepository';

describe('ProjectRepository', () => {
  beforeEach(() => {
    projectRepository.clearAll();
  });

  it('creates a project with derived name, category and files', () => {
    const project = projectRepository.create(
      'Kullanıcıların notlarını tutabileceği minimalist bir not defteri',
      'Verimlilik aracı',
      'claude-3-7-sonnet'
    );
    expect(project).toBeDefined();
    expect(project.id).toMatch(/^proj_/);
    expect(project.category).toBe('Verimlilik aracı');
    expect(project.modelId).toBe('claude-3-7-sonnet');
    expect(project.name.length).toBeLessThanOrEqual(35);
    expect(project.messages.length).toBe(2);
    expect(project.files.length).toBeGreaterThan(0);
    expect(project.files.some((f) => f.path === 'src/App.tsx')).toBe(true);
    expect(project.logs.length).toBeGreaterThan(0);
  });

  it('retrieves created project by id and persists in storage', () => {
    const created = projectRepository.create('Yeni Dashboard Projesi', 'Dashboard');
    const retrieved = projectRepository.getById(created.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(created.id);
    expect(retrieved?.category).toBe('Dashboard');
  });

  it('updates project file content and records log', () => {
    const project = projectRepository.create('Test App', 'Web uygulaması');
    const success = projectRepository.updateFileContent(project.id, 'src/App.tsx', '// updated code');
    expect(success).toBe(true);

    const updated = projectRepository.getById(project.id);
    const file = updated?.files.find((f) => f.path === 'src/App.tsx');
    expect(file?.content).toBe('// updated code');
    expect(updated?.logs.some((l) => l.message.includes('src/App.tsx'))).toBe(true);
  });

  it('deletes a project cleanly', () => {
    const created = projectRepository.create('Silinecek Proje');
    expect(projectRepository.getAll().length).toBe(1);

    const deleted = projectRepository.delete(created.id);
    expect(deleted).toBe(true);
    expect(projectRepository.getAll().length).toBe(0);
  });
});
