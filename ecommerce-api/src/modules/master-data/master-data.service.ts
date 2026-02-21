import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class MasterDataService {
  constructor(private readonly prisma: PrismaService) {}

  // Brand CRUD
  async createBrand(dto: CreateBrandDto) {
    return this.prisma.masterBrand.create({
      data: dto,
    });
  }

  async listBrands() {
    return this.prisma.masterBrand.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async updateBrand(id: number, dto: UpdateBrandDto) {
    try {
      return await this.prisma.masterBrand.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
  }

  async deleteBrand(id: number): Promise<void> {
    try {
      await this.prisma.masterBrand.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
  }

  // Category CRUD
  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.masterCategory.create({
      data: dto,
    });
  }

  async listCategories() {
    return this.prisma.masterCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.masterCategory.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException(`Category ${id} not found`);
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await this.prisma.masterCategory.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      throw new NotFoundException(`Category ${id} not found`);
    }
  }

  // Size CRUD
  async createSize(dto: CreateSizeDto) {
    return this.prisma.masterSize.create({
      data: dto,
    });
  }

  async listSizes() {
    return this.prisma.masterSize.findMany({
      where: { isActive: true },
      orderBy: { label: 'asc' },
    });
  }

  async updateSize(id: number, dto: UpdateSizeDto) {
    try {
      return await this.prisma.masterSize.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException(`Size ${id} not found`);
    }
  }

  async deleteSize(id: number): Promise<void> {
    try {
      await this.prisma.masterSize.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      throw new NotFoundException(`Size ${id} not found`);
    }
  }

  // Color CRUD
  async createColor(dto: CreateColorDto) {
    return this.prisma.masterColor.create({
      data: dto,
    });
  }

  async listColors() {
    return this.prisma.masterColor.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async updateColor(id: number, dto: UpdateColorDto) {
    try {
      return await this.prisma.masterColor.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException(`Color ${id} not found`);
    }
  }

  async deleteColor(id: number): Promise<void> {
    try {
      await this.prisma.masterColor.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      throw new NotFoundException(`Color ${id} not found`);
    }
  }
}
