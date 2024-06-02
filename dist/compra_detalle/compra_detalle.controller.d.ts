import { CompraDetalleService } from "./compra_detalle.service";
import { CompraDetalle } from "./compra_detalle.model";
export declare class CompraDetalleController {
    private compraDetalleService;
    constructor(compraDetalleService: CompraDetalleService);
    findAll(): Promise<CompraDetalle[]>;
    findOne(id: number): Promise<CompraDetalle>;
    create(purchase: CompraDetalle): Promise<CompraDetalle>;
    update(id: number, purchase: CompraDetalle): Promise<CompraDetalle>;
    remove(id: number): Promise<void>;
}
