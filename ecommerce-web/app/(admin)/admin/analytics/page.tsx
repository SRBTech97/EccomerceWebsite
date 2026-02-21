import { fetchAnalyticsSummary } from '../../../../lib/api/analytics';
import { AnalyticsCards } from '../../../../components/admin/analytics-cards';

export default async function AdminAnalyticsPage() {
  const summary = await fetchAnalyticsSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-600">
          Revenue and profit analytics powered by backend aggregates.
        </p>
      </div>
      <AnalyticsCards summary={summary} />
    </div>
  );
}
