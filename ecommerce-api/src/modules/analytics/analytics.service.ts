import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface AnalyticsSummary {
  totalRevenue: number;
  totalProfit: number;
  profitByVariant: Array<{
    variantId: number;
    totalRevenue: number;
    totalProfit: number;
  }>;
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<AnalyticsSummary> {
    const revenueAgg = await this.prisma.orderItem.groupBy({
      by: ['variantId'],
      _sum: {
        totalPrice: true,
        totalCost: true,
      },
    });

    let totalRevenue = 0;
    let totalCost = 0;

    const profitByVariant = revenueAgg.map((row) => {
      const revenue = Number(row._sum.totalPrice ?? 0);
      const cost = Number(row._sum.totalCost ?? 0);
      totalRevenue += revenue;
      totalCost += cost;

      return {
        variantId: row.variantId,
        totalRevenue: revenue,
        totalProfit: revenue - cost,
      };
    });

    return {
      totalRevenue,
      totalProfit: totalRevenue - totalCost,
      profitByVariant,
    };
  }
}
