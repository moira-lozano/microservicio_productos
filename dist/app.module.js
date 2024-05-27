"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const producto_model_1 = require("./producto/producto.model");
const migracion_controller_1 = require("./migracion/migracion.controller");
const migracion_service_1 = require("./migracion/migracion.service");
const producto_controller_1 = require("./producto/producto.controller");
const producto_service_1 = require("./producto/producto.service");
const producto_module_1 = require("./producto/producto.module");
const core_1 = require("@nestjs/core");
const not_found_exception_1 = require("./not-found.exception");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'moira123',
                database: 'db_microservicio',
                entities: [producto_model_1.Producto],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([producto_model_1.Producto]),
            producto_module_1.ProductoModule,
        ],
        controllers: [migracion_controller_1.MigracionController, producto_controller_1.ProductoController],
        providers: [
            migracion_service_1.MigracionService,
            producto_service_1.ProductoService,
            {
                provide: core_1.APP_FILTER,
                useClass: not_found_exception_1.NotFoundExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map