import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class CurrentUser {
  @Field((type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field({ nullable: true })
  avatar?: string
}

@ObjectType()
export class Team {
  @Field((type) => ID)
  id: string

  @Field()
  name: string
}
