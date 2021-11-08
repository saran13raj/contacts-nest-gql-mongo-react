/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { ContactSchema } from './contact.model';
import { AddressSchema } from '../address/address.model';
import { AddressService } from '../address/address.service';
import { AddressLoader } from '../address/addressDataLoader';

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
