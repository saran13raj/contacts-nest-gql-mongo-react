import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import JSON from 'graphql-type-json';

@InputType()
export class ContactInput {
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

  @Field()
  address: string;
}

@InputType()
export class UpdateContactQueryInput {
  @Field(() => String)
  //   _id: MongooseSchema.Types.ObjectId;
  _id: string;
}

@InputType()
export class UpdateContactSetInput {
  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly phone?: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly picture?: string;

  @Field(() => JSON, { nullable: true })
  readonly info?: any;
}

@InputType()
export class UpdateContactInput {
  @Field(() => UpdateContactQueryInput)
  query: UpdateContactQueryInput;

  @Field(() => UpdateContactSetInput)
  set: UpdateContactSetInput;
}
