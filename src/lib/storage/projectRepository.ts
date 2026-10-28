import { Project, ProjectSummary } from '../../types/project';

const STORAGE_KEY = 'axl_space_projects_v1';

export class ProjectRepository {
  /**
   * Retrieves all project summaries from localStorage.
   */
  static getProjects(): ProjectSummary[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const projects: Project[] = JSON.parse(data);
      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        initialPrompt: p.initialPrompt,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        fileCount: p.files ? p.files.length : 0,
      })).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } catch (e) {
      console.error('Failed to parse projects from localStorage', e);
      return [];
    }
  }

  /**
   * Retrieves a single full project by ID.
   */
  static getProjectById(id: string): Project | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      const projects: Project[] = JSON.parse(data);
      return projects.find((p) => p.id === id) || null;
    } catch (e) {
      console.error('Failed to retrieve project', e);
      return null;
    }
  }

  /**
   * Generates a concise title from the initial prompt.
   */
  static deriveTitleFromPrompt(prompt: string): string {
    const cleaned = prompt.trim().replace(/\s+/g, ' ');
    if (!cleaned) return 'Adsız Proje';
    if (cleaned.length <= 32) return cleaned;

    // Take first few words
    const words = cleaned.split(' ');
    let title = '';
    for (const word of words) {
      if ((title + ' ' + word).trim().length > 28) break;
      title = (title + ' ' + word).trim();
    }
    return title ? `${title}...` : `${cleaned.slice(0, 28)}...`;
  }

  /**
   * Creates and saves a new project.
   */
  static createProject(prompt: string): Project {
    const projects = this.getAllFullProjects();
    const now = new Date().toISOString();
    const id = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const title = this.deriveTitleFromPrompt(prompt);

    const newProject: Project = {
      id,
      title,
      initialPrompt: prompt,
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg_${Date.now()}_1`,
          role: 'user',
          content: prompt,
          timestamp: now,
        },
        {
          id: `msg_${Date.now()}_2`,
          role: 'system',
          content: 'Proje kabuğu oluşturuldu. Yapay zeka entegrasyonu henüz yapılandırılmadığı için şu an kod üretilemiyor. Yapılandırma adımları için ayarlara göz atabilirsiniz.',
          timestamp: now,
        }
      ],
      files: [],
      status: 'idle',
    };

    projects.unshift(newProject);
    this.saveAllFullProjects(projects);
    return newProject;
  }

  /**
   * Updates an existing project title or appends a message.
   */
  static updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getAllFullProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Project = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    projects[index] = updated;
    this.saveAllFullProjects(projects);
    return updated;
  }

  /**
   * Deletes a project by ID.
   */
  static deleteProject(id: string): boolean {
    const projects = this.getAllFullProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length === projects.length) return false;

    this.saveAllFullProjects(filtered);
    return true;
  }

  /**
   * Private helper to fetch raw projects list.
   */
  private static getAllFullProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Private helper to write raw projects list.
   */
  private static saveAllFullProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }
}
