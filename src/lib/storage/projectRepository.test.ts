import { describe, it, expect, beforeEach } from 'vitest';
import { projectRepository } from './projectRepository';

// Mock localStorage for Node test environment
const createMockLocalStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

describe('projectRepository', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: {
        localStorage: createMockLocalStorage(),
      },
      writable: true,
      configurable: true,
    });
    projectRepository.clearAll();
  });

  it('starts with an empty list of projects', () => {
    const list = projectRepository.getAll();
    expect(list).toEqual([]);
  });

  it('creates and persists a new project from a prompt', () => {
    const prompt = 'Kişisel bir portföy ve blog web sitesi oluştur.';
    const project = projectRepository.create(prompt);

    expect(project.id).toBeDefined();
    expect(project.name).toBe('Kişisel bir portföy ve blog web...');
    expect(project.initialPrompt).toBe(prompt);
    expect(project.messages.length).toBe(2);
    expect(project.messages[0].role).toBe('user');
    expect(project.messages[0].content).toBe(prompt);
    expect(project.messages[1].role).toBe('system');
    expect(project.messages[1].status).toBe('unconfigured');

    const fetched = projectRepository.getById(project.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(project.id);
  });

  it('updates project title', () => {
    const project = projectRepository.create('Yeni uygulama fikri');
    const updated = projectRepository.updateName(project.id, 'Portföy Projesi v2');

    expect(updated?.name).toBe('Portföy Projesi v2');
    const retrieved = projectRepository.getById(project.id);
    expect(retrieved?.name).toBe('Portföy Projesi v2');
  });

  it('deletes a project', () => {
    const project = projectRepository.create('Silinecek proje');
    expect(projectRepository.getAll().length).toBe(1);

    projectRepository.delete(project.id);
    expect(projectRepository.getAll().length).toBe(0);
    expect(projectRepository.getById(project.id)).toBeNull();
  });
});
