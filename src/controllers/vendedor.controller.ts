import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Vendedor} from '../models';
import {VendedorRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class VendedorController {
  constructor(
    @repository(VendedorRepository)
    public vendedorRepository: VendedorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @authenticate("admin")
  @post('/vendedors')
  @response(200, {
    description: 'Vendedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vendedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {
            title: 'NewVendedor',
            exclude: ['id'],
          }),
        },
      },
    })
    vendedor: Omit<Vendedor, 'id'>,
  ): Promise<Vendedor> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    vendedor.clave = claveCifrada;
    let a = await this.vendedorRepository.create(vendedor);

    //Notificacion al Admin
    let destino = vendedor.correoElec;
    let asunto = "Registro Vendedores";
    let contenido = `Hola ${vendedor.nombres}, ya haces parte de nuestra organizacion su nombre de usuario es: ${vendedor.correoElec}, y su contraseña asignada es: ${clave} tienes el rol de Vendedor`;
    fetch(`${Llaves.urlServicioNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`).then((data: any) => {
      console.log(data);
    })
    return a;
  }

  @get('/vendedors/count')
  @response(200, {
    description: 'Vendedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vendedor) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.count(where);
  }

  @get('/vendedors')
  @response(200, {
    description: 'Array of Vendedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vendedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vendedor) filter?: Filter<Vendedor>,
  ): Promise<Vendedor[]> {
    return this.vendedorRepository.find(filter);
  }

  @patch('/vendedors')
  @response(200, {
    description: 'Vendedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Vendedor,
    @param.where(Vendedor) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.updateAll(vendedor, where);
  }

  @get('/vendedors/{id}')
  @response(200, {
    description: 'Vendedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vendedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendedor, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendedor>
  ): Promise<Vendedor> {
    return this.vendedorRepository.findById(id, filter);
  }

  @patch('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Vendedor,
  ): Promise<void> {
    await this.vendedorRepository.updateById(id, vendedor);
  }

  @put('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendedor: Vendedor,
  ): Promise<void> {
    await this.vendedorRepository.replaceById(id, vendedor);
  }

  @del('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendedorRepository.deleteById(id);
  }
}
