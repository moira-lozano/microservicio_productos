import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AWS')
@Controller('aws')
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.awsService.uploadImageToS3(file.buffer);
  }

  @Post('compare-with-products')
  async compareWithProducts(@Body() { sourceKey }: { sourceKey: string }) {
    const similarity = await this.awsService.compareImageWithProductList(sourceKey);
    return { similarity };
  }
}
