import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PurchaseService } from "./purchase.service";
import { Purchase } from "./purchase.model";
import { ApiTags } from '@nestjs/swagger';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@ApiTags('Compra')
@Controller('compra')
export class PurchaseController {
  constructor(private compraService: PurchaseService) { }

  @Get()
  async findAll(): Promise<Purchase[]> {
    return this.compraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Purchase> {
    const compras_por_id = await this.compraService.findOne(id);
    if (!compras_por_id) {
      throw new NotFoundException("This purchase does not exist");
    }
    return compras_por_id;
  }

  @Post()
  async create(@Body() purchase: Purchase): Promise<Purchase> {
    return this.compraService.create(purchase);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() purchase: Purchase): Promise<Purchase | null> {
    const updatedPurchase = await this.compraService.update(id, purchase);
    return updatedPurchase !== null ? updatedPurchase : null;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.compraService.remove(id);
    } catch (error) {
      throw new NotFoundException("This purchase does not exist");

    }
  }

  @Get(':id/details')
  async findOneWithDetails(@Param('id') id: number): Promise<Purchase | null> {
    return this.compraService.findOneWithDetails(id);
  }

  @Post('createwithdetails')
  async createWithDetails(
    @Body() createPurchaseDto: CreatePurchaseDto
  ): Promise<Purchase> {
    return await this.compraService.createWithDetails(createPurchaseDto);
  }
}
