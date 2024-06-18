import { PartialType } from '@nestjs/swagger';
import { CreateGoogleCloudDto } from './create-google-cloud.dto';

export class UpdateGoogleCloudDto extends PartialType(CreateGoogleCloudDto) {}
