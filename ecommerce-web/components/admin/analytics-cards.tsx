import { Card, CardContent } from '../ui/card';
import type { AnalyticsSummary } from '../../lib/api/analytics';

interface AnalyticsCardsProps {
  summary: AnalyticsSummary;
}

export function AnalyticsCards({ summary }: AnalyticsCardsProps) {
  const itemsSold = summary.profitByVariant.reduce(
    (acc, v) => acc + v.totalRevenue,
    0,
  );

  const margin = summary.totalRevenue
    ? (summary.totalProfit / summary.totalRevenue) * 100
    : 0;

  const cards = [
    {
      label: 'Total Revenue',
      value: `₹${summary.totalRevenue.toFixed(0)}`,
    },
    {
      label: 'Total Profit',
      value: `₹${summary.totalProfit.toFixed(0)}`,
    },
    {
      label: 'Items Sold (weighted)',
      value: itemsSold.toFixed(0),
    },
    {
      label: 'Profit Margin',
      value: `${margin.toFixed(1)}%`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="bg-white">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="text-xl font-semibold text-slate-900">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
