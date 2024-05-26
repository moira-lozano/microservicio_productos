import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import { AppService } from './app.service'; */
import { Producto } from './producto/producto.model';
import { MigracionController } from './migracion/migracion.controller';
import { MigracionService } from './migracion/migracion.service';

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
  ],
  controllers: [MigracionController],
  providers: [MigracionService],
})
export class AppModule { }
