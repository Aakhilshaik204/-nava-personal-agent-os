export type InvariantCategory = 
  | 'Authority & Permissions' 
  | 'Memory & AI Twin' 
  | 'Execution & Concurrency' 
  | 'Deterministic Governance' 
  | 'Safety & Emergency';

export interface SystemInvariant {
  id: number;
  title: string;
  category: InvariantCategory;
  mathematicalRule: string;
  plainDescription: string;
  threatMitigated: string;
  enforcementPoint: string;
  sectionRef: string;
  testAssertion: string;
  simulatedStatus: 'PASSED' | 'VERIFIED';
}

export interface MemoryTier {
  tier: number;
  name: string;
  scope: string;
  ttl: string;
  storageBackend: string;
  description: string;
  example: string;
  fields: string[];
  trustConstraint: string;
}

export interface GatewayStep {
  stepNumber: number;
  name: string;
  subsystem: string;
  description: string;
  failureAction: string;
  codeSnippet: string;
}

export interface ThreatItem {
  id: string;
  threat: string;
  attackSurface: string;
  mitigation: string;
  detection: string;
  recovery: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface SimulationAgent {
  id: string;
  name: string;
  role: string;
  type: 'STATIC' | 'DYNAMIC';
  tools: string[];
  status: 'IDLE' | 'SPAWNING' | 'RUNNING' | 'WAITING_APPROVAL' | 'COMPLETED' | 'HALTED';
  progress: number;
  currentAction: string;
  tokensConsumed: number;
  stepsConsumed: number;
  bytesProcessed: number;
  depth: number;
}

export interface SwarmSimulationState {
  isRunning: boolean;
  isEmergencyHalted: boolean;
  haltDurationMs?: number;
  stage: number;
  taskGoal: string;
  activeAgents: SimulationAgent[];
  budget: {
    maxAgents: number;
    consumedAgents: number;
    maxSteps: number;
    consumedSteps: number;
    maxTokens: number;
    consumedTokens: number;
    maxDepth: number;
    maxRuntimeSec: number;
    elapsedSec: number;
  };
  locks: Array<{
    resource: string;
    lockType: 'SHARED_READ' | 'EXCLUSIVE_WRITE';
    holder: string;
  }>;
  auditTrail: Array<{
    id: string;
    timestamp: string;
    agent: string;
    eventType: string;
    riskScore: number;
    status: 'ALLOW' | 'APPROVAL' | 'BLOCK' | 'SUCCESS' | 'HALTED';
    detail: string;
  }>;
  latestReceipt?: {
    receiptId: string;
    agentId: string;
    parentAgentId: string;
    toolName: string;
    actionSummary: string;
    riskScore: number;
    riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    policyResult: 'ALLOW' | 'APPROVAL_GRANTED' | 'BLOCK';
    sha256Proof: string;
  };
}

export interface ReleaseDownload {
  os: 'macOS' | 'Windows' | 'Linux' | 'Docker';
  title: string;
  arch: string;
  version: string;
  fileSize: string;
  fileName: string;
  checksum: string;
  requirements: string[];
  icon: string;
  tag: string;
}
