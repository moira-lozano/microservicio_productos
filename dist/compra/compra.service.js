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
exports.CompraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const compra_model_1 = require("./compra.model");
let CompraService = class CompraService {
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async migrarDatosCompra(data) {
        if (!Array.isArray(data)) {
            throw new Error('Los datos deben ser un array');
        }
        for (const item of data) {
            const compra = new compra_model_1.Compra();
            compra.date = item.date;
            compra.total = item.total;
            compra.supplier_id = item.supplier_id;
            await this.purchaseRepository.save(compra);
        }
    }
    async findAll() {
        return await this.purchaseRepository.find();
    }
    async findOne(id) {
        return await this.purchaseRepository.findOne({ where: { id } });
    }
    async create(purchase) {
        return await this.purchaseRepository.save(purchase);
    }
    async update(id, purchase) {
        await this.purchaseRepository.update(id, purchase);
        return this.purchaseRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.purchaseRepository.delete(id);
    }
};
exports.CompraService = CompraService;
exports.CompraService = CompraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compra_model_1.Compra)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompraService);
//# sourceMappingURL=compra.service.js.map