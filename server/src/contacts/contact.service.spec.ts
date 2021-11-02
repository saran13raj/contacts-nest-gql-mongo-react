import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, ObjectId, Query, Types } from 'mongoose';
import { createMock } from '@golevelup/nestjs-testing';

import { Contact, ContactDocument, ContactSchema } from './contact.model';

// const objId = new Types.ObjectId();

// console.log(objId);

const mockContact = (
  _id = '617f6c218c64fa6edcafb1f1',
  name = 'test',
  phone = '+911111111111',
  email = 'test1@g.com',
  picture = 'pic1',
  info = {
    age: 24,
    area: 'test area',
  },
): Contact => ({ _id, name, phone, email, picture, info });

const mockContactDoc = (mock?: Partial<Contact>): Partial<ContactDocument> => ({
  _id: mock?._id || '617f6c218c64fa6edcafb1f1',
  name: mock?.name || 'test',
  phone: mock?.phone || '+911111111111',
  picture: mock?.picture || 'pic1',
  email: mock?.email || 'test1@g.com',
  info: mock?.info || {
    age: 24,
    area: 'test area',
  },
});

const mockContactArray = [
  mockContact(),
  mockContact(
    '617f6c218c64fa6edcafb1f2',
    'Test Contact2',
    '+912222222222',
    'test2@g.com',
    'pic2',
  ),
  mockContact(
    '617f6c218c64fa6edcafb1f3',
    'Test Contact3',
    '+913333333333',
    'test3@g.com',
    'pic3',
  ),
];

const mockContactDocArray = [
  mockContactDoc(),
  mockContactDoc({
    _id: '617f6c218c64fa6edcafb1f2',
    name: 'Test Contact2',
    phone: '+912222222222',
    email: 'test2@g.com',
    picture: 'pic2',
  }),
  mockContactDoc({
    _id: '617f6c218c64fa6edcafb1f3',
    name: 'Test Contact3',
    phone: '+913333333333',
    email: 'test3@g.com',
    picture: 'pic3',
  }),
];

describe('ContactService', () => {
  let service: ContactService;
  let model: Model<ContactDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getModelToken('Contact'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockContact()),
            constructor: jest.fn().mockResolvedValue(mockContact()),
            find: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    model = module.get<Model<ContactDocument>>(getModelToken('Contact'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // In all the spy methods/mock methods we need to make sure to
  // add in the property function exec and tell it what to return
  // this way all of our mongo functions can and will be called
  // properly allowing for us to successfully test them.
  it('should return all contacts', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockContactDocArray),
    } as any);
    const contacts = await service.findAll();
    // console.log('all contacts:::', contacts, '\n', mockContactArray);
    expect(contacts).toEqual(mockContactArray);
  });

  //   it('should find one by id', async () => {
  //     jest.spyOn(model, 'findById').mockReturnValueOnce(
  //       createMock<Query<ContactDocument, ContactDocument>>({
  //         exec: jest.fn().mockResolvedValueOnce(
  //           mockContactDoc({
  //             _id: 'uuid1',
  //             name: 'mockContact',
  //             phone: '+910000000000',
  //             email: 'mock@g.com',
  //             picture: 'pic0',
  //             info: {
  //               age: 24,
  //               area: 'test area',
  //             },
  //           }),
  //         ),
  //       }),
  //     );

  //     const findMockContact = mockContact(
  //       'uuid1',
  //       'mockContact',
  //       '+910000000000',
  //       'mock@g.com',
  //       'pic0',
  //     );
  //     const foundContact = await service.findOneById('uuid1');
  //     console.log('findOneById:::', foundContact, '\n', findMockContact);
  //     expect(foundContact).toEqual(findMockContact);
  //   });

  it('should insert new contact', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: '617f6c218c64fa6edcafb1f1',
        name: 'test',
        phone: '+911111111111',
        email: 'test1@g.com',
        picture: 'pic1',
        info: {
          age: 24,
          area: 'test area',
        },
      }),
    );
    const newContact = await service.create({
      name: 'test',
      phone: '+911111111111',
      email: 'test1@g.com',
      picture: 'pic1',
      info: {
        age: 24,
        area: 'test area',
      },
    });
    expect(newContact).toEqual(mockContact());
  });

  //   it('should update a contact', async () => {
  //     jest.spyOn(model, 'update').mockReturnValueOnce(() =>
  //       createMock<Query<ContactDocument, ContactDocument>>({
  //         exec: jest.fn().mockResolvedValueOnce({
  //           _id: 'uuid1',
  //           name: 'mockContact',
  //           phone: '+910000000000',
  //           email: 'mock@g.com',
  //           picture: 'pic0',
  //           info: {
  //             age: 24,
  //             area: 'test area',
  //           },
  //         }),
  //       }),
  //     );
  //     const newContact = await service.updateContact({
  //       query: {
  //         _id: 'uuid1',
  //       },
  //       set: {
  //         info: {
  //           age: 24,
  //           place: 'Chennai',
  //           market: 'android',
  //         },
  //       },
  //     });
  //     expect(newContact).toEqual(mockContact());
  //   });
});
