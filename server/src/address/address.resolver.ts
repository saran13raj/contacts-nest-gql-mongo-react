import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Address } from './address.model';
import { AddressInput } from './address.input';
import { AddressService } from './address.service';
import { ContactService } from '../contacts/contact.service';

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private readonly addressService: AddressService,
    private readonly contactService: ContactService,
  ) {}

  @Query(() => [Address])
  async addresses() {
    return await this.addressService.findAll();
  }

  @ResolveField()
  async contacts(@Parent() parent: Address) {
    return this.contactService.findOneByAddressId(parent._id);
  }

  @Mutation(() => Address)
  async createAddress(@Args('input') input: AddressInput) {
    return await this.addressService.create(input);
  }
}
