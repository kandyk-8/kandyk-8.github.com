import { leadershipRoles, additionalRoles, curriculumIntro } from './curriculumData';
import { extendedRoles } from './curriculumDataExtended';
import { finalRoles } from './curriculumDataFinal';

// Combine all curriculum data
export const allLeadershipRoles = [
  ...leadershipRoles,
  ...additionalRoles,
  ...extendedRoles,
  ...finalRoles
];

export { curriculumIntro };
export type { Role, Attribute, Course } from './curriculumData';
