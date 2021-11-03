import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Contact } from 'src/contacts/contact.model';

@ObjectType()
@Schema()
export class Address {
  @Field(() => ID)
  //   _id: MongooseSchema.Types.ObjectId;
  _id: string;

  @Field()
  @Prop()
  location: string;

  @Prop({ type: { type: MongooseSchema.Types.ObjectId, ref: 'Contact' } })
  @Field(() => [Contact])
  contacts: Contact[];
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
