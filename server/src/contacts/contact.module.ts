import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { ContactSchema } from './contact.model';
import { AddressSchema } from 'src/address/address.model';
import { AddressService } from 'src/address/address.service';
import { AddressLoader } from 'src/address/addressDataLoader';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contact', schema: ContactSchema },
      { name: 'Address', schema: AddressSchema },
    ]),
  ],
  providers: [ContactResolver, ContactService, AddressService, AddressLoader],
})
export class ContactModule {}
