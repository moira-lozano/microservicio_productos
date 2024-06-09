import { IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePurchaseDetailDto {
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsInt()
    @IsNotEmpty()
    product_id: number;
}
