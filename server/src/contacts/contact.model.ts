import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
@Schema()
export class Contact {
  @Field(() => String)
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
}

export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass(Contact);
