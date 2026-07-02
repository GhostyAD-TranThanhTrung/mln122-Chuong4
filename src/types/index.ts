export type NodeType = 'product' | 'brand' | 'holding' | 'fund' | 'oligarch';

export interface TracerNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
  registrationNumber?: string;
  jurisdiction?: string;
}

export interface TracerLink {
  source: string;
  target: string;
  label: string;
}

export interface MajorHoldersBreakdown {
  insidersPercentHeld?: number;
  institutionsPercentHeld?: number;
  institutionsFloatPercentHeld?: number;
  institutionsCount?: number;
}

export interface TracerGraph {
  nodes: TracerNode[];
  links: TracerLink[];
  majorHoldersBreakdown?: MajorHoldersBreakdown;
}

export interface OpenSanctionsEntity {
  id: string;
  schema: string;
  caption: string;
  properties: Record<string, string[]>;
  first_seen: string;
  last_seen: string;
  datasets: string[];
}
