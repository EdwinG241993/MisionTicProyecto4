import {Entity, model, property, hasMany} from '@loopback/repository';
import {Venta} from './venta.model';

@model({settings: {strict: false}})
export class Vendedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVendedor?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPat: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMat: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoMovil: string;

  @property({
    type: 'string',
  })
  ventaId?: string;

  @hasMany(() => Venta)
  ventas: Venta[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
