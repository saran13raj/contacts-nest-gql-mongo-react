import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as DataLoader from 'dataloader';
import { Model } from 'mongoose';

import { Address, AddressDocument } from './address.model';
import { AddressService } from './address.service';

@Injectable({ scope: Scope.REQUEST })
export class AddressLoader {
  constructor(
    // @InjectModel('Address') private addressModel: Model<AddressDocument>,
    private addressService: AddressService,
  ) {}

  //   async batchAddressLoader(addressIds: string[]): Promise<Address[]> {
  //     const addresses = await this.addressModel.find({
  //       _id: { $in: addressIds },
  //     });
  //     const addressMap: { [key: string]: Address } = {};
  //     addresses.forEach((address) => {
  //       addressMap[address._id] = address;
  //     });
  //     return addressIds.map((addressId) => addressMap[addressId]);
  //   }
  public readonly batchAddressLoader = new DataLoader(
    async (addressIds: string[]) => {
      const addresses = await this.addressService.findByIds(addressIds);
      const addressMap: { [key: string]: Address } = {};
      addresses.forEach((address) => {
        addressMap[address._id] = address;
      });
      return addressIds.map((addressId) => addressMap[addressId]);
    },
  );
}
