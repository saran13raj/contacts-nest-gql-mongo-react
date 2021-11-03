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
import { AddressSchema } from '../address/address.model';

const mockContact = {
  name: 'test',
  phone: '1234',
  email: 'test@g.com',
  picture: '',
  info: { age: 24, area: 'test area' },
  address: {
    _id: 'addr1',
    location: 'Chennai',
  },
};

describe('ContactService', () => {
  let service: ContactService;
  let model: Model<ContactDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Contact', schema: ContactSchema },
          { name: 'Address', schema: AddressSchema },
        ]),
      ],
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
    model = module.get<Model<ContactDocument>>(getModelToken('Contact'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await closeInMongodConnection();
  });
});
