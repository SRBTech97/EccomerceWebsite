import { fetchAnalyticsSummary } from '../../../../lib/api/analytics';
import { AnalyticsCards } from '../../../../components/admin/analytics-cards';

export default async function AdminDashboardPage() {
  const summary = await fetchAnalyticsSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          High-level view of revenue and profitability across the store.
        </p>
      </div>
      <AnalyticsCards summary={summary} />
    </div>
  );
}
