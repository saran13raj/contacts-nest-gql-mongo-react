import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contacts/contact.module';

@Module({
  imports: [
    ContactModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/contacts'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
