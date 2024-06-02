import { Repository } from 'typeorm';
import { Producto } from 'src/producto/producto.model';
export declare class MigracionService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    migrarDatos(data: any[]): Promise<void>;
}
