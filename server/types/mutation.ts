import { mutationType } from '@nexus/schema';

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneProject();
    t.crud.createOnePage();
    t.crud.createOneComment();

    t.crud.createOneLike();
    t.crud.deleteOneLike();
  },
});
