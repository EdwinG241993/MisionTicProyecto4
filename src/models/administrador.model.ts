import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Administrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idAdministrador?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElec: string;

  @property({
    type: 'string',
    required: true,
  })
  telFijo: string;

  @property({
    type: 'string',
    required: true,
  })
  telMovil: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
    required: false,
  })
  rol: "Administrador";

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
