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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/src/**/*.entity{.ts,.js}'],
        logging: true,
        autoLoadEntities: true,
        synchronize: true,
        cache: false,
        ssl: {
          rejectUnauthorized: false,
        }, 
      }),
      inject: [ConfigService],
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
