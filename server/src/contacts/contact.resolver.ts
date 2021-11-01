import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ContactType } from './contact.dto';
import { ContactInput, UpdateContactInput } from './contact.input';
import { ContactService } from './contact.service';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => String)
  async test() {
    return 'test success';
  }

  @Query(() => [ContactType])
  async contacts() {
    return await this.contactService.findAll();
  }

  @Query(() => ContactType)
  async contact(@Args('_id', { type: () => String }) _id: string) {
    return this.contactService.findOneById(_id);
  }

  @Mutation(() => ContactType)
  async createContact(@Args('input') input: ContactInput) {
    return await this.contactService.create(input);
  }

  @Mutation(() => String)
  async deleteContact(@Args('_id', { type: () => String }) _id: string) {
    return await this.contactService.delete(_id);
  }

  @Mutation(() => ContactType)
  async updateContact(@Args('data') data: UpdateContactInput) {
    return await this.contactService.updateContact(data);
  }
}
