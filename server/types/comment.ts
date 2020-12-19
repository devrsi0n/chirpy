import { objectType } from 'nexus';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.pageId();
    t.model.page();
    t.model.replies();
    t.model.userId();
    t.model.user();
    t.model.createdAt();
    t.model.likes();
  },
});
