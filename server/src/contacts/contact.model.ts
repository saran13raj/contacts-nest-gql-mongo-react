import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

import { Address } from 'src/address/address.model';

@ObjectType()
@Schema()
export class Contact {
  @Field(() => ID)
  //   _id: MongooseSchema.Types.ObjectId;
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  phone: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  picture: string;

  @Field(() => JSON)
  @Prop({ type: Object })
  info: object;

  @Field(() => Address)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Address' })
  address: Address;
}

export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass(Contact);
