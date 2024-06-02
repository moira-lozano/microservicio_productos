import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from "@nestjs/swagger";
import * as dotenv from 'dotenv'; // Importa dotenv

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno desde el archivo .env
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
