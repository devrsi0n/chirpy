import { mutationType } from 'nexus';

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneProject();
    t.crud.createOnePage();
    t.crud.createOneComment();

    t.crud.createOneLike();
    t.crud.deleteOneLike();

    t.crud.updateOneComment();
  },
});
