import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.model';
import { MigracionController } from './migracion/migracion.controller';
import { MigracionService } from './migracion/migracion.service';
import { ProductoController } from "./producto/producto.controller";
import { ProductoService } from "./producto/producto.service";
import { ProductoModule } from "./producto/producto.module";
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found.exception';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432, 
      username: 'postgres', 
      password: 'moira123', 
      database: 'db_microservicio', 
      entities: [Producto], // Importa tu modelo Producto aquí
      synchronize: true, // Esto sincronizará tus modelos con la base de datos, útil en entornos de desarrollo, pero no recomendado para producción
    }),
    TypeOrmModule.forFeature([Producto]), // Asegúrate de importar tu modelo Producto aquí también
    ProductoModule,
  ],
  controllers: [MigracionController, ProductoController],
  providers: [
    MigracionService,
    ProductoService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule { }
