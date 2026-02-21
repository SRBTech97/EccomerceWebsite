import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  list(@Query() filter: FilterProductDto) {
    return this.productService.listProducts(filter);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
}
