import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDateColumn, Repository } from 'typeorm';
import { Producto } from 'src/producto/producto.model';

@Injectable()
export class MigracionService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async migrarDatos(data: any[]): Promise<void> {
    
    //console.log("Estos son los datas: ",data);

    if (!Array.isArray(data)) {
      throw new Error('Los datos deben ser un array');
    }
  
    // Iterar sobre los datos y guardarlos en la base de datos
    for (const item of data) {
      const producto = new Producto();
      producto.code = item.code;
      producto.name = item.name;
      producto.description = item.description;
      producto.price = item.price;
      producto.stock = item.stock;
      producto.image = item.image;
      producto.brand_id = item.brand_id;
      producto.size_id = item.size_id;
      producto.color_id = item.color_id;
      producto.model_id = item.model_id;
  
      await this.productoRepository.save(producto);
    }
  }
  
}
