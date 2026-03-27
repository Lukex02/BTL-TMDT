import { ProductDto, ProductFilterDto } from 'src/dtos/product';

export interface IProductService {
  // Products
  getAllProducts(): Promise<any[]>;
  getProductById(productId: number): Promise<ProductDto | null>;
  getProductByFilter(filter: ProductFilterDto): Promise<any[]>;
  createProduct(create: ProductDto): Promise<any>;
  updateProduct(update: ProductDto): Promise<any>;
  deleteProduct(productId: number): Promise<any>;
  // Categories
  getAllCategories(): Promise<any[]>;
  createCategory(create: any): Promise<any>;
  updateCategory(update: any): Promise<any>;
  deleteCategory(categoryId: number): Promise<any>;
  // Discounts
  getAllDiscounts(): Promise<any[]>;
  createDiscount(create: any): Promise<any>;
  updateDiscount(update: any): Promise<any>;
  deleteDiscount(discountId: number): Promise<any>;
}
