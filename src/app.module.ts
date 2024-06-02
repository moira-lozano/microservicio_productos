import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.model';
import { ProductoController } from "./producto/producto.controller";
import { ProductoService } from "./producto/producto.service";
import { ProductoModule } from "./producto/producto.module";
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found.exception';
import { CompraModule } from './compra/compra.module';
import { CompraController } from './compra/compra.controller';
import { CompraService } from './compra/compra.service';
import { Compra } from "./compra/compra.model";
import { CompraDetalleModule } from './compra_detalle/compra_detalle.module';
import { CompraDetalle } from "./compra_detalle/compra_detalle.model";
import { CompraDetalleService } from "./compra_detalle/compra_detalle.service";
import { CompraDetalleController } from "./compra_detalle/compra_detalle.controller";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Producto, Compra, CompraDetalle],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Producto, Compra, CompraDetalle]),
    ProductoModule,
    CompraModule,
    CompraDetalleModule,
  ],
  controllers: [
    ProductoController,
    CompraController,
    CompraDetalleController,
  ],
  providers: [
    ProductoService,
    CompraService,
    CompraDetalleService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule { }
