import { useState, useEffect } from 'react';
import { ProjectRepository, Project } from './lib/storage/projectRepository';
import { Sidebar } from './components/layout/Sidebar';
import { HomeScreen } from './features/home/HomeScreen';
import { WorkspaceScreen } from './features/workspace/WorkspaceScreen';
import { WolfHelperWidget } from './components/mascot/WolfHelperWidget';
import { SettingsModal } from './components/settings/SettingsModal';

export function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [homePromptDraft, setHomePromptDraft] = useState('');

  // Load projects on initial mount
  useEffect(() => {
    const loaded = ProjectRepository.getAll();
    setProjects(loaded);
  }, []);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  const handleCreateProject = (prompt: string) => {
    const created = ProjectRepository.createFromPrompt(prompt);
    setProjects(ProjectRepository.getAll());
    setActiveProjectId(created.id);
  };

  const handleSelectProject = (id: string | null) => {
    setActiveProjectId(id);
  };

  const handleNewProject = () => {
    setActiveProjectId(null);
    setHomePromptDraft('');
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    ProjectRepository.delete(id);
    setProjects(ProjectRepository.getAll());
    if (activeProjectId === id) {
      setActiveProjectId(null);
    }
  };

  const handleUpdateProjectName = (newName: string) => {
    if (!activeProjectId) return;
    const updated = ProjectRepository.updateName(activeProjectId, newName);
    if (updated) {
      setProjects(ProjectRepository.getAll());
    }
  };

  const handleSendMessage = (content: string) => {
    if (!activeProjectId) return;
    const updated = ProjectRepository.addMessage(activeProjectId, {
      role: 'user',
      content,
    });
    if (updated) {
      setProjects(ProjectRepository.getAll());
    }
  };

  const handleSelectStarter = (prompt: string) => {
    setActiveProjectId(null);
    setHomePromptDraft(prompt);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-axl-bg text-axl-text font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
        onDeleteProject={handleDeleteProject}
        isOpen={isSidebarOpen}
        onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {activeProject ? (
          <WorkspaceScreen
            key={activeProject.id}
            project={activeProject}
            onUpdateProjectName={handleUpdateProjectName}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <HomeScreen
            onCreateProject={handleCreateProject}
            initialPromptValue={homePromptDraft}
          />
        )}
      </main>

      {/* Companion Wolf Mascot Helper */}
      <WolfHelperWidget onSelectStarter={handleSelectStarter} />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
