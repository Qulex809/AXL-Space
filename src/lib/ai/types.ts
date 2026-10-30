/**
 * AI Provider Types & Interfaces for future integrations (Gemini, Claude, local models, etc.)
 */

export interface ModelOption {
  id: string;
  name: string;
  provider: 'gemini' | 'anthropic' | 'openai' | 'custom' | 'unconfigured';
  contextWindow?: number;
  isAvailable: boolean;
  description: string;
}

export interface FileChange {
  path: string;
  action: 'create' | 'modify' | 'delete';
  content?: string;
  diff?: string;
}

export interface GenerationRequest {
  projectId: string;
  prompt: string;
  modelId?: string;
  contextFiles?: { path: string; content: string }[];
}

export interface GenerationResult {
  success: boolean;
  message: string;
  fileChanges: FileChange[];
  rawResponse?: string;
  error?: ProviderError;
}

export interface ProviderError {
  code: 'UNCONFIGURED' | 'RATE_LIMITED' | 'NETWORK_ERROR' | 'INVALID_KEY' | 'UNKNOWN';
  message: string;
  suggestion?: string;
}

export interface AIProvider {
  id: string;
  name: string;
  isConfigured(): boolean;
  getAvailableModels(): ModelOption[];
  generateCode(request: GenerationRequest): Promise<GenerationResult>;
}
