import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { HomeScreen } from './components/home/HomeScreen';
import { Workspace } from './components/workspace/Workspace';
import { WolfHelper } from './components/mascot/WolfHelper';
import { SettingsModal } from './components/settings/SettingsModal';
import { ProjectRepository } from './lib/storage/projectRepository';
import { Project, ProjectSummary } from './types/project';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [homeComposerPrompt, setHomeComposerPrompt] = useState('');

  // Initial load of projects from localStorage
  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = () => {
    const list = ProjectRepository.getProjects();
    setProjects(list);
  };

  const handleSelectProject = (id: string) => {
    const fullProject = ProjectRepository.getProjectById(id);
    if (fullProject) {
      setActiveProject(fullProject);
    }
  };

  const handleCreateProject = (prompt: string) => {
    const newProject = ProjectRepository.createProject(prompt);
    refreshProjects();
    setActiveProject(newProject);
    setHomeComposerPrompt('');
  };

  const handleDeleteProject = (id: string) => {
    ProjectRepository.deleteProject(id);
    refreshProjects();
    if (activeProject?.id === id) {
      setActiveProject(null);
    }
  };

  const handleUpdateTitle = (newTitle: string) => {
    if (!activeProject) return;
    const updated = ProjectRepository.updateProject(activeProject.id, { title: newTitle });
    if (updated) {
      setActiveProject(updated);
      refreshProjects();
    }
  };

  const handleSendMessage = (messageContent: string) => {
    if (!activeProject) return;

    const updatedMessages = [
      ...activeProject.messages,
      {
        id: `msg_${Date.now()}_usr`,
        role: 'user' as const,
        content: messageContent,
        timestamp: new Date().toISOString(),
      },
      {
        id: `msg_${Date.now()}_sys`,
        role: 'system' as const,
        content: 'Yapay zeka motoru henüz bağlı olmadığı için revizyon işlenemedi.',
        timestamp: new Date().toISOString(),
      },
    ];

    const updated = ProjectRepository.updateProject(activeProject.id, {
      messages: updatedMessages,
    });

    if (updated) {
      setActiveProject(updated);
    }
  };

  const handleInsertHelperPrompt = (prompt: string) => {
    if (activeProject) {
      handleSendMessage(prompt);
    } else {
      setHomeComposerPrompt(prompt);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0B0C] text-[#F5F5F5]">
      {/* Sidebar Navigation */}
      <Sidebar
        projects={projects}
        activeProjectId={activeProject?.id || null}
        onSelectProject={handleSelectProject}
        onNewProject={() => setActiveProject(null)}
        onDeleteProject={handleDeleteProject}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Workspace or Home Screen */}
      <main className="flex-1 h-full overflow-hidden relative">
        {activeProject ? (
          <Workspace
            project={activeProject}
            onUpdateTitle={handleUpdateTitle}
            onSendMessage={handleSendMessage}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          />
        ) : (
          <HomeScreen
            onCreateProject={handleCreateProject}
            initialPrompt={homeComposerPrompt}
          />
        )}

        {/* Pixel Wolf Mascot Helper Widget */}
        <WolfHelper onInsertPrompt={handleInsertHelperPrompt} />
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
