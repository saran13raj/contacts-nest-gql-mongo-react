import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  location: string;
}
