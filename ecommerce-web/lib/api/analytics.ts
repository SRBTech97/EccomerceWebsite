import { apiGet } from './client';

export interface AnalyticsSummary {
  totalRevenue: number;
  totalProfit: number;
  profitByVariant: Array<{
    variantId: number;
    totalRevenue: number;
    totalProfit: number;
  }>;
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  return apiGet<AnalyticsSummary>('/analytics/summary');
}
