import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

// import { Contact } from './contact.interface';
import { ContactInput, UpdateContactInput } from './contact.input';
import { Contact, ContactDocument } from './contact.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContact: ContactInput): Promise<Contact> {
    Logger.log('Create new contact', 'Service');
    // createContact.info = JSON.parse(createContact.info);
    const createdContact = new this.contactModel(createContact);
    return await createdContact.save();
  }

  async findAll(): Promise<Contact[]> {
    Logger.log('find all contacts', 'Service');
    const contacts = await this.contactModel.find().exec();
    // console.log(contacts);
    return contacts;
  }

  async findOneById(_id: string): Promise<Contact> {
    Logger.log('find one contact', 'Service');
    return await this.contactModel.findById(_id);
  }

  async updateContact(data: UpdateContactInput): Promise<Contact> {
    Logger.log('update one contact', 'Service');
    return await this.contactModel
      .findByIdAndUpdate(data.query._id, data.set, { new: true })
      .exec();
  }

  async delete(_id: string): Promise<any> {
    Logger.log('delete one contact', 'Service');
    const result = await this.contactModel.deleteOne({ _id });
    if (result.deletedCount >= 1) {
      return 'Contact deleted successfully';
    }
    return 'Contact not found or error deleting';
  }
}
