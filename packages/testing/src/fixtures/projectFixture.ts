import { Project } from '@buildy/domain';

export function projectFixture(overrides: Partial<Project> = {}): Project {
  return {
    id: 'project-1',
    organizationId: 'org-1',
    name: 'Fixture Project',
    ...overrides
  };
}
