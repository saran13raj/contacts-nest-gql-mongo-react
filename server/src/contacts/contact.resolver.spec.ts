import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/mongooseTestModule';
import { ContactSchema } from './contact.model';
import { ContactResolver } from './contact.resolver';
import { Address, AddressSchema } from '../address/address.model';
import { ContactService } from './contact.service';
import { AddressLoader } from '../address/addressDataLoader';
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

describe('ContactResolver', () => {
  let contactResolver: ContactResolver;
  let contactService: ContactService;
  let addressLoader: AddressLoader;
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
      providers: [
        ContactResolver,
        ContactService,
        AddressLoader,
        AddressService,
      ],
    }).compile();

    contactResolver = module.get<ContactResolver>(ContactResolver);
    // contactService = module.get<ContactService>(ContactService);
    addressService = module.get<AddressService>(AddressService);
    // addressLoader = module.resolve<AddressLoader>(AddressLoader);

    addedAddress = await addressService.create(mockAddress);
    // console.log(addedAddress);
  });

  it('should be defined', () => {
    expect(contactResolver).toBeDefined();
  });

  afterEach(async () => {
    // jest.clearAllMocks();
    await closeInMongodConnection();
  });

  //   it('should add a contact', async () => {
  //     const contact = await contactResolver.createContact(mockContactArray[0]);
  //     console.log('added contact', contact);

  //     expect(contact._id).toBeDefined();
  //     expect(mongoose.isValidObjectId(contact._id)).toBeTruthy();
  //     expect(contact.name).toBe(mockContactArray[0].name);
  //   });
});
