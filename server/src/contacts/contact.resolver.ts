import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Contact } from './contact.model';
import { ContactInput, UpdateContactInput } from './contact.input';
import { ContactService } from './contact.service';
import { AddressService } from '../address/address.service';
import { Address } from '../address/address.model';
import { AddressLoader } from '../address/addressDataLoader';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(
    private readonly contactService: ContactService,
    // private readonly addressService: AddressService,
    private readonly addressLoader: AddressLoader,
  ) {}

  @Query(() => String)
  async test() {
    return 'test success';
  }

  @Query(() => [Contact])
  async contacts() {
    return await this.contactService.findAll();
  }

  @Query(() => Contact)
  async contact(@Args('_id', { type: () => String }) _id: string) {
    return this.contactService.findOneById(_id);
  }

  @Mutation(() => Contact)
  async createContact(@Args('input') input: ContactInput) {
    // console.log(input);
    return await this.contactService.create(input);
  }

  @ResolveField(() => Address)
  async address(@Parent() contact: Contact) {
    const addressId = contact.address._id;

    // return this.addressService.findOneById(contact.address);
    return this.addressLoader.batchAddressLoader.load(addressId);
  }

  @Mutation(() => String)
  async deleteContact(@Args('_id', { type: () => String }) _id: string) {
    return await this.contactService.delete(_id);
  }

  @Mutation(() => Contact)
  async updateContact(@Args('data') data: UpdateContactInput) {
    return await this.contactService.updateContact(data);
  }
}
