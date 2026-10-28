export interface ProjectFile {
  path: string;
  content: string;
  language?: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  fileChanges?: ProjectFile[];
}

export interface Project {
  id: string;
  title: string;
  initialPrompt: string;
  createdAt: string;
  updatedAt: string;
  messages: ConversationMessage[];
  files: ProjectFile[];
  status: 'idle' | 'generating' | 'ready' | 'error';
}

export interface ProjectSummary {
  id: string;
  title: string;
  initialPrompt: string;
  createdAt: string;
  updatedAt: string;
  fileCount: number;
}
