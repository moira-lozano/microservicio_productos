import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GoogleCloudService } from './google-cloud.service';
import { ProductService } from 'src/products/product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('google-cloud')
@Controller('google-cloud')
export class GoogleCloudController {
  constructor(private readonly googleCloudService: GoogleCloudService, private readonly productService: ProductService) { }

  @Post()
  async uploadImage(@Body('image') base64Image: string) {
    if (!base64Image) {
      throw new BadRequestException('Image is required');
    }

    const labels = await this.googleCloudService.processImage(base64Image);
    const similarProducts = await this.productService.findProductsByLabels(labels);

    return similarProducts;
  }
}
