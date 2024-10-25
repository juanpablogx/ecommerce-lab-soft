import { ImageProduct } from './image-product.interface'

export interface Product {
  id_producto: number
  nombre_producto: string
  descripcion_producto: string
  categoria: string
  precio: number
  imagenes: ImageProduct[]
}
