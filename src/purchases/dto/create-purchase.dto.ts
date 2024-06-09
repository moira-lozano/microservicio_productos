import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseDetailDto } from './create-purchase-detail.dto';

export class CreatePurchaseDto {
    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsString()
    @IsNotEmpty()
    supplier_id: number;

    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseDetailDto)
    details: CreatePurchaseDetailDto[];
}
