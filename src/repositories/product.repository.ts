import db from "../db/db";
import { ProductEntity } from "../schemas/product.entity";

class ProductRepository {
  getAllProducts(): ProductEntity[] {
    const products: ProductEntity[] = db.getAll("products");

    return products;
  }

  getProduct(productId: string): ProductEntity | null {
    const product: ProductEntity | null =
      db.getOne("products", productId) || null;

    return product;
  }
}

export default new ProductRepository();
