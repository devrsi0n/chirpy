import { objectType } from 'nexus';

export const Like = objectType({
  name: 'Like',
  definition(t) {
    t.model.id();
    t.model.userId();
    t.model.user();
    t.model.commentId();
    t.model.comment();
  },
});
