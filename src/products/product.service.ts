import { Injectable, NotFoundException } from '@nestjs/common';
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

  /* Mostrar los productos mas comprados por tallas ESPECIFICAS*/
  /* /masCompradosPorTalla?talla=M */
  async obtenerProductosMasCompradosPorTalla(talla: string): Promise<any[]> {
    const query = `
    SELECT
      product.name AS producto,
      product.description AS descripcion,
      SUM(purchase_detail.quantity) AS cantidad_total
    FROM 
      product
    JOIN 
      purchase_detail ON product.id = purchase_detail.product_id
    JOIN 
      purchase ON purchase.id = purchase_detail.purchase_id
    JOIN 
      sizes ON product.size_id = sizes.id
    WHERE 
      sizes.name = $1
    GROUP BY
      product.name, product.description
    ORDER BY 
      cantidad_total DESC;
    `;
    const resultados = await this.dataSource.query(query, [talla]);
    return resultados;
  }

  /* Mostrar los productos mas comprados por fechas*/
  async obtenerProductosMasCompradosPorFechas(fecha: number): Promise<any[]> {
    const query = ` SELECT 
      product.name AS product_name,
      purchase_detail.quantity,
      purchase.date AS fecha
    FROM
        product
    JOIN
      purchase_detail ON product.id = purchase_detail.product_id
    JOIN
      purchase ON purchase.id = purchase_detail.purchase_id
    WHERE
      purchase.date = $1
    ORDER BY 
      purchase_detail.quantity DESC;
        `;
    const resultados = await this.dataSource.query(query, [fecha]);
    return resultados;
  }

  /* Mostrar los productos mas comprados por año, que este ordenado*/
  async obtenerProductosMasCompradosPorYear(year: number): Promise<any[]> {
    const query = `
      SELECT
        product.name AS product_name,
        SUM(purchase_detail.quantity) AS total_quantity,
        purchase.date AS fecha
      FROM 
        product
      JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
      JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
      WHERE 
        EXTRACT(YEAR FROM purchase.date) = $1
      GROUP BY
        product.name, purchase.date
      ORDER BY 
        total_quantity DESC
      LIMIT 20;
    `;
    const resultados = await this.dataSource.query(query, [year]);
    return resultados;
  }

  /* Mostrar los productos mas comprados por marcas ESPECIFICAS*/
  async obtenerProductosMasCompradosPorMarca(marca: string): Promise<any[]> {
    const query = `
      SELECT
      product.name AS producto,
      product.description AS descripcion,
      SUM(purchase_detail.quantity) AS cantidad_total
    FROM 
      product
    JOIN 
      purchase_detail ON product.id = purchase_detail.product_id
    JOIN 
      purchase ON purchase.id = purchase_detail.purchase_id
    JOIN 
      brands ON product.brand_id = brands.id
    WHERE 
      brands.name = $1
    GROUP BY
      product.name, product.description
    ORDER BY 
      cantidad_total DESC;
    `;
    const resultados = await this.dataSource.query(query, [marca]);
    return resultados;
  }

  /* Mostrar los productos mas comprados por modelos ESPECIFICOS*/
  async obtenerProductosMasCompradosPorModelo(modelo: string): Promise<any[]> {
    const query = `
      SELECT
      product.name AS producto,
      product.description AS descripcion,
      SUM(purchase_detail.quantity) AS cantidad_total
    FROM 
      product
    JOIN 
      purchase_detail ON product.id = purchase_detail.product_id
    JOIN 
      purchase ON purchase.id = purchase_detail.purchase_id
    JOIN 
      models ON product.model_id = models.id
    WHERE 
      models.name = $1
    GROUP BY
      product.name, product.description
    ORDER BY 
      cantidad_total DESC;
      `;
    const resultados = await this.dataSource.query(query, [modelo]);
    return resultados;
  }

  //para modificar cantidad y precio en Productos
  async actualizarStock(id: number, nuevoStock: number, nuevoPrecio: number): Promise<any[]> {
    const query = `
      UPDATE
        Product
      SET 
        stock = $2,
        price = $3
      WHERE
        id = $1
    `;
    const resultados = await this.dataSource.query(query, [id, nuevoStock, nuevoPrecio]);
    return resultados;
  }

  //Actualizar cantidad y precio en la tabla Compra Detalle (Purchase_Detail)
  async actualizarQuantityPrice(id: number, quantity: number, price: number): Promise<any[]> {
    const query = `
      UPDATE
        purchase_detail
      SET 
        quantity = $2,
        price = $3
      WHERE
        id = $1
    `;
    const resultados = await this.dataSource.query(query, [id, quantity, price]);
    return resultados;
  }

  //Ver la lista de los productos que están en promoción
  async verProductosEnPromocion(): Promise<any[]> {
    const query = `
    SELECT 
        product.name AS producto,
        promotion.description AS promocion
    FROM (
    SELECT 
        product_id,
        MAX(prom_id) AS prom_id
    FROM 
        product_prom
    GROUP BY 
        product_id
    ) AS latest_promotion
    JOIN 
      promotion ON latest_promotion.prom_id = promotion.id
    JOIN 
      product ON latest_promotion.product_id = product.id;
    `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  //Ver los productos que están en promoción enviando el nombre 
  async verProductosEnPromoPorNombre(nombreProductoOrId: string): Promise<any[]> {
    const isNumeric = /^\d+$/.test(nombreProductoOrId); // Verifica si el parámetro es numérico (ID)
    let query = `
      SELECT 
        product.name AS producto,
        promotion.description AS promocion
      FROM (
        SELECT 
          product_id,
          MAX(prom_id) AS prom_id
        FROM 
          product_prom
        GROUP BY 
          product_id
      ) AS latest_promotion
      JOIN 
        promotion ON latest_promotion.prom_id = promotion.id
      JOIN 
        product ON latest_promotion.product_id = product.id
    `;

    if (isNumeric) {
      // Si el parámetro es numérico (ID), busca por ID
      query += ` WHERE product.id = $1`;
    } else {
      // Si el parámetro es un nombre de producto, busca por nombre
      query += ` WHERE product.name = $1`;
    }

    const resultados = await this.dataSource.query(query, [nombreProductoOrId]);
    return resultados;
  }

  /* Mostrar los productos mas comprados por marca */
  async obtenerTodosLosProductosMasCompradosPorMarca(): Promise<any[]> {
    const query = `
        SELECT
          product.name AS producto,
          brands.name AS marca
          purchase_detail.quantity AS cantidad
        FROM 
          product
        JOIN 
          purchase_detail ON product.id = purchase_detail.product_id
        JOIN 
          purchase ON purchase.id = purchase_detail.purchase_id
        JOIN 
          brands ON product.brand_id = brands.id
        ORDER BY 
          purchase_detail.quantity DESC limit 50;
      `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  /* Mostrar los productos mas comprados por modelo */
  async obtenerTodosLosProductosMasCompradosPorModelo(): Promise<any[]> {
    const query = `
        SELECT
          product.name AS producto,
          models.name AS modelo
          purchase_detail.quantity AS cantidad
        FROM 
          product
        JOIN 
          purchase_detail ON product.id = purchase_detail.product_id
        JOIN 
          purchase ON purchase.id = purchase_detail.purchase_id
        JOIN 
          models ON product.model_id = models.id
        ORDER BY 
          purchase_detail.quantity DESC limit 50;
      `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  /* Mostrar los productos mas comprados por color */
  async obtenerTodosLosProductosMasCompradosPorColor(): Promise<any[]> {
    const query = `
      SELECT
        product.name AS producto,
        colors.name AS color
        purchase_detail.quantity AS cantidad
      FROM 
        product
      JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
      JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
      JOIN 
        colors ON product.color_id = colors.id
      ORDER BY 
        purchase_detail.quantity DESC limit 50;
    `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  async updateStock(id: number, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    product.stock += quantity;
    await this.productRepository.save(product);
  }
}
