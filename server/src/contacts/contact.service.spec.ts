import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model, ObjectId, Query, Types } from 'mongoose';
import { createMock } from '@golevelup/nestjs-testing';

import { Contact, ContactDocument, ContactSchema } from './contact.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/mongooseTestModule';
import {
  Address,
  AddressDocument,
  AddressSchema,
} from '../address/address.model';
import { AddressService } from '../address/address.service';

const mockContactArray = [
  {
    _id: '618269512bffd91568cb95db',
    name: 'test',
    phone: '1234',
    email: 'test@g.com',
    picture: '',
    info: { age: 24, area: 'test area' },
    address: '618269512bffd91568cb95dc',
  },
  {
    _id: '618269512bffd91568cb95de',
    name: 'test2',
    phone: '12345',
    email: 'test2@g.com',
    picture: '',
    info: { age: 24, area: 'test area' },
    address: '618269512bffd91568cb95dc',
  },
];

const mockAddress = {
  _id: '618269512bffd91568cb95dc',
  location: 'Chennai',
};

describe('ContactService', () => {
  let service: ContactService;
  //   let model: Model<ContactDocument>;

  let addedContact: Contact;

  let addressService: AddressService;
  let addedAddress: Address;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Contact', schema: ContactSchema },
          { name: 'Address', schema: AddressSchema },
        ]),
      ],
      providers: [ContactService, AddressService],
    }).compile();

    service = module.get<ContactService>(ContactService);
    addressService = module.get<AddressService>(AddressService);

    // model = module.get<Model<ContactDocument>>(getModelToken('Contact'));

    addedContact = await service.create(mockContactArray[0]);
    await service.create(mockContactArray[1]);
    // console.log(addedContact);

    addedAddress = await addressService.create(mockAddress);
    // console.log(addedAddress);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    // jest.clearAllMocks();
    await closeInMongodConnection();
  });

  it('should add contact', async () => {
    const contactToCreate = {
      name: 'test',
      phone: '1234',
      email: 'test@g.com',
      picture: '',
      info: { age: 24, area: 'test area' },
      address: '618269512bffd91568cb95dc',
    };
    const contact = await service.create(contactToCreate);
    // console.log('contact.address:::', contact.address);
    // console.log('addedAddress:::', addedAddress._id);

    expect(contact._id).toBeDefined();
    expect(contact.address._id).toStrictEqual(addedAddress._id);
  });

  // fetch contact by id
  it('should fetch contact by id', async () => {
    const contact = await service.findOneById(mockContactArray[0]._id);
    // console.log('contact', contact);

    expect(contact.name).toBe('test');
    expect(contact.email).toBe('test@g.com');
  });

  //   fetch contacts by ids
  it('should fetch contacts by ids []', async () => {
    const contacts = await service.findAll();
    // console.log('contacts []', contacts);

    expect(contacts.length).toBe(2);
    expect(contacts[0].name).toBe('test');
    expect(contacts[1].name).toBe('test2');
  });

  // fetch contact by address id
  it('should fetch contact by id', async () => {
    const contacts = await service.findOneByAddressId(addedAddress._id);
    // console.log('contacts', contacts);

    // expect(contacts.length).toBe(2);
    expect(contacts[0].name).toBe('test');
    expect(contacts[0].email).toBe('test@g.com');
  });

  //   update contact
  it('should update contact', async () => {
    const contact = await service.updateContact({
      query: { _id: addedContact._id },
      set: { name: 'testUpdated', email: 'testUpdated@g.com' },
    });
    // console.log('updated contact', contact);

    expect(contact.name).toBe('testUpdated');
    expect(contact.email).toBe('testUpdated@g.com');
  });

  //   delete contact
  it('should delete contact', async () => {
    const deleteResponse = await service.delete(addedContact._id);
    // console.log('deleted contact', deleteResponse);

    expect(deleteResponse).toBe('Contact deleted successfully');

    const deleteResponse2 = await service.delete('618269512bffd91568cb95da');
    expect(deleteResponse2).toBe('Contact not found or error deleting');
  });
});
