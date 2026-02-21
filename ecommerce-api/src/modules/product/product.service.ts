import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    const { variants, ...productData } = dto;

    return this.prisma.masterProduct.create({
      data: {
        ...productData,
        variants: {
          create: variants.map((variant) => ({
            sizeId: variant.sizeId,
            colorId: variant.colorId,
            price: variant.price,
            costPrice: variant.costPrice,
            stockQty: variant.stockQty,
            sku: variant.sku,
          })),
        },
      },
      include: {
        variants: true,
      },
    });
  }

  async listProducts(filter: FilterProductDto) {
    const { limit = 20, offset = 0, categoryId, sizeId, colorId } = filter;

    return this.prisma.masterProduct.findMany({
      skip: offset,
      take: limit,
      where: {
        isActive: true,
        categoryId,
        variants: {
          some: {
            ...(sizeId ? { sizeId } : {}),
            ...(colorId ? { colorId } : {}),
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        baseSku: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        variants: {
          where: {
            isActive: true,
            ...(sizeId ? { sizeId } : {}),
            ...(colorId ? { colorId } : {}),
          },
          select: {
            variantId: true,
            price: true,
            stockQty: true,
            sku: true,
            size: {
              select: {
                id: true,
                label: true,
                code: true,
              },
            },
            color: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.masterProduct.findUnique({
      where: {
        id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        baseSku: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        variants: {
          where: {
            isActive: true,
          },
          select: {
            variantId: true,
            price: true,
            stockQty: true,
            sku: true,
            size: {
              select: {
                id: true,
                label: true,
                code: true,
              },
            },
            color: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
