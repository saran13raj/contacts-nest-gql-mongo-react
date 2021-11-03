import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { AddressSchema } from './address.model';
import { ContactSchema } from 'src/contacts/contact.model';
import { ContactService } from 'src/contacts/contact.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Address', schema: AddressSchema },
      { name: 'Contact', schema: ContactSchema },
    ]),
  ],
  providers: [AddressResolver, AddressService, ContactService],
})
export class AddressModule {}
