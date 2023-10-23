import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AddressesDataSource} from '../datasources';
import {Addresses, AddressesRelations} from '../models';

export class AddressesRepository extends DefaultCrudRepository<
  Addresses,
  typeof Addresses.prototype.id,
  AddressesRelations
> {
  constructor(
    @inject('datasources.addresses') dataSource: AddressesDataSource,
  ) {
    super(Addresses, dataSource);
  }
}
