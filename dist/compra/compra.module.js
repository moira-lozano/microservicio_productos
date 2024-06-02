"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraModule = void 0;
const common_1 = require("@nestjs/common");
const compra_model_1 = require("./compra.model");
const compra_service_1 = require("./compra.service");
const compra_controller_1 = require("./compra.controller");
const typeorm_1 = require("@nestjs/typeorm");
let CompraModule = class CompraModule {
};
exports.CompraModule = CompraModule;
exports.CompraModule = CompraModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([compra_model_1.Compra])
        ],
        providers: [compra_service_1.CompraService],
        controllers: [compra_controller_1.CompraController]
    })
], CompraModule);
//# sourceMappingURL=compra.module.js.map