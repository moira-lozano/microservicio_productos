import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products/products.model';
import { ProductsController } from "./products/products.controller";
import { ProductsService } from "./products/products.service";
import { ProductsModule } from "./products/products.module";
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found.exception';
import { PurchasesModule } from './purchases/purchases.module';
import { PurchasesController } from './purchases/purchases.controller';
import { PurchasesService } from './purchases/purchases.service';
import { Purchases } from "./purchases/purchases.model";
import { PurchaseDetailsModule } from './purchase_details/purchase_details.module';
import { PurchaseDetails } from "./purchase_details/purchase_details.model";
import { PurchaseDetailsService } from "./purchase_details/purchase_details.service";
import { PurchaseDetailsController } from "./purchase_details/purchase_details.controller";
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
        //entities: ['dist/src/**/*.entity{.ts,.js}'],
        entities: [Products, Purchases, PurchaseDetails],
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
    TypeOrmModule.forFeature([Products, Purchases, PurchaseDetails]),
    ProductsModule,
    PurchasesModule,
    PurchaseDetailsModule,
  ],
  controllers: [
    ProductsController,
    PurchasesController,
    PurchaseDetailsController,
  ],
  providers: [
    ProductsService,
    PurchasesService,
    PurchaseDetailsService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule { }
