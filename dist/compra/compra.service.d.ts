import { Repository } from 'typeorm';
import { Compra } from "./compra.model";
export declare class CompraService {
    private readonly purchaseRepository;
    constructor(purchaseRepository: Repository<Compra>);
    migrarDatosCompra(data: any[]): Promise<void>;
    findAll(): Promise<Compra[]>;
    findOne(id: number): Promise<Compra>;
    create(purchase: Compra): Promise<Compra>;
    update(id: number, purchase: Compra): Promise<Compra>;
    remove(id: number): Promise<void>;
}
