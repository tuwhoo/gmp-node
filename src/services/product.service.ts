import ProductRepository from "../repositories/product.repository";

class ProductService {
  getProductId(productId: string) {
    const product = ProductRepository.getProduct(productId);

    return product;
  }

  getAllProducts() {
    const products = ProductRepository.getAllProducts();

    return products;
  }
}

export default new ProductService();
