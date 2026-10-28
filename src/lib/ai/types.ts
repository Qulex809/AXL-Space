import { ProjectFile } from '../../types/project';

export interface AIProviderConfig {
  providerId: 'gemini' | 'openai' | 'anthropic' | 'custom' | 'unconfigured';
  apiKey?: string;
  baseUrl?: string;
  modelName?: string;
}

export interface GenerationRequest {
  projectId: string;
  prompt: string;
  existingFiles: ProjectFile[];
  conversationHistory?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
}

export interface GenerationResponse {
  message: string;
  modifiedFiles: ProjectFile[];
  deletedFilePaths?: string[];
  status: 'completed' | 'failed' | 'unconfigured';
  errorDetails?: string;
}

export interface AIProvider {
  id: string;
  name: string;
  isConfigured(): boolean;
  generateCode(request: GenerationRequest): Promise<GenerationResponse>;
}
