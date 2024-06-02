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
exports.CompraDetalleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const compra_detalle_model_1 = require("./compra_detalle.model");
let CompraDetalleService = class CompraDetalleService {
    constructor(purchaseDetailsRepository) {
        this.purchaseDetailsRepository = purchaseDetailsRepository;
    }
    async migrarDatosCompra(data) {
        if (!Array.isArray(data)) {
            throw new Error('Los datos deben ser un array');
        }
        for (const item of data) {
            const compra_detalle = new compra_detalle_model_1.CompraDetalle();
            compra_detalle.quantity = item.quantity;
            compra_detalle.cost = item.cost;
            compra_detalle.total = item.total;
            compra_detalle.purchase_id = item.purchase_id;
            compra_detalle.product_id = item.product_id;
            await this.purchaseDetailsRepository.save(compra_detalle);
        }
    }
    async findAll() {
        return await this.purchaseDetailsRepository.find();
    }
    async findOne(id) {
        return await this.purchaseDetailsRepository.findOne({ where: { id } });
    }
    async create(purchase) {
        return await this.purchaseDetailsRepository.save(purchase);
    }
    async update(id, purchase) {
        await this.purchaseDetailsRepository.update(id, purchase);
        return this.purchaseDetailsRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.purchaseDetailsRepository.delete(id);
    }
};
exports.CompraDetalleService = CompraDetalleService;
exports.CompraDetalleService = CompraDetalleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compra_detalle_model_1.CompraDetalle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompraDetalleService);
//# sourceMappingURL=compra_detalle.service.js.map