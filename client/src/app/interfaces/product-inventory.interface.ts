import { ImageProduct } from './image-product.interface';
import { Product } from './product.interface';

export interface ProductInventory {
  producto: Product
  id_producto_inventario: number
  id_producto: number
  talla_inventario: string
  stock_max: number | null
  stock_min: number | null
  stock: number
  imagenes: ImageProduct[]
}

export interface ProductInventoryAdd {
  id_producto_inventario?: number
  talla_inventario: string
  stock: number
}

export interface ProductInventoryEditResult {
  id_producto_inventario: number
  talla_inventario: string
  stock: number
}
