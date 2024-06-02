import { Repository } from 'typeorm';
import { CompraDetalle } from "./compra_detalle.model";
export declare class CompraDetalleService {
    private readonly purchaseDetailsRepository;
    constructor(purchaseDetailsRepository: Repository<CompraDetalle>);
    migrarDatosCompra(data: any[]): Promise<void>;
    findAll(): Promise<CompraDetalle[]>;
    findOne(id: number): Promise<CompraDetalle>;
    create(purchase: CompraDetalle): Promise<CompraDetalle>;
    update(id: number, purchase: CompraDetalle): Promise<CompraDetalle>;
    remove(id: number): Promise<void>;
}
