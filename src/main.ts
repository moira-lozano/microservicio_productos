import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from "@nestjs/swagger";
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

//import * as dotenv from 'dotenv'; // Importa dotenv

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableCors();

   // Configurar CORS 
/*    const corsOptions: CorsOptions = {
    origin: ['http://dashboard-products.railway.internal', 'http://localhost:3000'], // Añade los dominios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.enableCors(corsOptions); */

  const options = new DocumentBuilder()
    .setTitle('Microservice Product API')
    .setDescription('Microservice Product API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /* app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' })); */

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
