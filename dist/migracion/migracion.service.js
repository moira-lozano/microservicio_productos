"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigracionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_model_1 = require("../producto/producto.model");
let MigracionService = class MigracionService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async migrarDatos(data) {
        if (!Array.isArray(data)) {
            throw new Error('Los datos deben ser un array');
        }
        for (const item of data) {
            const producto = new producto_model_1.Producto();
            producto.code = item.code;
            producto.name = item.name;
            producto.description = item.description;
            producto.price = item.price;
            producto.stock = item.stock;
            producto.image = item.image;
            producto.brand_id = item.brand_id;
            producto.size_id = item.size_id;
            producto.color_id = item.color_id;
            producto.model_id = item.model_id;
            await this.productoRepository.save(producto);
        }
    }
};
exports.MigracionService = MigracionService;
exports.MigracionService = MigracionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_model_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MigracionService);
//# sourceMappingURL=migracion.service.js.map