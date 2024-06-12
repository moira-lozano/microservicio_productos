import { Module } from '@nestjs/common';
import { GoogleCloudService } from './google-cloud.service';
import { GoogleCloudController } from './google-cloud.controller';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [GoogleCloudController],
  providers: [GoogleCloudService],
  exports: [GoogleCloudService]
})
export class GoogleCloudModule {}
