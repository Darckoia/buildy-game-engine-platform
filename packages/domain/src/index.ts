export type EntityId = string;

export interface User {
  id: EntityId;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface Organization {
  id: EntityId;
  name: string;
  ownerUserId: EntityId;
}

export interface Project {
  id: EntityId;
  organizationId: EntityId;
  name: string;
  description?: string;
}

export type JobStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export interface Generation {
  id: EntityId;
  projectId: EntityId;
  status: JobStatus;
  correlationId: string;
}

export interface Build {
  id: EntityId;
  projectId: EntityId;
  status: JobStatus;
  platform: 'android' | 'ios' | 'web';
}
