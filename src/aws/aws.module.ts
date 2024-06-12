/* import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {} */

// aws/aws.module.ts
import { Module } from '@nestjs/common';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { RekognitionClient, RekognitionClientConfig } from '@aws-sdk/client-rekognition';

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (): S3Client => {
        const config: S3ClientConfig = {
          region: 'us-west-2', // Cambia según tu región
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        };
        return new S3Client(config);
      },
    },
    {
      provide: 'REKOGNITION_CLIENT',
      useFactory: (): RekognitionClient => {
        const config: RekognitionClientConfig = {
          region: 'us-west-2',
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        };
        return new RekognitionClient(config);
      },
    },
  ],
  exports: ['S3_CLIENT', 'REKOGNITION_CLIENT'],
})
export class AwsModule {}

