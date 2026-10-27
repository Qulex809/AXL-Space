export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  status?: 'pending' | 'success' | 'info' | 'error';
}

export interface Project {
  id: string;
  name: string;
  initialPrompt: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ready' | 'generating';
  files: ProjectFile[];
  messages: ConversationMessage[];
}

const STORAGE_KEY = 'axl_space_projects_v1';

export const ProjectRepository = {
  getAll(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Failed to parse projects from localStorage', err);
      return [];
    }
  },

  getById(id: string): Project | null {
    const projects = this.getAll();
    return projects.find((p) => p.id === id) || null;
  },

  save(project: Project): Project {
    const projects = this.getAll();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to save project to localStorage', err);
    }

    return updatedProject;
  },

  createFromPrompt(prompt: string): Project {
    const trimmedPrompt = prompt.trim();
    // Derive a sensible title from the prompt
    let derivedName = trimmedPrompt.slice(0, 32).trim();
    if (trimmedPrompt.length > 32) {
      derivedName += '...';
    }
    if (!derivedName) {
      derivedName = 'Yeni Proje';
    }

    const now = new Date().toISOString();
    const id = 'proj_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

    const newProject: Project = {
      id,
      name: derivedName,
      initialPrompt: trimmedPrompt,
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      files: [
        {
          path: 'README.md',
          content: `# ${derivedName}\n\n${trimmedPrompt}\n\n*Bu proje AXL Space ile oluşturuldu.*`,
          language: 'markdown',
        },
      ],
      messages: [
        {
          id: 'msg_initial_' + Date.now(),
          role: 'user',
          content: trimmedPrompt,
          createdAt: now,
        },
        {
          id: 'msg_system_welcome_' + Date.now(),
          role: 'system',
          content:
            'Proje taslağı oluşturuldu. AI entegrasyonu henüz yapılandırılmadığı için canlı kod üretimi beklemededir.',
          createdAt: now,
          status: 'info',
        },
      ],
    };

    return this.save(newProject);
  },

  updateName(id: string, newName: string): Project | null {
    const project = this.getById(id);
    if (!project) return null;
    project.name = newName.trim() || 'Adsız Proje';
    return this.save(project);
  },

  delete(id: string): void {
    const projects = this.getAll().filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to delete project from localStorage', err);
    }
  },

  addMessage(projectId: string, message: Omit<ConversationMessage, 'id' | 'createdAt'>): Project | null {
    const project = this.getById(projectId);
    if (!project) return null;

    const newMessage: ConversationMessage = {
      ...message,
      id: 'msg_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    project.messages.push(newMessage);
    return this.save(project);
  },
};
