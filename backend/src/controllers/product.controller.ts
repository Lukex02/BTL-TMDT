import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  CategoryDto,
  DiscountDto,
  ProductDto,
  ProductFilterDto,
} from 'src/dtos/product';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all products' })
  async getAll() {
    return await this.productService.getAllProducts();
  }

  @Get('byId/:productId')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiParam({ name: 'productId', type: Number, example: 1 })
  async getById(@Param('productId') productId: number) {
    return await this.productService.getProductById(productId);
  }

  @Get('byFilter')
  @ApiOperation({ summary: 'Get products by filter' })
  @ApiQuery({
    name: 'name',
    type: String,
    example: 'Test Item 1',
    required: false,
  })
  @ApiQuery({ name: 'sellerId', type: Number, example: 1, required: false })
  @ApiQuery({ name: 'categoryId', type: Number, example: 1, required: false })
  @ApiQuery({
    name: 'status',
    type: String,
    example: 'active',
    required: false,
  })
  @ApiQuery({ name: 'price', type: Number, example: 100, required: false })
  @ApiQuery({ name: 'stock', type: Number, example: 100, required: false })
  async getByFilter(@Query() filter: ProductFilterDto) {
    return await this.productService.getProductByFilter(filter);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create product' })
  async create(@Body() create: ProductDto) {
    return await this.productService.createProduct(create);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update product' })
  async update(@Body() update: ProductDto) {
    return await this.productService.updateProduct(update);
  }

  @Delete('delete/:productId')
  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'productId', type: Number, example: 1 })
  async delete(@Param('productId') productId: number) {
    return await this.productService.deleteProduct(productId);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all product categories' })
  async getCategories() {
    return await this.productService.getAllCategories();
  }

  @Post('categories/create')
  @ApiOperation({ summary: 'Create product category' })
  @ApiBody({ type: CategoryDto })
  async createCategory(@Body() create: CategoryDto) {
    return await this.productService.createCategory(create);
  }

  @Put('categories/update')
  @ApiOperation({ summary: 'Update product category' })
  @ApiBody({ type: CategoryDto })
  async updateCategory(@Body() update: CategoryDto) {
    return await this.productService.updateCategory(update);
  }

  @Delete('categories/delete/:categoryId')
  @ApiOperation({ summary: 'Delete product category' })
  @ApiParam({ name: 'categoryId', type: Number, example: 1 })
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return await this.productService.deleteCategory(categoryId);
  }

  @Get('discounts')
  @ApiOperation({ summary: 'Get all active discounts' })
  async getDiscounts() {
    return await this.productService.getAllDiscounts();
  }

  @Post('discounts/create')
  @ApiOperation({ summary: 'Create discount rule' })
  @ApiBody({ type: DiscountDto })
  async createDiscount(@Body() create: DiscountDto) {
    return await this.productService.createDiscount(create);
  }

  @Put('discounts/update')
  @ApiOperation({ summary: 'Update discount rule' })
  @ApiBody({ type: DiscountDto })
  async updateDiscount(@Body() update: DiscountDto) {
    return await this.productService.updateDiscount(update);
  }

  @Delete('discounts/delete/:discountId')
  @ApiOperation({ summary: 'Delete discount rule' })
  @ApiParam({ name: 'discountId', type: Number, example: 1 })
  async deleteDiscount(@Param('discountId') discountId: number) {
    return await this.productService.deleteDiscount(discountId);
  }
}
