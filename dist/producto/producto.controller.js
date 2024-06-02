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
exports.ProductoController = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("./producto.service");
const producto_model_1 = require("./producto.model");
let ProductoController = class ProductoController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    async findAll() {
        return this.productosService.findAll();
    }
    async findOne(id) {
        const productos_por_id = await this.productosService.findOne(id);
        if (!productos_por_id) {
            throw new common_1.NotFoundException("The product does not exist");
        }
        return productos_por_id;
    }
    async create(product) {
        return this.productosService.create(product);
    }
    async update(id, product) {
        return this.productosService.update(id, product);
    }
    async remove(id) {
        try {
            return await this.productosService.remove(id);
        }
        catch (error) {
            throw new common_1.NotFoundException("The product does not exist");
        }
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Get)('/ver'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [producto_model_1.Producto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, producto_model_1.Producto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "remove", null);
exports.ProductoController = ProductoController = __decorate([
    (0, common_1.Controller)('producto'),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map