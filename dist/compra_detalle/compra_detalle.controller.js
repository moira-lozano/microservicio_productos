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
exports.CompraDetalleController = void 0;
const common_1 = require("@nestjs/common");
const compra_detalle_service_1 = require("./compra_detalle.service");
const compra_detalle_model_1 = require("./compra_detalle.model");
let CompraDetalleController = class CompraDetalleController {
    constructor(compraDetalleService) {
        this.compraDetalleService = compraDetalleService;
    }
    async findAll() {
        return this.compraDetalleService.findAll();
    }
    async findOne(id) {
        const compras_por_id = await this.compraDetalleService.findOne(id);
        if (!compras_por_id) {
            throw new common_1.NotFoundException("Purchase details does not exist");
        }
        return compras_por_id;
    }
    async create(purchase) {
        return this.compraDetalleService.create(purchase);
    }
    async update(id, purchase) {
        return this.compraDetalleService.update(id, purchase);
    }
    async remove(id) {
        try {
            return await this.compraDetalleService.remove(id);
        }
        catch (error) {
            throw new common_1.NotFoundException("Purchase details does not exist");
        }
    }
};
exports.CompraDetalleController = CompraDetalleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompraDetalleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompraDetalleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compra_detalle_model_1.CompraDetalle]),
    __metadata("design:returntype", Promise)
], CompraDetalleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, compra_detalle_model_1.CompraDetalle]),
    __metadata("design:returntype", Promise)
], CompraDetalleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompraDetalleController.prototype, "remove", null);
exports.CompraDetalleController = CompraDetalleController = __decorate([
    (0, common_1.Controller)('compra-detalle'),
    __metadata("design:paramtypes", [compra_detalle_service_1.CompraDetalleService])
], CompraDetalleController);
//# sourceMappingURL=compra_detalle.controller.js.map