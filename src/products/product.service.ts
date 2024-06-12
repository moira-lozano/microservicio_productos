import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Product } from './product.model';
import * as child_process from 'child_process';
import axios from 'axios';

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
      product.name AS producto,
	    sizes.name AS talla,
      MAX(purchase_detail.quantity) AS cantidad_vendida
    FROM 
        product
    JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
    JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
    JOIN 
        sizes ON product.size_id = sizes.id
    GROUP BY
        product.name, sizes.name
    ORDER BY 
        cantidad_vendida DESC;
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
        product.name AS producto,
        SUM(purchase_detail.quantity) AS total_cantidad,
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
          product.name, purchase.date, fecha
      ORDER BY 
          fecha ASC, total_cantidad DESC;
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
      SUM(purchase_detail.quantity) AS cantidad_total,
	    SUM(purchase_detail.total) AS total
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
        product.price AS precio,
        product_prom.discount AS descuento
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
    JOIN 
        product_prom ON latest_promotion.product_id = product_prom.product_id 
            AND latest_promotion.prom_id = product_prom.prom_id;
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
          brands.name AS marca,
          MAX(purchase_detail.quantity) AS cantidad_vendida
        FROM 
          product
        JOIN 
          purchase_detail ON product.id = purchase_detail.product_id
        JOIN 
          purchase ON purchase.id = purchase_detail.purchase_id
        JOIN 
          brands ON product.brand_id = brands.id
	  GROUP BY
        product.name, brands.name
        ORDER BY 
          cantidad_vendida DESC;
      `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  /* Mostrar los productos mas comprados por modelo */
  async obtenerTodosLosProductosMasCompradosPorModelo(): Promise<any[]> {
    const query = `
        SELECT
          product.name AS producto,
          models.name AS modelo,
          MAX(purchase_detail.quantity) AS cantidad_vendida
        FROM 
          product
        JOIN 
          purchase_detail ON product.id = purchase_detail.product_id
        JOIN 
          purchase ON purchase.id = purchase_detail.purchase_id
        JOIN 
          models ON product.model_id = models.id
        GROUP BY
        product.name, models.name
        ORDER BY 
          cantidad_vendida DESC;
      `;
    const resultados = await this.dataSource.query(query);
    return resultados;
  }

  /* Mostrar los productos mas comprados por color */
  async obtenerTodosLosProductosMasCompradosPorColor(): Promise<any[]> {
    const query = `
      SELECT
        product.name AS producto,
        colors.name AS color,
        MAX(purchase_detail.quantity) AS cantidad_vendida
      FROM 
        product
      JOIN 
        purchase_detail ON product.id = purchase_detail.product_id
      JOIN 
        purchase ON purchase.id = purchase_detail.purchase_id
      JOIN 
        colors ON product.color_id = colors.id
       GROUP BY
        product.name, colors.name
        ORDER BY 
          cantidad_vendida DESC;
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

  async getProductImageKeys(): Promise<string[]> {
    const products = await this.productRepository.find({
      select: ['image'], // Selecciona solo el campo de la clave de la imagen
    });

    return products.map(product => product.image);
  }

  async getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      child_process.exec('gcloud auth application-default print-access-token', (error, stdout, stderr) => {
        if (error) {
          reject(`Error obtaining access token: ${stderr}`);
        }
        resolve(stdout.trim());
      });
    });
  }

  async findProductsByLabels(labels: string[]): Promise<Product[]> {
    console.log('labels products: ', labels)
    const products = await this.findAll();
    const matchedProducts = [];

    const token = await this.getAccessToken();
    console.log('apikery', token)

    for (const product of products) {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate`,
        {
          requests: [
            {
              image: { source: { imageUri: product.image } },
              features: [{ type: 'LABEL_DETECTION' }]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const productLabels = response.data.responses[0].labelAnnotations.filter(
          (label: any) => label.score >= 0.95
        ).map(
          (label: any) => label.description
        );

        // Cuenta las coincidencias
        const matchingLabelsCount = labels.filter(label => productLabels.includes(label)).length;
        console.log('matchingLabelsCount', matchingLabelsCount)

        // Solo agrega productos con más de una coincidencia
        if (matchingLabelsCount > 1) {
          matchedProducts.push(product);
        }
      }
    }
    return matchedProducts;
  }
}
