import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  CategoryDto,
  DiscountDto,
  ProductDto,
  ProductFilterDto,
} from 'src/dtos/product';
import { IProductService } from 'src/interfaces/product.interface';
import { Product } from 'src/models/product';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}
  private readonly queryProductString = `
    id,
    name,
    description,
    status,
    price,
    stock,
    seller:User (
      id,
      username,
      avatar_url
    ),
    category:Category (
      id,
      name,
      description
    ),
    attributes:Attribute (
      attributeName:name,
      attributeValue:value
    ),
    images:ProductImage (
      url,
      createdAt: created_at
    ),
    createdAt: created_at,
    updatedAt: updated_at
  `;

  private mapToProduct(product: any): Product | null {
    // const _category: Category = {
    //   id: product.category?.id,
    //   name: product.category?.name,
    //   description: product.category?.description,
    // }
    // const _seller: UserNestedDto = {
    //   id: product.seller.id,
    //   username: product.seller.username,
    //   avatarUrl: product.seller.avatarUrl,
    // }
    return product
      ? {
          id: product.id,
          name: product.name,
          description: product.description,
          seller: product.seller,
          category: product.category,
          attributes: product.attributes,
          status: product.status,
          price: product.price,
          stock: product.stock,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }
      : null;
  }

  private mapToDiscountDto(discount: any): DiscountDto | null {
    return discount
      ? {
          id: discount.id,
          productId: discount.product_id,
          categoryId: discount.category_id,
          percentage: discount.percentage,
          fixedAmount: discount.fixed_amount,
          startAt: discount.start_at,
          endAt: discount.end_at,
          active: discount.active,
        }
      : null;
  }

  private mapToCategoryDto(category: any): CategoryDto | null {
    return category
      ? {
          id: category.id,
          name: category.name,
          description: category.description,
        }
      : null;
  }

  private mapCategoryDtoToDb(category: CategoryDto) {
    return {
      name: category.name,
      description: category.description,
    };
  }

  private mapDiscountDtoToDb(discount: DiscountDto) {
    return {
      product_id: discount.productId,
      category_id: discount.categoryId,
      percentage: discount.percentage,
      fixed_amount: discount.fixedAmount,
      start_at: discount.startAt,
      end_at: discount.endAt,
      active: discount.active,
    };
  }

  private mapProductDtoToDb(product: ProductDto) {
    return {
      seller_id: product.seller.id,
      category_id: product.category?.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      status: product.status,
    };
  }

  // ----------- Products -----------
  async getAllProducts() {
    const { data: products, error } = await this.supabase
      .from('Product')
      .select(this.queryProductString)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return products
      .map((product: any) => this.mapToProduct(product))
      .filter((product: Product) => product !== null);
  }

  async getProductById(productId: number) {
    const { data, error } = await this.supabase
      .from('Product')
      .select(this.queryProductString)
      .eq('id', productId)
      .maybeSingle();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return this.mapToProduct(data);
  }

  async getProductByFilter(filter: ProductFilterDto) {
    let query = this.supabase.from('Product').select(this.queryProductString);

    if (filter.name !== undefined) {
      query = query.ilike('name', `%${filter.name}%`);
    }

    if (filter.sellerId !== undefined) {
      query = query.eq('seller_id', filter.sellerId);
    }

    if (filter.categoryId !== undefined) {
      query = query.eq('category_id', filter.categoryId);
    }

    if (filter.status !== undefined) {
      query = query.eq('status', filter.status);
    }

    if (filter.price !== undefined) {
      query = query.eq('price', filter.price);
    }

    if (filter.stock !== undefined) {
      query = query.eq('stock', filter.stock);
    }

    const { data, error } = await query;

    if (error) throw new BadRequestException(error.message);

    return data
      .map((product: any) => this.mapToProduct(product))
      .filter((product: Product) => product !== null);
  }

  async createProduct(create: ProductDto) {
    const { data, error } = await this.supabase
      .from('Product')
      .insert(this.mapProductDtoToDb(create));
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Product created successfully' };
  }

  async updateProduct(update: ProductDto) {
    const { data, error } = await this.supabase
      .from('Product')
      .update({
        ...this.mapProductDtoToDb(update),
        updated_at: new Date().toISOString(),
      })
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product updated successfully' };
  }

  async deleteProduct(productId: number) {
    const { data, error } = await this.supabase
      .from('Product')
      .delete()
      .eq('id', productId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Product deleted successfully' };
  }

  // ----------- Categories -----------
  async getAllCategories() {
    const { data: categories, error } = await this.supabase
      .from('Category')
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return categories
      .map((category: any) => this.mapToCategoryDto(category))
      .filter((category: CategoryDto) => category !== null);
  }

  async createCategory(create: CategoryDto) {
    const { data, error } = await this.supabase
      .from('Category')
      .insert(this.mapCategoryDtoToDb(create));
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Category created successfully' };
  }

  async updateCategory(update: CategoryDto) {
    const { data, error } = await this.supabase
      .from('Category')
      .update(this.mapCategoryDtoToDb(update))
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category updated successfully' };
  }

  async deleteCategory(categoryId: number) {
    const { data, error } = await this.supabase
      .from('Category')
      .delete()
      .eq('id', categoryId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Category deleted successfully' };
  }

  // ----------- Discounts -----------
  async getAllDiscounts() {
    const { data: discounts, error } = await this.supabase
      .from('Discount')
      .select()
      .order('end_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return discounts.map((discount: any) => this.mapToDiscountDto(discount));
  }

  async createDiscount(create: DiscountDto) {
    const { data, error } = await this.supabase
      .from('Discount')
      .insert(this.mapDiscountDtoToDb(create));
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Discount created successfully' };
  }

  async updateDiscount(update: DiscountDto) {
    const { data, error } = await this.supabase
      .from('Discount')
      .update(this.mapDiscountDtoToDb(update))
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Discount not found');
    }
    return { message: 'Discount updated successfully' };
  }

  async deleteDiscount(discountId: number) {
    const { data, error } = await this.supabase
      .from('Discount')
      .delete()
      .eq('id', discountId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Discount deleted successfully' };
  }
}
