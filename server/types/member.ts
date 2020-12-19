import { objectType } from 'nexus';

export const Member = objectType({
  name: 'Member',
  definition(t) {
    t.model.id();
    t.model.role();
    t.model.userId();
    t.model.user();
    t.model.teamId();
    t.model.team();
  },
});
