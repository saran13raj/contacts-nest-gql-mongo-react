import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

import { AddressInput } from './address.input';
import { Address, AddressDocument } from './address.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Address') private addressModel: Model<AddressDocument>,
  ) {}

  async create(createAddress: AddressInput): Promise<Address> {
    Logger.log('Create new address', 'Service');
    const createdAddress = await this.addressModel.create(createAddress);
    return createdAddress;
  }

  async findAll(): Promise<Address[]> {
    Logger.log('find all address', 'Service');
    const addresses = await this.addressModel.find().exec();
    return addresses;
  }

  async findByIds(ids: string[]): Promise<Address[]> {
    Logger.log('find all address', 'Service');
    const addresses = await this.addressModel
      .find({ _id: { $in: ids } })
      .exec();
    return addresses;
  }

  async findOneById(_id: any): Promise<Address> {
    Logger.log('find one address', 'Service');
    const address = await this.addressModel.findById(_id).lean();
    return address;
  }
}
