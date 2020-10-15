import { Query, Resolver } from 'type-graphql';
import { GqlContext } from '$server/decorators/gql-context';
import type { TGqlContext } from '$server/decorators/gql-context';
import { User } from '$server/type-graphql';
import { AllUserData, requireAuth } from '$server/guards/require-auth';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User)
  async currentUser(@GqlContext() ctx: TGqlContext): Promise<AllUserData> {
    const user = await requireAuth(ctx.req);
    return user;
  }
}
