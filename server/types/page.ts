import { objectType } from 'nexus';

export const Page = objectType({
  name: 'Page',
  definition(t) {
    t.model.id();
    t.model.url();
    t.model.title();
    t.model.projects();
    t.model.comments();
  },
});
