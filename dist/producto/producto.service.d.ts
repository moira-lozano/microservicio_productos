import { Repository } from 'typeorm';
import { Producto } from './producto.model';
export declare class ProductoService {
    private readonly productRepository;
    constructor(productRepository: Repository<Producto>);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(product: Producto): Promise<Producto>;
    update(id: number, product: Producto): Promise<Producto>;
    remove(id: number): Promise<void>;
}
