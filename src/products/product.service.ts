import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Product } from './product.model';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource
  ) { }

  async migrarDatos(data: any[]): Promise<void> {

    if (!Array.isArray(data)) {
      throw new Error('Los datos deben ser un array');
    }

    // Iterar sobre los datos y guardarlos en la base de datos
    for (const item of data) {
      const producto = new Product();
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

      await this.productRepository.save(producto);
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product || null; // Asegura que nunca se retorne null
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product | null> {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOne({ where: { id } });
    return updatedProduct || null;
  }
  

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  /* Mostrar los productos mas comprados por tallas */
  async obtenerProductosMasCompradosPorTallas(): Promise<any[]> {
    const query = `
      SELECT
        product.name AS product_name,
        purchase_detail.quantity,
        sizes.name AS size_name
      FROM 
        product
      JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
      JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
      JOIN 
        sizes ON product.size_id = sizes.id
      ORDER BY 
        purchase_detail.quantity DESC limit 50;
    `;

    const resultados = await this.dataSource.query(query);
    return resultados;
  }
   /* Mostrar los productos mas comprados por tallas  ESPECIFICAS*/
   async obtenerProductosMasCompradosPorTalla(talla: string): Promise<any[]> {
    const query = `
      SELECT
        product.name AS product_name,
        purchase_detail.quantity,
        sizes.name AS size_name
      FROM 
        product
      JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
      JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
      JOIN 
        sizes ON product.size_id = sizes.id
      WHERE 
        sizes.name = XS
      ORDER BY 
        purchase_detail.quantity DESC
      LIMIT 50;
    `;
    const resultados = await this.dataSource.query(query, [talla]);
    return resultados;
  }

}
