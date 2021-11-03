import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';

import { ContactSchema } from '../contacts/contact.model';
import { Address, AddressDocument, AddressSchema } from './address.model';
import { AddressService } from './address.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/mongooseTestModule';
import { AddressResolver } from './address.resolver';
import { ContactService } from '../contacts/contact.service';

const mockAddressArray = [
  {
    //   _id: '618269512bffd91568cb95dc',
    location: 'Chennai',
  },
  {
    //   _id: '618269512bffd91568cb95df',
    location: 'Mumbai',
  },
  {
    //   _id: '618269512bffd91568cb95e1',
    location: 'Delhi',
  },
];

let storedAddress = [];
let addedContact;

describe('AddressResolver', () => {
  let addressResolver: AddressResolver;
  let contactService: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Contact', schema: ContactSchema },
          { name: 'Address', schema: AddressSchema },
        ]),
      ],
      providers: [AddressResolver, AddressService, ContactService],
    }).compile();

    addressResolver = module.get<AddressResolver>(AddressResolver);
    contactService = module.get<ContactService>(ContactService);

    const addr1 = await addressResolver.createAddress(mockAddressArray[0]);
    const addr2 = await addressResolver.createAddress(mockAddressArray[1]);
    const addr3 = await addressResolver.createAddress(mockAddressArray[2]);

    storedAddress = [addr1, addr2, addr3];

    await contactService.create({
      name: 'test1',
      phone: '+1234567890',
      email: 'test1.g.com',
      picture: '',
      info: {
        place: 'Chennai',
        sport: 'free dive',
      },
      address: addr1['_id'],
    });
    await contactService.create({
      name: 'test2',
      phone: '+1234567890',
      email: 'test2.g.com',
      picture: '',
      info: {
        place: 'Chennai',
        sport: 'free dive',
      },
      address: addr1['_id'],
    });
    // console.log('contactAdded:::', addedContact);
  });

  it('should be defined', () => {
    expect(addressResolver).toBeDefined();
  });

  afterEach(async () => {
    // jest.clearAllMocks();
    await closeInMongodConnection();
  });

  it('should add an address', async () => {
    const addressToCreate = {
      location: 'Chennai',
    };
    const address = await addressResolver.createAddress(addressToCreate);
    // console.log(address);

    expect(address._id).toBeDefined();
    expect(mongoose.isValidObjectId(address._id)).toBeTruthy();
    expect(address.location).toBe(addressToCreate.location);
  });

  it('should fetch all addressess ', async () => {
    const addresses = await addressResolver.addresses();
    // console.log(addresses);

    expect(addresses.length).toBe(3);
    expect(addresses[0].location).toBe('Chennai');
    expect(addresses[1].location).toBe('Mumbai');
    expect(addresses[2].location).toBe('Delhi');
  });

  it('should fetch contact by address id ', async () => {
    const contacts = await addressResolver.contacts(storedAddress[0]);
    // console.log(contacts);
    // console.log('addr', contacts);

    // console.log('storedAddress:::', storedAddress);

    expect(contacts.length).toBe(2);
    expect(contacts[0].address).toEqual(storedAddress[0]._id);
    expect(contacts[1].address).toEqual(storedAddress[0]._id);
  });
});
