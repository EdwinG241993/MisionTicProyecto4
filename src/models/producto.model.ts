import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {DetalleVenta} from './detalle-venta.model';
import {ImagenesPdto} from './imagenes-pdto.model';

@model({settings: {strict: false}})
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idProducto?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  existencias: number;

  @property({
    type: 'string',
    required: true,
  })
  disponible: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => DetalleVenta)
  detalleVentaId: string;

  @belongsTo(() => Categoria)
  categoriaId: string;

  @hasMany(() => ImagenesPdto)
  imagenesPdtos: ImagenesPdto[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
