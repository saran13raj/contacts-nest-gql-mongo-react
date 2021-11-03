import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { ContactSchema } from '../contacts/contact.model';
import { AddressDocument, AddressSchema } from './address.model';
import { AddressService } from './address.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/mongooseTestModule';

const mockAddressArray = [
  {
    _id: '618269512bffd91568cb95dc',
    location: 'Chennai',
  },
  {
    _id: '618269512bffd91568cb95df',
    location: 'Mumbai',
  },
  {
    _id: '618269512bffd91568cb95e1',
    location: 'Delhi',
  },
];

describe('AddressService', () => {
  let service: AddressService;
  //   let model: Model<AddressDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Contact', schema: ContactSchema },
          { name: 'Address', schema: AddressSchema },
        ]),
      ],
      providers: [AddressService],
    }).compile();

    service = module.get<AddressService>(AddressService);
    // model = module.get<Model<AddressDocument>>(getModelToken('Contact'));

    await service.create(mockAddressArray[0]);
    await service.create(mockAddressArray[1]);
    await service.create(mockAddressArray[2]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    // jest.clearAllMocks();
    await closeInMongodConnection();
  });

  it('should add address', async () => {
    const addressToCreate = {
      location: 'Chennai',
    };
    const address = await service.create(addressToCreate);
    // console.log('address', address);

    expect(address._id).toBeDefined();
    expect(address.location).toBe(addressToCreate.location);
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it('should add address,but the field does not defined in schema should be undefined', async () => {
    const addressToCreate = {
      location: 'Chennai',
      country: 'India',
    };
    const address = await service.create(addressToCreate);
    // console.log('address', address);

    expect(address._id).toBeDefined();
    expect(address.hasOwnProperty('country')).toBeFalsy();
  });

  // fetch all address
  it('should add address,but the field does not defined in schema should be undefined', async () => {
    const addresses = await service.findAll();
    // console.log('address[]', addresses);

    expect(addresses.length).toBe(3);
    expect(addresses[0].location).toBe('Chennai');
    expect(addresses[1].location).toBe('Mumbai');
    expect(addresses[2].location).toBe('Delhi');
  });

  //   fetch address by id
  it('should fetch address by id', async () => {
    const address = await service.findOneById(mockAddressArray[0]._id);
    // console.log('address', address);

    expect(address.location).toBe('Chennai');
  });

  //   fetch addresses by ids
  it('should fetch addresses by ids []', async () => {
    const addresses = await service.findByIds([
      mockAddressArray[1]._id,
      mockAddressArray[2]._id,
    ]);
    // console.log('addresses []', addresses);

    expect(addresses.length).toBe(2);
    expect(addresses[0].location).toBe('Mumbai');
    expect(addresses[1].location).toBe('Delhi');
  });
});
