/**
 * AI Provider Types for AXL Space
 * Designed for extensible model provider integrations (Gemini, Claude, OpenAI, etc.)
 */

export type AIProviderId = 'gemini' | 'anthropic' | 'openai' | 'custom' | 'mock';

export interface AIProviderConfig {
  id: AIProviderId;
  name: string;
  description: string;
  apiKey?: string;
  baseUrl?: string;
  selectedModel: string;
  availableModels: string[];
  isConfigured: boolean;
}

export interface ProjectFileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export interface GenerationTaskInput {
  projectId: string;
  prompt: string;
  contextFiles?: { path: string; content: string }[];
}

export interface GenerationTaskOutput {
  id: string;
  projectId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message: string;
  filesChanged?: ProjectFileChange[];
  error?: string;
  createdAt: string;
}

export interface AIProviderStatus {
  status: 'not_configured' | 'ready' | 'error';
  message: string;
  activeProviderId?: AIProviderId;
  activeModel?: string;
}

export interface AIProviderInterface {
  getId(): AIProviderId;
  getName(): string;
  getStatus(): AIProviderStatus;
  isConfigured(): boolean;
  generateProjectStructure(input: GenerationTaskInput): Promise<GenerationTaskOutput>;
  applyCodeTask(input: GenerationTaskInput): Promise<GenerationTaskOutput>;
}
