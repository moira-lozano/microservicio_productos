import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ProductService } from 'src/products/product.service';
import { CompareFacesCommand, CompareFacesCommandInput, RekognitionClient } from '@aws-sdk/client-rekognition';
import * as urlParse from 'url-parse';

@Injectable()
export class AwsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly productService: ProductService
  ) { }

  async uploadImageToS3(photoBuffer: Buffer, name: string = 'default') {

    const s3Bucket = this.configService.get('S3_BUCKET_NAME');

    // Step 1: Connects to AWS S3 service
    const s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    // Step 2: Create an S3 object with the user's image
    const s3Object = await s3Client.send(
      new PutObjectCommand({
        Bucket: s3Bucket,
        Key: `${name}.jpeg`,
        Body: photoBuffer,
        ContentType: 'image/jpeg',
      }),
    );

    const s3ObjectUrl = `https://${s3Bucket}.s3.amazonaws.com/${name}.jpeg`;

    return {
      photoUrl: s3ObjectUrl,
    };
  }

  async compareImages(sourceKey: string, targetKey: string): Promise<number | null> {
    // Connects to AWS Rekognition service
    const rekognitionClient = new RekognitionClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  
    const sourceImage = {
      S3Object: {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Name: decodeURIComponent(this.extractFileNameFromUrl(sourceKey)),
      },
    };
  
    const targetImage = {
      S3Object: {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Name: decodeURIComponent(this.extractFileNameFromUrl(targetKey)),
      },
    };
  
    console.log('Source Image:', JSON.stringify(sourceImage, null, 2));
    console.log('Target Image:', JSON.stringify(targetImage, null, 2));
  
    const commandInput: CompareFacesCommandInput = {
      SourceImage: sourceImage,
      TargetImage: targetImage,
      SimilarityThreshold: 0,
    };
  
    console.log('Command Input:', JSON.stringify(commandInput, null, 2));
  
    const command = new CompareFacesCommand(commandInput);
  
    try {
      const response = await rekognitionClient.send(command);
      console.log('Rekognition Response:', JSON.stringify(response, null, 2));
      if (response.FaceMatches && response.FaceMatches.length > 0) {
        return response.FaceMatches[0].Similarity;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error comparing images:', error);
      return null;
    }
  }
  
  async compareImageWithProductList(
    sourceKey: string,
  ): Promise<{ targetKey: string; similarity: number | null }[]> {
    // Obtén las claves de las imágenes de los productos
    const productKeys = await this.productService.getProductImageKeys();

    const comparisons = [];
    for (const targetKey of productKeys) {
      const similarity = await this.compareImages(sourceKey, targetKey);
      comparisons.push({ targetKey, similarity });
    }

    return comparisons.filter(comparison => comparison.similarity !== null);
  }

  extractFileNameFromUrl(url: string): string {
    console.log('url s3', url)
    const parsedUrl = urlParse(url);
    const pathname = parsedUrl.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
    return fileName;
  }
}
