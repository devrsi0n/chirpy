import { objectType } from '@nexus/schema';

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.teamId();
    t.model.team();
    t.model.userId();
    t.model.user();
    t.model.pages();
  },
});
