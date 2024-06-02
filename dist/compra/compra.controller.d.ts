import { CompraService } from "./compra.service";
import { Compra } from "./compra.model";
export declare class CompraController {
    private compraService;
    constructor(compraService: CompraService);
    findAll(): Promise<Compra[]>;
    findOne(id: number): Promise<Compra>;
    create(purchase: Compra): Promise<Compra>;
    update(id: number, purchase: Compra): Promise<Compra>;
    remove(id: number): Promise<void>;
}
