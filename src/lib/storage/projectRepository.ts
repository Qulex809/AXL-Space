/**
 * Local Project Repository & Virtual Filesystem
 * Persistence abstraction using localStorage with support for code files,
 * project categories, diagnostics logs, and templates.
 */

export type ProjectCategory =
  | 'Web sitesi'
  | 'Web uygulaması'
  | 'Dashboard'
  | 'E-ticaret'
  | 'Verimlilik aracı'
  | 'Backend / API'
  | 'Diğer';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Web sitesi',
  'Web uygulaması',
  'Dashboard',
  'E-ticaret',
  'Verimlilik aracı',
  'Backend / API',
  'Diğer',
];

export interface ProjectFile {
  name: string;
  path: string;
  language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'markdown';
  content: string;
}

export interface ConsoleLog {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  source?: string;
}

export interface ProjectMessage {
  id: string;
  role: 'user' | 'system' | 'assistant';
  content: string;
  timestamp: string;
  status?: 'pending' | 'completed' | 'unconfigured' | 'error';
  filesChanged?: string[];
}

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  modelId: string;
  initialPrompt: string;
  createdAt: string;
  updatedAt: string;
  messages: ProjectMessage[];
  files: ProjectFile[];
  logs: ConsoleLog[];
}

const STORAGE_KEY = 'axl_space_projects_v1';

export function createInitialFiles(projectName: string, category: ProjectCategory): ProjectFile[] {
  const safeName = projectName.replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'AXL App';

  return [
    {
      name: 'App.tsx',
      path: 'src/App.tsx',
      language: 'typescript',
      content: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F5F5F5] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#18181B] border border-[#29292E] rounded-xl p-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
          <span>${category}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">${safeName}</h1>
        <p className="text-sm text-zinc-400">
          AXL Space tarafından hazırlanan modern uygulama şablonu.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Tıklama Sayısı: {count}
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    },
    {
      name: 'main.tsx',
      path: 'src/main.tsx',
      language: 'typescript',
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
    },
    {
      name: 'index.css',
      path: 'src/index.css',
      language: 'css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0B0B0C;
  color: #F5F5F5;
}
`,
    },
    {
      name: 'package.json',
      path: 'package.json',
      language: 'json',
      content: JSON.stringify(
        {
          name: safeName.toLowerCase().replace(/\s+/g, '-'),
          private: true,
          version: '0.1.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
          },
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            'lucide-react': '^0.475.0',
          },
          devDependencies: {
            vite: '^6.0.0',
            tailwindcss: '^3.4.0',
            typescript: '^5.7.0',
          },
        },
        null,
        2
      ),
    },
    {
      name: 'README.md',
      path: 'README.md',
      language: 'markdown',
      content: `# ${safeName}\n\n${category} projesi — AXL Space ortamında oluşturuldu.\n`,
    },
  ];
}

// Fallback in-memory map for node testing / non-browser environments
const memoryStore = new Map<string, string>();

export class ProjectRepository {
  private getStorage(): { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void } {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return {
      getItem: (k: string) => memoryStore.get(k) || null,
      setItem: (k: string, v: string) => memoryStore.set(k, v),
      removeItem: (k: string) => memoryStore.delete(k),
    };
  }

  getAll(): Project[] {
    const storage = this.getStorage();
    if (!storage) return [];

    try {
      const data = storage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  getById(id: string): Project | null {
    const all = this.getAll();
    return all.find((p) => p.id === id) || null;
  }

  create(prompt: string, category: ProjectCategory = 'Web uygulaması', modelId = 'gemini-1.5-pro'): Project {
    const storage = this.getStorage();
    const all = this.getAll();

    // Derive concise title from user prompt
    const cleaned = prompt.replace(/\s+/g, ' ').trim();
    let name = cleaned.slice(0, 32);
    if (cleaned.length > 32) {
      name += '...';
    }
    if (!name) name = 'Yeni AXL Projesi';

    const timestamp = new Date().toISOString();
    const initialFiles = createInitialFiles(cleaned.slice(0, 24) || 'Uygulama', category);

    const newProject: Project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      category,
      modelId,
      initialPrompt: prompt,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [
        {
          id: `msg_${Date.now()}_u`,
          role: 'user',
          content: prompt,
          timestamp,
        },
        {
          id: `msg_${Date.now()}_s`,
          role: 'system',
          content:
            'Proje kabuğu ve sanal dosya sistemi oluşturuldu. Yapay zeka sağlayıcısı (Gemini / Claude vb.) henüz yapılandırılmadığı için AI kod üretimi ve önizleme motoru beklemede.',
          timestamp,
          status: 'unconfigured',
          filesChanged: initialFiles.map((f) => f.path),
        },
      ],
      files: initialFiles,
      logs: [
        {
          id: `log_${Date.now()}_1`,
          level: 'info',
          message: `Proje "${name}" (${category}) başarıyla başlatıldı.`,
          timestamp,
          source: 'System',
        },
        {
          id: `log_${Date.now()}_2`,
          level: 'warn',
          message: `Model sağlayıcısı [${modelId}] yapılandırılmamış. Yerel sanal çalışma alanı aktif.`,
          timestamp,
          source: 'AI Provider',
        },
      ],
    };

    all.unshift(newProject);
    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (e) {
        console.error('Failed to save project to localStorage', e);
      }
    }

    return newProject;
  }

  save(project: Project): void {
    const storage = this.getStorage();
    const all = this.getAll();
    const index = all.findIndex((p) => p.id === project.id);

    project.updatedAt = new Date().toISOString();

    if (index >= 0) {
      all[index] = project;
    } else {
      all.unshift(project);
    }

    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (e) {
        console.error('Failed to save projects to localStorage', e);
      }
    }
  }

  updateName(id: string, newName: string): boolean {
    const project = this.getById(id);
    if (!project) return false;
    project.name = newName.trim() || project.name;
    this.save(project);
    return true;
  }

  updateFileContent(projectId: string, filePath: string, newContent: string): boolean {
    const project = this.getById(projectId);
    if (!project) return false;
    const file = project.files.find((f) => f.path === filePath);
    if (!file) return false;

    file.content = newContent;
    project.logs.push({
      id: `log_${Date.now()}`,
      level: 'info',
      message: `${filePath} güncellendi.`,
      timestamp: new Date().toISOString(),
      source: 'Editor',
    });
    this.save(project);
    return true;
  }

  addFile(projectId: string, path: string, content = ''): boolean {
    const project = this.getById(projectId);
    if (!project) return false;
    if (project.files.some((f) => f.path === path)) return false;

    const name = path.split('/').pop() || path;
    const ext = name.split('.').pop() || '';
    let language: ProjectFile['language'] = 'typescript';
    if (ext === 'js' || ext === 'jsx') language = 'javascript';
    else if (ext === 'html') language = 'html';
    else if (ext === 'css') language = 'css';
    else if (ext === 'json') language = 'json';
    else if (ext === 'md') language = 'markdown';

    project.files.push({ name, path, language, content });
    project.logs.push({
      id: `log_${Date.now()}`,
      level: 'info',
      message: `Yeni dosya eklendi: ${path}`,
      timestamp: new Date().toISOString(),
      source: 'Workspace',
    });
    this.save(project);
    return true;
  }

  delete(id: string): boolean {
    const storage = this.getStorage();
    const all = this.getAll();
    const filtered = all.filter((p) => p.id !== id);

    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  clearAll(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
  }
}

export const projectRepository = new ProjectRepository();
