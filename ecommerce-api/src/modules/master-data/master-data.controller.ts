import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  // Brands
  @Post('brands')
  createBrand(@Body() dto: CreateBrandDto) {
    return this.masterDataService.createBrand(dto);
  }

  @Get('brands')
  listBrands() {
    return this.masterDataService.listBrands();
  }

  @Patch('brands/:id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBrandDto,
  ) {
    return this.masterDataService.updateBrand(id, dto);
  }

  @Delete('brands/:id')
  deleteBrand(@Param('id', ParseIntPipe) id: number) {
    return this.masterDataService.deleteBrand(id);
  }

  // Categories
  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.masterDataService.createCategory(dto);
  }

  @Get('categories')
  listCategories() {
    return this.masterDataService.listCategories();
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.masterDataService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.masterDataService.deleteCategory(id);
  }

  // Sizes
  @Post('sizes')
  createSize(@Body() dto: CreateSizeDto) {
    return this.masterDataService.createSize(dto);
  }

  @Get('sizes')
  listSizes() {
    return this.masterDataService.listSizes();
  }

  @Patch('sizes/:id')
  updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSizeDto,
  ) {
    return this.masterDataService.updateSize(id, dto);
  }

  @Delete('sizes/:id')
  deleteSize(@Param('id', ParseIntPipe) id: number) {
    return this.masterDataService.deleteSize(id);
  }

  // Colors
  @Post('colors')
  createColor(@Body() dto: CreateColorDto) {
    return this.masterDataService.createColor(dto);
  }

  @Get('colors')
  listColors() {
    return this.masterDataService.listColors();
  }

  @Patch('colors/:id')
  updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColorDto,
  ) {
    return this.masterDataService.updateColor(id, dto);
  }

  @Delete('colors/:id')
  deleteColor(@Param('id', ParseIntPipe) id: number) {
    return this.masterDataService.deleteColor(id);
  }
}
