import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from './contact.service';

import { ContactResolver } from './contact.resolver';
import { ContactSchema } from './contact.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
  providers: [ContactResolver, ContactService],
})
export class ContactModule {}
