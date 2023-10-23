import {Entity, model, property} from '@loopback/repository';

@model()
export class Addresses extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  postcode: string;

  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
    required: true,
  })
  number: string;


  constructor(data?: Partial<Addresses>) {
    super(data);
  }
}

export interface AddressesRelations {
  // describe navigational properties here
}

export type AddressesWithRelations = Addresses & AddressesRelations;
