export interface ProjectFile {
  path: string;
  content: string;
  language: string;
  updatedAt: string;
}

export interface TaskMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'pending' | 'completed' | 'unconfigured' | 'error';
}

export interface Project {
  id: string;
  name: string;
  initialPrompt: string;
  createdAt: string;
  updatedAt: string;
  messages: TaskMessage[];
  files: ProjectFile[];
}

const STORAGE_KEY = 'axl_space_projects_v1';

class ProjectRepository {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public getAll(): Project[] {
    if (!this.isBrowser()) return [];
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to load projects from localStorage:', e);
      return [];
    }
  }

  public getById(id: string): Project | null {
    const list = this.getAll();
    return list.find((p) => p.id === id) || null;
  }

  public save(project: Project): void {
    if (!this.isBrowser()) return;
    const list = this.getAll();
    const index = list.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      list[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(project);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save project to localStorage:', e);
    }
  }

  public create(prompt: string): Project {
    const trimmed = prompt.trim();
    // Derive a clean, readable name from the prompt
    let title = trimmed.slice(0, 32).trim();
    if (trimmed.length > 32) {
      title = `${title}...`;
    }
    if (!title) {
      title = 'İsimsiz Proje';
    }

    const now = new Date().toISOString();
    const newProject: Project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: title,
      initialPrompt: trimmed,
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg_${Date.now()}_1`,
          role: 'user',
          content: trimmed,
          timestamp: now,
        },
        {
          id: `msg_${Date.now()}_2`,
          role: 'system',
          content: 'Proje kabuğu oluşturuldu. Yapay zeka sağlayıcısı (Gemini / Claude vb.) henüz yapılandırılmadığı için kod üretimi ve önizleme motoru beklemede.',
          timestamp: now,
          status: 'unconfigured',
        },
      ],
      files: [],
    };

    this.save(newProject);
    return newProject;
  }

  public updateName(id: string, newName: string): Project | null {
    const project = this.getById(id);
    if (!project) return null;
    project.name = newName.trim() || 'İsimsiz Proje';
    this.save(project);
    return project;
  }

  public delete(id: string): void {
    if (!this.isBrowser()) return;
    const list = this.getAll().filter((p) => p.id !== id);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to delete project from localStorage:', e);
    }
  }

  public clearAll(): void {
    if (!this.isBrowser()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
}

export const projectRepository = new ProjectRepository();
