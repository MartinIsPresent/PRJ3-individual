import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Addresses} from '../models';
import {AddressesRepository} from '../repositories';

export class AddressController {
  constructor(
    @repository(AddressesRepository)
    public addressesRepository : AddressesRepository,
  ) {}

  @post('/addresses')
  @response(200, {
    description: 'Addresses model instance',
    content: {'application/json': {schema: getModelSchemaRef(Addresses)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addresses, {
            title: 'NewAddresses',
            exclude: ['id'],
          }),
        },
      },
    })
    addresses: Omit<Addresses, 'id'>,
  ): Promise<Addresses> {
    return this.addressesRepository.create(addresses);
  }

  @get('/addresses/count')
  @response(200, {
    description: 'Addresses model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Addresses) where?: Where<Addresses>,
  ): Promise<Count> {
    return this.addressesRepository.count(where);
  }

  @get('/addresses')
  @response(200, {
    description: 'Array of Addresses model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Addresses, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Addresses) filter?: Filter<Addresses>,
  ): Promise<Addresses[]> {
    return this.addressesRepository.find(filter);
  }

  @patch('/addresses')
  @response(200, {
    description: 'Addresses PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addresses, {partial: true}),
        },
      },
    })
    addresses: Addresses,
    @param.where(Addresses) where?: Where<Addresses>,
  ): Promise<Count> {
    return this.addressesRepository.updateAll(addresses, where);
  }

  @get('/addresses/{id}')
  @response(200, {
    description: 'Addresses model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Addresses, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Addresses, {exclude: 'where'}) filter?: FilterExcludingWhere<Addresses>
  ): Promise<Addresses> {
    return this.addressesRepository.findById(id, filter);
  }

  @patch('/addresses/{id}')
  @response(204, {
    description: 'Addresses PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addresses, {partial: true}),
        },
      },
    })
    addresses: Addresses,
  ): Promise<void> {
    await this.addressesRepository.updateById(id, addresses);
  }

  @put('/addresses/{id}')
  @response(204, {
    description: 'Addresses PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() addresses: Addresses,
  ): Promise<void> {
    await this.addressesRepository.replaceById(id, addresses);
  }

  @del('/addresses/{id}')
  @response(204, {
    description: 'Addresses DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.addressesRepository.deleteById(id);
  }
}
