import { MigracionService } from './migracion.service';
export declare class MigracionController {
    private readonly migracionService;
    constructor(migracionService: MigracionService);
    migrarDatos(data: any[]): Promise<void>;
}
