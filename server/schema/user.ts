import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.avatar();
    t.model.email();
    t.model.members();
    t.model.projects();
  },
});
