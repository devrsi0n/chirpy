import { objectType } from '@nexus/schema';

export const Member = objectType({
  name: 'Member',
  definition(t) {
    t.model.id();
    t.model.role();
    t.model.user();
    t.model.team();
  },
});
