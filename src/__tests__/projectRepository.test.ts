import { describe, it, expect, beforeEach } from 'vitest';
import { ProjectRepository } from '../lib/storage/projectRepository';

describe('ProjectRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty list when no projects exist', () => {
    const projects = ProjectRepository.getProjects();
    expect(projects).toEqual([]);
  });

  it('should create a new project and retrieve it', () => {
    const prompt = 'Gelişmiş bir hava durumu uygulaması oluştur.';
    const created = ProjectRepository.createProject(prompt);

    expect(created.id).toBeDefined();
    expect(created.initialPrompt).toBe(prompt);
    expect(created.title).toBeDefined();

    const summaries = ProjectRepository.getProjects();
    expect(summaries.length).toBe(1);
    expect(summaries[0].id).toBe(created.id);

    const retrieved = ProjectRepository.getProjectById(created.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.messages.length).toBe(2);
  });

  it('should derive concise titles correctly from long prompts', () => {
    const longPrompt = 'Bu çok uzun bir uygulama fikridir ve başlığın kısa ve derli toplu kalması gerekir.';
    const title = ProjectRepository.deriveTitleFromPrompt(longPrompt);
    expect(title.length).toBeLessThanOrEqual(32);
    expect(title.endsWith('...')).toBe(true);
  });

  it('should update project title and messages', () => {
    const project = ProjectRepository.createProject('Kişisel Blog');
    const updated = ProjectRepository.updateProject(project.id, { title: 'Yeni Blog' });

    expect(updated?.title).toBe('Yeni Blog');
    const retrieved = ProjectRepository.getProjectById(project.id);
    expect(retrieved?.title).toBe('Yeni Blog');
  });

  it('should delete project by ID', () => {
    const project = ProjectRepository.createProject('Silinecek Proje');
    expect(ProjectRepository.getProjects().length).toBe(1);

    const deleted = ProjectRepository.deleteProject(project.id);
    expect(deleted).toBe(true);
    expect(ProjectRepository.getProjects().length).toBe(0);
  });
});
