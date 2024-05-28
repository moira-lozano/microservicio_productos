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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432, 
      username: 'postgres', 
      password: 'moira123', 
      database: 'db_microservicio', 
      entities: [Producto, Compra], // Importa tu modelo Producto aquí
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto, Compra]), // Asegúrate de importar tu modelo Producto aquí también
    ProductoModule, CompraModule, CompraDetalleModule,
  ],
  controllers: [ProductoController, CompraController],
  providers: [
    ProductoService,
    CompraService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter, //para manejar las excepciones
    },
  ],
})
export class AppModule { }
