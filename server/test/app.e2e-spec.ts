import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/mongooseTestModule';
import { Address } from '../src/address/address.model';
import { Contact } from 'src/contacts/contact.model';

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let addedAddress: Address;
  let addedContact: Contact;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation addAddress {
        createAddress(input: {location: "Chennai"}) {
          _id
          location
        }
      }`,
      })
      .then((res) => {
        addedAddress = res.body.data.createAddress;
      });
    // console.log(addedAddress);

    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation addContact {
          createContact(input: {
            name: "test1",
            phone: "1234",
            email: "test1@g.com",
            picture: "",
            info: { age: 24, area: "test area" },
            address: "${addedAddress._id}",
          }) {
            _id
            name
            phone
            email
            picture
            info
              address {
              _id
              location
              }
          }
        }`,
      })
      .then((res) => {
        addedContact = res.body.data.createContact;
      });

    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation addContact {
          createContact(input: {
            name: "test2",
            phone: "1234",
            email: "test2@g.com",
            picture: "",
            info: { age: 24, area: "test area" },
            address: "${addedAddress._id}",
          }) {
            _id
            name
            phone
            email
            picture
            info
              address {
              _id
              location
              }
          }
        }`,
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    // jest.clearAllMocks();
    await closeInMongodConnection();
  });

  //   it('should add address', () => {
  //     return request(app.getHttpServer())
  //       .post(gql)
  //       .send({
  //         query: `mutation addAddress {
  //         createAddress(input: {location: "Chennai"}) {
  //           _id
  //           location
  //         }
  //       }`,
  //       })
  //       .expect(200)
  //       .expect((res) => {
  //         //   console.log(res.body.data.createAddress);
  //         expect(res.body.data.createAddress._id).toBeDefined();
  //         expect(res.body.data.createAddress.location).toEqual('Chennai');
  //       });
  //   });

  it('should add contact', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation addContact {
            createContact(input: {
              name: "test",
              phone: "1234",
              email: "test@g.com",
              picture: "",
              info: { age: 24, area: "test area" },
              address: "${addedAddress._id}",
            }) {
              _id
              name
              phone
              email
              picture
              info
                address {
                _id
                location
                }
            }
          }`,
      })
      .expect(200)
      .expect((res) => {
        //   console.log(res.body.data.createContact);
        expect(res.body.data.createContact._id).toBeDefined();
        expect(res.body.data.createContact).toEqual({
          _id: res.body.data.createContact._id,
          name: 'test',
          phone: '1234',
          email: 'test@g.com',
          picture: '',
          info: { age: 24, area: 'test area' },
          address: {
            _id: addedAddress._id,
            location: 'Chennai',
          },
        });
      });
  });

  it('should fetch all contacts', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
        query fetchContacts {
            contacts {
              _id
              name
              phone
              email
              info
              address {
                _id
                location
              }
            }
          }`,
      })
      .expect(200)
      .expect((res) => {
        // console.log(res.body.data.contacts);
        expect(res.body.data.contacts.length).toEqual(2);
        expect(res.body.data.contacts[0].address.location).toEqual('Chennai');
      });
  });

  it('should update a contact', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
        mutation updateOneContact {
            updateContact(data: 
              {
                query: {_id: "${addedContact._id}"},
                set: {name: "testUpdated"}
              }) {
              _id
              name
               phone
              email
              info
              address {
                _id
                location
              }
            }
          }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateContact._id).toEqual(addedContact._id);
        expect(res.body.data.updateContact.name).toEqual('testUpdated');
      });
  });

  it('should delete a contact', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
        mutation deleteOneContact {
            deleteContact(_id: "${addedContact._id}")
          }`,
      })
      .expect(200)
      .expect((res) => {
        // console.log(res.body.data);
        expect(res.body.data.deleteContact).toEqual(
          'Contact deleted successfully',
        );
      });
  });

  it('should not delete a contact with invalid id', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
        mutation deleteOneContact {
            deleteContact(_id: "618269512bffd91568cb95dc")
          }`,
      })
      .expect(200)
      .expect((res) => {
        // console.log(res.body.data);
        expect(res.body.data.deleteContact).toEqual(
          'Contact not found or error deleting',
        );
      });
  });
});
