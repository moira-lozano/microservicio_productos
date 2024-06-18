import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.model';
import { ProductController } from "./products/product.controller";
import { ProductService } from "./products/product.service";
import { ProductModule } from "./products/product.module";
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found.exception';
import { PurchaseModule } from './purchases/purchase.module';
import { PurchaseController } from './purchases/purchase.controller';
import { PurchaseService } from './purchases/purchase.service';
import { Purchase } from "./purchases/purchase.model";
import { PurchaseDetailModule } from './purchase_details/purchase_details.module';
import { PurchaseDetail } from "./purchase_details/purchase_detail.model";
import { PurchaseDetailService } from "./purchase_details/purchase_detail.service";
import { PurchaseDetailController } from "./purchase_details/purchase_detail.controller";
import { Promotion } from "./promotions/promotion.model";
import { PromotionModule } from './promotions/promotion.module';
import { PromotionService } from './promotions/promotion.service';
import { PromotionController } from "./promotions/promotion.controller";
import { ProductProm } from "./product_proms/product_prom.model";
import { ProductPromModule } from './product_proms/product_prom.module';
import { ProductPromService } from "./product_proms/product_prom.service";
import { ProductPromController } from "./product_proms/product_prom.controller";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ColorsModule } from './colors/colors.module';
import { SizeModule } from './size/size.module';
import { BrandModule } from './brand/brand.module';
import { ModelsController } from './models/models.controller';
import { ModelsService } from './models/models.service';
import { ModelsModule } from './models/models.module';
import { Color } from './colors/colors.model';
import { Brand } from './brand/brand.model';
import { Size } from './size/size.model';
import { Model } from './models/models.model';
import { AwsModule } from './aws/aws.module';
import { AwsController } from './aws/aws.controller';
import { AwsService } from './aws/aws.service';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';

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
        entities: [Product, Purchase, PurchaseDetail, Promotion, ProductProm, Color, Brand, Size, Model],
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
    TypeOrmModule.forFeature([Product, Purchase, PurchaseDetail, Promotion, ProductProm, Color, Brand, Size, Model]),
    ProductModule,
    PurchaseModule,
    PurchaseDetailModule,
    PromotionModule,
    ProductPromModule,
    ColorsModule,
    SizeModule,
    BrandModule,
    ModelsModule,
    AwsModule,
    GoogleCloudModule,
  ],
  controllers: [
    ProductController,
    PurchaseController,
    PurchaseDetailController,
    PromotionController,
    ProductPromController,
    ModelsController,
    AwsController
  ],
  providers: [
    ProductService,
    PurchaseService,
    PurchaseDetailService,
    PromotionService,
    ProductPromService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    ModelsService,
    AwsService
  ],
})
export class AppModule { }
