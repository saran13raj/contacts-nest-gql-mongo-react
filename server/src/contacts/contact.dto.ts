import { ObjectType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
export class ContactType {
  @Field()
  _id?: string;

  @Field()
  readonly name: string;

  @Field()
  readonly phone: string;

  @Field()
  readonly email: string;

  @Field()
  readonly picture: string;

  @Field(() => JSON)
  info: object;
}
