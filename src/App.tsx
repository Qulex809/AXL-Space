import React, { useState, useEffect } from 'react';
import { projectRepository, Project, ProjectCategory } from './lib/storage/projectRepository';
import { Sidebar, MainNavView } from './components/layout/Sidebar';
import { HomeScreen } from './components/layout/HomeScreen';
import { Workspace } from './components/layout/Workspace';
import { SettingsModal } from './components/layout/SettingsModal';
import { WolfHelperWidget } from './components/mascot/WolfHelperWidget';
import { WolfState } from './components/mascot/PixelWolf';
import { ProjectsView } from './components/layout/ProjectsView';
import { AssistantsView } from './components/layout/AssistantsView';
import { TemplatesView } from './components/layout/TemplatesView';
import { Menu } from 'lucide-react';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeNavView, setActiveNavView] = useState<MainNavView>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelperOpen, setIsHelperOpen] = useState(false);

  // Global mascot state (shared across workspace, sidebar, helper)
  const [mascotState, setMascotState] = useState<WolfState>('idle');

  // Load projects from local storage on mount
  useEffect(() => {
    const stored = projectRepository.getAll();
    setProjects(stored);
  }, []);

  const handleCreateProject = (
    prompt: string,
    category: ProjectCategory = 'Web uygulaması',
    modelId = 'gemini-1.5-pro'
  ) => {
    const newProject = projectRepository.create(prompt, category, modelId);
    setProjects(projectRepository.getAll());
    setActiveProjectId(newProject.id);
  };

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
  };

  const handleNewProject = () => {
    setActiveProjectId(null);
    setActiveNavView('home');
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    projectRepository.delete(id);
    const updated = projectRepository.getAll();
    setProjects(updated);
    if (activeProjectId === id) {
      setActiveProjectId(null);
      setActiveNavView('projects');
    }
  };

  const handleUpdateProjectName = (id: string, name: string) => {
    projectRepository.updateName(id, name);
    setProjects(projectRepository.getAll());
  };

  const handleAddMessage = (projectId: string, content: string) => {
    const project = projectRepository.getById(projectId);
    if (!project) return;

    const userMsg = {
      id: `msg_${Date.now()}_u`,
      role: 'user' as const,
      content,
      timestamp: new Date().toISOString(),
    };

    const sysMsg = {
      id: `msg_${Date.now()}_s`,
      role: 'system' as const,
      content: 'Talimat alındı. Model sağlayıcısı henüz yapılandırılmadığı için kod üretimi yerel bekleme modunda sıraya alındı.',
      timestamp: new Date().toISOString(),
      status: 'unconfigured' as const,
    };

    project.messages.push(userMsg, sysMsg);
    projectRepository.save(project);
    setProjects(projectRepository.getAll());
  };

  const handleUpdateFile = (projectId: string, path: string, content: string) => {
    projectRepository.updateFileContent(projectId, path, content);
    setProjects(projectRepository.getAll());
  };

  const handleAddFile = (projectId: string, path: string) => {
    projectRepository.addFile(projectId, path);
    setProjects(projectRepository.getAll());
  };

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) || null
    : null;

  return (
    <div className="flex min-h-screen bg-axl-bg text-axl-text font-sans antialiased">
      {/* Sidebar navigation */}
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        activeNavView={activeNavView}
        onNavigate={(view) => {
          setActiveProjectId(null);
          setActiveNavView(view);
        }}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
        onDeleteProject={handleDeleteProject}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelper={() => setIsHelperOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header trigger */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-axl-panel border-b border-axl-border">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1 rounded-md text-axl-muted hover:text-white hover:bg-zinc-800 active:scale-95 transition-all"
            aria-label="Menüyü aç"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">AXL Space</span>
            <span className="text-[10px] font-mono text-zinc-400">PRO</span>
          </div>
          <div className="w-5" />
        </div>

        {activeProject ? (
          <Workspace
            project={activeProject}
            onUpdateProjectName={handleUpdateProjectName}
            onAddMessage={handleAddMessage}
            onUpdateFileContent={handleUpdateFile}
            onAddFile={handleAddFile}
            mascotState={mascotState}
            onMascotStateChange={setMascotState}
          />
        ) : activeNavView === 'projects' ? (
          <ProjectsView
            projects={projects}
            onSelectProject={handleSelectProject}
            onNewProject={handleNewProject}
            onDeleteProject={handleDeleteProject}
          />
        ) : activeNavView === 'assistants' ? (
          <AssistantsView />
        ) : activeNavView === 'templates' ? (
          <TemplatesView
            onSelectTemplate={(prompt, category) => {
              handleCreateProject(prompt, category);
            }}
          />
        ) : (
          <HomeScreen
            onCreateProject={handleCreateProject}
            onOpenTemplates={() => setActiveNavView('templates')}
          />
        )}
      </main>

      {/* Wolf Helper Widget (dismissible, bottom right) */}
      <WolfHelperWidget
        isOpen={isHelperOpen}
        onClose={() => setIsHelperOpen(false)}
        externalMascotState={mascotState}
        onMascotStateChange={setMascotState}
      />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
