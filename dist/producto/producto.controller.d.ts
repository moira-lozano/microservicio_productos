import { ProductoService } from "./producto.service";
import { Producto } from './producto.model';
export declare class ProductoController {
    private productosService;
    constructor(productosService: ProductoService);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(product: Producto): Promise<Producto>;
    update(id: number, product: Producto): Promise<Producto>;
    remove(id: number): Promise<void>;
}
