import { Query, Resolver } from 'type-graphql';
import { GqlContext } from '$server/decorators/gql-context';
import type { TGqlContext } from '$server/decorators/gql-context';
import { CurrentUser } from '$server/graphql.types';
import { ModelUserWithMembers, requireAuth } from '$server/guards/require-auth';

@Resolver()
export class UserResolver {
  @Query((returns) => CurrentUser)
  async currentUser(@GqlContext() ctx: TGqlContext): Promise<ModelUserWithMembers> {
    const user = await requireAuth(ctx.req);
    return user;
  }
}
